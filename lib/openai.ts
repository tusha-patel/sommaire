import { SUMMARY_SYSTEM_PROMPT } from "@/utils/promots";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", 
            messages: [
            {
                role: "system",
                content: SUMMARY_SYSTEM_PROMPT,
            },
            {
                role: "user",
                content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
        ],
            temperature: 0.7,
            max_tokens: 1500,
        });

    return completion.choices[0]?.message?.content || null;
} catch (error: any) {
    console.error("OpenAI Error:", error);

    if (error?.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED"); 
    }

    throw error;
}
}
