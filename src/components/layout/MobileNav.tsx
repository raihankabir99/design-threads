import { useState, useEffect } from "react";
import { Link } from "react-router";
import { X, ArrowRight, ChevronRight, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { designs } from "@/data/mock";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const mainLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Designs", href: "/designs" },
  { label: "Collections", href: "/collections" },
  { label: "New Drops", href: "/shop?sort=new" },
  { label: "Best Sellers", href: "/shop?sort=best" },
  { label: "Blog", href: "/blog" },
];

const shopCategories = [
  {
    label: "Apparel",
    items: [
      { label: "T-Shirts", href: "/shop?type=t-shirt" },
      { label: "Hoodies", href: "/shop?type=hoodie" },
      { label: "Sweatshirts", href: "/shop?type=sweatshirt" },
    ],
  },
  {
    label: "Accessories",
    items: [
      { label: "Tote Bags", href: "/shop?type=tote-bag" },
      { label: "Caps", href: "/shop?type=cap" },
      { label: "Phone Cases", href: "/shop?type=phone-case" },
    ],
  },
  {
    label: "Home & Lifestyle",
    items: [
      { label: "Mugs", href: "/shop?type=mug" },
      { label: "Posters", href: "/shop?type=poster" },
      { label: "Notebooks", href: "/shop?type=notebook" },
    ],
  },
];

const infoLinks = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping", href: "/shipping" },
];

const accountLinks = [
  { label: "Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
];

const regions = [
  { label: "Europe", currency: "EUR €", flag: "🇪🇺" },
  { label: "United Kingdom", currency: "GBP £", flag: "🇬🇧" },
  { label: "United States", currency: "USD $", flag: "🇺🇸" },
  { label: "Saudi Arabia", currency: "SAR ﷼", flag: "🇸🇦" },
  { label: "Canada", currency: "CAD $", flag: "🇨🇦" },
  { label: "Switzerland", currency: "CHF ₣", flag: "🇨🇭" },
  { label: "Norway", currency: "NOK kr", flag: "🇳🇴" },
];

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showRegion, setShowRegion] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset state when closing
      setTimeout(() => {
        setExpandedCategory(null);
        setShowRegion(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-full max-w-sm bg-background border-r border-border/50 transition-transform duration-300 ease-out lg:hidden flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-border/50 shrink-0">
          <span className="font-display text-lg font-semibold tracking-tight">
            FAYANITY
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto">
          <div className="py-4 px-5">
            {/* Main nav links */}
            <ul className="space-y-0.5">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  {link.label === "Shop All" ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === "shop" ? null : "shop"
                          )
                        }
                        className="flex items-center justify-between w-full py-3 text-foreground text-base font-medium hover:text-gold transition-colors"
                      >
                        <span>{link.label}</span>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform duration-200",
                            expandedCategory === "shop" && "rotate-90"
                          )}
                        />
                      </button>
                      {/* Shop subcategories */}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-200",
                          expandedCategory === "shop"
                            ? "max-h-[400px] opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="pl-4 pb-2 space-y-4">
                          {shopCategories.map((cat) => (
                            <div key={cat.label}>
                              <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground mb-2">
                                {cat.label}
                              </p>
                              <ul className="space-y-1.5">
                                {cat.items.map((item) => (
                                  <li key={item.href}>
                                    <Link
                                      to={item.href}
                                      onClick={onClose}
                                      className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-3 text-foreground text-base font-medium hover:text-gold transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Featured designs */}
          <div className="px-5 py-4 border-t border-border/50">
            <p className="text-label text-muted-foreground mb-3">
              Featured Designs
            </p>
            <div className="space-y-2.5">
              {designs.slice(0, 4).map((d) => (
                <Link
                  key={d.id}
                  to={`/designs/${d.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded bg-surface overflow-hidden shrink-0 border border-border/40">
                    <img
                      src={d.heroImage}
                      alt={d.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-gold transition-colors">
                      {d.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {d.products.length} products
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Info links */}
          <div className="px-5 py-4 border-t border-border/50">
            <ul className="space-y-0.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account / Wishlist */}
          <div className="px-5 py-4 border-t border-border/50">
            <ul className="space-y-0.5">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Region / Currency / Language */}
          <div className="px-5 py-4 border-t border-border/50">
            <button
              onClick={() => setShowRegion(!showRegion)}
              className="flex items-center justify-between w-full py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Region & Currency
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  showRegion && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                showRegion ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="pl-6 pt-2 space-y-2">
                {regions.map((region) => (
                  <button
                    key={region.label}
                    className="flex items-center gap-3 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="text-base">{region.flag}</span>
                    <span>{region.label}</span>
                    <span className="text-xs text-muted-foreground/60 ml-auto">
                      {region.currency}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
