'use client';

import { HouseObj, HouseType, isHouseType } from "@/types/Session";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import * as htmlToImage from 'html-to-image';
import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";

export default function AdminPage() {
    const [house, setHouse] = useState<HouseType>('jak');
    const [checkout, setCheckout] = useState(new Date(new Date().getTime() + 1000 * 60 * 60 * 24).toISOString().slice(0, 10));
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsgenerated] = useState(false);
    const [signature, setSignature] = useState('');
    const [isCopying, setIsCopying] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    async function handleGenerate() {
        const payload = { house, checkout };
        setIsGenerating(true);
        const res = await fetch('/api/getSignature', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ payload })
        });
        const { sig } = await res.json();

        setSignature(sig);
        setIsGenerating(false);
        setIsgenerated(true);
    }

    const url = new URL(`https://superhandsome-nondynastically-india.ngrok-free.dev/menu?house=${btoa(house ?? '')}&checkout=${btoa(checkout)}&sig=${signature}`);

    function handleCopy() {
        setIsCopying(true);
        setTimeout(() => {
            setIsCopying(false);
        }, 1000);
        navigator.clipboard.writeText(url.toString());
    }

    function handleDownload() {
        if (!ref.current) return;

        htmlToImage.toPng(ref.current, { pixelRatio: 2 }).then(dataUrl => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `qr-${house}-${checkout}.png`;
            link.click();
        });
    }

    return (
        <div className="text-extreme p-4 flex flex-col items-center gap-4 pb-20">
            <h1 className="text-4xl font-black text-center">Admin Page</h1>
            <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                {Object.entries(HouseObj).map(([key, value]) => {
                    if (isHouseType(key)) {
                        return <button className={`${key === house ? 'text-background bg-extreme' : 'text-muted'} px-2 py-0.5 border border-border rounded-md animate-out hover:bg-muted hover:text-accent`} key={key} type="button" onClick={() => { setHouse(key); setIsgenerated(false); }}>{value.th}</button>;
                    }
                })}
            </div>
            <div className="flex justify-between gap-4">
                <h4>Checkout Date</h4>
                <input className="outline-none bg-foreground px-4 py-0.5 rounded-lg text-center font-bold [&::-webkit-calendar-picker-indicator]:invert" type="date" name="checkout" id="checkout" value={checkout} onChange={e => { setCheckout(e.target.value); setIsgenerated(false); }} />
            </div>

            {isGenerated && <div className="flex items-center gap-4">
                <button type="button" className="bg-foreground px-2 py-1 rounded-lg font-bold text-extreme flex items-center gap-2" onClick={handleCopy}><LinkIcon /> {isCopying ? "Copied!" : "Copy Link"}</button>
                <button type="button" className="bg-foreground px-2 py-1 rounded-lg font-bold text-extreme flex items-center gap-2" onClick={handleDownload}><DownloadSimpleIcon /> Download</button>
            </div>}

            <section ref={ref} className="flex sm:flex-row flex-col  gap-8 relative bg-white text-neutral-700 rounded-lg px-4 py-8 items-center">
                <div>
                    <img src="/svg/packed-leaves.svg" alt="Minimal leaves illustration" className="top-0 right-0 absolute h-12 w-12" />
                    <h1 className="text-2xl text-center">Baan Rai Khun Ya</h1>
                    <h2 className="text-4xl text-center font-bold">Menu</h2>
                    <div className="relative qr-code mt-4">
                        {
                            isGenerated
                                ? <>
                                    <QRCodeSVG
                                        value={url.toString()}
                                        fgColor="#525252"
                                        size={300}
                                        marginSize={2}
                                    />
                                    <img src="/ui/logo.svg" alt="BRK logo" className="absolute h-15 w-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                </>

                                : <div className="h-75 w-75 flex justify-center items-center rounded-md border border-neutral-200 p-4">
                                    <button className="bg-neutral-700 text-white px-2 py-1 rounded-lg font-bold" type="button" onClick={handleGenerate}>{isGenerating ? "Generating..." : "Generate"}</button>
                                </div>
                        }
                    </div>
                </div>
                <section className="px-8 mt-4">
                    <h2 className="text-lg">Kitchen Opening Hours:</h2>
                    <h2 className="text-lg">12:00 - 19:30</h2>
                    <p className="text-sm">Food preparation takes approximately <strong>1 hour</strong></p>
                    <p className="text-sm">Advance reservation is accepted</p>

                    <h2 className="mt-4 text-lg">เวลาเปิดครัว</h2>
                    <h2 className="text-lg">12:00 - 19:30</h2>
                    <p className="text-sm">อาหารใช้เวลาเตรียมการประมาณ<strong>หนึ่งชั่วโมง</strong></p>
                    <p className="text-sm">ท่านลูกค้าสามารถสั่งอาหารล่วงหน้าได้</p>
                </section>
                <img src="/svg/packed-leaves.svg" alt="Packed leaves illustration" className="h-16 w-16 absolute bottom-0 left-0 rotate-90 scale-y-[-1]" />
            </section>
        </div>
    );
}
