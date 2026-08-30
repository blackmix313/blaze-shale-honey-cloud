import { create } from "zustand";
import { persist } from "zustand/middleware";
import { playSound, setSoundEnabled as setAudioFlag } from "./audio";
import {
  DEFAULT_CORE,
  DEFAULT_DPI_CONFIG,
  DEFAULT_ROUTING_RULES,
  DEFAULT_SERVERS,
  DEFAULT_TUN_CONFIG,
  IDLE_TRAFFIC,
  INITIAL_LOGS,
} from "./defaults";
import { EngineAbortError, liveTickLog, makeDisconnectLogs, runAetherConnect } from "./engine";
import type {
  ActiveTab,
  ConnectionState,
  CoreConfig,
  DpiEvasionConfig,
  LogEntry,
  RoutingRule,
  ServerNode,
  SoulColor,
  TrafficStats,
  TunConfig,
} from "./types";

interface VpnStore {
  connectionState: ConnectionState;
  soulColor: SoulColor;
  servers: ServerNode[];
  currentServerId: string;
  tunConfig: TunConfig;
  dpiConfig: DpiEvasionConfig;
  core: CoreConfig;
  routingRules: RoutingRule[];
  logs: LogEntry[];
  traffic: TrafficStats;
  publicIp: string | null;
  exitIp: string | null;
  lastGoodGateway: string | null;
  isMaximized: boolean;
  isMinimized: boolean;
  showTray: boolean;
  soundEnabled: boolean;
  activeTab: ActiveTab;
  addLog: (entry: LogEntry) => void;
  setSoulColor: (color: SoulColor) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setTunConfig: (config: TunConfig) => void;
  setDpiConfig: (config: DpiEvasionConfig) => void;
  setCore: (patch: Partial<CoreConfig>) => void;
  setRoutingRules: (rules: RoutingRule[]) => void;
  setServers: (servers: ServerNode[] | ((prev: ServerNode[]) => ServerNode[])) => void;
  selectServer: (server: ServerNode) => void;
  toggleFavorite: (id: string) => void;
  toggleConnect: () => void;
  setMinimized: (v: boolean) => void;
  setMaximized: (v: boolean) => void;
  setShowTray: (v: boolean) => void;
  setSoundEnabled: (v: boolean) => void;
  clearLogs: () => void;
  tickTraffic: () => void;
}

let abortCtl: AbortController | null = null;
let trafficTimer: ReturnType<typeof setInterval> | null = null;

function stopTrafficTimer() {
  if (trafficTimer) {
    clearInterval(trafficTimer);
    trafficTimer = null;
  }
}

