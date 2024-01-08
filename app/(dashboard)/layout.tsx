import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { getApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
    children
}:{
    children: React.ReactNode;
}) => {
    const apiCount = await getApiCount();
    const isPro = await checkSubscription();
    return(
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:felx-col md:fixed md:insert-y-0 bg-gray-900">
                <SideBar isPro={isPro} apiCount={apiCount}/>
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;