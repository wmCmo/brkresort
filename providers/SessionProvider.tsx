'use client';

import { SessionType } from "@/types/Session";
import { createContext, ReactNode, useCallback, useState } from "react";

interface SessionContextType {
    session?: SessionType,
    setSession: (session: SessionType) => void;
}

const SESSION_KEY = "session";

export const SessionContext = createContext<SessionContextType>({ session: { house: null, checkout: "", sig: "" }, setSession: () => { } });

export default function SessionProvider({ children }: { children: ReactNode; }) {
    const [session, setSessionState] = useState<SessionType>(() => {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch {
            //
        }
    });

    const setSession = useCallback((session: SessionType) => {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            setSessionState(session);
        } catch {
            //
        }
    }, [session]);


    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
}
