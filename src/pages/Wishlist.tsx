import { Link } from "react-router";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { DesignCard } from "@/components/brand/DesignCard";
import { useWishlist } from "@/context/WishlistContext";
import { designs } from "@/data/mock";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishlistDesigns = designs.filter((d) => ids.includes(d.id));

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {wishlistDesigns.length > 0
              ? `${wishlistDesigns.length} ${wishlistDesigns.length === 1 ? "design" : "designs"} saved`
              : "Save what inspires you."}
          </p>
        </div>

        {wishlistDesigns.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {wishlistDesigns.map((d) => (
              <div key={d.id} className="group">
                <DesignCard design={d} />
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    to={`/designs/${d.slug}`}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    Explore Design <ArrowRight className="h-3 w-3" />
                  </Link>
                  <span className="text-[10px] text-muted-foreground/50">·</span>
                  <span className="text-[10px] text-muted-foreground">
                    {d.products.length} products
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-5">
              <Heart className="h-7 w-7 text-muted-foreground/30" />
            </div>
            <h2 className="font-display text-lg font-medium mb-2">Save what inspires you</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
              Keep your favorite designs here and come back whenever you're ready.
            </p>
            <Link
              to="/designs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]"
            >
              Explore Designs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
