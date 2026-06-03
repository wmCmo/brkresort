import verifySession from "@/app/actions/session";
import { CartType } from "@/types/Cart";
import { SessionType } from "@/types/Session";
import { z } from 'zod';

const Reason = z.enum([
    "",
    "empty-cart",
    "no-session",
    "old-session",
    "less-than-hr",
    "kitchen-closed",
    "check-out",
]);

type Res = {
    passed: boolean,
    reason: z.infer<typeof Reason>;
};

export function isKitchenOpen(d: Date) {
    const serveHr = new Date(d).getHours();
    return serveHr > 11 && serveHr < 20;
}

export async function verifyOrder(serveTime: string, session?: SessionType, cart?: CartType | null,) {
    const res: Res = {
        passed: false,
        reason: Reason.enum['']
    };

    if (!cart || Object.keys(cart).length < 1) {
        res.reason = Reason.enum["empty-cart"];
        return res;
    }

    if (!session?.checkout || !session.house || !session.sig) {
        res.reason = Reason.enum["no-session"];
        return res;
    }

    const sessionIsValid = await verifySession(session);
    if (!sessionIsValid || (new Date(session.checkout) < new Date())) {
        res.reason = Reason.enum["old-session"];
        return res;
    }

    if (new Date(serveTime) < new Date(new Date().getTime() + (50 * 1000 * 60))) { //50 mins to accomodtate for interaction delay
        res.reason = Reason.enum["less-than-hr"];
        return res;
    }

    const isOpen = isKitchenOpen(new Date(serveTime));
    if (!isOpen) {
        res.reason = Reason.enum["kitchen-closed"];
        return res;
    }

    if (session.checkout === new Date(serveTime).toLocaleDateString("sv-SE")) {
        res.reason = Reason.enum["check-out"];
        return res;
    }

    res.passed = true;
    return res;
}