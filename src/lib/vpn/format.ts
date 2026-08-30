import type { ConnectionState, SoulColor } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`;
}

export function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec <= 0) return "0.00 KB/s";
  const mbps = bytesPerSec / (1024 * 1024);
  if (mbps >= 1) return `${mbps.toFixed(2)} MB/s`;
  return `${(bytesPerSec / 1024).toFixed(1)} KB/s`;
}

export function formatUptime(sec: number): string {
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [hrs, mins, s].map((n) => n.toString().padStart(2, "0")).join(":");
}

export function soulHex(color: SoulColor): string {
  switch (color) {
    case "RED":
      return "#ff2a2a";
    case "CYAN":
      return "#00e5ff";
    case "YELLOW":
      return "#ffe600";
    case "GREEN":
      return "#00ff66";
  }
}

export function soulTitle(color: SoulColor): { title: string; sub: string } {
  switch (color) {
    case "RED":
      return { title: "DETERMINATION", sub: "Kris SOUL · Standard MASQUE" };
    case "CYAN":
      return { title: "PATIENCE", sub: "Low-jitter WireGuard stream" };
    case "YELLOW":
      return { title: "JUSTICE", sub: "Aggressive anti-DPI split" };
    case "GREEN":
      return { title: "KINDNESS", sub: "Zero-leak kill switch" };
  }
}

export function stateLabel(state: ConnectionState): string {
  switch (state) {
    case "DISCONNECTED":
      return "STANDBY";
    case "DISCOVERING":
      return "SCANNING";
    case "NOIZE":
      return "NOIZE";
    case "FRAGMENTING_TLS":
      return "TLS FRAG";
    case "HANDSHAKING":
      return "HANDSHAKE";
    case "DATA_PLANE":
      return "PROBE";
    case "ALLOCATING_TUN":
      return "TUN UP";
    case "CONNECTED":
      return "PROTECTED";
    case "RECONNECTING":
      return "RECONNECT";
    case "ERROR":
      return "ERROR";
  }
}

export function nowStamp(): string {
  const now = new Date();
  const t = now.toTimeString().split(" ")[0];
  return `${t}.${now.getMilliseconds().toString().padStart(3, "0")}`;
}

export function protocolLabel(protocol: string): string {
  switch (protocol) {
    case "masque":
      return "MASQUE";
    case "wg":
      return "WIREGUARD";
    case "gool":
      return "NESTED WG";
    default:
      return protocol.toUpperCase();
  }
}
