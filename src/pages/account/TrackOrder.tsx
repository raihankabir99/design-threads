import { useState } from "react";
import { Link } from "react-router";
import { Search, Package, Truck, MapPin, Check, ChevronRight } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { mockOrders, formatDate, statusLabels, statusColors } from "@/data/accountData";
import { formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";

const timelineSteps = [
  { key: "placed", label: "Order Placed", icon: Check },
  { key: "confirmed", label: "Payment Confirmed", icon: Check },
  { key: "production", label: "In Production", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: MapPin },
];

function getTimelineIdx(status: string) {
  const map: Record<string, number> = { processing: 1, "in-production": 2, shipped: 3, delivered: 4 };
  return map[status] ?? 0;
}

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [found, setFound] = useState(false);
  const [error, setError] = useState("");
  const [searchedOrder, setSearchedOrder] = useState(mockOrders[0]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter an order number.");
      return;
    }
    const match = mockOrders.find((o) => o.number.toLowerCase() === orderNumber.trim().toLowerCase());
    if (match) {
      setSearchedOrder(match);
      setFound(true);
      setError("");
    } else {
      // For demo, show the first order
      setSearchedOrder(mockOrders[0]);
      setFound(true);
      setError("");
    }
  };

  const idx = getTimelineIdx(searchedOrder.status);

  return (
    <AccountLayout>
      <div className="space-y-6">
        <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">Track Your Order</h1>
        <p className="text-sm text-muted-foreground">Enter your order number and email to view your order status.</p>

        {!found ? (
          <form onSubmit={handleTrack} className="max-w-md space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground block mb-1.5">
                Order Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => { setOrderNumber(e.target.value); setError(""); }}
                placeholder="FY-2026-00124"
                className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors"
              />
              {error && <p className="text-[11px] text-red-500 mt-1" role="alert">{error}</p>}
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Search className="h-4 w-4" /> Track Order
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setFound(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              ← Search another order
            </button>

            <div className="border border-border/50 rounded-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-mono">{searchedOrder.number}</span>
                  <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-sm ml-2", statusColors[searchedOrder.status])}>
                    {statusLabels[searchedOrder.status]}
                  </span>
                </div>
                <span className="text-sm font-medium text-price">{formatPrice(searchedOrder.total)}</span>
              </div>

              {/* Timeline */}
              <div className="relative py-4">
                <div className="absolute top-6 left-[10%] right-[10%] h-px bg-border" />
                <div
                  className="absolute top-6 left-[10%] h-px bg-foreground transition-all duration-500"
                  style={{ width: `${(idx / (timelineSteps.length - 1)) * 80}%` }}
                />
                <div className="relative flex items-start justify-between">
                  {timelineSteps.map((step, i) => {
                    const Icon = step.icon;
                    const isDone = i <= idx;
                    const isCurrent = i === idx;
                    return (
                      <div key={step.key} className="flex flex-col items-center flex-1">
                        <div className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center border-2 mb-1.5 relative z-10 transition-colors",
                          isDone ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border",
                          isCurrent && "ring-2 ring-foreground/20"
                        )}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <p className={cn("text-[9px] text-center leading-tight max-w-[56px]", isDone ? "text-foreground font-medium" : "text-muted-foreground")}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {searchedOrder.trackingNumber && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-[11px] text-muted-foreground">
                    Tracking: <span className="font-mono text-foreground">{searchedOrder.trackingNumber}</span>
                  </p>
                </div>
              )}

              {!searchedOrder.trackingNumber && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-[11px] text-muted-foreground">Tracking number: Available after shipment</p>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="border border-border/50 rounded-sm p-5">
              <h2 className="text-sm font-medium mb-3">Items</h2>
              <div className="space-y-3">
                {searchedOrder.items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-12 h-14 rounded-sm bg-surface overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.designName}</p>
                      <p className="text-xs font-medium">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.color}{item.size ? ` · ${item.size}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                Need help? Contact Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
