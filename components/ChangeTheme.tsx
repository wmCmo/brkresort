'use client';

import useTheme from "@/hooks/useTheme";
import { DesktopIcon, IconContext, MoonIcon, SunIcon } from "@phosphor-icons/react";

export default function ChangeTheme() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="theme-menu flex gap-4 bg-foreground border border-border px-4 py-2 rounded-full">
            <IconContext.Provider value={{
                weight: "fill",
                size: "1.5em"
            }}>
                <button type="button" title="Light Theme" onClick={() => setTheme('light')}><SunIcon className={`${theme === 'system' ? 'fill-neutral-300 hover:fill-neutral-400 dark:fill-neutral-700 dark:hover:fill-neutral-600' : 'fill-neutral-700'} ${theme === 'dark' && 'hover:fill-neutral-600'} animate-out`} /></button>
                <button type="button" title="Dark Theme" onClick={() => setTheme('dark')}><MoonIcon className={`${theme === 'system' ? 'fill-neutral-300 hover:fill-neutral-400 dark:fill-neutral-700 dark:hover:fill-neutral-600' : ' fill-neutral-300'} ${theme === 'light' && 'hover:fill-neutral-400'} animate-out`} /></button>
                <button type="button" title="System Theme" onClick={() => setTheme('system')}><DesktopIcon className={`${theme === 'system' ? 'fill-neutral-700 dark:fill-neutral-300' : theme === 'light' ? 'fill-neutral-300 hover:fill-neutral-400' : 'fill-neutral-700 hover:fill-neutral-600'} animate-out`} /></button>
            </IconContext.Provider>
        </div>
    );
}
