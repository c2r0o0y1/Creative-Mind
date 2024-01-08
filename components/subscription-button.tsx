"use client"

import axios from "axios";
import { Button } from "./ui/button";
import { useState } from "react";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({
    isPro = false
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false)
    const onClick = async () => {
        try{
            setLoading(true)
            const response = axios.get("/api/stripe")

            window.location.href = (await response).data.url
        }catch(error){
            console.log("BILLING_ERROR", error)
        }finally{
            setLoading(false)
        }
    }
    return (
        <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
            {isPro ? "Manage Subscription" : "Subscribe to Pro"}
            {!isPro && <span className="ml-1">for $9.99/mo</span>}
        </Button>
    )
}