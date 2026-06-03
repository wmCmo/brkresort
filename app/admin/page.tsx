import AdminPageClient from "@/app/admin/AdminPage";
import { Suspense } from "react";

export default function AdminPage() {
    return (
        <Suspense fallback={<div className="text-accent">loading...</div>}>
            <AdminPageClient />
        </Suspense>
    );
}
