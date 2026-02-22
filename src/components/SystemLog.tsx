import { useEffect, useRef } from "react";

interface LogEntry {
    id: number;
    message: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: string;
}

interface SystemLogProps {
    logs: LogEntry[];
}

const SystemLog = ({ logs }: SystemLogProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel p-3 h-32 flex flex-col relative overflow-hidden bg-sub-panel-bg">
            {/* Decorative Scanline */}
            <div className="absolute inset-x-0 h-1/2 top-0 bg-gradient-to-b from-foreground/5 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[6px] text-foreground/40 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-foreground/40 animate-pulse" /> ARCHIVE LOG v2.0
                </h3>
                <span className="text-[5px] text-foreground/20">READY</span>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-2"
            >
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-2 text-[6px] font-mono leading-tight">
                        <span className="text-foreground/20">[{log.timestamp}]</span>
                        <span className={`
              ${log.type === "success" ? "text-secondary" : ""}
              ${log.type === "warning" ? "text-gold" : ""}
              ${log.type === "error" ? "text-destructive" : ""}
              ${log.type === "info" ? "text-foreground/60" : ""}
            `}>
                            {log.message}
                        </span>
                    </div>
                ))}
                {logs.length === 0 && (
                    <div className="text-[6px] text-foreground/10 italic">Establishing archival connection...</div>
                )}
            </div>
        </div>
    );
};

export default SystemLog;
