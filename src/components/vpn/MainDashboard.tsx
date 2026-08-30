import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  Cpu,
  Layers,
  Lock,
  Radio,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { PROTOCOL_META, SCAN_MODE_META } from "@/lib/vpn/defaults";
import { formatBytes, formatSpeed, formatUptime, protocolLabel } from "@/lib/vpn/format";
import { buildAetherCommand } from "@/lib/vpn/cli";
import type {
  ConnectionState,
  CoreConfig,
  DpiEvasionConfig,
  ScanMode,
  ServerNode,
  SoulColor,
  TrafficStats,
  TunConfig,
} from "@/lib/vpn/types";
import { DialogueBox } from "./DialogueBox";
import { IsoBadge } from "./IsoBadge";
import { SoulHeart } from "./SoulHeart";
import { TrafficCanvas } from "./TrafficCanvas";

interface MainDashboardProps {
  currentServer: ServerNode;
  connectionState: ConnectionState;
  soulColor: SoulColor;
  traffic: TrafficStats;
  tunConfig: TunConfig;
  dpiConfig: DpiEvasionConfig;
  core: CoreConfig;
  publicIp: string | null;
  exitIp: string | null;
  onToggleConnect: () => void;
  onOpenServers: () => void;
  onOpenTun: () => void;
  onOpenDpi: () => void;
  onOpenQuickSetup: () => void;
  onCorePatch: (patch: Partial<CoreConfig>) => void;
}

const SCANS: ScanMode[] = ["turbo", "balanced", "thorough", "stealth", "ironclad"];
const PROTOS: CoreConfig["protocol"][] = ["masque", "wg", "gool"];

