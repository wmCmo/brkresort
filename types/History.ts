import { MenuType } from "@/types/notion";

export type HistoryType = {
    house: string,
    serveTime: string,
    total: number;
    menu: MenuType[];
    sig: string;
};