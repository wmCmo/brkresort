'use server'

import { getSignature } from "@/app/actions/signature";
import { SessionType } from "@/types/Session";

export default async function verifySession(session: SessionType) {
    if (!session.house) return false;
    
    const { sig } = await getSignature(session.house, session.checkout);

    return sig === session.sig;
}
