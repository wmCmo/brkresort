'use client';

import MenuItem from "@/components/MenuItem";
import MenuSkeleton from "@/components/MenuSkeleton";
import ViewMenuButton from "@/components/ViewMenuButton";
import useConfirm from "@/hooks/useConfirm";
import useSession from "@/hooks/useSession";
import addHistory from "@/queries/addHistory";
import getHistory from "@/queries/getHistory";
import getMenu from "@/queries/getMenu";
import CartType, { CART_KEY } from "@/types/Cart";
import { HouseObj } from "@/types/Session";
import verifySession from "@/utils/verifySession";
import { TrashIcon } from "@phosphor-icons/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CartPage() {
    const [cart, setCart] = useState<CartType | null>(null);
    const [serveTime, setServeTime] = useState(new Date(new Date().getTime() + (60 * 60 * 1000)).toLocaleString("sv-SE").replace(" ", "T").slice(0, 16));

    const { session } = useSession();
    const { ask, modal } = useConfirm();

    const queryClient = useQueryClient();
    const router = useRouter();

    const initialLoad = useRef(true);

    useEffect(() => {
        if (!initialLoad.current) return;

        try {
            const raw = localStorage.getItem(CART_KEY);
            if (raw) {
                setCart(JSON.parse(raw));
            }
        } catch {
            setCart({});
        } finally {
            initialLoad.current = false;
        }
    }, []);

    useEffect(() => {
        if (!cart) return;
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['menuData'],
        queryFn: getMenu
    });

    queryClient.prefetchQuery({
        queryKey: ['history'],
        queryFn: () => getHistory(session?.sig)
    });

    const house = session?.house;
    const idInCart = Object.keys(cart ?? {});
    const menu = data?.filter(item => idInCart.includes(item.id)) ?? [];

    async function handleClearCart() {
        const ok = await ask("Are you sure you want to remove all items?", "delete");
        if (!ok) return;

        setCart({});
        try {
            localStorage.setItem(CART_KEY, '{}');
        } catch {
            //ignore clearing localStorage error
        }
    }

    function handleClearItem(id: string) {
        setCart(prev => {
            const newPrev = { ...prev };
            delete newPrev[id];
            return newPrev;
        });
    }

    async function handleSubmit() {
        //0. check if the cart is empty
        if (!cart || Object.keys(cart).length < 1) {
            ask("Your cart is current empty.", "warning");
            return;
        }

        //1. check if the session is valid
        //- the signature is valid
        //- today is not the after checkout date
        if (!session?.checkout || !house || !session.sig) {
            ask("Please ask for the QR code or URL from our staff.", "warning");
            return;
        }

        const sessionIsValid = await verifySession(session);
        if (!sessionIsValid || (new Date(session.checkout) < new Date())) {
            console.error(sessionIsValid, (new Date(session.checkout) > new Date()));
            ask("Please ask for the new QR code or URL from our staff.", "warning");
            return;
        }

        //2. check if the order time is valid
        //- is 1hr after present
        //- is between 12:00 - 20:00
        //- is before noon on the checkout date

        if (new Date(serveTime) < new Date(new Date().getTime() + (50 * 1000 * 60))) { //50 mins from now
            ask("The serve time has to be placed at least 1 hour from now.", "warning");
            return;
        }

        const serveHr = new Date(serveTime).getHours();
        if (serveHr < 12 || serveHr > 20) {
            ask("You can only order between 12PM and 8PM", "warning");
            return;
        }

        if (session.checkout === new Date(serveTime).toISOString().slice(0, 10)) {
            ask("You cannot order on your checkout date.", "warning");
            return;
        }

        const ok = await ask("Submit the order now?", "confirm");
        if (!ok) return;

        const total = menu.reduce((acc, value) => acc + (value.properties.Price.number * cart[value.id]), 0);

        try {
            const historyRes = await addHistory({
                house,
                menu,
                serveTime,
                total,
                sig: session.sig,
                cart
            });

            try {
                await fetch('/api/sendLine', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: `บ้าน ${HouseObj[house].th}
Serve: ${new Date(serveTime).toDateString()} (${new Date(serveTime).toTimeString().slice(0, 5)})
======
${menu.map(item => {
                            const name = item.properties.Name.title.at(0)?.plain_text;
                            return `${name} = ${cart[item.id]}`;
                        }).join("\n")}
Total: THB ${total.toLocaleString()}

Order Link:
${historyRes.public_url}
`
                    })
                });

                //if success: clear cart
                setCart({});

                //invalidate history cache
                queryClient.invalidateQueries({ queryKey: ['history'] });

                //redirect to history page
                router.push('/menu/history');
                return;
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    return (
        <div className="p-4 text-extreme relative min-h-dvh flex flex-col">
            <div className="sticky top-0 z-20 bg-background py-4 flex items-center justify-between">
                <div className="relative">
                    <div className="flex items-center gap-2">
                        <img src="/ui/logo.svg" alt="logo for brk resort" className="h-6 w-6" />
                        <h1 className="font-bold text-3xl">Confirm Cart</h1>
                    </div>
                    <img src="/svg/leaves.svg" alt="Minimal leaves svg illustration" className="absolute -top-2 -right-5" />
                </div>
                <div>
                </div>
            </div>
            {
                !isLoading
                    ? menu.length > 0
                        ?
                        <div className="flex flex-col flex-1">
                            <div className="space-y-4 mb-60">
                                {
                                    menu.map((item) => {
                                        const price = item.properties.Price.number;
                                        return (
                                            <div key={item.id} className="relative flex justify-between bg-foreground rounded-lg border border-border p-4">
                                                <MenuItem
                                                    cart={cart ?? {}}
                                                    dishName={item.properties.Name.title.at(0)?.plain_text}
                                                    id={item.id}
                                                    idInCart={idInCart}
                                                    price={price}
                                                    setCart={setCart}
                                                    english={item.properties.Description.rich_text.at(0)?.plain_text}
                                                    imageUrl={item.properties.Image.files.at(0)?.file.url}
                                                />
                                                <button onClick={() => handleClearItem(item.id)} type="button" className="mb-auto">
                                                    <TrashIcon className="text-muted" weight="fill" size={24} />
                                                </button>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="mt-auto bg-foreground flex flex-col justify-center items-center p-4 rounded-t-lg gap-3 fixed bottom-16 w-full left-0 border-y border-border">
                                <div className="flex justify-between items-center gap-4 max-w-xs w-full">
                                    <p className="text-muted">Serve Time</p>
                                    <div className="border-border border flex-1 h-0" />
                                    <input type="datetime-local" name="serve-time" id="serve-time" className="text-sm outline-none w-fit text-right bg-border px-2 py-0.5 rounded-sm [&::-webkit-calendar-picker-indicator]:hidden" onChange={e => setServeTime(e.target.value)} value={serveTime.slice(0, 16)} />
                                </div>
                                <div className="flex justify-between items-center gap-4 max-w-xs w-full">
                                    <p className="text-muted">Total</p>
                                    <div className="border-border border flex-1 h-0" />
                                    <p className="text-muted">THB <span className="text-extreme text-xl font-bold">{menu.reduce((acc, val) => acc + (val.properties.Price.number * (cart ?? {})[val.id]), 0).toLocaleString()}</span></p>
                                </div>
                                <div className="flex items-center w-full gap-4">
                                    <button onClick={handleClearCart} type="button" className="text-muted ml-auto bg-border px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                                        <TrashIcon weight="fill" />
                                        Clear Order
                                    </button>
                                    <button onClick={handleSubmit} type="button" className="text-white text-center bg-lime-600 px-4 py-2 rounded-full font-bold max-w-xs flex-1">Order now</button>
                                </div>
                            </div>
                        </div>
                        : <div className="flex-1 w-full flex flex-col items-center justify-center gap-8">
                            <img src="/svg/undraw_breakfast_rgx5.svg" alt="breakfast artwork" className="w-48" />
                            <h1 className="text-center max-w-xs">Looks like there&lsquo;s nothing in your cart.</h1>
                            <ViewMenuButton />
                        </div>
                    : <MenuSkeleton />
            }
            {modal}
        </div>
    );
}
