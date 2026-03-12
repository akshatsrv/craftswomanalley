"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";

const candles = [
  { id: "candle-1", name: "The Scented Botanical Jar", price: "₹649", image: "https://i.pinimg.com/736x/61/ed/7d/61ed7d05f3f7056d07a484790b897b86.jpg" },
  { id: "candle-2", name: "Sculptural Bubble Candle", price: "₹499", image: "https://i.pinimg.com/736x/0e/42/df/0e42dfcd98872d01d9f71b0e410feb93.jpg" },
  { id: "candle-3", name: "Lavender Soul Jar", price: "₹749", image: "https://i.pinimg.com/736x/61/ed/7d/61ed7d05f3f7056d07a484790b897b86.jpg" },
];

export default function CandlesPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Scented Soul</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Artisan Candles</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Light that breathes soul into your physical space.</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {candles.map((candle) => (
            <div key={candle.id} className="group flex flex-col">
              <div className="aspect-square premium-card premium-shadow bg-surface mb-6 relative overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${candle.image})` }}
                ></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <button 
                  onClick={() => addToCart({ ...candle, quantity: 1 })}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-foreground py-3 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
                >
                  Quick Add
                </button>
              </div>
              <h3 className="font-serif text-xl tracking-tight mb-1 group-hover:text-secondary transition-colors">{candle.name}</h3>
              <p className="font-sans text-sm text-foreground/40 font-medium">{candle.price}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
