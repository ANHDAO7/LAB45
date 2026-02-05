"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";

interface ProductProps {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
}

export function ProductCard({ id, name, description, price, image }: ProductProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart({ id, name, price, image }, quantity);
        setQuantity(1); // Reset quantity after adding
    };

    return (
        <Card className="overflow-hidden border-orange-50 bg-white/50 backdrop-blur-sm hover:shadow-[0_20px_50px_rgba(243,111,33,0.1)] transition-all duration-500 group flex flex-col h-full rounded-[24px] border border-white hover:border-orange-100">
            <div className="relative aspect-square overflow-hidden bg-white p-6">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-700 p-2"
                />
                {/* Subtle badge */}
                <div className="absolute top-4 left-4 bg-[#101828] text-white text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    QUICK VIEW
                </div>
            </div>
            <CardHeader className="flex-grow px-6 pt-6">
                <div className="flex justify-between items-start mb-3 gap-3">
                    <CardTitle className="text-xl font-extrabold text-[#101828] leading-tight group-hover:text-[#F36F21] transition-colors">{name}</CardTitle>
                    <div className="px-3 py-1 bg-orange-50 rounded-lg">
                        <span className="text-[#F36F21] font-black text-lg whitespace-nowrap">{price}</span>
                    </div>
                </div>
                <CardDescription className="text-[#667085] line-clamp-3 text-sm leading-relaxed font-medium">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="px-6 pb-6 pt-0 mt-auto flex flex-col gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between w-full bg-white/80 rounded-xl p-1 border border-orange-100">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-orange-50 rounded-lg text-[#F36F21] transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-[#101828]">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-orange-50 rounded-lg text-[#F36F21] transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <Button
                    onClick={handleAdd}
                    className="w-full bg-[#101828] hover:bg-[#F36F21] text-white py-6 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-slate-100 hover:shadow-orange-200"
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
