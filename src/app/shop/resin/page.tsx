"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";

const products = [
  { id: "resin-1", name: "Floral Infusion Ring Platter", price: "₹1,850", image: "https://i.pinimg.com/736x/aa/0d/68/aa0d682f256dc59ee694180278c94106.jpg" },
  { id: "resin-2", name: "Gold Leaf Resin Coasters", price: "₹1,250", image: "https://i.pinimg.com/736x/aa/0d/68/aa0d682f256dc59ee694180278c94106.jpg" },
];

export default function ResinPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Fluid Soul</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Resin Art</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Moments frozen in time, hand-poured in our alley.</p>
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
