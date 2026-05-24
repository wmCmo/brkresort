'use client';

import CartType from "@/types/Cart";
import { BowlSteamIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function MenuItem({
    cart,
    idInCart,
    id,
    dishName,
    english,
    price,
    imageUrl,
    setCart
}: {
    dishName?: string;
    price: number;
    english?: string;
    id: string;
    cart: CartType;
    setCart: Dispatch<SetStateAction<CartType | null>>;
    idInCart: string[];
    imageUrl?: string;
}) {
    function handleRemoveItem(id: string) {
        if (!idInCart.includes(id)) return;
        setCart(prev => {
            if (!prev) return {};
            const prevDish = prev[id];
            if (prevDish === 1) {
                const newCart = { ...prev };
                delete newCart[id];
                return newCart;
            }
            return {
                ...prev,
                [id]: prev[id] - 1
            };
        });
    }

    function handleAddCart(id: string) {
        setCart(prev => {
            if (!prev) return {};
            const prevDish = prev[id];
            if (!prevDish) {
                return {
                    ...prev,
                    [id]: 1
                };
            }
            return {
                ...prev,
                [id]: prev[id] + 1
            };
        });
    }

    return (
        <div key={id} className="flex gap-3 items-center">
            {
                imageUrl
                    ? <Image src={imageUrl} alt={dishName ?? 'empty place holder for food image'} className="rounded-lg h-24 w-24" height={96} width={96} />
                    : <div className="min-w-24 h-24 rounded-lg bg-border flex justify-center items-center">
                        <BowlSteamIcon size={40} className="text-muted" weight="fill" />
                    </div>
            }
            <div className="space-y-1">
                <h3 className="font-semibold">{dishName}</h3>
                <h3>{english}</h3>
                <div className="flex items-center gap-4">
                    <h4><span className="text-muted">THB </span>{price}</h4>
                    <div className="flex gap-3 rounded-full px-1 py-1 w-fit border-border border">
                        <button type="button" onClick={() => handleRemoveItem(id)} className="p-0.5">
                            <MinusIcon weight="regular" className="w-4 h-4 active:translate-y-0.5" />
                        </button>
                        <span className="font-mono">
                            {cart[id] ?? 0}
                        </span>
                        <button onClick={() => handleAddCart(id)} type="button" className="bg-lime-500 w-6 h-6 rounded-full p-0.5 active:translate-y-0.5">
                            <PlusIcon className="text-white mx-auto w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
