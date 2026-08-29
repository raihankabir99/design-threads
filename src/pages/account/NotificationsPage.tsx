import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { cn } from "@/lib/utils";

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const defaultPreferences: NotificationPreference[] = [
  { id: "order-updates", label: "Order Updates", description: "Get notified when your order status changes", enabled: true },
  { id: "shipping-updates", label: "Shipping Updates", description: "Receive alerts about shipping progress and delivery", enabled: true },
  { id: "delivery-updates", label: "Delivery Confirmation", description: "Know when your order has been delivered", enabled: true },
  { id: "promotions", label: "Promotions", description: "Special offers, sales and exclusive discounts", enabled: false },
  { id: "new-designs", label: "New Designs", description: "Be the first to discover new design releases", enabled: true },
  { id: "new-collections", label: "New Collections", description: "Get notified when new collections drop", enabled: true },
  { id: "wishlist-alerts", label: "Wishlist Alerts", description: "Price drops and availability for saved items", enabled: false },
  { id: "back-in-stock", label: "Back in Stock", description: "When out-of-stock items become available again", enabled: false },
  { id: "account-security", label: "Account Security", description: "Important security alerts and login notifications", enabled: true },
  { id: "account-activity", label: "Account Activity", description: "Password changes, profile updates and other account events", enabled: true },
];

const channels = [
  { id: "email", label: "Email", enabled: true },
  { id: "push", label: "Push Notifications", enabled: false },
];

export default function NotificationsPage() {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [channelPrefs, setChannelPrefs] = useState(channels);
  const [saved, setSaved] = useState(false);

  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
    setSaved(false);
  };

  const toggleChannel = (id: string) => {
    setChannelPrefs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const enabledCount = preferences.filter((p) => p.enabled).length;

  return (
    <AccountLayout>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Choose what updates you'd like to receive and how.
          </p>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-3 p-4 bg-surface/50 rounded-sm">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <Bell className="h-4 w-4 text-gold" />
          </div>
          <div>
            <p className="text-sm font-medium">{enabledCount} of {preferences.length} notifications enabled</p>
            <p className="text-[11px] text-muted-foreground">You can change these at any time.</p>
          </div>
        </div>

        {/* Delivery Channels */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Delivery Channels</h2>
          <div className="border border-border/50 rounded-sm divide-y divide-border/50">
            {channelPrefs.map((channel) => (
              <label key={channel.id} className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer min-h-[56px]">
                <div>
                  <p className="text-sm font-medium">{channel.label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {channel.id === "email" ? "Receive notifications via email" : "Receive push notifications on your devices"}
                  </p>
                </div>
                <button
                  onClick={() => toggleChannel(channel.id)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors shrink-0",
                    channel.enabled ? "bg-foreground" : "bg-border"
                  )}
                  role="switch"
                  aria-checked={channel.enabled}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-background transition-transform",
                    channel.enabled ? "left-5" : "left-1"
                  )} />
                </button>
              </label>
            ))}
          </div>
        </section>

        {/* Order & Shipping */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Order & Shipping</h2>
          <div className="border border-border/50 rounded-sm divide-y divide-border/50">
            {preferences.filter((p) => ["order-updates", "shipping-updates", "delivery-updates"].includes(p.id)).map((pref) => (
              <label key={pref.id} className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer min-h-[56px]">
                <div>
                  <p className="text-sm font-medium">{pref.label}</p>
                  <p className="text-[11px] text-muted-foreground">{pref.description}</p>
                </div>
                <button
                  onClick={() => togglePreference(pref.id)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors shrink-0",
                    pref.enabled ? "bg-foreground" : "bg-border"
                  )}
                  role="switch"
                  aria-checked={pref.enabled}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-background transition-transform",
                    pref.enabled ? "left-5" : "left-1"
                  )} />
                </button>
              </label>
            ))}
          </div>
        </section>

        {/* Discover */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Discover</h2>
          <div className="border border-border/50 rounded-sm divide-y divide-border/50">
            {preferences.filter((p) => ["new-designs", "new-collections", "promotions", "wishlist-alerts", "back-in-stock"].includes(p.id)).map((pref) => (
              <label key={pref.id} className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer min-h-[56px]">
                <div>
                  <p className="text-sm font-medium">{pref.label}</p>
                  <p className="text-[11px] text-muted-foreground">{pref.description}</p>
                </div>
                <button
                  onClick={() => togglePreference(pref.id)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors shrink-0",
                    pref.enabled ? "bg-foreground" : "bg-border"
                  )}
                  role="switch"
                  aria-checked={pref.enabled}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-background transition-transform",
                    pref.enabled ? "left-5" : "left-1"
                  )} />
                </button>
              </label>
            ))}
          </div>
        </section>

        {/* Account Security */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Account</h2>
          <div className="border border-border/50 rounded-sm divide-y divide-border/50">
            {preferences.filter((p) => ["account-security", "account-activity"].includes(p.id)).map((pref) => (
              <label key={pref.id} className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer min-h-[56px]">
                <div>
                  <p className="text-sm font-medium">{pref.label}</p>
                  <p className="text-[11px] text-muted-foreground">{pref.description}</p>
                </div>
                <button
                  onClick={() => togglePreference(pref.id)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors shrink-0",
                    pref.enabled ? "bg-foreground" : "bg-border"
                  )}
                  role="switch"
                  aria-checked={pref.enabled}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-background transition-transform",
                    pref.enabled ? "left-5" : "left-1"
                  )} />
                </button>
              </label>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="h-11 px-6 text-xs font-semibold uppercase tracking-wider bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors flex items-center gap-2 min-h-[44px]"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Preferences Saved
              </>
            ) : (
              "Save Preferences"
            )}
          </button>
        </div>
      </div>
    </AccountLayout>
  );
}
