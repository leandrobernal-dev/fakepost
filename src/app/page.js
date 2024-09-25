import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Sparkles,
  Share2,
  Smartphone,
  Layout,
  Laugh,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="rounded-lg bg-zinc-800 p-6 text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
};

const AppCard = ({ name, image }) => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-zinc-800 p-2 py-4 text-center">
      <div>
        <img
          src={image}
          alt={`${name} UI`}
          className="mb-4 h-auto w-full max-w-60 rounded"
        />
        <h4 className="font-bold">{name}</h4>
      </div>
    </div>
  );
};

const StepCard = ({ number, title, description, icon }) => {
  return (
    <div className="rounded-lg bg-zinc-800 p-6 text-center">
      <div className="mb-4 flex items-center justify-center">
        <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#2DD4BF] text-xl font-bold text-black">
          {number}
        </div>
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
};

export default function Home() {
  const supportedApps = [
    {
      name: "Facebook Messenger",
      image: "/messenger-logo.png",
      available: true,
    },
    {
      name: "WhatsApp",
      image: "/whatsapp-logo.png",
      available: false,
    },
    {
      name: "iMessage",
      image: "/imessage-logo.png",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">FakePost</h1>
          <Link href={"/create"}>
            <Button className="bg-[#2DD4BF] font-bold text-black hover:bg-[#2DD4BF]/90">
              Create Meme
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-16 py-8 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Create Hilarious Chat Memes
          </h2>
          <p className="mb-8 text-xl text-zinc-400">
            Generate fake chats for multiple messaging apps and create
            viral-worthy memes in seconds!
          </p>
          <Link href={"/create"}>
            <Button className="rounded-full bg-[#2DD4BF] px-6 py-3 text-lg font-bold text-black hover:bg-[#2DD4BF]/90">
              Start Creating
            </Button>
          </Link>
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-center text-2xl font-bold">
            Supported Chat Apps
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {supportedApps.map((app) => (
              <div
                key={app.name}
                className="relative overflow-hidden rounded-lg bg-zinc-800 p-4"
              >
                <AppCard {...app} />
                {!app.available && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-3xl font-bold text-white">
                    Coming Soon...
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Layout className="h-8 w-8 text-[#2DD4BF]" />}
            title="Multiple App UIs"
            description="Create memes for various popular messaging apps"
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-[#2DD4BF]" />}
            title="Customizable"
            description="Personalize every aspect of your fake chats"
          />
          <FeatureCard
            icon={<Share2 className="h-8 w-8 text-[#2DD4BF]" />}
            title="Easy Sharing"
            description="Export and share your memes with one click"
          />
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-center text-2xl font-bold">How It Works</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="1"
              title="Choose an App"
              description="Select the messaging app UI you want to use for your meme"
              icon={<Smartphone className="h-8 w-8" />}
            />
            <StepCard
              number="2"
              title="Create Your Chat"
              description="Add messages, emojis, and customize the conversation"
              icon={<MessageSquare className="h-8 w-8" />}
            />
            <StepCard
              number="3"
              title="Share and Enjoy"
              description="Export your meme and share it with friends or on social media"
              icon={<Laugh className="h-8 w-8" />}
            />
          </div>
        </section>

        <section className="mb-16 rounded-lg bg-zinc-800 p-8">
          <h3 className="mb-4 text-center text-2xl font-bold">
            See FakePost in Action
          </h3>
          <div className="flex w-full justify-center">
            <Image
              className="w-full rounded-xl shadow-2xl shadow-zinc-700 md:w-[70%]"
              src={"/fakepost-demo.gif"}
              alt="Fakepost Demo"
              width={500}
              height={500}
            />
          </div>
          <p className="mt-6 text-center text-zinc-400">
            Watch how easy it is to create hilarious chat memes with FakePost
          </p>
        </section>

        <section className="text-center">
          <h3 className="mb-4 text-2xl font-bold">
            Ready to become a meme master?
          </h3>
          <Link href={"/create"}>
            <Button className="rounded-full bg-[#2DD4BF] px-6 py-3 text-lg font-bold text-black hover:bg-[#2DD4BF]/90">
              Start Creating for Free
            </Button>
          </Link>
        </section>
      </main>

      <footer className="mt-12 bg-black py-4">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          &copy; 2024 FakePost. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
