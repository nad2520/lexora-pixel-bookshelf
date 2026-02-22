import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { toast } from "sonner";
import { triggerScholarNotification } from "@/components/ScholarNotification";

interface GameState {
    coins: number;
    xp: number;
    level: number;
    ownedBooks: string[];
    lastDailyClaim: number | null;
}

interface GameContextType extends GameState {
    addCoins: (amount: number, silent?: boolean) => void;
    spendCoins: (amount: number) => boolean;
    addXP: (amount: number) => void;
    addBook: (bookId: string) => void;
    isBookOwned: (bookId: string) => boolean;
    claimDailyGift: () => boolean;
    spinWheel: (cost: number) => { success: boolean; reward: number; message: string; segmentIndex: number };
    getScholarTitle: () => string;
}

const INITIAL_STATE: GameState = {
    coins: 1420,
    xp: 1420,
    level: 42,
    ownedBooks: [],
    lastDailyClaim: null,
};

const SCHOLAR_TITLES = [
    { level: 100, title: "Eternal Guardian" },
    { level: 50, title: "Grand Librarian" },
    { level: 25, title: "Master of Sanctuaries" },
    { level: 10, title: "Adept of the Archive" },
    { level: 0, title: "Novice Scribe" },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GameState>(() => {
        const saved = localStorage.getItem("lexora_game_state");
        return saved ? JSON.parse(saved) : INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem("lexora_game_state", JSON.stringify(state));
    }, [state]);

    const addCoins = useCallback((amount: number, silent = false) => {
        setState(prev => ({ ...prev, coins: prev.coins + amount }));
        if (!silent) {
            triggerScholarNotification("Scholar Reward", `+${amount} Coins gained from archives`, "reward");
        }
    }, []);

    const spendCoins = useCallback((amount: number): boolean => {
        let success = false;
        setState(prev => {
            if (prev.coins < amount) {
                toast.error("INSUFFICIENT_COINS: TRANSACTION_ABORTED");
                success = false;
                return prev;
            }
            success = true;
            return { ...prev, coins: prev.coins - amount };
        });
        return success;
    }, []);

    const addXP = useCallback((amount: number) => {
        setState(prev => {
            const nextLevelXP = prev.level * 1000;
            if (prev.xp + amount >= nextLevelXP) {
                const newLevel = prev.level + 1;
                triggerScholarNotification("Mastery Increased", `Scholar Level [${newLevel}] reached`, "achievement");
                return { ...prev, xp: prev.xp + amount, level: newLevel };
            }
            return { ...prev, xp: prev.xp + amount };
        });
    }, []);

    const addBook = useCallback((bookId: string) => {
        setState(prev => {
            if (prev.ownedBooks.includes(bookId)) return prev;
            triggerScholarNotification("Book Archived", "A new tome has been added to your shelf", "info");
            return { ...prev, ownedBooks: [...prev.ownedBooks, bookId] };
        });
    }, []);

    const isBookOwned = useCallback((bookId: string) => state.ownedBooks.includes(bookId), [state.ownedBooks]);

    const claimDailyGift = useCallback(() => {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (state.lastDailyClaim && now - state.lastDailyClaim < oneDay) {
            toast.error("GIFT_LOCKED: COME_BACK_LATER");
            return false;
        }

        const reward = 50;
        setState(prev => ({ ...prev, coins: prev.coins + reward, lastDailyClaim: now }));
        triggerScholarNotification("Sanctuary Gift", `+${reward} Coins received!`, "reward");
        return true;
    }, [state.lastDailyClaim]);

    const spinWheel = useCallback((cost: number) => {
        if (state.coins < cost) {
            toast.error("INSUFFICIENT_COINS: SPIN_ABORTED");
            return { success: false, reward: 0, message: "INSUFFICIENT_COINS", segmentIndex: 0 };
        }

        // 8 segments on the wheel (45 degrees each)
        const outcomes = [
            { weight: 2, reward: cost * 20, msg: "DIAMOND_REWARD: LEGENDARY_TIER" }, // Index 0
            { weight: 8, reward: cost * 5, msg: "GOLD_REWARD: MAGNIFICENT_GAIN" },   // Index 1
            { weight: 12, reward: cost * 2, msg: "SILVER_REWARD: STELLAR_FIND" },   // Index 2
            { weight: 15, reward: cost, msg: "BRONZE_REWARD: STABLE_ARCHIVE" },   // Index 3
            { weight: 15, reward: cost, msg: "BRONZE_REWARD: STABLE_ARCHIVE" },   // Index 4
            { weight: 15, reward: 0, msg: "IRON_NODE: NO_VALUE_FOUND" },          // Index 5
            { weight: 15, reward: 0, msg: "IRON_NODE: NO_VALUE_FOUND" },          // Index 6
            { weight: 18, reward: 0, msg: "IRON_NODE: NO_VALUE_FOUND" },          // Index 7
        ];

        const random = Math.random() * 100;
        let cumulative = 0;
        let selectedIndex = 7;

        for (let i = 0; i < outcomes.length; i++) {
            cumulative += outcomes[i].weight;
            if (random < cumulative) {
                selectedIndex = i;
                break;
            }
        }

        const selected = outcomes[selectedIndex];
        setState(prev => ({ ...prev, coins: prev.coins - cost + selected.reward }));

        if (selected.reward > cost) {
            triggerScholarNotification("Wheel of Luck", selected.msg, "reward");
        }

        return { success: true, reward: selected.reward, message: selected.msg, segmentIndex: selectedIndex };
    }, [state.coins]);

    const getScholarTitle = useCallback(() => {
        return SCHOLAR_TITLES.find(t => state.level >= t.level)?.title || "Scholar";
    }, [state.level]);

    return (
        <GameContext.Provider value={{
            ...state,
            addCoins,
            spendCoins,
            addXP,
            addBook,
            isBookOwned,
            claimDailyGift,
            spinWheel,
            getScholarTitle
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used within a GameProvider");
    return context;
};
