import Heading from "@/components/heading"
import { SubscriptionButton } from "@/components/subscription-button"
import { checkSubscription } from "@/lib/subscription"
import { Settings2Icon } from "lucide-react"

const PageSettings = async () => {
    const isPro = await checkSubscription()
    return (
        <div>
            <Heading 
            title="Settings"
            description="Manage account settings"
            icon={Settings2Icon}
            bgColor="bg-violet-500/10"/>
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro ? "You are on the Pro plan" : "You are not subscribed to the Pro plan"}
                </div>
                <SubscriptionButton isPro={isPro}/>
            </div>
        </div>
    )
}

export default PageSettings