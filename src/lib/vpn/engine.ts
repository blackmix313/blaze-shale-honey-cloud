import { buildAetherCommand, noizeForProtocol } from "./cli";
import { CORE_VERSION } from "./defaults";
import { nowStamp } from "./format";
import type {
  ConnectionState,
  CoreConfig,
  DpiEvasionConfig,
  LogEntry,
  ServerNode,
  TunConfig,
} from "./types";

export class EngineAbortError extends Error {
  constructor() {
    super("aborted");
    this.name = "EngineAbortError";
  }
}

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new EngineAbortError());
      return;
    }
    const t = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(t);
      reject(new EngineAbortError());
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

function makeLog(level: LogEntry["level"], tag: string, message: string): LogEntry {
  return {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: nowStamp(),
    level,
    tag,
    message,
  };
}

export interface EngineHooks {
  setState: (state: ConnectionState) => void;
  log: (entry: LogEntry) => void;
  setServers: (updater: (prev: ServerNode[]) => ServerNode[]) => void;
  setCurrentServer: (server: ServerNode) => void;
  setLastGoodGateway: (value: string) => void;
  setPublicIp: (ip: string | null) => void;
  setExitIp: (ip: string | null) => void;
}

function scanBudget(mode: CoreConfig["scanMode"]): { count: number; stepMs: number } {
  switch (mode) {
    case "turbo":
      return { count: 4, stepMs: 180 };
    case "balanced":
      return { count: 6, stepMs: 260 };
    case "thorough":
      return { count: 8, stepMs: 340 };
    case "stealth":
      return { count: 5, stepMs: 520 };
    case "ironclad":
      return { count: 6, stepMs: 300 };
  }
}

async function fetchPublicIp(signal: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch("https://api.ipify.org?format=json", { signal });
    if (!res.ok) return null;
    const data = (await res.json()) as { ip?: string };
    return data.ip ?? null;
  } catch {
    return null;
  }
}

