'use client';

import { getMenu } from "@/app/actions/menu";
import { submitOrder } from "@/app/actions/order";
import Header from "@/components/Header";
import MenuItem from "@/components/MenuItem";
import MenuSkeleton from "@/components/MenuSkeleton";
import ViewMenuButton from "@/components/ViewMenuButton";
import useConfirm from "@/hooks/useConfirm";
import useSession from "@/hooks/useSession";
import { CART_KEY, CartType } from "@/types/Cart";
import { dateToString } from "@/utils/dateToString";
import { isKitchenOpen, verifyOrder } from "@/utils/verifyOrder";
import { TrashIcon } from "@phosphor-icons/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CartPage() {
    const [cart, setCart] = useState<CartType | null>(null);
    const [serveTime, setServeTime] = useState(() => {
        const now = new Date();
        const isOpen = isKitchenOpen(now);
        if (isOpen) {
            return dateToString(new Date(now.getTime() + (60 * 60 * 1000)));
        } else {
            const newServeTime = new Date();
            newServeTime.setDate(now.getDate() + 1);
            newServeTime.setHours(13, 0, 0, 0);
            return dateToString(newServeTime);
        }
    });

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

    const { data, isLoading } = useQuery({
        queryKey: ['menuData'],
        queryFn: getMenu
    });

    const idInCart = Object.keys(cart ?? {});
    const menu = data?.menu?.filter(item => idInCart.includes(item.id)) ?? [];

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

    const total = cart ? menu.reduce((acc, value) => {
        return acc + (value.price * cart[value.id]);
    }, 0) : 0;

    async function handleSubmit() {
        const isValidOrder = await verifyOrder(serveTime, session, cart);

        if (!(isValidOrder).passed) {
            switch (isValidOrder.reason) {
                case "empty-cart":
                    ask("Your cart is currently empty.", "warning");
                    break;
                case "no-session":
                    ask("Please ask our staff for the QR code or URL.", "warning");
                    break;
                case "old-session":
                    ask("Please ask our staff for the new QR code or URL.", "warning");
                    break;
                case "less-than-hr":
                    ask("The serve time has to be placed at least 1 hour from now.", "warning");
                    break;
                case "kitchen-closed":
                    ask("You can only order between 12PM and 8PM", "warning");
                    break;
                case "check-out":
                    ask("You cannot order on your checkout date.", "warning");
                    break;
            }
            return;
        }

        const ok = await ask("Submit the order now?", "confirm");
        if (!ok) return;

        try {
            await submitOrder(session!, cart!, serveTime, menu, total);
            //if success: clear cart
            setCart({});

            //invalidate history cache
            queryClient.invalidateQueries({ queryKey: ['history'] });

            //redirect to history page
            router.push('/menu/history');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="p-4 text-extreme relative min-h-dvh flex flex-col">
            <Header title="Confirm Cart" />
            {
                isLoading
                    ? <MenuSkeleton />
                    : menu.length < 1
                        ? <div className="flex-1 w-full flex flex-col items-center justify-center gap-8">
                            <img src="/svg/undraw_breakfast_rgx5.svg" alt="breakfast artwork" className="w-48" />
                            <h1 className="text-center max-w-xs">Looks like there&lsquo;s nothing in your cart.</h1>
                            <ViewMenuButton />
                        </div>
                        : <div className="flex flex-col flex-1">
                            <div className="space-y-4 mb-60">
                                {
                                    menu.map((item) => {
                                        return (
                                            <div key={item.id} className="relative flex justify-between bg-foreground rounded-lg border border-border p-4">
                                                <MenuItem
                                                    cart={cart ?? {}}
                                                    dishName={item.name}
                                                    id={item.id}
                                                    idInCart={idInCart}
                                                    price={item.price}
                                                    setCart={setCart}
                                                    english={item.description}
                                                    imageUrl={item.image}
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
                                    <p className="text-muted">THB <span className="text-extreme text-xl font-bold">{total.toLocaleString()}</span></p>
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
            }
            {modal}
        </div>
    );
}
