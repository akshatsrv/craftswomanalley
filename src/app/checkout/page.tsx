"use client";

import { useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Validation Rules ────────────────────────────────────────────────────────

const validators: Record<string, (value: string) => string | null> = {
  name: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "Full name is required.";
    if (trimmed.length < 3) return "Please enter your full name (at least 3 characters).";
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) return "Name should only contain letters.";
    return null;
  },
  email: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "Email address is required.";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) return "Please enter a valid email (e.g. name@example.com).";
    return null;
  },
  phone: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "Phone number is required.";
    if (digits.length !== 10) return "Phone number must be exactly 10 digits.";
    if (!/^[6-9]/.test(digits)) return "Please enter a valid Indian mobile number.";
    return null;
  },
  address: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "Address is required.";
    if (trimmed.length < 10) return "Please provide a more detailed address.";
    return null;
  },
  city: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "City is required.";
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) return "City name should only contain letters.";
    return null;
  },
  state: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "State is required.";
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) return "State name should only contain letters.";
    return null;
  },
  pincode: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "Pincode is required.";
    if (digits.length !== 6) return "Pincode must be exactly 6 digits.";
    return null;
  },
};

type FormField = "name" | "email" | "phone" | "address" | "city" | "state" | "pincode";

// ─── Sub-Components ───────────────────────────────────────────────────────────

