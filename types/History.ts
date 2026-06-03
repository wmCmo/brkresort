import { MenuType } from "@/app/actions/menu";
import { CartType } from "@/types/Cart";

export type HistoryPayLoadType = {
    house: string,
    serveTime: string,
    total: number;
    menu: MenuType[];
    sig: string;
    cart: CartType;
};