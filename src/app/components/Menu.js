import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BatteryIcon, Clock, SignalIcon, WifiIcon } from "lucide-react";
import { useState } from "react";

export default function Menu({ phoneSettings, setPhoneSettings }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhoneSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name, value) => {
    setPhoneSettings((prev) => ({ ...prev, [name]: value[0] }));
  };
  return (
    <div className="custom-scrollbar overflow-y-scroll pr-2">
      <div className="w-full max-w-md rounded-lg bg-zinc-800 p-8 shadow-xl">
        <h2 className="mb-6 text-xl font-bold text-white">Device Status</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="battery" className="flex items-center text-white">
              <BatteryIcon className="mr-2" /> Battery
            </Label>
            <div className="flex items-center gap-2">
              <Slider
                id="battery"
                name="battery"
                min={0}
                max={100}
                step={1}
                value={[phoneSettings.battery]}
                onValueChange={(value) => handleSliderChange("battery", value)}
                className="w-full"
              />
              <div className="text-sm text-gray-400">
                {phoneSettings.battery}%
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
              value={phoneSettings.time}
              onChange={handleInputChange}
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
                value={[phoneSettings.wifi]}
                onValueChange={(value) => handleSliderChange("wifi", value)}
                className="w-full"
              />
              <div className="text-sm text-gray-400">{phoneSettings.wifi}%</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cellular" className="flex items-center text-white">
              <SignalIcon className="mr-2" /> Cellular
            </Label>
            <div className="flex items-center gap-2">
              <Slider
                id="cellular"
                name="cellular"
                min={0}
                max={100}
                step={1}
                value={[phoneSettings.cellular]}
                onValueChange={(value) => handleSliderChange("cellular", value)}
                className="w-full"
              />
              <div className="text-sm text-gray-400">
                {phoneSettings.cellular}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
