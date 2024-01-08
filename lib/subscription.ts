import { auth } from "@clerk/nextjs"
import prismadb from "./prismadb"

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
    const { userId } = auth()

    if(!userId){
        return false
    }

    const userSubscription = await prismadb.userSubscription.findFirst({
        where: {
            userId,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPreiodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        }
    })

    if(!userSubscription){
        return false
    }

    const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPreiodEnd?.getTime()! > Date.now()

    return !!isValid
}