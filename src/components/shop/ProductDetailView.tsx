"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { products, ProductVariant } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useRouter, notFound } from "next/navigation";
import Link from "next/link";

interface ProductDetailProps {
  id: string;
}

const artisanAvatars = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
];

export function ProductDetailView({ id }: ProductDetailProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const item = products[id];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [mainImage, setMainImage] = useState(item?.image || "");
  const [isHovering, setIsHovering] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"features" | "story" | "care">("features");

  const imageList = item?.images && item.images.length > 0 ? item.images : [item?.image || ""];
  const currentImageIndex = Math.max(0, imageList.indexOf(mainImage));

  // Auto-scroll logic
  useEffect(() => {
    if (imageList.length > 1 && !isHovering && !isLightboxOpen) {
      const interval = setInterval(() => {
        setMainImage((prev) => {
          const currentIndex = imageList.indexOf(prev);
          const nextIndex = (currentIndex + 1) % imageList.length;
          return imageList[nextIndex];
        });
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [imageList, isHovering, isLightboxOpen]);

  useEffect(() => {
    if (item?.variants && item.variants.length > 0) {
      setSelectedVariant(item.variants[0]);
    }
    if (item?.image) {
      setMainImage(item.image);
    }
  }, [item]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, mainImage, imageList]);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col noise-bg">
        <Navigation />
        <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full text-center space-y-6">
          <span className="text-secondary font-mono text-xs uppercase tracking-widest">Alley Archives</span>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground">Piece Not Found</h1>
          <p className="font-serif italic text-lg text-foreground/60 max-w-md mx-auto">The item you are searching for might have been moved or updated in our alley.</p>
          <div className="pt-6">
            <Link href="/shop" className="px-8 py-4 bg-foreground text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-secondary transition-colors">
              Explore Available Archive
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const finalItem = selectedVariant 
      ? { ...item, name: `${item.name} (${selectedVariant.label})`, price: `₹${selectedVariant.price.toLocaleString()}`, quantity: 1 }
      : { ...item, price: typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : String(item.price), quantity: 1 };
    addToCart(finalItem as any); 
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleNext = () => {
    const currentIndex = imageList.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % imageList.length;
    setMainImage(imageList[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = imageList.indexOf(mainImage);
    const prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    setMainImage(imageList[prevIndex]);
  };

  const currentPriceNumeric = selectedVariant 
    ? selectedVariant.price 
    : (typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, "")) || 0);
  
  const discountPercentage = 15;
  const mrpNumeric = Math.ceil(currentPriceNumeric / (1 - discountPercentage / 100));
  const savings = mrpNumeric - currentPriceNumeric;
  
  const displayPrice = selectedVariant ? `₹${selectedVariant.price.toLocaleString()}` : (typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : item.price);

  const whatsappMessage = encodeURIComponent(`Hi Craftswoman Alley! I am interested in ordering/customizing: ${item.name} (ID: ${item.id}).`);

  return (
    <div className="min-h-screen flex flex-col noise-bg selection:bg-secondary selection:text-white">
      <Navigation />

      <main className="flex-grow py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] font-black text-foreground/45 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span className="text-foreground/20">/</span>
          <Link href="/shop" className="hover:text-secondary transition-colors underline-offset-4 hover:underline decoration-secondary/30">Shop</Link>
          <span className="text-foreground/20">/</span>
          <Link 
            href={`/shop/${item.category.toLowerCase().includes('bloom') ? 'flowers' : item.category.toLowerCase().includes('journal') ? 'books' : item.category.toLowerCase().includes('candle') ? 'candles' : item.category.toLowerCase().includes('scroll') ? 'scrolls' : item.category.toLowerCase().split(' ').pop()}`} 
            className="hover:text-secondary transition-colors underline-offset-4 hover:underline decoration-secondary/30"
          >
            {item.category}
          </Link>
          <span className="text-foreground/20">/</span>
          <span className="text-foreground/30 font-medium truncate">{item.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Main Gallery Stage & Photo Selector */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Stage & Thumbnail Strip */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnail Strip */}
              <div className="order-2 md:order-1 flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[500px] no-scrollbar shrink-0">
                 {imageList.map((img, i) => (
                   <div 
                     key={i} 
                     onMouseEnter={() => {
                       setMainImage(img);
                       setIsHovering(true);
                     }}
                     onMouseLeave={() => setIsHovering(false)}
                     onClick={() => setMainImage(img)}
                     className={`w-16 h-16 md:w-20 md:h-20 bg-surface border rounded-xl overflow-hidden transition-all cursor-pointer flex-shrink-0 relative group/thumb
                       ${mainImage === img ? "border-secondary ring-2 ring-secondary/40 scale-95" : "border-foreground/10 hover:border-secondary/50 hover:scale-95"}
                     `}
                   >
                     <Image src={img} alt={`raw-thumb-${i}`} width={80} height={80} className="object-cover w-full h-full" />
                     <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-bold px-1 rounded opacity-80">
                       #{i + 1}
                     </span>
                   </div>
                 ))}
              </div>

              {/* Main Stage */}
              <div 
                className="order-1 md:order-2 flex-grow aspect-[4/5] md:aspect-square premium-card overflow-hidden bg-surface relative group cursor-zoom-in rounded-[2.5rem] border border-foreground/5 shadow-xl"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image 
                  src={mainImage} 
                  alt={item.name} 
                  fill
                  className="object-contain p-6 transition-all duration-700 group-hover:scale-105" 
                  priority
                />

                {/* Raw Photo Badge */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] font-black text-secondary rounded-full shadow-md border border-secondary/10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Raw Picture {currentImageIndex + 1} of {imageList.length}
                  </span>
                </div>

                {/* Zoom Hint */}
                <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/80 backdrop-blur-md px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold text-white rounded-full flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    Click to Zoom
                  </span>
                </div>

                {/* Navigation Arrows */}
                {imageList.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-foreground/10 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95 z-10 text-foreground"
                      aria-label="Previous raw picture"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-foreground/10 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95 z-10 text-foreground"
                      aria-label="Next raw picture"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Feature Tabs */}
            <div className="bg-white rounded-[2rem] border border-foreground/5 p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex border-b border-foreground/8 gap-6 text-[11px] font-sans font-black uppercase tracking-[0.2em]">
                <button 
                  onClick={() => setActiveTab("features")}
                  className={`pb-3 transition-all relative ${activeTab === "features" ? "text-secondary border-b-2 border-secondary" : "text-foreground/40 hover:text-foreground/70"}`}
                >
                  Signature Features
                </button>
                <button 
                  onClick={() => setActiveTab("story")}
                  className={`pb-3 transition-all relative ${activeTab === "story" ? "text-secondary border-b-2 border-secondary" : "text-foreground/40 hover:text-foreground/70"}`}
                >
                  Craft Story & Occasions
                </button>
                <button 
                  onClick={() => setActiveTab("care")}
                  className={`pb-3 transition-all relative ${activeTab === "care" ? "text-secondary border-b-2 border-secondary" : "text-foreground/40 hover:text-foreground/70"}`}
                >
                  Care & Packaging
                </button>
              </div>

              {activeTab === "features" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {(item.includes || [item.description]).map((point, i) => (
                    <div key={i} className="p-4 bg-surface border border-foreground/[0.04] rounded-2xl flex gap-3.5 items-start transition-all hover:border-secondary/30 hover:bg-secondary/[0.02]">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-xs text-foreground/80 leading-relaxed font-sans font-medium">{point}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "story" && (
                <div className="space-y-4 pt-2">
                  <p className="text-sm text-foreground/70 leading-relaxed font-serif italic text-lg">
                    "{item.description}"
                  </p>
                  <div className="p-4 bg-surface rounded-2xl border border-foreground/5 space-y-2">
                    <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-secondary">Ideal Occasions</h4>
                    <p className="text-xs text-foreground/70 font-sans leading-relaxed">
                      Perfect for Birthdays, Anniversaries, Valentine's Day, Graduation, Mother's Day, and aesthetic room decoration.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "care" && (
                <div className="space-y-3 pt-2 text-xs font-sans text-foreground/70 leading-relaxed">
                  <div className="flex gap-3 items-center p-3 bg-surface rounded-xl border border-foreground/5">
                    <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                    <span><strong>Durability:</strong> Everlasting craft wire and plush velvet yarn — no fading or wilting.</span>
                  </div>
                  <div className="flex gap-3 items-center p-3 bg-surface rounded-xl border border-foreground/5">
                    <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    <span><strong>Packaging:</strong> Arrives safely in signature Alley gift wrap with protective ribbon casing.</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Information & Purchase Panel */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <header className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-secondary text-[9px] uppercase tracking-[0.4em] font-sans font-black bg-secondary/10 px-3 py-1 rounded-full">{item.category}</span>
                <span className="text-foreground/30 text-[9px] uppercase tracking-widest font-mono font-bold">100% Handcrafted</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl tracking-tight text-foreground leading-[1.08] font-medium">{item.name}</h1>
              <p className="text-xs font-sans text-foreground/60 leading-relaxed font-normal">{item.description}</p>
            </header>

            {/* Price Box */}
            <div className="py-5 border-y border-foreground/8 space-y-1 bg-surface/50 p-6 rounded-2xl">
              <div className="flex items-baseline gap-3">
                <span className="text-red-600 text-2xl font-light font-sans">-{discountPercentage}%</span>
                <span className="text-4xl font-sans text-foreground font-semibold">{displayPrice}</span>
              </div>
              <p className="text-xs text-foreground/50 font-sans flex items-center gap-3 pt-1">
                <span>M.R.P.: <span className="line-through decoration-red-500/50">₹{mrpNumeric.toLocaleString()}</span></span>
                <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold text-[9px] tracking-wider uppercase">Save ₹{savings.toLocaleString()}</span>
              </p>
              <p className="text-[11px] font-sans text-foreground/60 pt-1">Inclusive of all taxes & doorstep packaging</p>
            </div>

            {/* Variant Selector */}
            {item.variants && (
              <div className="space-y-3">
                <h3 className="font-sans text-xs font-bold text-foreground/60 uppercase tracking-wider">Select Size / Option: <span className="text-foreground font-black ml-1">{selectedVariant?.label}</span></h3>
                <div className="flex flex-wrap gap-2.5">
                  {item.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-sans font-bold transition-all shadow-sm
                        ${selectedVariant?.id === v.id 
                          ? "border-secondary bg-secondary/10 text-secondary ring-2 ring-secondary/30 scale-105" 
                          : "border-foreground/10 hover:border-foreground/30 text-foreground/70 bg-white"
                        }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock & Delivery Info */}
            <div className="space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200/60 p-4.5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-emerald-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    In Stock & Ready to Dispatch
                  </p>
                  <span className="text-[10px] text-emerald-700 font-mono">Alley Original</span>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                  Handcrafted upon order. Est. Delivery: <strong className="text-secondary">{item.deliveryTime || '7-10 business days'}</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddToCart} 
                    className="flex-1 py-4 bg-[#FFCB05] text-neutral-900 border-none rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#f0be00] hover:shadow-lg active:scale-[0.98] group"
                  >
                    <span className="group-hover:tracking-widest transition-all duration-300">Add to Cart</span>
                  </Button>
                  <Button 
                    onClick={handleBuyNow}
                    className="flex-1 py-4 bg-[#F28C00] text-white border-none rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#de8000] hover:shadow-lg active:scale-[0.98] group"
                  >
                    <span className="group-hover:tracking-widest transition-all duration-300">Buy Now</span>
                  </Button>
                </div>

                {/* WhatsApp Inquiry Button */}
                <a
                  href={`https://wa.me/?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.999 1.594-1.052 3.848 3.931-1.031 1.865.756z"/></svg>
                  Custom Request on WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Guarantees Grid */}
            <section className="grid grid-cols-2 gap-3 pt-4">
              <div className="p-3.5 bg-white rounded-xl border border-foreground/5">
                <h4 className="font-sans text-[10px] font-black uppercase tracking-wider text-foreground/40 mb-0.5">Slow Craft Quality</h4>
                <p className="text-[11px] text-foreground/60 leading-tight">Hand-bound & assembled with physical soul.</p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-foreground/5 text-right">
                <h4 className="font-sans text-[10px] font-black uppercase tracking-wider text-foreground/40 mb-0.5">Need Custom Work?</h4>
                <p className="text-[11px] text-secondary font-bold truncate">support@craftswomanalley.com</p>
              </div>
            </section>
          </div>
        </div>

        {/* BESPEAK CUSTOM ORDINANCE SECTION */}
        <div className="mt-28 relative">
          <div className="absolute inset-0 bg-secondary/[0.02] -skew-y-2 rounded-[3.5rem] pointer-events-none" />
          
          <div className="relative py-20 px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                  <span className="text-secondary text-[10px] uppercase tracking-[0.4em] font-black">Bespeak Craftsmanship</span>
                </div>
                <h2 className="font-serif text-4xl md:text-6xl text-foreground leading-[0.95] tracking-tight">
                  Beyond <br/>
                  <span className="italic text-secondary">The Ordinary.</span>
                </h2>
                <p className="text-base text-foreground/60 font-serif italic max-w-sm">
                  "Limitless imagination meets ancestral craft. We don't just personalize; we orchestrate physical soul."
                </p>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Link 
                    href="/bespeak"
                    className="group relative px-8 py-4 bg-foreground text-surface rounded-2xl text-xs font-black uppercase tracking-[0.25em] overflow-hidden transition-all hover:shadow-xl"
                  >
                    <span className="relative z-10">Commission Custom Work</span>
                    <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  <div className="flex -space-x-3 items-center">
                    {artisanAvatars.map((url, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface shadow-sm overflow-hidden relative">
                        <Image src={url} alt={`Artisan-${i+1}`} width={40} height={40} className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all" />
                      </div>
                    ))}
                    <span className="pl-6 text-[10px] font-sans font-bold text-foreground/40 uppercase tracking-widest">Master Artisans</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-20 bg-white p-8 rounded-[2.5rem] border border-foreground/5 shadow-2xl space-y-6">
                  <div className="pb-4 border-b border-foreground/5">
                    <h4 className="text-xl font-serif italic text-foreground">The Bespeak Ordinance</h4>
                    <p className="text-[10px] font-sans font-bold text-foreground/40 uppercase tracking-widest">Fully Custom Craftsmanship</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {['Custom Dimensions & Color Mediums', 'Personal Quotes & Theme Architecture', 'Ancestral Craft & Binding Techniques', 'Archival Quality Guarantee'].map((text, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                        <span className="text-xs font-sans font-medium text-foreground/70">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL FOR RAW PICTURES */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50"
            aria-label="Close Lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          {/* Lightbox Content */}
          <div 
            className="relative max-w-5xl w-full max-h-[85vh] h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image 
                src={mainImage} 
                alt="Raw High-Res Photo" 
                fill 
                className="object-contain" 
                priority
              />
            </div>

            {/* Lightbox Footer Bar */}
            <div className="mt-4 flex items-center justify-between w-full text-white/80 text-xs font-sans px-4">
              <span className="font-mono bg-white/10 px-3 py-1 rounded-full text-[10px]">
                Raw Photo #{currentImageIndex + 1} of {imageList.length}
              </span>
              <span className="font-serif italic text-sm text-white/90">
                {item.name}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={handlePrev}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                >
                  ← Prev
                </button>
                <button 
                  onClick={handleNext}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
