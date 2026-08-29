import { Link } from "react-router";
import { Package, Heart, MapPin, ArrowRight, Clock, Truck, Check } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { useAuth } from "@/hooks/use-auth";
import { useWishlist } from "@/context/WishlistContext";
import { mockOrders, mockAddresses, formatDate, statusLabels, statusColors } from "@/data/accountData";
import { formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function AccountOverview() {
  const { user } = useAuth();
  const { ids } = useWishlist();
  const recentOrder = mockOrders[0];

  return (
    <AccountLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-gold mb-2">Welcome back</p>
          <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">
            {user?.name || "Alex"}
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {[
            { label: "Orders", value: mockOrders.length.toString(), icon: Package, href: "/account/orders" },
            { label: "Wishlist", value: ids.length.toString(), icon: Heart, href: "/wishlist" },
            { label: "Addresses", value: mockAddresses.length.toString(), icon: MapPin, href: "/account/addresses" },
            { label: "Recent Order", value: recentOrder.number, icon: Clock, href: `/account/orders/${recentOrder.id}`, sub: true },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.href}
                className="p-4 border border-border/50 rounded-sm hover:bg-surface/50 transition-colors group"
              >
                <Icon className="h-4 w-4 text-muted-foreground mb-2" />
                <p className={cn("font-medium", card.sub ? "text-xs font-mono" : "text-lg")}>{card.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{card.label}</p>
              </Link>
            );
          })}
        </div>

        {/* Recent Order */}
        {recentOrder && (
          <div className="border border-border/50 rounded-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium">Recent Order</h2>
              <Link to={`/account/orders/${recentOrder.id}`} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex -space-x-2">
                {recentOrder.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="w-12 h-14 rounded-sm bg-surface overflow-hidden border-2 border-background relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono">{recentOrder.number}</span>
                  <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-sm", statusColors[recentOrder.status])}>
                    {statusLabels[recentOrder.status]}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{formatDate(recentOrder.date)}</p>
              </div>
              <span className="text-sm font-medium text-price shrink-0">{formatPrice(recentOrder.total)}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {recentOrder.items.map((item, i) => (
                <span key={i} className="truncate">
                  {item.designName} {item.title}{item.size ? ` (${item.size})` : ""}{i < recentOrder.items.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <Link
                to={`/account/orders/${recentOrder.id}`}
                className="px-4 py-2 text-[11px] font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[36px] flex items-center"
              >
                View Order
              </Link>
              <Link
                to="/track-order"
                className="px-4 py-2 text-[11px] font-medium bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors min-h-[36px] flex items-center"
              >
                Track Order
              </Link>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/designs" className="p-5 border border-border/50 rounded-sm hover:bg-surface/50 transition-colors group">
            <p className="text-[11px] uppercase tracking-[0.15em] text-gold mb-1">Discover</p>
            <h3 className="font-display text-base font-medium mb-1 group-hover:text-gold transition-colors">Explore Designs</h3>
            <p className="text-xs text-muted-foreground">Find your next favorite piece.</p>
          </Link>
          <Link to="/account/addresses" className="p-5 border border-border/50 rounded-sm hover:bg-surface/50 transition-colors group">
            <p className="text-[11px] uppercase tracking-[0.15em] text-gold mb-1">Manage</p>
            <h3 className="font-display text-base font-medium mb-1 group-hover:text-gold transition-colors">Your Addresses</h3>
            <p className="text-xs text-muted-foreground">Update your shipping details.</p>
          </Link>
        </div>
      </div>
    </AccountLayout>
  );
}