function FormInput({
  label,
  field,
  type = "text",
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  isPhone = false,
  isLoading = false,
}: {
  label: string;
  field: FormField;
  type?: string;
  placeholder: string;
  value: string;
  error: string | null;
  touched: boolean;
  onChange: (field: FormField, val: string) => void;
  onBlur: (field: FormField) => void;
  isPhone?: boolean;
  isLoading?: boolean;
}) {
  const hasError = touched && error;
  const isValid = touched && !error && value.trim().length > 0;

  return (
    <div className="space-y-2">
      <label
        htmlFor={field}
        className="text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/40 flex items-center gap-2"
      >
        {label}
        {isValid && (
          <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </label>
      <div className="relative">
        {isPhone && (
          <span className="absolute left-5 top-1/2 -translate-y-1/2 font-sans font-bold text-foreground/40 text-sm border-r border-foreground/10 pr-3">
            +91
          </span>
        )}
        <input
          id={field}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            let val = e.target.value;
            if (isPhone || field === "pincode") {
              val = val.replace(/\D/g, "").slice(0, field === "pincode" ? 6 : 10);
            }
            onChange(field, val);
          }}
          onBlur={() => onBlur(field)}
          className={`w-full bg-background rounded-xl px-5 py-3.5 focus:outline-none transition-all duration-200 pr-10
            ${isPhone ? "pl-[4.5rem]" : "pl-5"}
            border ${
              hasError
                ? "border-red-400 focus:border-red-400 bg-red-50/5"
                : isValid
                ? "border-green-500/50 focus:border-green-500/50"
                : "border-foreground/5 focus:border-secondary"
            }`}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
          </div>
        )}
        {hasError && !isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeWidth="2" d="M12 8v4M12 16h.01" />
            </svg>
          </div>
        )}
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${hasError ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-[11px] text-red-400 font-sans flex items-center gap-1.5 pt-1">
          {error}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCity, setIsFetchingCity] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Record<FormField, string>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<FormField, string | null>>({
    name: null, email: null, phone: null, address: null, city: null, state: null, pincode: null,
  });

  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    name: false, email: false, phone: false, address: false, city: false, state: false, pincode: false,
  });

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }

    // Free Resource Feature: Fetch City from Pincode
    if (field === "pincode" && value.length === 6) {
      fetchCityFromPincode(value);
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) }));
  };

  // ─── Free Pincode API Integration ──────────────────────────────────────────
  const fetchCityFromPincode = async (pin: string) => {
    setIsFetchingCity(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      
      if (data[0].Status === "Success" && data[0].PostOffice?.[0]) {
        const city = data[0].PostOffice[0].District;
        const state = data[0].PostOffice[0].State;
        setFormData(prev => ({ ...prev, city, state }));
        setErrors(prev => ({ ...prev, city: null, state: null }));
        setTouched(prev => ({ ...prev, city: true, state: true }));
      }
    } catch {
      console.warn("Pincode API failed, falling back to manual entry.");
    } finally {
      setIsFetchingCity(false);
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<FormField, string | null> = {
      name: validators.name(formData.name),
      email: validators.email(formData.email),
      phone: validators.phone(formData.phone),
      address: validators.address(formData.address),
      city: validators.city(formData.city),
      state: validators.state(formData.state),
      pincode: validators.pincode(formData.pincode),
    };

    setTouched({ name: true, email: true, phone: true, address: true, city: true, state: true, pincode: true });
    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: formData, items: cart, total: cartTotal }),
      });

      if (response.ok) {
        const data = await response.json();
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}&delivery=${encodeURIComponent(data.estimatedDelivery)}`);
      } else {
        setSubmitError("We encountered an issue processing your order. Please try again.");
      }
    } catch {
      setSubmitError("Connectivity issues detected. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col noise-bg">
        <Navigation />
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6">
          <h1 className="font-serif text-4xl">Your Cart is Empty</h1>
          <button onClick={() => router.push("/shop")} className="bg-secondary text-white px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            Discover Treasures
          </button>
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
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Checkout</span>
          <h1 className="font-serif text-5xl tracking-tighter">Artisanal Checkout</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Contact Information */}
              <div className="premium-card bg-surface p-8 md:p-10 border border-foreground/5 space-y-6">
                <h3 className="font-serif text-2xl border-b border-foreground/5 pb-4 text-foreground/80">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    field="name"
                    placeholder="E.g. Aarav Sharma"
                    value={formData.name}
                    error={errors.name}
                    touched={touched.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormInput
                    label="Email Address"
                    field="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <FormInput
                  label="Phone Number"
                  field="phone"
                  type="tel"
                  placeholder="98765 43210"
                  value={formData.phone}
                  error={errors.phone}
                  touched={touched.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isPhone={true}
                />
              </div>

              {/* Delivery Address */}
              <div className="premium-card bg-surface p-8 md:p-10 border border-foreground/5 space-y-6">
                <h3 className="font-serif text-2xl border-b border-foreground/5 pb-4 text-foreground/80">Shipping Destination</h3>
                <FormInput
                  label="Street Address"
                  field="address"
                  placeholder="Flat, Building, Area..."
                  value={formData.address}
                  error={errors.address}
                  touched={touched.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput
                    label="PIN Code"
                    field="pincode"
                    placeholder="400001"
                    value={formData.pincode}
                    error={errors.pincode}
                    touched={touched.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormInput
                    label="City"
                    field="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    error={errors.city}
                    touched={touched.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isLoading={isFetchingCity}
                  />
                  <FormInput
                    label="State"
                    field="state"
                    placeholder="Maharashtra"
                    value={formData.state}
                    error={errors.state}
                    touched={touched.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isLoading={isFetchingCity}
                  />
                </div>
                <p className="text-[10px] font-sans italic text-foreground/30">
                  Tip: Enter your 6-digit Pincode and we&apos;ll try to fetch your city and state automatically.
                </p>
              </div>

              {submitError && (
                <div className="bg-red-50/10 border border-red-200 p-4 rounded-xl text-red-500 text-sm font-medium">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white font-sans uppercase tracking-[0.3em] font-bold py-6 rounded-xl hover:opacity-90 transition-all shadow-xl shadow-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing Transaction..." : "Complete Order"}
              </button>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 premium-card bg-surface p-8 md:p-10 border border-foreground/5 space-y-8">
              <h3 className="font-serif text-2xl pb-4 border-b border-foreground/5">Treasures Selected</h3>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 rounded-lg overflow-hidden relative flex-shrink-0 bg-foreground/5">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-serif text-lg leading-tight">{item.name}</p>
                      <p className="text-[10px] font-sans text-secondary font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-sans font-bold text-sm">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-foreground/5">
                <div className="flex justify-between items-center text-sm font-sans">
                  <span className="text-foreground/40 font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-sans">
                  <span className="text-foreground/40 font-bold uppercase tracking-widest">Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-foreground/5">
                  <span className="font-serif text-2xl tracking-tighter">Total Due</span>
                  <span className="font-serif text-2xl text-secondary">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
