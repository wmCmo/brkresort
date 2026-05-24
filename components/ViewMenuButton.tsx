import Link from "next/link";

export default function ViewMenuButton() {
    return <Link href={'/menu'} className="bg-border rounded-full px-4 py-2 font-bold hover:translate-y-0.5 active:translate-y-1 animate-out">View Menu</Link>;
}
