import type {
  CoreConfig,
  DialogueLine,
  DpiEvasionConfig,
  LogEntry,
  RoutingRule,
  ServerNode,
  TrafficStats,
  TunConfig,
} from "./types";

export const CORE_VERSION = "1.8.0";
export const CORE_TARGET = "x86_64-pc-windows-msvc";
export const CORE_BINARY = "aether.exe";

export const DEFAULT_SERVERS: ServerNode[] = [
  {
    id: "castle-town",
    name: "Castle Town Fountain",
    darkWorldZone: "Castle Town",
    country: "United States",
    city: "San Francisco",
    iso: "US",
    ping: 28,
    protocol: "masque",
    serverAddress: "162.159.192.1",
    port: 443,
    load: 22,
    isFavorite: true,
    features: ["MASQUE HTTP/3", "Zero-RTT", "Anycast"],
    exitIp: "104.28.12.41",
  },
  {
    id: "cyber-city",
    name: "Cyber City Core",
    darkWorldZone: "Cyber City",
    country: "Japan",
    city: "Tokyo",
    iso: "JP",
    ping: 34,
    protocol: "gool",
    serverAddress: "162.159.193.1",
    port: 2408,
    load: 41,
    isFavorite: true,
    features: ["Nested WG", "BBRv3", "Anti-DPI"],
    exitIp: "104.28.198.12",
  },
  {
    id: "spamton-alley",
    name: "Spamton NEO Evasion Node",
    darkWorldZone: "Trash Zone",
    country: "Germany",
    city: "Frankfurt",
    iso: "DE",
    ping: 52,
    protocol: "masque",
    serverAddress: "188.114.96.1",
    port: 443,
    load: 18,
    isFavorite: false,
    features: ["MASQUE H2", "TLS Fragment", "TCP fallback"],
    exitIp: "188.114.97.88",
  },
  {
    id: "card-castle",
    name: "Card Kingdom Relay",
    darkWorldZone: "Card Kingdom",
    country: "United Kingdom",
    city: "London",
    iso: "GB",
    ping: 61,
    protocol: "wg",
    serverAddress: "162.159.195.1",
    port: 2408,
    load: 33,
    isFavorite: false,
    features: ["WireGuard", "UDP 2408", "Kernel TUN"],
    exitIp: "162.159.36.88",
  },
  {
    id: "cyber-field",
    name: "Cyber Field Beats",
    darkWorldZone: "Cyber Field",
    country: "Singapore",
    city: "Singapore",
    iso: "SG",
    ping: 44,
    protocol: "masque",
    serverAddress: "162.159.197.1",
    port: 8443,
    load: 48,
    isFavorite: false,
    features: ["MASQUE HTTP/3", "IPv6 ready", "GSO"],
    exitIp: "162.159.46.21",
  },
  {
    id: "dark-fountain",
    name: "Pure Fountain Anchor",
    darkWorldZone: "Dark Fountain",
    country: "South Korea",
    city: "Seoul",
    iso: "KR",
    ping: 39,
    protocol: "wg",
    serverAddress: "162.159.36.1",
    port: 500,
    load: 27,
    isFavorite: true,
    features: ["WireGuard", "IKE port", "Low jitter"],
    exitIp: "162.159.46.77",
  },
  {
    id: "tv-world",
    name: "TV World Broadcast",
    darkWorldZone: "TV World",
    country: "Netherlands",
    city: "Amsterdam",
    iso: "NL",
    ping: 48,
    protocol: "masque",
    serverAddress: "188.114.97.1",
    port: 443,
    load: 31,
    isFavorite: false,
    features: ["MASQUE HTTP/3", "Anycast EU", "Zero-RTT"],
    exitIp: "188.114.98.14",
  },
  {
    id: "hometown",
    name: "Hometown Lightners Gate",
    darkWorldZone: "Hometown",
    country: "Canada",
    city: "Toronto",
    iso: "CA",
    ping: 36,
    protocol: "gool",
    serverAddress: "162.159.46.1",
    port: 1701,
    load: 19,
    isFavorite: false,
    features: ["Nested WG", "L2TP port", "Stealth"],
    exitIp: "104.16.44.19",
  },
];

export const DEFAULT_TUN_CONFIG: TunConfig = {
  enabled: true,
  driver: "wintun",
  adapterName: "Aether-TUN0",
  virtualIp: "10.66.77.2/24",
  gateway: "10.66.77.1",
  mtu: 1420,
  dnsServers: ["1.1.1.1", "1.0.0.1", "9.9.9.9"],
  strictRouting: true,
  ipv6Routing: false,
  fakeDns: true,
  bypassLan: true,
  killSwitch: true,
  splitTunneling: {
    enabled: false,
    mode: "exclude",
    apps: [
      { name: "Steam.exe", path: "C:\\Program Files (x86)\\Steam\\steam.exe", enabled: true },
      { name: "Discord.exe", path: "C:\\Users\\User\\AppData\\Local\\Discord\\app.exe", enabled: false },
      { name: "Spotify.exe", path: "C:\\Users\\User\\AppData\\Roaming\\Spotify\\spotify.exe", enabled: false },
    ],
  },
};

export const DEFAULT_DPI_CONFIG: DpiEvasionConfig = {
  tlsFragmentation: true,
  fragMin: 8,
  fragMax: 24,
  fragDelayMin: 5,
  fragDelayMax: 15,
  masqueHttp: "h3",
  congestionControl: "BBRv3",
  obfuscationSeed: "DELTARUNE_DETERMINATION_AETHER_V180",
  noisePadding: true,
  zeroRtt: true,
  alpnSpoofing: "h3",
  udpGso: true,
  dataPlaneCheck: true,
};

