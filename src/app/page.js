"use client";

import MessengerUI from "@/app/components/MessengerUI";
import WhatsAppUI from "@/app/components/whatsAppUi";
import { toPng } from "html-to-image";
import Image from "next/image";

export default function Home() {
  const captureImage = () => {
    const node = document.getElementById("html-section");
    // Specify your custom width, height, and pixelRatio (for higher resolution)
    const options = {
      width: 1080, // custom width
      height: 1920, // custom height
      pixelRatio: 2, // controls resolution, e.g., 2x for high-resolution image
    };
    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "html-image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("Error generating image", err));
  };
  return (
    <div className="">
      <main className="">
        <MessengerUI />
      </main>
    </div>
  );
}
