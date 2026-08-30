import { useMemo, useState } from "react";
import { Globe2, Plus, RefreshCw, Star } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import { protocolLabel } from "@/lib/vpn/format";
import type { AetherProtocol, ServerNode } from "@/lib/vpn/types";
import { IsoBadge } from "./IsoBadge";
import { ModalShell } from "./ModalShell";

interface Props {
  servers: ServerNode[];
  selectedServer: ServerNode;
  onSelectServer: (server: ServerNode) => void;
  onServersChange: (servers: ServerNode[]) => void;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export function ServerListModal({
  servers,
  selectedServer,
  onSelectServer,
  onServersChange,
  onToggleFavorite,
  onClose,
}: Props) {
  const [q, setQ] = useState("");
  const [proto, setProto] = useState<string>("ALL");
  const [pinging, setPinging] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState(443);
  const [customProto, setCustomProto] = useState<AetherProtocol>("masque");

  const filtered = useMemo(() => {
    return servers
      .filter((s) => {
        const hay = `${s.name} ${s.city} ${s.country} ${s.serverAddress} ${s.darkWorldZone}`.toLowerCase();
        if (q && !hay.includes(q.toLowerCase())) return false;
        if (proto !== "ALL" && s.protocol !== proto) return false;
        return true;
      })
      .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite) || a.ping - b.ping);
  }, [servers, q, proto]);

  const pingAll = () => {
    setPinging(true);
    playSound.cursor();
    window.setTimeout(() => {
      onServersChange(
        servers.map((s) => ({
          ...s,
          ping: Math.max(14, s.ping + Math.floor(Math.random() * 12) - 5),
          load: Math.max(6, Math.min(92, s.load + Math.floor(Math.random() * 8) - 3)),
          lastScanStatus: Math.random() > 0.1 ? "ok" : "fail",
        })),
      );
      setPinging(false);
      playSound.select();
    }, 700);
  };

  return (
    <ModalShell
      title="GATEWAYS · discovered peers"
      accent="var(--color-cyan)"
      icon={<Globe2 className="size-4 text-cyan" />}
      onClose={onClose}
      wide
    >
      <div className="space-y-3 text-xs font-mono">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="flex-1 bg-panel border border-line rounded-sm px-3 py-2 min-h-11"
            placeholder="Search zone, city, IP..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
            value={proto}
            onChange={(e) => setProto(e.target.value)}
          >
            <option value="ALL">All protocols</option>
            <option value="masque">MASQUE</option>
            <option value="wg">WireGuard</option>
            <option value="gool">Nested WG</option>
          </select>
          <button
            type="button"
            onClick={pingAll}
            className="px-3 min-h-11 rounded-sm border border-line text-cyan flex items-center gap-1.5"
          >
            <RefreshCw className={`size-3.5 ${pinging ? "animate-spin" : ""}`} />
            Ping
          </button>
          <button
            type="button"
            onClick={() => setShowAdd((v) => !v)}
            className="px-3 min-h-11 rounded-sm border border-line text-fg flex items-center gap-1.5"
          >
            <Plus className="size-3.5" />
            Custom
          </button>
        </div>

        {showAdd && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border border-line rounded-md bg-panel">
            <input
              className="bg-ink border border-line rounded-sm px-2 py-2 min-h-11"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="bg-ink border border-line rounded-sm px-2 py-2 min-h-11"
              placeholder="162.159.192.1"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
            <input
              type="number"
              className="bg-ink border border-line rounded-sm px-2 py-2 min-h-11"
              value={port}
              onChange={(e) => setPort(Number(e.target.value))}
            />
            <select
              className="bg-ink border border-line rounded-sm px-2 py-2 min-h-11"
              value={customProto}
              onChange={(e) => setCustomProto(e.target.value as AetherProtocol)}
            >
              <option value="masque">masque</option>
              <option value="wg">wg</option>
              <option value="gool">gool</option>
            </select>
            <button
              type="button"
              className="sm:col-span-2 min-h-11 rounded-sm bg-cyan text-void font-pixel text-[9px]"
              onClick={() => {
                if (!host.trim()) return;
                const node: ServerNode = {
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
                  isFavorite: true,
                };
                onServersChange([...servers, node]);
                setShowAdd(false);
                setName("");
                setHost("");
                playSound.select();
              }}
            >
              Add peer
            </button>
          </div>
        )}

        <div className="space-y-1.5">
          {filtered.map((s) => {
            const selected = s.id === selectedServer.id;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-2 p-2.5 rounded-md border ${
                  selected ? "border-cyan bg-cyan/10" : "border-line bg-panel hover:border-line-strong"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onToggleFavorite(s.id)}
                  className="p-1 text-dim hover:text-soul-yellow"
                  aria-label="Favorite"
                >
                  <Star className={`size-4 ${s.isFavorite ? "fill-soul-yellow text-soul-yellow" : ""}`} />
                </button>
                <IsoBadge iso={s.iso} />
                <button
                  type="button"
                  className="flex-1 text-left min-w-0"
                  onClick={() => {
                    onSelectServer(s);
                    playSound.select();
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-medium text-fg truncate">{s.name}</span>
                    <span className="tabular-nums text-soul-green shrink-0">{s.ping}ms</span>
                  </div>
                  <div className="text-[10px] text-muted truncate">
                    {s.darkWorldZone} · {s.city} · {s.serverAddress}:{s.port}
                  </div>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded-sm bg-ink border border-line text-[9px] text-cyan">
                      {protocolLabel(s.protocol)}
                    </span>
                    {s.lastScanStatus && s.lastScanStatus !== "idle" && (
                      <span
                        className={`px-1.5 py-0.5 rounded-sm border text-[9px] ${
                          s.lastScanStatus === "ok"
                            ? "text-soul-green border-soul-green/40"
                            : s.lastScanStatus === "fail"
                              ? "text-soul-red border-soul-red/40"
                              : "text-soul-yellow border-soul-yellow/40"
                        }`}
                      >
                        {s.lastScanStatus}
                      </span>
                    )}
                    {s.features.slice(0, 2).map((f) => (
                      <span key={f} className="px-1.5 py-0.5 rounded-sm bg-ink border border-line text-[9px] text-dim">
                        {f}
                      </span>
                    ))}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
}
