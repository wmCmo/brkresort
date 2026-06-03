export function dateToString(d: Date) {
    return d.toLocaleString("sv-SE").replace(" ", "T").slice(0, 16);
}