"use client";

import * as z from "zod"
import Heading from "@/components/heading"
import { Code2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {formSchema} from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react" 
import { cn } from "@/lib/utils";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
import { useProModel } from "@/hooks/use-pro-model";

interface ChatCompletionRequestMessage {
    role: string;
    content: string;
}
const CodePage = () => {
    const proModel = useProModel();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        prompt: ""
    }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
        const newMessages = [...messages, userMessage];
        
        const response = await axios.post('/api/code', { messages: newMessages });
        setMessages((current) => [...current, userMessage, response.data]);
        
        form.reset();
    } catch (error: any) {
        if(error?.response?.status === 403){
            proModel.onOpen();
        }
    } finally {
        router.refresh();
    }
    }

    return ( 
    <div>
        <Heading
        title="Code Generation"
        description="Help you generate code"
        icon={Code2Icon}
        iconColor="text-white-500"
        bgColor="bg-violet-500/10"
        />
        <div className="px-4 lg:px-8">
        <div>
            <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
                "
            >
                <FormField
                name="prompt"
                render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                        <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Implement dijaskarta algorithm in python" 
                        {...field}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
                </Button>
            </form>
            </Form>
        </div>
        <div className="space-y-4 mt-4">
            {isLoading && (
                <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader />
                </div>
            )}
            {messages.length === 0 && !isLoading && (
                <div>
                    <Empty label="No Prompt Has Given!!"/>
                </div>
            )}
            <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
                <div 
                key={message.content} 
                className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
                >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                components={{
                    pre: ({ node, ...props }) => (
                        <div>
                        </div>
                    )
                }}>
                    {message.content || ""}
                </ReactMarkdown>
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
    );
    }

export default CodePage;

