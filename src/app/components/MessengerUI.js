import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NextImage from "next/image";
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
  Menu,
  Square,
  ChevronLeft,
} from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import PhoneDetails from "@/app/components/PhoneDetails";

export default function MessengerUI({ messages, data, setData }) {
  const [newMessage, setNewMessage] = useState("");

  const getMessageById = (id) => data.messages.find((m) => m.id === id);

  return (
    <div
      id="html-section"
      className="flex aspect-[9/16] w-full max-w-sm flex-col bg-black"
    >
      <PhoneDetails phoneSettings={data.phoneSettings} />
      <div className="flex items-center border-b border-[#3a3b3c] p-3">
        <Button variant="ghost" size="icon" className="mr-2 text-[#e4e6eb]">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Contact" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-1">
          <h1 className="text-lg font-semibold text-[#e4e6eb]">
            {data.contactDetails.name}
          </h1>
          <p className="text-sm text-[#b0b3b8]">
            {data.contactDetails.statusText}
          </p>
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

      <div
        id="messages-section"
        className={`no-scrollbar flex-1 space-y-4 overflow-y-auto p-4`}
      >
        {data.messages.map((message) => (
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
                <NextImage
                  width={200}
                  height={200}
                  quality={100}
                  priority
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
          />
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Smile className="h-6 w-6" />
          </Button>
          {newMessage ? (
            <Button variant="ghost" size="icon" className="text-[#0084ff]">
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
        {data.messages.map((message) => (
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
