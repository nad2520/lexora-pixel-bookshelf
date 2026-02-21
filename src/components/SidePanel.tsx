const badges = ["📕", "📗", "📘", "📙", "🏅", "⭐"];

const questLog = [
  { text: "Read 1 Fantasy book", done: false },
  { text: "Write a book review", done: false },
  { text: "Visit Mystery City", done: false },
  { text: "Share a recommendation", done: false },
];

const leaderboard = [
  { rank: 1, name: "Elara", coins: 420, emoji: "👑" },
  { rank: 2, name: "Thorne", coins: 385, emoji: "🥈" },
  { rank: 3, name: "Fern", coins: 310, emoji: "🥉" },
];

const SidePanel = () => {
  return (
    <div className="space-y-3">
      {/* Monthly Progress */}
      <div className="rpg-panel p-3">
        <h3 className="text-[9px] text-primary pixel-text-shadow mb-2">
          🗓️ Monthly Progress
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="w-full aspect-square pixel-border bg-muted flex items-center justify-center text-lg opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Quest Log */}
      <div className="rpg-panel p-3">
        <h3 className="text-[9px] text-secondary pixel-text-shadow mb-2">
          📋 Quest Log
        </h3>
        <ul className="space-y-2">
          {questLog.map((q, i) => (
            <li key={i} className="flex items-center gap-2 text-[7px]">
              <div
                className={`w-4 h-4 pixel-border flex items-center justify-center text-[6px] ${
                  q.done ? "bg-hp-bar-fill text-secondary-foreground" : "bg-muted"
                }`}
              >
                {q.done ? "✓" : ""}
              </div>
              <span className={q.done ? "text-muted-foreground line-through" : "text-foreground"}>
                {q.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Leaderboard */}
      <div className="rpg-panel p-3">
        <h3 className="text-[9px] text-gold pixel-text-shadow mb-2">
          🏆 Ranking
        </h3>
        <ul className="space-y-2">
          {leaderboard.map((player) => (
            <li
              key={player.rank}
              className="flex items-center justify-between text-[7px] rpg-panel px-2 py-1"
            >
              <div className="flex items-center gap-2">
                <span>{player.emoji}</span>
                <span className="text-foreground">{player.name}</span>
              </div>
              <span className="text-gold">🪙 {player.coins}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