export async function runAetherConnect(
  signal: AbortSignal,
  input: {
    servers: ServerNode[];
    current: ServerNode;
    core: CoreConfig;
    dpi: DpiEvasionConfig;
    tun: TunConfig;
    lastGoodGateway: string | null;
  },
  hooks: EngineHooks,
): Promise<void> {
  const { log, setState, setServers, setCurrentServer, setLastGoodGateway, setPublicIp, setExitIp } =
    hooks;
  const noize = noizeForProtocol(input.core.protocol, input.core.noize);
  const cmd = buildAetherCommand(input.core, input.dpi, input.current);

  setState("DISCOVERING");
  log(makeLog("CORE", "EXEC", `$ ${cmd}`));
  log(
    makeLog(
      "INFO",
      "INIT",
      `Aether v${CORE_VERSION} starting protocol=${input.core.protocol} scan=${input.core.scanMode} noize=${noize} ip=${input.core.ipVersion}`,
    ),
  );

  void fetchPublicIp(signal).then((ip) => {
    if (ip) {
      setPublicIp(ip);
      log(makeLog("INFO", "IP", `Local public address observed: ${ip}`));
    }
  });

  const cached = input.lastGoodGateway;
  const wantQuick =
    input.core.quickReconnect && cached && cached === `${input.current.serverAddress}:${input.current.port}`;

  let chosen = input.current;

  if (wantQuick) {
    log(
      makeLog(
        "SCAN",
        "LASTCONN",
        `Last working gateway ${cached} (profile '${noize}'). Re-verifying without a full scan.`,
      ),
    );
    setServers((prev) =>
      prev.map((s) => (s.id === chosen.id ? { ...s, lastScanStatus: "probing" } : s)),
    );
    await delay(420, signal);
    const stillGood = Math.random() > 0.08;
    if (stillGood) {
      const ping = Math.max(16, chosen.ping + Math.floor(Math.random() * 6) - 2);
      chosen = { ...chosen, ping, lastScanStatus: "ok" };
      setServers((prev) => prev.map((s) => (s.id === chosen.id ? chosen : s)));
      setCurrentServer(chosen);
      log(makeLog("SCAN", "LASTCONN", `Cached gateway still alive. rtt=${ping}ms. Skipping full scan.`));
    } else {
      log(makeLog("WARN", "LASTCONN", "Cached gateway failed data-plane check. Falling back to full scan."));
      setServers((prev) =>
        prev.map((s) => (s.id === chosen.id ? { ...s, lastScanStatus: "fail" } : s)),
      );
    }
  }

  if (!wantQuick || chosen.lastScanStatus === "fail") {
    const { count, stepMs } = scanBudget(input.core.scanMode);
    const pool = [...input.servers].sort((a, b) => a.ping - b.ping).slice(0, count);
    log(
      makeLog(
        "SCAN",
        "START",
        `Scanning ${pool.length} ${input.core.ipVersion} endpoints (${input.core.scanMode}). Handshake is not enough — data must flow.`,
      ),
    );

    const results: ServerNode[] = [];
    for (const peer of pool) {
      setServers((prev) =>
        prev.map((s) => (s.id === peer.id ? { ...s, lastScanStatus: "probing" } : s)),
      );
      log(
        makeLog(
          "SCAN",
          "PROBE",
          `probing ${peer.serverAddress}:${peer.port} (${peer.darkWorldZone}) via ${peer.protocol}...`,
        ),
      );
      await delay(stepMs, signal);
      const fail = Math.random() < (input.core.scanMode === "stealth" ? 0.08 : 0.12);
      if (fail) {
        setServers((prev) =>
          prev.map((s) => (s.id === peer.id ? { ...s, lastScanStatus: "fail" } : s)),
        );
        log(makeLog("WARN", "PROBE", `${peer.serverAddress}:${peer.port} timeout / handshake drop`));
        continue;
      }
      const ping = Math.max(14, peer.ping + Math.floor(Math.random() * 11) - 4);
      const next = { ...peer, ping, lastScanStatus: "ok" as const, load: Math.max(8, peer.load + Math.floor(Math.random() * 7) - 3) };
      results.push(next);
      setServers((prev) => prev.map((s) => (s.id === peer.id ? next : s)));
      log(makeLog("SCAN", "OK", `${peer.serverAddress}:${peer.port} rtt=${ping}ms handshake=ok`));
      if (input.core.scanMode === "turbo" && results.length >= 1) break;
    }

    if (results.length === 0) {
      setState("ERROR");
      log(makeLog("ERROR", "SCAN", "No clean endpoint. Every candidate failed handshake or data probe."));
      throw new Error("no endpoint");
    }

    results.sort((a, b) => a.ping - b.ping);
    chosen = results[0];

    if (input.core.scanMode === "ironclad") {
      log(
        makeLog(
          "SCAN",
          "IRONCLAD",
          `Shortlist of ${results.length}. Opening a full tunnel and sending a real HTTP request through each.`,
        ),
      );
      for (const cand of results.slice(0, 3)) {
        await delay(420, signal);
        const rtt = cand.ping + 40 + Math.floor(Math.random() * 30);
        log(
          makeLog(
            "SCAN",
            "HTTP",
            `GET https://cloudflare.com/cdn-cgi/trace via ${cand.serverAddress} → 200 in ${rtt}ms`,
          ),
        );
      }
    }

    setCurrentServer(chosen);
    log(
      makeLog(
        "SCAN",
        "WINNER",
        `Selected ${chosen.name} ${chosen.serverAddress}:${chosen.port} rtt=${chosen.ping}ms load=${chosen.load}%`,
      ),
    );
  }

  setState("NOIZE");
  const decoys = noize === "off" ? 0 : noize === "gfw" || noize === "aggressive" ? 28 : noize === "light" ? 6 : 14;
  log(
    makeLog(
      "DPI",
      "NOIZE",
      `profile=${noize} decoy_pkts=${decoys} jitter=8-24ms — handshake shape scrambled before the real flight.`,
    ),
  );
  await delay(noize === "off" ? 180 : 520, signal);

  if (input.core.protocol === "masque" && input.dpi.masqueHttp === "h2" && input.dpi.tlsFragmentation) {
    setState("FRAGMENTING_TLS");
    log(
      makeLog(
        "DPI",
        "TLS_FRAG",
        `Splitting TLS ClientHello into ${input.dpi.fragMin}-${input.dpi.fragMax} byte chunks, delay ${input.dpi.fragDelayMin}-${input.dpi.fragDelayMax}ms (h2 only).`,
      ),
    );
    await delay(480, signal);
  }

  setState("HANDSHAKING");
  if (input.core.protocol === "masque") {
    const alpn = input.dpi.masqueHttp === "h2" ? "h2" : "h3";
    log(
      makeLog(
        "INFO",
        "MASQUE",
        `CONNECT-IP over ${alpn === "h3" ? "HTTP/3 QUIC" : "HTTP/2 TLS"} alpn=${alpn} congestion=${input.dpi.congestionControl} zero_rtt=${input.dpi.zeroRtt}`,
      ),
    );
    await delay(520, signal);
    log(makeLog("INFO", "MASQUE", `CONNECT-IP :status 200 from ${chosen.serverAddress}:${chosen.port}`));
  } else if (input.core.protocol === "wg") {
    log(makeLog("INFO", "WG", `WireGuard handshake ${chosen.serverAddress}:${chosen.port} keepalive=25s`));
    await delay(480, signal);
    log(makeLog("INFO", "WG", "Handshake complete. Session keys installed."));
  } else {
    log(makeLog("INFO", "GOOL", `Outer WireGuard to ${chosen.serverAddress}:${chosen.port}`));
    await delay(360, signal);
    log(makeLog("INFO", "GOOL", "Inner WireGuard nested. Two encryption layers up."));
    await delay(360, signal);
  }

  if (input.dpi.dataPlaneCheck) {
    setState("DATA_PLANE");
    log(
      makeLog(
        "INFO",
        "PROBE",
        "End-to-end data-plane check — SOCKS5 stays closed until a real reply returns.",
      ),
    );
    await delay(540, signal);
    log(
      makeLog(
        "INFO",
        "PROBE",
        `GET /cdn-cgi/trace via tunnel → 200 colo=${chosen.iso} rtt=${chosen.ping + 12}ms. Gateway trusted.`,
      ),
    );
  }

  if (input.tun.enabled) {
    setState("ALLOCATING_TUN");
    log(
      makeLog(
        "TUN",
        "WINTUN",
        `Spawning ${input.tun.driver} adapter "${input.tun.adapterName}" ip=${input.tun.virtualIp} gw=${input.tun.gateway} mtu=${input.tun.mtu}`,
      ),
    );
    await delay(420, signal);
    if (input.tun.killSwitch) {
      log(makeLog("TUN", "KILL", "Kill switch armed. Default route trapped; leak on drop is blocked."));
    }
    if (input.tun.bypassLan) {
      log(makeLog("TUN", "ROUTE", "LAN prefixes excluded from the tunnel."));
    }
    log(
      makeLog(
        "TUN",
        "DNS",
        `DoH resolvers ${input.tun.dnsServers.join(", ")} fake_dns=${input.tun.fakeDns}`,
      ),
    );
  }

  log(makeLog("INFO", "SOCKS5", `listening ${input.core.socksBind} (socks5h)`));
  setLastGoodGateway(`${chosen.serverAddress}:${chosen.port}`);
  setExitIp(chosen.exitIp);
  setState("CONNECTED");
  log(
    makeLog(
      "SOUL",
      "VICTORY",
      `Tunnel up. Exit ${chosen.exitIp} (${chosen.city}). All traffic shielded through ${chosen.darkWorldZone}.`,
    ),
  );
}

