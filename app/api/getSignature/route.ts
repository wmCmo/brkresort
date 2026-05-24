import { NextResponse } from "next/server";
import crypto from 'crypto';

export async function POST(req: Request) {
    const { payload: { house, checkout } } = await req.json();

    const sessionSecret = process.env.SESSION_SECRET;

    if (!sessionSecret) {
        console.error('No session secret');
        return NextResponse.json({ error: "No session secret" });
    }

    const sig = crypto.createHmac('sha256', sessionSecret).update(JSON.stringify({ house, checkout })).digest("base64url");

    return NextResponse.json({ sig });
}