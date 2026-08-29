import { useState } from "react";
import { Link } from "react-router";
import { Search as SearchIcon } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { designs, products } from "@/data/mock";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredDesigns = query.length > 1
    ? designs.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.tags.some(t => t.includes(query.toLowerCase())))
    : [];

  const filteredProducts = query.length > 1
    ? products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.designName.toLowerCase().includes(query.toLowerCase())).slice(0, 12)
    : [];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-display text-3xl lg:text-4xl mb-6">Search</h1>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search designs, products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
                autoFocus
              />
            </div>
          </div>

          {filteredDesigns.length > 0 && (
            <div className="mb-8">
              <h2 className="text-label text-muted-foreground mb-4">Designs</h2>
              <div className="space-y-2">
                {filteredDesigns.map((d) => (
                  <Link key={d.id} to={`/designs/${d.slug}`} className="flex items-center gap-3 p-3 rounded-sm hover:bg-surface transition-colors group">
                    <div className="w-12 h-12 rounded bg-surface overflow-hidden shrink-0">
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
              <h2 className="text-label text-muted-foreground mb-4">Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <Link key={p.id} to={`/shop/${p.slug}`} className="group block">
                    <div className="aspect-square rounded-sm overflow-hidden bg-surface mb-2">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{p.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query.length > 1 && filteredDesigns.length === 0 && filteredProducts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">No results found for "{query}"</p>
          )}

          {query.length <= 1 && (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">Type at least 2 characters to search</p>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
