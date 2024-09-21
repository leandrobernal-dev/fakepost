"use client";

import MessengerUI from "@/app/components/MessengerUI";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { useState } from "react";

export default function Home() {
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
      <nav className="h-16"></nav>
      <div className="flex justify-center">
        <main className="grid w-full max-w-4xl grid-cols-2 gap-4 rounded-md bg-zinc-900 p-4">
          <div>
            <Button onClick={captureImage}>Download</Button>
          </div>
          <div className="flex justify-center">
            <MessengerUI messages={messages} />
          </div>
        </main>
      </div>
    </div>
  );
}
