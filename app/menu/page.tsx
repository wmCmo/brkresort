'use client';

import { MenuCategorySchema, MenuCategoryType, MenuType } from "@/types/notion";
import kebabToTitle from "@/utils/kebabToTitle";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
    const [category, setCategory] = useState<MenuCategoryType>(MenuCategorySchema.enum["must-try"]);
    const [showCategory, setShowCategory] = useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ['menuData'],
        queryFn: async (): Promise<{ res: { result: MenuType[]; }; }> => {
            const res = await fetch('/api/menu');
            if (!res.ok) throw new Error("Couldn't get the menu");
            return res.json();
        }
    });

    return (
        <div className="p-4 text-extreme">
            <div>
                <h1 className="font-bold text-3xl">Menu</h1>
            </div>
            <button onClick={() => setShowCategory(prev => !prev)} type="button" className="flex items-center gap-2 bg-foreground px-6 py-2 rounded-full font-bold">
                {kebabToTitle(category)}
                <CaretDownIcon className={`${showCategory ? "rotate-0" : "-rotate-90"} transition-all duration-100 ease-linear`} />
            </button>
            {
                showCategory &&
                <div className="flex flex-col gap-4 bg-foreground max-w-40 mt-4 py-4 rounded-lg">
                    {MenuCategorySchema.options.map(menu => (
                        <button onClick={() => setCategory(menu)} type="button" key={menu} className={`${category !== menu && 'text-neutral-400'}`}>{kebabToTitle(menu)}</button>
                    ))}
                </div>
            }
            {/* <select name="menu-category" id="menu-category">
                {MENU_CATEGORY.map(category => <option key={category} value={category}>{category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</option>)}
            </select> */}
        </div >
    );
}
