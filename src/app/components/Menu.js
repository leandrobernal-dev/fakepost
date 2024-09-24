"use client";

import MessagesForm from "@/app/components/MessagesForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { BatteryIcon, Clock, SignalIcon, WifiIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DateTimePicker from "@/app/components/DateTimePicker";
import html2canvas from "html2canvas";

const captureImage = async (elementId) => {
  const element = document.getElementById("html-section");

  if (!element) {
    console.error("Element not found");
    return;
  }

  try {
    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 3,
    });

    // Convert the canvas to a data URL (base64 image)
    const image = canvas.toDataURL("image/png");

    // Create a temporary link element to download the image
    const link = document.createElement("a");
    link.href = image;
    link.download = "captured-image.png";

    // Simulate a click to trigger the download
    link.click();
  } catch (error) {
    console.error("Error capturing image: ", error);
  }
};

export default function Menu({ data, setData }) {
  const downloadQuality = 10;
  const [maxBattery, setMaxBattery] = useState(100);

  const setPhoneSettings = (name, value) => {
    setData((prev) => ({
      ...prev,
      phoneSettings: { ...prev.phoneSettings, [name]: value },
    }));
  };

  const setContactDetails = (name, value) => {
    setData((prev) => ({
      ...prev,
      contactDetails: { ...prev.contactDetails, [name]: value },
    }));
  };

  return (
    <div className="custom-scrollbar space-y-2 pr-2">
      <Accordion
        type="single"
        defaultValue={"device-status"}
        className="w-full"
      >
        <AccordionItem value="device-status" className="">
          <AccordionTrigger className="px-8 py-4 font-bold text-white hover:bg-zinc-700">
            Phone Settings
          </AccordionTrigger>
          <AccordionContent className="px-8 py-6 text-white">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="battery"
                    className="flex items-center text-white"
                  >
                    <BatteryIcon className="mr-2" /> Battery
                  </Label>
                  <Label
                    htmlFor="maxBattery"
                    className="flex items-center text-white"
                  >
                    Max
                  </Label>
                  <Input
                    type="number"
                    id="maxBattery"
                    name="maxBattery"
                    min={1}
                    defaultValue={maxBattery}
                    onChange={(e) => setMaxBattery(Number(e.target.value))}
                  />
                  <div className="flex items-center gap-2">
                    <Slider
                      id="battery"
                      name="battery"
                      min={0}
                      max={maxBattery}
                      step={1}
                      value={[data.phoneSettings.battery]}
                      onValueChange={(value) =>
                        setPhoneSettings("battery", value[0])
                      }
                      className="w-full"
                    />
                    <div className="text-sm text-gray-400">
                      {data.phoneSettings.battery}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center text-white">
                  <Clock className="mr-2" />
                  Date & Time
                </Label>
                <div className="space-y-2">
                  <DateTimePicker
                    onUpdate={(value) => setPhoneSettings("dateTime", value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wifi" className="flex items-center text-white">
                  <WifiIcon className="mr-2" /> Wi-Fi
                </Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="wifi"
                    name="wifi"
                    min={0}
                    max={100}
                    step={1}
                    value={[data.phoneSettings.wifi]}
                    onValueChange={(value) =>
                      setPhoneSettings("wifi", value[0])
                    }
                    className="w-full"
                  />
                  <div className="text-sm text-gray-400">
                    {data.phoneSettings.wifi}%
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="cellular"
                  className="flex items-center text-white"
                >
                  <SignalIcon className="mr-2" /> Cellular
                </Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="cellular"
                    name="cellular"
                    min={0}
                    max={100}
                    step={1}
                    value={[data.phoneSettings.cellular]}
                    onValueChange={(value) =>
                      setPhoneSettings("cellular", value[0])
                    }
                    className="w-full"
                  />
                  <div className="text-sm text-gray-400">
                    {data.phoneSettings.cellular}%
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contact-details" className="">
          <AccordionTrigger className="px-8 py-4 font-bold text-white hover:bg-zinc-700">
            Contact Details
          </AccordionTrigger>
          <AccordionContent className="px-8 py-6 text-white">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Receiver Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={data.contactDetails.receiverName}
                  onChange={(e) =>
                    setContactDetails("receiverName", e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="image">Receiver profile picture</label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]; // Get the uploaded file
                    if (file) {
                      const reader = new FileReader();

                      // Read the file as Data URL (Base64)
                      reader.onloadend = () => {
                        setData((prevData) => ({
                          ...prevData,
                          contactDetails: {
                            ...prevData.contactDetails,
                            receiverPicture: reader.result,
                          }, // Update image in state
                        }));
                      };

                      reader.readAsDataURL(file); // This triggers onloadend event
                    }
                  }} // Update the state on image change
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-name">Sender Name</Label>
                <Input
                  type="text"
                  id="sender-name"
                  value={data.contactDetails.senderName}
                  onChange={(e) =>
                    setContactDetails("senderName", e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="sender-image">Sender profile picture</label>
                <Input
                  type="file"
                  id="sender-image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]; // Get the uploaded file
                    if (file) {
                      const reader = new FileReader();

                      // Read the file as Data URL (Base64)
                      reader.onloadend = () => {
                        setData((prevData) => ({
                          ...prevData,
                          contactDetails: {
                            ...prevData.contactDetails,
                            senderPicture: reader.result,
                          }, // Update image in state
                        }));
                      };

                      reader.readAsDataURL(file); // This triggers onloadend event
                    }
                  }} // Update the state on image change
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Active Status</Label>
                <Switch
                  checked={data.contactDetails.active}
                  onCheckedChange={(value) =>
                    setContactDetails("active", value)
                  }
                  className="flex space-x-4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusText">Status Text</Label>
                <Input
                  type="text"
                  id="statusText"
                  name="statusText"
                  value={data.contactDetails.statusText}
                  onChange={(e) =>
                    setContactDetails("statusText", e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="messages" className="">
          <AccordionTrigger className="px-8 py-4 font-bold text-white hover:bg-zinc-700">
            Messages
          </AccordionTrigger>
          <AccordionContent className="p-2 text-white">
            <MessagesForm data={data} setData={setData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button onClick={captureImage}>Download</Button>
    </div>
  );
}
