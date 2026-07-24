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
          {searchParams.get("personalised") === "true" && (
            <div className="bg-secondary/5 border-2 border-secondary/20 rounded-2xl p-6 mb-4 text-left space-y-4 animate-in fade-in zoom-in duration-500 delay-300">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                   <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                 </div>
                 <div>
                   <h3 className="font-sans font-black uppercase tracking-widest text-[11px] text-secondary">Action Required</h3>
                   <p className="font-serif text-lg leading-tight">Complete Your Personalization</p>
                 </div>
               </div>
               
               <p className="font-sans text-[11px] text-foreground/60 leading-relaxed">
                 To begin crafting your bespoke journal/scrapbook, please share your cherished quotes, photos, and dates through our secure form.
               </p>

               <a 
                 href="https://forms.gle/CWA-Personalisation" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block w-full bg-secondary text-white font-sans uppercase tracking-[0.2em] font-bold py-4 px-6 rounded-xl hover:bg-secondary/90 transition-all text-center shadow-lg shadow-secondary/20"
               >
                 Open Personalization Form
               </a>

               <div className="flex items-center justify-center gap-2 pt-1 opacity-60">
                 <svg className="w-3.5 h-3.5 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                 <span className="text-[9px] font-sans font-bold uppercase tracking-wider">Your details will be safe with us</span>
               </div>
            </div>
          )}

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
