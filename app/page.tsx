import BlogComp from "@/components/BlogComp";
import CallToActionButton from "@/components/CallToActionButton";
import { CaretRightIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { HouseHeartIcon, KayakIcon, SoupIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const bookUrl = "https://book-directonline.com/properties/banraikhunyadirect";

function HouseCard({ href, src, alt, h4, p }: { href: string; src: string; alt: string; h4: string; p: string; }) {
  return (
    <Link href={href}>
      <div className="flex flex-col hover:-translate-y-0.5 animate-out text-accent bg-foreground border border-border rounded-lg max-w-xs overflow-clip h-full -z-20">
        <div className="relative h-52 w-80 overflow-hidden">
          <Image className="object-cover" src={src} alt={`${alt} thumbnail`} fill sizes="320px" />
        </div>
        <div className="py-2 px-4">
          <h4 className="font-bold text-lg">{h4}</h4>
          <p className="mt-2">{p}</p>
        </div>
        <div className="flex items-center mt-auto self-end m-4 text-muted hover:text-accent animate-out">
          <span>Details</span>
          <CaretRightIcon />
        </div>
      </div>
    </Link>
  );
}

function YTComponent({ src }: { src: string; }) {
  return <div className="w-full aspect-video">
    <iframe className="rounded-lg w-full h-full" src={src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
  </div>;
}

function FeatureComponent({ icon, header, desc }: { icon: ReactNode; header: string; desc: string; }) {
  return <div className="max-w-md flex items-start flex-col gap-4">
    <div className="p-4 bg-lime-50 rounded-3xl border-2 border-lime-100">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold">{header}</h3>
      <p>{desc}</p>
    </div>
  </div>;
}

export default function HomePage() {
  return (
    <div className="px-2">
      <main className="h-dvh flex flex-col items-center justify-center text-extreme overflow-hidden">
        <Image className="object-cover object-left h-full w-full -z-10 absolute top-0 left-0" src={'https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/brk-hero-2'} width={2560} height={1440} alt="Tent view for hero" />
        <div className="relative mt-4 backdrop-blur-md rounded-xl p-6 -z-10 mb-4">
          <h1 className="font-bold text-5xl text-center text-white">Baan Rai Khun Ya Resort</h1>
          <img className="absolute top-6 right-10" src="/svg/leaves.svg" alt="Minimal leaves illustration" />
          <p className="text-center mt-4 text-white text-xl ">บ้านพักตากอากาศไม้ริมน้ำสุดผ่อนคลาย</p>
        </div>
        <CallToActionButton href={bookUrl} text="Book Now" isNewPage />
        <Link className="backdrop-blur-xl p-4 rounded-lg absolute bottom-4 right-4" href={'https://maps.app.goo.gl/Pz9qD4ebUnvH5L6D7'} target="_blank" rel="noopenner noreferrer">
          <div className="flex gap-2 items-center justify-end">
            <StarIcon color="#ffbb00" weight="fill" size={20} />
            <h4 className="text-2xl text-white font-bold">4.7</h4>
          </div>
          <p className="text-white font-medium">160+ Reviews</p>
        </Link>
      </main>
      <section className="flex justify-center">
        <div className="flex flex-col items-center max-w-sm sm:max-w-none w-full">
          <h2 className="text-center font-bold text-4xl text-accent mt-8">A Paradise for Your Vacation</h2>
          <div className="flex lg:flex-row items-center flex-col gap-4 mt-4">
            <Image className="rounded-lg h-auto w-auto" src={'https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/brk-hero'} alt="River picture" width={400} height={200} />
            <div className="flex flex-col gap-4">
              <p className="text-center text-extreme sm:text-left sm:max-w-sm"><strong>บ้านพักไม้ 5 หลัง</strong>ที่อยู่อิสระจากกัน ท่ามกลางธรรมชาติของแม่น้ำแควน้อยและภูเขา ณ อ.ไทรโยค กาญจนบุรี สัมผัสถึงบรรยากาศ ชมพระอาทิตย์ขึ้นที่โค้งน้ำทุกหลังเรือนบ้านไม้ที่กลมกลืนกับสภาพธรรมชาติโดยรอบ มีพื้นที่ใช้สอย อุปกรณ์ครบครัน
                พร้อมพื้นที่ในการเตรียมอาหาร สำหรับ BBQ และปาร์ตี้สังสรรค์ได้ แพริมน้ำเหมาะสำหรับการแช่น้ำและ
                ได้เติมเต็มกับกลุ่มเพื่อนและครอบครัว</p>
              <CallToActionButton href={bookUrl} text="Book Now" isNewPage className="border border-neutral-200 mx-auto sm:mx-0 sm:mr-auto" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex mt-16 flex-col items-center">
        <h1 className="font-bold text-4xl text-accent text-center">Go for a style that fits you</h1>
        <div className="p-4 flex flex-col sm:grid grid-cols-3 gap-4">
          <HouseCard
            href='/houses/chor-muang'
            src="https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/chor-muang.jpeg"
            h4="Grand tent เต้นท์กระโจม-ช่อม่วง"
            alt="Chor-muang tent"
            p="พัก 2 คน ริมน้ำ วิวแม่น้ำ/ทิวเขา เต็นท์กระโจม ริมน้ำแควน้อย มองเห็นวิวโค้งน้ำตอนพระอาทิตย์ขึ้น ได้ประสบการณ์"
          />
          <HouseCard
            href="/houses/jak"
            src="https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/jak.jpg"
            h4="Baan Jak Chalet บ้านจาก 3 ห้องนอน"
            p="บ้านจากริมน้ำ 3 ห้องนอน ริมแม่น้ำแควน้อย ระเบียงยาวๆ 15 ม สำหรับครอบครัวสังสรรค์กันตั้งแต่ 6 คน ขึ้นไป มีพื้นที่พักผ่อนหลายจุดให้เลือกใช้ได้"
            alt="Jak"
          />
          <HouseCard
            href="/houses/jun-pha"
            src="https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/jun-pha.jpg"
            h4="Grand Tent by river เต้นท์กระโจมจันผา"
            p="พัก 3 คน ริมน้ำ วิวแม่น้ำ/ทิวเขา เต็นท์กระโจม ริมน้ำแควน้อย มองเห็นวิวโค้งน้ำตอนพระอาทิตย์ขึ้นได้"
            alt="Jan Pha"
          />
          <HouseCard
            href="/houses/peep"
            src="https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/peep.jpg"
            h4="Baan Peeb Chalet บ้านปีป 2 ห้องนอน"
            p="Baan Peeb Chalet 2 Bedrooms บ้านปีป 2ห้องนอน พัก 4-6 คน ริมน้ำ วิวแม่น้ำ/ทิวเขา บ้านไม้ริมน้ำ 2 ห้องนอน บ้านไม้ริมน้ำแควน้อย ระเบียงยาวๆ"
            alt="Peep"
          />
          <HouseCard
            href="/houses/makarm"
            src="https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/makarm.jpg"
            h4="Baan Makarm Chalet บ้านมะขาม"
            p="บ้านพักไม้ริมเนิน 1 ห้องนอน พื้นที่ 60 ตรม พร้อมระเบียงขนาด 24 ตรม ที่สามารถมองเห็นวิวแม่น้ำแควน้อยและทิวเขา ในวันที่อากาศเย็นสบายได้เห็นหมอก"
            alt="Makarm"
          />
          <HouseCard
            href="/houses/manao"
            src="https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/manao.jpeg"
            h4="Chalet บ้านมะนาว สตูดิโอ"
            p="บ้านไม้ริมเนิน แบบสตูดิโอ พัก 2-4 คน วิว แม่น้ำ/ทิวเขา บ้านไม้ริมเนินให้คุณได้สัมผัสวิวแม่น้ำแควน้อยแบบ บ้านไม้ริมเนินให้คุณได้สัมผัสวิวแม่น้ำแควน้อย"
            alt="Manao"
          />
        </div>
      </section>
      <section className="mt-8 text-accent">
        <h1 className="font-bold text-4xl text-accent text-center">Meet Your Host</h1>
        <div className="flex sm:flex-row flex-col gap-8 items-center text-accent mt-4 justify-center">
          <Image src={'https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/brk-host.jpg'} alt="BRK host" width={300} height={300} className="rounded-full" />
          <div className="border-l-4 border-border pl-4 max-w-md">
            <h4 className="font-bold text-lg text-accent"> Welcome to Baanraikhunya, Sai-Yok Karnjanaburi!</h4>
            natural cottages by the river Kwai Noi with extraordinary panoramic view.
            There are only 5 units of accommodation in the area. Each of them are isolated and different type.

            (KhunYa means Grand mother). BaanRaiKhunYa means grand's mother home. You might feel like staying in your get away country home.
            You will get to meet her and her dog a lot, as well as exploring her food specialty. So greet us, if you have any enquiries and do not hesitate to ask about our place and services.

            <p className="font-bold"><i>See you soon !</i></p>
          </div>
        </div>
      </section>
      <section className="mt-16 text-accent">
        <h1 className="font-bold text-4xl text-accent text-center">What people are saying</h1>
        <div className="mt-8 flex gap-8 flex-col lg:grid sm:grid-cols-2 items-center place-self-center">
          <YTComponent src="https://www.youtube.com/embed/zDkWNQRUK2o?si=MwQDGDKYzQvc9HTr" />
          <FeatureComponent
            icon={<HouseHeartIcon className="text-lime-700" size={40} />}
            header="บ้านพักของเรา"
            desc="เช็คบ้านพักของเราก่อนสิคะ บ้านพักไม้ริมน้ำแควน้อย แวดล้อมด้วยธรรมชาติของทิวเขา ทุกบ้านมีความเป็นส่วนตัว ได้วิวแม่น้ำทุกหลัง ทุกหลังมีอุปกรณ์ครบ ถ้าเป็นสายลุยเราแนะนำเต้นท์กระโจมจันผาริมน้ำ ท่านจะได้ประสบการณ์ของธรรมชาติพร้อมความสะดวกสบาย"
          />
          <YTComponent src="https://www.youtube.com/embed/W-f6SxlAx4o?si=nVz5TT-Z8BwwCI0t" />
          <FeatureComponent
            icon={<SoupIcon className="text-lime-700" size={40} />}
            header="Food & Beverages"
            desc="ที่บ้านไร่คุณย่า เราเสริฟอาหารแบบ Homemade cooking เราคัดสรรอาหารและผลไม้ที่อยู่ในพื้นที่ชุมชนใกล้เคียงเพื่อให้ได้คุณภาพอาหารที่สดใหม่เสมอ เราปลูกพืชผักสวนครัวไว้ในพื้นที่รีสอร์ต และนำมาประกอบอาหาร อยากให้ลูกค้าได้ชิมน้ำลูกหม่อน น้ำมะนาวโซดานี่หอมชื่นใจ ยำผักกูด Is a must!! ดูเมนูอาหารก่อนสิคะ"
          />
          <YTComponent src="https://www.youtube.com/embed/7rN8THxdt4c?si=Cx2A_HW77xOV7K9t" />
          <FeatureComponent
            icon={<KayakIcon className="text-lime-700" size={40} />}
            header="Activities"
            desc="ทำให้วันพักผ่อนถูกเติมเต็มไปกับการทำกิจกรรมกับครอบครัวและเพื่อนๆ เรามีอุปกรณ์กีฬา เกมส์ หนังสือ ดูนก หรือปั่นจักรยานที่สามารถใช้ได้ไม่มีค่าใช้จ่าย หรือถ้าต้องการมาถึงมาไร่คุณย่าจริงๆแนะนำ ล่องแพเปียกช่วงพระอาทิตย์ตกดิน ดื่มไวน์ปาร์ตี้เล็กๆบนแพที่ล่องชมทิวทัศน์2ฝั่งแม่น้ำ หรือต้องการแบบพิเศษแนะนำ นั่งเรือหางยาวชมวิวไปแช่น้ำพุร้อน อันนี้เป็นบริการข้างนอกค่ะแต่แนะนำมากๆ"
          />
        </div>
      </section >
      <section className="mt-8">
        <h1 className="font-bold text-4xl text-accent text-center">News & Blogs</h1>
        <BlogComp />
      </section>
    </div >
  );
}
