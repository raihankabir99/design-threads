import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Bookmark, Tag, Undo2, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { formatPrice, designs } from "@/data/mock";
import type { CartItem } from "@/data/types";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, addItem, totalPrice, totalItems, lastAddedItem, clearLastAdded } = useCart();
  const addItemRef = useRef(addItem);
  addItemRef.current = addItem;

  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [undoItem, setUndoItem] = useState<CartItem | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    return () => { if (undoTimerRef.current) clearTimeout(undoTimerRef.current); };
  }, []);

  const handleRemove = useCallback((item: CartItem) => {
    removeItem(item.productId);
    setUndoItem(item);
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => setUndoItem(null), 4000);
  }, [removeItem]);

  const handleUndo = useCallback(() => {
    if (undoItem) {
      addItemRef.current({
        productId: undoItem.productId,
        designId: undoItem.designId,
        type: undoItem.type,
        designName: undoItem.designName,
        title: undoItem.title,
        color: undoItem.color,
        colorHex: undoItem.colorHex,
        size: undoItem.size,
        price: undoItem.price,
        image: undoItem.image,
      });
      setUndoItem(null);
    }
  }, [undoItem]);

  const handleSaveForLater = (item: CartItem) => {
    setSavedItems((prev) => [...prev, item]);
    removeItem(item.productId);
  };

  const handleMoveToCart = (item: CartItem) => {
    addItemRef.current({
      productId: item.productId,
      designId: item.designId,
      type: item.type,
      designName: item.designName,
      title: item.title,
      color: item.color,
      colorHex: item.colorHex,
      size: item.size,
      price: item.price,
      image: item.image,
    });
    setSavedItems((prev) => prev.filter((i) => i.productId !== item.productId));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "FAYANITY10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const shipping = totalPrice >= 50 ? 0 : 4.99;
  const total = totalPrice - discount + shipping;

  const cartDesignIds = [...new Set(items.map((i) => i.designId))];
  const recommended = designs.filter((d) => !cartDesignIds.includes(d.id)).slice(0, 3);

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
            <span className="text-sm font-medium">Your Bag</span>
            {totalItems > 0 && (
              <span className="text-[11px] text-muted-foreground">({totalItems} {totalItems === 1 ? "item" : "items"})</span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 && savedItems.length === 0 ? (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-5">
                <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <p className="font-display text-lg font-medium mb-1.5">Your bag is waiting</p>
              <p className="text-xs text-muted-foreground mb-8 leading-relaxed max-w-[220px]">
                Discover a design and make it yours.
              </p>
              <div className="flex flex-col gap-2.5 w-full max-w-[220px]">
                <Link to="/designs" onClick={() => setIsOpen(false)} className="flex items-center justify-center h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors">
                  Explore Designs
                </Link>
                <Link to="/shop" onClick={() => setIsOpen(false)} className="flex items-center justify-center h-11 border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-sm transition-colors">
                  Shop Best Sellers
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {/* Added to bag toast */}
              {lastAddedItem && (
                <div className="px-5 py-3 bg-green-500/5 border-b border-green-500/20 flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Added to your bag</p>
                    <p className="text-[11px] text-muted-foreground truncate">{lastAddedItem.title} · {lastAddedItem.color}</p>
                  </div>
                  <button onClick={clearLastAdded} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Cart items */}
              {items.map((item, idx) => {
                const showDesignGroup = idx === 0 || items[idx - 1]?.designId !== item.designId;
                const sameDesignCount = items.filter((i) => i.designId === item.designId).length;
                return (
                  <div key={`${item.productId}-${item.color}-${item.size}`}>
                    {/* Design group header */}
                    {showDesignGroup && (
                      <div className="px-5 pt-4 pb-1.5">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">{item.designName}</p>
                        {sameDesignCount > 1 && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">{sameDesignCount} items from this design</p>
                        )}
                      </div>
                    )}
                    {/* Item */}
                    <div className="flex gap-4 px-5 pb-4 pt-2">
                      <Link
                        to={`/designs/${designs.find((d) => d.id === item.designId)?.slug || ""}?type=${item.type}`}
                        onClick={() => setIsOpen(false)}
                        className="w-[72px] h-[88px] rounded-sm bg-surface overflow-hidden shrink-0"
                      >
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="w-3 h-3 rounded-full border border-border/50 shrink-0" style={{ backgroundColor: item.colorHex }} />
                              <span className="text-[11px] text-muted-foreground">{item.color}</span>
                              {item.size && <span className="text-[11px] text-muted-foreground">· {item.size}</span>}
                            </div>
                          </div>
                          <button onClick={() => handleRemove(item)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5 p-1" aria-label="Remove item">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border/60 rounded-sm">
                            <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Decrease">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-xs font-medium tabular-nums">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Increase">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleSaveForLater(item)} className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Save for later">
                              <Bookmark className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-sm font-medium text-price">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Undo toast */}
              {undoItem && (
                <div className="px-5 py-3 bg-surface/50 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Item removed</p>
                  <button onClick={handleUndo} className="text-xs text-foreground font-medium flex items-center gap-1 hover:underline">
                    <Undo2 className="h-3 w-3" /> Undo
                  </button>
                </div>
              )}

              {/* Saved for later */}
              {savedItems.length > 0 && (
                <div className="px-5 py-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Saved for Later ({savedItems.length})</p>
                  <div className="space-y-3">
                    {savedItems.map((item) => (
                      <div key={`saved-${item.productId}`} className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-sm bg-surface overflow-hidden shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{item.title}</p>
                          <p className="text-[10px] text-muted-foreground">{item.color}{item.size ? ` · ${item.size}` : ""} · {formatPrice(item.price)}</p>
                        </div>
                        <button onClick={() => handleMoveToCart(item)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Promo code */}
              <div className="px-5 py-4">
                {!promoApplied ? (
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Tag className="h-3 w-3" /> Have a promo code?
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(false); }}
                        placeholder="Enter code"
                        className="flex-1 h-9 px-3 bg-surface border border-border rounded-sm text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors"
                      />
                      <button onClick={applyPromo} className="px-4 h-9 text-[11px] font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors">
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-red-500 mt-1.5">Invalid code. Please try again.</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3 text-gold" />
                      <span className="text-xs font-medium">{promoCode.toUpperCase()}</span>
                      <span className="text-xs text-green-500">-{formatPrice(discount)}</span>
                    </div>
                    <button onClick={() => { setPromoApplied(false); setPromoCode(""); }} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Recommended */}
              {recommended.length > 0 && (
                <div className="px-5 py-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">You Might Also Like</p>
                  <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
                    {recommended.map((d) => (
                      <Link
                        key={d.id}
                        to={`/designs/${d.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="shrink-0 w-24 group"
                      >
                        <div className="w-24 h-28 rounded-sm bg-surface overflow-hidden mb-1.5">
                          <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                        </div>
                        <p className="text-[10px] font-medium group-hover:text-gold transition-colors truncate">{d.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border/50 px-5 py-4 space-y-3 shrink-0">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-xs">
                  <span className="text-green-500">Discount</span>
                  <span className="text-green-500">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Shipping</span>
                <span className={cn(shipping === 0 && "text-green-500")}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-border/50">
                <span>Total</span>
                <span className="text-price">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full h-10 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View Bag
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
