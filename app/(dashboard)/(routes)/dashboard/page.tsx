"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code2Icon, ImageIcon, MessageSquare, Music3Icon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";


const tools = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        color: 'text-violet-500',
        bgcolor: 'bg-violet-500/10',
        href: '/conversation'
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: 'text-pink-500',
        bgcolor: 'bg-violet-500/10',
        href: '/image'
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        color: 'text-red-500',
        bgcolor: 'bg-violet-500/10',
        href: '/video'
    },
    {
        label: 'Music Generation',
        icon: Music3Icon,
        color: 'text-orange-500',
        bgcolor: 'bg-violet-500/10',
        href: '/music'
    },
    {
        label: 'Code Generation',
        icon: Code2Icon,
        color: 'text-white-600',
        bgcolor: 'bg-violet-500/10',
        href: '/code'
    }
]

const DashboardPage = () => {
    const router = useRouter()
    return (
    <div>
        <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold">
                Experience the power of <span className="text-violet-600">Creative Mind</span>
            </h2>
            <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
                Play with the <span className="text-blue-500">Creative Mind</span> and see how it can help you to
            </p>
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
            {tools.map((tool) => (
                <Card
                onClick={() => router.push(tool.href)}
                key= {tool.href}
                className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                    <div className="flex items-center gap-x-4">
                        <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                            <tool.icon className={cn("w-8 h-8", tool.color)} />
                        </div>
                        <div className="font-semibold">
                            {tool.label}
                        </div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                </Card>
            ))}
        </div>
    </div>
    )
}

export default DashboardPage;
