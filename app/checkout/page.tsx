"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const { user, loading: authLoading } = useAuth();
    const { cart, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !authLoading && !user) {
            router.push("/login?redirect=/checkout");
        }
    }, [user, authLoading, router, mounted]);

    if (!mounted || authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
                <div className="w-12 h-12 border-4 border-[#F36F21] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const { error } = await supabase.from("orders").insert([
                {
                    user_id: user.id,
                    total_price: totalPrice,
                    status: "Pending",
                    items: cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    }))
                }
            ]);

            if (error) throw error;

            setOrderStatus("success");
            clearCart();
        } catch (error: any) {
            setErrorMessage(error.message);
            setOrderStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderStatus === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] px-6">
                <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-xl border border-orange-50 text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-black text-[#101828] mb-4 text-center tracking-tighter leading-none">
                        Order <span className="text-[#F36F21]">Placed!</span>
                    </h1>
                    <p className="text-[#475467] mb-8 font-medium">Thank you for your purchase. Your order has been successfully recorded.</p>
                    <div className="space-y-4">
                        <Button className="w-full bg-[#101828] hover:bg-black text-white h-14 rounded-2xl font-bold" asChild>
                            <Link href="/orders">View Order History</Link>
                        </Button>
                        <Button variant="ghost" className="w-full text-[#475467] font-bold" asChild>
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] py-16 px-6">
            <div className="container mx-auto max-w-2xl">
                <h1 className="text-4xl font-[1000] text-[#101828] mb-8 tracking-tight">
                    Final <span className="text-[#F36F21]">Checkout</span>
                </h1>

                {orderStatus === "error" && (
                    <Alert variant="destructive" className="mb-8 rounded-2xl border-red-100 bg-red-50">
                        <AlertCircle className="h-5 w-5" />
                        <AlertTitle>Checkout Failed</AlertTitle>
                        <AlertDescription>{errorMessage || "There was an error processing your order. Please try again."}</AlertDescription>
                    </Alert>
                )}

                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-orange-50">
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-orange-50">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-[#F36F21]" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#F36F21] uppercase tracking-wider">Your selection</p>
                            <h2 className="text-xl font-black text-[#101828]">{cart.length} items to be delivered</h2>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-[#FDFCFB] p-4 rounded-2xl border border-orange-50/50">
                                <div>
                                    <p className="font-bold text-[#101828]">{item.name}</p>
                                    <p className="text-sm text-[#475467]">Qty: {item.quantity} × ${item.price.toLocaleString()}</p>
                                </div>
                                <p className="font-black text-[#101828]">${(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#101828] rounded-3xl p-8 text-white mb-10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 font-medium">Subtotal</span>
                            <span className="font-bold">${totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-400 font-medium">Shipping</span>
                            <span className="text-green-400 font-bold">Free</span>
                        </div>
                        <div className="h-[1px] bg-slate-800 mb-6"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">Grand Total</span>
                            <span className="text-3xl font-black text-[#F36F21]">${totalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    <Button
                        onClick={handlePlaceOrder}
                        disabled={isSubmitting || cart.length === 0}
                        className="w-full bg-[#F36F21] hover:bg-[#ff8c42] text-white h-20 rounded-[24px] font-black text-2xl shadow-xl shadow-orange-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span>Complete Order</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
