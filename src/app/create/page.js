"use client";

import Menu from "@/app/components/Menu";
import MessengerUI from "@/app/components/MessengerUI";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export default function Home() {
  const [data, setData] = useState({
    phoneSettings: {
      battery: 4,
      time: "10:45",
      wifi: 100,
      cellular: 50,
    },
    contactDetails: {
      name: "John Doe",
      image: "",
      active: true,
      statusText: "Active Now",
    },
    messages: [
      {
        id: 1,
        text: "Hey there! How's it going?",
        sendSuccess: true,
        seen: false,
        senderName: "John Doe",
        time: "10:00",
        reactions: [{ emoji: "👍", count: 1 }],
      },
      {
        id: 2,
        text: "Hi! I'm doing well, thanks. How about you?",
        sent: true,
        sendSuccess: true,
        seen: true,
        senderName: "Jane Doe",
        time: "10:05",
        reactions: [],
      },
      {
        id: 3,
        text: "I'm good too. Did you see the photo I sent earlier?",
        sendSuccess: true,
        seen: false,
        senderName: "John Doe",
        time: "10:10",
        reactions: [],
      },
      {
        id: 4,
        text: "Yes, it looks great! Where was that taken?",
        sent: true,
        sendSuccess: true,
        seen: true,
        senderName: "Jane Doe",
        time: "10:15",
        reactions: [{ emoji: "😍", count: 1 }],
        replyTo: 3,
      },
      {
        id: 5,
        image:
          "https://i.pinimg.com/564x/ca/eb/d6/caebd678eb248dcfb4bade49db3deb63.jpg",
        sendSuccess: true,
        seen: false,
        senderName: "John Doe",
        time: "10:20",
        reactions: [{ emoji: "❤️", count: 2 }],
        text: "",
      },
      {
        id: 52,
        image:
          "https://i.pinimg.com/564x/00/2d/05/002d05676a7d33028c1679e54d156d3b.jpg",
        sent: true,
        sendSuccess: true,
        seen: true,
        senderName: "Jane Doe",
        time: "10:25",
        reactions: [{ emoji: "❤️", count: 2 }],
        text: "",
      },
      {
        id: 6,
        text: "It was taken at the new park downtown. We should visit sometime!",
        sendSuccess: true,
        seen: false,
        senderName: "John Doe",
        time: "10:30",
        reactions: [],
      },
    ],
  });
  return (
    <div className="flex h-screen w-full overflow-y-auto">
      <div className="hidden overflow-auto lg:block lg:w-96 lg:shrink-0 lg:border-r">
        <div className="flex h-full flex-col justify-between px-4 py-6">
          <div>
            <Link
              href="#"
              className="flex items-center gap-2 font-bold"
              prefetch={false}
            >
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg">fakepost</span>
            </Link>
            <Menu data={data} setData={setData} />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-black px-4 py-3 lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              href="#"
              className="flex items-center gap-2 font-bold"
              prefetch={false}
            >
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg">fakepost</span>
            </Link>
            <Sheet>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[90%] overflow-auto bg-black"
              >
                <Menu data={data} setData={setData} />
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="h-full p-4">
          <MessengerUI data={data} setData={setData} />
        </main>
      </div>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
