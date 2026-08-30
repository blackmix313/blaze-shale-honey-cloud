import { useEffect } from "react";
import { playSound, setSoundEnabled as setAudioFlag } from "@/lib/vpn/audio";
import { currentServerOf, useVpnStore } from "@/lib/vpn/store";
import { BattleMenuBar } from "./BattleMenuBar";
import { DiagnosticsLogModal } from "./DiagnosticsLogModal";
import { DpiSettingsModal } from "./DpiSettingsModal";
import { MainDashboard } from "./MainDashboard";
import { QuickSetupModal } from "./QuickSetupModal";
import { RoutingRulesModal } from "./RoutingRulesModal";
import { ServerListModal } from "./ServerListModal";
import { TitleBar } from "./TitleBar";
import { TunSettingsModal } from "./TunSettingsModal";
import { WindowsTraySim } from "./WindowsTraySim";

export function AetherClient() {
  const store = useVpnStore();
  const current = currentServerOf(store);

  useEffect(() => {
    void useVpnStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    setAudioFlag(store.soundEnabled);
  }, [store.soundEnabled]);

  return (
    <div className="w-screen h-[100dvh] bg-void text-fg flex items-center justify-center p-0 md:p-3 overflow-hidden">
      {store.isMinimized && (
        <div className="text-center p-6 bg-ink border border-line rounded-xl space-y-3">
          <div className="font-pixel text-[10px] text-cyan">Aether is in the tray</div>
          <p className="text-xs font-mono text-muted">Restore the window or use the tray popup.</p>
          <button
            type="button"
            onClick={() => {
              store.setMinimized(false);
              playSound.select();
            }}
            className="px-4 py-2 min-h-11 bg-cyan text-void font-pixel text-[10px] rounded-sm"
          >
            RESTORE
          </button>
        </div>
      )}

      {!store.isMinimized && (
        <div
          className={`bg-card border-2 border-line flex flex-col overflow-hidden ${
            store.isMaximized ? "w-full h-full rounded-none" : "w-full max-w-5xl h-full md:h-[94vh] rounded-xl"
          }`}
        >
          <TitleBar
            connectionState={store.connectionState}
            soulColor={store.soulColor}
            onSoulColorChange={store.setSoulColor}
            onMinimize={() => store.setMinimized(true)}
            onMaximize={() => store.setMaximized(!store.isMaximized)}
            onClose={() => store.setMinimized(true)}
            showTraySim={store.showTray}
            onToggleTraySim={() => store.setShowTray(!store.showTray)}
            onOpenQuickSetup={() => store.setActiveTab("QUICK_SETUP")}
            soundOn={store.soundEnabled}
            onToggleSound={() => store.setSoundEnabled(!store.soundEnabled)}
          />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <MainDashboard
              currentServer={current}
              connectionState={store.connectionState}
              soulColor={store.soulColor}
              traffic={store.traffic}
              tunConfig={store.tunConfig}
              dpiConfig={store.dpiConfig}
              core={store.core}
              publicIp={store.publicIp}
              exitIp={store.exitIp}
              onToggleConnect={store.toggleConnect}
              onOpenServers={() => store.setActiveTab("SERVERS")}
              onOpenTun={() => store.setActiveTab("TUN_SETTINGS")}
              onOpenDpi={() => store.setActiveTab("DPI_SETTINGS")}
              onOpenQuickSetup={() => store.setActiveTab("QUICK_SETUP")}
              onCorePatch={store.setCore}
            />
          </div>
          <BattleMenuBar
            activeTab={store.activeTab}
            onSelectTab={store.setActiveTab}
            connectionState={store.connectionState}
            onToggleConnect={store.toggleConnect}
            soulColor={store.soulColor}
          />
        </div>
      )}

      {store.activeTab === "TUN_SETTINGS" && (
        <TunSettingsModal
          config={store.tunConfig}
          onSave={(cfg) => {
            store.setTunConfig(cfg);
            store.addLog({
              id: `tun-${Date.now()}`,
              timestamp: new Date().toTimeString().split(" ")[0] + ".000",
              level: "TUN",
              tag: "WINTUN",
              message: `Adapter=${cfg.adapterName} ip=${cfg.virtualIp} mtu=${cfg.mtu} kill=${cfg.killSwitch}`,
            });
          }}
          onClose={() => store.setActiveTab("DASHBOARD")}
        />
      )}
      {store.activeTab === "DPI_SETTINGS" && (
        <DpiSettingsModal
          config={store.dpiConfig}
          core={store.core}
          onSave={(cfg, patch) => {
            store.setDpiConfig(cfg);
            store.setCore(patch);
            store.addLog({
              id: `dpi-${Date.now()}`,
              timestamp: new Date().toTimeString().split(" ")[0] + ".000",
              level: "DPI",
              tag: "EVASION",
              message: `frag=[${cfg.fragMin},${cfg.fragMax}] http=${cfg.masqueHttp} noize=${patch.noize ?? store.core.noize}`,
            });
          }}
          onClose={() => store.setActiveTab("DASHBOARD")}
        />
      )}
      {store.activeTab === "SERVERS" && (
        <ServerListModal
          servers={store.servers}
          selectedServer={current}
          onSelectServer={store.selectServer}
          onServersChange={store.setServers}
          onToggleFavorite={store.toggleFavorite}
          onClose={() => store.setActiveTab("DASHBOARD")}
        />
      )}
      {store.activeTab === "ROUTING" && (
        <RoutingRulesModal
          rules={store.routingRules}
          onSaveRules={(rls) => {
            store.setRoutingRules(rls);
            store.addLog({
              id: `rt-${Date.now()}`,
              timestamp: new Date().toTimeString().split(" ")[0] + ".000",
              level: "INFO",
              tag: "ROUTING",
              message: `Routing table updated (${rls.length} rules).`,
            });
          }}
          onClose={() => store.setActiveTab("DASHBOARD")}
        />
      )}
      {store.activeTab === "LOGS" && (
        <DiagnosticsLogModal
          logs={store.logs}
          onClearLogs={store.clearLogs}
          onClose={() => store.setActiveTab("DASHBOARD")}
        />
      )}
      {store.activeTab === "QUICK_SETUP" && (
        <QuickSetupModal
          currentServer={current}
          tunConfig={store.tunConfig}
          dpiConfig={store.dpiConfig}
          core={store.core}
          onClose={() => store.setActiveTab("DASHBOARD")}
        />
      )}

      {store.showTray && (
        <div className="hidden md:block">
          <WindowsTraySim
            currentServer={current}
            connectionState={store.connectionState}
            soulColor={store.soulColor}
            traffic={store.traffic}
            onToggleConnect={store.toggleConnect}
            onRestoreWindow={() => store.setMinimized(false)}
            onClose={() => store.setShowTray(false)}
          />
        </div>
      )}
    </div>
  );
}
