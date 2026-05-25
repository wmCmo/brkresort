import { notion } from "@/lib/notion";
import { HistoryPayLoadType } from "@/types/History";
import { MenuType } from "@/types/notion";
import { HouseObj, isHouseType } from "@/types/Session";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const dbId = process.env.HISTORY_DB;
    if (!dbId) return NextResponse.json({ error: "Couldn't load history db ID." });

    const { payload }: { payload: HistoryPayLoadType; } = await req.json();
    const { house } = payload;

    if (!isHouseType(house)) return NextResponse.json({ error: "The house is invalid." });
    const fDate = new Date(payload.serveTime);
    const res = await notion.pages.create({
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
                relation: payload.menu.map((item: MenuType) => ({ id: item.id }))
            },
            "Total": {
                number: payload.total
            },
            "Serve Time": {
                date: { start: fDate.toISOString() }
            },
            "Signature": {
                rich_text: [{
                    text: {
                        content: payload.sig
                    }
                }]
            },
            "Cart": {
                rich_text: [{
                    text: {
                        content: JSON.stringify(payload.cart)
                    }
                }]
            }
        }
    });
    return NextResponse.json({ res });
}
