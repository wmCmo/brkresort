import Nav from "@/components/Nav";
import ViewMenuButton from "@/components/ViewMenuButton";

export default function HomePage() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center px-2 text-extreme">
      <img className="h-16 w-16" src="/ui/logo.svg" alt="Circle logo of BRK" />
      <div className="relative mt-4">
        <h1 className="font-bold text-5xl text-center text-extreme">Baan Rai Khun Ya Resort</h1>
        <img className="absolute top-0 right-10" src="/svg/leaves.svg" alt="Minimal leaves illustration" />
      </div>
      <p className="text-center my-4 text-extreme">บ้านพักตากอากาศไม้ริมน้ำสุดผ่อนคลาย</p>
      <Nav />
      <div className="mt-8">
        <ViewMenuButton />
      </div>
    </div>
  );
}
