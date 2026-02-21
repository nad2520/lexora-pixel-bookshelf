import bearMascot from "@/assets/bear-mascot.png";

const navTabs = ["⚔️ Quests", "👤 Profile", "📚 Library"];

const PixelHeader = () => {
  return (
    <header className="parchment-bg pixel-border p-3 mb-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl text-primary pixel-text-shadow tracking-wider">
            ✦ LEXORA ✦
          </h1>
        </div>

        {/* Nav Tabs */}
        <nav className="flex gap-1">
          {navTabs.map((tab) => (
            <button
              key={tab}
              className="rpg-panel px-3 py-2 text-[8px] md:text-[10px] text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={bearMascot}
            alt="Bear Mascot"
            className="w-10 h-10 md:w-12 md:h-12 pixel-border-gold rounded-sm"
          />
          <div className="text-[7px] md:text-[8px] space-y-1">
            <p className="text-accent font-bold">Curious Reader</p>
            <p className="text-muted-foreground">Lv 1</p>
            <div className="flex items-center gap-1">
              <span className="text-gold">📖 0</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-gold">🏆 0</span>
            </div>
          </div>
          {/* XP Bar */}
          <div className="hidden sm:block">
            <p className="text-[7px] text-muted-foreground mb-1">XP: 0/100</p>
            <div className="w-24 h-3 bg-muted pixel-border rounded-sm overflow-hidden">
              <div className="h-full bg-xp-bar w-0 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PixelHeader;
