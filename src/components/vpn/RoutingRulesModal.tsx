import { useState } from "react";
import { Plus, Route, Trash2 } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import type { RoutingRule } from "@/lib/vpn/types";
import { ModalShell } from "./ModalShell";

interface Props {
  rules: RoutingRule[];
  onSaveRules: (rules: RoutingRule[]) => void;
  onClose: () => void;
}

const ACTION_COLOR: Record<RoutingRule["action"], string> = {
  proxy: "text-cyan",
  direct: "text-soul-green",
  block: "text-soul-red",
};

export function RoutingRulesModal({ rules: initial, onSaveRules, onClose }: Props) {
  const [rules, setRules] = useState<RoutingRule[]>([...initial]);
  const [name, setName] = useState("");
  const [type, setType] = useState<RoutingRule["type"]>("domain-suffix");
  const [value, setValue] = useState("");
  const [action, setAction] = useState<RoutingRule["action"]>("proxy");

  return (
    <ModalShell
      title="SPARE · routing rules"
      accent="var(--color-magenta)"
      icon={<Route className="size-4 text-magenta" />}
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
              onSaveRules(rules);
              playSound.connected();
              onClose();
            }}
            className="px-4 py-2 min-h-11 rounded-sm bg-magenta text-void font-pixel text-[9px]"
          >
            Save rules
          </button>
        </div>
      }
    >
      <div className="space-y-3 text-xs font-mono">
        <p className="text-muted leading-relaxed">
          Matched by domain, suffix, CIDR, GeoIP, or process. Proxy goes through the Aether tunnel, direct skips it,
          block drops the packet.
        </p>
        <div className="space-y-1.5">
          {rules.map((r) => (
            <div key={r.id} className="flex items-start gap-2 p-2.5 rounded-md border border-line bg-panel">
              <input
                type="checkbox"
                className="mt-1"
                checked={r.enabled}
                onChange={() =>
                  setRules(rules.map((x) => (x.id === r.id ? { ...x, enabled: !x.enabled } : x)))
                }
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-fg truncate">{r.name}</span>
                  <span className={`uppercase text-[9px] ${ACTION_COLOR[r.action]}`}>{r.action}</span>
                </div>
                <div className="text-[10px] text-dim truncate">
                  {r.type} · {r.value}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRules(rules.filter((x) => x.id !== r.id));
                  playSound.cancel();
                }}
                className="p-1 text-muted hover:text-soul-red"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border border-line rounded-md bg-panel">
          <input
            className="bg-ink border border-line rounded-sm px-2 py-2 min-h-11"
            placeholder="Rule name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="bg-ink border border-line rounded-sm px-2 py-2 min-h-11"
            value={type}
            onChange={(e) => setType(e.target.value as RoutingRule["type"])}
          >
            <option value="domain">domain</option>
            <option value="domain-suffix">domain-suffix</option>
            <option value="ip-cidr">ip-cidr</option>
            <option value="geoip">geoip</option>
            <option value="process">process</option>
          </select>
          <input
            className="sm:col-span-2 bg-ink border border-line rounded-sm px-2 py-2 min-h-11"
            placeholder="google.com, 10.0.0.0/8"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <select
            className="bg-ink border border-line rounded-sm px-2 py-2 min-h-11"
            value={action}
            onChange={(e) => setAction(e.target.value as RoutingRule["action"])}
          >
            <option value="proxy">proxy</option>
            <option value="direct">direct</option>
            <option value="block">block</option>
          </select>
          <button
            type="button"
            className="min-h-11 rounded-sm bg-magenta/20 border border-magenta text-magenta flex items-center justify-center gap-1"
            onClick={() => {
              if (!value.trim()) return;
              setRules([
                ...rules,
                {
                  id: `rule-${Date.now()}`,
                  name: name.trim() || `Rule ${value.split(",")[0]}`,
                  type,
                  value: value.trim(),
                  action,
                  enabled: true,
                },
              ]);
              setName("");
              setValue("");
              playSound.select();
            }}
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
