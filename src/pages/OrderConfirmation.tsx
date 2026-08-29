import { Link, useLocation } from "react-router";
import { Check, Package, Truck, MapPin, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { designs, formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/data/types";

interface ConfirmationState {
  orderId?: string;
  email?: string;
  items?: CartItem[];
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  deliveryMethod?: "standard" | "express";
  subtotal?: number;
  shippingCost?: number;
  total?: number;
}

const statusSteps = [
  { label: "Order Confirmed", icon: Check, done: true },
  { label: "Processing", icon: Package, done: false },
  { label: "In Production", icon: Package, done: false },
  { label: "Shipped", icon: Truck, done: false },
  { label: "Delivered", icon: MapPin, done: false },
];

export default function OrderConfirmation() {
  const location = useLocation();
  const state = (location.state || {}) as ConfirmationState;
  const orderId = state.orderId || "FY-" + Math.floor(10000 + Math.random() * 90000);
  const email = state.email || "customer@example.com";
  const orderItems = state.items || [];
  const address = state.shippingAddress;
  const deliveryMethod = state.deliveryMethod || "standard";
  const subtotal = state.subtotal || orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingCost = state.shippingCost ?? 0;
  const total = state.total || subtotal + shippingCost;

  const recommended = designs.slice(0, 4);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          {/* Success icon */}
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <Check className="h-7 w-7 text-green-500" />
          </div>

          <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">Order Confirmed</h1>
          <p className="text-sm text-muted-foreground mb-4">Thank you for your order.</p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-sm">
            <span className="text-xs text-muted-foreground">Order</span>
            <span className="text-sm font-medium font-mono">{orderId}</span>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            A confirmation will be sent to <span className="text-foreground">{email}</span>
          </p>
        </div>

        {/* Order Status Timeline */}
        <div className="max-w-xl mx-auto mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-6 text-center">Order Status</h2>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-[10%] right-[10%] h-px bg-border" />
            <div className="absolute top-4 left-[10%] h-px bg-foreground w-0 transition-all duration-500" />

            <div className="relative flex items-start justify-between">
              {statusSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex flex-col items-center flex-1">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 relative z-10 transition-colors",
                      s.done ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border"
                    )}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <p className={cn("text-[10px] text-center leading-tight max-w-[60px]", s.done ? "text-foreground font-medium" : "text-muted-foreground")}>
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          {/* Order Details */}
          {orderItems.length > 0 && (
            <div className="border border-border/50 rounded-sm p-5">
              <h2 className="text-sm font-medium mb-4">Order Details</h2>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={`${item.productId}-${item.color}-${item.size}`} className="flex items-start gap-3 p-3 bg-surface/30 rounded-sm">
                    <div className="w-12 h-14 rounded-sm bg-surface overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.designName}</p>
                      <p className="text-xs font-medium">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.color}{item.size ? ` · ${item.size}` : ""} · Qty {item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium text-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 mt-4 pt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={cn(shippingCost === 0 && "text-green-500")}>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t border-border/50">
                  <span>Total</span>
                  <span className="text-price">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Shipping & Delivery */}
          <div className="space-y-6">
            {address && (
              <div className="border border-border/50 rounded-sm p-5">
                <h2 className="text-sm font-medium mb-3">Shipping Address</h2>
                <p className="text-sm">{address.firstName} {address.lastName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{address.address}{address.apartment ? `, ${address.apartment}` : ""}</p>
                <p className="text-xs text-muted-foreground">{address.city}{address.state ? `, ${address.state}` : ""} {address.postalCode}</p>
                <p className="text-xs text-muted-foreground">{address.country}</p>
              </div>
            )}

            <div className="border border-border/50 rounded-sm p-5">
              <h2 className="text-sm font-medium mb-3">Delivery</h2>
              <p className="text-sm">{deliveryMethod === "standard" ? "Standard Delivery" : "Express Delivery"}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Estimated delivery: {deliveryMethod === "standard" ? "5–8 business days" : "2–3 business days"}
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link to="/designs" className="px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px] flex items-center gap-2">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/" className="px-6 py-3 border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-sm transition-colors min-h-[44px] flex items-center">
            Back to Home
          </Link>
        </div>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <div className="max-w-5xl mx-auto pt-12 border-t border-border/50">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2 text-center">Explore More</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {recommended.map((d) => (
                <Link key={d.id} to={`/designs/${d.slug}`} className="group block">
                  <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface mb-3">
                    <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-0.5">{d.products.length} products</p>
                  <h3 className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
