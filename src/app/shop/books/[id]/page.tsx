"use client";

import { use } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const item = products[id];

  if (!item) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="aspect-[3/4] premium-card premium-shadow overflow-hidden bg-surface relative">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill
                className="object-cover" 
                priority
              />
            </div>
          </div>

          <div className="space-y-12">
            <header className="space-y-4">
              <span className="text-secondary text-xs uppercase tracking-[0.4em] font-sans font-bold">{item.category}</span>
              <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter leading-tight">{item.name}</h1>
              <p className="text-2xl font-sans font-bold text-foreground/80">{item.price}</p>
            </header>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <Button onClick={handleAddToCart} size="lg" variant="secondary" className="w-full py-8 text-lg">Add to Cart</Button>
                <Button size="lg" variant="primary" className="w-full py-8 text-lg bg-foreground hover:bg-foreground/90">Buy It Now</Button>
              </div>
            </div>

            <div className="border-t border-foreground/5 pt-12 space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-xl">The Craft</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl">Delivery</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                  Bespoke handcrafted delivery in <span className="text-secondary font-bold">{item.deliveryTime}</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

