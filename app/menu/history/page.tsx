'use client';

import { getHistory } from "@/app/actions/history";
import { getMenu } from "@/app/actions/menu";
import Header from "@/components/Header";
import MenuSkeleton from "@/components/MenuSkeleton";
import ViewMenuButton from "@/components/ViewMenuButton";
import useSession from "@/hooks/useSession";
import { CartType } from "@/types/Cart";
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
        queryKey: ["history", session?.sig],
        queryFn: session?.sig ? () => getHistory(session.sig) : skipToken
    });

    const { data, isLoading: menuLoading } = useQuery({
        queryKey: ["menu"],
        queryFn: getMenu
    });

    const groupedByDay: GroupedByDayType | null = useMemo(() => {
        if (!history?.data || !data?.menu) return null;

        const menuIdMap = new Map<string, { th?: string; en?: string; }>();

        for (const item of data.menu) {
            menuIdMap.set(item.id, {
                en: item.description,
                th: item.name
            });
        }

        const map = new Map();

        for (const item of history.data) {
            const dateSE = new Date(item.createdTime).toLocaleString("sv-SE").slice(0, 10);
            if (!item.cart) continue;

            const parsedCart: CartType = JSON.parse(item.cart);

            const newOrder = {
                time: new Date(item.createdTime).toLocaleTimeString("en-GB").slice(0, 5),
                carts: Object.entries(parsedCart).map(([id, count]) => {
                    const itemMap = menuIdMap.get(id);
                    return {
                        en: itemMap?.en,
                        th: itemMap?.th,
                        count
                    };
                }),
                total: item.total
            };

            if (!map.has(dateSE)) {
                map.set(dateSE, {
                    total: item.total,
                    orders: [newOrder]
                });
            } else {
                const thatDay = map.get(dateSE);
                if (!thatDay) continue;
                const newTotal = thatDay.total + item.total;
                thatDay.total = newTotal;
                thatDay.orders.push(newOrder);
            }
        }
        return map;
    }, [history, data?.menu]);


    return (
        <div className="text-extreme p-4 mb-16">
            <Header title="History" />
            <div className="flex flex-col items-center gap-8">
                {
                    historyLoading || menuLoading
                        ? <MenuSkeleton />
                        : (!groupedByDay || groupedByDay.size < 1)
                            ? <div className="flex flex-col items-center gap-4 my-auto max-w-sm mt-8">
                                <img src="/svg/undraw_empty-cart.svg" alt="Empty cart illustration" className="w-auto h-auto" />
                                <h1 className="text-2xl text-center">You haven't ordered anything</h1>
                                <ViewMenuButton />
                            </div>
                            : Array.from(groupedByDay.entries()).map(([date, item]: [string, DisplayHistory]) => {
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

                }
            </div>
        </div>
    );
}
