const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const payload = await req.text();

    const sig = req.headers.get('stripe-signature');
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);

        switch (event.type) {
            case 'checkout.session.completed':
                const sessionId = event.data.object.id;
                const session = await stripe.checkout.sessions.retrieve(sessionId, {
                    expand: ['line_items']
                });


                // You can save subscription, update DB, etc. here
                await handleCheckoutSessionCompleted({ session, stripe });
                break;
            case 'customer.subscription.deleted':
                const subscription = event.data.object;
                const subscriptionId = event.data.object.id;
                console.log(' Checkout session completed:', subscription);
                // You can save subscription, update DB, etc. here

                await handleSubscriptionDeleted({ subscriptionId, stripe });
                break;
            default:
                console.log(` Unhandled event type: ${event.type}`);
        }
    } catch (err) {
        console.error(' Error verifying webhook signature:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    return NextResponse.json({
        status: 'success',
        message: 'Hello from Stripe API',
    });
}