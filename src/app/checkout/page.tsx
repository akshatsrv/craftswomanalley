"use client";

import { useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order via API
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: cart,
          total: cartTotal,
        }),
      });

      if (response.ok) {
        clearCart();
        router.push("/order-success");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col noise-bg">
        <Navigation />
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6">
          <h1 className="font-serif text-4xl">The alley is empty</h1>
          <p className="font-serif italic text-xl text-foreground/40">Add some treasures before checking out.</p>
          <button onClick={() => router.push("/shop")} className="bg-secondary text-white px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-widest">Explore Shop</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      
      <main className="flex-grow py-24 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Final Steps</span>
          <h1 className="font-serif text-5xl tracking-tighter">Your Information</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="premium-card bg-surface p-10 border border-foreground/5 space-y-6">
                <h3 className="font-serif text-2xl border-b border-foreground/5 pb-4">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/40">Full Name</label>
                    <input required className="w-full bg-background border border-foreground/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-secondary transition-colors" placeholder="Handwriting desired..." value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/40">Email Address</label>
                    <input required type="email" className="w-full bg-background border border-foreground/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-secondary transition-colors" placeholder="hello@alley.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/40">Phone Number</label>
                  <input required type="tel" className="w-full bg-background border border-foreground/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-secondary transition-colors" placeholder="+91 ..." value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="premium-card bg-surface p-10 border border-foreground/5 space-y-6">
                <h3 className="font-serif text-2xl border-b border-foreground/5 pb-4">Shipping Address</h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/40">Street Address</label>
                  <input required className="w-full bg-background border border-foreground/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-secondary transition-colors" placeholder="Flat, House, Building, Street..." value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/40">City</label>
                    <input required className="w-full bg-background border border-foreground/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-secondary transition-colors" placeholder="Your City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/40">Pincode</label>
                    <input required className="w-full bg-background border border-foreground/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-secondary transition-colors" placeholder="6 Digits" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-secondary text-white font-sans uppercase tracking-[0.3em] font-bold py-6 rounded-xl hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20 disabled:opacity-50"
              >
                {isSubmitting ? "Processing Craft..." : "Place Artisanal Order"}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 premium-card bg-surface p-10 border border-foreground/5 space-y-8">
              <h3 className="font-serif text-2xl pb-4 border-b border-foreground/5">Treasures Selected</h3>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 rounded-lg overflow-hidden relative flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-serif text-lg leading-tight">{item.name}</p>
                      <p className="text-[10px] font-sans text-secondary font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-sans font-bold text-sm">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-foreground/5">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-foreground/40 uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-foreground/40 uppercase tracking-widest font-bold">Shipping</span>
                  <span className="font-bold text-secondary">Free</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-foreground/5">
                  <span className="font-serif text-2xl tracking-tighter">Due Now</span>
                  <span className="font-serif text-2xl text-secondary">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <p className="text-[9px] font-sans text-foreground/30 uppercase tracking-[0.2em] leading-relaxed text-center">
                Secure checkout. Transactions are handled <br/>with physical oversight and integrity.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
