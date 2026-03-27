"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { products, Product } from "@/data/products";

export function Navigation() {
  const { cart, cartCount, cartTotal, removeFromCart, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = Object.values(products).filter((p) => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-foreground/5">
        {/* Single Row: Logo | Filter Links | Icons */}
        <div className="w-full flex items-center justify-between px-16 py-3 gap-6 overflow-visible">

          {/* LEFT: Logo */}
          <Link href="/" className="font-serif text-xl lg:text-2xl tracking-tighter hover:opacity-80 transition-opacity flex-shrink-0">
            CraftswomanAlley
          </Link>

          {/* CENTER: Filter Nav Links — always visible, no scroll */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <Link href="/shop" className="text-[11px] font-black uppercase tracking-[0.22em] text-foreground hover:text-secondary transition-colors whitespace-nowrap">
              Shop Now
            </Link>
            {[
              { label: "Personalised Gifts", href: "/shop/books", items: [
                { name: "Journals & Scrapbooks", href: "/shop/books" },
                { name: "Custom Sketches", href: "/shop/sketches" },
                { name: "Resin Art", href: "/shop/resin" },
              ]},
              { label: "Birthday Gifts", href: "/shop/flowers", items: [
                { name: "Velvet Bouquets", href: "/shop/flowers" },
                { name: "Artisan Candles", href: "/shop/candles" },
                { name: "Handmade Cards", href: "/shop/cards" },
              ]},
              { label: "Anniversary Gifts", href: "/shop/scrolls", items: [
                { name: "Letter Scrolls", href: "/shop/scrolls" },
                { name: "Memory Journals", href: "/shop/books" },
                { name: "Gift Hampers", href: "/shop/hampers" },
              ]},
              { label: "Corporate Gifting", href: "/shop/corporate", items: [
                { name: "Corporate Hampers", href: "/shop/corporate" },
                { name: "Torans & Decor", href: "/shop/toran" },
                { name: "Jewellery Sets", href: "/shop/jewellery" },
              ]},
            ].map((group) => (
              <div key={group.label} className="relative group/nav flex-shrink-0">
                <button className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap py-2 flex items-center gap-1.5 border-b-2 border-transparent hover:border-secondary">
                  {group.label}
                  <svg className="w-2.5 h-2.5 opacity-50 transition-transform duration-200 group-hover/nav:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Dropdown — rendered in fixed stacking context, never clipped */}
                <div className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-foreground/8 py-2 min-w-[210px] z-[200] opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all duration-200 translate-y-2 group-hover/nav:translate-y-0">
                  <div className="px-4 py-2 border-b border-foreground/5 mb-1">
                    <Link href={group.href} className="text-[10px] font-black uppercase tracking-[0.28em] text-secondary block hover:opacity-70 transition-opacity">
                      View All {group.label} →
                    </Link>
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/65 hover:text-foreground hover:bg-surface/60 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Search + Icons */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <div ref={searchRef} className="relative hidden lg:block">
              <div className={`flex items-center bg-surface/50 rounded-full px-4 py-1.5 border transition-all duration-300
                ${isSearchFocused ? "border-secondary w-56 shadow-lg bg-white" : "border-foreground/10 w-40"}
              `}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="bg-transparent border-none focus:ring-0 focus:outline-none outline-none text-xs w-full placeholder:text-foreground/30 font-sans font-medium"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors flex-shrink-0 ${isSearchFocused ? "text-secondary" : "text-foreground/30"}`}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </div>

              {/* Search Results */}
              {(isSearchFocused && (searchQuery.length > 0 || searchResults.length > 0)) && (
                <div className="absolute top-full mt-3 right-0 w-80 bg-white border border-foreground/5 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="max-h-[400px] overflow-y-auto p-2 no-scrollbar">
                    {searchResults.length > 0 ? (
                      <div className="space-y-1">
                        <p className="px-3 py-2 text-[10px] font-sans font-bold uppercase tracking-widest text-foreground/30 border-b border-foreground/5 mb-2">
                          Results for &quot;{searchQuery}&quot;
                        </p>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/shop/product/${product.id}`}
                            onClick={() => { setIsSearchFocused(false); setSearchQuery(""); }}
                            className="flex items-center gap-4 p-2 rounded-xl hover:bg-surface transition-colors group/res"
                          >
                            <div className="w-12 h-14 bg-surface rounded-lg overflow-hidden relative shrink-0">
                              <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-serif text-sm truncate group-hover/res:text-secondary transition-colors">{product.name}</h4>
                              <p className="text-[10px] text-foreground/40 font-sans font-bold uppercase tracking-tight">{product.category}</p>
                              <p className="text-[11px] text-secondary font-bold font-sans mt-0.5">{typeof product.price === "number" ? `₹${product.price.toLocaleString()}` : product.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center space-y-2">
                        <p className="font-serif italic text-foreground/40">No treasures found...</p>
                        <p className="text-[10px] uppercase font-sans font-bold tracking-widest text-foreground/20">Try &quot;Journal&quot; or &quot;Bloom&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-foreground/70">
              <Link href="/contact" className="hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>
              <button onClick={() => setIsCartOpen(true)} className="relative hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Announcement Strip */}
        <div className="bg-foreground text-white text-[10px] font-black uppercase tracking-[0.35em] py-2 text-center">
          Free Shipping on orders above ₹999 &nbsp;·&nbsp; Use code <span className="text-secondary">ALLEY10</span> for 10% off
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
