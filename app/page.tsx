import Nav from "@/components/Nav";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center px-2 text-extreme">
      <h1 className="font-bold text-5xl text-center text-extreme">Baan Rai Khun Ya Resort</h1>
      <p className="text-center my-4 text-extreme">บ้านพักตากอากาศไม้ริมน้ำสุดผ่อนคลาย</p>
      <Nav />
      <Link href={'/menu'} className="mt-8 bg-neutral-100 border border-border rounded-full px-4 py-2 font-bold hover:translate-y-0.5 active:translate-y-1 animate-out">View Menu</Link>
    </div>
  );
}
