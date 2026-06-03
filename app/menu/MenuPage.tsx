'use client';

import { getMenu } from "@/app/actions/menu";
import MenuItem from "@/components/MenuItem";
import MenuSkeleton from "@/components/MenuSkeleton";
import useSession from "@/hooks/useSession";
import { CART_KEY, CartType } from "@/types/Cart";
import { MenuCategorySchema, MenuCategoryType } from "@/types/notion";
import { isHouseType } from "@/types/Session";
import kebabToTitle from "@/utils/kebabToTitle";
import { CaretUpIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function MenuPageClient() {
    const [category, setCategory] = useState<MenuCategoryType>(MenuCategorySchema.enum["must-try"]);
    const [cart, setCart] = useState<CartType | null>(null);

    const initalLoad = useRef(true);

    const [showCategory, setShowCategory] = useState(false);


    const searchParams = useSearchParams();
    const { setSession } = useSession();

    const { data, isLoading } = useQuery({
        queryKey: ['menuData'],
        queryFn: getMenu
    });

    useEffect(() => {
        if (!initalLoad.current) return;

        try {
            const raw = localStorage.getItem(CART_KEY);
            if (raw) {
                setCart(JSON.parse(raw));
            } else {
                setCart({});
            }
        } catch {
            setCart({});
        } finally {
            initalLoad.current = false;
        }
    }, []);

    useEffect(() => {
        if (!cart) return;
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const rawHouse = searchParams.get('house');
        const rawCheckout = searchParams.get('checkout');
        const sig = searchParams.get("sig");
        if (!rawHouse || !rawCheckout || !sig) return;
        try {
            const house = atob(rawHouse);
            const checkout = atob(rawCheckout);
            if (isHouseType(house) && checkout && sig) {
                setSession({ house, checkout, sig });
            }
        } catch (error) {
            console.error("The URL is not valid.", error);
            return;
        }
    }, [searchParams, setSession]);

    const idInCart = Object.keys(cart ?? {});

    return (
        <div className="p-4 text-extreme relative min-h-dvh">
            <div className="sticky top-0 z-20 bg-background py-4 flex items-center justify-between">
                <div className="relative">
                    <div className="flex items-center gap-2">
                        <img src="/ui/logo.svg" alt="logo for brk resort" className="h-6 w-6" />
                        <h1 className="font-bold text-3xl">Menu</h1>
                    </div>
                    <img src="/svg/leaves.svg" alt="Minimal leaves svg illustration" className="absolute -top-2 -right-5" />
                    <h2 className="text-xl font-semibold mt-2">{kebabToTitle(category)}</h2>
                </div>
                <div className="bg-foreground px-4 py-2 border border-border rounded-lg">
                    <Link href={'/menu/cart'}>
                        <h2 className="text-lg">{data?.menu?.filter(menu => idInCart.includes(menu.id)).reduce((acc, value) => acc + (value.price * (cart ?? {})[value.id]), 0).toLocaleString()} THB</h2>
                        <h3 className="text-right"><span className="font-bold">{Object.entries(cart ?? {}).length}</span> รายการ</h3>
                    </Link>
                </div>
            </div>
            <div className="space-y-4 mt-8 pb-40">
                {
                    isLoading
                        ? <MenuSkeleton />
                        : data && data.menu?.filter(dish => dish.category === category).map(dish => {
                            return <MenuItem
                                key={dish.id}
                                id={dish.id}
                                cart={cart ?? {}}
                                dishName={dish.name}
                                english={dish.description}
                                price={dish.price}
                                idInCart={idInCart}
                                setCart={setCart}
                                imageUrl={dish.image}
                            />;
                        })
                }
            </div>

            {showCategory && <div onClick={() => setShowCategory(false)} className="w-screen h-screen fixed top-0 left-0" />}
            {
                showCategory &&
                <div className="fixed right-4 bottom-36 flex flex-col gap-2 bg-foreground max-w-40 mt-4 p-4 rounded-lg z-30">
                    {MenuCategorySchema.options.map(menu => (
                        <button onClick={() => setCategory(menu)} type="button" key={menu} className={`px-2 hover:bg-border animate-out py-2 rounded-lg ${category === menu ? 'font-semibold' : 'text-neutral-400'}`}>{kebabToTitle(menu)}</button>
                    ))}
                </div>
            }
            <button onClick={() => setShowCategory(prev => !prev)} type="button" className="border border-border fixed bottom-24 right-2 flex items-center gap-2 bg-foreground px-6 py-2 rounded-full font-bold">
                <SquaresFourIcon />
                {kebabToTitle(category)}
                <CaretUpIcon className={`${showCategory ? "rotate-0" : "rotate-90"} transition-all duration-100 ease-linear`} />
            </button>
        </div >
    );
}
