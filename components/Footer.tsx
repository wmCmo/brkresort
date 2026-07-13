import Logo from "@/components/Logo";
import { ChatCircleTextIcon, FacebookLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Suspense } from "react";

export default function Footer() {
    return (
        <div className="bg-foreground py-12 w-full flex justify-between px-8 gap-16 sm:flex-row flex-col ">
            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-1 items-center">
                    <img src="/ui/logo.svg" alt="Logo for the footer" className="h-10 w-10" />
                    <Suspense>
                        <Logo width={120} />
                    </Suspense>
                </div>
                <div className="flex gap-3 items-center">
                    <Link target="_blank" rel="noopenner noreferrer" href={'https://line.me/R/ti/p/@ckr7132x'} className="">
                        <ChatCircleTextIcon className="text-white bg-[#4ECD00] p-1 rounded-lg animate-out hover:translate-y-0.5 active:translate-y-1" weight="fill" size={24} />
                    </Link>
                    <Link target="_blank" rel="noopenner noreferrer" href={'https://www.facebook.com/Baanraikhunya'}>
                        <FacebookLogoIcon className="text-white bg-[#0866FF] p-1 rounded-lg animate-out hover:translate-y-0.5 active:translate-y-1" weight="fill" size={24} />
                    </Link>
                    <Link target="_blank" rel="noopenner noreferrer" href={'https://www.instagram.com/baanraikhunya5/'}>
                        <InstagramLogoIcon className="text-white bg-[#FC255C] p-1 rounded-lg animate-out hover:translate-y-0.5 active:translate-y-1" weight="fill" size={24} />
                    </Link>
                </div>
            </div>
            <div className="flex gap-8 text-accent sm:flex-row flex-col">
                <div>
                    <h4 className="font-bold text-xl">Call us</h4>
                    <p>061 519 2896</p>
                    <h4 className="font-bold text-xl mt-2">Email</h4>
                    <p>pprajeeya@gmail.com</p>
                </div>
                <div className="max-w-xs">
                    <h4 className="font-bold text-xl">Address</h4>
                    <p>
                        BaanRaiKhunYa  221/1 Baan Wang Kmae Moo9 Tha Sao, Sai Yok District, Kanchanaburi 71150
                    </p>
                    <p>
                        บ้านไร่คุณย่า  221/1 บ้านวังเขมร หมู่9 ตำบลท่าเสา อำเภอไทรโยค  จังหวัดกาญจนบุรี  71150
                    </p>
                </div>
            </div>
        </div >
    );
}
