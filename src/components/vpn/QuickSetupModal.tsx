import { useState } from "react";
import { Check, Copy, Download, Terminal, Zap } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";
import { buildAetherCommand, buildEnvFile, buildRunBat } from "@/lib/vpn/cli";
import { CORE_BINARY, CORE_VERSION } from "@/lib/vpn/defaults";
import type { CoreConfig, DpiEvasionConfig, ServerNode, TunConfig } from "@/lib/vpn/types";
import { ModalShell } from "./ModalShell";

interface Props {
  currentServer: ServerNode;
  tunConfig: TunConfig;
  dpiConfig: DpiEvasionConfig;
  core: CoreConfig;
  onClose: () => void;
}

type Tab = "cli" | "bat" | "env";

function downloadText(filename: string, text: string, mime = "text/plain") {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function QuickSetupModal({ currentServer, tunConfig, dpiConfig, core, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("cli");
  const [copied, setCopied] = useState(false);
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

  return (
    <ModalShell
      title="EXPORT · Aether core for Windows"
      accent="var(--color-cyan)"
      icon={<Zap className="size-4 text-cyan" />}
      onClose={onClose}
      wide
    >
      <div className="space-y-4 text-xs font-mono text-fg">
        <p className="text-muted leading-relaxed">
          This preview drives the Aether v{CORE_VERSION} control plane in the browser. To actually tunnel a Windows
          machine, drop {CORE_BINARY} next to the generated launcher. SOCKS5 will listen on {core.socksBind}. Point
          browsers at <span className="text-cyan">socks5h://{core.socksBind}</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <a
            href="/core/aether-windows-x86_64.zip"
            download
            onClick={() => playSound.connected()}
            className="flex items-center justify-center gap-2 min-h-11 px-3 rounded-sm bg-cyan text-void font-pixel text-[9px]"
          >
            <Download className="size-3.5" />
            Core zip
          </a>
          <button
            type="button"
            onClick={() => {
              downloadText("run-aether.bat", bat);
              playSound.connected();
            }}
            className="flex items-center justify-center gap-2 min-h-11 px-3 rounded-sm border border-cyan text-cyan font-pixel text-[9px]"
          >
            <Download className="size-3.5" />
            run-aether.bat
          </button>
          <button
            type="button"
            onClick={() => {
              downloadText("aether.env", env);
              playSound.connected();
            }}
            className="flex items-center justify-center gap-2 min-h-11 px-3 rounded-sm border border-line text-muted font-pixel text-[9px]"
          >
            <Download className="size-3.5" />
            aether.env
          </button>
        </div>

        <ol className="list-decimal pl-4 space-y-1 text-muted">
          <li>Download the core zip and extract {CORE_BINARY}.</li>
          <li>Download run-aether.bat into the same folder (flags match this GUI).</li>
          <li>Run the bat as Administrator if you want Wintun system-wide capture.</li>
          <li>Otherwise keep proxy-only and set apps to socks5h://{core.socksBind}.</li>
        </ol>

        <div className="flex gap-1">
          {(
            [
              ["cli", "CLI"],
              ["bat", "BAT"],
              ["env", "ENV"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-3 py-2 min-h-11 rounded-sm border text-[10px] ${
                tab === id ? "border-cyan text-cyan bg-cyan/10" : "border-line text-muted"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => void copy()}
            className="ml-auto px-3 py-2 min-h-11 rounded-sm border border-line text-muted flex items-center gap-1"
          >
            {copied ? <Check className="size-3.5 text-soul-green" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <pre className="bg-void border border-line rounded-md p-3 overflow-auto max-h-64 text-[11px] leading-relaxed whitespace-pre-wrap">
          {body}
        </pre>

        <div className="flex items-start gap-2 text-muted">
          <Terminal className="size-4 text-cyan shrink-0 mt-0.5" />
          <p>
            Gateway {currentServer.name} · {currentServer.serverAddress}:{currentServer.port} · TUN{" "}
            {tunConfig.enabled ? `${tunConfig.adapterName} ${tunConfig.virtualIp}` : "off"} · scan {core.scanMode} ·
            noize {core.noize}.
          </p>
        </div>
      </div>
    </ModalShell>
  );
}
