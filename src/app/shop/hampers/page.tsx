"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";

const products = [
  { id: "hamper-1", name: "The Wedding Grand Luxe Box", price: "₹4,850", image: "https://i.pinimg.com/736x/58/14/4d/58144d3d1d642b348ac4a7301a950902.jpg" },
  { id: "hamper-2", name: "Artisanal Celebration Trunk", price: "₹3,150", image: "https://i.pinimg.com/736x/58/14/4d/58144d3d1d642b348ac4a7301a950902.jpg" },
];

export default function HampersPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Curated Care</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Gift Hampers</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Collections of small joys, bundled with a physical soul.</p>
        </header>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
