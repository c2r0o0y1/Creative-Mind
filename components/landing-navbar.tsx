"use client"

import { useAuth } from "@clerk/nextjs"
import { Montserrat } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"


const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

export const LandingNavBar = () => {
    const { isSignedIn } = useAuth()

    return (
        <nav className="p-4 bg-transparent flex justify-between items-center">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image 
                    fill
                    alt="Logo"
                    src="/logo.png"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Creative Mind
                </h1>
            </Link>
            <div className="fleex items-center gap-x-2">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant="outline" className="rounded-full">
                    Start Here
                </Button>
            </Link>
            </div>
        </nav>
    )
}