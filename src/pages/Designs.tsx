import { useState, useMemo } from "react";
import { Link } from "react-router";
import { SlidersHorizontal, Search, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DesignCard } from "@/components/brand/DesignCard";
import { designs, collections } from "@/data/mock";
import { cn } from "@/lib/utils";

const tagFilters = [
  { value: "all", label: "All Designs" },
  { value: "new", label: "New" },
  { value: "bold", label: "Bold" },
  { value: "minimal", label: "Minimal" },
  { value: "graphic", label: "Graphic" },
  { value: "botanical", label: "Botanical" },
  { value: "urban", label: "Urban" },
  { value: "abstract", label: "Abstract" },
  { value: "nature", label: "Nature" },
  { value: "geometric", label: "Geometric" },
  { value: "cosmic", label: "Cosmic" },
  { value: "dark", label: "Dark" },
  { value: "earthy", label: "Earthy" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best", label: "Best Selling" },
  { value: "az", label: "A–Z" },
];

export default function Designs() {
  const [activeTag, setActiveTag] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDesigns = useMemo(() => {
    let result = [...designs];

    // Tag filter
    if (activeTag === "new") {
      result = result.filter((d) => d.isNew);
    } else if (activeTag !== "all") {
      result = result.filter((d) => d.tags.includes(activeTag));
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "best":
        result.sort((a, b) => b.products.length - a.products.length);
        break;
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.products.length - a.products.length;
        });
    }

    return result;
  }, [activeTag, sortBy, searchQuery]);

  return (
    <SiteLayout>
      {/* ─── Hero ─── */}
      <div className="relative overflow-hidden bg-surface/30">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Design-Led</p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]">
                Discover the<br />Designs
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed max-w-md">
                Original designs, made to live beyond one product. Each artwork
                exists across multiple products — find the one you love, then
                choose how you want to wear it.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <a
                  href="#designs-grid"
                  className="px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px] flex items-center"
                >
                  Explore Designs
                </a>
                <Link
                  to="/shop?sort=best"
                  className="px-6 py-3 border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-sm transition-colors min-h-[44px] flex items-center"
                >
                  Shop Best Sellers
                </Link>
              </div>
            </div>

            {/* Editorial visual — grid of design previews */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {designs.slice(0, 4).map((d, i) => (
                <Link
                  key={d.id}
                  to={`/designs/${d.slug}`}
                  className={cn(
                    "rounded-sm overflow-hidden bg-surface group relative",
                    i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                  )}
                >
                  <img
                    src={d.heroImage}
                    alt={d.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs font-medium text-white">{d.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Breadcrumb ─── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Designs</span>
        </nav>
      </div>

      {/* ─── Toolbar: Search + Tags + Sort ─── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Search */}
        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search designs..."
            className="w-full h-10 pl-9 pr-4 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 transition-colors"
            aria-label="Search designs"
          />
        </div>

        {/* Tags + Sort row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1 flex-1">
            {tagFilters.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setActiveTag(tag.value)}
                className={cn(
                  "whitespace-nowrap px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase rounded-full border transition-all shrink-0",
                  activeTag === tag.value
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer pr-5 focus:outline-none min-h-[36px]"
              aria-label="Sort designs"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <SlidersHorizontal className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
          </div>
        </div>

        {/* Result count */}
        <p className="text-xs text-muted-foreground mt-3">
          {filteredDesigns.length} {filteredDesigns.length === 1 ? "design" : "designs"}
          {activeTag !== "all" && (
            <span>
              {" "}· Filtered by{" "}
              <button onClick={() => setActiveTag("all")} className="text-foreground hover:underline">
                {tagFilters.find((t) => t.value === activeTag)?.label}
              </button>
            </span>
          )}
        </p>
      </div>

      {/* ─── Design Grid ─── */}
      <div id="designs-grid" className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
            {filteredDesigns.map((d) => (
              <DesignCard key={d.id} design={d} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-border/50 flex items-center justify-center">
              <Search className="w-6 h-6 text-muted-foreground/40" />
            </div>
            <h3 className="font-display text-lg font-medium mb-2">No designs found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              We couldn't find any designs matching your selection. Try a different filter or search term.
            </p>
            <button
              onClick={() => { setActiveTag("all"); setSearchQuery(""); }}
              className="px-6 py-3 text-xs font-medium uppercase tracking-wider bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]"
            >
              Show All Designs
            </button>
          </div>
        )}
      </div>

      {/* ─── Featured Collections ─── */}
      {collections.length > 0 && (
        <div className="border-t border-border/50 bg-surface/20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Browse by</p>
                <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight">Collections</h2>
              </div>
              <Link to="/collections" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {collections.map((c) => (
                <Link
                  key={c.id}
                  to={`/collections/${c.slug}`}
                  className="group relative aspect-[16/9] rounded-sm overflow-hidden bg-surface"
                >
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">{c.productCount} products</p>
                    <h3 className="text-lg font-display font-medium text-white">{c.name}</h3>
                    <p className="text-xs text-white/60 mt-1 line-clamp-1">{c.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
