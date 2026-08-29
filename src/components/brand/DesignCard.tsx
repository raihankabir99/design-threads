import { Link } from "react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Design } from "@/data/types";
import { productTypeLabel } from "@/data/mock";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface DesignCardProps {
  design: Design;
}

const typeLabels: Record<string, string> = {
  "t-shirt": "Tee",
  "hoodie": "Hoodie",
  "sweatshirt": "Sweat",
  "tote-bag": "Tote",
  "mug": "Mug",
  "phone-case": "Phone",
  "cap": "Cap",
  "poster": "Poster",
  "sticker": "Sticker",
  "notebook": "Book",
  "cushion": "Cushion",
  "kids-t-shirt": "Kids",
  "baby-onesie": "Baby",
};

export function DesignCard({ design }: DesignCardProps) {
  const { toggle, has } = useWishlist();
  const isWishlisted = has(design.id);
  const featuredTypes = design.products.slice(0, 4);
  const extraCount = design.products.length - featuredTypes.length;

  return (
    <Link
      to={`/designs/${design.slug}`}
      className="group block relative"
    >
      {/* Image */}
      <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface mb-3 relative">
        <img
          src={design.heroImage}
          alt={design.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover CTA */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            Explore Design
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(design.id); }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm z-10",
            isWishlisted ? "bg-gold text-background" : "bg-black/30 text-white/70 hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-3.5 w-3.5", isWishlisted && "fill-current")} />
        </button>

        {/* New badge */}
        {design.isNew && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-gold text-background rounded-sm z-10">
            New
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="font-display text-base font-medium tracking-tight group-hover:text-gold transition-colors">
          {design.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
          {design.description}
        </p>

        {/* Product type pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          {featuredTypes.map((type) => (
            <span
              key={type}
              className="text-[9px] font-medium tracking-wider uppercase text-muted-foreground bg-surface px-1.5 py-0.5 rounded-sm"
            >
              {typeLabels[type] || productTypeLabel(type)}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-[9px] font-medium tracking-wider text-gold">
              +{extraCount} more
            </span>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground/60 mt-1.5">
          {design.products.length} products
        </p>
      </div>
    </Link>
  );
}