export function MainDashboard({
  currentServer,
  connectionState,
  soulColor,
  traffic,
  tunConfig,
  dpiConfig,
  core,
  publicIp,
  exitIp,
  onToggleConnect,
  onOpenServers,
  onOpenTun,
  onOpenDpi,
  onOpenQuickSetup,
  onCorePatch,
}: MainDashboardProps) {
  const connected = connectionState === "CONNECTED";
  const cmd = buildAetherCommand(core, dpiConfig, currentServer);

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-ink border-2 border-line rounded-lg p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Zap className="size-4 text-tp" />
              <span className="font-pixel text-[9px] text-tp tracking-wider">TP · THROUGHPUT</span>
            </div>
            <span className="font-pixel text-[10px] text-tp tabular-nums">{traffic.tensionPoints}%</span>
          </div>
          <div className="mt-2.5 w-full bg-surface h-3.5 rounded-sm border border-tp/40 overflow-hidden relative">
            <div
              className="h-full bg-tp transition-[width] duration-300"
              style={{ width: `${traffic.tensionPoints}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-muted mt-1.5 flex justify-between tabular-nums">
            <span>Up {formatUptime(traffic.uptimeSeconds)}</span>
            <span>Jitter {traffic.jitter}ms</span>
          </p>
        </div>

        <div className="bg-ink border-2 border-line rounded-lg p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Radio className="size-4 text-soul-green" />
              <span className="font-pixel text-[9px] text-soul-green tracking-wider">HP · PATH</span>
            </div>
            <span className="font-pixel text-[10px] text-soul-green tabular-nums">
              {traffic.healthPoints}/100
            </span>
          </div>
          <div className="mt-2.5 w-full bg-surface h-3.5 rounded-sm border border-soul-green/40 overflow-hidden relative">
            <div
              className="h-full bg-soul-green transition-[width] duration-300"
              style={{ width: `${traffic.healthPoints}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-muted mt-1.5 flex justify-between tabular-nums">
            <span>Loss {traffic.packetLoss}%</span>
            <span>{connected ? `${traffic.ping} ms` : "idle"}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenServers}
          className="bg-ink border-2 border-line hover:border-cyan/60 transition-colors rounded-lg p-3 text-left flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <IsoBadge iso={currentServer.iso} />
              <div className="min-w-0">
                <div className="text-xs font-medium text-fg flex items-center gap-1 truncate">
                  <span className="truncate">{currentServer.name}</span>
                  <ChevronRight className="size-3 text-dim shrink-0" />
                </div>
                <div className="text-[10px] font-mono text-muted">
                  {currentServer.city}, {currentServer.country}
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-medium text-soul-green bg-panel px-1.5 py-0.5 rounded-sm border border-line tabular-nums">
              {currentServer.ping}ms
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="px-1.5 py-0.5 bg-panel rounded-sm text-[9px] font-mono text-cyan border border-cyan/30">
              {protocolLabel(currentServer.protocol)}
            </span>
            <span className="px-1.5 py-0.5 bg-panel rounded-sm text-[9px] font-mono text-muted border border-line-strong">
              Load {currentServer.load}%
            </span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-7 bg-ink border-2 border-line rounded-xl p-4 flex flex-col items-center relative overflow-hidden">
          <div className="absolute inset-0 scanlines opacity-30" />
          <div className="w-full flex items-center justify-between text-xs z-10 mb-1 gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-panel border border-line-strong text-[10px] font-mono text-muted">
              <Cpu className="size-3 text-cyan" />
              <span>Aether v1.8.0</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-panel border border-line-strong text-[10px] font-mono text-soul-green">
              <ShieldCheck className="size-3" />
              <span>{tunConfig.enabled ? "TUN ready" : "SOCKS only"}</span>
            </div>
          </div>

          <div className="z-10">
            <SoulHeart
              connectionState={connectionState}
              soulColor={soulColor}
              tensionPoints={traffic.tensionPoints}
              onClick={onToggleConnect}
            />
          </div>

          <div className="w-full mt-2 z-10 bg-void border border-line rounded-md p-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-1">
              <span className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${connected ? "bg-cyan animate-pulse" : "bg-dim"}`} />
                Live tunnel flow
              </span>
              <span className="tabular-nums">{formatSpeed(traffic.downloadSpeed + traffic.uploadSpeed)}</span>
            </div>
            <TrafficCanvas connectionState={connectionState} downloadSpeed={traffic.downloadSpeed} />
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-ink border-2 border-line rounded-lg p-3">
              <div className="flex items-center gap-1 text-[10px] font-mono text-muted">
                <ArrowDown className="size-3.5 text-cyan" />
                DOWNLOAD
              </div>
              <div className="text-lg font-medium font-mono text-cyan mt-1 tabular-nums">
                {formatSpeed(traffic.downloadSpeed)}
              </div>
              <div className="text-[10px] font-mono text-dim mt-0.5 tabular-nums">
                {formatBytes(traffic.totalDownloaded)}
              </div>
            </div>
            <div className="bg-ink border-2 border-line rounded-lg p-3">
              <div className="flex items-center gap-1 text-[10px] font-mono text-muted">
                <ArrowUp className="size-3.5 text-magenta" />
                UPLOAD
              </div>
              <div className="text-lg font-medium font-mono text-magenta mt-1 tabular-nums">
                {formatSpeed(traffic.uploadSpeed)}
              </div>
              <div className="text-[10px] font-mono text-dim mt-0.5 tabular-nums">
                {formatBytes(traffic.totalUploaded)}
              </div>
            </div>
          </div>

          <div className="bg-ink border-2 border-line rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-line pb-1.5">
              <span className="font-pixel text-[9px] text-fg flex items-center gap-1.5">
                <Lock className="size-3.5 text-cyan" />
                AETHER CORE
              </span>
              <span className="text-[9px] font-mono text-soul-green">
                {connected ? "LIVE" : "ARMED"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {PROTOS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onCorePatch({ protocol: p, noize: p === "masque" ? "firewall" : "balanced" })}
                  className={`px-1 py-2 rounded-sm border text-[9px] font-pixel uppercase min-h-11 ${
                    core.protocol === p
                      ? "border-cyan bg-cyan/10 text-cyan"
                      : "border-line bg-panel text-muted hover:text-fg"
                  }`}
                  title={PROTOCOL_META[p].detail}
                >
                  {PROTOCOL_META[p].label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {SCANS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onCorePatch({ scanMode: m })}
                  className={`px-2 py-1.5 rounded-sm border text-[9px] font-mono min-h-9 ${
                    core.scanMode === m
                      ? "border-soul-yellow bg-soul-yellow/10 text-soul-yellow"
                      : "border-line bg-panel text-muted hover:text-fg"
                  }`}
                  title={SCAN_MODE_META[m].detail}
                >
                  {SCAN_MODE_META[m].label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenTun}
              className="w-full flex items-center justify-between p-2 rounded-sm bg-panel border border-line-strong hover:border-cyan/50 text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Layers className="size-4 text-cyan shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-fg">Wintun adapter</div>
                  <div className="text-[9px] font-mono text-muted truncate">
                    {tunConfig.adapterName} · {tunConfig.virtualIp}
                  </div>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded-sm bg-surface text-[9px] font-mono text-cyan">CFG</span>
            </button>

            <button
              type="button"
              onClick={onOpenDpi}
              className="w-full flex items-center justify-between p-2 rounded-sm bg-panel border border-line-strong hover:border-soul-yellow/50 text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="size-4 text-soul-yellow shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-fg">DPI / noize / fragment</div>
                  <div className="text-[9px] font-mono text-muted truncate">
                    {core.noize} · {dpiConfig.masqueHttp.toUpperCase()} · [{dpiConfig.fragMin}-{dpiConfig.fragMax}B]
                  </div>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded-sm bg-surface text-[9px] font-mono text-soul-yellow">TUNE</span>
            </button>

            <div className="flex items-center justify-between p-2 rounded-sm bg-panel border border-line-strong">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="size-4 text-soul-green shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-fg">Kill switch · SOCKS5</div>
                  <div className="text-[9px] font-mono text-muted truncate">{core.socksBind}</div>
                </div>
              </div>
              <span className="size-2 rounded-full bg-soul-green" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded-sm bg-panel border border-line">
                <div className="text-dim">Your IP</div>
                <div className="text-fg truncate tabular-nums">{publicIp ?? "—"}</div>
              </div>
              <div className="p-2 rounded-sm bg-panel border border-line">
                <div className="text-dim">Exit IP</div>
                <div className="text-cyan truncate tabular-nums">{connected ? exitIp ?? "—" : "not tunneled"}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenQuickSetup}
              className="w-full flex items-center justify-between p-2 rounded-sm bg-cyan/10 border border-cyan/40 hover:border-cyan text-left"
            >
              <div>
                <div className="text-[11px] font-medium text-cyan">Run on Windows</div>
                <div className="text-[9px] font-mono text-muted truncate">{cmd}</div>
              </div>
              <span className="px-2 py-0.5 rounded-sm bg-cyan text-void font-pixel text-[8px] shrink-0">
                EXPORT
              </span>
            </button>
          </div>
        </div>
      </div>

      <DialogueBox />
    </div>
  );
}
