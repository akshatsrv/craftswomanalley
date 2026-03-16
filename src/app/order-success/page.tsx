"use client";

import { useEffect, Suspense } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function OrderSuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  
  const orderId = searchParams.get("orderId") || "CWA-PENDING";
  const delivery = searchParams.get("delivery") || "10 - 15 Business Days";
  const paymentId = searchParams.get("paymentId");
  const paymentMethod = searchParams.get("method") || "PREPAID";

  useEffect(() => {
    // Ensure cart is cleared on success
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl w-full premium-card premium-shadow bg-surface p-12 md:p-16 text-center space-y-8 border border-foreground/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -translate-y-16 translate-x-16 rounded-full blur-3xl"></div>
      
      <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto relative">
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
          <span className="font-mono font-bold text-foreground bg-foreground/5 px-3 py-1 rounded-lg">{orderId}</span>
        </div>
        
        {paymentMethod === "COD" ? (
          <div className="flex justify-between items-center text-sm">
            <span className="font-sans uppercase tracking-widest text-foreground/40 font-bold">Payment Method</span>
            <span className="font-sans font-bold text-accent bg-accent/5 px-3 py-1 rounded-lg italic">Cash on Delivery</span>
          </div>
        ) : (
          paymentId && (
            <div className="flex justify-between items-center text-sm">
              <span className="font-sans uppercase tracking-widest text-foreground/40 font-bold">Payment Transaction</span>
              <span className="font-mono font-bold text-secondary/70 bg-secondary/5 px-3 py-1 rounded-lg">{paymentId}</span>
            </div>
          )
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="font-sans uppercase tracking-widest text-foreground/40 font-bold">Expected By</span>
          <span className="font-sans font-bold text-secondary">{delivery}</span>
        </div>
      </div>

      <div className="space-y-6">
        <p className="font-sans text-sm text-foreground/60 leading-relaxed">
          {paymentMethod === "COD" 
            ? "Your COD order is confirmed. Please keep the exact amount ready at the time of delivery."
            : "We have sent a detailed confirmation to your email. We are now beginning the slow craft of your items."}
        </p>
        
        <div className="flex flex-col gap-4">
          <Link href="/shop" className="w-full bg-foreground text-background font-sans uppercase tracking-[0.3em] font-bold py-5 px-12 rounded-xl hover:bg-foreground/90 transition-all shadow-xl shadow-foreground/10 text-center">
            Continue Exploring
          </Link>
          <Link href="/" className="font-sans text-[10px] uppercase tracking-widest font-bold text-foreground/40 hover:text-secondary transition-colors">
            Return to Alley Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow flex items-center justify-center py-32 px-8">
        <Suspense fallback={<div className="font-serif italic text-xl text-foreground/40">Finalising your order...</div>}>
          <OrderSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
