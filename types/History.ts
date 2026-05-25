import CartType from "@/types/Cart";
import { MenuType } from "@/types/notion";

export type HistoryPayLoadType = {
    house: string,
    serveTime: string,
    total: number;
    menu: MenuType[];
    sig: string;
    cart: CartType;
};