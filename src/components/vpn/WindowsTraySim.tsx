import { ArrowDown, ArrowUp, Maximize2, Power, X } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import { formatSpeed, soulHex, stateLabel } from "@/lib/vpn/format";
import type { ConnectionState, ServerNode, SoulColor, TrafficStats } from "@/lib/vpn/types";
import { IsoBadge } from "./IsoBadge";

interface Props {
  currentServer: ServerNode;
  connectionState: ConnectionState;
  soulColor: SoulColor;
  traffic: TrafficStats;
  onToggleConnect: () => void;
  onRestoreWindow: () => void;
  onClose: () => void;
}

export function WindowsTraySim({
  currentServer,
  connectionState,
  soulColor,
  traffic,
  onToggleConnect,
  onRestoreWindow,
  onClose,
}: Props) {
  const connected = connectionState === "CONNECTED";

  return (
    <div className="fixed bottom-3 right-3 z-50 w-72 bg-ink border-2 border-line-strong rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.75)] overflow-hidden font-mono text-xs select-none">
      <div className="flex items-center justify-between px-3 py-2 bg-panel border-b border-line">
        <div className="flex items-center gap-1.5">
          <div className={`size-2 rounded-full ${connected ? "bg-soul-green" : "bg-dim"}`} />
          <span className="font-pixel text-[8px] text-cyan">Aether tray</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              onRestoreWindow();
              playSound.select();
            }}
            className="p-1.5 hover:bg-surface rounded-sm text-muted hover:text-fg min-h-9 min-w-9 flex items-center justify-center"
            title="Restore"
          >
            <Maximize2 className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              playSound.cancel();
            }}
            className="p-1.5 hover:bg-surface rounded-sm text-muted hover:text-fg min-h-9 min-w-9 flex items-center justify-center"
            title="Hide"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="p-3 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <IsoBadge iso={currentServer.iso} />
            <div className="min-w-0">
              <div className="truncate text-fg">{currentServer.city}</div>
              <div className="text-[10px] text-dim">{stateLabel(connectionState)}</div>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={soulHex(soulColor)}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="flex items-center gap-1 text-cyan">
            <ArrowDown className="size-3" />
            <span className="tabular-nums">{formatSpeed(traffic.downloadSpeed)}</span>
          </div>
          <div className="flex items-center gap-1 text-magenta">
            <ArrowUp className="size-3" />
            <span className="tabular-nums">{formatSpeed(traffic.uploadSpeed)}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onToggleConnect();
            playSound.select();
          }}
          className={`w-full min-h-11 rounded-sm font-pixel text-[9px] flex items-center justify-center gap-2 ${
            connected ? "bg-soul-red/20 border border-soul-red text-soul-red" : "bg-cyan text-void"
          }`}
        >
          <Power className="size-3.5" />
          {connected ? "DISCONNECT" : "FIGHT"}
        </button>
      </div>
    </div>
  );
}
