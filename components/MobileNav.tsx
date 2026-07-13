'use client';

import { BasketIcon, BowlFoodIcon, ClockCounterClockwiseIcon, GearIcon, HouseIcon, IconContext } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
    const path = usePathname();
    return (
        <div className={`${(path.startsWith('/menu') || path.startsWith('/settings')) ? 'flex' : 'hidden'} text-muted bg-foreground fixed bottom-0 left-0 justify-around items-center w-screen z-40`}>
            <IconContext.Provider value={{
                weight: "fill",
                size: 32,
            }}>
                <div className="flex w-full justify-around ">
                    <Link href={'/'}>
                        <HouseIcon className={`hover:text-extreme animate-out ${path === "/" && 'text-extreme'}`} />
                    </Link>
                    <Link href={'/menu'}>
                        <BowlFoodIcon className={`hover:text-accent animate-out ${path === "/menu" && 'text-extreme'}`} />
                    </Link>
                </div>
                <Link href={'/menu/cart'} className={`mx-4 bg-lime-600 p-4 rounded-lg ${path === "/menu/cart" && '-translate-y-4 hover:-translate-y-2'} animate-out`}>
                    <BasketIcon className="text-white" />
                </Link>
                <div className="flex w-full justify-around">
                    <Link href={'/menu/history'}>
                        <ClockCounterClockwiseIcon className={`hover:text-accent animate-out ${path === "/menu/history" && 'text-extreme'}`} />
                    </Link>
                    <Link href={'/settings'}>
                        <GearIcon className={`hover:text-accent animate-out ${path === "/settings" && 'text-extreme'}`} />
                    </Link>
                </div>
            </IconContext.Provider>
        </div>
    );
}
