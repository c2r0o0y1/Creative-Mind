"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNT } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { useProModel } from "@/hooks/use-pro-model";

interface FreeCounterProps {
    apiCount: number;
    isPro: boolean;
}

export const FreeCounter = ({
    apiCount = 0,
    isPro = false
}: FreeCounterProps) => {
    const proModel = useProModel()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    if(isPro) return null
    
    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 spce-y-2">
                        <p>
                            {apiCount} / {MAX_FREE_COUNT} Free Trial
                        </p>
                        <Progress 
                        className="h-3"
                        value={(apiCount / MAX_FREE_COUNT) * 100}
                        />
                    </div>
                    <Button className="w-full" variant="premium" onClick={proModel.onOpen}>
                        Upgrade
                        <ArrowUp className="w-4 h-4 ml-2" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}