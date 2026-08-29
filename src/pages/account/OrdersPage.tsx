import { useState } from "react";
import { Link } from "react-router";
import { Package, ChevronRight, ArrowRight } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { mockOrders, formatDate, statusLabels, statusColors, type OrderStatus } from "@/data/accountData";
import { formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";

const statusFilters: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "In Production", value: "in-production" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const filtered = filter === "all" ? mockOrders : mockOrders.filter((o) => o.status === filter);

  return (
    <AccountLayout>
      <div className="space-y-6">
        <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">My Orders</h1>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "px-4 py-2 text-xs font-medium rounded-sm border transition-all whitespace-nowrap min-h-[36px]",
                filter === f.value
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-sm font-medium mb-1">No orders found</p>
            <p className="text-xs text-muted-foreground mb-6">No orders match the selected filter.</p>
            <Link to="/designs" className="text-xs font-medium text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <Link
                key={order.id}
                to={`/account/orders/${order.id}`}
                className="block border border-border/50 rounded-sm p-4 sm:p-5 hover:bg-surface/30 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Thumbnails */}
                  <div className="flex -space-x-2 shrink-0">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="w-12 h-14 rounded-sm bg-surface overflow-hidden border-2 border-background">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono">{order.number}</span>
                      <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-sm", statusColors[order.status])}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{formatDate(order.date)}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {order.items.map((item) => `${item.designName} ${item.title}`).join(", ")}
                    </p>
                  </div>

                  {/* Total + Arrow */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-price">{formatPrice(order.total)}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
