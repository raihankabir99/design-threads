import { Link } from "react-router";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/data/types";
import { formatPrice, productTypeLabel } from "@/data/mock";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  designSlug?: string;
}

const badgeStyles: Record<string, string> = {
  new: "bg-gold text-background",
  bestseller: "bg-foreground text-background",
  limited: "bg-white/10 text-white border border-white/20",
  sale: "bg-red-600 text-white",
};

export function ProductCard({ product, designSlug }: ProductCardProps) {
  const { toggle, has } = useWishlist();
  const designId = product.designId;
  const isWishlisted = has(designId);

  const href = designSlug
    ? `/designs/${designSlug}?type=${product.type}`
    : `/shop/${product.slug}`;

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
            <span className={cn("absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm", badgeStyles[product.badge])}>
              {product.badge}
            </span>
          )}

          {/* Hover actions */}
          <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => { e.preventDefault(); toggle(designId); }}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm",
                isWishlisted ? "bg-gold text-background" : "bg-black/50 text-white hover:bg-black/70"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all backdrop-blur-sm"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 space-y-1.5">
        <Link to={href} className="block">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {productTypeLabel(product.type)}
          </p>
          <h3 className="text-sm font-medium mt-0.5 group-hover:text-gold transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-price">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>

        {/* Color dots */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-0.5">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color.name}
                className="w-3 h-3 rounded-full border border-border/60 shrink-0"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-muted-foreground">+{product.colors.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
