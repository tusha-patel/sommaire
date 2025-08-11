import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
    const sql = await getDbConnection();
    const summaries = await sql`SELECT * FROM pdf_summaries where user_id= ${userId} ORDER BY created_at DESC `
    return summaries;
}



export async function getUserUploadCount(userId: string) {
    console.log(userId);

    const sql = await getDbConnection();
    try {
        const [result] = await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id=${userId} `
        console.log(result);

        return result.count || 0;
    } catch (error) {
        console.error('Error fetching user upload count', error);
        return 0;
    }
}