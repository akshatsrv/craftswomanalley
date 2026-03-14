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
  houseNumber: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "House/Flat number is required.";
    return null;
  },
  streetAddress: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return "Street/Area name is required.";
    if (trimmed.length < 3) return "Please provide a more detailed street/area.";
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
  const isValid = touched && !error && value.trim().length > 0;

  return (
    <div className="space-y-1 group">
      <label
        htmlFor={field}
        className="text-[11px] font-sans uppercase tracking-[0.2em] font-black text-foreground/60 transition-colors group-focus-within:text-accent flex justify-between items-center px-1"
      >
        {label}
        {isValid && (
          <span className="text-secondary animate-in fade-in zoom-in duration-300">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </label>
      <div className="relative">
        <div className="absolute inset-0 bg-accent/5 rounded-2xl scale-[0.98] group-focus-within:scale-100 opacity-0 group-focus-within:opacity-100 transition-all duration-500 blur-xl -z-10" />
        
        {isPhone && (
          <span className="absolute left-6 top-1/2 -translate-y-1/2 font-sans font-black text-foreground/50 text-sm tracking-tight border-r border-foreground/10 pr-4">
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
          className={`w-full bg-surface/50 backdrop-blur-sm rounded-2xl px-6 py-4.5 focus:outline-none transition-all duration-300 font-sans text-[15px] placeholder:text-foreground/20 leading-relaxed
            ${isPhone ? "pl-[5.2rem]" : "pl-6"}
            ${
              hasError
                ? "border-2 border-red-300 focus:border-red-400 bg-red-50/20"
                : isValid
                ? "border-2 border-secondary/20 focus:border-secondary/40 shadow-inner"
                : "border-2 border-foreground/5 focus:border-accent/40 shadow-sm"
            }
            group-hover:border-foreground/10`}
        />

        {isLoading && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
          </div>
        )}

        {hasError && !isLoading && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-red-400 animate-in bounce-in">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeWidth="2" d="M12 8v4M12 16h.01" />
            </svg>
          </div>
        )}
      </div>
      {children}
      <div className={`overflow-hidden transition-all duration-500 transform ${hasError ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"}`}>
        <p className="text-[11px] text-red-500 font-sans font-bold flex items-center gap-2 pt-1.5 px-1 uppercase tracking-wider">
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
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [addressSuggestions, setAddressSuggestions] = useState<PhotonSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState<Record<FormField, string>>({
    name: "",
    email: "",
    phone: "",
    houseNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
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
      console.warn("Pincode API failed, falling back to manual entry.");
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
      <div className="min-h-screen flex flex-col bg-background selection:bg-accent/20">
        <Navigation />
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-12">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150 -z-10" />
            <h1 className="font-serif text-7xl tracking-tighter opacity-10">Cart Empty</h1>
          </div>
          <p className="font-serif text-2xl text-foreground/40 max-w-md italic">
            Your collection of treasures is currently awaiting its first piece.
          </p>
          <button 
            onClick={() => router.push("/shop")} 
            className="group relative px-12 py-5 overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-accent transition-transform group-hover:scale-110" />
            <span className="relative font-sans text-xs font-black uppercase tracking-[0.4em] text-white">Begin Discovery</span>
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-accent/20 relative overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />
      
      <Navigation />

      <main className="flex-grow py-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in slide-in-from-top-10 duration-1000">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-accent/30" />
              <span className="font-sans text-[11px] uppercase tracking-[0.6em] font-black text-accent/60">Secure Checkout</span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tight leading-[0.9] text-foreground">
              Finalize <span className="italic text-accent/80 font-normal">Details</span>
            </h1>
          </div>
          <p className="font-serif text-xl md:text-2xl text-foreground/30 max-w-sm leading-tight italic">
            Complete your order and let our artisans prepare your treasures.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          <div className="lg:col-span-7 space-y-12">
            <form onSubmit={handleSubmit} className="space-y-16" noValidate>
              
              {/* Section: Contact */}
              <section className="space-y-10 group animate-in slide-in-from-left-10 duration-1000 delay-150">
                <div className="flex items-center gap-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-serif text-lg font-bold text-accent">01</span>
                  <h3 className="font-serif text-4xl tracking-tight text-foreground/90">Curator Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
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
                      label="Phone Number"
                      field="phone"
                      type="tel"
                      placeholder="Number for delivery updates"
                      value={formData.phone}
                      error={errors.phone}
                      touched={touched.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isPhone={true}
                    />
                  </div>
                </div>
              </section>

              {/* Section: Shipping */}
              <section className="space-y-10 group animate-in slide-in-from-left-10 duration-1000 delay-300">
                <div className="flex items-center gap-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center font-serif text-lg font-bold text-secondary">02</span>
                  <h3 className="font-serif text-4xl tracking-tight text-foreground/90">Shipping Destination</h3>
                </div>
                
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormInput
                      label="House / Flat No."
                      field="houseNumber"
                      placeholder="E.g. Unit 402, Building A"
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
                        placeholder="Search for your street..."
                        value={formData.streetAddress}
                        error={errors.streetAddress}
                        touched={touched.streetAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isLoading={isSearchingAddress}
                      >
                        {showSuggestions && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-4 bg-white/95 backdrop-blur-xl border border-foreground/5 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="p-3">
                              {addressSuggestions.map((s, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleSelectSuggestion(s)}
                                  className="w-full p-6 text-left hover:bg-accent/5 rounded-[1.5rem] transition-all duration-300 flex items-start gap-4 group/item"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-accent/10 transition-colors">
                                    <svg className="w-5 h-5 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <span className="font-serif text-lg text-foreground group-hover/item:text-accent transition-colors">
                                      {[s.properties.name, s.properties.street].filter(Boolean).join(", ")}
                                    </span>
                                    <span className="text-[10px] font-sans text-foreground/40 uppercase tracking-[0.2em] font-black">
                                      {[s.properties.district, s.properties.city, s.properties.state].filter(Boolean).join(" • ")}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </FormInput>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                      placeholder="City Name"
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
                      placeholder="State Name"
                      value={formData.state}
                      error={errors.state}
                      touched={touched.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isLoading={isFetchingCity}
                    />
                  </div>
                </div>
              </section>

              {submitError && (
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-red-600 text-[13px] font-bold uppercase tracking-widest text-center animate-in shake-in duration-500">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-3xl py-10 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-accent transition-transform group-hover:scale-105 duration-700" />
                <div className="relative flex items-center justify-center gap-4">
                  <span className="font-sans text-sm font-black uppercase tracking-[0.6em] text-white">
                    {isSubmitting ? "Orchestrating Order..." : "Confirm Collection"}
                  </span>
                  {!isSubmitting && (
                    <svg className="w-5 h-5 text-white/50 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </div>
              </button>
            </form>
          </div>

          {/* Sidebar: Order Summary */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-12 animate-in slide-in-from-right-10 duration-1000 delay-500">
              
              <div className="bg-surface/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 border border-white/40 shadow-2xl space-y-12">
                <div className="space-y-2">
                  <h3 className="font-serif text-4xl tracking-tight">Your Selection</h3>
                  <p className="text-[11px] font-sans font-black uppercase tracking-[0.4em] text-accent/60 italic">{cart.length} Masterpieces selected</p>
                </div>

                <div className="space-y-10 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-8 group/item">
                      <div className="w-24 h-32 rounded-2xl overflow-hidden relative flex-shrink-0 bg-white/50 shadow-sm border-4 border-white group-hover/item:scale-105 transition-transform duration-500">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <p className="font-serif text-2xl leading-[1.1] text-foreground/80">{item.name}</p>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-white/60 rounded-full font-sans text-[10px] font-black uppercase tracking-widest text-foreground/40">Qty {item.quantity}</span>
                          <p className="font-sans font-black text-xs text-accent tracking-tighter self-center">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 pt-12 border-t border-foreground/5">
                  <div className="flex justify-between items-center group/price">
                    <span className="text-[11px] font-sans font-black uppercase tracking-[0.4em] text-foreground/30 group-hover/price:text-foreground/60 transition-colors">Subtotal</span>
                    <span className="font-sans font-black text-lg tracking-tighter">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-sans font-black uppercase tracking-[0.4em] text-foreground/30">Shipping</span>
                    <span className="font-sans font-black text-xs uppercase tracking-widest text-secondary underline underline-offset-4 decoration-2">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center pt-8 border-t border-foreground/10">
                    <span className="font-serif text-4xl tracking-tight">Investment</span>
                    <div className="flex flex-col items-end">
                      <span className="font-serif text-5xl text-accent leading-none">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/40 rounded-3xl p-6 border border-white flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a12.02 12.02 0 00-3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-3.179-.965-6.193-2.618-8.702z" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-foreground/40 leading-relaxed">
                    Artisan Protection enabled. Your security is our highest priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(160, 82, 45, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(160, 82, 45, 0.3);
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
