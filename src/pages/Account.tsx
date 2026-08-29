import { Link } from "react-router";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export default function Account() {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="max-w-md mx-auto text-center py-20">
            <User className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="text-display text-2xl mb-3">Your Account</h1>
            <p className="text-sm text-muted-foreground mb-6">Sign in to access your account, orders, and wishlist.</p>
            <Link
              to="/auth?returnTo=/account"
              className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <p className="text-label text-gold mb-3">Account</p>
            <h1 className="text-display text-3xl lg:text-4xl">
              Welcome{user?.name ? `, ${user.name}` : ""}
            </h1>
          </div>

          <div className="space-y-2">
            {[
              { icon: Package, label: "Orders", desc: "View your order history and tracking", href: "/orders" },
              { icon: Heart, label: "Wishlist", desc: "Your saved designs", href: "/wishlist" },
              { icon: Settings, label: "Settings", desc: "Manage your account preferences", href: "/account/settings" },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-4 p-4 rounded-sm border border-border/50 hover:bg-surface transition-colors group"
              >
                <div className="w-10 h-10 rounded-sm bg-surface flex items-center justify-center shrink-0 group-hover:bg-surface-hover transition-colors">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </SiteLayout>
  );
}
