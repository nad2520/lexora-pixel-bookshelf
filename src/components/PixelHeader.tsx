import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useGame } from "@/context/GameContext";
import bearMascot from "@/assets/bear-mascot.png";

const navTabs = [
  { label: "EXPLORE", path: "/", code: "[EXP]", msg: "Visiting the sanctuary archives..." },
  { label: "BROWSE", path: "/browse", code: "[LIB]", msg: "Perusing the public library..." },
  { label: "RANKINGS", path: "/rankings", code: "[RNK]", msg: "Consulting the scholar's council..." },
  { label: "PROFILE", path: "/profile", code: "[PRO]", msg: "Accessing your personal study..." },
];

interface PixelHeaderProps {
  onAction?: (msg: string, type?: "info" | "success" | "warning" | "error") => void;
}

const PixelHeader = ({ onAction }: PixelHeaderProps) => {
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { coins, xp, level } = useGame();

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const handleNavClick = (tab: typeof navTabs[0]) => {
    if (onAction) onAction(tab.msg, "info");
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (onAction) onAction(`AMBIANCE_SHIFT: ${nextTheme.toUpperCase()}`, "success");
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 inset-x-0 z-50 hud-stats flex items-center justify-between px-4 md:px-8 backdrop-blur-md">
      {/* HUD: Player Status */}
      <div className="flex items-center gap-4">
        <div
          className="relative group cursor-help"
          onMouseEnter={() => setDialogue("ID: MASTER_SCHOLAR. RECOGNIZED.")}
          onMouseLeave={() => setDialogue(null)}
        >
          <div className="w-8 h-8 pixel-border bg-parchment-light animate-float overflow-hidden">
            <img
              src={bearMascot}
              alt="Mascot"
              className="w-full h-full object-cover pixelated opacity-80 group-hover:opacity-100"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-accent text-[6px] px-1 font-bold border border-black text-black">
            {level}
          </div>

          {/* Mascot Dialogue Box */}
          {dialogue && (
            <div className="absolute top-10 left-0 w-40 glass-panel p-2 z-[60] animate-in slide-in-from-top-1 duration-200">
              <p className="text-[6px] text-foreground font-bold leading-tight uppercase tracking-tighter">{dialogue}</p>
              <div className="absolute -top-1 left-3 w-2 h-2 bg-card border-t border-l border-glass-border rotate-45" />
            </div>
          )}
        </div>

        <div className="hidden sm:block text-left">
          <h1 className="text-[10px] text-foreground tracking-[0.2em] font-bold uppercase transition-colors hover:text-primary">Lexora Archives</h1>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-primary animate-pulse" />
            <p className="text-[6px] text-primary italic uppercase">Sanctuary Peaceful</p>
          </div>
        </div>

        {/* Vital Gauges */}
        <div className="hidden md:flex flex-col gap-1 w-24 lg:w-48 ml-2">
          <div className="flex justify-between items-baseline text-[6px] font-bold">
            <span className="text-xp-bar">SCHOLAR_MASTERY</span>
            <span className="text-foreground/50">{xp} XP</span>
          </div>
          <div className="xp-bar-container w-full h-1.5 border border-white/10">
            <div className="h-full bg-xp-bar relative overflow-hidden transition-all duration-1000" style={{ width: `${(xp % (level * 1000)) / (level * 1000) * 100}%` }}>
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* HUD: Navigation Console */}
      <nav className="flex items-center h-full">
        {navTabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.path}
            onClick={() => handleNavClick(tab)}
            className={`h-full px-2 md:px-4 flex items-center gap-2 transition-colors border-x border-white/5 group ${location.pathname === tab.path ? "bg-white/10" : "hover:bg-white/5"
              }`}
          >
            <span className={`text-[8px] font-bold group-hover:scale-110 transition-transform ${location.pathname === tab.path ? "text-primary" : "text-foreground/40"
              }`}>
              {tab.code}
            </span>
            <span className={`hidden lg:block text-[8px] font-bold tracking-tighter group-hover:text-foreground ${location.pathname === tab.path ? "text-foreground" : "text-muted-foreground"
              }`}>
              {tab.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* HUD: Currency & System */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="w-10 h-6 flex items-center justify-center border border-white/10 hover:border-gold transition-colors group"
          title="SWITCH_VISUAL_AMBIANCE"
        >
          <span className="text-[10px] text-accent font-bold group-hover:scale-125 transition-transform">
            {theme === "dark" ? "☽" : "☼"}
          </span>
        </button>

        <Link to="/treasury" className="px-4 py-2 border-l border-white/5 flex flex-col justify-center group hover:bg-white/5 transition-colors">
          <span className="text-[6px] text-foreground/40 uppercase tracking-widest mb-0.5">Premium Vault</span>
          <span className="text-[9px] text-gold font-bold group-hover:scale-110 transition-transform">Coins {coins.toLocaleString()}</span>
        </Link>
        <div className="hidden xl:block text-foreground/30 text-[7px] font-bold tracking-widest uppercase">
          LN_0222
        </div>
      </div>
    </header>
  );
};

export default PixelHeader;
