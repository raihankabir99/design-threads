import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Package, Scissors, Check, Truck, MapPin, Clock, Search } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { cn } from "@/lib/utils";

const timelineSteps = [
  { icon: Check, title: "Order Placed", desc: "Your order is confirmed and enters our queue." },
  { icon: Scissors, title: "Production", desc: "Your product is being individually created." },
  { icon: Check, title: "Quality Check", desc: "Every item is inspected before dispatch." },
  { icon: Package, title: "Packing", desc: "Carefully packaged in recyclable materials." },
  { icon: Truck, title: "Shipping", desc: "Dispatched with tracking to your address." },
  { icon: MapPin, title: "Delivery", desc: "Arrives at your door." },
];

const regions = [
  { region: "European Union", time: "5–10 business days", cost: "Free over €50", note: "All EU countries", defaultCost: "€4.99" },
  { region: "United Kingdom", time: "5–10 business days", cost: "Free over €75", note: "Import duties may apply", defaultCost: "€4.99" },
  { region: "Switzerland / Norway", time: "7–12 business days", cost: "Free over €100", note: "Import duties may apply", defaultCost: "€6.99" },
  { region: "USA / Canada", time: "7–14 business days", cost: "Free over €100", note: "Import duties may apply", defaultCost: "€6.99" },
  { region: "Middle East", time: "10–18 business days", cost: "Free over €120", note: "Select countries", defaultCost: "€8.99" },
  { region: "Rest of World", time: "10–21 business days", cost: "Free over €120", note: "50+ countries", defaultCost: "€9.99" },
];

export default function Shipping() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [trackingFound, setTrackingFound] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) setTrackingFound(true);
  };

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Shipping</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="bg-background border-b border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Information</p>
            <h1 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">Shipping & Delivery</h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">Everything you need to know about receiving your order.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto mb-16 lg:mb-24">
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8 text-center">How it works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {timelineSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-4 p-5 border border-border/50 rounded-sm">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-gold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping Regions */}
        <div className="max-w-4xl mx-auto mb-16 lg:mb-24">
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">Shipping by Region</h2>
          <div className="border border-border/50 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-surface">
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Region</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium hidden sm:table-cell">Delivery</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Shipping</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.region} className="border-b border-border/30 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{r.region}</p>
                      <p className="text-[11px] text-muted-foreground">{r.note}</p>
                      <p className="text-[11px] text-muted-foreground sm:hidden mt-0.5">{r.time}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{r.time}</td>
                    <td className="px-4 py-3">
                      <p className="text-muted-foreground">{r.defaultCost}</p>
                      <p className="text-[11px] text-green-500">{r.cost}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="max-w-2xl mx-auto mb-16 lg:mb-24">
          <div className="border border-border/50 rounded-sm p-6 lg:p-8">
            <h2 className="font-display text-xl font-medium tracking-tight mb-2 text-center">Track Your Order</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">Enter your order number and email to check your delivery status.</p>

            {!trackingFound ? (
              <form onSubmit={handleTrack} className="space-y-3 max-w-sm mx-auto">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Order number (e.g. FY-2026-00124)"
                  className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors"
                />
                <button type="submit" className="w-full h-10 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 min-h-[44px]">
                  <Search className="h-4 w-4" /> Track Order
                </button>
              </form>
            ) : (
              <div className="max-w-sm mx-auto">
                <div className="p-4 bg-surface/50 rounded-sm mb-4">
                  <p className="text-xs font-medium mb-1">Order {orderNumber || "FY-2026-00124"}</p>
                  <p className="text-[11px] text-muted-foreground">Status: In Production</p>
                </div>
                <div className="space-y-3">
                  {["Order Confirmed", "In Production", "Shipped", "In Transit", "Delivered"].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0", i <= 1 ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border")}>
                        {i <= 1 && <Check className="h-3 w-3" />}
                      </div>
                      <span className={cn("text-xs", i <= 1 ? "text-foreground font-medium" : "text-muted-foreground")}>{step}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setTrackingFound(false)} className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-4">
                  ← Track another order
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Important Notes */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl font-medium tracking-tight mb-6">Important Notes</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <div className="flex gap-3 p-4 bg-surface/30 rounded-sm">
              <Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <p>Production time (2–5 business days) is separate from shipping time. Total delivery = production + shipping.</p>
            </div>
            <div className="flex gap-3 p-4 bg-surface/30 rounded-sm">
              <Package className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <p>All orders include tracking. You'll receive a tracking number via email once dispatched.</p>
            </div>
            <div className="flex gap-3 p-4 bg-surface/30 rounded-sm">
              <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <p>International orders may be subject to customs duties and taxes, which are the responsibility of the customer.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
