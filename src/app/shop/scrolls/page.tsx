"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

const scrolls = [
  { id: "scroll-1", name: "The Eternal Vow Scroll", price: "₹1,450", image: "/images/hero_scroll.png", category: "Antique Scrolls", description: "Chemically aged parchment, hand-scripted with archival pigment ink. Finished with a wooden rod and a physical wax seal." },
  { id: "scroll-2", name: "Anniversary Love Letter", price: "₹1,650", image: "/images/scroll_stitched_real.jpg", category: "Antique Scrolls", description: "A deeply personal scroll for the one who holds your heart, hand-lettered on cotton rag paper." },
  { id: "scroll-3", name: "Birthday Blessing Parchment", price: "₹1,250", image: "/images/hero_scroll.png", category: "Antique Scrolls", description: "A heartfelt birthday message aged and sealed, ready to be unwrapped and cherished." },
  { id: "scroll-4", name: "Gratitude & Tribute Scroll", price: "₹999", image: "/images/scroll_stitched_real.jpg", category: "Antique Scrolls", description: "Express deep gratitude with our signature aged scroll, finished in hand-pressed wax." },
];

export default function ScrollsPage() {
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
          <span className="text-foreground/60">Scrolls</span>
        </nav>

        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary text-center block w-full">Hand-Lettered</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground text-center">Antique Scrolls</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto text-center">
            Physical whispers of love on chemically aged parchment, sealed with wax.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {scrolls.map((scroll) => (
            <ProductCard
              key={scroll.id}
              {...scroll}
              aspectRatio="aspect-[3/4]"
            />
          ))}
        </div>

        {/* CTA: Personalise */}
        <div className="mt-24 text-center bg-surface border border-foreground/5 rounded-3xl p-16 space-y-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-secondary">Bespoke</span>
          <h2 className="font-serif text-4xl tracking-tight">Want a personalised scroll?</h2>
          <p className="font-serif italic text-foreground/40 max-w-md mx-auto">Every scroll can include your personal message, hand-lettered by our artisan.</p>
          <Link href="/contact" className="inline-block bg-secondary text-white font-sans font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-secondary/90 transition-all">
            Request a Custom Scroll
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
