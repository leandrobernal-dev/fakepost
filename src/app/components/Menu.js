import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { BatteryIcon, Clock, SignalIcon, WifiIcon } from "lucide-react";

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
  const handleStatusChange = (value) => {
    setData((prev) => ({ ...prev, status: value }));
  };
  const handleSliderChange = (name, value) => {
    setPhoneSettings((prev) => ({ ...prev, [name]: value[0] }));
  };
  return (
    <div className="custom-scrollbar space-y-2 overflow-y-scroll pr-2">
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
                value={[data.phoneSettings.battery]}
                onValueChange={(value) => setPhoneSettings("battery", value)}
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
                onValueChange={(value) => setPhoneSettings("wifi", value)}
                className="w-full"
              />
              <div className="text-sm text-gray-400">
                {data.phoneSettings.wifi}%
              </div>
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
                value={[data.phoneSettings.cellular]}
                onValueChange={(value) => setPhoneSettings("cellular", value)}
                className="w-full"
              />
              <div className="text-sm text-gray-400">
                {data.phoneSettings.cellular}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md rounded-lg bg-zinc-800 p-8 shadow-xl">
        <h2 className="mb-6 text-xl font-bold text-white">Contact Details</h2>
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
            <Label htmlFor="image">Profile picture</Label>
            <Input
              type="url"
              id="image"
              name="image"
              value={data.contactDetails.image}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup
              value={data.contactDetails.status}
              onValueChange={(value) => setContactDetails("status", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Active" id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Inactive" id="inactive" />
                <Label htmlFor="inactive">Inactive</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statusText">Status Text</Label>
            <Input
              type="text"
              id="statusText"
              name="statusText"
              value={data.contactDetails.statusText}
              onChange={(e) => setContactDetails("statusText", e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
