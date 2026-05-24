import { useCallback, useRef, useState } from "react";

const DEFAULT_STATE = { open: false, message: "", action: "" };

export default function useConfirm() {
    const [state, setState] = useState(DEFAULT_STATE);

    const resolver = useRef<(value: unknown) => void>(null);

    const ask = useCallback((message: string, action: "delete" | "warning" | "confirm") => {
        setState({ open: true, message, action });
        console.log('The menu is opened');
        return new Promise(res => {
            resolver.current = res;
        });
    }, []);

    const onClose = useCallback((choice: boolean) => {
        setState(DEFAULT_STATE);
        resolver.current?.(choice);
        resolver.current = null;
        console.log('the menu is closed');
    }, []);

    const modal = state.open
        ? (<div className="text-center z-40 fixed bg-background/40 backdrop-blur-md h-dvh w-screen grid place-items-center top-0 left-0 px-2">
            <div className="bg-foreground border border-border rounded-lg py-4 px-8">
                <h1 className="font-bold text-lg">{state.message}</h1>
                <div className="flex justify-center mt-2 items-center gap-2">
                    <button type="button" className="px-4 py-0.5 bg-border rounded-md font-semibold max-w-30 w-full animat-out hover:translate-y-0.5 active:translate-y-1" onClick={() => onClose(false)}>Cancel</button>
                    {state.action !== "warning" &&
                        <button type="button" className={`px-4 py-0.5 font-semibold animat-out hover:translate-y-0.5 active:translate-y-1 ${state.action === "delete" ? "bg-rose-500" : "bg-lime-600"} bg-border rounded-md max-w-30 w-full`} onClick={() => onClose(true)}>{state.action.at(0)?.toUpperCase() + state.action.slice(1)}</button>}
                </div>
            </div>
        </div>)
        : null;

    return { ask, modal };
}
