import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { MegaMenuPanel } from "./MegaMenu";
import { designs as allDesigns, products as allProducts } from "@/data/mock";

const navLinks = [
  { label: "Shop", href: "/shop", megaType: "shop" as const },
  { label: "Designs", href: "/designs", megaType: "designs" as const },
  { label: "Collections", href: "/collections", megaType: "collections" as const },
  { label: "New Drops", href: "/shop?sort=new", megaType: null },
  { label: "Best Sellers", href: "/shop?sort=best", megaType: null },
  { label: "Blog", href: "/blog", megaType: null },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isLanding = location.pathname === "/";

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation
  useEffect(() => {
    setMobileNavOpen(false);
    setActiveMega(null);
    setSearchOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setActiveMega(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close mega menu
  useEffect(() => {
    if (activeMega) {
      const handleClickOutside = (e: MouseEvent) => {
        if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
          setActiveMega(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeMega]);

  const handleMegaEnter = useCallback((label: string) => {
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
    setActiveMega(label);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isLanding
            ? "bg-background/95 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between lg:h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 -ml-2"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="font-display text-xl font-semibold tracking-tight text-foreground">
                FAYANITY
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 ml-10">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.megaType && handleMegaEnter(link.label)}
                  onMouseLeave={() => link.megaType && handleMegaLeave()}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors px-3 py-2 rounded-sm",
                      (location.pathname === link.href ||
                        (link.href !== "/" && location.pathname.startsWith(link.href.split("?")[0]))) &&
                        !activeMega
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
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
                onClick={() => setCartOpen(true)}
                className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors relative"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-background">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega menus */}
        {navLinks
          .filter((l) => l.megaType)
          .map((link) => (
            <MegaMenuPanel
              key={link.label}
              open={activeMega === link.label}
              type={link.megaType!}
              onMouseEnter={() => handleMegaEnter(link.label)}
              onMouseLeave={handleMegaLeave}
            />
          ))}
      </header>

      {/* Spacer — matches header height */}
      <div className="h-14 lg:h-16" />

      {/* Mobile nav */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Inline search overlay — controlled by header state */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative mx-auto max-w-2xl mt-20 px-4 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
            <SearchOverlayInline onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

// Inline search overlay (embedded in Header, not the page-level one)
function SearchOverlayInline({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const filteredDesigns =
    query.length > 0
      ? allDesigns.filter((d: any) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.tags.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
        )
      : [];

  const filteredProducts =
    query.length > 0
      ? allProducts
          .filter((p: any) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.designName.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const popularSearches = ["Midnight Lion", "Hoodie", "T-Shirt", "Minimal", "Streetwear", "Gift"];
  const recentSearches = ["new drops", "black hoodie", "botanical"];

  return (
    <div className="bg-background border border-border/60 rounded-sm shadow-2xl overflow-hidden">
      {/* Search input */}
      <div className="flex items-center gap-3 px-5 h-14 border-b border-border/50">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products, designs, collections..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close search">
          <kbd className="text-[10px] text-muted-foreground bg-surface px-1.5 py-0.5 rounded">ESC</kbd>
        </button>
      </div>

      {/* Results / Suggestions */}
      <div className="max-h-[60vh] overflow-y-auto">
        {query.length === 0 ? (
          <div className="p-5 space-y-6">
            {/* Recent searches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-label text-muted-foreground">Recent</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-sm text-muted-foreground hover:text-foreground bg-surface hover:bg-surface-hover px-3 py-1.5 rounded-sm transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular searches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-label text-muted-foreground">Popular</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-sm text-muted-foreground hover:text-foreground bg-surface hover:bg-surface-hover px-3 py-1.5 rounded-sm transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending designs */}
            <div>
              <span className="text-label text-muted-foreground mb-3 block">Trending Designs</span>
              <div className="space-y-2">
                {allDesigns.slice(0, 4).map((d: any) => (
                  <Link
                    key={d.id}
                    to={`/designs/${d.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-sm hover:bg-surface transition-colors group"
                  >
                    <div className="w-10 h-10 rounded bg-surface overflow-hidden shrink-0 border border-border/40">
                      <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.products.length} products</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {filteredDesigns.length > 0 && (
              <div>
                <span className="text-label text-muted-foreground mb-3 block">Designs</span>
                <div className="space-y-2">
                  {filteredDesigns.map((d: any) => (
                    <Link
                      key={d.id}
                      to={`/designs/${d.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2 rounded-sm hover:bg-surface transition-colors group"
                    >
                      <div className="w-10 h-10 rounded bg-surface overflow-hidden shrink-0">
                        <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.products.length} products</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div>
                <span className="text-label text-muted-foreground mb-3 block">Products</span>
                <div className="space-y-2">
                  {filteredProducts.map((p: any) => (
                    <Link
                      key={p.id}
                      to={`/shop/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2 rounded-sm hover:bg-surface transition-colors group"
                    >
                      <div className="w-10 h-10 rounded bg-surface overflow-hidden shrink-0">
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-gold transition-colors">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.designName}</p>
                      </div>
                      <span className="text-xs font-medium text-price shrink-0">€{p.price.toFixed(2)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filteredDesigns.length === 0 && filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Try different keywords or browse our collections</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="px-5 py-3 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Press <kbd className="px-1 py-0.5 bg-surface rounded text-[9px]">ESC</kbd> to close</span>
        <span>Press <kbd className="px-1 py-0.5 bg-surface rounded text-[9px]">ENTER</kbd> to search</span>
      </div>
    </div>
  );
}
