import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import PixelHeader from "@/components/PixelHeader";
import SystemLog from "@/components/SystemLog";
import bookFantasy from "@/assets/book-fantasy.png";
import bookMystery from "@/assets/book-mystery.png";
import bookRomance from "@/assets/book-romance.png";

const ALL_BOOKS = [
    { id: "1", title: "DRAGON'S GRIMOIRE", genre: "FANTASY", author: "ELARA", price: "120", rarity: "LEGENDARY", img: bookFantasy, desc: "A forgotten tome containing the elemental secrets of the first drakes. Highly volatile data structure." },
    { id: "2", title: "SHADOWS OF NOIR", genre: "MYSTERY", author: "THORNE", price: "95", rarity: "RARE", img: bookMystery, desc: "Defragment the mysteries of a city that never sleeps. Encrypted with 256-bit shadow logic." },
    { id: "3", title: "MOONLIT BLOSSOMS", genre: "ROMANCE", author: "FERN", price: "110", rarity: "UNCOMMON", img: bookRomance, desc: "A delicate data sequence exploring the biological resonance of moon-flower petals." },
    { id: "4", title: "NEBULA HUNTER", genre: "SCI-FI", author: "COSMO", price: "150", rarity: "MYTHIC", img: bookFantasy, desc: "Trace the signal of the rogue hunter across the Great Divide. Requires Level 4 transmission sync." },
    { id: "5", title: "SILENT ECHO", genre: "THRILLER", author: "GHOST", price: "80", rarity: "COMMON", img: bookMystery, desc: "A low-frequency signal that repeats in the static. Do not listen for too long." },
    { id: "6", title: "VALLEY OF KINGS", genre: "HISTORY", author: "SCRIBE", price: "200", rarity: "RARE", img: bookRomance, desc: "The historical logs of the ancient kings, recovered from the deepest strata of the vault." },
    { id: "7", title: "FORBIDDEN LOGIC", genre: "TECH", author: "CYBER", price: "300", rarity: "LEGENDARY", img: bookFantasy, desc: "The foundational code of the library itself. ACCESS_RESTRICTED." },
    { id: "8", title: "PETAL DRIFT", genre: "POETRY", author: "MUSE", price: "40", rarity: "COMMON", img: bookRomance, desc: "Fragmented memories stored in a low-priority cache." },
];

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isBookOwned, spendCoins, addBook } = useGame();
    const [book, setBook] = useState<typeof ALL_BOOKS[0] | null>(null);
    const [logs, setLogs] = useState<{ id: number; message: string; type: "info" | "success" | "warning" | "error"; timestamp: string }[]>([
        { id: 1, message: "Opening the archives...", type: "info", timestamp: "13:05" },
    ]);

    useEffect(() => {
        const found = ALL_BOOKS.find(b => b.id === id);
        if (found) {
            setBook(found);
            logAction(`Book identified: ${found.title}`, "success");
        } else {
            navigate("/browse");
        }
    }, [id]);

    const logAction = useCallback((message: string, type: "info" | "success" | "warning" | "error" = "info") => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLogs(prev => [...prev, { id: Date.now(), message, type, timestamp }]);
    }, []);

    if (!book) return null;

    return (
        <div className="min-h-screen selection:bg-accent selection:text-accent-foreground pb-12">
            <PixelHeader onAction={logAction} />

            <main className="pt-24 px-4 md:px-8 max-w-[1200px] mx-auto animate-in zoom-in duration-500">

                {/* Navigation / Back */}
                <button
                    onClick={() => navigate("/browse")}
                    className="text-[8px] font-bold text-foreground/40 hover:text-foreground hover:translate-x-1 transition-all uppercase tracking-widest mb-12 flex items-center gap-2"
                >
                    {"<"} RETURN_TO_ARCHIVE
                </button>

                {/* Deep Scan Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

                    {/* Focal Subject (Book Cover) */}
                    <div className="lg:col-span-4">
                        <div className="glass-panel p-2 border-4 border-foreground relative bg-sub-panel-bg overflow-hidden group">
                            <img src={book.img} alt={book.title} className="w-full aspect-[3/4] object-cover pixelated group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary shadow-[0_0_10px_rgba(255,20,147,0.5)]" />
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <div className="flex justify-between text-[6px] font-bold text-foreground/40 uppercase">
                                <span>DATA_STABILITY</span>
                                <span>98.4%</span>
                            </div>
                            <div className="h-1 bg-foreground/5 overflow-hidden border border-foreground/10">
                                <div className="h-full bg-secondary w-[98%] animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Metadata Display */}
                    <div className="lg:col-span-8 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] text-primary font-bold tracking-[0.3em] font-mono">{book.id}</span>
                                <span className="w-2 h-2 bg-primary" />
                                <span className="text-[10px] text-foreground/20 font-bold uppercase tracking-widest">{book.rarity}</span>
                            </div>
                            <h2 className="text-2xl md:text-5xl font-bold text-foreground tracking-[0.1em] pixel-text-shadow leading-tight mb-4 uppercase">
                                {book.title}
                            </h2>
                            <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-8">
                                ORIGIN_SCRIBE: {book.author}
                            </p>
                        </div>

                        <div className="glass-panel p-6 border border-foreground/5 bg-foreground/[0.02]">
                            <h3 className="text-[8px] text-foreground/40 font-bold uppercase mb-4 tracking-widest">SYNOPSIS_LOG</h3>
                            <p className="text-[12px] md:text-[14px] text-foreground/80 leading-relaxed uppercase tracking-tight">
                                {book.desc}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-sub-panel-bg border-l-2 border-primary">
                                <p className="text-[6px] text-foreground/40 font-bold uppercase mb-1">COIN_COST</p>
                                <p className="text-[12px] text-gold font-bold">COIN_{book.price}</p>
                            </div>
                            <div className="p-4 bg-sub-panel-bg border-l-2 border-secondary">
                                <p className="text-[6px] text-foreground/40 font-bold uppercase mb-1">GENRE_NODE</p>
                                <p className="text-[10px] text-foreground font-bold">{book.genre}</p>
                            </div>
                            <div className="p-4 bg-sub-panel-bg border-l-2 border-foreground/20">
                                <p className="text-[6px] text-foreground/40 font-bold uppercase mb-1">TOTAL_SCAN_TIME</p>
                                <p className="text-[10px] text-foreground font-bold">14h 22m</p>
                            </div>
                            <div className="p-4 bg-sub-panel-bg border-l-2 border-foreground/20">
                                <p className="text-[6px] text-foreground/40 font-bold uppercase mb-1">COMPATIBILITY</p>
                                <p className="text-[10px] text-secondary font-bold">HIGH</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8">
                            <button
                                className={`rpg-button primary px-10 py-4 text-[12px] font-bold ${isBookOwned(book.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => {
                                    if (isBookOwned(book.id)) return;
                                    if (spendCoins(Number(book.price))) {
                                        addBook(book.id);
                                        logAction(`${book.title} added to your sanctuary shelf`, "success");
                                    }
                                }}
                                disabled={isBookOwned(book.id)}
                            >
                                {isBookOwned(book.id) ? "ON_SHELF" : "ADD_TO_SHELF"}
                            </button>
                            <button
                                className={`rpg-button px-10 py-4 text-[12px] font-bold ${!isBookOwned(book.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => {
                                    if (!isBookOwned(book.id)) {
                                        logAction(`Sanctuary error: Must add to shelf before reading`, "error");
                                        return;
                                    }
                                    navigate(`/reader/${book.id}`);
                                }}
                            >
                                READ BOOK
                            </button>
                        </div>
                    </div>
                </div>

                {/* Console Log Sub-Terminal */}
                <div className="max-w-md">
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <span className="w-2 h-2 bg-foreground/20" />
                        <h2 className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Subject Terminal</h2>
                    </div>
                    <SystemLog logs={logs} />
                </div>

            </main>
        </div>
    );
};

export default BookDetails;
