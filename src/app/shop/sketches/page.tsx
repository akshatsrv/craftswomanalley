"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

const products = [
  { id: "sketch-1", name: "Personalised Charcoal Portrait", price: "₹2,499", image: "/images/sketches.png" },
  { id: "sketch-2", name: "Line Art Couple Sketch", price: "₹1,250", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&auto=format&fit=crop" },
  { id: "sketch-3", name: "Rustic Architectural Sketch", price: "₹1,850", image: "/images/sketches.png" },
  { id: "sketch-4", name: "Custom Pet Portrait", price: "₹1,500", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop" },
];

export default function SketchesPage() {
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
          <span className="text-foreground/60">Sketches</span>
        </nav>

        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Captured Moments</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Personalised Sketches</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Hand-drawn stories on archival paper, ready to be framed.</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} aspectRatio="aspect-[3/4]" />
          ))}
        </div>

        {/* Custom sketch CTA */}
        <div className="mt-24 text-center bg-surface border border-foreground/5 rounded-3xl p-16 space-y-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-secondary">Bespoke</span>
          <h2 className="font-serif text-4xl tracking-tight">Commission a custom sketch</h2>
          <p className="font-serif italic text-foreground/40 max-w-md mx-auto">Send us a photo and our artist will hand-draw it on premium archival paper.</p>
          <Link href="/contact" className="inline-block bg-secondary text-white font-sans font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-secondary/90 transition-all">
            Send Your Reference
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
