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

export default function Menu({ data, setData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

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
    <div className="custom-scrollbar space-y-2 overflow-y-scroll pr-2">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="device-status" className="border-b-0">
          <AccordionTrigger className="rounded-t-lg px-8 py-4 text-xl font-bold text-white hover:bg-zinc-700">
            Phone Settings
          </AccordionTrigger>
          <AccordionContent className="rounded-b-lg bg-zinc-800 px-8 py-6 text-white">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="battery"
                  className="flex items-center text-white"
                >
                  <BatteryIcon className="mr-2" /> Battery
                </Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="battery"
                    name="battery"
                    min={0}
                    max={100}
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

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center text-white">
                  <Clock className="mr-2" />
                  Time
                </Label>
                <Input
                  type="time"
                  id="time"
                  name="time"
                  value={data.phoneSettings.time}
                  onChange={(e) => setPhoneSettings("time", e.target.value)}
                  className="border-gray-600 bg-gray-700 text-white"
                />
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

        <AccordionItem value="contact-details" className="border-b-0">
          <AccordionTrigger className="rounded-t-lg px-8 py-4 text-xl font-bold text-white hover:bg-zinc-700">
            Contact Details
          </AccordionTrigger>
          <AccordionContent className="rounded-b-lg bg-zinc-800 px-8 py-6 text-white">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={data.contactDetails.name}
                  onChange={(e) => setContactDetails("name", e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image">Profile picture</label>
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
                            image: reader.result,
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

        <AccordionItem value="messages" className="border-b-0">
          <AccordionTrigger className="rounded-t-lg px-8 py-4 text-xl font-bold text-white hover:bg-zinc-700">
            Messages
          </AccordionTrigger>
          <AccordionContent className="rounded-b-lg bg-zinc-800 px-8 py-6 text-white">
            <MessagesForm data={data} setData={setData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
