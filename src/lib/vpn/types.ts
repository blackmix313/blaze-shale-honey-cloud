export type AetherProtocol = "masque" | "wg" | "gool";
export type MasqueHttp = "h3" | "h2";
export type ScanMode = "turbo" | "balanced" | "thorough" | "stealth" | "ironclad";
export type IpVersion = "v4" | "v6" | "dual";
export type MasqueNoize = "firewall" | "gfw" | "off";
export type WgNoize = "balanced" | "aggressive" | "light" | "off";
export type SoulColor = "RED" | "CYAN" | "YELLOW" | "GREEN";

export type ConnectionState =
  | "DISCONNECTED"
  | "DISCOVERING"
  | "NOIZE"
  | "FRAGMENTING_TLS"
  | "HANDSHAKING"
  | "DATA_PLANE"
  | "ALLOCATING_TUN"
  | "CONNECTED"
  | "RECONNECTING"
  | "ERROR";

export type ActiveTab =
  | "DASHBOARD"
  | "TUN_SETTINGS"
  | "DPI_SETTINGS"
  | "SERVERS"
  | "ROUTING"
  | "LOGS"
  | "QUICK_SETUP";

export interface TunConfig {
  enabled: boolean;
  driver: "wintun" | "wireguard-nt" | "tap-windows6";
  adapterName: string;
  virtualIp: string;
  gateway: string;
  mtu: number;
  dnsServers: string[];
  strictRouting: boolean;
  ipv6Routing: boolean;
  fakeDns: boolean;
  bypassLan: boolean;
  killSwitch: boolean;
  splitTunneling: {
    enabled: boolean;
    mode: "exclude" | "include";
    apps: { name: string; path: string; enabled: boolean }[];
  };
}

export interface DpiEvasionConfig {
  tlsFragmentation: boolean;
  fragMin: number;
  fragMax: number;
  fragDelayMin: number;
  fragDelayMax: number;
  masqueHttp: MasqueHttp;
  congestionControl: "BBR" | "CUBIC" | "BBRv3";
  obfuscationSeed: string;
  noisePadding: boolean;
  zeroRtt: boolean;
  alpnSpoofing: "h3" | "h2" | "http/1.1" | "randomized";
  udpGso: boolean;
  dataPlaneCheck: boolean;
}

export interface ServerNode {
  id: string;
  name: string;
  darkWorldZone: string;
  country: string;
  city: string;
  iso: string;
  ping: number;
  protocol: AetherProtocol;
  serverAddress: string;
  port: number;
  load: number;
  isFavorite?: boolean;
  features: string[];
  exitIp: string;
  lastScanStatus?: "idle" | "probing" | "ok" | "fail";
}

export interface TrafficStats {
  downloadSpeed: number;
  uploadSpeed: number;
  totalDownloaded: number;
  totalUploaded: number;
  ping: number;
  jitter: number;
  packetLoss: number;
  tensionPoints: number;
  healthPoints: number;
  uptimeSeconds: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "DPI" | "TUN" | "WARN" | "ERROR" | "SOUL" | "SCAN" | "CORE";
  tag: string;
  message: string;
}

export interface RoutingRule {
  id: string;
  name: string;
  type: "domain" | "domain-suffix" | "ip-cidr" | "geoip" | "process";
  value: string;
  action: "proxy" | "direct" | "block";
  enabled: boolean;
}

export interface CoreConfig {
  protocol: AetherProtocol;
  scanMode: ScanMode;
  ipVersion: IpVersion;
  noize: string;
  socksBind: string;
  quickReconnect: boolean;
  peerOverride: string;
}

export interface DialogueLine {
  speaker: string;
  quote: string;
  colorVar: string;
}
