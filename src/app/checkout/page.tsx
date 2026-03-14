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
    if (trimmed.length < 3) return "Name too short";
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
  houseNumber: (v) => (v.trim() ? null : "Required"),
  streetAddress: (v) => (v.trim() ? null : "Required"),
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
    <div className="flex flex-col gap-1 min-w-0">
      <label htmlFor={field} className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-neutral-400">
        {label}
      </label>
      <div className="relative">
        {isPhone && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-sans font-medium text-neutral-400 text-[13px] pointer-events-none">
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
          className={`w-full bg-white rounded-md py-2 px-3.5 font-sans text-[13px] transition-all border
            ${isPhone ? "pl-11" : "pl-3.5"}
            ${
              hasError
                ? "border-red-200 bg-red-50/10 focus:ring-1 focus:ring-red-400 focus:outline-none"
                : "border-neutral-200 focus:border-accent focus:ring-accent focus:outline-none"
            }
            hover:border-neutral-300 placeholder:text-neutral-300`}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-3 h-3 border-2 border-neutral-100 border-t-accent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {children}
      {hasError && (
        <p className="text-[9px] text-red-500 font-bold px-0.5 uppercase tracking-tighter">
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
      if (value.length > 2) {
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
    const street = [p.name, p.street].filter(Boolean).join(", ");
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
        setSubmitError("Checkout currently unavailable. Please try again.");
      }
    } catch {
      setSubmitError("Check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <h1 className="font-serif text-2xl mb-2">Cart Empty</h1>
        <button onClick={() => router.push("/shop")} className="text-accent underline text-xs font-bold uppercase tracking-widest">
          Return to Treasures
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <Navigation />

      <main className="max-w-[1000px] mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 space-y-8">
            <header>
              <h1 className="font-serif text-3xl text-neutral-900 tracking-tight">Checkout</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Profile */}
              <div className="space-y-5">
                <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-neutral-400">Personal Information</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Full Name"
                    field="name"
                    placeholder="Aarav Sharma"
                    value={formData.name}
                    error={errors.name}
                    touched={touched.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormInput
                    label="Email"
                    field="email"
                    type="email"
                    placeholder="aarav@example.com"
                    value={formData.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      label="Contact Number"
                      field="phone"
                      type="tel"
                      placeholder="9876543210"
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

              {/* Destination */}
              <div className="space-y-5">
                <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-neutral-400">Shipping Destination</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="House/Flat No."
                    field="houseNumber"
                    placeholder="e.g. 102, Block A"
                    value={formData.houseNumber}
                    error={errors.houseNumber}
                    touched={touched.houseNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="relative">
                    <FormInput
                      label="Street/Area"
                      field="streetAddress"
                      placeholder="Type your locality..."
                      value={formData.streetAddress}
                      error={errors.streetAddress}
                      touched={touched.streetAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isLoading={isSearchingAddress}
                    >
                      {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-neutral-100 shadow-lg rounded-md mt-1 overflow-hidden">
                          {addressSuggestions.map((s, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSelectSuggestion(s)}
                              className="w-full px-3 py-2.5 text-left hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                            >
                              <p className="text-[13px] font-medium text-neutral-800 line-clamp-1">
                                {[s.properties.name, s.properties.street].filter(Boolean).join(", ")}
                              </p>
                              <p className="text-[9px] text-neutral-400 uppercase tracking-wide">
                                {[s.properties.district, s.properties.city, s.properties.state].filter(Boolean).join(" • ")}
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                    </FormInput>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
                    <FormInput
                      label="Pincode"
                      field="pincode"
                      placeholder="6 digits"
                      value={formData.pincode}
                      error={errors.pincode}
                      touched={touched.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormInput label="City" field="city" placeholder="City" value={formData.city} error={errors.city} touched={touched.city} onChange={handleChange} onBlur={handleBlur} isLoading={isFetchingCity} />
                    <FormInput label="State" field="state" placeholder="State" value={formData.state} error={errors.state} touched={touched.state} onChange={handleChange} onBlur={handleBlur} isLoading={isFetchingCity} />
                  </div>
                </div>
              </div>

              {submitError && <div className="p-3 text-red-600 bg-red-50 rounded-sm text-[11px] font-bold uppercase tracking-wider text-center">{submitError}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 text-white rounded-md py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? "Orchestrating..." : "Complete Order"}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 bg-white border border-neutral-100/50 rounded-xl p-6 md:p-8 space-y-8 shadow-sm">
              <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-neutral-400">Order Summary</p>
              
              <div className="space-y-6 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start pb-6 border-b border-neutral-50 last:border-0 last:pb-0">
                    <div className="w-14 h-18 relative bg-neutral-50 rounded-md overflow-hidden flex-shrink-0 border border-neutral-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow flex justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif text-lg text-neutral-800 leading-none truncate">{item.name}</p>
                        <p className="text-[9px] font-sans font-black text-neutral-300 uppercase tracking-widest mt-1.5">QTY: {item.quantity}</p>
                      </div>
                      <div className="text-right flex flex-col items-end shrink-0">
                        <span className="font-serif text-[11px] text-neutral-400 leading-none mb-1">₹</span>
                        <span className="font-serif text-xl text-neutral-900 leading-none tracking-tight">
                          {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-1 border-t border-neutral-50">
                <div className="flex justify-between items-center text-[10px] font-sans font-bold uppercase tracking-[0.1em] text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-neutral-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-sans font-bold uppercase tracking-[0.1em] text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-secondary tracking-widest">Free</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-neutral-200">
                  <span className="font-serif text-2xl text-neutral-800">Total</span>
                  <div className="flex items-end gap-1 leading-none">
                    <span className="font-serif text-lg text-neutral-400 mb-0.5">₹</span>
                    <span className="font-serif text-4xl text-neutral-900 tracking-tighter">
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
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f0f0f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}
