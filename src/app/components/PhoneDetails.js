import {
  Battery,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  Wifi,
  WifiHigh,
  WifiLow,
  WifiZero,
} from "lucide-react";
import React, { useState } from "react";

export default function PhoneDetails({ phoneSettings }) {
  return (
    <div className="flex items-center justify-between p-1 px-4 text-[#e4e6eb]">
      <div className="flex items-center">
        <span className="mr-2 text-sm">{phoneSettings.time}</span>
      </div>
      <div className="flex items-end">
        <span className="flex text-sm">
          {phoneSettings.wifi >= 75 ? (
            <Wifi className="w-4" />
          ) : phoneSettings.wifi >= 50 ? (
            <WifiHigh className="w-4" />
          ) : phoneSettings.wifi >= 25 ? (
            <WifiLow className="w-4" />
          ) : (
            <WifiZero className="w-4" />
          )}
        </span>
        <span className="flex text-sm">
          {phoneSettings.cellular >= 75 ? (
            <SignalHigh className="w-4" />
          ) : phoneSettings.cellular >= 50 ? (
            <SignalMedium className="w-4" />
          ) : phoneSettings.cellular >= 25 ? (
            <SignalLow className="w-4" />
          ) : (
            <SignalZero className="w-4" />
          )}
        </span>
        <span className="flex items-end text-sm">
          {phoneSettings.battery}%
          <BatteryIcon batteryLevel={phoneSettings.battery} />
        </span>
      </div>
    </div>
  );
}

function BatteryIcon({ batteryLevel }) {
  const getBatteryColor = (level) => {
    if (level <= 20) return "#ff3b30";
    if (level <= 50) return "#ffcc00";
    return "#34c759";
  };

  return (
    <svg
      width="40"
      height="28"
      viewBox="0 0 60 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 -rotate-90"
    >
      <rect x="1" y="1" width="35" height="28" rx="3" fill="gray" />
      <rect x="36" y="8" width="5" height="12" fill="gray" />
      <rect
        x="3"
        y="3"
        width={Math.min(31 * (batteryLevel / 100), 31)}
        height="24"
        rx="2"
        fill={getBatteryColor(batteryLevel)}
      />
    </svg>
  );
}
