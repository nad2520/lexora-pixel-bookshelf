import { useState } from "react";

interface SidePanelProps {
  onAction: (msg: string, type?: "info" | "success" | "warning" | "error") => void;
}

const ScribeIcon = () => (
  <div className="w-6 h-8 bg-foreground/80 relative shadow-[2px_2px_0_rgba(0,0,0,0.5)] dark:shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
    <div className="absolute top-2 left-1 w-4 h-0.5 bg-background/20" />
    <div className="absolute top-4 left-1 w-4 h-0.5 bg-background/20" />
    <div className="absolute top-6 left-1 w-4 h-0.5 bg-background/20" />
    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary/60 rotate-45 border border-foreground/20" />
  </div>
);

const GatekeeperIcon = () => (
  <div className="w-4 h-6 bg-gold relative shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
    <div className="absolute top-0 inset-x-0 h-2 bg-yellow-300" />
    <div className="absolute -left-2 top-2 h-1 w-2 bg-gold border-y border-l border-foreground/20" />
    <div className="absolute -right-2 top-2 h-1 w-2 bg-gold border-y border-r border-foreground/20" />
    <div className="absolute bottom-0 inset-x-0 h-1 bg-foreground/20" />
  </div>
);

const ShadowwalkerIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center relative scale-125">
    <div className="w-6 h-4 bg-foreground/10 rounded-full border border-foreground/5" />
    <div className="absolute top-1/2 left-1 w-1 h-1 bg-secondary animate-pulse" />
    <div className="absolute top-1/2 right-1 w-1 h-1 bg-secondary animate-pulse" />
    <div className="absolute -top-1 left-2 w-2 h-1 bg-foreground/5" />
  </div>
);

const achievements = [
  { id: "red_scroll", title: "ANCIENT_SCROLL", desc: "Deciphered the first hidden language of the library.", code: "[A-01]", icon: <ScribeIcon /> },
  { id: "green_leaf", title: "NATURE_PACT", desc: "Established a biological link with the Fantasy Forest.", code: "[A-02]", icon: <GatekeeperIcon /> },
  { id: "blue_anchor", title: "SEA_ORACLE", desc: "Retrieved the lost coordinates of the sunken archive.", code: "[A-03]", icon: <ShadowwalkerIcon /> },
];

const leaderboard = [
  { rank: "01", name: "ELARA", creds: 1420, code: "[KNG]", color: "text-gold" },
  { rank: "02", name: "THORNE", creds: 1385, code: "[SLV]", color: "text-slate-400" },
  { rank: "03", name: "FERN", creds: 1310, code: "[BRZ]", color: "text-amber-600" },
];

const SidePanel = ({ onAction }: SidePanelProps) => {
  const [selectedAch, setSelectedAch] = useState<typeof achievements[0] | null>(null);

  return (
    <div className="flex flex-col gap-8">
      {/* Achievement Matrix */}
      <div className="glass-panel p-4 relative overflow-hidden bg-sub-panel-bg">
        <h3 className="text-[7px] text-foreground/40 font-bold uppercase mb-4 tracking-widest flex items-center justify-between">
          <span>SCHOLARLY_ACCOLADES</span>
          <span className="text-secondary">06 / 24</span>
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              onClick={() => {
                setSelectedAch(ach);
                onAction(`Retrieving records for accolade: ${ach.title}`, "info");
              }}
              className={`w-full aspect-square border-2 border-foreground/10 flex items-center justify-center text-[8px] font-bold cursor-pointer transition-all hover:border-foreground/40 hover:bg-foreground/5 group relative ${selectedAch?.id === ach.id ? 'border-primary bg-primary/10' : ''}`}
            >
              {ach.icon}
              <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-background/90 transition-opacity">
                <span className="text-[6px] text-foreground font-bold">{ach.code}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Detail Overlay (Inline) */}
        {selectedAch && (
          <div className="mt-4 p-3 bg-sub-panel-bg border border-primary/40 animate-in fade-in slide-in-from-top-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-[8px] text-primary font-bold tracking-widest group-hover:text-gold uppercase">{selectedAch.title}</h4>
              <button onClick={() => setSelectedAch(null)} className="text-[6px] text-foreground/20 hover:text-foreground uppercase font-bold">[X]</button>
            </div>
            <p className="text-[7px] text-foreground/60 leading-tight tracking-tight uppercase">{selectedAch.desc}</p>
          </div>
        )}
      </div>

      {/* Global Rankings */}
      <div className="glass-panel p-4 bg-sub-panel-bg">
        <h3 className="text-[7px] text-foreground/40 font-bold uppercase mb-4 tracking-widest">
          HALL_OF_MASTER_SCHOLARS
        </h3>
        <ul className="flex flex-col gap-2">
          {leaderboard.map((player) => (
            <li
              key={player.rank}
              className="flex items-center justify-between p-2 border border-foreground/5 bg-sub-panel-bg hover:bg-foreground/5 transition-all group cursor-pointer"
              onClick={() => onAction(`Consulting the archives of scholar: ${player.name}`, "info")}
            >
              <div className="flex items-center gap-3">
                <span className={`text-[8px] font-bold ${player.color}`}>{player.rank}</span>
                <span className="text-[8px] font-bold text-foreground/80 group-hover:text-primary transition-colors uppercase">
                  {player.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[7px] text-foreground/20 font-bold">{player.code}</span>
                <span className="text-[8px] font-bold text-gold cursor-help">Coins {player.creds}</span>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="w-full mt-4 text-[6px] text-foreground/20 hover:text-foreground transition-colors uppercase font-bold tracking-tighter text-center"
          onClick={() => onAction("Accessing the Great Scholar Registry...", "warning")}
        >
          VIEW_ALL_SCHOLARS →
        </button>
      </div>

      {/* System Status */}
      <div
        className="px-4 py-3 border-l-2 border-primary/40 bg-primary/5 cursor-pointer"
        onClick={() => onAction("Node Ping: Synchronized (12ms delay)", "info")}
      >
        <p className="text-[6px] text-primary font-bold uppercase tracking-widest mb-1">DATA_NODES_SYNCED</p>
        <div className="flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-primary/20" />
          ))}
          <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
