import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Lock, ChevronDown, ChevronRight, CreditCard, Check, Shield, Truck, RotateCcw } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/mock";
import { FormField, inputClass, selectClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

const steps = ["Information", "Shipping", "Payment", "Review"];

const countries = [
  "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Sweden", "Denmark",
  "Austria", "Portugal", "Poland", "United Kingdom", "Switzerland", "Norway",
  "United States", "Canada", "Saudi Arabia", "UAE", "Japan", "Australia", "Bangladesh",
];

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneShip: string;
  deliveryMethod: "standard" | "express";
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
  savePayment: boolean;
  billingSame: boolean;
  termsAccepted: boolean;
}

const initial: FormData = {
  email: "", phone: "", firstName: "", lastName: "", address: "", apartment: "",
  city: "", state: "", postalCode: "", country: "Germany", phoneShip: "",
  deliveryMethod: "standard", cardNumber: "", cardExpiry: "", cardCvc: "", cardName: "",
  savePayment: false, billingSame: true, termsAccepted: false,
};

export default function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const shippingCost = form.deliveryMethod === "express" ? 12.99 : (totalPrice >= 50 ? 0 : 4.99);
  const discount = 0;
  const total = totalPrice + shippingCost;

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.email) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email";
    }
    if (s === 1) {
      if (!form.firstName) e.firstName = "First name is required";
      if (!form.lastName) e.lastName = "Last name is required";
      if (!form.address) e.address = "Address is required";
      if (!form.city) e.city = "City is required";
      if (!form.postalCode) e.postalCode = "Postal code is required";
      if (!form.country) e.country = "Country is required";
    }
    if (s === 2) {
      if (!form.cardNumber) e.cardNumber = "Card number is required";
      if (!form.cardExpiry) e.cardExpiry = "Expiry date is required";
      if (!form.cardCvc) e.cardCvc = "CVC is required";
      if (!form.cardName) e.cardName = "Cardholder name is required";
    }
    if (s === 3) {
      if (!form.termsAccepted) e.termsAccepted = "Please accept the terms to continue";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < 3) setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handlePlaceOrder = () => {
    if (!validateStep(3)) return;
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation", {
        state: {
          orderId: "FY-" + Math.floor(10000 + Math.random() * 90000),
          email: form.email,
          items: items,
          shippingAddress: { firstName: form.firstName, lastName: form.lastName, address: form.address, apartment: form.apartment, city: form.city, state: form.state, postalCode: form.postalCode, country: form.country },
          deliveryMethod: form.deliveryMethod,
          subtotal: totalPrice,
          shippingCost,
          total,
        },
      });
    }, 2000);
  };

  if (items.length === 0 && !placing) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="h-7 w-7 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/designs" className="text-sm font-medium text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
              Browse Designs →
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const OrderSummaryContent = () => (
    <div className="space-y-3">
      <div className="space-y-3 mb-4 max-h-[240px] overflow-y-auto">
        {items.map((item) => (
          <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3">
            <div className="w-14 h-16 rounded-sm bg-surface overflow-hidden shrink-0 relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-muted-foreground text-background text-[9px] font-medium rounded-full flex items-center justify-center">{item.quantity}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.designName}</p>
              <p className="text-xs font-medium truncate">{item.title}</p>
              <p className="text-[10px] text-muted-foreground">{item.color}{item.size ? ` · ${item.size}` : ""}</p>
            </div>
            <span className="text-xs font-medium text-price shrink-0">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border/50 pt-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Shipping</span>
          <span className={cn(shippingCost === 0 && "text-green-500")}>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Tax / VAT</span>
          <span className="text-muted-foreground text-[11px]">Calculated at next step</span>
        </div>
        <div className="flex justify-between text-sm font-medium pt-2 border-t border-border/50">
          <span>Total</span>
          <span className="text-price">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Trust */}
      <div className="pt-3 border-t border-border/50 grid grid-cols-3 gap-2">
        {[
          { icon: Shield, label: "Secure" },
          { icon: Truck, label: "Tracked" },
          { icon: RotateCcw, label: "Returns" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="text-center">
            <Icon className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-0.5" />
            <p className="text-[9px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <SiteLayout>
      {/* Simplified header */}
      <div className="border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-medium tracking-tight">FAYANITY</Link>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" /> Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Progress */}
        <div className="flex items-center gap-0 mb-8 lg:mb-12 overflow-x-auto scrollbar-none">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center shrink-0">
              <button
                onClick={() => i < step ? setStep(i) : undefined}
                className={cn(
                  "flex items-center gap-2 text-xs transition-colors min-h-[44px]",
                  i === step ? "text-foreground font-medium" : i < step ? "text-gold cursor-pointer" : "text-muted-foreground"
                )}
              >
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border shrink-0",
                  i < step ? "bg-gold text-background border-gold" : i === step ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground"
                )}>
                  {i < step ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={cn("w-6 sm:w-10 h-px mx-1", i < step ? "bg-gold" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Form area */}
          <div>
            {/* Step 0: Information */}
            {step === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="font-display text-lg font-medium">Contact Information</h2>
                <FormField label="Email" htmlFor="email" required error={errors.email}>
                  <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@example.com" className={inputClass} />
                </FormField>
                <FormField label="Phone (optional)" htmlFor="phone">
                  <input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+49 ..." className={inputClass} />
                </FormField>
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer min-h-[44px]">
                  <input type="checkbox" checked={true} readOnly className="w-4 h-4 rounded border-border bg-surface accent-foreground" />
                  Email me order updates
                </label>
                <div className="flex justify-end pt-2">
                  <button onClick={nextStep} className="px-8 h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]">
                    Continue to Shipping
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="font-display text-lg font-medium">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="First Name" htmlFor="firstName" required error={errors.firstName}>
                    <input id="firstName" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass} />
                  </FormField>
                  <FormField label="Last Name" htmlFor="lastName" required error={errors.lastName}>
                    <input id="lastName" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass} />
                  </FormField>
                </div>
                <FormField label="Country" htmlFor="country" required error={errors.country}>
                  <select id="country" value={form.country} onChange={(e) => set("country", e.target.value)} className={selectClass}>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Address" htmlFor="address" required error={errors.address}>
                  <input id="address" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street address" className={inputClass} />
                </FormField>
                <FormField label="Apartment / Suite (optional)" htmlFor="apartment">
                  <input id="apartment" value={form.apartment} onChange={(e) => set("apartment", e.target.value)} className={inputClass} />
                </FormField>
                <div className="grid grid-cols-3 gap-3">
                  <FormField label="City" htmlFor="city" required error={errors.city}>
                    <input id="city" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass} />
                  </FormField>
                  <FormField label="State / Region" htmlFor="state">
                    <input id="state" value={form.state} onChange={(e) => set("state", e.target.value)} className={inputClass} />
                  </FormField>
                  <FormField label="Postal Code" htmlFor="postalCode" required error={errors.postalCode}>
                    <input id="postalCode" value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)} className={inputClass} />
                  </FormField>
                </div>
                <FormField label="Phone (optional)" htmlFor="phoneShip">
                  <input id="phoneShip" type="tel" value={form.phoneShip} onChange={(e) => set("phoneShip", e.target.value)} placeholder="+49 ..." className={inputClass} />
                </FormField>

                {/* Delivery Method */}
                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-sm font-medium mb-3">Delivery Method</h3>
                  <div className="space-y-2">
                    <label className={cn("flex items-center gap-3 p-3 rounded-sm border cursor-pointer transition-all", form.deliveryMethod === "standard" ? "border-foreground bg-surface/30" : "border-border hover:border-foreground/30")}>
                      <input type="radio" name="delivery" checked={form.deliveryMethod === "standard"} onChange={() => set("deliveryMethod", "standard")} className="sr-only" />
                      <span className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0", form.deliveryMethod === "standard" ? "border-foreground" : "border-border")}>
                        {form.deliveryMethod === "standard" && <span className="w-2 h-2 rounded-full bg-foreground" />}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Standard Delivery</p>
                        <p className="text-[11px] text-muted-foreground">5–8 business days · {totalPrice >= 50 ? "Free" : "€4.99"}</p>
                      </div>
                    </label>
                    <label className={cn("flex items-center gap-3 p-3 rounded-sm border cursor-pointer transition-all", form.deliveryMethod === "express" ? "border-foreground bg-surface/30" : "border-border hover:border-foreground/30")}>
                      <input type="radio" name="delivery" checked={form.deliveryMethod === "express"} onChange={() => set("deliveryMethod", "express")} className="sr-only" />
                      <span className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0", form.deliveryMethod === "express" ? "border-foreground" : "border-border")}>
                        {form.deliveryMethod === "express" && <span className="w-2 h-2 rounded-full bg-foreground" />}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Express Delivery</p>
                        <p className="text-[11px] text-muted-foreground">2–3 business days · €12.99</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button onClick={prevStep} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                  <button onClick={nextStep} className="px-8 h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]">
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="font-display text-lg font-medium">Payment</h2>

                {/* Payment methods */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {["Card", "Apple Pay", "Google Pay", "PayPal"].map((m, i) => (
                    <button key={m} className={cn("py-3 text-[11px] font-medium border rounded-sm transition-all text-center min-h-[44px]", i === 0 ? "border-foreground bg-surface/30" : "border-border text-muted-foreground hover:border-foreground/30")}>
                      {m}
                    </button>
                  ))}
                </div>

                <FormField label="Card Number" htmlFor="cardNumber" required error={errors.cardNumber}>
                  <div className="relative">
                    <input id="cardNumber" value={form.cardNumber} onChange={(e) => set("cardNumber", e.target.value)} placeholder="1234 5678 9012 3456" className={cn(inputClass, "pr-10")} maxLength={19} />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                  </div>
                </FormField>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Expiry Date" htmlFor="cardExpiry" required error={errors.cardExpiry}>
                    <input id="cardExpiry" value={form.cardExpiry} onChange={(e) => set("cardExpiry", e.target.value)} placeholder="MM / YY" className={inputClass} maxLength={7} />
                  </FormField>
                  <FormField label="CVC" htmlFor="cardCvc" required error={errors.cardCvc}>
                    <input id="cardCvc" value={form.cardCvc} onChange={(e) => set("cardCvc", e.target.value)} placeholder="123" className={inputClass} maxLength={4} />
                  </FormField>
                </div>
                <FormField label="Cardholder Name" htmlFor="cardName" required error={errors.cardName}>
                  <input id="cardName" value={form.cardName} onChange={(e) => set("cardName", e.target.value)} className={inputClass} />
                </FormField>

                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer min-h-[44px]">
                  <input type="checkbox" checked={form.savePayment} onChange={(e) => set("savePayment", e.target.checked)} className="w-4 h-4 rounded border-border bg-surface accent-foreground" />
                  Save payment method for next time
                </label>

                <div className="p-3 bg-surface/50 rounded-sm">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    <Lock className="h-3 w-3 inline mr-1" />
                    Your payment information is handled securely. We do not store your card details.
                  </p>
                </div>

                {/* Billing address */}
                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-sm font-medium mb-3">Billing Address</h3>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer min-h-[44px]">
                    <input type="checkbox" checked={form.billingSame} onChange={(e) => set("billingSame", e.target.checked)} className="w-4 h-4 rounded border-border bg-surface accent-foreground" />
                    Same as shipping address
                  </label>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button onClick={prevStep} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                  <button onClick={nextStep} className="px-8 h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="font-display text-lg font-medium">Review Your Order</h2>

                {/* Contact */}
                <div className="p-4 border border-border/50 rounded-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Contact</p>
                    <button onClick={() => setStep(0)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">Edit</button>
                  </div>
                  <p className="text-sm">{form.email}</p>
                </div>

                {/* Shipping */}
                <div className="p-4 border border-border/50 rounded-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Shipping Address</p>
                    <button onClick={() => setStep(1)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">Edit</button>
                  </div>
                  <p className="text-sm">{form.firstName} {form.lastName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{form.address}{form.apartment ? `, ${form.apartment}` : ""}</p>
                  <p className="text-xs text-muted-foreground">{form.city}{form.state ? `, ${form.state}` : ""} {form.postalCode}</p>
                  <p className="text-xs text-muted-foreground">{form.country}</p>
                </div>

                {/* Delivery */}
                <div className="p-4 border border-border/50 rounded-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Delivery</p>
                    <button onClick={() => setStep(1)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">Edit</button>
                  </div>
                  <p className="text-sm">{form.deliveryMethod === "standard" ? "Standard Delivery" : "Express Delivery"}</p>
                  <p className="text-xs text-muted-foreground">{form.deliveryMethod === "standard" ? "5–8 business days" : "2–3 business days"}</p>
                </div>

                {/* Payment */}
                <div className="p-4 border border-border/50 rounded-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Payment</p>
                    <button onClick={() => setStep(2)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">Edit</button>
                  </div>
                  <p className="text-sm">Card ending in {form.cardNumber.slice(-4) || "••••"}</p>
                </div>

                {/* Terms */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={form.termsAccepted}
                      onChange={(e) => set("termsAccepted", e.target.checked)}
                      className="w-4 h-4 rounded border-border bg-surface accent-foreground mt-0.5 shrink-0"
                    />
                    <span>
                      I agree to the <Link to="/terms" className="text-foreground hover:underline">Terms & Conditions</Link> and acknowledge the <Link to="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>.
                    </span>
                  </label>
                  {errors.termsAccepted && <p className="text-[11px] text-red-500 mt-1.5" role="alert">{errors.termsAccepted}</p>}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button onClick={prevStep} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className={cn(
                      "px-8 h-11 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all min-h-[44px]",
                      placing
                        ? "bg-muted text-muted-foreground cursor-wait"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    )}
                  >
                    {placing ? "Processing Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Order Summary (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 border border-border/50 rounded-sm p-5">
              <h2 className="text-sm font-medium mb-4">Your Order</h2>
              <OrderSummaryContent />
            </div>
          </div>
        </div>

        {/* Mobile collapsible order summary */}
        <div className="lg:hidden mt-6 border border-border/50 rounded-sm overflow-hidden">
          <button
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium min-h-[44px]"
          >
            <span className="flex items-center gap-2">
              Order Summary
              <span className="text-[11px] text-muted-foreground">({totalItems} {totalItems === 1 ? "item" : "items"})</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-price">{formatPrice(total)}</span>
              <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", mobileSummaryOpen && "rotate-180")} />
            </div>
          </button>
          <div className={cn("transition-all duration-300 overflow-hidden", mobileSummaryOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
            <div className="px-4 pb-4 border-t border-border/50 pt-3">
              <OrderSummaryContent />
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border/60 px-4 py-3 safe-area-pb">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-price shrink-0">{formatPrice(total)}</span>
            {step === 3 ? (
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className={cn(
                  "flex-1 h-11 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all min-h-[44px]",
                  placing ? "bg-muted text-muted-foreground cursor-wait" : "bg-foreground text-background hover:bg-foreground/90"
                )}
              >
                {placing ? "Processing..." : "Place Order"}
              </button>
            ) : (
              <button onClick={nextStep} className="flex-1 h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]">
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
