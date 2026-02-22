import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PixelHeader from "@/components/PixelHeader";
import SystemLog from "@/components/SystemLog";
import bookFantasy from "@/assets/book-fantasy.png";
import bookMystery from "@/assets/book-mystery.png";
import bookRomance from "@/assets/book-romance.png";

export const ALL_BOOKS = [
    { id: "1", title: "DRAGON'S GRIMOIRE", genre: "FANTASY", author: "ELARA", price: "120", rarity: "LEGENDARY", img: bookFantasy },
    { id: "2", title: "SHADOWS OF NOIR", genre: "MYSTERY", author: "THORNE", price: "95", rarity: "RARE", img: bookMystery },
    { id: "3", title: "MOONLIT BLOSSOMS", genre: "ROMANCE", author: "FERN", price: "110", rarity: "UNCOMMON", img: bookRomance },
    { id: "4", title: "NEBULA HUNTER", genre: "SCI-FI", author: "COSMO", price: "150", rarity: "MYTHIC", img: bookFantasy },
    { id: "5", title: "SILENT ECHO", genre: "THRILLER", author: "GHOST", price: "80", rarity: "COMMON", img: bookMystery },
    { id: "6", title: "VALLEY OF KINGS", genre: "HISTORY", author: "SCRIBE", price: "200", rarity: "RARE", img: bookRomance },
    { id: "7", title: "FORBIDDEN LOGIC", genre: "TECH", author: "CYBER", price: "300", rarity: "LEGENDARY", img: bookFantasy },
    { id: "8", title: "PETAL DRIFT", genre: "POETRY", author: "MUSE", price: "40", rarity: "COMMON", img: bookRomance },
];

const CATEGORIES = ["ALL", "FANTASY", "MYSTERY", "ROMANCE", "SCI-FI", "THRILLER", "HISTORY", "TECH", "POETRY"];

const BrowseBooks = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("TITLE");
    const [logs, setLogs] = useState<{ id: number; message: string; type: "info" | "success" | "warning" | "error"; timestamp: string }[]>([
        { id: 1, message: "Sanctuary Archive Linked", type: "success", timestamp: "13:02" },
        { id: 2, message: "Indexing Catalog: 8 volumes identified", type: "info", timestamp: "13:02" },
    ]);

    const logAction = useCallback((message: string, type: "info" | "success" | "warning" | "error" = "info") => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLogs(prev => [...prev, { id: Date.now(), message, type, timestamp }]);
    }, []);

    const filteredBooks = ALL_BOOKS
        .filter(book => (
            (category === "ALL" || book.genre === category) &&
            (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()))
        ))
        .sort((a, b) => {
            if (sortBy === "PRICE_ASC") return Number(a.price) - Number(b.price);
            if (sortBy === "PRICE_DESC") return Number(b.price) - Number(a.price);
            return a.title.localeCompare(b.title);
        });

    return (
        <div className="min-h-screen selection:bg-accent selection:text-accent-foreground pb-12">
            <PixelHeader onAction={logAction} />

            <main className="pt-24 px-4 md:px-8 max-w-[1400px] mx-auto animate-in fade-in duration-700">

                {/* Search & Filter Terminal */}
                <div className="glass-panel p-6 mb-12 space-y-8 bg-sub-panel-bg">
                    <div className="flex flex-col md:flex-row gap-8 items-end">
                        <div className="flex-1 space-y-2 w-full">
                            <label className="text-[8px] font-bold text-primary tracking-[0.2em]">SEARCH_INPUT // SCRIBE</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-[8px]">{">"}</span>
                                <input
                                    type="text"
                                    placeholder="SEARCH TITLES OR SCRIBES..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-card/60 border-2 border-primary/20 px-8 py-4 text-[10px] text-foreground focus:border-primary outline-none tracking-widest uppercase placeholder:opacity-30"
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-64 space-y-2">
                            <label className="text-[8px] font-bold text-secondary tracking-[0.2em]">GENRE_FILTER</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-card/60 border-2 border-secondary/20 px-4 py-4 text-[10px] text-foreground focus:border-secondary outline-none tracking-widest uppercase appearance-none cursor-pointer"
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="w-full md:w-64 space-y-2">
                            <label className="text-[8px] font-bold text-accent tracking-[0.2em]">SORT_BY</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-card/60 border-2 border-accent/20 px-4 py-4 text-[10px] text-foreground focus:border-accent outline-none tracking-widest uppercase appearance-none cursor-pointer"
                            >
                                <option value="TITLE">TITLE [A-Z]</option>
                                <option value="PRICE_ASC">PRICE [LOW]</option>
                                <option value="PRICE_DESC">PRICE [HIGH]</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-[7px] text-foreground/40 font-bold uppercase tracking-widest border-t border-foreground/5 pt-4">
                        <span>Archive Catalog Status: Active</span>
                        <span>Matches: {filteredBooks.length} / {ALL_BOOKS.length}</span>
                    </div>
                </div>

                {/* Library Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {filteredBooks.map((book) => (
                        <Link
                            to={`/book/${book.id}`}
                            key={book.id}
                            className="glass-panel p-0 group hover:-translate-y-2 transition-all duration-500 overflow-hidden relative cursor-pointer"
                            onClick={() => logAction(`Opening Volume: ${book.title}`, "info")}
                        >
                            <div className="aspect-[3/4] overflow-hidden bg-muted/20 relative">
                                <img src={book.img} alt={book.title} className="w-full h-full object-cover pixelated opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-background/80 border border-foreground/10 text-[6px] font-bold text-foreground uppercase">{book.genre}</div>
                                <div className="absolute bottom-0 inset-x-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </div>
                            <div className="p-4 bg-sub-panel-bg">
                                <h3 className="text-[9px] font-bold text-foreground tracking-widest mb-1 truncate uppercase">{book.title}</h3>
                                <p className="text-[6px] text-foreground/40 mb-3 uppercase tracking-tighter">By {book.author}</p>
                                <div className="flex justify-between items-center pt-2 border-t border-foreground/5">
                                    <span className="text-gold text-[8px] font-bold tracking-widest">COIN_{book.price}</span>
                                    <span className="text-[6px] text-foreground/20 font-bold uppercase tracking-widest">{book.rarity}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Event Monitoring */}
                <div className="max-w-md ml-auto">
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <span className="w-2 h-2 bg-foreground/20" />
                        <h2 className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Local Session Log</h2>
                    </div>
                    <SystemLog logs={logs} />
                </div>
            </main>
        </div>
    );
};

export default BrowseBooks;
