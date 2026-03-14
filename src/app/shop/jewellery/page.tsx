"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

const products = [
  { id: "jewel-1", name: "Terracotta Statement Necklace", price: "₹1,850", image: "/images/jewellery.png" },
  { id: "jewel-2", name: "Hand-Painted Earth Earrings", price: "₹650", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop" },
  { id: "jewel-3", name: "Artisanal Bead Bracelet", price: "₹450", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop" },
  { id: "jewel-4", name: "Tribal Accent Jhumkas", price: "₹950", image: "/images/jewellery.png" },
];

export default function JewelleryPage() {
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
          <span className="text-foreground/60">Jewellery</span>
        </nav>

        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Wearable Soul</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Artisanal Jewellery</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Handcrafted adornments inspired by tradition and earth.</p>
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
