import { Link, useLocation } from "react-router";
import { Check, Package, Truck, MapPin, CreditCard, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { designs } from "@/data/mock";
import { cn } from "@/lib/utils";

const statusSteps = [
  { label: "Order Confirmed", icon: Check, done: true },
  { label: "Processing", icon: Package, done: false },
  { label: "In Production", icon: Package, done: false },
  { label: "Shipped", icon: Truck, done: false },
  { label: "Delivered", icon: MapPin, done: false },
];

export default function OrderConfirmation() {
  const location = useLocation();
  const state = location.state as { orderId?: string; email?: string } | null;
  const orderId = state?.orderId || "FY-" + Math.floor(10000 + Math.random() * 90000);
  const email = state?.email || "customer@example.com";

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
          <h2 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-4 text-center">Order Status</h2>
          <div className="flex items-center justify-between">
            {statusSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center flex-1">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-1.5",
                    s.done ? "bg-foreground text-background border-foreground" : "bg-surface text-muted-foreground border-border"
                  )}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <p className={cn("text-[10px] text-center leading-tight", s.done ? "text-foreground font-medium" : "text-muted-foreground")}>
                    {s.label}
                  </p>
                  {i < statusSteps.length - 1 && (
                    <div className="absolute" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="relative -mt-[68px] ml-[10%] mr-[10%] h-0.5 bg-border">
            <div className="h-full bg-foreground w-0" />
          </div>
        </div>

        {/* Order Details */}
        <div className="max-w-xl mx-auto mb-12 border border-border/50 rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Order Details</h2>
            <span className="text-xs text-muted-foreground">{new Date().toLocaleDateString("en-EU", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3 p-3 bg-surface/30 rounded-sm">
              <div className="w-12 h-14 rounded-sm bg-surface overflow-hidden shrink-0">
                <img src={designs[0].heroImage} alt="Midnight Lion" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Midnight Lion</p>
                <p className="text-xs font-medium">Graphic T-Shirt</p>
                <p className="text-[10px] text-muted-foreground">Black · XL</p>
              </div>
              <span className="text-xs font-medium text-price">€34.99</span>
            </div>
          </div>

          <div className="border-t border-border/50 pt-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>€34.99</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-border/50">
              <span>Total</span>
              <span className="text-price">€34.99</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link to="/shop" className="px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px] flex items-center gap-2">
            Continue Shopping
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/" className="px-6 py-3 border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-sm transition-colors min-h-[44px] flex items-center">
            Back to Home
          </Link>
        </div>

        {/* Recommendations */}
        <div className="border-t border-border/50 pt-12 lg:pt-16">
          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">You May Also Like</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight">Explore More Designs</h2>
          </div>
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
      </div>
    </SiteLayout>
  );
}
