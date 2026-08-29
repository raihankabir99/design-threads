import { useParams, Link } from "react-router";
import { ArrowLeft, Package, Truck, MapPin, CreditCard, Check, MessageCircle } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { mockOrders, formatDate, statusLabels, statusColors } from "@/data/accountData";
import { formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";

const timelineSteps = [
  { key: "placed", label: "Order Placed", icon: Check },
  { key: "confirmed", label: "Payment Confirmed", icon: Check },
  { key: "production", label: "In Production", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: MapPin },
];

function getTimelineStatus(orderStatus: string) {
  const map: Record<string, number> = {
    processing: 1,
    "in-production": 2,
    shipped: 3,
    delivered: 4,
  };
  return map[orderStatus] ?? 0;
}

export default function OrderDetail() {
  const { "order-id": orderId } = useParams();
  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];
  const timelineIdx = getTimelineStatus(order.status);

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link to="/account/orders" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mb-2">
              <ArrowLeft className="h-3 w-3" /> Orders
            </Link>
            <h1 className="font-display text-2xl font-medium tracking-tight">Order {order.number}</h1>
            <p className="text-xs text-muted-foreground mt-1">Placed on {formatDate(order.date)}</p>
          </div>
          <span className={cn("text-[11px] font-medium px-3 py-1 rounded-sm", statusColors[order.status])}>
            {statusLabels[order.status]}
          </span>
        </div>

        {/* Status Timeline */}
        <div className="border border-border/50 rounded-sm p-5">
          <h2 className="text-sm font-medium mb-4">Order Status</h2>
          <div className="relative">
            <div className="absolute top-4 left-[10%] right-[10%] h-px bg-border" />
            <div
              className="absolute top-4 left-[10%] h-px bg-foreground transition-all duration-500"
              style={{ width: `${(timelineIdx / (timelineSteps.length - 1)) * 80}%` }}
            />
            <div className="relative flex items-start justify-between">
              {timelineSteps.map((step, i) => {
                const Icon = step.icon;
                const isDone = i <= timelineIdx;
                const isCurrent = i === timelineIdx;
                return (
                  <div key={step.key} className="flex flex-col items-center flex-1">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 relative z-10 transition-colors",
                      isDone ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border",
                      isCurrent && "ring-2 ring-foreground/20"
                    )}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <p className={cn("text-[10px] text-center leading-tight max-w-[64px]", isDone ? "text-foreground font-medium" : "text-muted-foreground")}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {order.trackingNumber && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <p className="text-[11px] text-muted-foreground">
                Tracking number: <span className="font-mono text-foreground">{order.trackingNumber}</span>
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Items */}
          <div className="border border-border/50 rounded-sm p-5">
            <h2 className="text-sm font-medium mb-4">Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex gap-3 p-3 bg-surface/30 rounded-sm">
                  <div className="w-12 h-14 rounded-sm bg-surface overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.designName}</p>
                    <p className="text-xs font-medium">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {item.color}{item.size ? ` · ${item.size}` : ""} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-price shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 mt-4 pt-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Shipping</span>
                <span className={cn(order.shipping === 0 && "text-green-500")}>
                  {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-border/50">
                <span>Total</span>
                <span className="text-price">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className="space-y-6">
            <div className="border border-border/50 rounded-sm p-5">
              <h2 className="text-sm font-medium mb-3">Shipping Address</h2>
              <p className="text-sm">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{order.shippingAddress.address}{order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ""}</p>
              <p className="text-xs text-muted-foreground">{order.shippingAddress.city}{order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ""} {order.shippingAddress.postalCode}</p>
              <p className="text-xs text-muted-foreground">{order.shippingAddress.country}</p>
            </div>

            <div className="border border-border/50 rounded-sm p-5">
              <h2 className="text-sm font-medium mb-3">Delivery</h2>
              <p className="text-sm">{order.deliveryMethod === "standard" ? "Standard Delivery" : "Express Delivery"}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {order.deliveryMethod === "standard" ? "5–8 business days" : "2–3 business days"}
              </p>
            </div>

            <div className="border border-border/50 rounded-sm p-5">
              <h2 className="text-sm font-medium mb-3">Payment</h2>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Support */}
            <div className="border border-border/50 rounded-sm p-5">
              <h2 className="text-sm font-medium mb-2">Need Help?</h2>
              <p className="text-xs text-muted-foreground mb-3">Our support team is here to assist you with your order.</p>
              <div className="flex gap-2">
                <Link
                  to="/contact"
                  className="px-4 py-2 text-[11px] font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[36px] flex items-center gap-1.5"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Contact Support
                </Link>
                <Link
                  to="/faq"
                  className="px-4 py-2 text-[11px] font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[36px] flex items-center"
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
