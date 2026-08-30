import { useState } from "react";
import { Layers, Plus, Trash2 } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import type { TunConfig } from "@/lib/vpn/types";
import { ModalShell } from "./ModalShell";

interface Props {
  config: TunConfig;
  onSave: (config: TunConfig) => void;
  onClose: () => void;
}

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`w-10 h-6 rounded-full border transition-colors ${
        on ? "bg-cyan/30 border-cyan" : "bg-surface border-line-strong"
      }`}
      aria-pressed={on}
    >
      <span
        className={`block size-4 rounded-full mx-1 transition-transform ${
          on ? "translate-x-4 bg-cyan" : "bg-muted"
        }`}
      />
    </button>
  );
}

export function TunSettingsModal({ config, onSave, onClose }: Props) {
  const [form, setForm] = useState<TunConfig>({ ...config, splitTunneling: { ...config.splitTunneling, apps: [...config.splitTunneling.apps] } });
  const [appName, setAppName] = useState("");
  const [appPath, setAppPath] = useState("");

  const set = (patch: Partial<TunConfig>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <ModalShell
      title="ACT · Wintun / TUN adapter"
      accent="var(--color-cyan)"
      icon={<Layers className="size-4 text-cyan" />}
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
              onSave(form);
              playSound.tunEngage();
              onClose();
            }}
            className="px-4 py-2 min-h-11 rounded-sm bg-cyan text-void font-pixel text-[9px]"
          >
            Save TUN
          </button>
        </div>
      }
    >
      <div className="space-y-4 text-xs font-mono text-fg">
        <p className="text-muted leading-relaxed">
          System-wide capture uses Wintun (Layer-3). Leave it on for a full VPN. Off keeps Aether as a local SOCKS5
          proxy at 127.0.0.1:1819.
        </p>
        <label className="flex items-center justify-between gap-3">
          <span>Enable TUN adapter</span>
          <Toggle on={form.enabled} onChange={(enabled) => set({ enabled })} />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-dim">Driver</span>
            <select
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11 text-fg"
              value={form.driver}
              onChange={(e) => set({ driver: e.target.value as TunConfig["driver"] })}
            >
              <option value="wintun">wintun</option>
              <option value="wireguard-nt">wireguard-nt</option>
              <option value="tap-windows6">tap-windows6</option>
            </select>
          </label>
          <label className="block">
            <span className="text-dim">Adapter name</span>
            <input
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.adapterName}
              onChange={(e) => set({ adapterName: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-dim">Virtual IP</span>
            <input
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.virtualIp}
              onChange={(e) => set({ virtualIp: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-dim">Gateway</span>
            <input
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.gateway}
              onChange={(e) => set({ gateway: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-dim">MTU</span>
            <input
              type="number"
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.mtu}
              onChange={(e) => set({ mtu: Number(e.target.value) })}
            />
          </label>
          <label className="block">
            <span className="text-dim">DNS (comma)</span>
            <input
              className="mt-1 w-full bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={form.dnsServers.join(", ")}
              onChange={(e) =>
                set({
                  dnsServers: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(
            [
              ["strictRouting", "Strict routing"],
              ["ipv6Routing", "IPv6 routing"],
              ["fakeDns", "Fake-IP DNS"],
              ["bypassLan", "Bypass LAN"],
              ["killSwitch", "Kill switch"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between gap-3 bg-panel border border-line rounded-sm px-3 py-2 min-h-11">
              <span>{label}</span>
              <Toggle on={Boolean(form[key])} onChange={(v) => set({ [key]: v })} />
            </label>
          ))}
        </div>
        <div className="border border-line rounded-md p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[9px] text-cyan">Split tunnel apps</span>
            <Toggle
              on={form.splitTunneling.enabled}
              onChange={(enabled) =>
                setForm((f) => ({ ...f, splitTunneling: { ...f.splitTunneling, enabled } }))
              }
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className={`px-2 py-1 rounded-sm border text-[10px] ${
                form.splitTunneling.mode === "exclude" ? "border-cyan text-cyan" : "border-line text-muted"
              }`}
              onClick={() =>
                setForm((f) => ({ ...f, splitTunneling: { ...f.splitTunneling, mode: "exclude" } }))
              }
            >
              Exclude
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded-sm border text-[10px] ${
                form.splitTunneling.mode === "include" ? "border-cyan text-cyan" : "border-line text-muted"
              }`}
              onClick={() =>
                setForm((f) => ({ ...f, splitTunneling: { ...f.splitTunneling, mode: "include" } }))
              }
            >
              Include
            </button>
          </div>
          {form.splitTunneling.apps.map((app, idx) => (
            <div key={`${app.path}-${idx}`} className="flex items-center gap-2 bg-surface border border-line rounded-sm px-2 py-1.5">
              <input
                type="checkbox"
                checked={app.enabled}
                onChange={() => {
                  const apps = [...form.splitTunneling.apps];
                  apps[idx] = { ...apps[idx], enabled: !apps[idx].enabled };
                  setForm((f) => ({ ...f, splitTunneling: { ...f.splitTunneling, apps } }));
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] truncate">{app.name}</div>
                <div className="text-[9px] text-dim truncate">{app.path}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const apps = form.splitTunneling.apps.filter((_, i) => i !== idx);
                  setForm((f) => ({ ...f, splitTunneling: { ...f.splitTunneling, apps } }));
                  playSound.cancel();
                }}
                className="p-1 text-muted hover:text-soul-red"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              placeholder="App.exe"
              className="flex-1 bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />
            <input
              placeholder="C:\\Path\\app.exe"
              className="flex-[2] bg-panel border border-line rounded-sm px-2 py-2 min-h-11"
              value={appPath}
              onChange={(e) => setAppPath(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (!appName.trim()) return;
                setForm((f) => ({
                  ...f,
                  splitTunneling: {
                    ...f.splitTunneling,
                    apps: [
                      ...f.splitTunneling.apps,
                      {
                        name: appName.trim(),
                        path: appPath.trim() || `C:\\Program Files\\${appName}\\${appName}`,
                        enabled: true,
                      },
                    ],
                  },
                }));
                setAppName("");
                setAppPath("");
                playSound.select();
              }}
              className="px-3 min-h-11 rounded-sm bg-panel border border-line text-cyan"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
