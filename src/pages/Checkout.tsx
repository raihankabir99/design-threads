import { Link } from "react-router";
import { Lock, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/mock";

export default function Checkout() {
  const { items, totalPrice, totalItems } = useCart();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-3 w-3" />
            Continue Shopping
          </Link>

          <h1 className="text-display text-2xl lg:text-3xl mb-8">Checkout</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
              <Link to="/designs" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">
                Browse Designs →
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Form */}
              <div className="lg:col-span-3 space-y-6">
                <div>
                  <h2 className="text-sm font-medium mb-3">Contact Information</h2>
                  <input type="email" placeholder="Email address" className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" />
                </div>

                <div>
                  <h2 className="text-sm font-medium mb-3">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="First name" className="h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" />
                    <input type="text" placeholder="Last name" className="h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" />
                  </div>
                  <input type="text" placeholder="Address" className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors mt-3" />
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <input type="text" placeholder="City" className="h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" />
                    <input type="text" placeholder="State" className="h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" />
                    <input type="text" placeholder="ZIP" className="h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" />
                  </div>
                  <select className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors mt-3">
                    <option>Select country</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Netherlands</option>
                    <option>United Kingdom</option>
                    <option>Switzerland</option>
                    <option>Norway</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Saudi Arabia</option>
                    <option>Bangladesh</option>
                  </select>
                </div>

                <div>
                  <h2 className="text-sm font-medium mb-3">Payment</h2>
                  <div className="p-4 bg-surface rounded-sm border border-border/50 text-center">
                    <Lock className="h-4 w-4 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Secure payment integration will be added here.</p>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 border border-border/50 rounded-sm p-5">
                  <h2 className="text-sm font-medium mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3">
                        <div className="w-14 h-14 rounded bg-surface overflow-hidden shrink-0 relative">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-muted-foreground text-background text-[9px] font-medium rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{item.title}</p>
                          <p className="text-[10px] text-muted-foreground">{item.color}{item.size ? ` · ${item.size}` : ""}</p>
                        </div>
                        <span className="text-xs font-medium text-price shrink-0">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-muted-foreground">Calculated at next step</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-border/50">
                      <span>Total</span>
                      <span className="text-price">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
