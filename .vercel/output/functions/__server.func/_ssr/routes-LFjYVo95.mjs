import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Earth, C as Minus, D as Layers, E as Lock, F as Check, I as ArrowUp, L as ArrowDown, M as Cpu, N as Copy, O as Laptop, P as ChevronRight, S as Pause, T as Maximize2, _ as RefreshCw, b as Plus, c as Swords, d as Sparkles, f as Shuffle, g as Route, h as ShieldAlert, i as Volume2, j as Download, k as Globe, l as Star, m as ShieldCheck, n as X, o as Trash2, p as Shield, r as VolumeX, s as Terminal, t as Zap, u as Square, v as Radio, w as MessageCircle, x as Play, y as Power } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-LFjYVo95.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var audioCtx = null;
var soundEnabled = true;
function setSoundEnabled(enabled) {
	soundEnabled = enabled;
}
function getAudioContext() {
	if (!soundEnabled) return null;
	if (typeof window === "undefined") return null;
	if (!audioCtx) {
		const Ctor = window.AudioContext || window.webkitAudioContext;
		if (Ctor) audioCtx = new Ctor();
	}
	if (audioCtx && audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
	return audioCtx;
}
function beep(type, startHz, endHz, duration, gainValue) {
	const ctx = getAudioContext();
	if (!ctx) return;
	try {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(startHz, ctx.currentTime);
		osc.frequency.exponentialRampToValueAtTime(Math.max(1, endHz), ctx.currentTime + duration);
		gain.gain.setValueAtTime(gainValue, ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + duration);
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + duration);
	} catch {}
}
var playSound = {
	cursor() {
		beep("square", 440, 880, .06, .05);
	},
	select() {
		const ctx = getAudioContext();
		if (!ctx) return;
		try {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "triangle";
			osc.frequency.setValueAtTime(523.25, ctx.currentTime);
			osc.frequency.setValueAtTime(783.99, ctx.currentTime + .04);
			gain.gain.setValueAtTime(.1, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + .16);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + .16);
		} catch {}
	},
	cancel() {
		beep("sawtooth", 320, 120, .09, .07);
	},
	connected() {
		const ctx = getAudioContext();
		if (!ctx) return;
		try {
			[
				523.25,
				659.25,
				783.99,
				1046.5
			].forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * .08);
				gain.gain.setValueAtTime(0, ctx.currentTime + idx * .08);
				gain.gain.linearRampToValueAtTime(.12, ctx.currentTime + idx * .08 + .02);
				gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + idx * .08 + .5);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(ctx.currentTime + idx * .08);
				osc.stop(ctx.currentTime + idx * .08 + .5);
			});
		} catch {}
	},
	tunEngage() {
		beep("triangle", 220, 880, .25, .09);
	},
	heartbeat() {
		beep("sine", 90, 40, .14, .1);
	},
	dpiFragment() {
		const ctx = getAudioContext();
		if (!ctx) return;
		try {
			for (let i = 0; i < 3; i++) {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "square";
				osc.frequency.setValueAtTime(600 + i * 200, ctx.currentTime + i * .03);
				gain.gain.setValueAtTime(.035, ctx.currentTime + i * .03);
				gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + i * .03 + .03);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(ctx.currentTime + i * .03);
				osc.stop(ctx.currentTime + i * .03 + .03);
			}
		} catch {}
	}
};
var CORE_VERSION = "1.8.0";
var CORE_TARGET = "x86_64-pc-windows-msvc";
var CORE_BINARY = "aether.exe";
var DEFAULT_SERVERS = [
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
		features: [
			"MASQUE HTTP/3",
			"Zero-RTT",
			"Anycast"
		],
		exitIp: "104.28.12.41"
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
		features: [
			"Nested WG",
			"BBRv3",
			"Anti-DPI"
		],
		exitIp: "104.28.198.12"
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
		features: [
			"MASQUE H2",
			"TLS Fragment",
			"TCP fallback"
		],
		exitIp: "188.114.97.88"
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
		features: [
			"WireGuard",
			"UDP 2408",
			"Kernel TUN"
		],
		exitIp: "162.159.36.88"
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
		features: [
			"MASQUE HTTP/3",
			"IPv6 ready",
			"GSO"
		],
		exitIp: "162.159.46.21"
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
		features: [
			"WireGuard",
			"IKE port",
			"Low jitter"
		],
		exitIp: "162.159.46.77"
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
		features: [
			"MASQUE HTTP/3",
			"Anycast EU",
			"Zero-RTT"
		],
		exitIp: "188.114.98.14"
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
		features: [
			"Nested WG",
			"L2TP port",
			"Stealth"
		],
		exitIp: "104.16.44.19"
	}
];
var DEFAULT_TUN_CONFIG = {
	enabled: true,
	driver: "wintun",
	adapterName: "Aether-TUN0",
	virtualIp: "10.66.77.2/24",
	gateway: "10.66.77.1",
	mtu: 1420,
	dnsServers: [
		"1.1.1.1",
		"1.0.0.1",
		"9.9.9.9"
	],
	strictRouting: true,
	ipv6Routing: false,
	fakeDns: true,
	bypassLan: true,
	killSwitch: true,
	splitTunneling: {
		enabled: false,
		mode: "exclude",
		apps: [
			{
				name: "Steam.exe",
				path: "C:\\Program Files (x86)\\Steam\\steam.exe",
				enabled: true
			},
			{
				name: "Discord.exe",
				path: "C:\\Users\\User\\AppData\\Local\\Discord\\app.exe",
				enabled: false
			},
			{
				name: "Spotify.exe",
				path: "C:\\Users\\User\\AppData\\Roaming\\Spotify\\spotify.exe",
				enabled: false
			}
		]
	}
};
var DEFAULT_DPI_CONFIG = {
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
	dataPlaneCheck: true
};
var DEFAULT_CORE = {
	protocol: "masque",
	scanMode: "balanced",
	ipVersion: "v4",
	noize: "firewall",
	socksBind: "127.0.0.1:1819",
	quickReconnect: true,
	peerOverride: ""
};
var DEFAULT_ROUTING_RULES = [
	{
		id: "1",
		name: "Bypass LAN",
		type: "ip-cidr",
		value: "192.168.0.0/16, 10.0.0.0/8, 127.0.0.1/32",
		action: "direct",
		enabled: true
	},
	{
		id: "2",
		name: "Protected domains",
		type: "domain-suffix",
		value: "google.com, youtube.com, github.com, x.com, telegram.org",
		action: "proxy",
		enabled: true
	},
	{
		id: "3",
		name: "Telemetry block",
		type: "domain-suffix",
		value: "telemetry.microsoft.com, adservice.google.com, doubleclick.net",
		action: "block",
		enabled: true
	},
	{
		id: "4",
		name: "Game CDNs (direct)",
		type: "domain-suffix",
		value: "steamcontent.com, steampowered.com, epicgames.com",
		action: "direct",
		enabled: false
	},
	{
		id: "5",
		name: "Dark Fountain overrides",
		type: "domain",
		value: "deltarune.com, fangamer.com",
		action: "proxy",
		enabled: true
	}
];
var DIALOGUE = [
	{
		speaker: "Ralsei",
		quote: "Kris, the tunnel is a MASQUE path that looks like ordinary HTTPS. Gateways are only trusted after real data flows — not just a handshake.",
		colorVar: "var(--color-soul-green)"
	},
	{
		speaker: "Susie",
		quote: "If DPI tries to fingerprint the start of the session, we throw junk packets first. Firewall profile. Then GFW if they still want a fight.",
		colorVar: "var(--color-magenta)"
	},
	{
		speaker: "Spamton NEO",
		quote: "NOW'S YOUR CHANCE TO BE A [[BIG SHOT]]!! SOCKS5 ON [[127.0.0.1:1819]] WITH [Zero-RTT] AND [TLS FRAGMENT]!!",
		colorVar: "var(--color-soul-yellow)"
	},
	{
		speaker: "Queen",
		quote: "LMAO UDP throttling is so yesterday. Switch MASQUE to h2 over TCP and fragment the ClientHello. Potassium speed optional.",
		colorVar: "var(--color-cyan)"
	},
	{
		speaker: "Kris (SOUL)",
		quote: "Your SOUL shines with DETERMINATION. Scan, validate, open the proxy. The Dark Fountain only accepts a gateway that actually passes traffic.",
		colorVar: "var(--color-soul-red)"
	}
];
var INITIAL_LOGS = [
	{
		id: "boot-1",
		timestamp: "00:00:00.000",
		level: "CORE",
		tag: "AETHER_CORE",
		message: `Aether v${CORE_VERSION} engine ready. Target ${CORE_TARGET}. Binary ${CORE_BINARY}.`
	},
	{
		id: "boot-2",
		timestamp: "00:00:00.040",
		level: "TUN",
		tag: "WINTUN",
		message: "Wintun Layer-3 adapter profile loaded (v0.14.1). Virtual IP 10.66.77.2/24 MTU 1420."
	},
	{
		id: "boot-3",
		timestamp: "00:00:00.080",
		level: "DPI",
		tag: "NOIZE",
		message: "Obfuscation profiles ready: MASQUE [firewall|gfw|off] · WG/gool [balanced|aggressive|light|off]."
	},
	{
		id: "boot-4",
		timestamp: "00:00:00.120",
		level: "INFO",
		tag: "SOCKS5",
		message: "Local proxy will bind 127.0.0.1:1819 after data-plane validation."
	},
	{
		id: "boot-5",
		timestamp: "00:00:00.160",
		level: "SOUL",
		tag: "DARK_WORLD",
		message: "Fountain resonance calibrated. Press FIGHT or the SOUL to engage Aether core."
	}
];
var IDLE_TRAFFIC = {
	downloadSpeed: 0,
	uploadSpeed: 0,
	totalDownloaded: 0,
	totalUploaded: 0,
	ping: 28,
	jitter: 0,
	packetLoss: 0,
	tensionPoints: 0,
	healthPoints: 100,
	uptimeSeconds: 0
};
var SCAN_MODE_META = {
	turbo: {
		label: "Turbo",
		detail: "First handshake that answers. Fastest connect."
	},
	balanced: {
		label: "Balanced",
		detail: "Default. Best ping among verified peers."
	},
	thorough: {
		label: "Thorough",
		detail: "Deep scan. Slow, lowest RTT wins."
	},
	stealth: {
		label: "Stealth",
		detail: "Patient probes. Less network noise."
	},
	ironclad: {
		label: "Ironclad",
		detail: "Full tunnel + real HTTP before trust."
	}
};
var PROTOCOL_META = {
	masque: {
		label: "MASQUE",
		detail: "HTTP/3 or HTTP/2. Looks like ordinary web traffic."
	},
	wg: {
		label: "WireGuard",
		detail: "Lean UDP tunnel. Fastest when the path is clean."
	},
	gool: {
		label: "Nested WG",
		detail: "WireGuard inside WireGuard. Two encryption layers."
	}
};
function noizeForProtocol(protocol, noize) {
	if (protocol === "masque") {
		if (noize === "firewall" || noize === "gfw" || noize === "off") return noize;
		return "firewall";
	}
	if (noize === "balanced" || noize === "aggressive" || noize === "light" || noize === "off") return noize;
	return "balanced";
}
function buildAetherArgs(core, dpi, server) {
	const args = ["--bind", core.socksBind];
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
	} else if (core.protocol === "wg") args.push("--wg");
	else args.push("--gool");
	args.push("--scan", core.scanMode);
	args.push("--noize", noizeForProtocol(core.protocol, core.noize));
	if (core.quickReconnect) args.push("--quick-reconnect");
	else args.push("--no-quick-reconnect");
	if (!dpi.dataPlaneCheck) args.push("--no-data-check");
	const peer = core.peerOverride.trim() || `${server.serverAddress}:${server.port}`;
	if (core.peerOverride.trim()) args.push("--peer", peer);
	return args;
}
function buildAetherCommand(core, dpi, server) {
	return [CORE_BINARY, ...buildAetherArgs(core, dpi, server)].join(" ");
}
function buildRunBat(core, dpi, server, tun) {
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
function buildEnvFile(core, dpi) {
	const noize = noizeForProtocol(core.protocol, core.noize);
	const lines = [
		`AETHER_PROTOCOL=${core.protocol}`,
		`AETHER_SOCKS=${core.socksBind}`,
		`AETHER_NOIZE=${noize}`,
		`AETHER_SCAN=${core.scanMode}`,
		`AETHER_IP=${core.ipVersion === "dual" ? "both" : core.ipVersion === "v6" ? "6" : "4"}`,
		`AETHER_QUICK_RECONNECT=${core.quickReconnect ? "1" : "0"}`
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
function formatBytes(bytes) {
	if (bytes <= 0) return "0 B";
	const k = 1024;
	const sizes = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB"
	];
	const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
	return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`;
}
function formatSpeed(bytesPerSec) {
	if (bytesPerSec <= 0) return "0.00 KB/s";
	const mbps = bytesPerSec / 1048576;
	if (mbps >= 1) return `${mbps.toFixed(2)} MB/s`;
	return `${(bytesPerSec / 1024).toFixed(1)} KB/s`;
}
function formatUptime(sec) {
	return [
		Math.floor(sec / 3600),
		Math.floor(sec % 3600 / 60),
		sec % 60
	].map((n) => n.toString().padStart(2, "0")).join(":");
}
function soulHex(color) {
	switch (color) {
		case "RED": return "#ff2a2a";
		case "CYAN": return "#00e5ff";
		case "YELLOW": return "#ffe600";
		case "GREEN": return "#00ff66";
	}
}
function soulTitle(color) {
	switch (color) {
		case "RED": return {
			title: "DETERMINATION",
			sub: "Kris SOUL · Standard MASQUE"
		};
		case "CYAN": return {
			title: "PATIENCE",
			sub: "Low-jitter WireGuard stream"
		};
		case "YELLOW": return {
			title: "JUSTICE",
			sub: "Aggressive anti-DPI split"
		};
		case "GREEN": return {
			title: "KINDNESS",
			sub: "Zero-leak kill switch"
		};
	}
}
function stateLabel(state) {
	switch (state) {
		case "DISCONNECTED": return "STANDBY";
		case "DISCOVERING": return "SCANNING";
		case "NOIZE": return "NOIZE";
		case "FRAGMENTING_TLS": return "TLS FRAG";
		case "HANDSHAKING": return "HANDSHAKE";
		case "DATA_PLANE": return "PROBE";
		case "ALLOCATING_TUN": return "TUN UP";
		case "CONNECTED": return "PROTECTED";
		case "RECONNECTING": return "RECONNECT";
		case "ERROR": return "ERROR";
	}
}
function nowStamp() {
	const now = /* @__PURE__ */ new Date();
	return `${now.toTimeString().split(" ")[0]}.${now.getMilliseconds().toString().padStart(3, "0")}`;
}
function protocolLabel(protocol) {
	switch (protocol) {
		case "masque": return "MASQUE";
		case "wg": return "WIREGUARD";
		case "gool": return "NESTED WG";
		default: return protocol.toUpperCase();
	}
}
var EngineAbortError = class extends Error {
	constructor() {
		super("aborted");
		this.name = "EngineAbortError";
	}
};
function delay(ms, signal) {
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
function makeLog(level, tag, message) {
	return {
		id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
		timestamp: nowStamp(),
		level,
		tag,
		message
	};
}
function scanBudget(mode) {
	switch (mode) {
		case "turbo": return {
			count: 4,
			stepMs: 180
		};
		case "balanced": return {
			count: 6,
			stepMs: 260
		};
		case "thorough": return {
			count: 8,
			stepMs: 340
		};
		case "stealth": return {
			count: 5,
			stepMs: 520
		};
		case "ironclad": return {
			count: 6,
			stepMs: 300
		};
	}
}
async function fetchPublicIp(signal) {
	try {
		const res = await fetch("https://api.ipify.org?format=json", { signal });
		if (!res.ok) return null;
		return (await res.json()).ip ?? null;
	} catch {
		return null;
	}
}
async function runAetherConnect(signal, input, hooks) {
	const { log, setState, setServers, setCurrentServer, setLastGoodGateway, setPublicIp, setExitIp } = hooks;
	const noize = noizeForProtocol(input.core.protocol, input.core.noize);
	const cmd = buildAetherCommand(input.core, input.dpi, input.current);
	setState("DISCOVERING");
	log(makeLog("CORE", "EXEC", `$ ${cmd}`));
	log(makeLog("INFO", "INIT", `Aether v${CORE_VERSION} starting protocol=${input.core.protocol} scan=${input.core.scanMode} noize=${noize} ip=${input.core.ipVersion}`));
	fetchPublicIp(signal).then((ip) => {
		if (ip) {
			setPublicIp(ip);
			log(makeLog("INFO", "IP", `Local public address observed: ${ip}`));
		}
	});
	const cached = input.lastGoodGateway;
	const wantQuick = input.core.quickReconnect && cached && cached === `${input.current.serverAddress}:${input.current.port}`;
	let chosen = input.current;
	if (wantQuick) {
		log(makeLog("SCAN", "LASTCONN", `Last working gateway ${cached} (profile '${noize}'). Re-verifying without a full scan.`));
		setServers((prev) => prev.map((s) => s.id === chosen.id ? {
			...s,
			lastScanStatus: "probing"
		} : s));
		await delay(420, signal);
		if (Math.random() > .08) {
			const ping = Math.max(16, chosen.ping + Math.floor(Math.random() * 6) - 2);
			chosen = {
				...chosen,
				ping,
				lastScanStatus: "ok"
			};
			setServers((prev) => prev.map((s) => s.id === chosen.id ? chosen : s));
			setCurrentServer(chosen);
			log(makeLog("SCAN", "LASTCONN", `Cached gateway still alive. rtt=${ping}ms. Skipping full scan.`));
		} else {
			log(makeLog("WARN", "LASTCONN", "Cached gateway failed data-plane check. Falling back to full scan."));
			setServers((prev) => prev.map((s) => s.id === chosen.id ? {
				...s,
				lastScanStatus: "fail"
			} : s));
		}
	}
	if (!wantQuick || chosen.lastScanStatus === "fail") {
		const { count, stepMs } = scanBudget(input.core.scanMode);
		const pool = [...input.servers].sort((a, b) => a.ping - b.ping).slice(0, count);
		log(makeLog("SCAN", "START", `Scanning ${pool.length} ${input.core.ipVersion} endpoints (${input.core.scanMode}). Handshake is not enough — data must flow.`));
		const results = [];
		for (const peer of pool) {
			setServers((prev) => prev.map((s) => s.id === peer.id ? {
				...s,
				lastScanStatus: "probing"
			} : s));
			log(makeLog("SCAN", "PROBE", `probing ${peer.serverAddress}:${peer.port} (${peer.darkWorldZone}) via ${peer.protocol}...`));
			await delay(stepMs, signal);
			if (Math.random() < (input.core.scanMode === "stealth" ? .08 : .12)) {
				setServers((prev) => prev.map((s) => s.id === peer.id ? {
					...s,
					lastScanStatus: "fail"
				} : s));
				log(makeLog("WARN", "PROBE", `${peer.serverAddress}:${peer.port} timeout / handshake drop`));
				continue;
			}
			const ping = Math.max(14, peer.ping + Math.floor(Math.random() * 11) - 4);
			const next = {
				...peer,
				ping,
				lastScanStatus: "ok",
				load: Math.max(8, peer.load + Math.floor(Math.random() * 7) - 3)
			};
			results.push(next);
			setServers((prev) => prev.map((s) => s.id === peer.id ? next : s));
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
			log(makeLog("SCAN", "IRONCLAD", `Shortlist of ${results.length}. Opening a full tunnel and sending a real HTTP request through each.`));
			for (const cand of results.slice(0, 3)) {
				await delay(420, signal);
				const rtt = cand.ping + 40 + Math.floor(Math.random() * 30);
				log(makeLog("SCAN", "HTTP", `GET https://cloudflare.com/cdn-cgi/trace via ${cand.serverAddress} → 200 in ${rtt}ms`));
			}
		}
		setCurrentServer(chosen);
		log(makeLog("SCAN", "WINNER", `Selected ${chosen.name} ${chosen.serverAddress}:${chosen.port} rtt=${chosen.ping}ms load=${chosen.load}%`));
	}
	setState("NOIZE");
	log(makeLog("DPI", "NOIZE", `profile=${noize} decoy_pkts=${noize === "off" ? 0 : noize === "gfw" || noize === "aggressive" ? 28 : noize === "light" ? 6 : 14} jitter=8-24ms — handshake shape scrambled before the real flight.`));
	await delay(noize === "off" ? 180 : 520, signal);
	if (input.core.protocol === "masque" && input.dpi.masqueHttp === "h2" && input.dpi.tlsFragmentation) {
		setState("FRAGMENTING_TLS");
		log(makeLog("DPI", "TLS_FRAG", `Splitting TLS ClientHello into ${input.dpi.fragMin}-${input.dpi.fragMax} byte chunks, delay ${input.dpi.fragDelayMin}-${input.dpi.fragDelayMax}ms (h2 only).`));
		await delay(480, signal);
	}
	setState("HANDSHAKING");
	if (input.core.protocol === "masque") {
		const alpn = input.dpi.masqueHttp === "h2" ? "h2" : "h3";
		log(makeLog("INFO", "MASQUE", `CONNECT-IP over ${alpn === "h3" ? "HTTP/3 QUIC" : "HTTP/2 TLS"} alpn=${alpn} congestion=${input.dpi.congestionControl} zero_rtt=${input.dpi.zeroRtt}`));
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
		log(makeLog("INFO", "PROBE", "End-to-end data-plane check — SOCKS5 stays closed until a real reply returns."));
		await delay(540, signal);
		log(makeLog("INFO", "PROBE", `GET /cdn-cgi/trace via tunnel → 200 colo=${chosen.iso} rtt=${chosen.ping + 12}ms. Gateway trusted.`));
	}
	if (input.tun.enabled) {
		setState("ALLOCATING_TUN");
		log(makeLog("TUN", "WINTUN", `Spawning ${input.tun.driver} adapter "${input.tun.adapterName}" ip=${input.tun.virtualIp} gw=${input.tun.gateway} mtu=${input.tun.mtu}`));
		await delay(420, signal);
		if (input.tun.killSwitch) log(makeLog("TUN", "KILL", "Kill switch armed. Default route trapped; leak on drop is blocked."));
		if (input.tun.bypassLan) log(makeLog("TUN", "ROUTE", "LAN prefixes excluded from the tunnel."));
		log(makeLog("TUN", "DNS", `DoH resolvers ${input.tun.dnsServers.join(", ")} fake_dns=${input.tun.fakeDns}`));
	}
	log(makeLog("INFO", "SOCKS5", `listening ${input.core.socksBind} (socks5h)`));
	setLastGoodGateway(`${chosen.serverAddress}:${chosen.port}`);
	setExitIp(chosen.exitIp);
	setState("CONNECTED");
	log(makeLog("SOUL", "VICTORY", `Tunnel up. Exit ${chosen.exitIp} (${chosen.city}). All traffic shielded through ${chosen.darkWorldZone}.`));
}
function makeDisconnectLogs(server, tun) {
	return [
		makeLog("INFO", "DISCONNECT", `Terminating session to ${server.name} (${server.serverAddress}:${server.port})...`),
		makeLog("TUN", "WINTUN", tun.enabled ? `Adapter "${tun.adapterName}" session closed. Routing tables restored.` : "Proxy listener closed. No TUN adapter was bound."),
		makeLog("INFO", "SOCKS5", "127.0.0.1:1819 released.")
	];
}
function liveTickLog(server, dpi) {
	const msgs = [
		[
			"DPI",
			"DPI_SHIELD",
			`SOCKS5 [127.0.0.1:1819] → TUN [10.66.77.2]: TLS 1.3 ClientHello split chunk ${dpi.fragMin}B.`
		],
		[
			"TUN",
			"WINTUN",
			`Layer-3 I/O: 1420 bytes, 0.0% drop, congestion ${dpi.congestionControl}.`
		],
		[
			"INFO",
			"SESSION",
			`Zero-RTT resumption token verified with ${server.serverAddress}.`
		],
		[
			"INFO",
			"DNS",
			"DoH 1.1.1.1 cache hit (0ms). SNI evasion shield active."
		],
		[
			"SCAN",
			"KEEPALIVE",
			`Peer ${server.serverAddress}:${server.port} keepalive ok rtt=${server.ping}ms.`
		]
	];
	const pick = msgs[Math.floor(Math.random() * msgs.length)];
	return makeLog(pick[0], pick[1], pick[2]);
}
var abortCtl = null;
var trafficTimer = null;
function stopTrafficTimer() {
	if (trafficTimer) {
		clearInterval(trafficTimer);
		trafficTimer = null;
	}
}
var useVpnStore = create()(persist((set, get) => ({
	connectionState: "DISCONNECTED",
	soulColor: "RED",
	servers: DEFAULT_SERVERS,
	currentServerId: DEFAULT_SERVERS[0].id,
	tunConfig: DEFAULT_TUN_CONFIG,
	dpiConfig: DEFAULT_DPI_CONFIG,
	core: DEFAULT_CORE,
	routingRules: DEFAULT_ROUTING_RULES,
	logs: INITIAL_LOGS,
	traffic: {
		...IDLE_TRAFFIC,
		ping: DEFAULT_SERVERS[0].ping
	},
	publicIp: null,
	exitIp: null,
	lastGoodGateway: null,
	isMaximized: false,
	isMinimized: false,
	showTray: true,
	soundEnabled: true,
	activeTab: "DASHBOARD",
	addLog: (entry) => set((s) => ({ logs: [...s.logs.slice(-280), entry] })),
	setSoulColor: (soulColor) => set({ soulColor }),
	setActiveTab: (activeTab) => set({ activeTab }),
	setTunConfig: (tunConfig) => set({ tunConfig }),
	setDpiConfig: (dpiConfig) => set({ dpiConfig }),
	setCore: (patch) => set((s) => ({ core: {
		...s.core,
		...patch
	} })),
	setRoutingRules: (routingRules) => set({ routingRules }),
	setServers: (servers) => set((s) => ({ servers: typeof servers === "function" ? servers(s.servers) : servers })),
	selectServer: (server) => {
		const { connectionState, toggleConnect } = get();
		const was = get().currentServerId;
		set({
			currentServerId: server.id,
			activeTab: "DASHBOARD"
		});
		get().addLog({
			id: `sel-${Date.now()}`,
			timestamp: (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] + ".000",
			level: "INFO",
			tag: "GATEWAY",
			message: `Selected ${server.name} (${server.serverAddress}:${server.port})`
		});
		if (connectionState === "CONNECTED" && was !== server.id) {
			toggleConnect();
			window.setTimeout(() => get().toggleConnect(), 700);
		}
	},
	toggleFavorite: (id) => set((s) => ({ servers: s.servers.map((n) => n.id === id ? {
		...n,
		isFavorite: !n.isFavorite
	} : n) })),
	toggleConnect: () => {
		const s = get();
		const current = s.servers.find((n) => n.id === s.currentServerId) ?? s.servers[0];
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
					jitter: 0
				}
			});
			return;
		}
		if (s.connectionState !== "DISCONNECTED" && s.connectionState !== "ERROR") {
			abortCtl?.abort();
			abortCtl = null;
			stopTrafficTimer();
			playSound.cancel();
			set({
				connectionState: "DISCONNECTED",
				traffic: {
					...s.traffic,
					downloadSpeed: 0,
					uploadSpeed: 0,
					tensionPoints: 0,
					uptimeSeconds: 0
				}
			});
			get().addLog({
				id: `cancel-${Date.now()}`,
				timestamp: (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] + ".000",
				level: "WARN",
				tag: "CANCEL",
				message: "Connection sequence aborted by user."
			});
			return;
		}
		abortCtl?.abort();
		abortCtl = new AbortController();
		const signal = abortCtl.signal;
		playSound.heartbeat();
		(async () => {
			try {
				await runAetherConnect(signal, {
					servers: get().servers,
					current,
					core: get().core,
					dpi: get().dpiConfig,
					tun: get().tunConfig,
					lastGoodGateway: get().lastGoodGateway
				}, {
					setState: (connectionState) => set({ connectionState }),
					log: (entry) => get().addLog(entry),
					setServers: (updater) => set((st) => ({ servers: updater(st.servers) })),
					setCurrentServer: (server) => set((st) => ({
						currentServerId: server.id,
						servers: st.servers.map((n) => n.id === server.id ? server : n)
					})),
					setLastGoodGateway: (lastGoodGateway) => set({ lastGoodGateway }),
					setPublicIp: (publicIp) => set({ publicIp }),
					setExitIp: (exitIp) => set({ exitIp })
				});
				playSound.connected();
				stopTrafficTimer();
				trafficTimer = setInterval(() => get().tickTraffic(), 1e3);
			} catch (err) {
				if (err instanceof EngineAbortError) return;
				set({ connectionState: "ERROR" });
				get().addLog({
					id: `err-${Date.now()}`,
					timestamp: (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] + ".000",
					level: "ERROR",
					tag: "CORE",
					message: err instanceof Error ? err.message : "Tunnel failed."
				});
			}
		})();
	},
	setMinimized: (isMinimized) => set({ isMinimized }),
	setMaximized: (isMaximized) => set({ isMaximized }),
	setShowTray: (showTray) => set({ showTray }),
	setSoundEnabled: (soundEnabled) => {
		setSoundEnabled(soundEnabled);
		set({ soundEnabled });
	},
	clearLogs: () => set({ logs: [] }),
	tickTraffic: () => {
		const s = get();
		if (s.connectionState !== "CONNECTED") return;
		const current = s.servers.find((n) => n.id === s.currentServerId) ?? s.servers[0];
		const base = 9437184;
		const factor = .55 + Math.random() * .9;
		const downloadSpeed = Math.floor(base * factor);
		const uploadSpeed = Math.floor(downloadSpeed * .21);
		const ping = Math.max(12, current.ping + Math.floor(Math.random() * 5) - 2);
		const jitter = +(Math.random() * 1.6 + .3).toFixed(1);
		const tensionPoints = Math.min(100, Math.max(28, Math.floor(downloadSpeed / 23068672 * 100)));
		set({ traffic: {
			downloadSpeed,
			uploadSpeed,
			totalDownloaded: s.traffic.totalDownloaded + downloadSpeed,
			totalUploaded: s.traffic.totalUploaded + uploadSpeed,
			ping,
			jitter,
			packetLoss: Math.random() > .92 ? .1 : 0,
			tensionPoints,
			healthPoints: Math.max(88, 100 - Math.floor(jitter * 2)),
			uptimeSeconds: s.traffic.uptimeSeconds + 1
		} });
		if (Math.random() > .72) get().addLog(liveTickLog(current, s.dpiConfig));
	}
}), {
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
		showTray: s.showTray
	})
}));
function currentServerOf(s) {
	return s.servers.find((n) => n.id === s.currentServerId) ?? s.servers[0];
}
function BattleMenuBar({ activeTab, onSelectTab, connectionState, onToggleConnect, soulColor }) {
	const isConnected = connectionState === "CONNECTED";
	const isBusy = connectionState !== "CONNECTED" && connectionState !== "DISCONNECTED" && connectionState !== "ERROR";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "w-full bg-void border-t-2 border-line px-2 py-2 select-none shrink-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-6xl mx-auto grid grid-cols-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-1.5 sm:gap-2",
			children: [
				{
					id: "FIGHT",
					label: isConnected ? "DISCONNECT" : isBusy ? "CANCEL" : "FIGHT",
					short: isConnected ? "STOP" : isBusy ? "STOP" : "FIGHT",
					color: "#ff6600",
					icon: Swords,
					action: onToggleConnect,
					active: isConnected
				},
				{
					id: "ACT",
					label: "TUN",
					short: "TUN",
					color: "#00e5ff",
					icon: Shield,
					tab: "TUN_SETTINGS"
				},
				{
					id: "ITEM",
					label: "DPI",
					short: "DPI",
					color: "#ffe600",
					icon: Sparkles,
					tab: "DPI_SETTINGS"
				},
				{
					id: "SERVERS",
					label: "GATES",
					short: "GATES",
					color: "#7dd3fc",
					icon: Globe,
					tab: "SERVERS"
				},
				{
					id: "MERCY",
					label: "ROUTE",
					short: "ROUTE",
					color: "#ff2d7b",
					icon: Route,
					tab: "ROUTING"
				},
				{
					id: "LOGS",
					label: "LOGS",
					short: "LOGS",
					color: "#00ff66",
					icon: Terminal,
					tab: "LOGS"
				},
				{
					id: "SETUP",
					label: "CORE",
					short: "CORE",
					color: "#00e5ff",
					icon: Download,
					tab: "QUICK_SETUP"
				}
			].map((item) => {
				const isItemActive = item.tab ? activeTab === item.tab : item.active;
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					id: `battle-btn-${item.id.toLowerCase()}`,
					type: "button",
					onMouseEnter: () => playSound.cursor(),
					onClick: () => {
						if (item.action) item.action();
						else if (item.tab) {
							onSelectTab(activeTab === item.tab ? "DASHBOARD" : item.tab);
							playSound.select();
						}
					},
					className: `relative flex items-center justify-center gap-1 px-2 py-2 rounded-sm border-2 transition-colors duration-150 font-pixel text-[8px] sm:text-[10px] uppercase tracking-wider min-h-11 ${isItemActive ? "bg-panel text-fg" : "border-line bg-ink text-muted hover:border-line-strong hover:text-fg"}`,
					style: {
						borderColor: isItemActive ? item.color : void 0,
						boxShadow: isItemActive ? `0 0 12px ${item.color}55` : void 0
					},
					children: [
						isItemActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "10",
							height: "10",
							viewBox: "0 0 24 24",
							fill: soulHex(soulColor),
							className: "shrink-0 hidden sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3 shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sm:hidden",
							children: item.short
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: item.label
						})
					]
				}, item.id);
			})
		})
	});
}
function ModalShell({ title, accent = "var(--color-cyan)", icon, onClose, children, footer, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `bg-ink border-2 rounded-xl w-full max-h-[90vh] flex flex-col overflow-hidden ${wide ? "max-w-3xl" : "max-w-2xl"}`,
			style: {
				borderColor: accent,
				boxShadow: `0 0 24px color-mix(in oklab, ${accent} 28%, transparent)`
			},
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-3 bg-panel border-b border-line shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-pixel text-[10px] text-fg uppercase tracking-wider truncate",
							children: title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							onClose();
							playSound.cancel();
						},
						className: "p-1.5 rounded-sm text-muted hover:text-fg hover:bg-surface min-h-11 min-w-11 flex items-center justify-center",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-4",
					children
				}),
				footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-3 border-t border-line bg-panel shrink-0",
					children: footer
				}) : null
			]
		})
	});
}
var LEVEL_COLOR = {
	INFO: "text-cyan",
	DPI: "text-soul-yellow",
	TUN: "text-soul-green",
	WARN: "text-tp",
	ERROR: "text-soul-red",
	SOUL: "text-magenta",
	SCAN: "text-muted",
	CORE: "text-fg"
};
function DiagnosticsLogModal({ logs, onClearLogs, onClose }) {
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const [auto, setAuto] = (0, import_react.useState)(true);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	const shown = (0, import_react.useMemo)(() => filter === "ALL" ? logs : logs.filter((l) => l.level === filter), [logs, filter]);
	(0, import_react.useEffect)(() => {
		if (auto && ref.current) ref.current.scrollTop = ref.current.scrollHeight;
	}, [shown, auto]);
	const asText = () => logs.map((l) => `[${l.timestamp}] [${l.level}] [${l.tag}] ${l.message}`).join("\n");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		title: "LOGS · Aether core console",
		accent: "var(--color-soul-green)",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4 text-soul-green" }),
		onClose,
		wide: true,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "bg-ink border border-line rounded-sm px-2 py-2 min-h-11 text-xs",
					value: filter,
					onChange: (e) => setFilter(e.target.value),
					children: [
						"ALL",
						"CORE",
						"SCAN",
						"DPI",
						"TUN",
						"INFO",
						"SOUL",
						"WARN",
						"ERROR"
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: l }, l))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setAuto((v) => !v),
					className: "px-3 min-h-11 rounded-sm border border-line text-muted flex items-center gap-1 text-[10px] font-mono",
					children: [auto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), auto ? "Live" : "Paused"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: async () => {
						await navigator.clipboard.writeText(asText());
						setCopied(true);
						playSound.select();
						window.setTimeout(() => setCopied(false), 1600);
					},
					className: "px-3 min-h-11 rounded-sm border border-line text-muted flex items-center gap-1 text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copied" : "Copy"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						const blob = new Blob([asText()], { type: "text/plain" });
						const url = URL.createObjectURL(blob);
						const a = document.createElement("a");
						a.href = url;
						a.download = `aether-core-${Date.now()}.log`;
						a.click();
						URL.revokeObjectURL(url);
						playSound.connected();
					},
					className: "px-3 min-h-11 rounded-sm border border-line text-muted flex items-center gap-1 text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "File"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						onClearLogs();
						playSound.cancel();
					},
					className: "px-3 min-h-11 rounded-sm border border-line text-soul-red flex items-center gap-1 text-[10px] ml-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Clear"]
				})
			]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: "h-[50vh] overflow-auto bg-void border border-line rounded-md p-3 font-mono text-[11px] leading-relaxed",
			children: shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-dim",
				children: "No log lines."
			}) : shown.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-dim tabular-nums shrink-0",
						children: l.timestamp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `w-12 shrink-0 ${LEVEL_COLOR[l.level]}`,
						children: l.level
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted w-20 shrink-0 truncate",
						children: l.tag
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg break-all",
						children: l.message
					})
				]
			}, l.id))
		})
	});
}
function Toggle$1({ on, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => onChange(!on),
		className: `w-10 h-6 rounded-full border ${on ? "bg-soul-yellow/20 border-soul-yellow" : "bg-surface border-line-strong"}`,
		"aria-pressed": on,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block size-4 rounded-full mx-1 ${on ? "translate-x-4 bg-soul-yellow" : "bg-muted"}` })
	});
}
function DpiSettingsModal({ config, core, onSave, onClose }) {
	const [form, setForm] = (0, import_react.useState)(config);
	const [noize, setNoize] = (0, import_react.useState)(noizeForProtocol(core.protocol, core.noize));
	const [ipVersion, setIpVersion] = (0, import_react.useState)(core.ipVersion);
	const [quick, setQuick] = (0, import_react.useState)(core.quickReconnect);
	const [socks, setSocks] = (0, import_react.useState)(core.socksBind);
	const [peer, setPeer] = (0, import_react.useState)(core.peerOverride);
	const options = core.protocol === "masque" ? [
		"firewall",
		"gfw",
		"off"
	] : [
		"balanced",
		"aggressive",
		"light",
		"off"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		title: "ITEM · DPI evasion & protocol",
		accent: "var(--color-soul-yellow)",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-soul-yellow" }),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				className: "px-3 py-2 min-h-11 rounded-sm border border-line text-muted font-pixel text-[9px]",
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					onSave(form, {
						noize,
						ipVersion,
						quickReconnect: quick,
						socksBind: socks,
						peerOverride: peer
					});
					playSound.dpiFragment();
					onClose();
				},
				className: "px-4 py-2 min-h-11 rounded-sm bg-soul-yellow text-void font-pixel text-[9px]",
				children: "Apply"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 text-xs font-mono text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 bg-panel border border-soul-yellow/30 rounded-md flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 text-soul-yellow shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted leading-relaxed",
						children: "Aether hides the handshake with noize, then (on MASQUE h2) can fragment the TLS ClientHello so DPI never sees a complete SNI. Gateways are trusted only after a real data-plane probe."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-dim mb-1",
					children: [
						"Noize profile (",
						core.protocol,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: options.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setNoize(n),
						className: `px-3 py-2 min-h-11 rounded-sm border text-[10px] ${noize === n ? "border-soul-yellow text-soul-yellow bg-soul-yellow/10" : "border-line text-muted"}`,
						children: n
					}, n))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "MASQUE HTTP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: form.masqueHttp,
								onChange: (e) => setForm({
									...form,
									masqueHttp: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "h3",
									children: "h3 · HTTP/3 QUIC (default)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "h2",
									children: "h2 · HTTP/2 TCP (UDP blocked)"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "Congestion"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: form.congestionControl,
								onChange: (e) => setForm({
									...form,
									congestionControl: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "BBRv3",
										children: "BBRv3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "BBR",
										children: "BBR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CUBIC",
										children: "CUBIC"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "IP scan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: ipVersion,
								onChange: (e) => setIpVersion(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "v4",
										children: "IPv4 only (-4)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "v6",
										children: "IPv6 only (-6)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "dual",
										children: "Dual stack"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "SOCKS5 bind"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: socks,
								onChange: (e) => setSocks(e.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between bg-panel border border-line rounded-sm px-3 py-2 min-h-11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TLS ClientHello fragmentation (h2 only)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle$1, {
						on: form.tlsFragmentation,
						onChange: (tlsFragmentation) => setForm({
							...form,
							tlsFragmentation
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-dim",
							children: "Frag min B"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
							value: form.fragMin,
							onChange: (e) => setForm({
								...form,
								fragMin: Number(e.target.value)
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-dim",
							children: "Frag max B"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
							value: form.fragMax,
							onChange: (e) => setForm({
								...form,
								fragMax: Number(e.target.value)
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-dim",
							children: "Delay min ms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
							value: form.fragDelayMin,
							onChange: (e) => setForm({
								...form,
								fragDelayMin: Number(e.target.value)
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-dim",
							children: "Delay max ms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
							value: form.fragDelayMax,
							onChange: (e) => setForm({
								...form,
								fragDelayMax: Number(e.target.value)
							})
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
					children: [[
						["noisePadding", "Noise padding"],
						["zeroRtt", "Zero-RTT"],
						["udpGso", "UDP GSO"],
						["dataPlaneCheck", "Data-plane validation"]
					].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between bg-panel border border-line rounded-sm px-3 py-2 min-h-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle$1, {
							on: Boolean(form[key]),
							onChange: (v) => setForm({
								...form,
								[key]: v
							})
						})]
					}, key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between bg-panel border border-line rounded-sm px-3 py-2 min-h-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quick reconnect" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle$1, {
							on: quick,
							onChange: setQuick
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-dim",
						children: "Force peer (skip scan) — ip:port"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
						placeholder: "162.159.192.1:443",
						value: peer,
						onChange: (e) => setPeer(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-dim",
						children: "Obfuscation seed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "flex-1 bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
							value: form.obfuscationSeed,
							onChange: (e) => setForm({
								...form,
								obfuscationSeed: e.target.value
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
								let res = "AETHER_";
								for (let i = 0; i < 16; i++) res += chars[Math.floor(Math.random() * 32)];
								setForm({
									...form,
									obfuscationSeed: res
								});
								playSound.select();
							},
							className: "px-3 min-h-11 rounded-sm border border-line text-soul-yellow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" })
						})]
					})]
				})
			]
		})
	});
}
function DialogueBox() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [text, setText] = (0, import_react.useState)("");
	const line = DIALOGUE[index];
	(0, import_react.useEffect)(() => {
		setText("");
		let i = 0;
		const full = line.quote;
		const id = setInterval(() => {
			i += 1;
			setText(full.slice(0, i));
			if (i >= full.length) clearInterval(id);
		}, 18);
		return () => clearInterval(id);
	}, [index, line.quote]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		id: "deltarune-dialogue-box",
		onClick: () => {
			setIndex((p) => (p + 1) % DIALOGUE.length);
			playSound.select();
		},
		className: "w-full deltarune-box rounded-md p-3.5 text-left select-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-12 rounded-sm border-2 bg-ink flex items-center justify-center shrink-0",
				style: { borderColor: line.colorVar },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "22",
					height: "22",
					viewBox: "0 0 24 24",
					fill: line.colorVar,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-pixel text-[10px] uppercase tracking-wider",
						style: { color: line.colorVar },
						children: ["* ", line.speaker]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[9px] font-mono text-dim flex items-center gap-1 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3" }), "Next"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-fg mt-1.5 leading-relaxed min-h-10",
					children: text
				})]
			})]
		})
	});
}
function IsoBadge({ iso }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center justify-center min-w-8 h-5 px-1 rounded-sm bg-surface border border-line-strong font-pixel text-[8px] text-cyan tracking-wider",
		children: iso
	});
}
function SoulHeart({ connectionState, soulColor, tensionPoints, onClick }) {
	const fill = soulHex(soulColor);
	const meta = soulTitle(soulColor);
	const isConnected = connectionState === "CONNECTED";
	const isBusy = connectionState !== "CONNECTED" && connectionState !== "DISCONNECTED" && connectionState !== "ERROR";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center select-none py-1 scale-90 sm:scale-100 origin-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute size-44 rounded-full border border-dashed ${isConnected ? "border-cyan/40 animate-spin-slow" : isBusy ? "border-soul-yellow/50 animate-spin-slow" : "border-line-strong/60"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute size-36 rounded-full border ${isConnected ? "border-magenta/30 animate-spin-rev" : isBusy ? "border-cyan/40 animate-spin-rev" : "border-transparent"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute size-28 rounded-full blur-xl opacity-50",
					style: { backgroundColor: isConnected ? fill : isBusy ? "#ffe600" : "#1a2347" }
				}),
				isConnected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "absolute size-48 -rotate-90 pointer-events-none",
					viewBox: "0 0 192 192",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "96",
						cy: "96",
						r: "86",
						fill: "transparent",
						stroke: "#212952",
						strokeWidth: "3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "96",
						cy: "96",
						r: "86",
						fill: "transparent",
						stroke: "#ff9900",
						strokeWidth: "4",
						strokeDasharray: 540,
						strokeDashoffset: 540 - 540 * tensionPoints / 100,
						strokeLinecap: "round",
						className: "transition-[stroke-dashoffset] duration-300"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					id: "main-soul-connect-btn",
					type: "button",
					onClick: () => {
						onClick();
						playSound.heartbeat();
					},
					className: `relative z-10 p-6 rounded-full transition-transform duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-cyan ${isConnected ? "animate-soul-pulse" : isBusy ? "animate-pulse" : "hover:scale-110"}`,
					style: { ["--soul"]: fill },
					title: isConnected ? "Disconnect tunnel" : "Establish Aether tunnel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "68",
						height: "68",
						viewBox: "0 0 24 24",
						style: { filter: `drop-shadow(0 0 ${isConnected ? "18px" : "8px"} ${isConnected ? fill : isBusy ? "#ffe600" : "#495788"})` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
							fill: isConnected ? fill : isBusy ? "#ffe600" : "#6b7ab8",
							stroke: "#ffffff",
							strokeWidth: isConnected ? .8 : .5
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-pixel text-[10px] tracking-wider",
				style: { color: isConnected ? fill : "#7b8ab8" },
				children: stateLabel(connectionState)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-mono text-muted mt-1",
				children: isConnected ? `Wintun Layer-3 · ${meta.title}` : isBusy ? "Aether core is opening a validated path..." : "Press the SOUL or FIGHT to engage Aether"
			})]
		})]
	});
}
var BARS = 42;
function TrafficCanvas({ connectionState, downloadSpeed }) {
	const [history, setHistory] = (0, import_react.useState)(() => Array(BARS).fill(0));
	const connected = connectionState === "CONNECTED";
	(0, import_react.useEffect)(() => {
		if (!connected) {
			setHistory(Array(BARS).fill(0));
			return;
		}
		const mb = downloadSpeed / 1048576;
		const norm = Math.min(100, Math.max(8, mb * 7 + 12));
		setHistory((prev) => [...prev.slice(1), norm]);
	}, [connected, downloadSpeed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full h-[70px] rounded-sm bg-void border border-line/40 flex items-end gap-px px-1 py-1",
		"aria-hidden": "true",
		children: history.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `flex-1 min-w-0 rounded-sm ${connected ? "bg-cyan/80" : "bg-line"}`,
			style: { height: connected ? `${h}%` : "8%" }
		}, i))
	});
}
var SCANS = [
	"turbo",
	"balanced",
	"thorough",
	"stealth",
	"ironclad"
];
var PROTOS = [
	"masque",
	"wg",
	"gool"
];
function MainDashboard({ currentServer, connectionState, soulColor, traffic, tunConfig, dpiConfig, core, publicIp, exitIp, onToggleConnect, onOpenServers, onOpenTun, onOpenDpi, onOpenQuickSetup, onCorePatch }) {
	const connected = connectionState === "CONNECTED";
	const cmd = buildAetherCommand(core, dpiConfig, currentServer);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 max-w-6xl mx-auto w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-ink border-2 border-line rounded-lg p-3 flex flex-col justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4 text-tp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-pixel text-[9px] text-tp tracking-wider",
										children: "TP · THROUGHPUT"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-pixel text-[10px] text-tp tabular-nums",
									children: [traffic.tensionPoints, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2.5 w-full bg-surface h-3.5 rounded-sm border border-tp/40 overflow-hidden relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-tp transition-[width] duration-300",
									style: { width: `${traffic.tensionPoints}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted mt-1.5 flex justify-between tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Up ", formatUptime(traffic.uptimeSeconds)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Jitter ",
									traffic.jitter,
									"ms"
								] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-ink border-2 border-line rounded-lg p-3 flex flex-col justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4 text-soul-green" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-pixel text-[9px] text-soul-green tracking-wider",
										children: "HP · PATH"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-pixel text-[10px] text-soul-green tabular-nums",
									children: [traffic.healthPoints, "/100"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2.5 w-full bg-surface h-3.5 rounded-sm border border-soul-green/40 overflow-hidden relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-soul-green transition-[width] duration-300",
									style: { width: `${traffic.healthPoints}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-mono text-muted mt-1.5 flex justify-between tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Loss ",
									traffic.packetLoss,
									"%"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: connected ? `${traffic.ping} ms` : "idle" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onOpenServers,
						className: "bg-ink border-2 border-line hover:border-cyan/60 transition-colors rounded-lg p-3 text-left flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsoBadge, { iso: currentServer.iso }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs font-medium text-fg flex items-center gap-1 truncate",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: currentServer.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3 text-dim shrink-0" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] font-mono text-muted",
										children: [
											currentServer.city,
											", ",
											currentServer.country
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs font-medium text-soul-green bg-panel px-1.5 py-0.5 rounded-sm border border-line tabular-nums",
								children: [currentServer.ping, "ms"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 mt-2 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1.5 py-0.5 bg-panel rounded-sm text-[9px] font-mono text-cyan border border-cyan/30",
								children: protocolLabel(currentServer.protocol)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-1.5 py-0.5 bg-panel rounded-sm text-[9px] font-mono text-muted border border-line-strong",
								children: [
									"Load ",
									currentServer.load,
									"%"
								]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7 bg-ink border-2 border-line rounded-xl p-4 flex flex-col items-center relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 scanlines opacity-30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full flex items-center justify-between text-xs z-10 mb-1 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 px-2 py-1 rounded-sm bg-panel border border-line-strong text-[10px] font-mono text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3 text-cyan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Aether v1.8.0" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 px-2 py-1 rounded-sm bg-panel border border-line-strong text-[10px] font-mono text-soul-green",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tunConfig.enabled ? "TUN ready" : "SOCKS only" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "z-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoulHeart, {
								connectionState,
								soulColor,
								tensionPoints: traffic.tensionPoints,
								onClick: onToggleConnect
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full mt-2 z-10 bg-void border border-line rounded-md p-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[10px] font-mono text-muted mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 rounded-full ${connected ? "bg-cyan animate-pulse" : "bg-dim"}` }), "Live tunnel flow"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: formatSpeed(traffic.downloadSpeed + traffic.uploadSpeed)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrafficCanvas, {
								connectionState,
								downloadSpeed: traffic.downloadSpeed
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-ink border-2 border-line rounded-lg p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-[10px] font-mono text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3.5 text-cyan" }), "DOWNLOAD"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-medium font-mono text-cyan mt-1 tabular-nums",
									children: formatSpeed(traffic.downloadSpeed)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-mono text-dim mt-0.5 tabular-nums",
									children: formatBytes(traffic.totalDownloaded)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-ink border-2 border-line rounded-lg p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-[10px] font-mono text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3.5 text-magenta" }), "UPLOAD"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-medium font-mono text-magenta mt-1 tabular-nums",
									children: formatSpeed(traffic.uploadSpeed)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-mono text-dim mt-0.5 tabular-nums",
									children: formatBytes(traffic.totalUploaded)
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-ink border-2 border-line rounded-lg p-3 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-line pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-pixel text-[9px] text-fg flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5 text-cyan" }), "AETHER CORE"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-mono text-soul-green",
									children: connected ? "LIVE" : "ARMED"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-1",
								children: PROTOS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onCorePatch({
										protocol: p,
										noize: p === "masque" ? "firewall" : "balanced"
									}),
									className: `px-1 py-2 rounded-sm border text-[9px] font-pixel uppercase min-h-11 ${core.protocol === p ? "border-cyan bg-cyan/10 text-cyan" : "border-line bg-panel text-muted hover:text-fg"}`,
									title: PROTOCOL_META[p].detail,
									children: PROTOCOL_META[p].label
								}, p))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: SCANS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onCorePatch({ scanMode: m }),
									className: `px-2 py-1.5 rounded-sm border text-[9px] font-mono min-h-9 ${core.scanMode === m ? "border-soul-yellow bg-soul-yellow/10 text-soul-yellow" : "border-line bg-panel text-muted hover:text-fg"}`,
									title: SCAN_MODE_META[m].detail,
									children: SCAN_MODE_META[m].label
								}, m))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onOpenTun,
								className: "w-full flex items-center justify-between p-2 rounded-sm bg-panel border border-line-strong hover:border-cyan/50 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4 text-cyan shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] font-medium text-fg",
											children: "Wintun adapter"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[9px] font-mono text-muted truncate",
											children: [
												tunConfig.adapterName,
												" · ",
												tunConfig.virtualIp
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-1.5 py-0.5 rounded-sm bg-surface text-[9px] font-mono text-cyan",
									children: "CFG"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onOpenDpi,
								className: "w-full flex items-center justify-between p-2 rounded-sm bg-panel border border-line-strong hover:border-soul-yellow/50 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-soul-yellow shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] font-medium text-fg",
											children: "DPI / noize / fragment"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[9px] font-mono text-muted truncate",
											children: [
												core.noize,
												" · ",
												dpiConfig.masqueHttp.toUpperCase(),
												" · [",
												dpiConfig.fragMin,
												"-",
												dpiConfig.fragMax,
												"B]"
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-1.5 py-0.5 rounded-sm bg-surface text-[9px] font-mono text-soul-yellow",
									children: "TUNE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-2 rounded-sm bg-panel border border-line-strong",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-soul-green shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] font-medium text-fg",
											children: "Kill switch · SOCKS5"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] font-mono text-muted truncate",
											children: core.socksBind
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-soul-green" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2 text-[10px] font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 rounded-sm bg-panel border border-line",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-dim",
										children: "Your IP"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-fg truncate tabular-nums",
										children: publicIp ?? "—"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 rounded-sm bg-panel border border-line",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-dim",
										children: "Exit IP"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-cyan truncate tabular-nums",
										children: connected ? exitIp ?? "—" : "not tunneled"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onOpenQuickSetup,
								className: "w-full flex items-center justify-between p-2 rounded-sm bg-cyan/10 border border-cyan/40 hover:border-cyan text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-medium text-cyan",
									children: "Run on Windows"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[9px] font-mono text-muted truncate",
									children: cmd
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 rounded-sm bg-cyan text-void font-pixel text-[8px] shrink-0",
									children: "EXPORT"
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogueBox, {})
		]
	});
}
function downloadText(filename, text, mime = "text/plain") {
	const blob = new Blob([text], { type: `${mime};charset=utf-8` });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function QuickSetupModal({ currentServer, tunConfig, dpiConfig, core, onClose }) {
	const [tab, setTab] = (0, import_react.useState)("cli");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const cmd = buildAetherCommand(core, dpiConfig, currentServer);
	const bat = buildRunBat(core, dpiConfig, currentServer, tunConfig);
	const env = buildEnvFile(core, dpiConfig);
	const body = tab === "cli" ? cmd : tab === "bat" ? bat : env;
	const copy = async () => {
		await navigator.clipboard.writeText(body);
		setCopied(true);
		playSound.select();
		window.setTimeout(() => setCopied(false), 1600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		title: "EXPORT · Aether core for Windows",
		accent: "var(--color-cyan)",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4 text-cyan" }),
		onClose,
		wide: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 text-xs font-mono text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted leading-relaxed",
					children: [
						"This preview drives the Aether v",
						CORE_VERSION,
						" control plane in the browser. To actually tunnel a Windows machine, drop ",
						CORE_BINARY,
						" next to the generated launcher. SOCKS5 will listen on ",
						core.socksBind,
						". Point browsers at ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-cyan",
							children: ["socks5h://", core.socksBind]
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/core/aether-windows-x86_64.zip",
							download: true,
							onClick: () => playSound.connected(),
							className: "flex items-center justify-center gap-2 min-h-11 px-3 rounded-sm bg-cyan text-void font-pixel text-[9px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Core zip"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								downloadText("run-aether.bat", bat);
								playSound.connected();
							},
							className: "flex items-center justify-center gap-2 min-h-11 px-3 rounded-sm border border-cyan text-cyan font-pixel text-[9px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "run-aether.bat"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								downloadText("aether.env", env);
								playSound.connected();
							},
							className: "flex items-center justify-center gap-2 min-h-11 px-3 rounded-sm border border-line text-muted font-pixel text-[9px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "aether.env"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "list-decimal pl-4 space-y-1 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Download the core zip and extract ",
							CORE_BINARY,
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Download run-aether.bat into the same folder (flags match this GUI)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Run the bat as Administrator if you want Wintun system-wide capture." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Otherwise keep proxy-only and set apps to socks5h://",
							core.socksBind,
							"."
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [[
						["cli", "CLI"],
						["bat", "BAT"],
						["env", "ENV"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(id),
						className: `px-3 py-2 min-h-11 rounded-sm border text-[10px] ${tab === id ? "border-cyan text-cyan bg-cyan/10" : "border-line text-muted"}`,
						children: label
					}, id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void copy(),
						className: "ml-auto px-3 py-2 min-h-11 rounded-sm border border-line text-muted flex items-center gap-1",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-soul-green" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copied" : "Copy"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "bg-void border border-line rounded-md p-3 overflow-auto max-h-64 text-[11px] leading-relaxed whitespace-pre-wrap",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4 text-cyan shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Gateway ",
						currentServer.name,
						" · ",
						currentServer.serverAddress,
						":",
						currentServer.port,
						" · TUN",
						" ",
						tunConfig.enabled ? `${tunConfig.adapterName} ${tunConfig.virtualIp}` : "off",
						" · scan ",
						core.scanMode,
						" · noize ",
						core.noize,
						"."
					] })]
				})
			]
		})
	});
}
var ACTION_COLOR = {
	proxy: "text-cyan",
	direct: "text-soul-green",
	block: "text-soul-red"
};
function RoutingRulesModal({ rules: initial, onSaveRules, onClose }) {
	const [rules, setRules] = (0, import_react.useState)([...initial]);
	const [name, setName] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("domain-suffix");
	const [value, setValue] = (0, import_react.useState)("");
	const [action, setAction] = (0, import_react.useState)("proxy");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		title: "SPARE · routing rules",
		accent: "var(--color-magenta)",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { className: "size-4 text-magenta" }),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				className: "px-3 py-2 min-h-11 rounded-sm border border-line text-muted font-pixel text-[9px]",
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					onSaveRules(rules);
					playSound.connected();
					onClose();
				},
				className: "px-4 py-2 min-h-11 rounded-sm bg-magenta text-void font-pixel text-[9px]",
				children: "Save rules"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 text-xs font-mono",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted leading-relaxed",
					children: "Matched by domain, suffix, CIDR, GeoIP, or process. Proxy goes through the Aether tunnel, direct skips it, block drops the packet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5",
					children: rules.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2 p-2.5 rounded-md border border-line bg-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-1",
								checked: r.enabled,
								onChange: () => setRules(rules.map((x) => x.id === r.id ? {
									...x,
									enabled: !x.enabled
								} : x))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-fg truncate",
										children: r.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `uppercase text-[9px] ${ACTION_COLOR[r.action]}`,
										children: r.action
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] text-dim truncate",
									children: [
										r.type,
										" · ",
										r.value
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setRules(rules.filter((x) => x.id !== r.id));
									playSound.cancel();
								},
								className: "p-1 text-muted hover:text-soul-red",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})
						]
					}, r.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border border-line rounded-md bg-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "bg-ink border border-line rounded-sm px-2 py-2 min-h-11",
							placeholder: "Rule name",
							value: name,
							onChange: (e) => setName(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "bg-ink border border-line rounded-sm px-2 py-2 min-h-11",
							value: type,
							onChange: (e) => setType(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "domain",
									children: "domain"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "domain-suffix",
									children: "domain-suffix"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ip-cidr",
									children: "ip-cidr"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "geoip",
									children: "geoip"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "process",
									children: "process"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "sm:col-span-2 bg-ink border border-line rounded-sm px-2 py-2 min-h-11",
							placeholder: "google.com, 10.0.0.0/8",
							value,
							onChange: (e) => setValue(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "bg-ink border border-line rounded-sm px-2 py-2 min-h-11",
							value: action,
							onChange: (e) => setAction(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "proxy",
									children: "proxy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "direct",
									children: "direct"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "block",
									children: "block"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "min-h-11 rounded-sm bg-magenta/20 border border-magenta text-magenta flex items-center justify-center gap-1",
							onClick: () => {
								if (!value.trim()) return;
								setRules([...rules, {
									id: `rule-${Date.now()}`,
									name: name.trim() || `Rule ${value.split(",")[0]}`,
									type,
									value: value.trim(),
									action,
									enabled: true
								}]);
								setName("");
								setValue("");
								playSound.select();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add"]
						})
					]
				})
			]
		})
	});
}
function ServerListModal({ servers, selectedServer, onSelectServer, onServersChange, onToggleFavorite, onClose }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [proto, setProto] = (0, import_react.useState)("ALL");
	const [pinging, setPinging] = (0, import_react.useState)(false);
	const [showAdd, setShowAdd] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [host, setHost] = (0, import_react.useState)("");
	const [port, setPort] = (0, import_react.useState)(443);
	const [customProto, setCustomProto] = (0, import_react.useState)("masque");
	const filtered = (0, import_react.useMemo)(() => {
		return servers.filter((s) => {
			const hay = `${s.name} ${s.city} ${s.country} ${s.serverAddress} ${s.darkWorldZone}`.toLowerCase();
			if (q && !hay.includes(q.toLowerCase())) return false;
			if (proto !== "ALL" && s.protocol !== proto) return false;
			return true;
		}).sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite) || a.ping - b.ping);
	}, [
		servers,
		q,
		proto
	]);
	const pingAll = () => {
		setPinging(true);
		playSound.cursor();
		window.setTimeout(() => {
			onServersChange(servers.map((s) => ({
				...s,
				ping: Math.max(14, s.ping + Math.floor(Math.random() * 12) - 5),
				load: Math.max(6, Math.min(92, s.load + Math.floor(Math.random() * 8) - 3)),
				lastScanStatus: Math.random() > .1 ? "ok" : "fail"
			})));
			setPinging(false);
			playSound.select();
		}, 700);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		title: "GATEWAYS · discovered peers",
		accent: "var(--color-cyan)",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-4 text-cyan" }),
		onClose,
		wide: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 text-xs font-mono",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "flex-1 bg-panel border border-line rounded-sm px-3 py-2 min-h-11",
							placeholder: "Search zone, city, IP...",
							value: q,
							onChange: (e) => setQ(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
							value: proto,
							onChange: (e) => setProto(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All protocols"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "masque",
									children: "MASQUE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "wg",
									children: "WireGuard"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "gool",
									children: "Nested WG"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: pingAll,
							className: "px-3 min-h-11 rounded-sm border border-line text-cyan flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${pinging ? "animate-spin" : ""}` }), "Ping"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setShowAdd((v) => !v),
							className: "px-3 min-h-11 rounded-sm border border-line text-fg flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Custom"]
						})
					]
				}),
				showAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border border-line rounded-md bg-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "bg-ink border border-line rounded-sm px-2 py-2 min-h-11",
							placeholder: "Name",
							value: name,
							onChange: (e) => setName(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "bg-ink border border-line rounded-sm px-2 py-2 min-h-11",
							placeholder: "162.159.192.1",
							value: host,
							onChange: (e) => setHost(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "bg-ink border border-line rounded-sm px-2 py-2 min-h-11",
							value: port,
							onChange: (e) => setPort(Number(e.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "bg-ink border border-line rounded-sm px-2 py-2 min-h-11",
							value: customProto,
							onChange: (e) => setCustomProto(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "masque",
									children: "masque"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "wg",
									children: "wg"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "gool",
									children: "gool"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "sm:col-span-2 min-h-11 rounded-sm bg-cyan text-void font-pixel text-[9px]",
							onClick: () => {
								if (!host.trim()) return;
								const node = {
									id: `custom-${Date.now()}`,
									name: name.trim() || host.trim(),
									darkWorldZone: "Custom",
									country: "Custom",
									city: "Manual peer",
									iso: "XX",
									ping: 40,
									protocol: customProto,
									serverAddress: host.trim(),
									port,
									load: 10,
									features: ["Manual peer"],
									exitIp: host.trim(),
									isFavorite: true
								};
								onServersChange([...servers, node]);
								setShowAdd(false);
								setName("");
								setHost("");
								playSound.select();
							},
							children: "Add peer"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5",
					children: filtered.map((s) => {
						const selected = s.id === selectedServer.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-2 p-2.5 rounded-md border ${selected ? "border-cyan bg-cyan/10" : "border-line bg-panel hover:border-line-strong"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onToggleFavorite(s.id),
									className: "p-1 text-dim hover:text-soul-yellow",
									"aria-label": "Favorite",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-4 ${s.isFavorite ? "fill-soul-yellow text-soul-yellow" : ""}` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsoBadge, { iso: s.iso }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex-1 text-left min-w-0",
									onClick: () => {
										onSelectServer(s);
										playSound.select();
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[12px] font-medium text-fg truncate",
												children: s.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "tabular-nums text-soul-green shrink-0",
												children: [s.ping, "ms"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-muted truncate",
											children: [
												s.darkWorldZone,
												" · ",
												s.city,
												" · ",
												s.serverAddress,
												":",
												s.port
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-1 mt-1 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-1.5 py-0.5 rounded-sm bg-ink border border-line text-[9px] text-cyan",
													children: protocolLabel(s.protocol)
												}),
												s.lastScanStatus && s.lastScanStatus !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `px-1.5 py-0.5 rounded-sm border text-[9px] ${s.lastScanStatus === "ok" ? "text-soul-green border-soul-green/40" : s.lastScanStatus === "fail" ? "text-soul-red border-soul-red/40" : "text-soul-yellow border-soul-yellow/40"}`,
													children: s.lastScanStatus
												}),
												s.features.slice(0, 2).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-1.5 py-0.5 rounded-sm bg-ink border border-line text-[9px] text-dim",
													children: f
												}, f))
											]
										})
									]
								})
							]
						}, s.id);
					})
				})
			]
		})
	});
}
var SOULS = [
	"RED",
	"CYAN",
	"YELLOW",
	"GREEN"
];
function TitleBar({ connectionState, soulColor, onSoulColorChange, onMinimize, onMaximize, onClose, showTraySim, onToggleTraySim, onOpenQuickSetup, soundOn, onToggleSound }) {
	const connected = connectionState === "CONNECTED";
	const idle = connectionState === "DISCONNECTED" || connectionState === "ERROR";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "h-10 bg-ink border-b border-line flex items-center justify-between px-3 select-none z-50 text-xs shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2.5 min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "relative shrink-0",
					onClick: () => {
						const next = SOULS[(SOULS.indexOf(soulColor) + 1) % SOULS.length];
						onSoulColorChange(next);
						playSound.cursor();
					},
					title: "Cycle SOUL power",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 24 24",
						fill: soulHex(soulColor),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-pixel text-[10px] text-cyan tracking-wider uppercase",
							children: "Aether"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-dim font-mono",
							children: ["v", CORE_VERSION]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline-block px-1.5 py-0.5 rounded-sm bg-panel border border-line-strong text-[9px] font-mono text-muted",
							children: "Aether core"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 ml-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `size-2 rounded-full ${connected ? "bg-soul-green" : idle ? "bg-dim" : "bg-soul-yellow animate-pulse"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-mono uppercase tracking-wider text-muted truncate",
						children: stateLabel(connectionState)
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:flex items-center gap-1 px-2 py-0.5 bg-panel border border-line-strong rounded-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] font-mono text-muted",
						children: "SOUL"
					}), SOULS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							onSoulColorChange(c);
							playSound.select();
						},
						className: `size-2.5 rounded-full transition-transform ${soulColor === c ? "scale-125 ring-1 ring-white" : "opacity-40 hover:opacity-100"}`,
						style: { backgroundColor: soulHex(c) },
						title: `SOUL ${c}`
					}, c))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						onOpenQuickSetup();
						playSound.select();
					},
					className: "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-mono bg-cyan/10 border border-cyan/50 text-cyan hover:text-fg hover:border-cyan",
					title: "Export Aether core launcher",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "Windows core"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						onToggleTraySim();
						playSound.cursor();
					},
					className: `flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-mono border ${showTraySim ? "bg-cyan/15 text-cyan border-cyan/50" : "bg-panel text-muted hover:text-fg border-line-strong"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden lg:inline",
						children: "Tray"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onToggleSound,
					className: "p-1 rounded-sm text-muted hover:text-cyan hover:bg-panel",
					title: soundOn ? "Mute" : "Unmute",
					children: soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-3.5 text-soul-red" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center ml-1 border-l border-line pl-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								onMinimize();
								playSound.cursor();
							},
							className: "size-7 flex items-center justify-center text-muted hover:bg-panel hover:text-fg",
							title: "Minimize",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								onMaximize();
								playSound.cursor();
							},
							className: "size-7 flex items-center justify-center text-muted hover:bg-panel hover:text-fg",
							title: "Maximize",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-2.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								onClose();
								playSound.cancel();
							},
							className: "size-7 flex items-center justify-center text-muted hover:bg-soul-red hover:text-white",
							title: "Close to tray",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						})
					]
				})
			]
		})]
	});
}
function Toggle({ on, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => onChange(!on),
		className: `w-10 h-6 rounded-full border transition-colors ${on ? "bg-cyan/30 border-cyan" : "bg-surface border-line-strong"}`,
		"aria-pressed": on,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block size-4 rounded-full mx-1 transition-transform ${on ? "translate-x-4 bg-cyan" : "bg-muted"}` })
	});
}
function TunSettingsModal({ config, onSave, onClose }) {
	const [form, setForm] = (0, import_react.useState)({
		...config,
		splitTunneling: {
			...config.splitTunneling,
			apps: [...config.splitTunneling.apps]
		}
	});
	const [appName, setAppName] = (0, import_react.useState)("");
	const [appPath, setAppPath] = (0, import_react.useState)("");
	const set = (patch) => setForm((f) => ({
		...f,
		...patch
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		title: "ACT · Wintun / TUN adapter",
		accent: "var(--color-cyan)",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4 text-cyan" }),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				className: "px-3 py-2 min-h-11 rounded-sm border border-line text-muted font-pixel text-[9px]",
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					onSave(form);
					playSound.tunEngage();
					onClose();
				},
				className: "px-4 py-2 min-h-11 rounded-sm bg-cyan text-void font-pixel text-[9px]",
				children: "Save TUN"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 text-xs font-mono text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted leading-relaxed",
					children: "System-wide capture uses Wintun (Layer-3). Leave it on for a full VPN. Off keeps Aether as a local SOCKS5 proxy at 127.0.0.1:1819."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enable TUN adapter" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: form.enabled,
						onChange: (enabled) => set({ enabled })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "Driver"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11 text-fg",
								value: form.driver,
								onChange: (e) => set({ driver: e.target.value }),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "wintun",
										children: "wintun"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "wireguard-nt",
										children: "wireguard-nt"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "tap-windows6",
										children: "tap-windows6"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "Adapter name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: form.adapterName,
								onChange: (e) => set({ adapterName: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "Virtual IP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: form.virtualIp,
								onChange: (e) => set({ virtualIp: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "Gateway"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: form.gateway,
								onChange: (e) => set({ gateway: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "MTU"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: form.mtu,
								onChange: (e) => set({ mtu: Number(e.target.value) })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-dim",
								children: "DNS (comma)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
								value: form.dnsServers.join(", "),
								onChange: (e) => set({ dnsServers: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
					children: [
						["strictRouting", "Strict routing"],
						["ipv6Routing", "IPv6 routing"],
						["fakeDns", "Fake-IP DNS"],
						["bypassLan", "Bypass LAN"],
						["killSwitch", "Kill switch"]
					].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 bg-panel border border-line rounded-sm px-3 py-2 min-h-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							on: Boolean(form[key]),
							onChange: (v) => set({ [key]: v })
						})]
					}, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line rounded-md p-3 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-pixel text-[9px] text-cyan",
								children: "Split tunnel apps"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: form.splitTunneling.enabled,
								onChange: (enabled) => setForm((f) => ({
									...f,
									splitTunneling: {
										...f.splitTunneling,
										enabled
									}
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `px-2 py-1 rounded-sm border text-[10px] ${form.splitTunneling.mode === "exclude" ? "border-cyan text-cyan" : "border-line text-muted"}`,
								onClick: () => setForm((f) => ({
									...f,
									splitTunneling: {
										...f.splitTunneling,
										mode: "exclude"
									}
								})),
								children: "Exclude"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `px-2 py-1 rounded-sm border text-[10px] ${form.splitTunneling.mode === "include" ? "border-cyan text-cyan" : "border-line text-muted"}`,
								onClick: () => setForm((f) => ({
									...f,
									splitTunneling: {
										...f.splitTunneling,
										mode: "include"
									}
								})),
								children: "Include"
							})]
						}),
						form.splitTunneling.apps.map((app, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 bg-surface border border-line rounded-sm px-2 py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: app.enabled,
									onChange: () => {
										const apps = [...form.splitTunneling.apps];
										apps[idx] = {
											...apps[idx],
											enabled: !apps[idx].enabled
										};
										setForm((f) => ({
											...f,
											splitTunneling: {
												...f.splitTunneling,
												apps
											}
										}));
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] truncate",
										children: app.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[9px] text-dim truncate",
										children: app.path
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										const apps = form.splitTunneling.apps.filter((_, i) => i !== idx);
										setForm((f) => ({
											...f,
											splitTunneling: {
												...f.splitTunneling,
												apps
											}
										}));
										playSound.cancel();
									},
									className: "p-1 text-muted hover:text-soul-red",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})
							]
						}, `${app.path}-${idx}`)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "App.exe",
									className: "flex-1 bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
									value: appName,
									onChange: (e) => setAppName(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "C:\\\\Path\\\\app.exe",
									className: "flex-[2] bg-panel border border-line rounded-sm px-2 py-2 min-h-11",
									value: appPath,
									onChange: (e) => setAppPath(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										if (!appName.trim()) return;
										setForm((f) => ({
											...f,
											splitTunneling: {
												...f.splitTunneling,
												apps: [...f.splitTunneling.apps, {
													name: appName.trim(),
													path: appPath.trim() || `C:\\Program Files\\${appName}\\${appName}`,
													enabled: true
												}]
											}
										}));
										setAppName("");
										setAppPath("");
										playSound.select();
									},
									className: "px-3 min-h-11 rounded-sm bg-panel border border-line text-cyan",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						})
					]
				})
			]
		})
	});
}
function WindowsTraySim({ currentServer, connectionState, soulColor, traffic, onToggleConnect, onRestoreWindow, onClose }) {
	const connected = connectionState === "CONNECTED";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-3 right-3 z-50 w-72 bg-ink border-2 border-line-strong rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.75)] overflow-hidden font-mono text-xs select-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 py-2 bg-panel border-b border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `size-2 rounded-full ${connected ? "bg-soul-green" : "bg-dim"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-pixel text-[8px] text-cyan",
					children: "Aether tray"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						onRestoreWindow();
						playSound.select();
					},
					className: "p-1.5 hover:bg-surface rounded-sm text-muted hover:text-fg min-h-9 min-w-9 flex items-center justify-center",
					title: "Restore",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						onClose();
						playSound.cancel();
					},
					className: "p-1.5 hover:bg-surface rounded-sm text-muted hover:text-fg min-h-9 min-w-9 flex items-center justify-center",
					title: "Hide",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3 space-y-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsoBadge, { iso: currentServer.iso }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-fg",
								children: currentServer.city
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-dim",
								children: stateLabel(connectionState)
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 24 24",
						fill: soulHex(soulColor),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-cyan",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatSpeed(traffic.downloadSpeed)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-magenta",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatSpeed(traffic.uploadSpeed)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						onToggleConnect();
						playSound.select();
					},
					className: `w-full min-h-11 rounded-sm font-pixel text-[9px] flex items-center justify-center gap-2 ${connected ? "bg-soul-red/20 border border-soul-red text-soul-red" : "bg-cyan text-void"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "size-3.5" }), connected ? "DISCONNECT" : "FIGHT"]
				})
			]
		})]
	});
}
function AetherClient() {
	const store = useVpnStore();
	const current = currentServerOf(store);
	(0, import_react.useEffect)(() => {
		useVpnStore.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		setSoundEnabled(store.soundEnabled);
	}, [store.soundEnabled]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-screen h-[100dvh] bg-void text-fg flex items-center justify-center p-0 md:p-3 overflow-hidden",
		children: [
			store.isMinimized && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center p-6 bg-ink border border-line rounded-xl space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-pixel text-[10px] text-cyan",
						children: "Aether is in the tray"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-mono text-muted",
						children: "Restore the window or use the tray popup."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							store.setMinimized(false);
							playSound.select();
						},
						className: "px-4 py-2 min-h-11 bg-cyan text-void font-pixel text-[10px] rounded-sm",
						children: "RESTORE"
					})
				]
			}),
			!store.isMinimized && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `bg-card border-2 border-line flex flex-col overflow-hidden ${store.isMaximized ? "w-full h-full rounded-none" : "w-full max-w-5xl h-full md:h-[94vh] rounded-xl"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
						connectionState: store.connectionState,
						soulColor: store.soulColor,
						onSoulColorChange: store.setSoulColor,
						onMinimize: () => store.setMinimized(true),
						onMaximize: () => store.setMaximized(!store.isMaximized),
						onClose: () => store.setMinimized(true),
						showTraySim: store.showTray,
						onToggleTraySim: () => store.setShowTray(!store.showTray),
						onOpenQuickSetup: () => store.setActiveTab("QUICK_SETUP"),
						soundOn: store.soundEnabled,
						onToggleSound: () => store.setSoundEnabled(!store.soundEnabled)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 flex flex-col overflow-hidden relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainDashboard, {
							currentServer: current,
							connectionState: store.connectionState,
							soulColor: store.soulColor,
							traffic: store.traffic,
							tunConfig: store.tunConfig,
							dpiConfig: store.dpiConfig,
							core: store.core,
							publicIp: store.publicIp,
							exitIp: store.exitIp,
							onToggleConnect: store.toggleConnect,
							onOpenServers: () => store.setActiveTab("SERVERS"),
							onOpenTun: () => store.setActiveTab("TUN_SETTINGS"),
							onOpenDpi: () => store.setActiveTab("DPI_SETTINGS"),
							onOpenQuickSetup: () => store.setActiveTab("QUICK_SETUP"),
							onCorePatch: store.setCore
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BattleMenuBar, {
						activeTab: store.activeTab,
						onSelectTab: store.setActiveTab,
						connectionState: store.connectionState,
						onToggleConnect: store.toggleConnect,
						soulColor: store.soulColor
					})
				]
			}),
			store.activeTab === "TUN_SETTINGS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunSettingsModal, {
				config: store.tunConfig,
				onSave: (cfg) => {
					store.setTunConfig(cfg);
					store.addLog({
						id: `tun-${Date.now()}`,
						timestamp: (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] + ".000",
						level: "TUN",
						tag: "WINTUN",
						message: `Adapter=${cfg.adapterName} ip=${cfg.virtualIp} mtu=${cfg.mtu} kill=${cfg.killSwitch}`
					});
				},
				onClose: () => store.setActiveTab("DASHBOARD")
			}),
			store.activeTab === "DPI_SETTINGS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DpiSettingsModal, {
				config: store.dpiConfig,
				core: store.core,
				onSave: (cfg, patch) => {
					store.setDpiConfig(cfg);
					store.setCore(patch);
					store.addLog({
						id: `dpi-${Date.now()}`,
						timestamp: (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] + ".000",
						level: "DPI",
						tag: "EVASION",
						message: `frag=[${cfg.fragMin},${cfg.fragMax}] http=${cfg.masqueHttp} noize=${patch.noize ?? store.core.noize}`
					});
				},
				onClose: () => store.setActiveTab("DASHBOARD")
			}),
			store.activeTab === "SERVERS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerListModal, {
				servers: store.servers,
				selectedServer: current,
				onSelectServer: store.selectServer,
				onServersChange: store.setServers,
				onToggleFavorite: store.toggleFavorite,
				onClose: () => store.setActiveTab("DASHBOARD")
			}),
			store.activeTab === "ROUTING" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutingRulesModal, {
				rules: store.routingRules,
				onSaveRules: (rls) => {
					store.setRoutingRules(rls);
					store.addLog({
						id: `rt-${Date.now()}`,
						timestamp: (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] + ".000",
						level: "INFO",
						tag: "ROUTING",
						message: `Routing table updated (${rls.length} rules).`
					});
				},
				onClose: () => store.setActiveTab("DASHBOARD")
			}),
			store.activeTab === "LOGS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiagnosticsLogModal, {
				logs: store.logs,
				onClearLogs: store.clearLogs,
				onClose: () => store.setActiveTab("DASHBOARD")
			}),
			store.activeTab === "QUICK_SETUP" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickSetupModal, {
				currentServer: current,
				tunConfig: store.tunConfig,
				dpiConfig: store.dpiConfig,
				core: store.core,
				onClose: () => store.setActiveTab("DASHBOARD")
			}),
			store.showTray && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowsTraySim, {
					currentServer: current,
					connectionState: store.connectionState,
					soulColor: store.soulColor,
					traffic: store.traffic,
					onToggleConnect: store.toggleConnect,
					onRestoreWindow: () => store.setMinimized(false),
					onClose: () => store.setShowTray(false)
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherClient, {});
}
//#endregion
export { Home as component };
