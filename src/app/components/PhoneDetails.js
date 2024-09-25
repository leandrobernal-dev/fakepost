import {
  Battery20,
  Battery30,
  Battery50,
  Battery60,
  Battery80,
  Battery90,
  BatteryFull,
} from "@mui/icons-material";
import {
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  Wifi,
  WifiHigh,
  WifiLow,
  WifiZero,
} from "lucide-react";

const Battery0 = () => (
  <svg
    class="MuiSvgIcon-root MuiSvgIcon-fontSize10px css-1y2zrd1-MuiSvgIcon-root"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="Battery20Icon"
  >
    <path
      fill-opacity=".3"
      d="M7 17v3.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V17H7zM17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V17h10V5.33z"
    ></path>
  </svg>
);

export default function PhoneDetails({ phoneSettings }) {
  return (
    <div className="flex items-center justify-between p-1 px-4 text-[#e4e6eb]">
      <div className="flex items-center">
        <span className="mr-2 text-xs">
          {phoneSettings.dateTime
            ?.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(/(AM|PM)/, "")}
        </span>
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
        <span className="flex">
          <span className="text-xs leading-5">{phoneSettings.battery}%</span>
          {phoneSettings.battery >= 90 ? (
            <BatteryFull fontSize="10px" />
          ) : phoneSettings.battery >= 80 ? (
            <Battery90 fontSize="10px" />
          ) : phoneSettings.battery >= 60 ? (
            <Battery80 fontSize="10px" />
          ) : phoneSettings.battery >= 50 ? (
            <Battery60 fontSize="10px" />
          ) : phoneSettings.battery >= 30 ? (
            <Battery50 fontSize="10px" />
          ) : phoneSettings.battery >= 20 ? (
            <Battery30 fontSize="10px" />
          ) : phoneSettings.battery > 0 ? (
            <Battery20 fontSize="10px" />
          ) : (
            <Battery0 fontSize="10px" />
          )}
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
