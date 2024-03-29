"use client"

import { cn } from "@/lib/utils";
import { Code2Icon, ImageIcon, LayoutDashboard, MessageSquare, Music3Icon, Settings2Icon, VideoIcon} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({weight: "600", subsets:["latin"]})

const routes = [
    {
        label: "DashBoard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-500"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-red-500"
    },
    {
        label: "Music Generation",
        icon: Music3Icon,
        href: "/music",
        color: "text-orange-500"
    },
    {
        label: "Code Generation",
        icon: Code2Icon,
        href: "/code",
        color: "text-white-500" 
    },
    {
        label: "Settings",
        icon: Settings2Icon,
        href: "/settings",
    }
]

interface SideBarProps {
    apiCount: number;
    isPro: boolean;
}

const SideBar = ({
    apiCount = 0,
    isPro = false
}: SideBarProps) => {
    const pathname = usePathname()
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="Logo"
                        src = "/logo.png"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                        Creative Mind
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", 
                        pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <FreeCounter 
                isPro={isPro}
                apiCount={apiCount}
                />
            </div>
        </div>
    )
}

export default SideBar;