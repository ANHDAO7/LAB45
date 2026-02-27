"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, Tag, CreditCard } from "lucide-react";

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface OrderProps {
    order: {
        id: string;
        created_at: string;
        total_price: number;
        status: string;
        items: OrderItem[];
    };
}

export function OrderCard({ order }: OrderProps) {
    const formattedDate = new Date(order.created_at).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <Card className="overflow-hidden border-orange-100/50 shadow-sm hover:shadow-md transition-shadow rounded-[24px] bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100/30 py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <Package className="w-5 h-5 text-[#F36F21]" />
                    </div>
                    <div>
                        <CardTitle className="text-sm font-bold text-[#101828]">Order #{order.id.slice(0, 8)}</CardTitle>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#475467] font-medium">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                        </div>
                    </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm ${order.status === "Completed" ? "bg-green-100 text-green-700" :
                        order.status === "Pending" ? "bg-orange-100 text-orange-700" :
                            "bg-blue-100 text-blue-700"
                    }`}>
                    {order.status}
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                    {order.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center group">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-orange-50 text-[#F36F21] text-[10px] font-bold flex items-center justify-center">
                                    {item.quantity}x
                                </span>
                                <span className="text-sm font-semibold text-[#344054] group-hover:text-[#F36F21] transition-colors">{item.name}</span>
                            </div>
                            <span className="text-sm font-medium text-[#101828]">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="h-[1px] bg-orange-50 mb-6"></div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#475467]">
                        <CreditCard className="w-4 h-4 opacity-50" />
                        <span className="text-sm font-medium">Total Amount</span>
                    </div>
                    <div className="text-2xl font-black text-[#F36F21] tracking-tight">
                        ${order.total_price.toLocaleString()}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
