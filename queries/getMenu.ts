import { MenuType } from "@/types/notion";

export default async function getMenu(): Promise<MenuType[]> {
    const res = await fetch('/api/menu');
    if (!res.ok) throw new Error("Couldn't get the menu");
    const data = await res.json();
    return data.res.results;
}