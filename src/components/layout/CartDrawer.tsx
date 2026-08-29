import { Link } from "react-router";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/data/mock";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[80] bg-black/60 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-[90] w-full max-w-md bg-background border-l border-border/50 transition-transform duration-300 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm font-medium">Cart</span>
            {totalItems > 0 && (
              <span className="text-xs text-muted-foreground">({totalItems})</span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-sm font-medium mb-1">Your cart is empty</p>
              <p className="text-xs text-muted-foreground mb-6">
                Discover our designs and find something you love.
              </p>
              <Link
                to="/designs"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gold hover:text-gold-light transition-colors flex items-center gap-1.5"
              >
                Explore Designs
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border/50">
              {items.map((item) => (
                <li key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4 p-5">
                  <div className="w-20 h-20 rounded bg-surface overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.designName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block w-3 h-3 rounded-full border border-border/50" style={{ backgroundColor: item.colorHex }} />
                          <span className="text-xs text-muted-foreground">{item.color}</span>
                          {item.size && <span className="text-xs text-muted-foreground">· {item.size}</span>}
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" aria-label="Remove item">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border/60 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border/50 p-5 space-y-4 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm font-medium text-price">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full h-12 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full h-10 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
