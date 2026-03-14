"use client";

import { useState, useCallback } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface PhotonSuggestion {
  properties: {
    name?: string;
    street?: string;
    district?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

// ─── Validation Rules ────────────────────────────────────────────────────────

const validators: Record<string, (value: string) => string | null> = {
  name: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "Required";
    if (trimmed.length < 3) return "Too short";
    return null;
  },
  email: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "Required";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) return "Invalid email";
    return null;
  },
  phone: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "Required";
    if (digits.length !== 10) return "Must be 10 digits";
    return null;
  },
  houseNumber: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "Required";
    return null;
  },
  streetAddress: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "Required";
    return null;
  },
  city: (v) => (v.trim() ? null : "Required"),
  state: (v) => (v.trim() ? null : "Required"),
  pincode: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "Required";
    if (digits.length !== 6) return "Must be 6 digits";
    return null;
  },
};

type FormField = "name" | "email" | "phone" | "houseNumber" | "streetAddress" | "city" | "state" | "pincode";

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
  children,
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
  children?: React.ReactNode;
}) {
  const hasError = touched && error;

  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label htmlFor={field} className="text-[11px] font-sans font-bold uppercase tracking-wider text-neutral-500">
        {label}
      </label>
      <div className="relative group">
        {isPhone && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-medium text-neutral-400 text-sm pointer-events-none">
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
          autoComplete="off"
          className={`w-full bg-white rounded-lg py-3 px-4 font-sans text-[14px] transition-all
            ${isPhone ? "pl-12" : "pl-4"}
            ${
              hasError
                ? "border border-red-300 bg-red-50/20 focus:ring-1 focus:ring-red-400 focus:outline-none"
                : "border border-neutral-200 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
            }
            hover:border-neutral-300`}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-3.5 h-3.5 border-2 border-neutral-200 border-t-accent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {children}
      {hasError && (
        <p className="text-[10px] text-red-500 font-medium px-1 uppercase tracking-tight">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCity, setIsFetchingCity] = useState(false);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [addressSuggestions, setAddressSuggestions] = useState<PhotonSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState<Record<FormField, string>>({
    name: "", email: "", phone: "", houseNumber: "", streetAddress: "", city: "", state: "", pincode: "",
  });

  const [errors, setErrors] = useState<Record<FormField, string | null>>({
    name: null, email: null, phone: null, houseNumber: null, streetAddress: null, city: null, state: null, pincode: null,
  });

  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    name: false, email: false, phone: false, houseNumber: false, streetAddress: false, city: false, state: false, pincode: false,
  });

  const searchAddress = useCallback(
    async (query: string) => {
      if (query.length < 3) return;
      setIsSearchingAddress(true);
      try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=en&lat=22.3511148&lon=78.6677428`);
        const data = await response.json();
        const suggestions = (data.features as PhotonSuggestion[]).filter((f) => f.properties.country === "India" || !f.properties.country);
        setAddressSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      } catch (err) {
        console.warn("Address search failed", err);
      } finally {
        setIsSearchingAddress(false);
      }
    },
    []
  );

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
      console.warn("Pincode API failed");
    } finally {
      setIsFetchingCity(false);
    }
  };

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
    if (field === "pincode" && value.length === 6) {
      fetchCityFromPincode(value);
    }
    if (field === "streetAddress") {
      if (value.length > 3) {
        searchAddress(value);
      } else {
        setAddressSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) }));
    if (field === "streetAddress") {
      setTimeout(() => setShowSuggestions(false), 200);
    }
  };

  const handleSelectSuggestion = (suggestion: PhotonSuggestion) => {
    const p = suggestion.properties;
    const street = [p.name, p.street, p.district].filter(Boolean).join(", ");
    setFormData(prev => ({
      ...prev,
      streetAddress: street,
      city: p.city || p.district || prev.city,
      state: p.state || prev.state,
      pincode: p.postcode || prev.pincode,
    }));
    setTouched(prev => ({ ...prev, streetAddress: true, city: true, state: true, pincode: true }));
    setErrors(prev => ({ ...prev, streetAddress: null, city: null, state: null, pincode: null }));
    setShowSuggestions(false);
  };

  const validateAll = (): boolean => {
    const newErrors: Record<FormField, string | null> = {
      name: validators.name(formData.name),
      email: validators.email(formData.email),
      phone: validators.phone(formData.phone),
      houseNumber: validators.houseNumber(formData.houseNumber),
      streetAddress: validators.streetAddress(formData.streetAddress),
      city: validators.city(formData.city),
      state: validators.state(formData.state),
      pincode: validators.pincode(formData.pincode),
    };
    setTouched({ name: true, email: true, phone: true, houseNumber: true, streetAddress: true, city: true, state: true, pincode: true });
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateAll()) return;
    setIsSubmitting(true);
    try {
      const fullAddress = `${formData.houseNumber}, ${formData.streetAddress}`;
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          customer: { ...formData, address: fullAddress }, 
          items: cart, 
          total: cartTotal 
        }),
      });
      if (response.ok) {
        const data = await response.json();
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}&delivery=${encodeURIComponent(data.estimatedDelivery)}`);
      } else {
        setSubmitError("Checkout currently unavailable. Please try again later.");
      }
    } catch {
      setSubmitError("Connection error. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
        <button onClick={() => router.push("/shop")} className="text-accent underline font-sans text-sm uppercase tracking-widest font-bold">
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Main Column */}
          <div className="lg:col-span-7">
            <div className="mb-10 lg:mb-16">
              <h1 className="font-serif text-4xl text-neutral-900 mb-2">Checkout</h1>
              <div className="h-1 w-12 bg-accent rounded-full" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Contact */}
              <div className="space-y-6">
                <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em] text-neutral-400">01. Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Full Name"
                    field="name"
                    placeholder="Enter your name"
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
                    placeholder="name@provider.com"
                    value={formData.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      label="Phone"
                      field="phone"
                      type="tel"
                      placeholder="XXXXXXXXXX"
                      value={formData.phone}
                      error={errors.phone}
                      touched={touched.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isPhone={true}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="space-y-6">
                <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em] text-neutral-400">02. Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="House / Flat No."
                    field="houseNumber"
                    placeholder="E.g. Unit 402"
                    value={formData.houseNumber}
                    error={errors.houseNumber}
                    touched={touched.houseNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="relative">
                    <FormInput
                      label="Street / Area Name"
                      field="streetAddress"
                      placeholder="Start typing area..."
                      value={formData.streetAddress}
                      error={errors.streetAddress}
                      touched={touched.streetAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isLoading={isSearchingAddress}
                    >
                      {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-neutral-100 shadow-xl rounded-lg mt-1 overflow-hidden">
                          {addressSuggestions.map((s, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSelectSuggestion(s)}
                              className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-neutral-800">
                                  {[s.properties.name, s.properties.street].filter(Boolean).join(", ")}
                                </span>
                                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                                  {[s.properties.district, s.properties.city, s.properties.state].filter(Boolean).join(", ")}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </FormInput>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:col-span-2">
                    <FormInput
                      label="PIN Code"
                      field="pincode"
                      placeholder="6 Digits"
                      value={formData.pincode}
                      error={errors.pincode}
                      touched={touched.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormInput 
                      label="City" 
                      field="city" 
                      placeholder="City" 
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
                      placeholder="State" 
                      value={formData.state} 
                      error={errors.state} 
                      touched={touched.state} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      isLoading={isFetchingCity}
                    />
                  </div>
                </div>
              </div>

              {submitError && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-xs font-bold font-sans">{submitError}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 text-white rounded-lg py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Finish Order"}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 w-full">
            <div className="lg:sticky lg:top-24 bg-white border border-neutral-100 rounded-3xl p-8 md:p-12 space-y-12 shadow-sm">
              <h3 className="font-serif text-3xl text-neutral-800">Order Summary</h3>
              
              <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 items-start">
                    <div className="w-20 h-24 relative bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow flex justify-between gap-4">
                      <div className="space-y-1">
                        <p className="font-serif text-xl text-neutral-800 leading-snug">{item.name}</p>
                        <p className="text-[11px] font-sans font-black text-neutral-400 uppercase tracking-[0.2em]">QTY: {item.quantity}</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="font-serif text-sm text-neutral-500">₹</span>
                        <span className="font-serif text-2xl text-neutral-900 -mt-2">
                          {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 pt-8 border-t border-neutral-100">
                <div className="flex justify-between items-center group">
                  <span className="text-[11px] font-sans font-black uppercase tracking-[0.2em] text-neutral-400">Subtotal</span>
                  <span className="font-sans font-bold text-neutral-900 tracking-tight">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-[11px] font-sans font-black uppercase tracking-[0.2em] text-neutral-400">Shipping</span>
                  <span className="text-secondary font-sans font-black text-[11px] uppercase tracking-widest border-b-2 border-secondary/20 pb-0.5">Free</span>
                </div>
                <div className="flex justify-between items-end pt-8 border-t border-neutral-100">
                  <span className="font-serif text-3xl text-neutral-800">Total</span>
                  <div className="flex flex-col items-end leading-none">
                    <span className="font-serif text-5xl text-neutral-900 tracking-tighter">
                      <span className="text-2xl mr-1 font-normal opacity-50">₹</span>
                      {cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
      `}</style>
    </div>
  );
}
