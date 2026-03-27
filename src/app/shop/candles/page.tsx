"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function CandlesPage() {
  const candles = Object.values(products).filter(p => p.category.toLowerCase().includes("candle"));

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Scented Soul</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Artisan Candles</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Light that breathes soul into your physical space.</p>
        </header>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {candles.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
