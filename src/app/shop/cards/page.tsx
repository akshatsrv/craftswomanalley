"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";

const products = [
  { id: "card-1", name: "Tactile Botanical Greeting", price: "₹249", image: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg" },
  { id: "card-2", name: "Handmade Mandala Set", price: "₹399", image: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg" },
];

export default function CardsPage() {
  const { addToCart } = useCart();

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
            <div key={item.id} className="group flex flex-col">
              <div className="aspect-square premium-card premium-shadow bg-surface mb-6 relative overflow-hidden group">
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
