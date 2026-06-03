'use server';

import { MenuType } from "@/app/actions/menu";
import { getSignature } from "@/app/actions/signature";
import { notion } from "@/lib/notion";
import { CartType } from "@/types/Cart";
import { HouseObj, isHouseType, SessionType } from "@/types/Session";
import { verifyOrder } from "@/utils/verifyOrder";
import { isFullPage } from "@notionhq/client";

export async function submitOrder(session: SessionType, cart: CartType, serveTime: string, menu: MenuType[], total: number,) {
    const house = session.house;
    if (!house) return { error: "House is invalid" };
    const { sig } = await getSignature(house, session.checkout);

    try {
        const dbId = process.env.HISTORY_DB;
        if (!dbId) return { error: "Coudn't get history DB ID." };

        const isValidOrder = await verifyOrder(serveTime, session, cart);

        if (!isValidOrder.passed) return { error: isValidOrder.reason };

        if (!isHouseType(house)) return { error: "The house is invalid" };

        const fDate = new Date(serveTime);
        const historyRes = await notion.pages.create({
            parent: {
                data_source_id: dbId
            },
            properties: {
                "Name": {
                    title: [{
                        text: {
                            content: `${HouseObj[house].th} ${fDate.toDateString()}`
                        }
                    }]
                },
                "House": {
                    relation: [{ id: HouseObj[house].id }]
                },
                "Ordered Item": {
                    relation: menu.map((item: MenuType) => ({ id: item.id }))
                },
                "Total": {
                    number: total
                },
                "Serve Time": {
                    date: { start: fDate.toISOString() }
                },
                "Signature": {
                    rich_text: [{
                        text: {
                            content: sig
                        }
                    }]
                },
                "Cart": {
                    rich_text: [{
                        text: {
                            content: JSON.stringify(cart)
                        }
                    }]
                }
            }
        });

        if (!isFullPage(historyRes)) return { error: "Couldn't get the full page of history." };

        try {
            const message = `บ้าน ${HouseObj[house].th}
Serve: ${new Date(serveTime).toDateString()} (${new Date(serveTime).toTimeString().slice(0, 5)})
======
${menu.map(item => {
                return `${item.name} = ${cart[item.id]}`;
            }).join("\n")}
Total: THB ${total.toLocaleString()}

Order Link:
${historyRes.public_url}`;

            const res = await fetch('https://api.line.me/v2/bot/message/push', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
                },
                body: JSON.stringify({
                    to: process.env.GROUP_ID,
                    messages: [{
                        type: "text",
                        text: message
                    }]
                })
            });

            if (!res.ok) throw new Error("There was a problem with sending line message");

            const data = await res.json();
            return { data };
        } catch (error) {
            return { error };
        }
    } catch (error) {
        return { error };
    }
}