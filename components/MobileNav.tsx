'use client';

import { BasketIcon, BowlFoodIcon, ClockCounterClockwiseIcon, GearIcon, HouseIcon, IconContext } from "@phosphor-icons/react";
import Link from "next/link";

export default function MobileNav() {

    return (
        <div className="flex text-muted py-2 bg-foreground fixed bottom-0 left-0 justify-around items-center w-screen">
            <IconContext.Provider value={{
                weight: "fill",
                size: 32,
            }}>
                <div className="flex w-full justify-around ">
                    <Link href={'/'}>
                        <HouseIcon className="hover:text-extreme animate-out" />
                    </Link>
                    <Link href={'/menu'}>
                        <BowlFoodIcon className="hover:text-accent animate-out" />
                    </Link>
                </div>
                <Link href={'/menu/cart'} className="mx-4 bg-lime-600 p-4 rounded-lg -translate-y-4 hover:-translate-y-6 animate-out">
                    <BasketIcon className="text-white" />
                </Link>
                <div className="flex w-full justify-around">
                    <Link href={'/menu/history'}>
                        <ClockCounterClockwiseIcon className="hover:text-accent animate-out" />
                    </Link>
                    <Link href={'/settings'}>
                        <GearIcon className="hover:text-accent animate-out" />
                    </Link>
                </div>
            </IconContext.Provider>
        </div>
    );
}
