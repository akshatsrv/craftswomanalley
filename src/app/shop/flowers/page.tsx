"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const flowers = [
  { id: 1, name: "The Velvet Tulip", price: "₹499", image: "https://images.unsplash.com/photo-1589243064641-769d2141cb8e?q=80&w=400&auto=format&fit=crop", category: "Fuzzy Wire" },
  { id: 2, name: "Sun-Kissed Bloom", price: "₹599", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=400&auto=format&fit=crop", category: "Crochet" },
  { id: 3, name: "Lavender Soul", price: "₹449", image: "https://images.unsplash.com/photo-1565011523534-747a8601f10a?q=80&w=400&auto=format&fit=crop", category: "Fuzzy Wire" },
  { id: 4, name: "Rose Whisper", price: "₹649", image: "https://images.unsplash.com/photo-1548546738-9a57239377b7?q=80&w=400&auto=format&fit=crop", category: "Crochet" },
  { id: 5, name: "Morning Daisy", price: "₹399", image: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=400&auto=format&fit=crop", category: "Fuzzy Wire" },
  { id: 6, name: "Ethereal Lily", price: "₹799", image: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?q=80&w=400&auto=format&fit=crop", category: "Crochet" },
];

export default function FlowerBar() {
  const { addToCart } = useCart();

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
          {flowers.map((flower, index) => (
            <div key={flower.id} className="group flex flex-col">
              <div className="aspect-[4/5] premium-card premium-shadow bg-surface mb-6 relative overflow-hidden">
                <Image
                  src={flower.image}
                  alt={flower.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={index < 4}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-widest font-sans font-bold text-secondary rounded-full">
                    {flower.category}
                  </span>
                </div>
                <button 
                  onClick={() => addToCart({ ...flower, id: `flower-${flower.id}`, quantity: 1 })}
                  className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-md text-foreground py-3 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
                >
                  Quick Add
                </button>
              </div>
              <h3 className="font-serif text-xl tracking-tight mb-1">{flower.name}</h3>
              <p className="font-sans text-sm text-foreground/40 font-medium">{flower.price}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
