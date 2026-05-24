import { HistoryType } from "@/types/History";

export default async function addHistory(payload: HistoryType) {
    const res = await fetch('/api/addHistory', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ payload })
    });
    if (!res.ok) throw new Error("Couldn't add to history");
    const data = await res.json();
    return data.res;
}
