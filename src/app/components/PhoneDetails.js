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
      <div className="flex items-center">
        <span className="flex items-center text-sm">
          {phoneSettings.wifi >= 75 ? (
            <Wifi />
          ) : phoneSettings.wifi >= 50 ? (
            <WifiHigh />
          ) : phoneSettings.wifi >= 25 ? (
            <WifiLow />
          ) : (
            <WifiZero />
          )}
        </span>
        <span className="flex items-center text-sm">
          {phoneSettings.cellular >= 75 ? (
            <SignalHigh />
          ) : phoneSettings.cellular >= 50 ? (
            <SignalMedium />
          ) : phoneSettings.cellular >= 25 ? (
            <SignalLow />
          ) : (
            <SignalZero />
          )}
        </span>
        <span className="flex items-center text-sm">
          {phoneSettings.battery}%
          <span className="ml-1">
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
