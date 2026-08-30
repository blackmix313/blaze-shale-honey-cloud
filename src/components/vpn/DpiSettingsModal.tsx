import { useState } from "react";
import { ShieldAlert, Shuffle, Sparkles } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import { noizeForProtocol } from "@/lib/vpn/cli";
import type { CoreConfig, DpiEvasionConfig } from "@/lib/vpn/types";
import { ModalShell } from "./ModalShell";

interface Props {
  config: DpiEvasionConfig;
  core: CoreConfig;
  onSave: (config: DpiEvasionConfig, corePatch: Partial<CoreConfig>) => void;
  onClose: () => void;
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`w-10 h-6 rounded-full border ${on ? "bg-soul-yellow/20 border-soul-yellow" : "bg-surface border-line-strong"}`}
      aria-pressed={on}
    >
      <span className={`block size-4 rounded-full mx-1 ${on ? "translate-x-4 bg-soul-yellow" : "bg-muted"}`} />
    </button>
  );
}

export function DpiSettingsModal({ config, core, onSave, onClose }: Props) {
  const [form, setForm] = useState(config);
  const [noize, setNoize] = useState(noizeForProtocol(core.protocol, core.noize));
  const [ipVersion, setIpVersion] = useState(core.ipVersion);
  const [quick, setQuick] = useState(core.quickReconnect);
  const [socks, setSocks] = useState(core.socksBind);
  const [peer, setPeer] = useState(core.peerOverride);

  const masqueNoize = ["firewall", "gfw", "off"] as const;
  const wgNoize = ["balanced", "aggressive", "light", "off"] as const;
  const options = core.protocol === "masque" ? masqueNoize : wgNoize;

  return (
    <ModalShell
      title="ITEM · DPI evasion & protocol"
      accent="var(--color-soul-yellow)"
      icon={<Sparkles className="size-4 text-soul-yellow" />}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 min-h-11 rounded-sm border border-line text-muted font-pixel text-[9px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(form, {
                noize,
                ipVersion,
                quickReconnect: quick,
                socksBind: socks,
                peerOverride: peer,
              });
              playSound.dpiFragment();
              onClose();
            }}
            className="px-4 py-2 min-h-11 rounded-sm bg-soul-yellow text-void font-pixel text-[9px]"
          >
            Apply
          </button>
        </div>
      }
    >
      <div className="space-y-4 text-xs font-mono text-fg">
        <div className="p-3 bg-panel border border-soul-yellow/30 rounded-md flex gap-2">
          <ShieldAlert className="size-4 text-soul-yellow shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted leading-relaxed">
            Aether hides the handshake with noize, then (on MASQUE h2) can fragment the TLS ClientHello so DPI never
            sees a complete SNI. Gateways are trusted only after a real data-plane probe.
          </p>
        </div>

        <div>
          <div className="text-dim mb-1">Noize profile ({core.protocol})</div>
          <div className="flex flex-wrap gap-1">
            {options.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNoize(n)}
                className={`px-3 py-2 min-h-11 rounded-sm border text-[10px] ${
                  noize === n ? "border-soul-yellow text-soul-yellow bg-soul-yellow/10" : "border-line text-muted"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-dim">MASQUE HTTP</span>
            <select
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.masqueHttp}
              onChange={(e) => setForm({ ...form, masqueHttp: e.target.value as DpiEvasionConfig["masqueHttp"] })}
            >
              <option value="h3">h3 · HTTP/3 QUIC (default)</option>
              <option value="h2">h2 · HTTP/2 TCP (UDP blocked)</option>
            </select>
          </label>
          <label className="block">
            <span className="text-dim">Congestion</span>
            <select
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.congestionControl}
              onChange={(e) =>
                setForm({ ...form, congestionControl: e.target.value as DpiEvasionConfig["congestionControl"] })
              }
            >
              <option value="BBRv3">BBRv3</option>
              <option value="BBR">BBR</option>
              <option value="CUBIC">CUBIC</option>
            </select>
          </label>
          <label className="block">
            <span className="text-dim">IP scan</span>
            <select
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={ipVersion}
              onChange={(e) => setIpVersion(e.target.value as CoreConfig["ipVersion"])}
            >
              <option value="v4">IPv4 only (-4)</option>
              <option value="v6">IPv6 only (-6)</option>
              <option value="dual">Dual stack</option>
            </select>
          </label>
          <label className="block">
            <span className="text-dim">SOCKS5 bind</span>
            <input
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={socks}
              onChange={(e) => setSocks(e.target.value)}
            />
          </label>
        </div>

        <label className="flex items-center justify-between bg-panel border border-line rounded-sm px-3 py-2 min-h-11">
          <span>TLS ClientHello fragmentation (h2 only)</span>
          <Toggle
            on={form.tlsFragmentation}
            onChange={(tlsFragmentation) => setForm({ ...form, tlsFragmentation })}
          />
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <label>
            <span className="text-dim">Frag min B</span>
            <input
              type="number"
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.fragMin}
              onChange={(e) => setForm({ ...form, fragMin: Number(e.target.value) })}
            />
          </label>
          <label>
            <span className="text-dim">Frag max B</span>
            <input
              type="number"
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.fragMax}
              onChange={(e) => setForm({ ...form, fragMax: Number(e.target.value) })}
            />
          </label>
          <label>
            <span className="text-dim">Delay min ms</span>
            <input
              type="number"
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.fragDelayMin}
              onChange={(e) => setForm({ ...form, fragDelayMin: Number(e.target.value) })}
            />
          </label>
          <label>
            <span className="text-dim">Delay max ms</span>
            <input
              type="number"
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.fragDelayMax}
              onChange={(e) => setForm({ ...form, fragDelayMax: Number(e.target.value) })}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(
            [
              ["noisePadding", "Noise padding"],
              ["zeroRtt", "Zero-RTT"],
              ["udpGso", "UDP GSO"],
              ["dataPlaneCheck", "Data-plane validation"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between bg-panel border border-line rounded-sm px-3 py-2 min-h-11">
              <span>{label}</span>
              <Toggle on={Boolean(form[key])} onChange={(v) => setForm({ ...form, [key]: v })} />
            </label>
          ))}
          <label className="flex items-center justify-between bg-panel border border-line rounded-sm px-3 py-2 min-h-11">
            <span>Quick reconnect</span>
            <Toggle on={quick} onChange={setQuick} />
          </label>
        </div>

        <label className="block">
          <span className="text-dim">Force peer (skip scan) — ip:port</span>
          <input
            className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
            placeholder="162.159.192.1:443"
            value={peer}
            onChange={(e) => setPeer(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-dim">Obfuscation seed</span>
          <div className="flex gap-2 mt-1">
            <input
              className="flex-1 bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.obfuscationSeed}
              onChange={(e) => setForm({ ...form, obfuscationSeed: e.target.value })}
            />
            <button
              type="button"
              onClick={() => {
                const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
                let res = "AETHER_";
                for (let i = 0; i < 16; i++) res += chars[Math.floor(Math.random() * chars.length)];
                setForm({ ...form, obfuscationSeed: res });
                playSound.select();
              }}
              className="px-3 min-h-11 rounded-sm border border-line text-soul-yellow"
            >
              <Shuffle className="size-4" />
            </button>
          </div>
        </label>
      </div>
    </ModalShell>
  );
}