export const useVpnStore = create<VpnStore>()(
  persist(
    (set, get) => ({
      connectionState: "DISCONNECTED",
      soulColor: "RED",
      servers: DEFAULT_SERVERS,
      currentServerId: DEFAULT_SERVERS[0].id,
      tunConfig: DEFAULT_TUN_CONFIG,
      dpiConfig: DEFAULT_DPI_CONFIG,
      core: DEFAULT_CORE,
      routingRules: DEFAULT_ROUTING_RULES,
      logs: INITIAL_LOGS,
      traffic: { ...IDLE_TRAFFIC, ping: DEFAULT_SERVERS[0].ping },
      publicIp: null,
      exitIp: null,
      lastGoodGateway: null,
      isMaximized: false,
      isMinimized: false,
      showTray: true,
      soundEnabled: true,
      activeTab: "DASHBOARD",

      addLog: (entry) =>
        set((s) => ({ logs: [...s.logs.slice(-280), entry] })),

      setSoulColor: (soulColor) => set({ soulColor }),

      setActiveTab: (activeTab) => set({ activeTab }),

      setTunConfig: (tunConfig) => set({ tunConfig }),

      setDpiConfig: (dpiConfig) => set({ dpiConfig }),

      setCore: (patch) => set((s) => ({ core: { ...s.core, ...patch } })),

      setRoutingRules: (routingRules) => set({ routingRules }),

      setServers: (servers) =>
        set((s) => ({
          servers: typeof servers === "function" ? servers(s.servers) : servers,
        })),

      selectServer: (server) => {
        const { connectionState, toggleConnect } = get();
        const was = get().currentServerId;
        set({ currentServerId: server.id, activeTab: "DASHBOARD" });
        get().addLog({
          id: `sel-${Date.now()}`,
          timestamp: new Date().toTimeString().split(" ")[0] + ".000",
          level: "INFO",
          tag: "GATEWAY",
          message: `Selected ${server.name} (${server.serverAddress}:${server.port})`,
        });
        if (connectionState === "CONNECTED" && was !== server.id) {
          toggleConnect();
          window.setTimeout(() => get().toggleConnect(), 700);
        }
      },

      toggleFavorite: (id) =>
        set((s) => ({
          servers: s.servers.map((n) =>
            n.id === id ? { ...n, isFavorite: !n.isFavorite } : n,
          ),
        })),

      toggleConnect: () => {
        const s = get();
        const current =
          s.servers.find((n) => n.id === s.currentServerId) ?? s.servers[0];

        if (s.connectionState === "CONNECTED" || s.connectionState === "RECONNECTING") {
          abortCtl?.abort();
          abortCtl = null;
          stopTrafficTimer();
          playSound.cancel();
          makeDisconnectLogs(current, s.tunConfig).forEach((e) => get().addLog(e));
          set({
            connectionState: "DISCONNECTED",
            exitIp: null,
            traffic: {
              ...s.traffic,
              downloadSpeed: 0,
              uploadSpeed: 0,
              tensionPoints: 0,
              uptimeSeconds: 0,
              ping: current.ping,
              jitter: 0,
            },
          });
          return;
        }

        if (
          s.connectionState !== "DISCONNECTED" &&
          s.connectionState !== "ERROR"
        ) {
          abortCtl?.abort();
          abortCtl = null;
          stopTrafficTimer();
          playSound.cancel();
          set({
            connectionState: "DISCONNECTED",
            traffic: { ...s.traffic, downloadSpeed: 0, uploadSpeed: 0, tensionPoints: 0, uptimeSeconds: 0 },
          });
          get().addLog({
            id: `cancel-${Date.now()}`,
            timestamp: new Date().toTimeString().split(" ")[0] + ".000",
            level: "WARN",
            tag: "CANCEL",
            message: "Connection sequence aborted by user.",
          });
          return;
        }

        abortCtl?.abort();
        abortCtl = new AbortController();
        const signal = abortCtl.signal;
        playSound.heartbeat();

        void (async () => {
          try {
            await runAetherConnect(
              signal,
              {
                servers: get().servers,
                current,
                core: get().core,
                dpi: get().dpiConfig,
                tun: get().tunConfig,
                lastGoodGateway: get().lastGoodGateway,
              },
              {
                setState: (connectionState) => set({ connectionState }),
                log: (entry) => get().addLog(entry),
                setServers: (updater) => set((st) => ({ servers: updater(st.servers) })),
                setCurrentServer: (server) =>
                  set((st) => ({
                    currentServerId: server.id,
                    servers: st.servers.map((n) => (n.id === server.id ? server : n)),
                  })),
                setLastGoodGateway: (lastGoodGateway) => set({ lastGoodGateway }),
                setPublicIp: (publicIp) => set({ publicIp }),
                setExitIp: (exitIp) => set({ exitIp }),
              },
            );
            playSound.connected();
            stopTrafficTimer();
            trafficTimer = setInterval(() => get().tickTraffic(), 1000);
          } catch (err) {
            if (err instanceof EngineAbortError) return;
            set({ connectionState: "ERROR" });
            get().addLog({
              id: `err-${Date.now()}`,
              timestamp: new Date().toTimeString().split(" ")[0] + ".000",
              level: "ERROR",
              tag: "CORE",
              message: err instanceof Error ? err.message : "Tunnel failed.",
            });
          }
        })();
      },

      setMinimized: (isMinimized) => set({ isMinimized }),
      setMaximized: (isMaximized) => set({ isMaximized }),
      setShowTray: (showTray) => set({ showTray }),
      setSoundEnabled: (soundEnabled) => {
        setAudioFlag(soundEnabled);
        set({ soundEnabled });
      },
      clearLogs: () => set({ logs: [] }),

      tickTraffic: () => {
        const s = get();
        if (s.connectionState !== "CONNECTED") return;
        const current =
          s.servers.find((n) => n.id === s.currentServerId) ?? s.servers[0];
        const base = 9 * 1024 * 1024;
        const factor = 0.55 + Math.random() * 0.9;
        const downloadSpeed = Math.floor(base * factor);
        const uploadSpeed = Math.floor(downloadSpeed * 0.21);
        const ping = Math.max(12, current.ping + Math.floor(Math.random() * 5) - 2);
        const jitter = +(Math.random() * 1.6 + 0.3).toFixed(1);
        const tensionPoints = Math.min(
          100,
          Math.max(28, Math.floor((downloadSpeed / (22 * 1024 * 1024)) * 100)),
        );
        set({
          traffic: {
            downloadSpeed,
            uploadSpeed,
            totalDownloaded: s.traffic.totalDownloaded + downloadSpeed,
            totalUploaded: s.traffic.totalUploaded + uploadSpeed,
            ping,
            jitter,
            packetLoss: Math.random() > 0.92 ? 0.1 : 0,
            tensionPoints,
            healthPoints: Math.max(88, 100 - Math.floor(jitter * 2)),
            uptimeSeconds: s.traffic.uptimeSeconds + 1,
          },
        });
        if (Math.random() > 0.72) {
          get().addLog(liveTickLog(current, s.dpiConfig));
        }
      },
    }),
    {
      name: "aether-vpn-v1",
      skipHydration: true,
      partialize: (s) => ({
        soulColor: s.soulColor,
        currentServerId: s.currentServerId,
        tunConfig: s.tunConfig,
        dpiConfig: s.dpiConfig,
        core: s.core,
        routingRules: s.routingRules,
        servers: s.servers.map(({ lastScanStatus: _ls, ...rest }) => rest),
        lastGoodGateway: s.lastGoodGateway,
        soundEnabled: s.soundEnabled,
        showTray: s.showTray,
      }),
    },
  ),
);

export function currentServerOf(s: Pick<VpnStore, "servers" | "currentServerId">): ServerNode {
  return s.servers.find((n) => n.id === s.currentServerId) ?? s.servers[0];
}