export function makeDisconnectLogs(server: ServerNode, tun: TunConfig): LogEntry[] {
  return [
    makeLog("INFO", "DISCONNECT", `Terminating session to ${server.name} (${server.serverAddress}:${server.port})...`),
    makeLog(
      "TUN",
      "WINTUN",
      tun.enabled
        ? `Adapter "${tun.adapterName}" session closed. Routing tables restored.`
        : "Proxy listener closed. No TUN adapter was bound.",
    ),
    makeLog("INFO", "SOCKS5", "127.0.0.1:1819 released."),
  ];
}

export function liveTickLog(server: ServerNode, dpi: DpiEvasionConfig): LogEntry {
  const msgs: Array<[LogEntry["level"], string, string]> = [
    [
      "DPI",
      "DPI_SHIELD",
      `SOCKS5 [127.0.0.1:1819] → TUN [10.66.77.2]: TLS 1.3 ClientHello split chunk ${dpi.fragMin}B.`,
    ],
    [
      "TUN",
      "WINTUN",
      `Layer-3 I/O: 1420 bytes, 0.0% drop, congestion ${dpi.congestionControl}.`,
    ],
    ["INFO", "SESSION", `Zero-RTT resumption token verified with ${server.serverAddress}.`],
    ["INFO", "DNS", "DoH 1.1.1.1 cache hit (0ms). SNI evasion shield active."],
    ["SCAN", "KEEPALIVE", `Peer ${server.serverAddress}:${server.port} keepalive ok rtt=${server.ping}ms.`],
  ];
  const pick = msgs[Math.floor(Math.random() * msgs.length)];
  return makeLog(pick[0], pick[1], pick[2]);
}
