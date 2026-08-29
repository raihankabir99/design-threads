import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, LogOut, Package, Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <SiteLayout>
      <main className="px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-label text-gold">Dashboard</p>
              <h1 className="mt-1 text-display text-2xl lg:text-3xl">
                Welcome{user?.name ? `, ${user.name}` : ""}
              </h1>
            </div>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer gap-2 self-start"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </header>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Package, label: "Orders", desc: "View your order history", href: "/orders" },
              { icon: Heart, label: "Wishlist", desc: "Your saved designs", href: "/wishlist" },
              { icon: ShoppingBag, label: "Shop", desc: "Browse our designs", href: "/designs" },
            ].map((item) => (
              <Card
                key={item.href}
                className="border-border/50 shadow-none cursor-pointer hover:bg-surface transition-colors"
                onClick={() => navigate(item.href)}
              >
                <CardHeader className="pb-2">
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-gold-muted text-gold">
                    <item.icon className="size-5" />
                  </div>
                  <CardTitle className="text-sm">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
