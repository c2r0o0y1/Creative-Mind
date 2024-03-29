import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import Stripe from "stripe"

export async function POST (req: Request){
    const body = await req.text()
    const signature = headers().get("stripe-signature") as string

    let event: Stripe.Event

    try{
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    }catch(error: any){
        return new Response(`Webhook Error: ${error.message}`, {status: 400})
    }

    const sessions = event.data.object as Stripe.Checkout.Session

    if(event.type === "checkout.session.completed"){
        const subscription = await stripe.subscriptions.retrieve(sessions.subscription as string)

        if(!sessions?.metadata?.userId){
            return new Response("User id not found", {status: 400})
        }

        await prismadb.userSubscription.create({
            data: {
                userId: sessions?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPreiodEnd: new Date(subscription.current_period_end * 1000),
            }
        })
    }

    if(event.type === "invoice.payment_succeeded"){
        const subscription = await stripe.subscriptions.retrieve(sessions.subscription as string)

        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPreiodEnd: new Date(subscription.current_period_end * 1000),
            }
        })
    }

    return new Response(null, {status: 200})
}