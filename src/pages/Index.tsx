import { useState, useCallback } from "react";
import PixelHeader from "@/components/PixelHeader";
import WorldMap from "@/components/WorldMap";
import QuestPanel from "@/components/QuestPanel";
import SidePanel from "@/components/SidePanel";
import BookRecommendations from "@/components/BookRecommendations";
import SystemLog from "@/components/SystemLog";

const Index = () => {
  const [logs, setLogs] = useState<{ id: number; message: string; type: "info" | "success" | "warning" | "error"; timestamp: string }[]>([
    { id: 1, message: "Lexora Console v2.0 Initialized", type: "info", timestamp: "12:51" },
    { id: 2, message: "System scan complete: No anomalies detected", type: "success", timestamp: "12:51" },
  ]);

  const logAction = useCallback((message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [...prev, { id: Date.now(), message, type, timestamp }]);
  }, []);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-accent-foreground">
      {/* Global HUD */}
      <PixelHeader onAction={logAction} />

      {/* Main Game Interface Wrapper */}
      <main className="pt-20 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">

        {/* Row 1: The World & The Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[600px]">

          {/* Left/Center: Visual Exploration (Large) */}
          <div className="lg:col-span-8 h-full">
            <WorldMap onAction={logAction} />
          </div>

          {/* Right: Combat & Quests (Side Panel) */}
          <div className="lg:col-span-4 h-full flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
            <div className="flex items-center gap-2 px-2">
              <span className="w-2 h-2 bg-secondary animate-pulse" />
              <h2 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Active Operations</h2>
            </div>
            <QuestPanel onAction={logAction} />
          </div>
        </div>

        {/* Row 2: Loot & Statistics */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Rare Loot (Shop/Recommendations) */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-[12px] font-bold text-foreground mb-6 uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-2 h-2 bg-primary" /> New Sanctuary Arrivals
              </h2>
              <BookRecommendations onAction={logAction} />
            </div>
            <div>
              <h2 className="text-[12px] font-bold text-foreground mb-6 uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary" /> Scholarly Directives
              </h2>
              <QuestPanel onAction={logAction} />
            </div>
          </div>

          {/* Right: Character Info & Social */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 px-1">
                <span className="w-2 h-2 bg-accent animate-pulse" />
                <h2 className="text-[10px] font-bold text-accent uppercase tracking-widest">Character Data</h2>
              </div>
              <SidePanel onAction={logAction} />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 px-1">
                <span className="w-2 h-2 bg-foreground/20 animate-pulse" />
                <h2 className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Event Monitoring</h2>
              </div>
              <SystemLog logs={logs} />
            </div>
          </div>
        </div>

      </main>

      {/* Decorative Bottom Bar */}
      <footer className="mt-12 border-t-2 border-foreground/5 py-8 text-center bg-sub-panel-bg">
        <div className="flex flex-col gap-2">
          <p className="text-[7px] text-foreground/20 uppercase tracking-[1em]">Lexora Console v2.0</p>
          <div className="flex justify-center gap-8 text-[6px] text-muted-foreground font-bold italic">
            <span>LATENCY: 12ms</span>
            <span>FPS: 60.0</span>
            <span>SERVER: ELYSIUM-7</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
