"use client";

import Menu from "@/app/components/Menu";
import MessengerUI from "@/app/components/MessengerUI";
import { toPng } from "html-to-image";
import { useState } from "react";

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

  const quality = 10;

  const captureImage = () => {
    const node = document.getElementById("html-section");
    const messagesSection = document.getElementById("messages-section");

    const scrollTop = messagesSection.scrollTop;

    const nodeClone = node.cloneNode(true);
    const messagesSectionClone = messagesSection.cloneNode(true);

    // Create a new container element
    const messagesContainer = document.createElement("div");
    messagesContainer.className = "relative flex-1 overflow-hidden";

    // Set messagesSectionClone position absolute
    messagesSectionClone.style.position = "absolute";
    messagesSectionClone.style.top = -scrollTop + "px";

    // Add messagesSectionClone to messagesContainer
    messagesContainer.appendChild(messagesSectionClone);

    const oldMessages = nodeClone.querySelector("#messages-section");
    console.log(messagesContainer);

    if (oldMessages) {
      oldMessages.parentNode.replaceChild(messagesContainer, oldMessages);
    }
    document.body.appendChild(nodeClone); // Append to the DOM

    toPng(nodeClone, {
      pixelRatio: quality,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "html-image.png";
        link.href = dataUrl;
        link.click();

        document.body.removeChild(nodeClone);
      })
      .catch((err) => console.error("Error generating image", err));
  };

  return (
    <div>
      <div className="flex justify-center">
        <main className="grid h-screen w-full max-w-4xl grid-cols-2 gap-4 rounded-md bg-zinc-900 p-4">
          <Menu data={data} setData={setData} />
          <div className="flex justify-center">
            <MessengerUI data={data} setData={setData} />
          </div>
        </main>
      </div>
    </div>
  );
}
