"use client";

import Menu from "@/app/components/Menu";
import MessengerUI from "@/app/components/MessengerUI";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import PreviewCanvas from "@/app/components/PreviewCanvas";

export default function Home() {
  const [data, setData] = useState({
    phoneSettings: {
      battery: 4,
      dateTime: null,
      wifi: 100,
      cellular: 50,
    },
    contactDetails: {
      senderName: "John Doe",
      senderPicture: "",
      receiverName: "Jane Doe",
      receiverPicture: "",
      active: true,
      statusText: "Active Now",
    },
    messages: [],
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      dateTime: new Date(),
    }));
  }, []);
  return (
    <div className="flex h-screen w-full">
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
        <main className="h-full p-2">
          <PreviewCanvas>
            <MessengerUI data={data} setData={setData} />
          </PreviewCanvas>
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
