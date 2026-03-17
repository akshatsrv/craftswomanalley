"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { products, ProductVariant } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useRouter, notFound } from "next/navigation";
import Link from "next/link";

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const item = products[id];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [mainImage, setMainImage] = useState(item?.image || "");
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (item?.images && item.images.length > 1 && !isHovering) {
      const interval = setInterval(() => {
        setMainImage((prev) => {
          const currentIndex = item.images!.indexOf(prev);
          const nextIndex = (currentIndex + 1) % item.images!.length;
          return item.images![nextIndex];
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [item, isHovering]);

  useEffect(() => {
    if (item?.variants && item.variants.length > 0) {
      setSelectedVariant(item.variants[0]);
    }
    if (item?.image) {
      setMainImage(item.image);
    }
  }, [item]);

  if (!item) {
    notFound();
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
    if (!item?.images) return;
    const currentIndex = item.images.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % item.images.length;
    setMainImage(item.images[nextIndex]);
  };

  const handlePrev = () => {
    if (!item?.images) return;
    const currentIndex = item.images.indexOf(mainImage);
    const prevIndex = (currentIndex - 1 + item.images.length) % item.images.length;
    setMainImage(item.images[prevIndex]);
  };

  const currentPriceNumeric = selectedVariant 
    ? selectedVariant.price 
    : (typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, "")) || 0);
  
  const discountPercentage = 15;
  const mrpNumeric = Math.ceil(currentPriceNumeric / (1 - discountPercentage / 100));
  const savings = mrpNumeric - currentPriceNumeric;
  
  const displayPrice = selectedVariant ? `₹${selectedVariant.price.toLocaleString()}` : (typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : item.price);

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb - Clean & Small */}
        <nav className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] font-black text-foreground/45 mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span className="text-foreground/20">/</span>
          <Link href="/shop" className="hover:text-secondary transition-colors underline-offset-4 hover:underline decoration-secondary/30">Shop</Link>
          <span className="text-foreground/20">/</span>
          <Link href={`/shop#${item.category.toLowerCase().replace(/ /g, "-")}`} className="hover:text-secondary transition-colors underline-offset-4 hover:underline decoration-secondary/30">{item.category}</Link>
          <span className="text-foreground/20">/</span>
          <span className="text-foreground/20 font-medium truncate">{item.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT: Image Section & Details */}
          <div className="lg:col-span-7 space-y-12">
            {/* Gallery Wrapper */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnail Strip - Desktop side, mobile bottom */}
              <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar shrink-0">
                 {(item.images || [item.image]).map((img, i) => (
                   <div 
                     key={i} 
                     onMouseEnter={() => {
                       setMainImage(img);
                       setIsHovering(true);
                     }}
                     onMouseLeave={() => setIsHovering(false)}
                     onClick={() => setMainImage(img)}
                     className={`w-14 h-14 md:w-16 md:h-16 bg-surface border rounded-md overflow-hidden transition-all cursor-pointer flex-shrink-0 relative
                       ${mainImage === img ? "border-secondary ring-1 ring-secondary/50" : "border-foreground/10 hover:border-secondary/40"}
                     `}
                   >
                     <Image src={img} alt={`detail-${i}`} width={64} height={64} className="object-cover w-full h-full" />
                   </div>
                 ))}
              </div>

              {/* Main Stage */}
              <div 
                className="order-1 md:order-2 flex-grow aspect-[4/5] md:aspect-square premium-card overflow-hidden bg-surface relative group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Image 
                  src={mainImage} 
                  alt={item.name} 
                  fill
                  className="object-contain p-4 transition-all duration-700" 
                  priority
                />

                {/* Navigation Arrows */}
                {item.images && item.images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-foreground/5 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95 z-10"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-foreground/5 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95 z-10"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* About Item - Positioned below image */}
            <section className="space-y-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-grow bg-foreground/5" />
                <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 text-center">Item Signature Features</h3>
                <div className="h-px flex-grow bg-foreground/5" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.includes?.map((point, i) => (
                  <div key={i} className="group p-4 bg-surface border border-foreground/[0.03] rounded-2xl flex gap-4 items-start transition-all hover:border-secondary/20 hover:bg-secondary/[0.02]">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary/20 transition-colors">
                      <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[12px] text-foreground/70 leading-snug font-sans font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:row-span-2">
            <header className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-secondary text-[9px] uppercase tracking-[0.4em] font-sans font-black">{item.category}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground leading-[1.1]">{item.name}</h1>
            </header>

            <div className="py-4 border-y border-foreground/5 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-red-600 text-2xl font-light">-{discountPercentage}%</span>
                <span className="text-3xl font-sans text-foreground">{displayPrice}</span>
              </div>
              <p className="text-[10px] text-foreground/40 font-sans flex items-center gap-3">
                <span>M.R.P.: <span className="line-through decoration-red-500/50">₹{mrpNumeric.toLocaleString()}</span></span>
                <span className="bg-foreground/5 px-1.5 py-0.5 rounded uppercase font-bold text-[8px] tracking-widest">You Save ₹{savings.toLocaleString()}</span>
              </p>
              <p className="text-[11px] font-sans text-foreground/70">Inclusive of all taxes</p>
            </div>

            {/* Variant Selection - Compact Radio Style */}
            {item.variants && (
              <div className="space-y-3">
                <h3 className="font-sans text-[11px] font-bold text-foreground/60 uppercase tracking-wider">Size: <span className="text-foreground ml-1">{selectedVariant?.label}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {item.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-md border text-[11px] font-sans font-bold transition-all shadow-sm
                        ${selectedVariant?.id === v.id 
                          ? "border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary/20" 
                          : "border-foreground/10 hover:border-foreground/30 text-foreground/70 bg-white"
                        }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery & Stock */}
            <div className="space-y-4 pt-4">
              <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl">
                <p className="text-green-700 font-bold text-sm">In Stock</p>
                <p className="text-[11px] text-foreground/60 mt-1">Ships from and sold by CraftswomanAlley.</p>
                <div className="mt-3 space-y-1.5">
                   <p className="text-xs font-bold text-foreground/80 flex items-center gap-2">
                     <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/></svg>
                     Delivery by: <span className="text-secondary">March 25 - 28</span>
                   </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 py-4 bg-[#FFCB05] text-neutral-900 border-none rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] group"
                >
                  <span className="group-hover:tracking-[0.15em] transition-all duration-300">Add to Cart</span>
                </Button>
                <Button 
                   onClick={handleBuyNow}
                   className="flex-1 py-4 bg-[#F28C00] text-white border-none rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] group"
                >
                  <span className="group-hover:tracking-[0.15em] transition-all duration-300">Buy Now</span>
                </Button>
              </div>
            </div>

            {/* Product Details Section - Re-organized */}
            <div className="pt-8 space-y-8 border-t border-foreground/5">
               {/* THE BESPOKE CREATION JOURNEY - THE "WOW" SECTION */}
               <section className="relative pt-12 pb-8 px-8 bg-white border border-foreground/[0.03] rounded-[3rem] shadow-2xl shadow-secondary/5 overflow-hidden group">
                 {/* Decorative Background Elements */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 -translate-y-32 translate-x-32 rounded-full blur-[80px]" />
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100/30 translate-y-24 -translate-x-24 rounded-full blur-[60px]" />
                 
                 <div className="relative text-center mb-16">
                   <span className="text-secondary text-[10px] uppercase tracking-[0.4em] font-black block mb-3 opacity-60">The Art of personalization</span>
                   <h3 className="font-serif text-3xl text-foreground leading-none italic">Your creation story begins...</h3>
                   <div className="w-12 h-0.5 bg-secondary/20 mx-auto mt-6 rounded-full" />
                 </div>

                 {/* The Journey Thread */}
                 <div className="relative max-w-sm mx-auto space-y-16">
                   {/* Vertical Silk Thread */}
                   <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-secondary/40 via-secondary/10 to-transparent dashed-line" />
                   
                   {/* Step 1: The Seed */}
                   <div className="relative flex gap-8 group/step">
                     <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-lg shadow-secondary/30 ring-4 ring-white relative z-10 group-hover/step:scale-125 transition-transform duration-500">
                       <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                     </div>
                     <div className="pt-0.5 transform group-hover/step:translate-x-2 transition-transform duration-500">
                       <h4 className="font-sans text-[11px] font-black uppercase tracking-widest text-secondary mb-1">Step I: The Seed</h4>
                       <p className="font-serif text-[13px] text-foreground/80 leading-snug">Your order is secured. Our artisan begins the archival preparation of your canvas.</p>
                     </div>
                   </div>

                   {/* Step 2: The Thread */}
                   <div className="relative flex gap-8 group/step">
                     <div className="w-7 h-7 rounded-full bg-white border-2 border-secondary/30 flex items-center justify-center shrink-0 shadow-md ring-4 ring-white relative z-10 group-hover/step:border-secondary transition-all duration-500">
                       <div className="w-2 h-2 rounded-full bg-secondary group-hover/step:scale-150 transition-transform" />
                     </div>
                     <div className="pt-0.5 transform group-hover/step:translate-x-2 transition-transform duration-500">
                       <h4 className="font-sans text-[11px] font-black uppercase tracking-widest text-foreground/40 mb-1">Step II: The Thread</h4>
                       <p className="font-serif text-[13px] text-foreground/80 leading-snug">We connect via <span className="text-green-600 font-bold">WhatsApp</span> to curate your cherished quotes, images, and intimate themes.</p>
                     </div>
                   </div>

                   {/* Step 3: The Slow Alchemy */}
                   <div className="relative flex gap-8 group/step">
                     <div className="w-7 h-7 rounded-full bg-white border-2 border-secondary/30 flex items-center justify-center shrink-0 shadow-md ring-4 ring-white relative z-10 group-hover/step:border-secondary transition-all duration-500">
                        <div className="w-2 h-2 rounded-full bg-secondary group-hover/step:scale-150 transition-transform" />
                     </div>
                     <div className="pt-0.5 transform group-hover/step:translate-x-2 transition-transform duration-500">
                       <h4 className="font-sans text-[11px] font-black uppercase tracking-widest text-foreground/40 mb-1">Step III: Slow Alchemy</h4>
                       <p className="font-serif text-[13px] text-foreground/80 leading-snug">Layers of collage, hand-stitching, and soul are breathed into every single page.</p>
                     </div>
                   </div>

                   {/* Step 4: The Legacy */}
                   <div className="relative flex gap-8 group/step">
                     <div className="w-7 h-7 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center shrink-0 shadow-md ring-4 ring-white relative z-10 group-hover/step:bg-secondary group-hover/step:text-white transition-all duration-500">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                     </div>
                     <div className="pt-0.5 transform group-hover/step:translate-x-2 transition-transform duration-500">
                       <h4 className="font-sans text-[11px] font-black uppercase tracking-widest text-foreground/40 mb-1">Step IV: The Legacy</h4>
                       <p className="font-serif text-[13px] text-foreground/80 leading-snug">Your bespoke journal, wrapped in alley charm, is delivered as a permanent legacy.</p>
                     </div>
                   </div>
                 </div>

                 {/* Artisan's Seal */}
                 <div className="mt-20 text-center border-t border-secondary/10 pt-8">
                    <p className="font-serif italic text-xs text-foreground/40 mb-2">Hand-bound with passion by CraftswomanAlley</p>
                    <div className="flex items-center justify-center gap-2">
                       <div className="w-6 h-[1px] bg-secondary/20" />
                       <span className="text-secondary font-black text-[10px] tracking-[0.3em] uppercase">Authentic Artisan Piece</span>
                       <div className="w-6 h-[1px] bg-secondary/20" />
                    </div>
                 </div>
               </section>

               {/* Quick Info Grid - Streamlined */}
               <section className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-foreground/[0.02] rounded-2xl border border-foreground/[0.03]">
                   <h3 className="font-sans text-[9px] font-black uppercase tracking-widest text-foreground/40 mb-1">No-Return Policy</h3>
                   <p className="text-[10px] text-foreground/50 leading-tight">Bespoke items are crafted uniquely for you.</p>
                 </div>
                 <div className="p-4 bg-foreground/[0.02] rounded-2xl border border-foreground/[0.03] text-right">
                   <h3 className="font-sans text-[9px] font-black uppercase tracking-widest text-foreground/40 mb-1">Need help?</h3>
                   <p className="text-[10px] text-secondary font-bold truncate">support@craftswomanalley.com</p>
                 </div>
               </section>
            </div>
          </div>
        </div>

        {/* BESPEAK CUSTOM - THE SHOCKING FULL-WIDTH SECTION */}
        <div className="mt-32 relative">
          <div className="absolute inset-0 bg-secondary/[0.02] -skew-y-3 rounded-[4rem] pointer-events-none" />
          
          <div className="relative py-24 px-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                  <span className="text-secondary text-[10px] uppercase tracking-[0.4em] font-black">Bespeak Excellence</span>
                </div>
                <h2 className="font-serif text-5xl md:text-7xl text-foreground leading-[0.9] tracking-tighter">
                  Beyond <br/>
                  <span className="italic text-secondary">The Book.</span>
                </h2>
                <p className="text-lg text-foreground/60 font-serif italic max-w-sm">
                  "Limitless imagination meets ancestral craft. We don't just personalize; we orchestrate legacies."
                </p>
                
                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                  <Link 
                    href="/bespeak"
                    className="group relative px-8 py-5 bg-foreground text-surface rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                  >
                    <span className="relative z-10">Start Your Ordinance</span>
                    <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  <div className="flex -space-x-3 items-center">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface shadow-sm overflow-hidden">
                        <Image src={`/images/artisan-${i}.jpg`} alt="Artisan" width={40} height={40} className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all" />
                      </div>
                    ))}
                    <span className="pl-6 text-[10px] font-sans font-bold text-foreground/40 uppercase tracking-widest">Master Artisans Await</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Floating "Orchestrator" Card */}
                <div className="relative z-20 bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] transform hover:-rotate-2 transition-transform duration-700 group/card">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary flex items-center justify-center rounded-2xl shadow-2xl rotate-12 group-hover/card:rotate-0 transition-transform duration-500">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-foreground/5">
                      <h4 className="text-2xl font-serif italic text-foreground mb-2">The Bespeak Ordinance</h4>
                      <p className="text-[11px] font-sans font-bold text-foreground/40 uppercase tracking-widest">Fully Custom Orchestration</p>
                    </div>
                    
                    <ul className="space-y-4">
                      {['Custom Dimensions & Mediums', 'Conceptual Theme Architecture', 'Ancestral Binding Techniques', 'Global Archival Sourcing'].map((text, i) => (
                        <li key={i} className="flex items-center gap-4 group/li">
                          <div className="w-2 h-2 rounded-full bg-secondary/30 group-hover/li:bg-secondary group-hover/li:scale-150 transition-all" />
                          <span className="text-xs font-sans font-medium text-foreground/70">{text}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <p className="pt-6 text-[10px] text-foreground/40 leading-relaxed font-sans">
                      *This service is reserved for projects requiring absolute creative freedom. 
                      Limited to 3 ordinations per month.
                    </p>
                  </div>
                </div>

                {/* Decorative Blurs */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-100 rounded-full blur-[100px] -z-10" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-secondary/40 to-transparent" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
