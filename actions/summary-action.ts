"use server"

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export async function getSummaries(userId: string) {
    const sql = await getDbConnection();

    try {
        const result = await sql`
        SELECT * FROM pdf_summaries
        WHERE user_id = ${userId} ORDER BY created_at DESC ;
    `;

        if (result.length === 0) return null;

        return result[0];
    } catch (error) {
        console.error("Error fetching PDF summary by ID:", error);
        throw error;
    }
}


export async function getPdfSummaryById(id: string) {
    const sql = await getDbConnection();
    try {
        const result = await sql`
        SELECT 
        id,
        user_id,
        original_file_url,
        summary_text,
        status,
        title,
        file_name,
        created_at,
        updated_at,
        file_name,
        LENGTH(summary_text)-LENGTH(REPLACE(summary_text,' ',''))+1 as word_count
        FROM pdf_summaries
        WHERE id = ${id};
    `;
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Failed to fetch PDF summary by ID:", error);
        throw error;
    }
}

export async function deleteSummaryAction({ summaryId }: { summaryId: string }) {
    try {
        const user = await currentUser();
        const userId = user?.id;
        const sql = await getDbConnection();

        const result = await sql`
        DELETE FROM pdf_summaries
        WHERE id = ${summaryId} AND user_id=${userId} RETURNING id `;

        if (result.length > 0) {
            revalidatePath("/dashboard");
            return { success: true }
        }
        return { success: true, message: "Summary deleted successfully" };
    } catch (error) {
        console.error("Error deleting PDF summary", error);
        throw new Error("Failed to delete summary");
    }
}