import { useEffect, useState } from "react";
import type { ConnectionState } from "@/lib/vpn/types";

interface TrafficCanvasProps {
  connectionState: ConnectionState;
  downloadSpeed: number;
}

const BARS = 42;

export function TrafficCanvas({ connectionState, downloadSpeed }: TrafficCanvasProps) {
  const [history, setHistory] = useState<number[]>(() => Array(BARS).fill(0));
  const connected = connectionState === "CONNECTED";

  useEffect(() => {
    if (!connected) {
      setHistory(Array(BARS).fill(0));
      return;
    }
    const mb = downloadSpeed / (1024 * 1024);
    const norm = Math.min(100, Math.max(8, mb * 7 + 12));
    setHistory((prev) => [...prev.slice(1), norm]);
  }, [connected, downloadSpeed]);

  return (
    <div className="w-full h-[70px] rounded-sm bg-void border border-line/40 flex items-end gap-px px-1 py-1" aria-hidden="true">
      {history.map((h, i) => (
        <div
          key={i}
          className={`flex-1 min-w-0 rounded-sm ${connected ? "bg-cyan/80" : "bg-line"}`}
          style={{ height: connected ? `${h}%` : "8%" }}
        />
      ))}
    </div>
  );
}
