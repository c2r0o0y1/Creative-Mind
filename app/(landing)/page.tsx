import { LandingHero } from "@/components/landing-hero";
import { LandingNavBar } from "@/components/landing-navbar";
import Link from "next/link";

const LandingPage = () => {
    return (
    <div className="h-full">
        <LandingNavBar />
        <LandingHero />
    </div>
    )
}

export default LandingPage