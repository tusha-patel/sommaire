import { PricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";




export async function getPriceIdForActiveUser(email: string) {
    console.log(email, 'email');

    const sql = await getDbConnection();
    const query = await sql`SELECT price_id FROM users where email = ${email} AND status='active' `
    return query?.[0]?.price_id;
}

export async function hasActivePlan(email: string) {
    const sql = await getDbConnection();
    const query = await sql`SELECT price_id,status FROM users where email = ${email} AND status='active' AND price_id IS NOT NULL`


    return query && query.length > 0;

}


export async function hasReachedUploadLimit({ userId, email }: { userId: string, email: string  }) {
    console.log(userId, "user id");
    console.log(email, "new email");


    const uploadCount = await getUserUploadCount(userId);
    const priceId = await getPriceIdForActiveUser(email);

    const isPro = PricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro'
    console.log(isPro, 'isPro');

    const uploadLimit: number = isPro ? 1000 : 5;
    return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit }
}



