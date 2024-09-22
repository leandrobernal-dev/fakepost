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
          <span className="ml-1 flex items-end">
            {phoneSettings.battery >= 75 ? (
              <BatteryFull />
            ) : phoneSettings.battery >= 50 ? (
              <BatteryMedium />
            ) : phoneSettings.battery >= 25 ? (
              <BatteryLow />
            ) : phoneSettings.battery > 5 ? (
              <Battery />
            ) : (
              <BatteryWarning />
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
