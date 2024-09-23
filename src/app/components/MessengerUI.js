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

export default function MessengerUI({ data }) {
  const [newMessage, setNewMessage] = useState("");

  const getMessageById = (id) => data.messages.find((m) => m.id === id);

  return (
    <div
      id="html-section"
      className="flex aspect-[9/18] h-full max-w-sm flex-col bg-black"
    >
      <PhoneDetails phoneSettings={data.phoneSettings} />
      <div className="flex items-center px-3 pb-2">
        <Button variant="ghost" size="icon" className="mr-2 text-[#e4e6eb]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                data.contactDetails.receiverPicture
                  ? data.contactDetails.receiverPicture
                  : "/default-profile.png"
              }
              alt="Contact"
            />
            <AvatarFallback>
              {data.contactDetails.receiverName[0]}
            </AvatarFallback>
          </Avatar>
          {data.contactDetails.active && (
            <span className="absolute bottom-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-black">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
            </span>
          )}
        </div>
        <div className="ml-3 flex-1">
          <h1 className="text-md font-semibold text-[#e4e6eb]">
            {data.contactDetails.receiverName}
          </h1>
          {data.contactDetails.active && (
            <p className="text-xs text-[#b0b3b8]">
              {data.contactDetails.statusText}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon" className="text-[#e4e6eb]">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-[#e4e6eb]">
          <VideoIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-[#e4e6eb]">
          <Info className="h-5 w-5" />
        </Button>
      </div>

      <div
        id="messages-section"
        className={`no-scrollbar flex-1 space-y-1 overflow-y-auto p-4`}
      >
        {data.messages.map((message, index) => {
          const currentTimeSent = new Date(message.dateTime);
          const prevTimeSent = data.messages[index - 1]?.dateTime;
          const isPreviousAndCurrentOneMinuteApart =
            areDatesLessThanOneMinuteApart(prevTimeSent, currentTimeSent);
          const isNextAndCurrentOneMinuteApart = areDatesLessThanOneMinuteApart(
            currentTimeSent,
            data.messages[index + 1]?.dateTime,
          );

          return (
            <div
              key={message.id}
              className={`flex flex-col gap-6 ${message.sent !== data.messages[index + 1]?.sent && !isPreviousAndCurrentOneMinuteApart ? "mb-4" : ""}`}
            >
              {!isPreviousAndCurrentOneMinuteApart ? (
                <div
                  className={`mt-16 w-full text-center text-xs text-zinc-600`}
                >
                  <span>
                    {isSameDay(currentTimeSent, new Date())
                      ? currentTimeSent.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: undefined,
                        })
                      : isWithinInterval(currentTimeSent, {
                            start: subWeeks(new Date(), 1),
                            end: new Date(),
                          })
                        ? currentTimeSent.toLocaleString("default", {
                            weekday: "short",
                          })
                        : currentTimeSent.toLocaleString()}
                  </span>
                </div>
              ) : (
                ""
              )}

              <div
                className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[70%] rounded-2xl p-2 ${message.sent === data.messages[index + 1]?.sent ? (isNextAndCurrentOneMinuteApart ? (message.sent ? "rounded-br-sm" : "rounded-bl-sm") : "") : ""} ${message.sent === data.messages[index - 1]?.sent ? (isPreviousAndCurrentOneMinuteApart ? (message.sent ? "rounded-tr-sm" : "rounded-tl-sm") : "") : ""} ${
                    message.image
                      ? ""
                      : message.sent
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
                      className="rounded-xl"
                    />
                  )}
                  <div className="whitespace-pre-wrap break-words">
                    {message.text}
                  </div>
                  {message.reactions.length > 0 && (
                    <div className="absolute right-0 flex items-center justify-end space-x-1">
                      {message.reactions.map((reaction, index) => (
                        <span
                          key={index}
                          className="rounded-full border-t-2 border-black bg-[#3a3b3c] px-2 py-1 text-xs text-[#e4e6eb] shadow"
                        >
                          {reaction.emoji}{" "}
                          {reaction.count > 1 ? reaction.count : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3">
        <div className="flex items-center rounded-full p-1">
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <PlusCircledIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Camera className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Mic className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Input
              type="text"
              placeholder="Message"
              className="flex-1 rounded-full border-none bg-[#3a3b3c] text-[#e4e6eb] placeholder-[#b0b3b8] focus:ring-0"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></Input>
            <Smile className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0084ff]" />
          </div>
          {newMessage ? (
            <Button variant="ghost" size="icon" className="text-[#0084ff]">
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="text-[#0084ff]">
              <ThumbsUp className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-16 pb-2">
        <Button variant="ghost" size="icon" className="text-[#b0b3b8]">
          <Menu className="h-4 w-4 rotate-90" />
        </Button>
        <Button variant="ghost" size="icon" className="mx-2">
          <Square className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-[#b0b3b8]">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  function isWithinInterval(date, { start, end }) {
    return date >= start && date <= end;
  }
  function areDatesLessThanOneMinuteApart(date1, date2) {
    // Get the absolute difference in time (in milliseconds)
    const differenceInMilliseconds = Math.abs(
      new Date(date1) - new Date(date2),
    );

    // Check if the difference is less than 60,000 milliseconds (1 minute)
    return differenceInMilliseconds < 60000;
  }

  return (
    <div className="flex max-w-md flex-col bg-white">
      <div className="flex items-center border-b bg-white p-3">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
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
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <VideoIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
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
            <Camera className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0084ff]">
            <Mic className="h-5 w-5" />
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
            <Smile className="h-5 w-5" />
          </Button>
          {newMessage ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-[#0084ff]"
              onClick={sendMessage}
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="text-[#0084ff]">
              <ThumbsUp className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
function areDatesLessThanOneMinuteApart(date1, date2) {
  // Get the absolute difference in time (in milliseconds)
  const differenceInMilliseconds = Math.abs(new Date(date1) - new Date(date2));

  // Check if the difference is less than 60,000 milliseconds (1 minute)
  return differenceInMilliseconds < 60000;
}
