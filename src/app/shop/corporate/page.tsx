"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";

const products = [
  { id: "corp-1", name: "Bespoke Leather Journal", price: "₹1,250", image: "https://i.pinimg.com/736x/69/c7/78/69c778a731cb0424aefb5b7a6ba485fb.jpg" },
  { id: "corp-2", name: "Premium Office Suite", price: "₹3,450", image: "https://i.pinimg.com/736x/69/c7/78/69c778a731cb0424aefb5b7a6ba485fb.jpg" },
];

export default function CorporatePage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Professional Soul</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Corporate Gifting</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Elevated traditions for the modern workplace.</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((item) => (
            <div key={item.id} className="group flex flex-col">
              <div className="aspect-[3/4] premium-card premium-shadow bg-surface mb-6 relative overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <button 
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-foreground py-3 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
                >
                  Quick Add
                </button>
              </div>
              <h3 className="font-serif text-xl tracking-tight mb-1">{item.name}</h3>
              <p className="font-sans text-sm text-foreground/40 font-medium">{item.price}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
