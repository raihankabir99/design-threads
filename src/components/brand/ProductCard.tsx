import { Link } from "react-router";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/data/types";
import { formatPrice, productTypeLabel } from "@/data/mock";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  designSlug?: string;
  onQuickView?: (product: Product) => void;
}

const badgeStyles: Record<string, string> = {
  new: "bg-gold text-background",
  bestseller: "bg-foreground text-background",
  limited: "bg-white/10 text-white border border-white/20",
  sale: "bg-red-600 text-white",
};

export function ProductCard({ product, designSlug, onQuickView }: ProductCardProps) {
  const { toggle, has } = useWishlist();
  const designId = product.designId;
  const isWishlisted = has(designId);

  const href = designSlug
    ? `/designs/${designSlug}?type=${product.type}`
    : `/shop/${product.slug}`;

  const designHref = designSlug ? `/designs/${designSlug}` : undefined;

  return (
    <div className="group relative">
      {/* Image */}
      <Link to={href} className="block">
        <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
            />
          )}

          {/* Badge */}
          {product.badge && (
            <span className={cn("absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-sm z-10", badgeStyles[product.badge])}>
              {product.badge}
            </span>
          )}

          {/* Wishlist — always visible on mobile, hover on desktop */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(designId); }}
            className={cn(
              "absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all z-10",
              "sm:opacity-0 sm:group-hover:opacity-100",                isWishlisted
                ? "bg-gold text-background sm:opacity-100"
                : "bg-black/60 text-white hover:bg-black/80"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", isWishlisted && "fill-current")} />
          </button>

          {/* Quick view — always visible on mobile, hover on desktop */}
          {onQuickView && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
              className={cn(
                "absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all z-10",
                "sm:opacity-0 sm:group-hover:opacity-100"
              )}
              aria-label="Quick view"
            >
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="mt-2 sm:mt-3 space-y-1">
        <Link to={href} className="block">
          <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
            {productTypeLabel(product.type)}
          </p>
          <h3 className="text-xs sm:text-sm font-medium mt-0.5 group-hover:text-gold transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-medium text-price">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>

        {/* Design family link */}
        {designHref && (
          <Link
            to={designHref}
            className="inline-block text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors mt-0.5"
          >
            View design →
          </Link>
        )}

        {/* Color dots */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1 pt-0.5">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color.name}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-border/60 shrink-0"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[9px] sm:text-[10px] text-muted-foreground">+{product.colors.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
