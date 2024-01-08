"use client"

import { useProModel } from "@/hooks/use-pro-model"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { ArrowUp, Check, Code2Icon, ImageIcon, MessageSquare, Music3Icon, VideoIcon } from "lucide-react"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

const tools = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        color: 'text-violet-500',
        bgcolor: 'bg-violet-500/10',
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: 'text-pink-500',
        bgcolor: 'bg-violet-500/10',
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        color: 'text-red-500',
        bgcolor: 'bg-violet-500/10',
    },
    {
        label: 'Music Generation',
        icon: Music3Icon,
        color: 'text-orange-500',
        bgcolor: 'bg-violet-500/10',
    },
    {
        label: 'Code Generation',
        icon: Code2Icon,
        color: 'text-white-600',
        bgcolor: 'bg-violet-500/10',
    }
]


export const ProModel = () => {
    const proModel = useProModel()
    const [loading, setLoading] = useState(false)
    const onSubscribe = async () => {
        try{
            setLoading(true)
            const response = axios.get("/api/stripe")

            window.location.href = (await response).data.url
        }catch(error){
            toast.error("Something went wrong🥲")
        }finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Creative Mind
                            <Badge className="uppercase text-sm py-1" variant="premium">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card
                            key={tool.label}
                            className="p-3 boder-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                                        <tool.icon className={cn(tool.color, "w-6 h-6")} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="w-4 h-4 text-green-500" />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full">
                        Upgrade
                        <ArrowUp className="w-4 h-4 ml-2" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}