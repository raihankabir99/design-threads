import { Link } from "react-router";
import { Package, Heart, MapPin, ArrowRight, Clock, Eye } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { useAuth } from "@/hooks/use-auth";
import { useWishlist } from "@/context/WishlistContext";
import { mockOrders, formatDate, statusLabels, statusColors } from "@/data/accountData";
import { formatPrice, products, designs } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function Account() {
  const { user, isAuthenticated } = useAuth();
  const { ids } = useWishlist();

  if (!isAuthenticated) {
    return (
      <AccountLayout>
        <div className="text-center py-20">
          <p className="text-sm text-muted-foreground mb-4">Sign in to access your account, orders, and wishlist.</p>
          <Link
            to="/auth?returnTo=/account"
            className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]"
          >
            Sign In
          </Link>
        </div>
      </AccountLayout>
    );
  }

  const recentOrder = mockOrders[0];
  const recentlyViewed = products.slice(0, 6);
  const recommended = designs.slice(2, 6);

  return (
    <AccountLayout>
      <div className="space-y-10">
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
            { label: "Addresses", value: "2", icon: MapPin, href: "/account/addresses" },
            { label: "Recent Order", value: recentOrder.number, icon: Package, href: `/account/orders/${recentOrder.id}`, mono: true },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.href}
                className="p-4 border border-border/50 rounded-sm hover:bg-surface/50 transition-colors group"
              >
                <Icon className="h-4 w-4 text-muted-foreground mb-2" />
                <p className={cn("font-medium", card.mono ? "text-xs font-mono" : "text-lg")}>{card.value}</p>
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
              <Link to="/account/orders" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {recentOrder.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="w-12 h-14 rounded-sm bg-surface overflow-hidden border-2 border-background">
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
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {recentOrder.items.map((item) => `${item.designName} ${item.title}`).join(", ")}
                </p>
              </div>
              <span className="text-sm font-medium text-price shrink-0">{formatPrice(recentOrder.total)}</span>
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
        <div>
          <h2 className="text-sm font-medium mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Track an Order", href: "/track-order", icon: Clock, color: "text-blue-500" },
              { label: "View Wishlist", href: "/wishlist", icon: Heart, color: "text-red-400" },
              { label: "Manage Addresses", href: "/account/addresses", icon: MapPin, color: "text-green-500" },
              { label: "Edit Profile", href: "/account/profile", icon: Eye, color: "text-purple-400" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.href}
                  className="p-4 border border-border/50 rounded-sm hover:bg-surface/50 transition-colors group flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-surface flex items-center justify-center shrink-0">
                    <Icon className={cn("h-4 w-4", action.color)} />
                  </div>
                  <div>
                    <p className="text-xs font-medium group-hover:text-gold transition-colors">{action.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recently Viewed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Recently Viewed</h2>
            <Link to="/shop" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {recentlyViewed.map((product) => (
              <Link
                key={product.id}
                to={`/designs/${product.slug.split("-")[0]}`}
                className="group"
              >
                <div className="aspect-[3/4] rounded-sm bg-surface overflow-hidden mb-2">
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <p className="text-[11px] font-medium group-hover:text-gold transition-colors truncate">{product.title}</p>
                <p className="text-[10px] text-muted-foreground">{formatPrice(product.price)}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended for You */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium">Recommended for You</h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">Based on your shopping history</p>
            </div>
            <Link to="/designs" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {recommended.map((design) => (
              <Link
                key={design.id}
                to={`/designs/${design.slug}`}
                className="group"
              >
                <div className="aspect-[3/4] rounded-sm bg-surface overflow-hidden mb-2">
                  <img src={design.heroImage} alt={design.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <p className="text-[11px] font-medium group-hover:text-gold transition-colors">{design.name}</p>
                <p className="text-[10px] text-muted-foreground">{design.products.length} products</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
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
