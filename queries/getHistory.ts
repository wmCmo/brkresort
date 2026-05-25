import { HistoryType } from "@/types/notion";

export default async function getHistory(sig?: string): Promise<HistoryType[] | null> {
    if (!sig) return null;
    const res = await fetch('/api/getHistory', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sig })
    });
    const data = await res.json();
    return data.res.results;
}