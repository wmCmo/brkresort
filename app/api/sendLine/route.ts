import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

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

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to send line message" + error }, { status: 500 });
    }
}
