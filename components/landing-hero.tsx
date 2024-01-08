"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import  TypewriterComponent  from "typewriter-effect"
import { Button } from "./ui/button"

export const LandingHero = () => {
    const { isSignedIn } = useAuth()


    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>An Software for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400">
                    <TypewriterComponent 
                    options={{
                        strings: [
                            "Chat Companion.",
                            "Image Generation.",
                            "Music Generation.",
                            "Video Generation.",
                            "Code Generation."
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                    />
            </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Unleash your creativity with the power of AI.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="premium" className="text-lg p-4 rounded-full">
                        Start Creating Now
                    </Button>
                </Link>
            </div>
        </div>
    )
}