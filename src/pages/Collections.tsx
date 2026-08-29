import { Link } from "react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { collections, designs } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function Collections() {
  return (
    <SiteLayout>
      {/* ─── Hero ─── */}
      <div className="relative overflow-hidden bg-surface/30">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Curated</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]">
              Collections
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed max-w-lg">
              Thoughtfully curated groupings of designs united by a shared aesthetic.
              Explore by mood, style, or season.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Breadcrumb ─── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Collections</span>
        </nav>
      </div>

      {/* ─── Collections Grid (varied layout) ─── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Featured / first collection — large editorial */}
        {collections[0] && (
          <Link
            to={`/collections/${collections[0].slug}`}
            className="group block relative aspect-[21/9] lg:aspect-[3/1] rounded-sm overflow-hidden bg-surface mb-4"
          >
            <img
              src={collections[0].image}
              alt={collections[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14 max-w-lg">
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-2">Featured Collection</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white tracking-tight">
                {collections[0].name}
              </h2>
              <p className="text-sm text-white/60 mt-2 leading-relaxed line-clamp-2">
                {collections[0].description}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-xs font-medium text-white uppercase tracking-wider">
                  Explore Collection
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/60 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        )}

        {/* Middle row — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {collections.slice(1, 3).map((c) => (
            <Link
              key={c.id}
              to={`/collections/${c.slug}`}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-surface"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">
                  {c.productCount} products
                </p>
                <h3 className="font-display text-xl md:text-2xl font-medium text-white tracking-tight">
                  {c.name}
                </h3>
                <p className="text-xs text-white/50 mt-1 line-clamp-1">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row — 3 columns */}
        {collections.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.slice(3).map((c) => (
              <Link
                key={c.id}
                to={`/collections/${c.slug}`}
                className="group relative aspect-[4/5] sm:aspect-[3/4] rounded-sm overflow-hidden bg-surface"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">
                      {c.productCount} products
                    </p>
                    <h3 className="font-display text-lg font-medium text-white tracking-tight">
                      {c.name}
                    </h3>
                    <p className="text-xs text-white/50 mt-1 line-clamp-1">{c.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ─── Browse by Design Style ─── */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Explore</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight">Browse by Style</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {["Minimal", "Bold", "Graphic", "Botanical", "Urban", "Abstract", "Geometric", "Cosmic", "Dark", "Earthy", "Nature", "Typography"].map((style) => {
              const count = designs.filter((d) =>
                d.tags.includes(style.toLowerCase())
              ).length;
              return (
                <Link
                  key={style}
                  to={`/designs?tag=${style.toLowerCase()}`}
                  className="flex flex-col items-center justify-center py-6 px-3 rounded-sm border border-border/50 hover:border-foreground/30 transition-all group bg-surface/30"
                >
                  <span className="text-sm font-medium group-hover:text-gold transition-colors">{style}</span>
                  {count > 0 && (
                    <span className="text-[10px] text-muted-foreground mt-1">{count} designs</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
