import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { sig } = await req.json();

    const dbId = process.env.HISTORY_DB;
    if (!dbId) return NextResponse.json({ error: "Could not retrieve history DB." });

    const res = await notion.dataSources.query({
        data_source_id: dbId,
        filter: {
            property: "Signature",
            rich_text: {
                equals: sig
            }
        },
        sorts: [{
            property: "Created time",
            direction: "ascending"
        }]
    });

    return NextResponse.json({ res });
}