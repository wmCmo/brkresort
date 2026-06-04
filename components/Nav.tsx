'use client';

import Logo from "@/components/Logo";
import { ListIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false);
    const pathName = usePathname();

    function boldCurerntPath(pn: string) {
        return pathName === pn ? 'font-bold' : '';
    }

    function LinkComp({ name, link }: { name: string; link: string; }) {
        return <Link href={link} className={`hover:underline underline-offset-4 ${boldCurerntPath(link)}`}>{name}</Link>;
    }

    return (
        <nav className={`${(pathName.startsWith('/menu') || pathName.startsWith('/settings')) ? 'hidden' : 'flex'} backdrop-blur-lg w-dvw absolute top-0 items-center justify-between px-4 py-2 text-accent`}>
            <Link href={'/'} className="flex items-center gap-2">
                <img className="h-8 w-8" src="/ui/logo.svg" alt="Circle logo of BRK" />
                <Suspense>
                    <Logo width={120} />
                </Suspense>
            </Link>
            <button type="button" className="sm:hidden " onClick={() => setShowMenu(prev => !prev)}>
                <ListIcon weight="bold" className="w-8 h-8" />
            </button>
            <div className={`${showMenu ? 'fixed flex sm:static ' : 'hidden sm:flex'} py-8 sm:py-0 backdrop-blur-lg z-20 left-0 top-14 flex-col items-center w-full sm:w-fit sm:flex-row gap-4`}>
                <div />
                <LinkComp link="/" name="Home" />
                <LinkComp link="/activities" name="Activities" />
                <LinkComp link="/menu" name="Menu" />
                <LinkComp link="/blog" name="Blog" />
                <Link href={'/contact'} className={`hover:underline underline-offset-4 ${boldCurerntPath('/contact')}`}>Contact Us</Link>
                <Link className="px-4 py-1 bg-white text-accent rounded-lg font-bold hover:translate-y-0.5 active:translate-y-1 animate-out" href={'https://book-directonline.com/properties/banraikhunyadirect'} target="_blank" rel="noopener noreferrer">Book Now</Link>
            </div>
        </nav>
    );
};
