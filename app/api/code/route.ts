import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import {increaseApiLimit, checkApiLimit} from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });


    export async function POST(
    req: Request
    ) {
    try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!messages) {
        return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if(!freeTrial && !isPro) {
        return new NextResponse("Free trial limit exceeded", { status: 403 });
    }
    
    const response = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a code generator. You must answer only in mardown code snippets.Use code comment for explanation. "}, ...messages],
        model: "gpt-3.5-turbo",
    });

    if(!isPro){
        await increaseApiLimit();
    }

    return NextResponse.json(response.choices[0].message.content);
    } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
    }
};