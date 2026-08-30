import { Download, Globe, Route, Shield, Sparkles, Swords, Terminal } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import { soulHex } from "@/lib/vpn/format";
import type { ActiveTab, ConnectionState, SoulColor } from "@/lib/vpn/types";

interface BattleMenuBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  connectionState: ConnectionState;
  onToggleConnect: () => void;
  soulColor: SoulColor;
}

export function BattleMenuBar({
  activeTab,
  onSelectTab,
  connectionState,
  onToggleConnect,
  soulColor,
}: BattleMenuBarProps) {
  const isConnected = connectionState === "CONNECTED";
  const isBusy =
    connectionState !== "CONNECTED" &&
    connectionState !== "DISCONNECTED" &&
    connectionState !== "ERROR";

  const items: Array<{
    id: string;
    label: string;
    short: string;
    color: string;
    icon: typeof Swords;
    tab?: ActiveTab;
    action?: () => void;
    active?: boolean;
  }> = [
    {
      id: "FIGHT",
      label: isConnected ? "DISCONNECT" : isBusy ? "CANCEL" : "FIGHT",
      short: isConnected ? "STOP" : isBusy ? "STOP" : "FIGHT",
      color: "#ff6600",
      icon: Swords,
      action: onToggleConnect,
      active: isConnected,
    },
    { id: "ACT", label: "TUN", short: "TUN", color: "#00e5ff", icon: Shield, tab: "TUN_SETTINGS" },
    { id: "ITEM", label: "DPI", short: "DPI", color: "#ffe600", icon: Sparkles, tab: "DPI_SETTINGS" },
    { id: "SERVERS", label: "GATES", short: "GATES", color: "#7dd3fc", icon: Globe, tab: "SERVERS" },
    { id: "MERCY", label: "ROUTE", short: "ROUTE", color: "#ff2d7b", icon: Route, tab: "ROUTING" },
    { id: "LOGS", label: "LOGS", short: "LOGS", color: "#00ff66", icon: Terminal, tab: "LOGS" },
    { id: "SETUP", label: "CORE", short: "CORE", color: "#00e5ff", icon: Download, tab: "QUICK_SETUP" },
  ];

  return (
    <nav className="w-full bg-void border-t-2 border-line px-2 py-2 select-none shrink-0">
      <div className="max-w-6xl mx-auto grid grid-cols-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-1.5 sm:gap-2">
        {items.map((item) => {
          const isItemActive = item.tab ? activeTab === item.tab : item.active;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`battle-btn-${item.id.toLowerCase()}`}
              type="button"
              onMouseEnter={() => playSound.cursor()}
              onClick={() => {
                if (item.action) item.action();
                else if (item.tab) {
                  onSelectTab(activeTab === item.tab ? "DASHBOARD" : item.tab);
                  playSound.select();
                }
              }}
              className={`relative flex items-center justify-center gap-1 px-2 py-2 rounded-sm border-2 transition-colors duration-150 font-pixel text-[8px] sm:text-[10px] uppercase tracking-wider min-h-11 ${
                isItemActive
                  ? "bg-panel text-fg"
                  : "border-line bg-ink text-muted hover:border-line-strong hover:text-fg"
              }`}
              style={{
                borderColor: isItemActive ? item.color : undefined,
                boxShadow: isItemActive ? `0 0 12px ${item.color}55` : undefined,
              }}
            >
              {isItemActive && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill={soulHex(soulColor)} className="shrink-0 hidden sm:block">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}
              <Icon className="size-3 shrink-0" />
              <span className="sm:hidden">{item.short}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
