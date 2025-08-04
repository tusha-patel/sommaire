// utils/generateSummaryFromGemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/promots"; // Same as before


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // Use your Gemini key

export async function generateSummaryFromGemini(pdfText: string): Promise<string | null> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Free-tier model

        const prompt = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: SUMMARY_SYSTEM_PROMPT },
                        {
                            text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
                        },
                    ],
                },
            ],
        };


        const result = await model.generateContent(prompt);
        const response = result.response;

        if (!response.text()) {
            throw new Error("Empty response from gemini AI")
        }

        const text = response.text();

        return text || null;
    } catch (error: any) {
        console.error("Gemini AI Error:", error);
        throw error;
    }
}
