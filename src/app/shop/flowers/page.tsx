"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";

const flowers = [
  { id: "flower-1", name: "The Velvet Tulip", price: "₹499", image: "https://images.unsplash.com/photo-1589243064641-769d2141cb8e?q=80&w=400&auto=format&fit=crop", category: "Fuzzy Wire" },
  { id: "flower-2", name: "Sun-Kissed Bloom", price: "₹599", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=400&auto=format&fit=crop", category: "Crochet" },
  { id: "flower-3", name: "Lavender Soul", price: "₹449", image: "https://images.unsplash.com/photo-1565011523534-747a8601f10a?q=80&w=400&auto=format&fit=crop", category: "Fuzzy Wire" },
  { id: "flower-4", name: "Rose Whisper", price: "₹649", image: "https://images.unsplash.com/photo-1548546738-9a57239377b7?q=80&w=400&auto=format&fit=crop", category: "Crochet" },
  { id: "flower-5", name: "Morning Daisy", price: "₹399", image: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=400&auto=format&fit=crop", category: "Fuzzy Wire" },
  { id: "flower-6", name: "Ethereal Lily", price: "₹799", image: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?q=80&w=400&auto=format&fit=crop", category: "Crochet" },
];

export default function FlowerBar() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary text-center block w-full">Tactile Blooms</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground text-center">The Flower Bar</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto text-center">
            Everlasting blooms, hand-woven with love.
          </p>
        </header>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {flowers.map((flower) => (
            <ProductCard
              key={flower.id}
              {...flower}
              aspectRatio="aspect-[4/5]"
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
