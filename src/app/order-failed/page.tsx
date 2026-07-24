"use client";

import { Suspense } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

function OrderFailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [isProcessingCod, setIsProcessingCod] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);
  
  const reason = searchParams.get("reason") || "The payment was not completed.";
  const type = searchParams.get("type");
  const isCancellation = type === "cancel";

  useEffect(() => {
    const saved = localStorage.getItem("cwa_checkout_form");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const fullAddress = `${parsed.houseNumber}, ${parsed.streetAddress}`;
        setCustomerData({ ...parsed, address: fullAddress });
      } catch (e) {
        console.error("Failed to recover customer data", e);
      }
    }
  }, []);

  const handleCOD = async () => {
    if (!customerData || cart.length === 0) {
      router.push('/checkout');
      return;
    }

    setIsProcessingCod(true);
    try {
      const GST_RATE = 0.18;
      const taxAmount = Math.round(cartTotal * GST_RATE);
      const grandTotal = cartTotal + taxAmount;
      
      const res = await fetch("/api/order/cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: customerData,
          items: cart,
          total: grandTotal,
          taxAmount: taxAmount
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.removeItem("cwa_checkout_form");
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}&delivery=${encodeURIComponent(data.estimatedDelivery)}&method=COD`);
      } else {
        alert("Something went wrong. Please try retrying the checkout.");
      }
    } catch (err) {
      alert("Connection error. Please try again.");
    } finally {
      setIsProcessingCod(false);
    }
  };

  return (
    <div className="max-w-2xl w-full bg-white p-8 md:p-16 text-center space-y-8 border border-neutral-100 shadow-2xl rounded-3xl relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 -translate-y-16 translate-x-16 rounded-full blur-3xl"></div>
      
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto relative border border-red-100">
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      
      <div className="space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tighter text-neutral-900">
          {isCancellation ? "Payment Paused" : "Transaction Unsuccessful"}
        </h1>
        <p className="font-serif italic text-xl text-neutral-500 text-balance">
          {isCancellation 
            ? "Your journey was interrupted. Your items are still waiting in your cart." 
            : "We couldn't finalize your order at this moment."}
        </p>
      </div>

      <div className="py-6 border-y border-neutral-100 space-y-4">
        <div className="flex flex-col gap-1 items-center">
          <span className="font-sans uppercase tracking-[0.2em] text-neutral-400 font-bold text-[10px]">Status Update</span>
          <span className="font-sans font-medium text-red-600 italic px-4 text-sm">{reason}</span>
        </div>
      </div>

      <div className="space-y-8">
        <p className="font-sans text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
          {isCancellation 
            ? "If you faced any difficulties with the payment portal, you can switch to Cash on Delivery to finish your order instantly."
            : "Would you like to try again, or switch to Cash on Delivery? Your money is safe with us."
          }
        </p>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleCOD}
            disabled={isProcessingCod}
            className="w-full bg-secondary text-white font-sans uppercase tracking-[0.3em] font-bold py-5 px-12 rounded-xl hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/10 text-center flex items-center justify-center gap-2"
          >
            {isProcessingCod ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Confirming COD...
              </>
            ) : "Place via Cash on Delivery"}
          </button>

          <button 
            onClick={() => router.push('/checkout')}
            disabled={isProcessingCod}
            className="w-full bg-neutral-900 text-white font-sans uppercase tracking-[0.3em] font-bold py-5 px-12 rounded-xl hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200 text-center disabled:opacity-50"
          >
            Retry Prepaid Checkout
          </button>
          <Link href="/shop" className="font-sans text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-neutral-900 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderFailedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navigation />
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <Suspense fallback={<div className="font-serif italic text-xl text-neutral-400">Loading order status...</div>}>
          <OrderFailedContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
