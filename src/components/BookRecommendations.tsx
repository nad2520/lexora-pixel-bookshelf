import { useGame } from "@/context/GameContext";
import bookFantasy from "@/assets/book-fantasy.png";
import bookMystery from "@/assets/book-mystery.png";
import bookRomance from "@/assets/book-romance.png";

const lootItems = [
  {
    id: "1",
    title: "DRAGON'S GRIMOIRE",
    rarity: "LEGENDARY",
    rarityColor: "text-gold",
    img: bookFantasy,
    author: "ELARA",
    price: 120,
    rating: 5
  },
  {
    id: "2",
    title: "SHADOWS OF NOIR",
    rarity: "RARE",
    rarityColor: "text-primary",
    img: bookMystery,
    author: "THORNE",
    price: 95,
    rating: 4
  },
  {
    id: "3",
    title: "MOONLIT BLOSSOMS",
    rarity: "UNCOMMON",
    rarityColor: "text-secondary",
    img: bookRomance,
    author: "FERN",
    price: 110,
    rating: 5
  },
];

interface LootProps {
  onAction: (msg: string, type?: "info" | "success" | "warning" | "error") => void;
}

const LootCard = ({ item, onAction }: { item: typeof lootItems[0]; onAction: LootProps["onAction"] }) => {
  const { spendCoins, addBook, isBookOwned } = useGame();
  const owned = isBookOwned(item.id);

  const handleAcquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (owned) {
      onAction(`DATA_NODE_ALREADY_SYNCED: ${item.id}`, "warning");
      return;
    }

    if (spendCoins(item.price)) {
      addBook(item.id);
      onAction(`ACQUISITION_SUCCESS: ${item.title}`, "success");
    } else {
      onAction(`ACQUISITION_FAILED: INSUFFICIENT_COINS`, "error");
    }
  };

  return (
    <div
      className="glass-panel p-0 flex flex-col group cursor-pointer hover:-translate-y-2 transition-all duration-500 overflow-hidden relative"
      onClick={() => onAction(`Exploring details of ${item.title}...`, "info")}
    >
      {/* Cinematic Header Overlay */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

      {/* Loot Preview */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/20">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover pixelated opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/60 to-transparent" />

        {/* Rarity Label */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className={`text-[6px] font-bold uppercase tracking-[0.2em] bg-background/80 text-foreground px-2 py-0.5 border-l-2 ${item.rarityColor.replace('text-', 'border-')}`}>
            {item.rarity}
          </span>
        </div>
      </div>

      {/* Loot Data */}
      <div className="p-4 flex flex-col flex-1 bg-sub-panel-bg">
        <h3 className="text-[9px] font-bold text-foreground tracking-widest leading-tight mb-1 group-hover:text-gold transition-colors truncate">
          {item.title}
        </h3>
        <p className="text-[6px] text-foreground/40 italic mb-4">BY {item.author}</p>

        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-2 h-2 border border-foreground/10 flex items-center justify-center`}>
              <div className={`w-1 h-1 ${i < item.rating ? 'bg-gold' : 'bg-foreground/5'}`} />
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-foreground/10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-gold text-[8px] font-bold">Coins </span>
            <span className="text-[10px] font-bold text-foreground/80">{item.price}</span>
          </div>
          <button
            className={`rpg-button py-1 px-4 text-[7px] font-bold z-10 ${owned ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleAcquire}
            disabled={owned}
          >
            {owned ? 'ON SHELF' : 'ADD TO SHELF'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookRecommendations = ({ onAction }: LootProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {lootItems.map((item) => (
        <LootCard key={item.title} item={item} onAction={onAction} />
      ))}
    </div>
  );
};

export default BookRecommendations;
