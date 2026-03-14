"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            options?: {
              componentRestrictions?: { country: string | string[] };
              fields?: string[];
            }
          ) => {
            addListener: (event: string, handler: () => void) => void;
            getPlace: () => {
              address_components?: Array<{
                long_name: string;
                short_name: string;
                types: string[];
              }>;
              formatted_address: string;
            };
          };
        };
      };
    };
  }
}

// ─── Style Fix for Google Autocomplete ──────────────────────────────────────
const GoogleMapStyle = () => (
  <style jsx global>{`
    .pac-container {
      background-color: #fff;
      z-index: 9999 !important;
      border-radius: 12px;
      border: 1px solid rgba(0,0,0,0.05);
      font-family: 'Inter', sans-serif;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      margin-top: 4px;
    }
    .pac-item {
      padding: 12px 20px;
      cursor: pointer;
      border-top: 1px solid #f9fafb;
      display: flex;
      align-items: center;
    }
    .pac-item:first-child {
      border-top: none;
    }
    .pac-item:hover {
      background-color: #f9fafb;
    }
    .pac-item-query {
      font-size: 14px;
      color: #111827;
      margin-right: 8px;
    }
    .pac-matched {
      font-weight: 700;
      color: #6d28d9;
    }
    .pac-icon {
      display: none;
    }
  `}</style>
);

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
  inputRef,
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
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const hasError = touched && error;
  const isValid = touched && !error && value.trim().length > 0;

  return (
    <div className="space-y-2 relative">
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
          ref={inputRef}
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
        {hasError && (
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const streetInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<{
    addListener: (event: string, handler: () => void) => void;
    getPlace: () => {
      address_components?: Array<{
        long_name: string;
        short_name: string;
        types: string[];
      }>;
      formatted_address: string;
    };
  } | null>(null);

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

  // ─── Google Maps Integration ───────────────────────────────────────────────
  const initAutocomplete = useCallback(() => {
    if (!streetInputRef.current || !window.google) return;

    // Prevent double initialization
    if (autocompleteRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(streetInputRef.current, {
      componentRestrictions: { country: "in" },
      fields: ["address_components", "formatted_address"],
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place || !place.address_components) return;

      let street = "";
      let city = "";
      let state = "";
      let pincode = "";

      // Fallback from formatted address if components are sparse
      const addressParts = place.formatted_address.split(",");
      
      for (const component of place.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
          case "sublocality_level_1":
          case "sublocality":
          case "neighborhood":
            street = component.long_name;
            break;
          case "locality":
            city = component.long_name;
            break;
          case "administrative_area_level_1":
            state = component.long_name;
            break;
          case "postal_code":
            pincode = component.long_name;
            break;
        }
      }

      setFormData((prev) => ({
        ...prev,
        streetAddress: street || addressParts[0].trim(),
        city: city || (addressParts.length > 2 ? addressParts[addressParts.length - 3].trim() : prev.city),
        state: state || (addressParts.length > 1 ? addressParts[addressParts.length - 2].trim().split(" ")[0] : prev.state),
        pincode: pincode || (addressParts.length > 1 ? addressParts[addressParts.length - 2].trim().split(" ").pop() || "" : prev.pincode),
      }));

      // Mark all auto-filled fields as touched and valid
      setTouched((prev) => ({ ...prev, streetAddress: true, city: true, state: true, pincode: true }));
      setErrors((prev) => ({ ...prev, streetAddress: null, city: null, state: null, pincode: null }));
    });
  }, []);

  // Initialize if script already loaded
  useEffect(() => {
    if (window.google && !autocompleteRef.current) {
      initAutocomplete();
    }
  }, [initAutocomplete]);

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) }));
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
      <GoogleMapStyle />
      
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={initAutocomplete}
        strategy="afterInteractive"
      />

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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="House / Flat No."
                    field="houseNumber"
                    placeholder="E.g. Flat 402, Building A"
                    value={formData.houseNumber}
                    error={errors.houseNumber}
                    touched={touched.houseNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormInput
                    label="Street / Area Name"
                    field="streetAddress"
                    inputRef={streetInputRef}
                    placeholder="Start typing area name..."
                    value={formData.streetAddress}
                    error={errors.streetAddress}
                    touched={touched.streetAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                
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
                  />
                </div>
                <p className="text-[10px] font-sans italic text-foreground/30">
                  Tip: Use the Google Maps dropdown on Street Name to auto-fill your details!
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
