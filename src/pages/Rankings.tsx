import { useState, useCallback } from "react";
import PixelHeader from "@/components/PixelHeader";
import SystemLog from "@/components/SystemLog";

const GLOBAL_LEADERBOARD = [
    { rank: "01", name: "ELARA", creds: 1420, level: 50, titles: ["ANCIENT_SCRIBE", "GATE_KEEPER"], status: "ONLINE" },
    { rank: "02", name: "THORNE", creds: 1385, level: 48, titles: ["SHADOW_WALKER"], status: "ONLINE" },
    { rank: "03", name: "FERN", creds: 1310, level: 47, titles: ["NATURE_LINK"], status: "AWAY" },
    { rank: "04", name: "COSMO", creds: 1250, level: 45, titles: ["NEBULA_PILOT"], status: "OFFLINE" },
    { rank: "05", name: "GHOST", creds: 1100, level: 42, titles: ["SILENT_SIGNAL"], status: "ONLINE" },
];

const Rankings = () => {
    const [logs, setLogs] = useState<{ id: number; message: string; type: "info" | "success" | "warning" | "error"; timestamp: string }[]>([
        { id: 1, message: "Mainframe Connection Stable", type: "success", timestamp: "13:10" },
        { id: 2, message: "Syncing User Registries...", type: "info", timestamp: "13:10" },
    ]);

    const logAction = useCallback((message: string, type: "info" | "success" | "warning" | "error" = "info") => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLogs(prev => [...prev, { id: Date.now(), message, type, timestamp }]);
    }, []);

    return (
        <div className="min-h-screen selection:bg-accent selection:text-accent-foreground pb-12">
            <PixelHeader onAction={logAction} />

            <main className="pt-24 px-4 md:px-8 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

                <div className="flex flex-col md:flex-row gap-12 items-start">

                    {/* Section 1: Global Mainframe (Leaderboard) */}
                    <div className="flex-1 w-full space-y-6">
                        <div className="flex items-center gap-3 px-1">
                            <span className="w-2 h-2 bg-primary" />
                            <h2 className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] pixel-text-shadow">
                                Hall of Master Scribes
                            </h2>
                        </div>

                        <div className="glass-panel p-0 border border-foreground/10 bg-sub-panel-bg overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-foreground/10 bg-foreground/5">
                                        <th className="p-4 text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Mastery</th>
                                        <th className="p-4 text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Scribe</th>
                                        <th className="p-4 text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Lvl</th>
                                        <th className="p-4 text-[8px] font-bold text-foreground/40 uppercase tracking-widest text-right">Coins</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {GLOBAL_LEADERBOARD.map((user) => (
                                        <tr key={user.rank} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors group cursor-crosshair">
                                            <td className="p-4 text-[10px] font-bold text-foreground/20 group-hover:text-primary transition-colors">{user.rank}</td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">{user.name}</span>
                                                    <span className="text-[6px] text-foreground/20 font-bold uppercase tracking-tighter">{user.titles[0]}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-[10px] font-bold text-secondary">{user.level}</td>
                                            <td className="p-4 text-right text-[10px] font-bold text-gold">Coins {user.creds}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section 2: Player Registry & Stats */}
                    <div className="w-full md:w-80 lg:w-96 space-y-8">
                        <div className="flex items-center gap-3 px-1">
                            <span className="w-2 h-2 bg-accent" />
                            <h2 className="text-[10px] font-bold text-accent uppercase tracking-widest">Scholar's Personal Status</h2>
                        </div>

                        {/* Character Card */}
                        <div className="glass-panel p-6 border-2 border-accent/20 bg-accent/5">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-card border-2 border-accent relative">
                                    <div className="absolute inset-0 bg-accent/10 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-foreground tracking-widest uppercase mb-1">Elite Scribe</h3>
                                    <p className="text-[7px] text-accent font-bold uppercase tracking-widest opacity-60">Status: Well-Read</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[7px] font-bold text-foreground/40 uppercase mb-2">
                                        <span>STUDY_PROGRESS</span>
                                        <span className="text-foreground">88%</span>
                                    </div>
                                    <div className="h-1 bg-foreground/5 border border-foreground/10">
                                        <div className="h-full bg-accent w-[88%]" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-sub-panel-bg p-3 border border-foreground/5">
                                        <p className="text-[6px] text-foreground/40 font-bold uppercase mb-1">BOOKS_ARCHIVED</p>
                                        <p className="text-[10px] text-foreground font-bold">142</p>
                                    </div>
                                    <div className="bg-sub-panel-bg p-3 border border-foreground/5">
                                        <p className="text-[6px] text-foreground/40 font-bold uppercase mb-1">TOTAL_STUDY_TIME</p>
                                        <p className="text-[10px] text-foreground font-bold">1.2K h</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Local Event Monitoring */}
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-3 px-1">
                                <span className="w-2 h-2 bg-foreground/20" />
                                <h2 className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Sanctuary Journal</h2>
                            </div>
                            <SystemLog logs={logs} />
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
};

export default Rankings;
