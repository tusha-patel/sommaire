"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtracPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


interface PdfSummaryType {
    userId?: string;
    fileUrl: string;
    summary: string;
    title: string;
    fileName: string
}

export async function generatePdfSummary(uploadResponse: [{
    serverData: {
        userId: string;
        fileUrl: string,
        fileName: string,
    }
}]) {


    if (!uploadResponse || !uploadResponse[0]?.serverData?.fileUrl) {
        return {
            success: false,
            message: "File upload failed",
            data: null,
        };
    }

    const {
        serverData: { userId,
            fileUrl: pdfUrl,
            fileName
        },
    } = uploadResponse[0];

    // console.log("Upload response:", uploadResponse);
    // console.log("PDF URL:", pdfUrl);

    try {
        const pdfText = await fetchAndExtracPdfText(pdfUrl);
        // console.log("Extracted PDF text:", pdfText);

        let summary;

        try {
            summary = await generateSummaryFromOpenAI(pdfText);
            // console.log("Summary from OpenAI:", summary);
        } catch (error) {
            console.error("OpenAI failed:", error);

            if (
                error instanceof Error &&
                error.message === "RATE_LIMIT_EXCEEDED"
            ) {
                try {
                    summary = await generateSummaryFromGemini(pdfText); // fallback to another call (you could change this to another provider)
                } catch (fallbackError) {
                    console.error("Fallback failed after rate limit:", fallbackError);
                    throw new Error("Failed to generate summary with available AI providers");
                }
            } else {
                throw error; // rethrow if it's not rate-limit related
            }
        }

        if (!summary) {
            return {
                success: false,
                message: "Failed to generate summary",
                data: null,
            };
        }

        const formattedFileName = formatFileNameAsTitle(fileName);
        // console.log(formattedFileName, "formatted file name");

        return {
            success: true,
            message: "Summary generated successfully",
            data: {
                title: formattedFileName,
                summary,
            },
        };
    } catch (error) {
        console.error("Unhandled error:", error);

        return {
            success: false,
            message: "Something went wrong during summary generation",
            data: null,
        };
    }
}


// save database to summary

async function savePdfSummary({ userId, fileUrl, summary, title, fileName }: PdfSummaryType) {
    try {
        const sql = await getDbConnection();
        const [result] = await sql`
         INSERT INTO pdf_summaries (
                    user_id,
                    original_file_url,
                    summary_text,
                    title,
                    file_name
                    ) VALUES (
                        ${userId},
                        ${fileUrl},
                        ${summary},
                        ${title},
                        ${fileName}
                    ) 
                    RETURNING id
        `;

        // console.log("save pdf", result);
        return result;
    } catch (error) {
        console.error('Error saving PDF summary', error);
        throw error;
    }
}

export async function storePdfSummaryAction({ fileUrl, summary, title, fileName }: PdfSummaryType) {
    let savedSummary: any;

    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: "User not found"
            }
        }

        savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName,
        });

        if (!savedSummary) {
            return {
                success: false,
                message: "Failed to save PDF summary , please try again... "
            }
        }
        // console.log(savedSummary, "saved summary");
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Error saving PDF summary"
        }
    }

    revalidatePath(`/summaries/${savedSummary.id}`)

    return {
        success: true,
        message: "PDF summary saved successfully ",
        id: savedSummary.id,
    }
}


