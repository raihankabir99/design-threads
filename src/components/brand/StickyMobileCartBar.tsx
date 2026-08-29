import { formatPrice } from "@/data/mock";

interface StickyMobileCartBarProps {
  price: number;
  compareAtPrice?: number;
  onAddToCart: () => void;
  added?: boolean;
}

export function StickyMobileCartBar({ price, compareAtPrice, onAddToCart, added }: StickyMobileCartBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border/60 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-4 py-3 safe-area-bottom">
        {/* Price */}
        <div className="flex items-baseline gap-2 shrink-0">
          <span className="text-base font-medium text-price">{formatPrice(price)}</span>
          {compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(compareAtPrice)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          className="flex-1 h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 active:scale-[0.98] transition-all min-h-[44px]"
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
