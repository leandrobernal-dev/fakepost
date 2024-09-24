"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, Tablet } from "lucide-react";

export default function PreviewCanvas({ children }) {
  const [viewport, setViewport] = useState("mobile");

  const viewports = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
  };

  return (
    <div className="">
      <div className="hidden justify-center space-x-2">
        <Button
          variant={viewport === "mobile" ? "default" : "outline"}
          onClick={() => setViewport("mobile")}
        >
          <Smartphone className="mr-2 h-4 w-4" /> Mobile
        </Button>
        <Button
          variant={viewport === "tablet" ? "default" : "outline"}
          onClick={() => setViewport("tablet")}
        >
          <Tablet className="mr-2 h-4 w-4" /> Tablet
        </Button>
      </div>
      <div className="flex justify-center">
        <div
          className={`${viewport === "mobile" ? "aspect-[9/18]" : "aspect-[16/9]"} overflow-hidden rounded-lg transition-all duration-300 ease-in-out`}
          style={{
            width: viewports[viewport].width,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
