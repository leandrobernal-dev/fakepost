import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Phone,
  VideoIcon,
  Info,
  ThumbsUp,
  Camera,
  Image,
  Mic,
  Send,
  Smile,
  PlusCircle,
  Menu,
  Square,
  ChevronLeft,
} from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function MessengerUI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How's it going?",
      sent: false,
      reactions: [{ emoji: "👍", count: 1 }],
    },
    {
      id: 2,
      text: "Hi! I'm doing well, thanks. How about you?",
      sent: true,
      reactions: [],
    },
    {
      id: 3,
      text: "I'm good too. Did you see the photo I sent earlier?",
      sent: false,
      reactions: [],
    },
    {
      id: 4,
      text: "Yes, it looks great! Where was that taken?",
      sent: true,
      reactions: [{ emoji: "😍", count: 1 }],
      replyTo: 3,
    },
    {
      id: 5,
      image:
        "https://i.pinimg.com/564x/ca/eb/d6/caebd678eb248dcfb4bade49db3deb63.jpg",
      sent: false,
      reactions: [{ emoji: "❤️", count: 2 }],
      text: "",
    },
    {
      id: 52,
      image:
        "https://i.pinimg.com/564x/00/2d/05/002d05676a7d33028c1679e54d156d3b.jpg",
      sent: true,
      reactions: [{ emoji: "❤️", count: 2 }],
      text: "",
    },
    {
      id: 6,
      text: "It was taken at the new park downtown. We should visit sometime!",
      sent: false,
      reactions: [],
    },
    {
      id: 7,
      text: "That sounds great! Let me know when you're free.",
      sent: true,
      reactions: [],
    },
    {
      id: 8,
      text: "I'm good to go either this weekend or next.",
      sent: false,
      reactions: [],
    },
    {
      id: 9,
      text: "Awesome! Let's plan on next weekend then.",
      sent: true,
      reactions: [],
    },
    {
      id: 10,
      text: "Sounds good to me. What time were you thinking?",
      sent: false,
      reactions: [],
    },
    {
      id: 11,
      text: "How about 2 PM?",
      sent: true,
      reactions: [],
    },
    {
      id: 12,
      text: "That works for me. See you then!",
      sent: false,
      reactions: [],
    },
    {
      id: 13,
      text: "Looking forward to it!",
      sent: true,
      reactions: [],
    },
    {
      id: 14,
      text: "Me too!",
      sent: false,
      reactions: [],
    },
    {
      id: 15,
      text: "I just realized I have a conflict. Can we reschedule?",
      sent: true,
      reactions: [],
    },
    {
      id: 16,
      text: "Aww, sorry to hear that. When are you free now?",
      sent: false,
      reactions: [],
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sent: true,
          reactions: [],
        },
      ]);
      setNewMessage("");
    }
  };

  const getMessageById = (id) => messages.find((m) => m.id === id);

  return (
    <div className="flex aspect-[9/16] max-w-lg scale-75 flex-col bg-black">
      <div className="flex items-center justify-between p-1 px-4 text-[#e4e6eb]">
        <div className="flex items-center">
          <span className="mr-2 text-sm">10:45</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 h-2 w-2 rounded-full bg-[#e4e6eb]"></span>
          <span className="mr-1 h-2 w-2 rounded-full bg-[#e4e6eb]"></span>
          <span className="mr-2 h-2 w-2 rounded-full bg-[#e4e6eb]"></span>
          <span className="text-sm">100%</span>
        </div>
      </div>
      <div className="flex items-center border-b border-[#3a3b3c] p-3">
        <Button variant="ghost" size="icon" className="mr-2 text-[#e4e6eb]">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Contact" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-1">
          <h1 className="text-lg font-semibold text-[#e4e6eb]">Contact Name</h1>
          <p className="text-sm text-[#b0b3b8]">Active now</p>
        </div>
        <Button variant="ghost" size="icon" className="text-[#e4e6eb]">
          <Phone className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-[#e4e6eb]">
          <VideoIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-[#e4e6eb]">
          <Info className="h-6 w-6" />
        </Button>
      </div>
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl p-3 ${
                message.sent
                  ? "bg-[#0084ff] text-white"
                  : "bg-[#3a3b3c] text-[#e4e6eb]"
              }`}
            >
              {message.replyTo && (
                <div className="mb-2 border-l-4 border-[#4e4f50] pl-2 text-sm opacity-70">
                  {getMessageById(message.replyTo)?.text}
                </div>
              )}
              {message.image && (
                <img
                  src={message.image}
                  alt="Sent image"
                  className="mb-2 rounded-lg"
                />
              )}
              {message.text}
              {message.reactions.length > 0 && (
                <div className="mt-1 flex items-center justify-end space-x-1">
                  {message.reactions.map((reaction, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-[#3a3b3c] px-2 py-1 text-xs text-[#e4e6eb] shadow"
                    >
                      {reaction.emoji} {reaction.count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#3a3b3c] p-3">
        <div className="flex items-center rounded-full bg-[#3a3b3c] p-1">
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <PlusCircledIcon className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Camera className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Image className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Mic className="h-6 w-6" />
          </Button>
          <Input
            type="text"
            placeholder="Message"
            className="flex-1 border-none bg-transparent text-[#e4e6eb] placeholder-[#b0b3b8] focus:ring-0"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Smile className="h-6 w-6" />
          </Button>
          {newMessage ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-[#0084ff]"
              onClick={sendMessage}
            >
              <Send className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="text-[#0084ff]">
              <ThumbsUp className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-16 pb-2">
        <Button variant="ghost" size="icon" className="text-[#b0b3b8]">
          <Menu className="h-6 w-6 rotate-90" />
        </Button>
        <Button variant="ghost" size="icon" className="mx-2">
          <Square className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-[#b0b3b8]">
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex max-w-md flex-col bg-white">
      <div className="flex items-center border-b bg-white p-3">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Contact" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-1">
          <h1 className="text-lg font-semibold">Contact Name</h1>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
        <Button variant="ghost" size="icon">
          <Phone className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <VideoIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Info className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl p-3 ${
                message.sent
                  ? "bg-[#0084ff] text-white"
                  : "bg-[#f1f0f0] text-black"
              }`}
            >
              {message.replyTo && (
                <div className="mb-2 border-l-4 border-gray-400 pl-2 text-sm opacity-70">
                  {getMessageById(message.replyTo)?.text}
                </div>
              )}
              {message.image && (
                <img
                  src={message.image}
                  alt="Sent image"
                  className="mb-2 rounded-lg"
                />
              )}
              {message.text}
              {message.reactions.length > 0 && (
                <div className="mt-1 flex items-center justify-end space-x-1">
                  {message.reactions.map((reaction, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white px-2 py-1 text-xs text-black shadow"
                    >
                      {reaction.emoji} {reaction.count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-3">
        <div className="flex items-center rounded-full bg-[#f1f0f0] p-1">
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Camera className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Image className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Mic className="h-6 w-6" />
          </Button>
          <Input
            type="text"
            placeholder="Message"
            className="flex-1 border-none bg-transparent focus:ring-0"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Smile className="h-6 w-6" />
          </Button>
          {newMessage ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-[#0084ff]"
              onClick={sendMessage}
            >
              <Send className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="text-[#0084ff]">
              <ThumbsUp className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
