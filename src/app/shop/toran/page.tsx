"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

const products = [
  { id: "toran-1", name: "Marigold & Mirror Toran", price: "₹1,450", image: "/images/toran.png" },
  { id: "toran-2", name: "Hand-Painted Wood Bandarwal", price: "₹1,850", image: "https://images.unsplash.com/photo-1590073242672-ad91404023c8?q=80&w=400&auto=format&fit=crop" },
  { id: "toran-3", name: "Festive Embroidered Door Hang", price: "₹950", image: "/images/toran.png" },
  { id: "toran-4", name: "Traditional Silk Tassel Toran", price: "₹1,250", image: "https://images.unsplash.com/photo-1513519107127-1bed33748e4c?q=80&w=400&auto=format&fit=crop" },
];

export default function ToranPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/30 mb-16">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-secondary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground/60">Torans</span>
        </nav>

        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Auspicious Entrances</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Traditional Torans</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Welcome the physical soul into your home with handcrafted Bandarwals.</p>
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
