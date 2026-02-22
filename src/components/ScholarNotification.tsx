import React, { useState, useEffect, useCallback } from "react";
import { Sparkles, BookOpen, Trophy } from "lucide-react";

interface Notification {
    id: number;
    title: string;
    description: string;
    type: "reward" | "achievement" | "info";
    icon?: React.ReactNode;
}

const ScholarNotification = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((title: string, description: string, type: "reward" | "achievement" | "info" = "info") => {
        const id = Date.now();
        const icons = {
            reward: <Sparkles className="text-gold" size={20} />,
            achievement: <Trophy className="text-primary" size={20} />,
            info: <BookOpen className="text-secondary" size={20} />,
        };

        setNotifications(prev => [...prev, { id, title, description, type, icon: icons[type] }]);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    }, []);

    // Expose to window for easy access from context without prop drilling if needed,
    // though a signal/event bus would be better. For now, we'll use an event listener.
    useEffect(() => {
        const handleShowNotification = (e: any) => {
            const { title, description, type } = e.detail;
            addNotification(title, description, type);
        };
        window.addEventListener("scholar-notification", handleShowNotification);
        return () => window.removeEventListener("scholar-notification", handleShowNotification);
    }, [addNotification]);

    if (notifications.length === 0) return null;

    return (
        <div className="fixed inset-x-0 top-24 flex flex-col items-center gap-4 z-[100] pointer-events-none">
            {notifications.map((n) => (
                <div
                    key={n.id}
                    className="pointer-events-auto min-w-[300px] glass-panel p-4 bg-card/90 border-2 border-primary/20 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-top-8 fade-in duration-500 ease-out-back"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-sub-panel-bg border border-foreground/10 flex items-center justify-center rounded-sm">
                            {n.icon}
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest leading-none mb-1">
                                {n.title}
                            </h4>
                            <p className="text-[7px] text-foreground/60 uppercase tracking-tighter">
                                {n.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const triggerScholarNotification = (title: string, description: string, type: "reward" | "achievement" | "info" = "info") => {
    window.dispatchEvent(new CustomEvent("scholar-notification", { detail: { title, description, type } }));
};

export default ScholarNotification;
