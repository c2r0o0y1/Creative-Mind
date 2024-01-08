"use client"

import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import SideBar from "./sidebar"
import { use, useEffect, useState } from "react"

interface MobileSideBarProps {
    apiCount: number
    isPro: boolean
}

const MobileSideBar = (
    {
        apiCount,
        isPro 
    }: MobileSideBarProps) => {
    const [isMounted, setIsMounted] = useState(false)
    
    useEffect(() => {
        setIsMounted(true)
    }
    , [])

    if(!isMounted){
        return null
    }
    
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <SideBar isPro={isPro} apiCount={apiCount}/>
        </SheetContent>
        </Sheet>
    )
}

export default MobileSideBar;