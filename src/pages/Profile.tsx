import { useState, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { ALL_BOOKS } from "./BrowseBooks";
import PixelHeader from "@/components/PixelHeader";
import SystemLog from "@/components/SystemLog";

const Profile = () => {
    const { ownedBooks, level, coins, getScholarTitle } = useGame();
    const [logs, setLogs] = useState<{ id: number; message: string; type: "info" | "success" | "warning" | "error"; timestamp: string }[]>([
        { id: 1, message: "Profile Registry Accessed", type: "success", timestamp: "13:14" },
        { id: 2, message: "Syncing personal data nodes...", type: "info", timestamp: "13:14" },
    ]);

    const ownedData = ALL_BOOKS.filter(book => ownedBooks.includes(book.id));

    const logAction = useCallback((message: string, type: "info" | "success" | "warning" | "error" = "info") => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLogs(prev => [...prev, { id: Date.now(), message, type, timestamp }]);
    }, []);

    return (
        <div className="min-h-screen selection:bg-accent selection:text-accent-foreground pb-12">
            <PixelHeader onAction={logAction} />

            <main className="pt-24 px-4 md:px-8 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Avatar & Basic Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="glass-panel p-8 text-center relative overflow-hidden group bg-sub-panel-bg">
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                            <div className="w-32 h-32 mx-auto mb-6 bg-card border-4 border-primary relative">
                                <div className="absolute inset-2 bg-primary/20 animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-[32px]">[M_S]</div>
                            </div>
                            <h2 className="text-[18px] font-bold text-foreground tracking-widest uppercase mb-2">MASTER_SCHOLAR</h2>
                            <p className="text-[8px] text-accent font-bold uppercase tracking-widest opacity-60 mb-6">TITLE: {getScholarTitle().toUpperCase()}</p>

                            <div className="flex justify-center gap-4">
                                <div className="px-3 py-1 bg-foreground/5 border border-foreground/10 text-[6px] font-bold uppercase">LVL {level}</div>
                                <div className="px-3 py-1 bg-foreground/5 border border-foreground/10 text-[6px] font-bold uppercase">RANK 07</div>
                            </div>
                        </div>

                        <div className="glass-panel p-6 border-l-4 border-secondary bg-secondary/5 space-y-4">
                            <h3 className="text-[8px] font-bold text-secondary uppercase tracking-widest">Global Standing</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-bold">
                                    <span className="text-foreground/40">PERCENTILE</span>
                                    <span className="text-foreground">TOP 2.4%</span>
                                </div>
                                <div className="h-1 bg-foreground/5 overflow-hidden">
                                    <div className="h-full bg-secondary w-[97.6%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Data & History */}
                    <div className="lg:col-span-8 space-y-12">

                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-primary" />
                                <h2 className="text-[12px] font-bold text-primary uppercase tracking-widest">Operational Metrics</h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                {[
                                    { label: "PAGES_READ", value: "1,242", color: "text-foreground" },
                                    { label: "READ_STREAK", value: "99.2%", color: "text-secondary" },
                                    { label: "HOURS_SPENT", value: "842h", color: "text-foreground" },
                                    { label: "COIN_FLUX", value: "+14.2%", color: "text-gold" },
                                    { label: "REPUTATION", value: "MASTER", color: "text-primary" },
                                    { label: "MASTERY", value: "MAX", color: "text-secondary" },
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-sub-panel-bg p-4 border border-foreground/5 hover:border-foreground/20 transition-colors">
                                        <p className="text-[6px] text-foreground/40 font-bold uppercase mb-2">{stat.label}</p>
                                        <p className={`text-[12px] font-bold ${stat.color}`}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-secondary" />
                                <h2 className="text-[12px] font-bold text-secondary uppercase tracking-widest">The Scholar's Shelf</h2>
                            </div>

                            {ownedData.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {ownedData.map(book => (
                                        <div key={book.id} className="p-4 bg-card/60 border border-foreground/10 flex items-center justify-between group hover:border-secondary/40 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-14 bg-background border border-foreground/10 overflow-hidden">
                                                    <img src={book.img} className="w-full h-full object-cover pixelated opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt="" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-foreground uppercase tracking-widest">{book.title}</p>
                                                    <p className="text-[6px] text-foreground/40 uppercase tracking-tighter">{book.genre} // BOOK_ID_{book.id}</p>
                                                </div>
                                            </div>
                                            <div className="text-[6px] text-secondary font-bold uppercase tracking-widest animate-pulse">Archived</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 border-2 border-dashed border-foreground/5 text-center">
                                    <p className="text-[8px] text-foreground/20 font-bold uppercase tracking-widest">Your shelf is currently empty.</p>
                                </div>
                            )}
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-accent" />
                                <h2 className="text-[10px] font-bold text-accent uppercase tracking-widest">Social Registry</h2>
                            </div>

                            <div className="glass-panel p-0 border border-foreground/10 bg-sub-panel-bg overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-foreground/10 bg-foreground/5">
                                            <th className="p-4 text-[7px] font-bold text-foreground/40 uppercase tracking-widest">Scholar</th>
                                            <th className="p-4 text-[7px] font-bold text-foreground/40 uppercase tracking-widest">Relation</th>
                                            <th className="p-4 text-[7px] font-bold text-foreground/40 uppercase tracking-widest text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: "ELARA", rel: "ALLY", status: "STABLE" },
                                            { name: "THORNE", rel: "NEUTRAL", status: "OFFLINE" },
                                            { name: "FERN", rel: "MENTOR", status: "SYNCING" },
                                        ].map((friend) => (
                                            <tr key={friend.name} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                                                <td className="p-4 text-[9px] font-bold text-foreground uppercase">{friend.name}</td>
                                                <td className="p-4 text-[7px] font-bold text-foreground/40 uppercase">{friend.rel}</td>
                                                <td className="p-4 text-right text-[7px] font-bold text-secondary uppercase">{friend.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className="max-w-md ml-auto">
                            <div className="flex items-center gap-2 mb-3 px-1">
                                <span className="w-2 h-2 bg-foreground/20" />
                                <h2 className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Profile Event Logs</h2>
                            </div>
                            <SystemLog logs={logs} />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Profile;
