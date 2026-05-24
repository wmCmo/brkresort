import { SessionType } from "@/types/Session";

export default async function verifySession(session: SessionType) {
    const res = await fetch('/api/getSignature', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ payload: session })
    });

    const { sig } = await res.json();

    return sig === session.sig;
}