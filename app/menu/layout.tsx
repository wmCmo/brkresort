import MobileNav from '@/components/MobileNav';
import Nav from '@/components/Nav';
import { Metadata } from 'next';
import { ReactNode } from 'react';

const title = "Online Menu";
const description = "สั่งอาหารออนไลน์บ้านไร่คุณย่า Quick Order at BRK";
const imageURL = "https://res.cloudinary.com/dbapq0zhz/image/upload/v1755189709/menu-banner_pvs4lv.png";

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        images: [{
            url: imageURL,
            width: 1200,
            height: 630,
            alt: "Baan Rai Khun Ya online menu minimal banner"
        }]
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@heise_15',
        title,
        description,
        images: [imageURL]
    }
};

export default function Layout({ children }: { children: ReactNode; }) {
    return (
        <main className=''>
            {children}
        </main>
    );
}
