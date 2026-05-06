'use client';

import { MenuCategorySchema, MenuCategoryType, MenuType } from "@/types/notion";
import kebabToTitle from "@/utils/kebabToTitle";
import { CaretUpIcon, ImageSquareIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [category, setCategory] = useState<MenuCategoryType>(MenuCategorySchema.enum["must-try"]);
    const [showCategory, setShowCategory] = useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ['menuData'],
        queryFn: async (): Promise<{ res: { results: MenuType[]; }; }> => {
            const res = await fetch('/api/menu');
            if (!res.ok) throw new Error("Couldn't get the menu");
            return res.json();
        }
    });

    return (
        <div className="p-4 text-extreme relative min-h-dvh">
            <div>
                <h1 className="font-bold text-3xl">Menu</h1>
            </div>
            <div className="space-y-4">
                {data?.res.results && data.res.results.filter(dish => dish.properties.Category.select.name === category).map(dish => {
                    const dishName = dish.properties.Name.title[0].plain_text;
                    const imageUrl = dish.properties.Image.files?.[0]?.file.url;
                    return (
                        <div key={dish.id} className="flex gap-2 items-center">

                            {
                                imageUrl
                                    ? <Image src={imageUrl ?? "https://avatars.githubusercontent.com/u/51499433?v=4"} alt={dishName} className="rounded-full h-20 w-20" height={80} width={80} />
                                    : <div className="w-20 h-20 rounded-full bg-second animate-pulse flex justify-center items-center">
                                        <ImageSquareIcon size={80} className="text-border" weight="fill" />
                                    </div>
                            }
                            <div>
                                <h2>{dishName}</h2>
                                <h3><span className="text-muted">THB </span>{dish.properties.Price.number}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {
                showCategory &&
                <div className="absolute right-4 bottom-22 flex flex-col gap-4 bg-foreground max-w-40 mt-4 p-4 rounded-lg">
                    {MenuCategorySchema.options.map(menu => (
                        <button onClick={() => setCategory(menu)} type="button" key={menu} className={`px-2 hover:bg-border animate-out py-2 rounded-lg ${category === menu ? 'font-semibold' : 'text-neutral-400'}`}>{kebabToTitle(menu)}</button>
                    ))}
                </div>
            }
            <button onClick={() => setShowCategory(prev => !prev)} type="button" className="absolute bottom-8 right-4 flex items-center gap-2 bg-foreground px-6 py-2 rounded-full font-bold">
                {kebabToTitle(category)}
                <CaretUpIcon className={`${showCategory ? "rotate-0" : "rotate-90"} transition-all duration-100 ease-linear`} />
            </button>
        </div >
    );
}
