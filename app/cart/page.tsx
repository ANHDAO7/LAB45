"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

    return (
        <div className="min-h-screen bg-[#FDFCFB] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-100 rounded-full blur-[120px] opacity-50 -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-100 rounded-full blur-[100px] opacity-40 -z-10"></div>

            <main className="container mx-auto px-6 py-16 relative">
                <Link href="/" className="inline-flex items-center gap-2 text-[#475467] hover:text-[#F36F21] font-bold mb-8 transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Shopping
                </Link>

                <h1 className="text-4xl font-[1000] text-[#101828] mb-12 tracking-tight">
                    Your <span className="text-[#F36F21]">Shopping Cart</span>
                </h1>

                {cart.length === 0 ? (
                    <div className="bg-white/50 backdrop-blur-xl border border-orange-100 rounded-[32px] p-16 text-center shadow-sm">
                        <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Trash2 className="w-10 h-10 text-[#F36F21] opacity-20" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#101828] mb-4">Your cart is empty</h2>
                        <p className="text-[#475467] mb-8 max-w-md mx-auto">Looks like you haven&apos;t added anything to your cart yet. Explore our premium collection and find something you love.</p>
                        <Button className="bg-[#101828] hover:bg-[#F36F21] text-white px-8 py-6 rounded-2xl font-bold transition-all" asChild>
                            <Link href="/">Start Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white/50 backdrop-blur-xl border border-white hover:border-orange-100 rounded-[32px] p-6 shadow-sm transition-all flex flex-col sm:flex-row items-center gap-6 group">
                                    <div className="w-32 h-32 bg-white rounded-2xl p-4 relative flex-shrink-0 overflow-hidden border border-orange-50">
                                        <Image src={item.image} alt={item.name} fill className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="text-xl font-bold text-[#101828] mb-1 group-hover:text-[#F36F21] transition-colors">{item.name}</h3>
                                        <p className="text-[#F36F21] font-black text-lg">${item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center bg-white/80 rounded-xl p-1 border border-orange-100 shadow-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-orange-50 rounded-lg text-[#F36F21] transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center font-bold text-[#101828]">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-orange-50 rounded-lg text-[#F36F21] transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-3 text-[#FDA29B] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#101828] text-white rounded-[32px] p-8 shadow-2xl shadow-orange-200 sticky top-32">
                                <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-400 font-medium">
                                        <span>Subtotal ({totalItems} items)</span>
                                        <span>${totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-green-400">Free</span>
                                    </div>
                                    <div className="h-[1px] bg-slate-800 my-4"></div>
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-[#F36F21]">${totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-[#F36F21] hover:bg-[#ff8c42] text-white py-8 rounded-2xl font-black text-lg shadow-lg shadow-orange-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    Checkout Now
                                </Button>

                                <p className="mt-6 text-center text-xs text-slate-500 font-medium">
                                    Secure checkout powered by DADO Pay
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <div className="py-20 text-center border-t border-orange-50">
                <p className="text-sm font-semibold text-[#98A2B3]">© 2026 DADO Shop. All rights reserved.</p>
            </div>
        </div>
    );
}
