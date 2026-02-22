import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_BOOKS } from "./BrowseBooks";
import { useGame } from "@/context/GameContext";
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, Maximize2, Minimize2 } from "lucide-react";

const Reader = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addXP, addCoins } = useGame();
    const [book, setBook] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [fontSize, setFontSize] = useState("text-[14px]");
    const [rewardedPages, setRewardedPages] = useState<Set<number>>(new Set());

    useEffect(() => {
        const found = ALL_BOOKS.find(b => b.id === id);
        if (found) {
            setBook(found);
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    // Reward XP and Coins every 5 pages
    useEffect(() => {
        if (page > 1 && page % 5 === 0 && !rewardedPages.has(page)) {
            addXP(25);
            addCoins(10, true); // Silent reward to avoid overloading notifications
            setRewardedPages(prev => new Set(prev).add(page));
        }
    }, [page, addXP, addCoins, rewardedPages]);

    if (!book) return null;

    const dummyText = [
        "In the heart of the sanctuary, the light falls in patterns of ancient gold. The scholar reached for the first tome, its weight familiar and heavy with promise.",
        "The whispers of the archives grew silent as the link established. Every word was a coordinate, every sentence a path through the unfolded history of the world.",
        "The bloom of the moon-flower petals resonated at a frequency that defied ordinary logic. It was biological poetry, stored in a medium of pure mastery.",
        "To read is to bridge the gap between memory and survival. In the quiet of the reading lounge, the echoes of the kings resonated once more.",
        "The digital grain of the paper felt warm under the glow of the sanctuary lectern. This was not just data; it was the essence of the scholar's journey."
    ];

    return (
        <div className={`min-h-screen bg-background transition-all duration-700 ${isFocusMode ? "cursor-none" : ""}`}>
            {/* Minimal Header */}
            <header className={`fixed top-0 inset-x-0 p-4 flex justify-between items-center transition-opacity duration-500 z-50 ${isFocusMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[8px] font-bold text-foreground/40 hover:text-foreground transition-colors uppercase tracking-widest"
                >
                    <ArrowLeft size={12} />
                    Leave Sanctuary
                </button>
                <div className="text-center">
                    <h1 className="text-[10px] text-foreground font-bold uppercase tracking-[0.2em]">{book.title}</h1>
                    <p className="text-[6px] text-accent font-bold uppercase tracking-widest">CHAPTER_{page}</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setIsFocusMode(!isFocusMode)} className="text-foreground/40 hover:text-foreground transition-colors">
                        {isFocusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                    <button className="text-foreground/40 hover:text-foreground transition-colors">
                        <Settings size={16} />
                    </button>
                </div>
            </header>

            {/* Reading Canvas */}
            <main className="flex justify-center items-center min-h-screen p-4 pt-20">
                <div className="relative w-full max-w-[800px] aspect-[3/4] md:aspect-[4/3] bg-card glass-panel p-8 md:p-16 flex flex-col justify-between shadow-2xl animate-in fade-in zoom-in duration-1000 border-2 border-foreground/5">
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                    <div className={`reading-content leading-relaxed text-foreground transition-all duration-500 ${fontSize} text-justify font-serif`}>
                        <p className="mb-6 first-letter:text-4xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                            {dummyText[(page - 1) % dummyText.length]}
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.
                            Aenean quis neque ac magna hendrerit molestie. Ut vehicula, libero molestie
                            accumsan mollis, nulla mauris vestibulum nisl, ac egestas erat nunc sit amet magna.
                            The mastery of the written word is the highest virtue in Lexora.
                        </p>
                    </div>

                    <div className="flex justify-between items-center mt-8 pt-8 border-t border-foreground/5">
                        <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Scholar Focus: Steady</span>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="p-2 border border-foreground/10 hover:bg-foreground/5 disabled:opacity-20 transition-all rounded-sm text-foreground"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-[10px] font-bold text-foreground/60 flex items-center">{page}</span>
                            <button
                                onClick={() => setPage(page + 1)}
                                className="p-2 border border-foreground/10 hover:bg-foreground/5 transition-all rounded-sm text-foreground"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Focus Instruction Overlay */}
            {!isFocusMode && (
                <div className="fixed bottom-8 inset-x-0 flex justify-center animate-bounce">
                    <p className="text-[6px] text-foreground/20 font-bold uppercase tracking-widest">Scroll or click indicators to navigate</p>
                </div>
            )}
        </div>
    );
};

export default Reader;
