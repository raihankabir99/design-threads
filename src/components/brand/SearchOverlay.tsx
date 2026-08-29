import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { designs, products, collections, blogPosts, formatPrice, productTypeLabel } from "@/data/mock";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const popularSearches = ["Midnight Lion", "Hoodie", "Minimal", "Tokyo", "Streetwear", "Gift", "Tote Bag", "Poster"];

const recentSearches = ["new drops", "black hoodie", "botanical", "poster art"];

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const q = query.trim().toLowerCase();
  const isSearching = q.length > 0;

  // Filtered results
  const matchedDesigns = isSearching
    ? designs.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q))
      )
    : [];

  const matchedProducts = isSearching
    ? products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.designName.toLowerCase().includes(q) ||
        productTypeLabel(p.type).toLowerCase().includes(q)
      ).slice(0, 6)
    : [];

  const matchedCollections = isSearching
    ? collections.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      )
    : [];

  const matchedBlog = isSearching
    ? blogPosts.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 2)
    : [];

  const hasResults = matchedDesigns.length > 0 || matchedProducts.length > 0 || matchedCollections.length > 0 || matchedBlog.length > 0;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] transition-opacity duration-200",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative mx-auto max-w-2xl mt-16 md:mt-20 px-4 transition-all duration-300",
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        )}
      >
        <div className="bg-background border border-border/60 rounded-sm shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 h-14 border-b border-border/50">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, designs and collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              aria-label="Search"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Clear search">
                <X className="h-4 w-4" />
              </button>
            )}
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors ml-1" aria-label="Close search">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[65vh] overflow-y-auto">
            {!isSearching ? (
              /* ─── Default: Suggestions ─── */
              <div className="p-5 space-y-6">
                {/* Popular searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-xs text-muted-foreground hover:text-foreground bg-surface hover:bg-surface-hover px-3 py-1.5 rounded-sm transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-xs text-muted-foreground hover:text-foreground bg-surface hover:bg-surface-hover px-3 py-1.5 rounded-sm transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending designs */}
                <div>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-3 block">Trending Designs</span>
                  <div className="space-y-1">
                    {designs.slice(0, 4).map((d) => (
                      <Link
                        key={d.id}
                        to={`/designs/${d.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-surface transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-sm bg-surface overflow-hidden shrink-0 border border-border/30">
                          <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</p>
                          <p className="text-[11px] text-muted-foreground">{d.products.length} products · {d.tags[0]}</p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-gold transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : !hasResults ? (
              /* ─── No results ─── */
              <div className="text-center py-12 px-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-border/50 flex items-center justify-center">
                  <Search className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <p className="text-sm font-medium mb-1">No results for "{query}"</p>
                <p className="text-xs text-muted-foreground">Try different keywords or browse our collections</p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-4 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              /* ─── Search results by category ─── */
              <div className="p-5 space-y-5">
                {/* Designs */}
                {matchedDesigns.length > 0 && (
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-3 block">
                      Designs ({matchedDesigns.length})
                    </span>
                    <div className="space-y-1">
                      {matchedDesigns.map((d) => (
                        <Link
                          key={d.id}
                          to={`/designs/${d.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-surface transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-sm bg-surface overflow-hidden shrink-0 border border-border/30">
                            <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</p>
                            <p className="text-[11px] text-muted-foreground">{d.products.length} products · {d.tags.join(", ")}</p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-gold transition-colors shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {matchedProducts.length > 0 && (
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-3 block">
                      Products ({matchedProducts.length})
                    </span>
                    <div className="space-y-1">
                      {matchedProducts.map((p) => (
                        <Link
                          key={p.id}
                          to={`/shop/${p.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-surface transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-sm bg-surface overflow-hidden shrink-0 border border-border/30">
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate group-hover:text-gold transition-colors">{p.title}</p>
                            <p className="text-[11px] text-muted-foreground">{p.designName} · {productTypeLabel(p.type)}</p>
                          </div>
                          <span className="text-xs font-medium text-price shrink-0">{formatPrice(p.price)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collections */}
                {matchedCollections.length > 0 && (
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-3 block">
                      Collections
                    </span>
                    <div className="space-y-1">
                      {matchedCollections.map((c) => (
                        <Link
                          key={c.id}
                          to={`/collections/${c.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-surface transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-sm bg-surface overflow-hidden shrink-0 border border-border/30">
                            <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium group-hover:text-gold transition-colors">{c.name}</p>
                            <p className="text-[11px] text-muted-foreground">{c.productCount} products</p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-gold transition-colors shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog */}
                {matchedBlog.length > 0 && (
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-3 block">
                      From the Journal
                    </span>
                    <div className="space-y-1">
                      {matchedBlog.map((b) => (
                        <Link
                          key={b.id}
                          to={`/blog/${b.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-surface transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-sm bg-surface overflow-hidden shrink-0 border border-border/30">
                            <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate group-hover:text-gold transition-colors">{b.title}</p>
                            <p className="text-[11px] text-muted-foreground">{b.category} · {b.readTime}</p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-gold transition-colors shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer hints */}
          <div className="px-5 py-3 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground/60">
            <span>Press <kbd className="px-1 py-0.5 bg-surface rounded text-[9px]">ESC</kbd> to close</span>
            <span>{isSearching ? `${matchedDesigns.length + matchedProducts.length} results` : "Type to search"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
