"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtracPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: string;
    }
}]) {
    if (!uploadResponse || !uploadResponse[0]?.serverData?.file) {
        return {
            success: false,
            message: "File upload failed",
            data: null,
        };
    }

    const {
        serverData: { userId, file: PdfUrl },
    } = uploadResponse[0];

    console.log("Upload response:", uploadResponse);
    console.log("PDF URL:", PdfUrl);

    try {
        const pdfText = await fetchAndExtracPdfText(PdfUrl);
        console.log("Extracted PDF text:", pdfText);

        let summary;

        try {
            summary = await generateSummaryFromOpenAI(pdfText);
            console.log("Summary from OpenAI:", summary);
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

        return {
            success: true,
            message: "Summary generated successfully",
            data: {
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
