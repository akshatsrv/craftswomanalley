"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";

const products = [
  { id: "corp-1", name: "Bespoke Leather Journal", price: "₹1,250", image: "https://i.pinimg.com/736x/69/c7/78/69c778a731cb0424aefb5b7a6ba485fb.jpg" },
  { id: "corp-2", name: "Premium Office Suite", price: "₹3,450", image: "https://i.pinimg.com/736x/69/c7/78/69c778a731cb0424aefb5b7a6ba485fb.jpg" },
];

export default function CorporatePage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Professional Soul</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Corporate Gifting</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Elevated traditions for the modern workplace.</p>
        </header>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} aspectRatio="aspect-[3/4]" />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
