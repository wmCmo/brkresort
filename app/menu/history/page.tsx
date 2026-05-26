'use client';

import Header from "@/components/Header";
import MenuSkeleton from "@/components/MenuSkeleton";
import ViewMenuButton from "@/components/ViewMenuButton";
import useSession from "@/hooks/useSession";
import getHistory from "@/queries/getHistory";
import getMenu from "@/queries/getMenu";
import CartType from "@/types/Cart";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type DisplayHistory = {
    total: number;
    orders: {
        total: number;
        time: string;
        carts: {
            en?: string;
            th?: string;
            count: number;
        }[];
    }[];
};

type GroupedByDayType = Map<string, DisplayHistory>;

export default function HistoryPage() {
    const { session } = useSession();

    const { data: history, isLoading: historyLoading } = useQuery({
        queryKey: ["history"],
        queryFn: session?.sig ? () => getHistory(session.sig) : skipToken
    });

    const { data: menu, isLoading: menuLoading } = useQuery({
        queryKey: ["menu"],
        queryFn: getMenu
    });

    const groupedByDay: GroupedByDayType | null = useMemo(() => {
        if (!history || !menu) return null;

        const menuIdMap = new Map<string, { th?: string; en?: string; }>();

        for (const item of menu) {
            menuIdMap.set(item.id, {
                en: item.properties.Description.rich_text.at(0)?.plain_text,
                th: item.properties.Name.title.at(0)?.plain_text
            });
        }

        const map = new Map();

        for (const item of history) {
            const dateSE = new Date(item.properties["Created time"].created_time).toLocaleString("sv-SE").slice(0, 10);
            const cartProp = item.properties.Cart.rich_text.at(0)?.plain_text;
            if (!cartProp) continue;

            const parsedCart: CartType = JSON.parse(cartProp);

            const newOrder = {
                time: new Date(item.properties["Created time"].created_time).toLocaleTimeString("en-GB").slice(0, 5),
                carts: Object.entries(parsedCart).map(([id, count]) => {
                    const itemMap = menuIdMap.get(id);
                    return {
                        en: itemMap?.en,
                        th: itemMap?.th,
                        count
                    };
                }),
                total: item.properties.Total.number
            };

            if (!map.has(dateSE)) {
                map.set(dateSE, {
                    total: item.properties.Total.number,
                    orders: [newOrder]
                });
            } else {
                const thatDay = map.get(dateSE);
                if (!thatDay) continue;
                const newTotal = thatDay.total + item.properties.Total.number;
                thatDay.total = newTotal;
                thatDay.orders.push(newOrder);
            }
        }
        return map;
    }, [history, menu]);


    return (
        <div className="text-extreme p-4">
            <Header title="History" />
            <div className="flex flex-col items-center">
                {
                    historyLoading || menuLoading
                        ? <MenuSkeleton />
                        : (groupedByDay && groupedByDay.size > 0)
                            ? Array.from(groupedByDay.entries()).map(([date, item]: [string, DisplayHistory]) => {
                                return <div key={date} className="py-2 px-4 bg-foreground border border-border rounded-lg max-w-sm w-full">
                                    <h1 className="font-mono text-muted">{new Date(date).toDateString()}</h1>
                                    {item.orders.map((order, index) => {
                                        return <div key={index}>
                                            <h2 className="text-2xl font-bold mb-2 mt-4">{order.time}</h2>
                                            {order.carts.map((cart, index) => {
                                                return <div key={index} className="flex justify-between my-0.5">
                                                    <p>{cart.th}</p>
                                                    <p>x{cart.count}</p>
                                                </div>;
                                            })}
                                            <h2 className="ml-auto text-right mt-2">THB <strong>{order.total.toLocaleString()}</strong></h2>
                                        </div>;
                                    })}
                                    <hr className="my-4 border-border" />
                                    <p className="text-2xl text-right">THB <strong>{item.total.toLocaleString()}</strong></p>
                                </div>;
                            })
                            : <div>
                                <h1>Your history is empty</h1>
                                <ViewMenuButton />
                            </div>
                }
            </div>
        </div>
    );
}
