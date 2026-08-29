import { Link } from "react-router";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/mock";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display text-2xl lg:text-3xl mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-sm font-medium mb-2">Your cart is empty</p>
              <p className="text-xs text-muted-foreground mb-6">Discover our designs and find something you love.</p>
              <Link to="/designs" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">
                Browse Designs →
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2">
                <ul className="divide-y divide-border/50 border border-border/50 rounded-sm">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4 p-4 sm:p-5">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded bg-surface overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.designName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-block w-3 h-3 rounded-full border border-border/50" style={{ backgroundColor: item.colorHex }} />
                              <span className="text-xs text-muted-foreground">{item.color}</span>
                              {item.size && <span className="text-xs text-muted-foreground">· {item.size}</span>}
                            </div>
                          </div>
                          <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" aria-label="Remove">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border/60 rounded-sm">
                            <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Decrease">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-xs font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Increase">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-price">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-4">
                  <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Clear Cart
                  </button>
                  <Link to="/shop" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Summary */}
              <div>
                <div className="border border-border/50 rounded-sm p-5 sticky top-24">
                  <h2 className="text-sm font-medium mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-muted-foreground">Calculated at checkout</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-3 border-t border-border/50 mb-5">
                    <span>Total</span>
                    <span className="text-price">{formatPrice(totalPrice)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center gap-2 w-full h-11 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
