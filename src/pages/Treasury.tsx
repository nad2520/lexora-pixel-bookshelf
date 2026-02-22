import { useState } from "react";
import { useGame } from "@/context/GameContext";
import PixelHeader from "@/components/PixelHeader";
import SystemLog from "@/components/SystemLog";
import { Circle, Package, Trophy, CreditCard, Sparkles } from "lucide-react";

const Treasury = () => {
    const { coins, addCoins, claimDailyGift, spinWheel, lastDailyClaim, getScholarTitle } = useGame();
    const [isSpinning, setIsSpinning] = useState(false);
    const [wheelResult, setWheelResult] = useState<string | null>(null);

    const [logs, setLogs] = useState<{ id: number; message: string; type: "info" | "success" | "warning" | "error"; timestamp: string }[]>([
        { id: 1, message: "Imperial Treasury Link Established", type: "success", timestamp: "14:10" },
    ]);

    const logAction = (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLogs(prev => [...prev, { id: Date.now(), message, type, timestamp }]);
    };

    const bundles = [
        {
            id: "penny",
            name: "SCRIBE'S PENNY",
            amount: 100,
            price: "$0.99",
            icon: <Circle className="text-gold animate-pulse" size={32} />,
            color: "text-gold",
            popular: false
        },
        {
            id: "purse",
            name: "SCHOLAR'S PURSE",
            amount: 600,
            price: "$4.99",
            icon: <Package className="text-primary" size={40} />,
            color: "text-primary",
            popular: true
        },
        {
            id: "vault",
            name: "IMPERIAL VAULT",
            amount: 2500,
            price: "$19.99",
            icon: <Trophy className="text-secondary" size={48} />,
            color: "text-secondary",
            popular: false
        }
    ];

    const handlePurchase = (bundle: typeof bundles[0]) => {
        logAction(`Processing transaction: ${bundle.name}...`, "info");
        setTimeout(() => {
            addCoins(bundle.amount);
            logAction(`TRANSACTION_SUCCESS: +${bundle.amount} Coins added to vault`, "success");
        }, 800);
    };

    const handleClaimDaily = () => {
        if (claimDailyGift()) {
            logAction("DAILY_GIFT_CLAIMED: +50 Coins", "success");
        }
    };

    const handleSpin = () => {
        const cost = 25;
        if (coins < cost) {
            logAction("SPIN_FAILED: INSUFFICIENT_COINS", "error");
            return;
        }

        setIsSpinning(true);
        setWheelResult(null);
        logAction(`Initiating Archive-Spin (Cost: ${cost})...`, "info");

        const result = spinWheel(cost);

        // Calculate rotation: 5 full turns + (segment index * 45 degrees) + offset to center
        const rotations = 5;
        const degreesPerSegment = 45;
        const offset = degreesPerSegment / 2;
        const finalRotation = (rotations * 360) + (result.segmentIndex * degreesPerSegment) + offset;

        const wheel = document.getElementById('rpg-wheel');
        if (wheel) {
            wheel.style.setProperty('--target-rotation', `${-finalRotation}deg`);
        }

        setTimeout(() => {
            setIsSpinning(false);
            if (result.success) {
                setWheelResult(result.message);
                logAction(`SPIN_COMPLETE: ${result.message}`, result.reward > cost ? "success" : "info");
            }
        }, 4000);
    };

    const segments = [
        { color: "bg-cyan-400", icon: <Trophy size={16} />, label: "DIAMOND", reward: "500" },
        { color: "bg-orange-400", icon: <Sparkles size={16} />, label: "GOLD", reward: "125" },
        { color: "bg-slate-300", icon: <Circle size={16} />, label: "SILVER", reward: "50" },
        { color: "bg-amber-600", icon: <Package size={16} />, label: "BRONZE", reward: "25" },
        { color: "bg-amber-700", icon: <Package size={16} />, label: "BRONZE", reward: "25" },
        { color: "bg-zinc-500", icon: <CreditCard size={16} />, label: "IRON", reward: "0" },
        { color: "bg-zinc-600", icon: <CreditCard size={16} />, label: "IRON", reward: "0" },
        { color: "bg-zinc-700", icon: <CreditCard size={16} />, label: "IRON", reward: "0" },
    ];

    const canClaim = !lastDailyClaim || (Date.now() - lastDailyClaim > 24 * 60 * 60 * 1000);

    return (
        <div className="min-h-screen selection:bg-accent selection:text-accent-foreground pb-12">
            <PixelHeader onAction={logAction} />

            <main className="pt-24 px-4 md:px-8 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(var(--target-rotation, -1800deg)); }
                    }
                    .wheel-anim {
                        animation: spin 4s cubic-bezier(0.15, 0, 0.15, 1) forwards;
                    }
                    .segment {
                        position: absolute;
                        width: 50%;
                        height: 50%;
                        transform-origin: 100% 100%;
                        clip-path: polygon(0 0, 100% 0, 100% 100%);
                        z-index: 1;
                    }
                `}</style>
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-6xl font-bold text-foreground tracking-[0.2em] uppercase mb-4 pixel-text-shadow">
                        Imperial Treasury
                    </h1>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                        <span className="w-12 h-[1px] bg-foreground/10" />
                        Acquire premium book volumes or test your luck
                        <span className="w-12 h-[1px] bg-foreground/10" />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {bundles.map((bundle) => (
                        <div
                            key={bundle.id}
                            className={`glass-panel p-8 flex flex-col items-center text-center relative group overflow-hidden border-2 transition-all hover:-translate-y-2 ${bundle.popular ? 'border-primary bg-primary/5' : 'border-foreground/10 hover:border-gold/40'}`}
                        >
                            {bundle.popular && (
                                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-[8px] font-bold text-white uppercase tracking-tighter">
                                    Most Popular
                                </div>
                            )}

                            <div className="w-24 h-24 bg-sub-panel-bg flex items-center justify-center mb-6 relative">
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                                {bundle.icon}
                            </div>

                            <h3 className={`text-[12px] font-bold uppercase tracking-widest mb-2 ${bundle.color}`}>
                                {bundle.name}
                            </h3>
                            <p className="text-[18px] font-bold text-foreground mb-6">
                                {bundle.amount} COINS
                            </p>

                            <button
                                onClick={() => handlePurchase(bundle)}
                                className={`rpg-button w-full py-4 text-[10px] font-bold ${bundle.popular ? 'primary' : ''}`}
                            >
                                <span className="flex items-center gap-2">
                                    <CreditCard size={14} /> Buy {bundle.price}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Gamification Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Wheel of Luck */}
                    <div className="glass-panel p-8 border-2 border-secondary/20 bg-secondary/5 relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="text-secondary animate-pulse" size={24} />
                            <h2 className="text-[14px] font-bold text-secondary uppercase tracking-[0.2em]">Wheel of Luck</h2>
                        </div>

                        <div className="flex flex-col items-center justify-center py-8 relative">
                            {/* Scholar Title Marker */}
                            <div className="flex flex-col items-center mb-8 animate-float">
                                <span className="text-[7px] text-foreground/40 font-bold uppercase tracking-[0.3em] mb-1">Current Standing</span>
                                <div className="px-4 py-1 border border-primary/40 bg-primary/5 rounded-sm">
                                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{getScholarTitle()}</span>
                                </div>
                            </div>

                            {/* Wheel Container */}
                            <div className="relative w-80 h-80 mb-12">
                                {/* Pointer */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-8 bg-secondary z-20 shadow-lg"
                                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}>
                                </div>

                                {/* The Actual Wheel */}
                                <div id="rpg-wheel" className={`w-full h-full rounded-full border-8 border-card bg-card overflow-hidden relative shadow-2xl transition-transform ${isSpinning ? 'wheel-anim' : ''}`}
                                    style={{ transform: wheelResult ? `rotate(var(--target-rotation))` : 'rotate(0deg)' }}>

                                    {/* Visual Rivets */}
                                    {[...Array(16)].map((_, i) => (
                                        <div key={`rivet-${i}`} className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-full z-20 pointer-events-none" style={{ transform: `rotate(${i * 22.5}deg)` }}>
                                            <div className="w-1 h-1 rounded-full bg-foreground/20 mt-1 shadow-inner" />
                                            <div className="w-1 h-1 rounded-full bg-foreground/20 mt-auto mb-1 shadow-inner" />
                                        </div>
                                    ))}

                                    {segments.map((seg, i) => (
                                        <div key={i} className={`segment ${seg.color} border border-white/5 opacity-90`}
                                            style={{ transform: `rotate(${i * 45}deg)` }}>
                                            <div className="absolute top-6 left-6 -rotate-45 flex flex-col items-center gap-1">
                                                <span className="text-white drop-shadow-md">{seg.icon}</span>
                                                <span className="text-[6px] font-bold text-white uppercase tracking-tighter opacity-80">{seg.label}</span>
                                                <span className="text-[10px] font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">+{seg.reward}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Center Cover / Seal (Library Seal) */}
                                    <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-card border-4 border-gold/60 flex items-center justify-center z-30 shadow-[0_0_30px_rgba(255,184,0,0.3)] ring-4 ring-black/40">
                                        <div className="w-10 h-10 rounded-full border-2 border-gold/30 flex items-center justify-center bg-gold/10 relative">
                                            <div className="absolute inset-0 border border-gold/20 rounded-full animate-spin-slow" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(255,215,0,1)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {wheelResult && (
                                <div className="mb-8 animate-in zoom-in slide-in-from-bottom-2 duration-500">
                                    <div className="px-6 py-3 border-2 border-secondary/60 bg-secondary/10 text-center shadow-[0_0_20px_rgba(20,184,166,0.1)]">
                                        <p className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">{wheelResult}</p>
                                    </div>
                                </div>
                            )}

                            {/* Architectural Forged Button */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-secondary/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                <button
                                    onClick={handleSpin}
                                    disabled={isSpinning || coins < 25}
                                    className="relative rpg-button secondary py-6 px-20 text-[12px] font-black uppercase tracking-[0.4em] disabled:opacity-50 border-double border-4 border-secondary/60 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] transition-all hover:translate-y-[-2px] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.5)] active:translate-y-[2px] active:shadow-[0_2px_0_0_rgba(0,0,0,0.5)]"
                                >
                                    <span className="flex flex-col items-center">
                                        <span className="mb-1">{isSpinning ? "SYNCING..." : "SPIN THE WHEEL"}</span>
                                        <span className="text-[7px] opacity-40 font-bold">STAKE: 25 COINS</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Daily Sanctuary Gift */}
                    <div className="glass-panel p-8 border-2 border-primary/20 bg-primary/5 flex flex-col justify-center items-center text-center group">
                        <div className="w-20 h-20 bg-primary/10 rounded-sm mb-6 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                            <Package className="text-primary" size={32} />
                        </div>
                        <h2 className="text-[14px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Sanctuary Gift</h2>
                        <p className="text-[8px] text-foreground/40 uppercase tracking-widest mb-8 leading-relaxed">
                            A daily token of appreciation from the Imperial Archive.<br />Available once every 24 hours.
                        </p>

                        <button
                            onClick={handleClaimDaily}
                            disabled={!canClaim}
                            className="rpg-button primary py-5 px-14 text-[11px] font-black uppercase tracking-[0.2em] disabled:opacity-50 border-b-4 border-primary/40 transition-all hover:scale-105 active:translate-y-1 shadow-[0_4px_0_0_rgba(0,0,0,0.4)]"
                        >
                            <span>{canClaim ? "CLAIM 50 COINS" : "CLAIMED TODAY"}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="glass-panel p-6 border-l-4 border-gold bg-gold/5 flex items-center gap-6">
                        <Circle className="text-gold" size={32} />
                        <div>
                            <h4 className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1">Scholar Privileges</h4>
                            <p className="text-[8px] text-foreground/60 leading-tight uppercase">
                                Your current title grants you access to exclusive archival data modules. Higher levels unlock deeper discounts.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-3 px-1">
                            <span className="w-2 h-2 bg-foreground/20" />
                            <h2 className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest">Imperial Log Terminal</h2>
                        </div>
                        <SystemLog logs={logs} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Treasury;
