"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function ScrollsPage() {
  const items = Object.values(products).filter(p => p.category === "Antique Scrolls");

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Aged Parchment</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Antique Scrolls</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Vows and letters to your internal soul, script with pigments of the alley.</p>
        </header>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
