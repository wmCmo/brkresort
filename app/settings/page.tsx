'use client';

import Header from "@/components/Header";
import useSession from "@/hooks/useSession";
import { MouseEventHandler } from "react";

function DeleteButton({ onClick, text }: { onClick: MouseEventHandler<HTMLButtonElement>; text: string; }) {
    return <button onClick={onClick} type="button" className="px-4 py-1 bg-foreground border border-border rounded-full font-bold text-muted hover:text-rose-500 hover:translate-y-0.5 active:translate-y-1 animate-out">{text}</button>;
}

export default function SettingPage() {
    const { setSession } = useSession();

    function handleClearSession() {
        setSession({ checkout: "", house: null, sig: "" });
    }

    return (
        <div className="p-4">
            <Header title="Settings" />
            <div className="flex flex-col items-center gap-4">
                <DeleteButton text="Clear Session" onClick={handleClearSession} />
            </div>
        </div>
    );
}
