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
    if (!v.trim()) return "Full name is required.";
    if (v.trim().length < 2) return "Name must be at least 2 characters.";
    if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return "Name can only contain letters, spaces, hyphens, or apostrophes.";
    return null;
  },
  email: (v) => {
    if (!v.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Please enter a valid email (e.g. hello@alley.com).";
    return null;
  },
  phone: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!v.trim()) return "Phone number is required.";
    if (digits.length < 10) return "Phone number must have at least 10 digits.";
    if (digits.length > 13) return "Phone number seems too long. Double-check it.";
    return null;
  },
  address: (v) => {
    if (!v.trim()) return "Street address is required.";
    if (v.trim().length < 10) return "Please enter a complete address (house, street, etc.).";
    return null;
  },
  city: (v) => {
    if (!v.trim()) return "City is required.";
    if (!/^[a-zA-Z\s]+$/.test(v.trim())) return "City name can only contain letters.";
    return null;
  },
  pincode: (v) => {
    if (!v.trim()) return "Pincode is required.";
    if (!/^\d{6}$/.test(v.trim())) return "Pincode must be exactly 6 digits.";
    return null;
  },
};

type FormField = "name" | "email" | "phone" | "address" | "city" | "pincode";

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
        <input
          id={field}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          onBlur={() => onBlur(field)}
          className={`w-full bg-background rounded-xl px-5 py-3.5 focus:outline-none transition-all duration-200 pr-10
            border ${
              hasError
                ? "border-red-400 focus:border-red-400 bg-red-50/5"
                : isValid
                ? "border-green-500/50 focus:border-green-500/50"
                : "border-foreground/5 focus:border-secondary"
            }`}
        />
        {/* inline status icon */}
        {hasError && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeWidth="2" d="M12 8v4M12 16h.01" />
            </svg>
          </div>
        )}
        {isValid && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      {/* Error message — animated in */}
      <div
        className={`overflow-hidden transition-all duration-300 ${hasError ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-[11px] text-red-400 font-sans flex items-center gap-1.5 pt-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Record<FormField, string>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<FormField, string | null>>({
    name: null, email: null, phone: null, address: null, city: null, pincode: null,
  });

  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    name: false, email: false, phone: false, address: false, city: false, pincode: false,
  });

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Live-validate once a field has been touched
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) }));
  };

  const validateAll = (): boolean => {
    const allTouched: Record<FormField, boolean> = {
      name: true, email: true, phone: true, address: true, city: true, pincode: true,
    };
    const allErrors: Record<FormField, string | null> = {
      name:    validators.name(formData.name),
      email:   validators.email(formData.email),
      phone:   validators.phone(formData.phone),
      address: validators.address(formData.address),
      city:    validators.city(formData.city),
      pincode: validators.pincode(formData.pincode),
    };
    setTouched(allTouched);
    setErrors(allErrors);
    return Object.values(allErrors).every((e) => e === null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateAll()) {
      // Scroll to first error
      const firstError = document.querySelector("[data-has-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: formData, items: cart, total: cartTotal }),
      });

      if (response.ok) {
        clearCart();
        router.push("/order-success");
      } else {
        setSubmitError("Something went wrong on our end. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorCount = Object.values(errors).filter(Boolean).length;
  const allTouched = Object.values(touched).every(Boolean);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col noise-bg">
        <Navigation />
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6">
          <h1 className="font-serif text-4xl">The alley is empty</h1>
          <p className="font-serif italic text-xl text-foreground/40">Add some treasures before checking out.</p>
          <button onClick={() => router.push("/shop")} className="bg-secondary text-white px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-widest">
            Explore Shop
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
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Final Steps</span>
          <h1 className="font-serif text-5xl tracking-tighter">Your Information</h1>
        </header>

        {/* Global submit error */}
        {submitError && (
          <div className="mb-8 flex items-center gap-4 bg-red-50/10 border border-red-400/30 rounded-xl px-6 py-4">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-sm font-sans text-red-400">{submitError}</p>
          </div>
        )}

        {/* Validation summary banner */}
        {allTouched && errorCount > 0 && (
          <div className="mb-8 flex items-center gap-4 bg-amber-50/10 border border-amber-400/30 rounded-xl px-6 py-4">
            <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-sm font-sans text-amber-400">
              Please fix <strong>{errorCount}</strong> {errorCount === 1 ? "error" : "errors"} before placing your order.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Contact Details Card */}
              <div className="premium-card bg-surface p-10 border border-foreground/5 space-y-6">
                <h3 className="font-serif text-2xl border-b border-foreground/5 pb-4">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div data-has-error={!!(touched.name && errors.name)}>
                    <FormInput
                      label="Full Name"
                      field="name"
                      placeholder="Your full name..."
                      value={formData.name}
                      error={errors.name}
                      touched={touched.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div data-has-error={!!(touched.email && errors.email)}>
                    <FormInput
                      label="Email Address"
                      field="email"
                      type="email"
                      placeholder="hello@alley.com"
                      value={formData.email}
                      error={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div data-has-error={!!(touched.phone && errors.phone)}>
                  <FormInput
                    label="Phone Number"
                    field="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    error={errors.phone}
                    touched={touched.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              {/* Shipping Address Card */}
              <div className="premium-card bg-surface p-10 border border-foreground/5 space-y-6">
                <h3 className="font-serif text-2xl border-b border-foreground/5 pb-4">Shipping Address</h3>
                <div data-has-error={!!(touched.address && errors.address)}>
                  <FormInput
                    label="Street Address"
                    field="address"
                    placeholder="Flat, House no., Building, Street..."
                    value={formData.address}
                    error={errors.address}
                    touched={touched.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div data-has-error={!!(touched.city && errors.city)}>
                    <FormInput
                      label="City"
                      field="city"
                      placeholder="Your City"
                      value={formData.city}
                      error={errors.city}
                      touched={touched.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div data-has-error={!!(touched.pincode && errors.pincode)}>
                    <FormInput
                      label="PIN Code"
                      field="pincode"
                      placeholder="6-digit PIN"
                      value={formData.pincode}
                      error={errors.pincode}
                      touched={touched.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white font-sans uppercase tracking-[0.3em] font-bold py-6 rounded-xl hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing Craft...
                  </>
                ) : (
                  "Place Artisanal Order"
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
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
                Secure checkout. Transactions are handled <br />with physical oversight and integrity.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
