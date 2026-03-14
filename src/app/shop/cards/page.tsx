"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";

const products = [
  { id: "card-1", name: "Tactile Botanical Greeting", price: "₹249", image: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg" },
  { id: "card-2", name: "Handmade Mandala Set", price: "₹399", image: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg" },
];

export default function CardsPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Whispered Paper</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Handmade Cards</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Physical letters in a digital world.</p>
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
