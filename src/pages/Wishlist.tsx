import { Link } from "react-router";
import { Heart } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DesignCard } from "@/components/brand/DesignCard";
import { useWishlist } from "@/context/WishlistContext";
import { designs } from "@/data/mock";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishlistDesigns = designs.filter((d) => ids.includes(d.id));

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <p className="text-label text-gold mb-3">Saved</p>
          <h1 className="text-display text-3xl lg:text-4xl">Wishlist</h1>
        </div>

        {wishlistDesigns.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {wishlistDesigns.map((d) => (
              <DesignCard key={d.id} design={d} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-sm font-medium mb-2">Your wishlist is empty</p>
            <p className="text-xs text-muted-foreground mb-6">Save designs you love and come back to them anytime.</p>
            <Link
              to="/designs"
              className="text-sm font-medium text-gold hover:text-gold-light transition-colors"
            >
              Browse Designs →
            </Link>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
