import bookFantasy from "@/assets/book-fantasy.png";
import bookMystery from "@/assets/book-mystery.png";
import bookRomance from "@/assets/book-romance.png";

const books = [
  {
    title: "Dragon's Grimoire",
    genre: "Fantasy",
    rating: 4.5,
    img: bookFantasy,
    color: "border-forest-light",
  },
  {
    title: "Shadows of Noir",
    genre: "Mystery",
    rating: 4.2,
    img: bookMystery,
    color: "border-mystery-light",
  },
  {
    title: "Moonlit Blossoms",
    genre: "Romance",
    rating: 4.7,
    img: bookRomance,
    color: "border-romance",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="text-[8px] text-gold">
      {"★".repeat(full)}
      {half && "☆"}
      {"·".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
};

const BookRecommendations = () => {
  return (
    <div className="rpg-panel p-3">
      <h3 className="text-[9px] text-primary pixel-text-shadow mb-3">
        📚 Recommended for You
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {books.map((book) => (
          <div
            key={book.title}
            className={`rpg-panel p-2 hover:scale-[1.02] transition-transform cursor-pointer border-2 ${book.color}`}
          >
            <img
              src={book.img}
              alt={book.title}
              className="w-full aspect-[3/4] object-cover rounded-sm pixel-border mb-2"
            />
            <p className="text-[7px] text-foreground font-bold truncate">{book.title}</p>
            <p className="text-[6px] text-muted-foreground">{book.genre}</p>
            <StarRating rating={book.rating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecommendations;
