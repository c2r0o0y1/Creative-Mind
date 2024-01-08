import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "./mobile-sidebar";
import { get } from "http";
import { getApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
    const apiCount = await getApiCount()
    const isPro = await checkSubscription()
    return(
        <div className="flex items-center p-4">
            <MobileSideBar isPro={isPro} apiCount={apiCount}/>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    )
}

export default Navbar;