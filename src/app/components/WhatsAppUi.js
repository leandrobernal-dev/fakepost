import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    MoreVertical,
    Phone,
    VideoIcon,
    Paperclip,
    Camera,
    Mic,
    Send,
} from "lucide-react";

export default function WhatsAppUI() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey there! How's it going?", sent: false },
        {
            id: 2,
            text: "Hi! I'm doing well, thanks. How about you?",
            sent: true,
        },
        {
            id: 3,
            text: "I'm good too. Did you finish the project?",
            sent: false,
        },
        {
            id: 4,
            text: "Yes, I just submitted it. It was challenging but interesting!",
            sent: true,
        },
        {
            id: 5,
            text: "That's great! Let's catch up soon to discuss it.",
            sent: false,
        },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                { id: messages.length + 1, text: newMessage, sent: true },
            ]);
            setNewMessage("");
        }
    };

    return (
        <div className="flex flex-col aspect-[9/16] scale-[70%] max-w-md bg-gray-100">
            <div className="flex items-center p-3 bg-[#075E54] text-white">
                <Button variant="ghost" size="icon" className="mr-2">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Contact" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                    <h1 className="text-lg font-semibold">Contact Name</h1>
                </div>
                <Button variant="ghost" size="icon">
                    <VideoIcon className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Phone className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-6 w-6" />
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sent ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.sent
                                    ? "bg-[#DCF8C6] text-black"
                                    : "bg-white text-black"
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 bg-gray-200">
                <div className="flex items-center bg-white rounded-full">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#128C7E]"
                    >
                        <Paperclip className="h-6 w-6" />
                    </Button>
                    <Input
                        type="text"
                        placeholder="Type a message"
                        className="flex-1 border-none focus:ring-0"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#128C7E]"
                    >
                        <Camera className="h-6 w-6" />
                    </Button>
                    {newMessage ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#128C7E]"
                            onClick={sendMessage}
                        >
                            <Send className="h-6 w-6" />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#128C7E]"
                        >
                            <Mic className="h-6 w-6" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
