import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Search, ShoppingBag, User, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Designs", href: "/designs" },
  { label: "Collections", href: "/collections" },
  { label: "New Drops", href: "/shop?sort=new" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen } = useCart();

  const isLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isLanding
            ? "bg-background/95 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-18">
            {/* Mobile menu button */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 -ml-2"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-xl font-semibold tracking-tight text-foreground">
                FAYANITY
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-[13px] font-medium tracking-wide transition-colors hover:text-foreground",
                    location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href.split("?")[0]))
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/search"
                className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </Link>
              <Link
                to="/wishlist"
                className="hidden sm:flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-[18px] w-[18px]" />
              </Link>
              <Link
                to="/account"
                className="hidden sm:flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Account"
              >
                <User className="h-[18px] w-[18px]" />
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors relative"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-background">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 lg:h-18" />

      {/* Mobile nav */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
