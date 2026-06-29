import Link from "next/link";

export default function CallToActionButton({ href, text, isNewPage = false, className }: { href: string; text: string; isNewPage?: boolean; className?: string; }) {
    return <Link href={href} target={isNewPage ? "_blank" : "_self"} rel="noopenner noreferrer" className={`text-accent bg-border rounded-full px-4 py-2 font-bold hover:translate-y-0.5 active:translate-y-1 animate-out ${className}`}>{text}</Link>;
}
