'use server';

import { getSignature } from "@/app/actions/signature";
import { isHouseType } from "@/types/Session";

export async function verifyAdmin(key: string) {
    return key === process.env.ADMIN_SECRET;
}

export async function makeUrl(house: string, checkout: string, key: string | null) {
    if (!key) return '';
    const isAdmin = await verifyAdmin(key);
    if (!isHouseType(house) || !isAdmin) return '';

    const { sig } = await getSignature(house, checkout);

    return new URL(`http://localhost:3000/menu?house=${btoa(house)}&checkout=${btoa(checkout)}&sig=${sig}`).toString();
}