'use client';

import { SessionType } from "@/types/Session";
import { createContext, ReactNode, useCallback, useState } from "react";

interface SessionContextType {
    session?: SessionType,
    setSession: (session: SessionType) => void;
}

const SESSION_KEY = "session";

const DEFAULT_SESSION = { house: null, checkout: "", sig: "" };

export const SessionContext = createContext<SessionContextType>({ session: DEFAULT_SESSION, setSession: () => { } });

export default function SessionProvider({ children }: { children: ReactNode; }) {
    const [session, setSessionState] = useState<SessionType>(() => {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            if (!raw) return DEFAULT_SESSION;
            return JSON.parse(raw);
        } catch {
            return DEFAULT_SESSION;
        }
    });

    const setSession = useCallback((session: SessionType) => {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            setSessionState(session);
        } catch {
            //
        }
    }, []);


    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
}
