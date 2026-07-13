import { ReactNode } from "react";

export function HeaderWithLeaf({ children }: { children: ReactNode; }) {
    return (
        <div className="flex justify-center">
            <h2 className="text-2xl relative mt-6 text-center font-bold">
                {children}
                <img src="/svg/leaves.svg" alt="Leaves illustration" className="absolute -top-3 -right-4" />
            </h2>
        </div>
    );
}