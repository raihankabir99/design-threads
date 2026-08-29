import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { designs, products } from "@/data/mock";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const popularSearches = ["Midnight Lion", "Hoodie", "Tokyo", "Botanical", "Tote Bag"];
const recentSearches = ["new drops", "black hoodie", "poster art"];

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

  const filteredDesigns = query.length > 0
    ? designs.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const filteredProducts = query.length > 0
    ? products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.designName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

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
          "relative mx-auto max-w-2xl mt-20 px-4 transition-all duration-300",
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
              placeholder="Search designs, products, collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close search">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results / Suggestions */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.length === 0 ? (
              <div className="p-5 space-y-6">
                {/* Recent searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
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
                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
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

                {/* Suggested designs */}
                <div>
                  <span className="text-label text-muted-foreground mb-3 block">Suggested Designs</span>
                  <div className="space-y-2">
                    {designs.slice(0, 4).map((d) => (
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
              </div>
            ) : (
              <div className="p-5 space-y-5">
                {filteredDesigns.length > 0 && (
                  <div>
                    <span className="text-label text-muted-foreground mb-3 block">Designs</span>
                    <div className="space-y-2">
                      {filteredDesigns.map((d) => (
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
                      {filteredProducts.map((p) => (
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
                    <p className="text-xs text-muted-foreground/60 mt-1">Try different keywords</p>
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
      </div>
    </div>
  );
}
