import bossSkull from "@/assets/boss-skull.png";

const QuestPanel = () => {
  return (
    <div className="space-y-3">
      {/* Gate Progress Banner */}
      <div className="rpg-panel p-3 text-center">
        <p className="text-[8px] text-accent pixel-text-shadow mb-2">
          🏰 Complete 4 Quests to Unlock the Golden Library Gate!
        </p>
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 pixel-border bg-muted flex items-center justify-center text-[8px] text-muted-foreground"
            >
              {i < 0 ? "✓" : "?"}
            </div>
          ))}
        </div>
        <p className="text-[7px] text-muted-foreground mt-1">0 / 4</p>
      </div>

      {/* Today's Quest */}
      <div className="rpg-panel p-3">
        <h3 className="text-[9px] text-secondary pixel-text-shadow mb-2">
          📜 Today's Quest
        </h3>
        <div className="bg-parchment pixel-border p-2">
          <p className="text-[7px] text-foreground mb-1">
            Read a fantasy book today!
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[7px] text-gold">+30 XP Reward ✨</span>
            <button className="rpg-panel px-2 py-1 text-[7px] text-accent hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* Boss Battle */}
      <div className="rpg-panel p-3">
        <h3 className="text-[9px] text-destructive pixel-text-shadow mb-2">
          💀 Boss Battle Mode
        </h3>
        <div className="flex items-center gap-3">
          <img
            src={bossSkull}
            alt="Boss"
            className="w-16 h-16 pixel-border rounded-sm animate-float"
          />
          <div className="flex-1 space-y-2">
            <p className="text-[7px] text-foreground">Inferno Tome</p>
            <div>
              <div className="flex justify-between text-[6px] text-muted-foreground mb-1">
                <span>HP</span>
                <span>8.8 / 8.8</span>
              </div>
              <div className="w-full h-3 bg-hp-bar pixel-border rounded-sm overflow-hidden">
                <div className="h-full bg-hp-bar-fill w-full transition-all" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-[7px]">
              <span className="text-gold">🎁 Reward:</span>
              <span className="text-accent animate-glow">📦 Treasure Chest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestPanel;
