import { useState } from "react";
import worldMap from "@/assets/world-map.png";

const zones = [
  { id: "fantasy", title: "FANTASY FOREST", pos: "top-1/4 left-1/4", marker: "[ZN_01]", flavor: "Lush greens and hidden magic" },
  { id: "mystery", title: "MYSTERY CITY", pos: "top-1/4 right-1/4", marker: "[ZN_02]", flavor: "Smoke, mirrors, and cold leads" },
  { id: "romance", title: "ROMANCE GARDEN", pos: "bottom-1/4 right-1/4", marker: "[ZN_03]", flavor: "Petals in the wind" },
];

interface WorldMapProps {
  onAction: (msg: string, type?: "info" | "success" | "warning" | "error") => void;
}

const WorldMap = ({ onAction }: WorldMapProps) => {
  const [activeZone, setActiveZone] = useState<typeof zones[0] | null>(null);

  const handleZoneEnter = (zone: typeof zones[0]) => {
    setActiveZone(zone);
    onAction(`Destination Spotted: ${zone.title}`, "info");
  };

  const handleZoneExecution = (zone: typeof zones[0]) => {
    onAction(`Visiting the archives of: ${zone.title}`, "success");
    setActiveZone(null);
  };

  return (
    <div className="relative group overflow-hidden pixel-border-2 bg-background">
      {/* Cinematic Perspective Wrapper */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={worldMap}
          alt="World"
          className={`w-full h-full object-cover pixelated transition-all duration-1000 ${activeZone ? "scale-110 blur-[1px] opacity-60" : "scale-100"}`}
        />

        {/* CRT Scanline Overlay specifically for the map */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px] opacity-20" />

        {/* Hotspots */}
        {!activeZone && zones.map((zone) => (
          <button
            key={zone.id}
            onMouseEnter={() => handleZoneEnter(zone)}
            className={`absolute ${zone.pos} group/spot -translate-x-1/2 -translate-y-1/2 z-10`}
          >
            <div className="flex flex-col items-center">
              <div className="px-2 py-1 bg-background/80 border border-foreground/20 text-[7px] font-bold text-primary animate-float">
                {zone.marker}
              </div>
              <div className="mt-1 px-2 py-0.5 bg-background/90 border border-foreground/10 text-[6px] font-bold text-foreground opacity-0 group-hover/spot:opacity-100 transition-opacity whitespace-nowrap">
                {zone.title}
              </div>
            </div>
          </button>
        ))}

        {/* Zone Focus Overlay */}
        {activeZone && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-sub-panel-bg backdrop-blur-sm z-20 cursor-pointer"
            onMouseLeave={() => setActiveZone(null)}
          >
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <span className="text-2xl font-bold text-primary mb-4 block animate-bounce tracking-widest">{activeZone.marker}</span>
              <h2 className="text-xl md:text-3xl font-bold text-foreground tracking-[0.3em] pixel-text-shadow mb-2">
                {activeZone.title}
              </h2>
              <p className="text-[8px] md:text-[10px] text-accent font-bold uppercase tracking-widest italic opacity-80">
                {activeZone.flavor}
              </p>

              <div className="mt-8 flex gap-4 justify-center">
                <button
                  className="rpg-button primary px-6 py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoneExecution(activeZone);
                  }}
                >
                  VISIT ARCHIVE
                </button>
                <button
                  className="rpg-button px-6 py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveZone(null);
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Letterbox Bars (Cinematic aspect) */}
        <div className="absolute top-0 inset-x-0 h-4 md:h-8 bg-background z-30 flex items-center justify-center">
          <span className="text-[6px] text-foreground/20 font-bold uppercase tracking-[1em]">SANCTUARY PEACEFUL</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-4 md:h-8 bg-background z-30 flex justify-between px-4 items-center">
          <span className="text-[6px] text-primary font-bold">POS: 42.1N / 88.5W</span>
          <span className="text-[6px] text-foreground/20 font-bold">CORE_MAP_v3.0</span>
        </div>
      </div>

      {/* Golden Library Gate Overlay (Fixed position) */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 cursor-help"
        onClick={() => onAction("ACCESS_DENIED: MASTER_SCHOLAR_LEVEL_04_REQUIRED", "error")}
      >
        <div className="px-4 py-1 bg-gold/10 border border-gold/40 text-[7px] text-gold font-bold animate-pulse">
          [RESTRICTED_AREA]
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
