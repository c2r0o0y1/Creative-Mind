"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("0de3f6bf-6da8-48b0-9c25-6451881c5e8b")
    }, [])

    return null
}