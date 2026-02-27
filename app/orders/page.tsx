"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { OrderCard } from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login?redirect=/orders");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("user_id", user?.id)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || (loading && orders.length === 0)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-[#F36F21] animate-spin" />
                    <p className="text-[#475467] font-medium animate-pulse">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#FDFCFB] py-16 px-6 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] opacity-60 -z-10"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-sky-50 rounded-full blur-[80px] opacity-40 -z-10"></div>

            <div className="container mx-auto max-w-4xl relative">
                <Link href="/" className="inline-flex items-center gap-2 text-[#475467] hover:text-[#F36F21] font-bold mb-8 transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Store
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-[1000] text-[#101828] tracking-tight mb-2">
                            Order <span className="text-[#F36F21]">History</span>
                        </h1>
                        <p className="text-[#475467] font-medium">Manage and track your previous purchases</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-orange-100 shadow-sm">
                        <span className="text-sm font-bold text-[#475467]">Total Orders: </span>
                        <span className="text-lg font-black text-[#F36F21]">{orders.length}</span>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white/60 backdrop-blur-xl border border-dashed border-orange-200 rounded-[40px] p-20 text-center shadow-inner">
                        <div className="w-24 h-24 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <ShoppingBag className="w-12 h-12 text-[#F36F21] opacity-30" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#101828] mb-4">No orders found</h2>
                        <p className="text-[#475467] mb-10 max-w-sm mx-auto font-medium">You haven&apos;t placed any orders yet. Start shopping to build your collection!</p>
                        <Button className="bg-[#101828] hover:bg-[#F36F21] text-white px-10 py-7 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-100" asChild>
                            <Link href="/">Browse Products</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
