import { useState } from "react";
import { Link } from "react-router";
import { Minus, Plus, X, ShoppingBag, ArrowRight, ArrowLeft, Tag, Bookmark, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useCart } from "@/context/CartContext";
import { formatPrice, designs } from "@/data/mock";
import type { CartItem } from "@/data/types";
import { cn } from "@/lib/utils";

const countries = [
  { code: "DE", name: "Germany" }, { code: "FR", name: "France" }, { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" }, { code: "NL", name: "Netherlands" }, { code: "BE", name: "Belgium" },
  { code: "SE", name: "Sweden" }, { code: "GB", name: "United Kingdom" }, { code: "CH", name: "Switzerland" },
  { code: "NO", name: "Norway" }, { code: "US", name: "United States" }, { code: "CA", name: "Canada" },
  { code: "SA", name: "Saudi Arabia" }, { code: "AE", name: "UAE" },
];

export default function CartPage() {
  const { items, addItem, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [shipCountry, setShipCountry] = useState("DE");
  const [shipResult, setShipResult] = useState<{ days: string; cost: number } | null>(null);

  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const shipping = shipResult ? shipResult.cost : (totalPrice >= 50 ? 0 : 4.99);
  const total = totalPrice - discount + shipping;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "FAYANITY10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const estimateShipping = () => {
    const isEU = ["DE", "FR", "IT", "ES", "NL", "BE", "SE", "NO", "CH"].includes(shipCountry);
    setShipResult({
      days: isEU ? "5–8" : "8–14",
      cost: isEU ? (totalPrice >= 50 ? 0 : 4.99) : 9.99,
    });
  };

  const handleSaveForLater = (item: CartItem) => {
    setSavedItems((prev) => [...prev, item]);
    removeItem(item.productId);
  };

  const handleMoveToCart = (item: CartItem) => {
    addItem({
      productId: item.productId, designId: item.designId, type: item.type,
      designName: item.designName, title: item.title, color: item.color,
      colorHex: item.colorHex, size: item.size, price: item.price, image: item.image,
    });
    setSavedItems((prev) => prev.filter((i) => i.productId !== item.productId));
  };

  const cartDesignIds = [...new Set(items.map((i) => i.designId))];
  const recommended = designs.filter((d) => !cartDesignIds.includes(d.id)).slice(0, 4);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Cart</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-1">Your Cart</h1>
          <p className="text-sm text-muted-foreground mb-8 lg:mb-12">
            {totalItems > 0 ? `${totalItems} ${totalItems === 1 ? "item" : "items"}` : "No items yet"}
          </p>

          {items.length === 0 && savedItems.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
              <h2 className="font-display text-xl font-medium mb-2">Your Cart Is Empty</h2>
              <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                Discover designs created for everyday expression. Find something you love and make it yours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/shop" className="px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px] flex items-center">
                  Explore Shop
                </Link>
                <Link to="/designs" className="px-6 py-3 border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-sm transition-colors min-h-[44px] flex items-center">
                  Explore Designs
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* Left: Items */}
              <div>
                {items.length > 0 && (
                  <ul className="border border-border/50 rounded-sm divide-y divide-border/50">
                    {items.map((item) => (
                      <li key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4 p-4 sm:p-5">
                        <Link
                          to={`/designs/${designs.find((d) => d.id === item.designId)?.slug || ""}?type=${item.type}`}
                          className="w-20 h-24 sm:w-24 sm:h-28 rounded-sm bg-surface overflow-hidden shrink-0"
                        >
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.designName}</p>
                              <p className="text-sm font-medium mt-0.5">{item.title}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="w-3 h-3 rounded-full border border-border/50 shrink-0" style={{ backgroundColor: item.colorHex }} />
                                <span className="text-[11px] text-muted-foreground">{item.color}</span>
                                {item.size && <span className="text-[11px] text-muted-foreground">· {item.size}</span>}
                              </div>
                            </div>
                            <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" aria-label="Remove">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-border/60 rounded-sm">
                              <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Decrease">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-9 h-9 flex items-center justify-center text-sm font-medium tabular-nums">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Increase">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-price">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Saved for later */}
                {savedItems.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Saved for Later ({savedItems.length})</p>
                    <div className="border border-border/50 rounded-sm divide-y divide-border/50">
                      {savedItems.map((item) => (
                        <div key={`saved-${item.productId}`} className="flex items-center gap-3 p-4">
                          <div className="w-14 h-16 rounded-sm bg-surface overflow-hidden shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground">{item.color}{item.size ? ` · ${item.size}` : ""} · {formatPrice(item.price)}</p>
                          </div>
                          <button onClick={() => handleMoveToCart(item)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 shrink-0">
                            Move to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-6">
                  <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Clear Cart
                  </button>
                  <Link to="/shop" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Right: Summary */}
              <div>
                <div className="sticky top-24 border border-border/50 rounded-sm p-5 space-y-4">
                  <h2 className="text-sm font-medium">Order Summary</h2>

                  {/* Subtotal */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-xs">
                        <span className="text-green-500">Discount (10%)</span>
                        <span className="text-green-500">-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={cn(shipResult && shipping === 0 && "text-green-500")}>
                        {shipResult ? (shipping === 0 ? "Free" : formatPrice(shipping)) : "Calculated below"}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-sm font-medium pt-3 border-t border-border/50">
                    <span>Total</span>
                    <span className="text-price text-base">{formatPrice(total)}</span>
                  </div>

                  {/* Checkout */}
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center gap-2 w-full h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Promo Code */}
                  <div className="pt-2 border-t border-border/50">
                    {!promoApplied ? (
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Tag className="h-3 w-3" /> Promo Code
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
                        {promoError && <p className="text-[11px] text-red-500 mt-1.5">Invalid code. Please try again.</p>}
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

                  {/* Shipping Estimator */}
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Estimate Shipping</p>
                    <select
                      value={shipCountry}
                      onChange={(e) => setShipCountry(e.target.value)}
                      className="w-full h-9 px-3 bg-surface border border-border rounded-sm text-xs text-foreground focus:outline-none focus:border-foreground/40 transition-colors appearance-none cursor-pointer mb-2"
                    >
                      {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                    <button onClick={estimateShipping} className="w-full h-9 text-[11px] font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors">
                      Estimate
                    </button>
                    {shipResult && (
                      <div className="mt-2 p-3 bg-surface/50 rounded-sm">
                        <p className="text-xs">
                          <span className="text-muted-foreground">Delivery: </span>
                          <span className="font-medium">{shipResult.days} business days</span>
                        </p>
                        <p className="text-xs mt-0.5">
                          <span className="text-muted-foreground">Shipping: </span>
                          <span className={cn("font-medium", shipResult.cost === 0 && "text-green-500")}>
                            {shipResult.cost === 0 ? "Free" : formatPrice(shipResult.cost)}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommended */}
          {recommended.length > 0 && (
            <div className="mt-16 lg:mt-24 pt-12 border-t border-border/50">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">You May Also Like</p>
              <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">Complete the Look</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {recommended.map((d) => (
                  <Link key={d.id} to={`/designs/${d.slug}`} className="group block">
                    <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface mb-3">
                      <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-0.5">{d.products.length} products</p>
                    <h3 className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
