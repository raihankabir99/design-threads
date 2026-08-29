import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { X, Minus, Plus, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/types";
import { formatPrice, productTypeLabel } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product;
  designSlug?: string;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, designSlug, open, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has(product.designId);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes?.[0] || "");
      setQuantity(1);
      setImageIndex(0);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, product]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      designId: product.designId,
      type: product.type,
      designName: product.designName,
      title: product.title,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      size: selectedSize || undefined,
      price: product.price,
      image: product.images[0],
    });
    onClose();
  };

  const fullProductUrl = designSlug
    ? `/designs/${designSlug}?type=${product.type}`
    : `/shop/${product.slug}`;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Quick view: ${product.title}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-background border border-border/60 rounded-sm shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close quick view"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-surface">
            <img
              src={product.images[imageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className={cn(
                "absolute top-4 left-4 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm",
                product.badge === "new" && "bg-gold text-background",
                product.badge === "bestseller" && "bg-foreground text-background",
                product.badge === "limited" && "bg-white/10 text-white border border-white/20",
                product.badge === "sale" && "bg-red-600 text-white",
              )}>
                {product.badge}
              </span>
            )}

            {/* Image navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setImageIndex(i => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setImageIndex(i => (i + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Wishlist */}
            <button
              onClick={() => toggle(product.designId)}
              className={cn(
                "absolute top-4 right-14 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm",
                isWishlisted ? "bg-gold text-background" : "bg-black/40 text-white hover:bg-black/60"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            </button>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.15em] text-gold mb-1">
              {product.designName}
            </p>
            <h2 className="font-display text-xl md:text-2xl font-medium mb-1">
              {product.title}
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              {productTypeLabel(product.type)}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-lg font-medium text-price">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Color — <span className="text-foreground">{selectedColor.name}</span>
                </p>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-7 h-7 rounded-full border-2 transition-all",
                        selectedColor.name === color.name
                          ? "border-foreground scale-110"
                          : "border-border/60 hover:border-foreground/40"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Size — <span className="text-foreground">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[44px] h-10 px-3 text-xs font-medium rounded-sm border transition-all",
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mb-6 mt-auto">
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-10 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 active:scale-[0.98] transition-all"
              >
                Add to Cart — {formatPrice(product.price * quantity)}
              </button>
            </div>

            {/* View full product */}
            <Link
              to={fullProductUrl}
              onClick={onClose}
              className="text-xs text-center text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              View Full Product Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
