'use client';

import MenuSkeleton from "@/components/MenuSkeleton";
import CartType from "@/types/Cart";
import { MenuCategorySchema, MenuCategoryType, MenuType } from "@/types/notion";
import kebabToTitle from "@/utils/kebabToTitle";
import { CaretUpIcon, ImageSquareIcon, MinusIcon, PlusIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";


const CART_KEY = 'cart';

export default function Page() {
    const [category, setCategory] = useState<MenuCategoryType>(MenuCategorySchema.enum["must-try"]);
    const [cart, setCart] = useState<CartType>(() => {
        try {
            const raw = localStorage.getItem(CART_KEY);
            if (!raw) return {};
            return JSON.parse(raw);
        } catch (error) {
            return {};
        }
    });
    const [showCategory, setShowCategory] = useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ['menuData'],
        queryFn: async (): Promise<{ res: { results: MenuType[]; }; }> => {
            const res = await fetch('/api/menu');
            if (!res.ok) throw new Error("Couldn't get the menu");
            return res.json();
        }
    });

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    function handleRemoveItem(dishName: string) {
        if (!Object.keys(cart).includes(dishName)) return;
        setCart(prev => {
            const prevDish = prev[dishName];
            if (prevDish.quantity < 1) {
                const newCart = { ...prev };
                delete newCart[dishName];
                return newCart;
            }
            return {
                ...prev,
                [dishName]: {
                    ...prevDish,
                    quantity: prevDish.quantity--
                }
            };
        });
    }

    function handleAddCart(dishName: string, price: number, id: string) {
        setCart(prev => {
            const prevDish = prev[dishName];
            if (!prevDish) {
                return {
                    ...prev,
                    [dishName]: {
                        id,
                        name: dishName,
                        price,
                        quantity: 1
                    }
                };
            }
            return {
                ...prev,
                [dishName]: {
                    ...prevDish,
                    quantity: prevDish.quantity++
                }
            };
        });
    }

    return (
        <div className="p-4 text-extreme relative min-h-dvh">
            <div className="sticky top-0 z-20 bg-background py-4">
                <h1 className="font-bold text-3xl">Menu</h1>
                <h2 className="text-xl font-semibold mt-2">{kebabToTitle(category)}</h2>
            </div>
            <div className="space-y-4 mt-8 pb-40">
                {
                    isLoading
                        ? <MenuSkeleton />
                        : data?.res?.results && data.res.results.filter(dish => dish.properties.Category.select.name === category).map(dish => {
                            const dishName = dish.properties.Name.title[0].plain_text;
                            const imageUrl = dish.properties.Image.files?.[0]?.file.url;
                            const price = dish.properties.Price.number;
                            return (
                                <div key={dish.id} className="flex gap-2 items-center">
                                    {
                                        imageUrl
                                            ? <Image src={imageUrl ?? "https://avatars.githubusercontent.com/u/51499433?v=4"} alt={dishName} className="rounded-lg h-20 w-20" height={80} width={80} />
                                            : <div className="w-20 h-20 rounded-lg bg-second animate-pulse flex justify-center items-center">
                                                <ImageSquareIcon size={40} className="text-muted" weight="fill" />
                                            </div>
                                    }
                                    <div>
                                        <h3>{dishName}</h3>
                                        <h4><span className="text-muted">THB </span>{dish.properties.Price.number}</h4>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => handleRemoveItem(dishName)} className="bg-rose-500 p-0.5 rounded-sm">
                                                <MinusIcon />
                                            </button>
                                            <span className="font-mono">
                                                {cart[dishName]?.quantity ?? 0}
                                            </span>
                                            <button onClick={() => handleAddCart(dishName, price, dish.id)} type="button" className="bg-lime-600 p-0.5 rounded-sm">
                                                <PlusIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                }
            </div>

            {showCategory && <div onClick={() => setShowCategory(false)} className="w-screen h-screen fixed top-0 left-0" />}
            {
                showCategory &&
                <div className="fixed right-4 bottom-36 flex flex-col gap-2 bg-foreground max-w-40 mt-4 p-4 rounded-lg">
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
