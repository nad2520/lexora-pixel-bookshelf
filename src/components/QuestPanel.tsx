import { useState } from "react";
import { useGame } from "@/context/GameContext";
import bossSkull from "@/assets/boss-skull.png";

interface QuestProps {
  onAction: (msg: string, type?: "info" | "success" | "warning" | "error") => void;
}

const QuestPanel = ({ onAction }: QuestProps) => {
  const { addXP, addCoins } = useGame();
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  const handleClaim = (id: string, xp: number, coins: number, msg: string) => {
    if (claimed[id]) return;
    setClaimed(prev => ({ ...prev, [id]: true }));
    addXP(xp);
    addCoins(coins);
    onAction(msg, "success");
  };
  return (
    <div className="flex flex-col gap-6">
      {/* Primary Mission: Golden Gate */}
      <div
        className="glass-panel p-4 pixel-border-gold relative overflow-hidden group cursor-help"
        onClick={() => onAction("Verifying seal integrity: Level 4 access required", "warning")}
      >
        <div className="absolute top-0 right-0 px-2 py-1 bg-gold text-black text-[6px] font-bold">LEGENDARY_OP</div>
        <h3 className="text-[9px] text-gold font-bold uppercase tracking-widest mb-4">
          MAIN_MISSION // GOLDEN_GATE
        </h3>
        <div className="space-y-4">
          {/* Progress Tracker */}
          <div className="flex justify-between items-end mb-1">
            <span className="text-[6px] text-foreground/40">COMPLETION_SEQ</span>
            <span className="text-[8px] text-gold font-bold">03 / 04</span>
          </div>
          <div className="h-1 bg-foreground/5 border border-foreground/10 relative">
            <div className="absolute inset-y-0 left-0 bg-gold w-3/4 shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
          </div>
        </div>
        <p className="mt-4 text-[7px] text-foreground/60 leading-relaxed italic uppercase tracking-tighter">
          Decrypt the secrets of the central repository by establishing secure links in local zones.
        </p>
      </div>

      {/* Daily Operations */}
      <div className="glass-panel p-4 border border-foreground/10">
        <h3 className="text-[8px] text-secondary font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary animate-pulse" /> DAILY LESSON // FANTASY_WOODS
        </h3>
        <div className={`p-3 border-l-2 transition-all ${claimed.daily ? 'bg-secondary/10 border-secondary/20 scale-[0.98]' : 'bg-sub-panel-bg border-secondary group cursor-pointer hover:bg-foreground/5 hover:scale-[1.02]'}`}>
          <p className="text-[8px] text-foreground font-bold mb-1 uppercase tracking-tighter">READ: SHADOW_FOREST.DATA</p>
          <div className="flex justify-between items-center text-[6px]">
            <span className="text-secondary-foreground font-pixel">REWARD: +250_XP / +100_COINS</span>
            <button
              disabled={claimed.daily}
              className={`transition-colors font-bold tracking-tighter uppercase ${claimed.daily ? 'text-secondary/40' : 'text-foreground/40 hover:text-foreground underline'}`}
              onClick={() => handleClaim("daily", 250, 100, "Daily Lesson: COMPLETED [MASTERY_GAINED]")}
            >
              {claimed.daily ? "COMPLETED" : "BEGIN LESSON"}
            </button>
          </div>
        </div>
      </div>

      {/* Combat Alert: Boss Battle */}
      <div className="glass-panel p-4 border border-destructive/30 bg-destructive/5 relative overflow-hidden group">
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,0,0.03)_10px,rgba(255,0,0,0.03)_20px)]" />
        <h3 className="text-[8px] text-destructive font-bold uppercase tracking-widest mb-4 animate-pulse">
          !! ALERT // LEGENDARY CHALLENGE !!
        </h3>
        <div className="flex gap-4 relative z-10">
          <div className="w-16 h-16 bg-sub-panel-bg border border-destructive/50 overflow-hidden group-hover:scale-110 transition-transform">
            <img
              src={bossSkull}
              alt="Boss"
              className="w-full h-full object-cover brightness-110 animate-shake"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-[7px] font-bold text-foreground mb-1 flex justify-between uppercase">
                <span>INFERNO_TOME.PDF</span>
                <span className="text-destructive font-pixel">EFFORT: 8.8 / 8.8</span>
              </p>
              <div className="hp-bar-container h-2 border-destructive/50">
                <div className="h-full bg-hp-bar-fill w-full relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>
            <button
              disabled={claimed.boss}
              className={`rpg-button w-full text-[8px] font-bold py-2 border-none active:translate-y-0.5 uppercase tracking-widest ${claimed.boss ? 'bg-secondary/40 text-secondary' : 'bg-destructive text-foreground'}`}
              onClick={() => handleClaim("boss", 1000, 500, "CHALLENGE_WON: MASTERY_RECORDED")}
            >
              {claimed.boss ? "WELL_READ" : "ACCEPT CHALLENGE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestPanel;
