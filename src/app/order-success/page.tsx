"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();
  const [orderId] = useState(() => `CWA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  useEffect(() => {
    clearCart();
  }, [clearCart]);


  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow flex items-center justify-center py-32 px-8">
        <div className="max-w-2xl w-full premium-card premium-shadow bg-surface p-16 text-center space-y-8 border border-foreground/5">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div className="space-y-4">
            <h1 className="font-serif text-5xl tracking-tighter">Treasures Confirmed</h1>
            <p className="font-serif italic text-xl text-foreground/40">Your physical soul is in safe hands.</p>
          </div>

          <div className="py-8 border-y border-foreground/5 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-sans uppercase tracking-widest text-foreground/40 font-bold">Order ID</span>
              <span className="font-mono font-bold text-foreground">{orderId}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-sans uppercase tracking-widest text-foreground/40 font-bold">Estimated Delivery</span>
              <span className="font-sans font-bold text-secondary">10 - 15 Business Days</span>
            </div>
          </div>

          <p className="font-sans text-sm text-foreground/60 leading-relaxed">
            We are now beginning the slow craft of your items. You will receive a notification as soon as they are ready to leave our alley.
          </p>

          <Link href="/shop" className="inline-block bg-foreground text-background font-sans uppercase tracking-[0.3em] font-bold py-5 px-12 rounded-xl hover:bg-foreground/90 transition-all">
            Back to Collection
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
