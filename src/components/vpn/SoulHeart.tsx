import { soulHex, soulTitle, stateLabel } from "@/lib/vpn/format";
import { playSound } from "@/lib/vpn/audio";
import type { ConnectionState, SoulColor } from "@/lib/vpn/types";

interface SoulHeartProps {
  connectionState: ConnectionState;
  soulColor: SoulColor;
  tensionPoints: number;
  onClick: () => void;
}

export function SoulHeart({
  connectionState,
  soulColor,
  tensionPoints,
  onClick,
}: SoulHeartProps) {
  const fill = soulHex(soulColor);
  const meta = soulTitle(soulColor);
  const isConnected = connectionState === "CONNECTED";
  const isBusy =
    connectionState !== "CONNECTED" &&
    connectionState !== "DISCONNECTED" &&
    connectionState !== "ERROR";

  return (
    <div className="flex flex-col items-center justify-center select-none py-1 scale-90 sm:scale-100 origin-center">
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute size-44 rounded-full border border-dashed ${
            isConnected
              ? "border-cyan/40 animate-spin-slow"
              : isBusy
                ? "border-soul-yellow/50 animate-spin-slow"
                : "border-line-strong/60"
          }`}
        />
        <div
          className={`absolute size-36 rounded-full border ${
            isConnected
              ? "border-magenta/30 animate-spin-rev"
              : isBusy
                ? "border-cyan/40 animate-spin-rev"
                : "border-transparent"
          }`}
        />
        <div
          className="absolute size-28 rounded-full blur-xl opacity-50"
          style={{ backgroundColor: isConnected ? fill : isBusy ? "#ffe600" : "#1a2347" }}
        />
        {isConnected && (
          <svg className="absolute size-48 -rotate-90 pointer-events-none" viewBox="0 0 192 192">
            <circle cx="96" cy="96" r="86" fill="transparent" stroke="#212952" strokeWidth="3" />
            <circle
              cx="96"
              cy="96"
              r="86"
              fill="transparent"
              stroke="#ff9900"
              strokeWidth="4"
              strokeDasharray={540}
              strokeDashoffset={540 - (540 * tensionPoints) / 100}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-300"
            />
          </svg>
        )}
        <button
          id="main-soul-connect-btn"
          type="button"
          onClick={() => {
            onClick();
            playSound.heartbeat();
          }}
          className={`relative z-10 p-6 rounded-full transition-transform duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-cyan ${
            isConnected ? "animate-soul-pulse" : isBusy ? "animate-pulse" : "hover:scale-110"
          }`}
          style={{ ["--soul" as string]: fill }}
          title={isConnected ? "Disconnect tunnel" : "Establish Aether tunnel"}
        >
          <svg
            width="68"
            height="68"
            viewBox="0 0 24 24"
            style={{
              filter: `drop-shadow(0 0 ${isConnected ? "18px" : "8px"} ${
                isConnected ? fill : isBusy ? "#ffe600" : "#495788"
              })`,
            }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isConnected ? fill : isBusy ? "#ffe600" : "#6b7ab8"}
              stroke="#ffffff"
              strokeWidth={isConnected ? 0.8 : 0.5}
            />
          </svg>
        </button>
      </div>
      <div className="mt-3 text-center">
        <div
          className="font-pixel text-[10px] tracking-wider"
          style={{ color: isConnected ? fill : "#7b8ab8" }}
        >
          {stateLabel(connectionState)}
        </div>
        <p className="text-[11px] font-mono text-muted mt-1">
          {isConnected
            ? `Wintun Layer-3 · ${meta.title}`
            : isBusy
              ? "Aether core is opening a validated path..."
              : "Press the SOUL or FIGHT to engage Aether"}
        </p>
      </div>
    </div>
  );
}
