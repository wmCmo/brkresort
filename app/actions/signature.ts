'use server'

import { HouseType } from "@/types/Session";
import crypto from 'crypto';

export async function getSignature(house: HouseType, checkout: string) {
    const sessionSecret = process.env.SESSION_SECRET;

    if (!sessionSecret) {
        console.error('No session secret');
        return { error: "No session secret", sig: "" };
    }

    const sig = crypto.createHmac('sha256', sessionSecret).update(JSON.stringify({ house, checkout })).digest("base64url");

    return { sig };
}
