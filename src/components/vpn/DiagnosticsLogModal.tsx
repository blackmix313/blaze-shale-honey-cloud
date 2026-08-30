import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Download, Pause, Play, Terminal, Trash2 } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import type { LogEntry } from "@/lib/vpn/types";
import { ModalShell } from "./ModalShell";

interface Props {
  logs: LogEntry[];
  onClearLogs: () => void;
  onClose: () => void;
}

const LEVEL_COLOR: Record<LogEntry["level"], string> = {
  INFO: "text-cyan",
  DPI: "text-soul-yellow",
  TUN: "text-soul-green",
  WARN: "text-tp",
  ERROR: "text-soul-red",
  SOUL: "text-magenta",
  SCAN: "text-muted",
  CORE: "text-fg",
};

export function DiagnosticsLogModal({ logs, onClearLogs, onClose }: Props) {
  const [filter, setFilter] = useState("ALL");
  const [auto, setAuto] = useState(true);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const shown = useMemo(
    () => (filter === "ALL" ? logs : logs.filter((l) => l.level === filter)),
    [logs, filter],
  );

  useEffect(() => {
    if (auto && ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [shown, auto]);

  const asText = () =>
    logs.map((l) => `[${l.timestamp}] [${l.level}] [${l.tag}] ${l.message}`).join("\n");

  return (
    <ModalShell
      title="LOGS · Aether core console"
      accent="var(--color-soul-green)"
      icon={<Terminal className="size-4 text-soul-green" />}
      onClose={onClose}
      wide
      footer={
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="bg-ink border border-line rounded-sm px-2 py-2 min-h-11 text-xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {["ALL", "CORE", "SCAN", "DPI", "TUN", "INFO", "SOUL", "WARN", "ERROR"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setAuto((v) => !v)}
            className="px-3 min-h-11 rounded-sm border border-line text-muted flex items-center gap-1 text-[10px] font-mono"
          >
            {auto ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            {auto ? "Live" : "Paused"}
          </button>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(asText());
              setCopied(true);
              playSound.select();
              window.setTimeout(() => setCopied(false), 1600);
            }}
            className="px-3 min-h-11 rounded-sm border border-line text-muted flex items-center gap-1 text-[10px]"
          >
            <Copy className="size-3.5" />
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => {
              const blob = new Blob([asText()], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `aether-core-${Date.now()}.log`;
              a.click();
              URL.revokeObjectURL(url);
              playSound.connected();
            }}
            className="px-3 min-h-11 rounded-sm border border-line text-muted flex items-center gap-1 text-[10px]"
          >
            <Download className="size-3.5" />
            File
          </button>
          <button
            type="button"
            onClick={() => {
              onClearLogs();
              playSound.cancel();
            }}
            className="px-3 min-h-11 rounded-sm border border-line text-soul-red flex items-center gap-1 text-[10px] ml-auto"
          >
            <Trash2 className="size-3.5" />
            Clear
          </button>
        </div>
      }
    >
      <div
        ref={ref}
        className="h-[50vh] overflow-auto bg-void border border-line rounded-md p-3 font-mono text-[11px] leading-relaxed"
      >
        {shown.length === 0 ? (
          <div className="text-dim">No log lines.</div>
        ) : (
          shown.map((l) => (
            <div key={l.id} className="flex gap-2">
              <span className="text-dim tabular-nums shrink-0">{l.timestamp}</span>
              <span className={`w-12 shrink-0 ${LEVEL_COLOR[l.level]}`}>{l.level}</span>
              <span className="text-muted w-20 shrink-0 truncate">{l.tag}</span>
              <span className="text-fg break-all">{l.message}</span>
            </div>
          ))
        )}
      </div>
    </ModalShell>
  );
}
