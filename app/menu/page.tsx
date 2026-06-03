'use client';

import MenuPageClient from "@/app/menu/MenuPage";
import MenuSkeleton from "@/components/MenuSkeleton";
import { Suspense } from "react";

export default function MenuPage() {
    return (
        <Suspense fallback={<MenuSkeleton />}>
            <MenuPageClient />
        </Suspense>
    );
}
