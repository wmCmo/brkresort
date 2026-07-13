import { ChatCircleTextIcon, FacebookLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-foreground py-20 w-full">
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
    );
}
