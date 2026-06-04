import ChangeTheme from "@/components/ChangeTheme";
import ViewMenuButton from "@/components/ViewMenuButton";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center px-2 text-extreme overflow-hidden">
      <Image className="object-cover h-full w-full -z-10 absolute top-0 left-0" src={'https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/brk-hero'} width={2560} height={1440} alt="Riverside view" />
      <div className="relative mt-4">
        <h1 className="font-bold text-5xl text-center text-white">Baan Rai Khun Ya Resort</h1>
        <img className="absolute top-0 right-10" src="/svg/leaves.svg" alt="Minimal leaves illustration" />
      </div>
      <p className="text-center my-4 text-white text-xl">บ้านพักตากอากาศไม้ริมน้ำสุดผ่อนคลาย</p>
      <div className="mt-8">
        <ViewMenuButton />
      </div>
      <div className="fixed bottom-4 left-4">
        <ChangeTheme />
      </div>
    </div>
  );
}
