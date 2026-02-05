"use client";

import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

const products = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 15 Pro Max",
    description: "The ultimate iPhone with titanium design and A17 Pro chip.",
    price: "$1,199",
    image: "https://i.ebayimg.com/images/g/5cgAAOSwPyNl5kPk/s-l1600.webp",
  },
  {
    id: 2,
    brand: "Samsung",
    name: "Samsung Galaxy S24 Ultra",
    description: "The most powerful Galaxy with AI-integrated features.",
    price: "$1,299",
    image: "https://images.samsung.com/is/image/samsung/assets/vn/smartphones/galaxy-s24-ultra/buy/01_S24Ultra-Group-KV_PC_0527_final.jpg?imbypass=true",
  },
  {
    id: 3,
    brand: "Google",
    name: "Google Pixel 8 Pro",
    description: "The best Google phone for photographers with AI smarts.",
    price: "$999",
    image: "https://i.ebayimg.com/images/g/mQoAAOSwIx9mxz3j/s-l1600.webp",
  },
  {
    id: 4,
    brand: "Apple",
    name: "iPhone 14",
    description: "Powerful dual-camera system and all-day battery life.",
    price: "$699",
    image: "https://i.ebayimg.com/images/g/Os8AAOSwIrxmKSD4/s-l1600.webp",
  },
  {
    id: 5,
    brand: "Samsung",
    name: "Samsung Galaxy Z Fold 5",
    description: "Unfold a massive screen and multitasking power.",
    price: "$1,799",
    image: "https://i.ebayimg.com/images/g/QdIAAeSwwhZo9e1Q/s-l1600.webp",
  },
  {
    id: 6,
    brand: "Xiaomi",
    name: "Xiaomi 14 Ultra",
    description: "Leica optics and professional-grade mobile photography.",
    price: "$1,099",
    image: "https://didongmoi.vn/wp-content/uploads/2025/07/xiaomi-14-ultra-5g-2.jpg",
  },
];

const brands = ["All", "Apple", "Samsung", "Google", "Xiaomi"];

export default function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState("All");

  const filteredProducts = selectedBrand === "All"
    ? products
    : products.filter(p => p.brand === selectedBrand);

  return (
    <div className="min-h-screen bg-[#FDFCFB] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-100 rounded-full blur-[120px] opacity-50 -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-100 rounded-full blur-[100px] opacity-40 -z-10"></div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-[1000] text-[#101828] mb-6 tracking-tight leading-tight">
            Premium Tech for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F36F21] to-[#ff8c42]">
              Your Lifestyle
            </span>
          </h1>
          <p className="text-lg text-[#475467] mb-10 max-w-2xl mx-auto font-medium">
            Discover our curated collection of high-end smartphones and professional gear. Excellence in every detail.
          </p>

          {/* Brand Filter - Modern Pill Style */}
          <div className="flex flex-wrap justify-center gap-3 p-2 bg-white/50 backdrop-blur-md border border-orange-100 rounded-3xl w-fit mx-auto shadow-sm">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${selectedBrand === brand
                  ? "bg-[#101828] text-white shadow-md shadow-slate-300"
                  : "text-[#475467] hover:bg-orange-50 hover:text-[#F36F21]"
                  }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both" style={{ animationDelay: `${product.id * 100}ms` }}>
              <ProductCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Simple Footer Decor */}
      <div className="py-20 text-center border-t border-orange-50">
        <p className="text-sm font-semibold text-[#98A2B3]">© 2026 DADO Shop. All rights reserved.</p>
      </div>
    </div>
  );
}
