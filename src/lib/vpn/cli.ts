import type { CoreConfig, DpiEvasionConfig, ServerNode, TunConfig } from "./types";
import { CORE_BINARY } from "./defaults";

export function noizeForProtocol(protocol: CoreConfig["protocol"], noize: string): string {
  if (protocol === "masque") {
    if (noize === "firewall" || noize === "gfw" || noize === "off") return noize;
    return "firewall";
  }
  if (noize === "balanced" || noize === "aggressive" || noize === "light" || noize === "off") {
    return noize;
  }
  return "balanced";
}

export function buildAetherArgs(
  core: CoreConfig,
  dpi: DpiEvasionConfig,
  server: ServerNode,
): string[] {
  const args: string[] = ["--bind", core.socksBind];

  if (core.ipVersion === "v4") args.push("-4");
  else if (core.ipVersion === "v6") args.push("-6");
  else args.push("--dual");

  if (core.protocol === "masque") {
    args.push("--masque");
    if (dpi.masqueHttp === "h2") {
      args.push("--h2");
      if (dpi.tlsFragmentation) {
        args.push("--fragment");
        args.push("--fragment-size", `${dpi.fragMin}-${dpi.fragMax}`);
        args.push("--fragment-delay", `${dpi.fragDelayMin}-${dpi.fragDelayMax}`);
      }
    }
  } else if (core.protocol === "wg") {
    args.push("--wg");
  } else {
    args.push("--gool");
  }

  args.push("--scan", core.scanMode);
  args.push("--noize", noizeForProtocol(core.protocol, core.noize));

  if (core.quickReconnect) args.push("--quick-reconnect");
  else args.push("--no-quick-reconnect");

  if (!dpi.dataPlaneCheck) args.push("--no-data-check");

  const peer = core.peerOverride.trim() || `${server.serverAddress}:${server.port}`;
  if (core.peerOverride.trim()) args.push("--peer", peer);

  return args;
}

export function buildAetherCommand(
  core: CoreConfig,
  dpi: DpiEvasionConfig,
  server: ServerNode,
): string {
  return [CORE_BINARY, ...buildAetherArgs(core, dpi, server)].join(" ");
}

export function buildRunBat(
  core: CoreConfig,
  dpi: DpiEvasionConfig,
  server: ServerNode,
  tun: TunConfig,
): string {
  const cmd = buildAetherCommand(core, dpi, server);
  return `@echo off
setlocal
cd /d "%~dp0"

title Aether v1.8.0 — ${server.name}
color 0B
cls
echo =============================================================
echo  Aether core ${CORE_BINARY}
echo  Gateway : ${server.name} (${server.serverAddress}:${server.port})
echo  Protocol: ${core.protocol}   Scan: ${core.scanMode}   Noize: ${core.noize}
echo  SOCKS5  : ${core.socksBind}
echo  TUN     : ${tun.enabled ? tun.adapterName + " " + tun.virtualIp : "off (proxy only)"}
echo =============================================================
echo.
echo Point apps at socks5h://${core.socksBind}
echo Press Ctrl+C to stop.
echo.

${cmd}

echo.
echo Aether exited (exit code %errorlevel%).
pause
`;
}

export function buildEnvFile(core: CoreConfig, dpi: DpiEvasionConfig): string {
  const noize = noizeForProtocol(core.protocol, core.noize);
  const lines = [
    `AETHER_PROTOCOL=${core.protocol}`,
    `AETHER_SOCKS=${core.socksBind}`,
    `AETHER_NOIZE=${noize}`,
    `AETHER_SCAN=${core.scanMode}`,
    `AETHER_IP=${core.ipVersion === "dual" ? "both" : core.ipVersion === "v6" ? "6" : "4"}`,
    `AETHER_QUICK_RECONNECT=${core.quickReconnect ? "1" : "0"}`,
  ];
  if (core.protocol === "masque") {
    if (dpi.masqueHttp === "h2") lines.push("AETHER_MASQUE_HTTP2=1");
    if (dpi.tlsFragmentation && dpi.masqueHttp === "h2") {
      lines.push("AETHER_MASQUE_H2_FRAGMENT=1");
      lines.push(`AETHER_MASQUE_H2_FRAGMENT_SIZE=${dpi.fragMin}-${dpi.fragMax}`);
      lines.push(`AETHER_MASQUE_H2_FRAGMENT_DELAY=${dpi.fragDelayMin}-${dpi.fragDelayMax}`);
    }
    if (!dpi.dataPlaneCheck) lines.push("AETHER_MASQUE_NO_DATA_CHECK=1");
  }
  return lines.join("\n") + "\n";
}
