
export default async function getHistory(sig?: string) {
    if (!sig) return null;
    const res = await fetch('/api/getHistory', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sig })
    });
    const data = await res.json();
    return data.res;
}