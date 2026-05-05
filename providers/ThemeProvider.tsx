'use client';

import { createContext, ReactNode, useEffect, useState } from "react";
import { z } from 'zod';

const ThemeSchema = z.enum(['light', 'dark', 'system']);
type ThemeType = z.infer<typeof ThemeSchema>;

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    toggleTheme: () => void;
}

const contextInitState: ThemeContextType = {
    theme: 'system',
    setTheme: (_theme: ThemeType) => { },
    toggleTheme: () => { },
};

export const ThemeContext = createContext<ThemeContextType>(contextInitState);

const storageKey = 'app-theme';

export default function ThemeProvider({ children }: { children: ReactNode; }) {
    const [theme, setThemeState] = useState<ThemeType>(ThemeSchema.enum.system);

    useEffect(() => {
        const raw = localStorage.getItem(storageKey);
        const parsed = ThemeSchema.safeParse(raw);
        const stored = parsed.success ? parsed.data : 'system';
        setThemeState(stored);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        function applyTheme() {
            root.classList.remove("light", "dark");
            if (theme === "system") {
                const systemTheme = mediaQuery.matches ? "dark" : "light";
                root.classList.add(systemTheme);
                return;
            }
            root.classList.add(theme);
        }

        applyTheme();

        if (theme !== "system") return;

        mediaQuery.addEventListener('change', applyTheme);

        return () => mediaQuery.removeEventListener('change', applyTheme);

    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: ThemeType) => {
            localStorage.setItem(storageKey, theme);
            setThemeState(theme);
        },
        toggleTheme: () => {
            setThemeState(prev => {
                const newTheme = prev === ThemeSchema.enum.light ? ThemeSchema.enum.dark : ThemeSchema.enum.light;
                localStorage.setItem(storageKey, newTheme);
                return newTheme;
            });
        }
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