export const DEFAULT_CORE: CoreConfig = {
  protocol: "masque",
  scanMode: "balanced",
  ipVersion: "v4",
  noize: "firewall",
  socksBind: "127.0.0.1:1819",
  quickReconnect: true,
  peerOverride: "",
};

export const DEFAULT_ROUTING_RULES: RoutingRule[] = [
  {
    id: "1",
    name: "Bypass LAN",
    type: "ip-cidr",
    value: "192.168.0.0/16, 10.0.0.0/8, 127.0.0.1/32",
    action: "direct",
    enabled: true,
  },
  {
    id: "2",
    name: "Protected domains",
    type: "domain-suffix",
    value: "google.com, youtube.com, github.com, x.com, telegram.org",
    action: "proxy",
    enabled: true,
  },
  {
    id: "3",
    name: "Telemetry block",
    type: "domain-suffix",
    value: "telemetry.microsoft.com, adservice.google.com, doubleclick.net",
    action: "block",
    enabled: true,
  },
  {
    id: "4",
    name: "Game CDNs (direct)",
    type: "domain-suffix",
    value: "steamcontent.com, steampowered.com, epicgames.com",
    action: "direct",
    enabled: false,
  },
  {
    id: "5",
    name: "Dark Fountain overrides",
    type: "domain",
    value: "deltarune.com, fangamer.com",
    action: "proxy",
    enabled: true,
  },
];

export const DIALOGUE: DialogueLine[] = [
  {
    speaker: "Ralsei",
    quote:
      "Kris, the tunnel is a MASQUE path that looks like ordinary HTTPS. Gateways are only trusted after real data flows — not just a handshake.",
    colorVar: "var(--color-soul-green)",
  },
  {
    speaker: "Susie",
    quote:
      "If DPI tries to fingerprint the start of the session, we throw junk packets first. Firewall profile. Then GFW if they still want a fight.",
    colorVar: "var(--color-magenta)",
  },
  {
    speaker: "Spamton NEO",
    quote:
      "NOW'S YOUR CHANCE TO BE A [[BIG SHOT]]!! SOCKS5 ON [[127.0.0.1:1819]] WITH [Zero-RTT] AND [TLS FRAGMENT]!!",
    colorVar: "var(--color-soul-yellow)",
  },
  {
    speaker: "Queen",
    quote:
      "LMAO UDP throttling is so yesterday. Switch MASQUE to h2 over TCP and fragment the ClientHello. Potassium speed optional.",
    colorVar: "var(--color-cyan)",
  },
  {
    speaker: "Kris (SOUL)",
    quote:
      "Your SOUL shines with DETERMINATION. Scan, validate, open the proxy. The Dark Fountain only accepts a gateway that actually passes traffic.",
    colorVar: "var(--color-soul-red)",
  },
];

export const INITIAL_LOGS: LogEntry[] = [
  {
    id: "boot-1",
    timestamp: "00:00:00.000",
    level: "CORE",
    tag: "AETHER_CORE",
    message: `Aether v${CORE_VERSION} engine ready. Target ${CORE_TARGET}. Binary ${CORE_BINARY}.`,
  },
  {
    id: "boot-2",
    timestamp: "00:00:00.040",
    level: "TUN",
    tag: "WINTUN",
    message: "Wintun Layer-3 adapter profile loaded (v0.14.1). Virtual IP 10.66.77.2/24 MTU 1420.",
  },
  {
    id: "boot-3",
    timestamp: "00:00:00.080",
    level: "DPI",
    tag: "NOIZE",
    message: "Obfuscation profiles ready: MASQUE [firewall|gfw|off] · WG/gool [balanced|aggressive|light|off].",
  },
  {
    id: "boot-4",
    timestamp: "00:00:00.120",
    level: "INFO",
    tag: "SOCKS5",
    message: "Local proxy will bind 127.0.0.1:1819 after data-plane validation.",
  },
  {
    id: "boot-5",
    timestamp: "00:00:00.160",
    level: "SOUL",
    tag: "DARK_WORLD",
    message: "Fountain resonance calibrated. Press FIGHT or the SOUL to engage Aether core.",
  },
];

export const IDLE_TRAFFIC: TrafficStats = {
  downloadSpeed: 0,
  uploadSpeed: 0,
  totalDownloaded: 0,
  totalUploaded: 0,
  ping: 28,
  jitter: 0,
  packetLoss: 0,
  tensionPoints: 0,
  healthPoints: 100,
  uptimeSeconds: 0,
};

export const SCAN_MODE_META: Record<
  CoreConfig["scanMode"],
  { label: string; detail: string }
> = {
  turbo: { label: "Turbo", detail: "First handshake that answers. Fastest connect." },
  balanced: { label: "Balanced", detail: "Default. Best ping among verified peers." },
  thorough: { label: "Thorough", detail: "Deep scan. Slow, lowest RTT wins." },
  stealth: { label: "Stealth", detail: "Patient probes. Less network noise." },
  ironclad: { label: "Ironclad", detail: "Full tunnel + real HTTP before trust." },
};

export const PROTOCOL_META: Record<
  CoreConfig["protocol"],
  { label: string; detail: string }
> = {
  masque: { label: "MASQUE", detail: "HTTP/3 or HTTP/2. Looks like ordinary web traffic." },
  wg: { label: "WireGuard", detail: "Lean UDP tunnel. Fastest when the path is clean." },
  gool: { label: "Nested WG", detail: "WireGuard inside WireGuard. Two encryption layers." },
};
