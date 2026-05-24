import { SessionContext } from "@/providers/SessionProvider";
import { useContext } from "react";

export default function useSession() {
    const context = useContext(SessionContext);

    if (context === undefined) {
        console.error('Error: `useSession` must be use within its context');
    }

    return context;
}