"use client";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";

interface MessageInputProps {
    userId?: string;
    senderId?: string;
    // userId: string;
    // senderId: string;
}

export function MessageInput({userId, senderId }: MessageInputProps) {
    const [message, setMessage] = useState("");

    const content = message.trim();

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // handleSend();
        }
    };
    // async function sendMessageToApi(conversationId: string, senderId: string) {
    //     try {
    //         const response = await fetch('/api/messages', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 conversationId,
    //                 senderId,
    //                 content,
    //             }),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Failed to send message');
    //         }
    
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //         throw error;
    //     }
    // }

    // const handleSend = async () => {
    //     try {
    //         await sendMessageToApi(userId, senderId);
    //         setMessage("");
    //     } catch (error) {
    //         console.error('Error in handling message send:', error);
    //     }
    // };


    return (
        <div className="border-t bg-background p-4 w-full h-full">
            <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                    <Textarea
                        placeholder="Type a message..."
                        minLength={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="min-h-[80px] resize-none pr-12"                    />
                    <div className="absolute bottom-2 right-2 flex gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8"
                                >
                                    <Paperclip className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Attach file</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8"
                                >
                                    <Smile className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Add emoji</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <Button
                    size="icon"
                    // onClick={handleSend}
                    disabled={!message.trim()}
                    className="h-10 w-10"
                >
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}