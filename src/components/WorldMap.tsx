import worldMap from "@/assets/world-map.png";

const WorldMap = () => {
  return (
    <div className="rpg-panel p-2 relative overflow-hidden">
      <img
        src={worldMap}
        alt="Lexora World Map"
        className="w-full rounded-sm pixel-border"
      />
      {/* Quest Badge overlay */}
      <div className="absolute top-6 left-6 animate-float">
        <div className="rpg-panel px-2 py-1 text-[7px] text-accent bg-card/90">
          ⚔️ New Quest!
        </div>
      </div>
      {/* Golden Gate label */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="pixel-border-gold px-3 py-1 text-[7px] text-gold bg-card/90 text-center animate-glow">
          🔒 Golden Library Gate
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
