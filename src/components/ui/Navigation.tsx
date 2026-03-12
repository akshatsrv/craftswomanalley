"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";


export function Navigation() {
  const { cart, cartCount, cartTotal, removeFromCart, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/5 py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Nav Links */}
          <div className="hidden md:flex gap-8 items-center text-xs uppercase tracking-[0.2em] font-sans font-bold text-foreground/60">
            <Link href="/shop" className="hover:text-secondary transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-secondary transition-colors">Our Story</Link>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="font-serif text-2xl lg:text-3xl tracking-tighter hover:opacity-80 transition-opacity">
              CraftswomanAlley
            </Link>
          </div>

          {/* Right: Icons & Search */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-surface/50 rounded-full px-4 py-1.5 border border-foreground/5 group focus-within:border-secondary transition-all">
              <input 
                type="text" 
                placeholder="Search our alley..." 
                className="bg-transparent border-none focus:ring-0 text-xs w-32 placeholder:text-foreground/30 font-sans font-medium"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40 group-focus-within:text-secondary">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            
            <div className="flex items-center gap-5 text-foreground/70">
              <Link href="/contact" className="hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-secondary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col noise-bg animate-in slide-in-from-right duration-500">
            <header className="p-8 border-b border-foreground/5 flex justify-between items-center">
              <h2 className="font-serif text-3xl">Your Treasures</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-foreground/40 hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </header>

            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-serif italic text-lg text-foreground/40">The alley is quiet...</p>
                  <Link href="/shop" onClick={() => setIsCartOpen(false)} className="text-xs font-sans font-bold uppercase tracking-widest text-secondary">Explore Collections</Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-20 h-24 bg-surface rounded-xl overflow-hidden border border-foreground/5 flex-shrink-0 relative">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow space-y-1">
                      <h4 className="font-serif text-lg leading-tight">{item.name}</h4>
                      <div className="flex justify-between items-baseline">
                        <p className="text-xs text-secondary font-bold font-sans uppercase tracking-widest">{item.price}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] uppercase font-bold text-foreground/20 hover:text-accent transition-colors">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {/* Smart Recommendations */}
              {cart.length > 0 && (
                <div className="pt-8 border-t border-foreground/5 space-y-4">
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-foreground/30">Complete your gift</span>
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
                    {cart.some(item => item.id.toString().includes('flower')) ? (
                      // Suggest Cards if Flowers are in cart
                      [
                        { id: 'card-1', name: "Linen Note Card", price: "₹199", image: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg" },
                        { id: 'candle-1', name: "Soy Wax Candle", price: "₹349", image: "https://i.pinimg.com/736x/61/ed/7d/61ed7d05f3f7056d07a484790b897b86.jpg" }
                      ].map(rec => (
                        <div key={rec.id} className="flex-shrink-0 w-32 space-y-2 group/rec">
                          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-surface relative">
                            <Image src={rec.image} alt={rec.name} fill className="object-cover" />
                            <button 
                              onClick={() => addToCart({ ...rec, quantity: 1 })}
                              className="absolute inset-0 bg-secondary/80 flex items-center justify-center opacity-0 group-hover/rec:opacity-100 transition-opacity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                            </button>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-sans font-bold truncate">{rec.name}</p>
                            <p className="text-[9px] font-sans text-secondary font-bold">{rec.price}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Default trending items if no specific match
                      [
                        { id: 'scroll-1', name: "Parchment Scroll", price: "₹899", image: "/images/hero_scroll.png" },
                        { id: 'flower-1', name: "Velvet Tulip", price: "₹499", image: "/images/velvet_tulip.png" }
                      ].map(rec => (
                        <div key={rec.id} className="flex-shrink-0 w-32 space-y-2 group/rec">
                          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-surface relative">
                            <Image src={rec.image} alt={rec.name} fill className="object-cover" />
                            <button 
                              onClick={() => addToCart({ ...rec, quantity: 1 })}
                              className="absolute inset-0 bg-secondary/80 flex items-center justify-center opacity-0 group-hover/rec:opacity-100 transition-opacity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                            </button>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-sans font-bold truncate">{rec.name}</p>
                            <p className="text-[9px] font-sans text-secondary font-bold">{rec.price}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <footer className="p-8 border-t border-foreground/5 space-y-6 bg-surface/30">
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-xl">Total</span>
                  <span className="font-serif text-2xl text-secondary">₹{cartTotal.toLocaleString()}</span>
                </div>
                <Link 
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full bg-secondary text-white text-center font-sans uppercase tracking-[0.3em] font-bold py-5 rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
                >
                  Proceed to Checkout
                </Link>
                <p className="text-[10px] text-center text-foreground/40 font-sans uppercase tracking-widest leading-relaxed">
                  Artisanal delivery estimated in<br/><span className="text-secondary font-bold">10-15 business days</span>
                </p>
              </footer>
            )}

          </div>
        </div>
      )}
    </>
  );
}
