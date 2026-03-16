"use client";

import { useState, useCallback, useEffect } from "react";
import Script from "next/script";

// Add declaration for Razorpay global
declare global {
  interface Window {
    Razorpay: any;
  }
}
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
  confirmEmail: (v) => (v.trim() ? null : "Required"),
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

type FormField = "name" | "email" | "confirmEmail" | "phone" | "houseNumber" | "streetAddress" | "city" | "state" | "pincode";

// ─── Sub-Components ───────────────────────────────────────────────────────────

function ProcessingOverlay({ status }: { status: string }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-t-2 border-neutral-900 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-b-2 border-neutral-200 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
      </div>
      <h2 className="font-serif text-2xl tracking-tighter mb-2">{status}</h2>
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Please do not refresh or close this window</p>
    </div>
  );
}

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
                ? "border-red-500 bg-red-50/10 focus:outline-none outline-none"
                : "border-neutral-200 focus:border-neutral-900 focus:outline-none outline-none"
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

  const [processingStatus, setProcessingStatus] = useState<string>("");

  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "cancelled" | "failed">("idle");

  const [formData, setFormData] = useState<Record<FormField, string>>({
    name: "", email: "", confirmEmail: "", phone: "", houseNumber: "", streetAddress: "", city: "", state: "", pincode: "",
  });

  const [isFormLoaded, setIsFormLoaded] = useState(false);

  // Load persisted data on mount
  useEffect(() => {
    const saved = localStorage.getItem("cwa_checkout_form");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    setIsFormLoaded(true);
  }, []);

  // Save data on change - only after initial load is complete
  useEffect(() => {
    if (isFormLoaded) {
      localStorage.setItem("cwa_checkout_form", JSON.stringify(formData));
    }
  }, [formData, isFormLoaded]);

  const [errors, setErrors] = useState<Record<FormField, string | null>>({
    name: null, email: null, confirmEmail: null, phone: null, houseNumber: null, streetAddress: null, city: null, state: null, pincode: null,
  });

  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    name: false, email: false, confirmEmail: false, phone: false, houseNumber: false, streetAddress: false, city: false, state: false, pincode: false,
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
    let error = validators[field](formData[field]);
    
    // Custom cross-field validation for confirmEmail
    if (field === "confirmEmail" && !error && formData.confirmEmail.trim() !== formData.email.trim()) {
      error = "Emails do not match";
    }
    
    setErrors((prev) => ({ ...prev, [field]: error }));
    if (field === "streetAddress") {
      setTimeout(() => setShowSuggestions(false), 200);
    }
  };

  const handleSelectSuggestion = (suggestion: PhotonSuggestion) => {
    const p = suggestion.properties;
    // Combine name, street, and district for a full street/area description
    // District often contains important locality info in India (like Sector numbers)
    const addressParts = [p.name, p.street, p.district].filter(Boolean);
    // Remove duplicates (sometimes name or street might repeat district info)
    const uniqueParts = addressParts.filter((item, index) => addressParts.indexOf(item) === index);
    const street = uniqueParts.join(", ");
    
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
      confirmEmail: formData.confirmEmail.trim() !== formData.email.trim() ? "Emails do not match" : null,
      phone: validators.phone(formData.phone),
      houseNumber: validators.houseNumber(formData.houseNumber),
      streetAddress: validators.streetAddress(formData.streetAddress),
      city: validators.city(formData.city),
      state: validators.state(formData.state),
      pincode: validators.pincode(formData.pincode),
    };
    setTouched({ name: true, email: true, confirmEmail: true, phone: true, houseNumber: true, streetAddress: true, city: true, state: true, pincode: true });
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setPaymentStatus("idle");

    if (!validateAll()) return;
    
    setIsSubmitting(true);
    setPaymentStatus("processing");
    setProcessingStatus("Preparing secure checkout...");

    try {
      const fullAddress = `${formData.houseNumber}, ${formData.streetAddress}`;
      const customerData = { ...formData, address: fullAddress };

      // 1. Create Razorpay Order
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });

      if (!orderRes.ok) {
        throw new Error("We couldn't initialize the payment. Please try again or check your connection.");
      }
      
      const { orderId, amount, currency } = await orderRes.json();
      setProcessingStatus("Connecting to payment server...");

      if (!window.Razorpay) {
        throw new Error("Secure payment system failed to load. Please refresh the page and try again.");
      }

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "CraftswomanAlley",
        description: `Order ID: ${orderId}`,
        order_id: orderId,
        handler: async (response: any) => {
          setProcessingStatus("Verifying transaction details...");
          // 3. Verify Payment
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer: customerData,
                items: cart,
                total: cartTotal,
              }),
            });

            if (verifyRes.ok) {
              const data = await verifyRes.json();
              setProcessingStatus("Order finalized. Redirecting...");
              localStorage.removeItem("cwa_checkout_form");
              clearCart();
              router.push(`/order-success?orderId=${data.orderId}&delivery=${encodeURIComponent(data.estimatedDelivery)}&paymentId=${data.paymentId}`);
            } else {
              router.push(`/order-failed?type=verify&reason=${encodeURIComponent("Payment verification mismatch. Our team will contact you if money was deducted.")}`);
            }
          } catch (err) {
            router.push(`/order-failed?type=error&reason=${encodeURIComponent("Network lost during verification. Please check your email for confirmation before retrying.")}`);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: `+91${formData.phone}`,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            setProcessingStatus("");
            setIsSubmitting(false);
            setPaymentStatus("cancelled");
            router.push(`/order-failed?type=cancel&reason=${encodeURIComponent("Payment was cancelled by the user.")}`);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setProcessingStatus("");
        setIsSubmitting(false);
        router.push(`/order-failed?type=failure&reason=${encodeURIComponent(response.error.description)}`);
      });
      rzp.open();

    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      setPaymentStatus("failed");
      setIsSubmitting(false);
      setProcessingStatus("");
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
      {isSubmitting && processingStatus && <ProcessingOverlay status={processingStatus} />}

      <main className="max-w-[1000px] mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 space-y-8">
            <header>
              <h1 className="font-serif text-3xl text-neutral-900 tracking-tight">Checkout</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Payment Status Alerts (Amazon Style) */}
              {(submitError || paymentStatus === "cancelled" || paymentStatus === "failed") && (
                <div className={`p-4 rounded-md border flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
                  paymentStatus === "cancelled" 
                    ? "bg-amber-50 border-amber-100 text-amber-800" 
                    : "bg-red-50 border-red-100 text-red-800"
                }`}>
                  <div className="shrink-0 mt-0.5">
                    {paymentStatus === "cancelled" ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z"/></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-tight">
                      {paymentStatus === "cancelled" ? "Payment Cancelled" : "Payment Action Required"}
                    </p>
                    <p className="text-[12px] opacity-90 leading-snug">
                      {submitError}
                    </p>
                  </div>
                </div>
              )}

              {/* Profile */}
              <div className="space-y-5">
                <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-neutral-400">Personal Information</p>
                <div className="space-y-4">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Email Address"
                      field="email"
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      error={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormInput
                      label="Confirm Email"
                      field="confirmEmail"
                      type="email"
                      placeholder="Repeat email address"
                      value={formData.confirmEmail}
                      error={errors.confirmEmail}
                      touched={touched.confirmEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
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
                              className="w-full px-3 py-2.5 text-left hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none outline-none transition-colors border-b border-neutral-50 last:border-0"
                            >
                              <p className="text-[13px] font-medium text-neutral-800 line-clamp-1">
                                {[s.properties.name, s.properties.street, s.properties.district].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(", ")}
                              </p>
                              <p className="text-[9px] text-neutral-400 uppercase tracking-wide">
                                {[s.properties.city, s.properties.state].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(" • ")}
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



              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-md py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3
                  ${paymentStatus === "processing" ? "bg-accent/10 text-accent border border-accent/20" : "bg-neutral-900 text-white hover:bg-neutral-800"}
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {paymentStatus === "processing" ? "Waiting for Razorpay..." : "Processing..."}
                  </>
                ) : (
                  paymentStatus === "failed" ? "Retry Payment" : "Complete Order"
                )}
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
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f0f0f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}
