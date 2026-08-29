import { useState } from "react";
import { Link, useLocation } from "react-router";
import { User, Package, MapPin, Settings, Heart, LogOut, ChevronRight, Search, X, Menu } from "lucide-react";
import { SiteLayout } from "./SiteLayout";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/account", label: "Overview", icon: User, exact: true },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/track-order", label: "Track Order", icon: Search },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function AccountLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { signOut } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? location.pathname === href : location.pathname.startsWith(href);

  const currentLabel = navItems.find((n) => isActive(n.href, n.exact))?.label || "Account";

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    window.location.href = "/";
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/account" className="hover:text-foreground transition-colors">Account</Link>
          {currentLabel !== "Overview" && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{currentLabel}</span>
            </>
          )}
        </nav>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4 px-3">My Account</p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-all min-h-[40px]",
                      active
                        ? "bg-surface text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-3 border-t border-border/50">
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-full rounded-sm min-h-[40px]"
                >
                  <LogOut className="h-4 w-4" />
                  {signingOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile nav toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex items-center gap-2 px-4 py-3 border border-border/50 rounded-sm text-sm w-full min-h-[44px]"
            >
              <Menu className="h-4 w-4" />
              <span className="flex-1 text-left">{currentLabel}</span>
              <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", mobileNavOpen && "rotate-90")} />
            </button>
            {mobileNavOpen && (
              <div className="mt-2 border border-border/50 rounded-sm bg-background shadow-lg animate-in slide-in-from-top-2 duration-200">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-border/30 last:border-b-0 min-h-[44px]",
                        active ? "bg-surface text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors w-full min-h-[44px]"
                >
                  <LogOut className="h-4 w-4" />
                  {signingOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            )}
          </div>

          {/* Main content */}
          <main className="min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SiteLayout>
  );
}
