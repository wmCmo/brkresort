import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
    const menuDbId = process.env.MENU_DB;
    if (!menuDbId) return NextResponse.json({ error: "Couldn't locate Menu DB" });
    try {
        const res = await notion.dataSources.query({
            data_source_id: menuDbId
        });
        return NextResponse.json({ res });
    } catch (error) {
        return NextResponse.json({ error });
    }
}