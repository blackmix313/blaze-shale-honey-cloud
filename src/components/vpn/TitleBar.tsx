import { Download, Laptop, Minus, Square, Volume2, VolumeX, X } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import { soulHex, stateLabel } from "@/lib/vpn/format";
import { CORE_VERSION } from "@/lib/vpn/defaults";
import type { ConnectionState, SoulColor } from "@/lib/vpn/types";

interface TitleBarProps {
  connectionState: ConnectionState;
  soulColor: SoulColor;
  onSoulColorChange: (color: SoulColor) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  showTraySim: boolean;
  onToggleTraySim: () => void;
  onOpenQuickSetup: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
}

const SOULS: SoulColor[] = ["RED", "CYAN", "YELLOW", "GREEN"];

export function TitleBar({
  connectionState,
  soulColor,
  onSoulColorChange,
  onMinimize,
  onMaximize,
  onClose,
  showTraySim,
  onToggleTraySim,
  onOpenQuickSetup,
  soundOn,
  onToggleSound,
}: TitleBarProps) {
  const connected = connectionState === "CONNECTED";
  const idle = connectionState === "DISCONNECTED" || connectionState === "ERROR";

  return (
    <header className="h-10 bg-ink border-b border-line flex items-center justify-between px-3 select-none z-50 text-xs shrink-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          className="relative shrink-0"
          onClick={() => {
            const next = SOULS[(SOULS.indexOf(soulColor) + 1) % SOULS.length];
            onSoulColorChange(next);
            playSound.cursor();
          }}
          title="Cycle SOUL power"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={soulHex(soulColor)}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-pixel text-[10px] text-cyan tracking-wider uppercase">Aether</span>
          <span className="text-dim font-mono">v{CORE_VERSION}</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-sm bg-panel border border-line-strong text-[9px] font-mono text-muted">
            Aether core
          </span>
        </div>
        <div className="flex items-center gap-1.5 ml-1">
          <div
            className={`size-2 rounded-full ${
              connected ? "bg-soul-green" : idle ? "bg-dim" : "bg-soul-yellow animate-pulse"
            }`}
          />
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted truncate">
            {stateLabel(connectionState)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <div className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-panel border border-line-strong rounded-sm">
          <span className="text-[9px] font-mono text-muted">SOUL</span>
          {SOULS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                onSoulColorChange(c);
                playSound.select();
              }}
              className={`size-2.5 rounded-full transition-transform ${
                soulColor === c ? "scale-125 ring-1 ring-white" : "opacity-40 hover:opacity-100"
              }`}
              style={{ backgroundColor: soulHex(c) }}
              title={`SOUL ${c}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            onOpenQuickSetup();
            playSound.select();
          }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-mono bg-cyan/10 border border-cyan/50 text-cyan hover:text-fg hover:border-cyan"
          title="Export Aether core launcher"
        >
          <Download className="size-3" />
          <span className="font-medium">Windows core</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onToggleTraySim();
            playSound.cursor();
          }}
          className={`flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-mono border ${
            showTraySim
              ? "bg-cyan/15 text-cyan border-cyan/50"
              : "bg-panel text-muted hover:text-fg border-line-strong"
          }`}
        >
          <Laptop className="size-3" />
          <span className="hidden lg:inline">Tray</span>
        </button>
        <button
          type="button"
          onClick={onToggleSound}
          className="p-1 rounded-sm text-muted hover:text-cyan hover:bg-panel"
          title={soundOn ? "Mute" : "Unmute"}
        >
          {soundOn ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5 text-soul-red" />}
        </button>
        <div className="flex items-center ml-1 border-l border-line pl-1">
          <button
            type="button"
            onClick={() => {
              onMinimize();
              playSound.cursor();
            }}
            className="size-7 flex items-center justify-center text-muted hover:bg-panel hover:text-fg"
            title="Minimize"
          >
            <Minus className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => {
              onMaximize();
              playSound.cursor();
            }}
            className="size-7 flex items-center justify-center text-muted hover:bg-panel hover:text-fg"
            title="Maximize"
          >
            <Square className="size-2.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              playSound.cancel();
            }}
            className="size-7 flex items-center justify-center text-muted hover:bg-soul-red hover:text-white"
            title="Close to tray"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
