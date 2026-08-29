import { useState, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router";
import { SlidersHorizontal, ChevronDown, ChevronRight, X } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/brand/ProductCard";
import { QuickViewModal } from "@/components/brand/QuickViewModal";
import { FilterDrawer, type FilterState } from "@/components/brand/FilterDrawer";
import { EmptyState } from "@/components/brand/EmptyState";
import { products, designs } from "@/data/mock";
import type { ProductType } from "@/data/types";
import { cn } from "@/lib/utils";

/* ─── Category mapping from URL slug to ProductType ─── */
const categoryMap: Record<string, { type: ProductType; label: string; description: string }> = {
  "t-shirts": { type: "t-shirt", label: "T-Shirts", description: "Designed for everyday expression. Graphic, minimal and artistic designs on premium tees." },
  "hoodies": { type: "hoodie", label: "Hoodies", description: "Bold designs on heavyweight fleece. Warm, comfortable, and unmistakably yours." },
  "sweatshirts": { type: "sweatshirt", label: "Sweatshirts", description: "Midweight comfort meets original artwork. Effortless layering for any season." },
  "tote-bags": { type: "tote-bag", label: "Tote Bags", description: "Carry the design with you. Organic canvas totes built for daily use." },
  "mugs": { type: "mug", label: "Mugs", description: "Start your morning with original art. Ceramic mugs printed with intention." },
  "phone-cases": { type: "phone-case", label: "Phone Cases", description: "Protect your phone with designs that stand out. Slim, durable, wireless-charge ready." },
  "caps": { type: "cap", label: "Caps", description: "Structured caps with embroidered designs. Everyday headwear, elevated." },
  "posters": { type: "poster", label: "Posters & Wall Art", description: "Gallery-quality prints. Original designs for your walls, printed on archival paper." },
  "stickers": { type: "sticker", label: "Stickers", description: "Waterproof vinyl stickers. Small designs with big personality." },
  "notebooks": { type: "notebook", label: "Notebooks", description: "Hardcover notebooks with design covers. 192 pages of possibility." },
  "cushions": { type: "cushion", label: "Cushions", description: "Decorative cushions featuring original designs. 45×45cm, hidden zipper." },
  "kids": { type: "kids-t-shirt", label: "Kids T-Shirts", description: "The same great designs, scaled for little ones. Organic cotton, tag-free." },
  "baby": { type: "baby-onesie", label: "Baby Onesies", description: "Original designs for the youngest fans. Soft organic cotton onesies." },
};

const allCategoryTabs = Object.entries(categoryMap).map(([slug, cat]) => ({
  slug,
  label: cat.label,
}));

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const defaultFilters: FilterState = {
  types: [],
  sizes: [],
  colors: [],
  priceRange: [],
  collections: [],
  designStyles: [],
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categoryMap[slug || ""] || categoryMap["t-shirts"];
  const activeType = category.type;

  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const handleClearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setVisibleCount(12);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.type === activeType);

    // Filter drawer filters
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes?.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }
    if (filters.priceRange.length > 0) {
      result = result.filter((p) => {
        return filters.priceRange.some((range) => {
          switch (range) {
            case "under-20": return p.price < 20;
            case "20-30": return p.price >= 20 && p.price < 30;
            case "30-50": return p.price >= 30 && p.price < 50;
            case "50-plus": return p.price >= 50;
            default: return true;
          }
        });
      });
    }

    // Sort
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "best":
        result.sort((a, b) => {
          if (a.badge === "bestseller" && b.badge !== "bestseller") return -1;
          if (b.badge === "bestseller" && a.badge !== "bestseller") return 1;
          return 0;
        });
        break;
      case "newest":
      default:
        result.sort((a, b) => {
          const dA = designs.find((d) => d.id === a.designId);
          const dB = designs.find((d) => d.id === b.designId);
          return (dB?.createdAt || "").localeCompare(dA?.createdAt || "");
        });
    }

    return result;
  }, [activeType, sortBy, filters]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const activeFilterCount = filters.sizes.length + filters.colors.length + filters.priceRange.length + filters.designStyles.length;

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{category.label}</span>
        </nav>
      </div>

      {/* Category Hero */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">{category.label}</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
            {category.label}
          </h1>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-lg">
            {category.description}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-y border-border/50 bg-surface/30">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-none py-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {allCategoryTabs.map((cat) => {
              const isActive = cat.slug === slug;
              return (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  className={cn(
                    "whitespace-nowrap px-4 py-3.5 text-xs tracking-wider transition-all border-b-2 shrink-0",
                    isActive
                      ? "text-foreground border-foreground font-medium"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/30"
                  )}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter + Sort Toolbar */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold text-background text-[10px] font-medium flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <div className="hidden md:flex items-center gap-1.5">
                {filters.sizes.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 bg-surface rounded-sm text-muted-foreground">
                    Size: {s}
                    <button onClick={() => setFilters({ ...filters, sizes: filters.sizes.filter((x) => x !== s) })} className="hover:text-foreground">
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
                {filters.colors.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 bg-surface rounded-sm text-muted-foreground">
                    {c}
                    <button onClick={() => setFilters({ ...filters, colors: filters.colors.filter((x) => x !== c) })} className="hover:text-foreground">
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={handleClearFilters}
                  className="text-[10px] text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            <span className="text-xs text-muted-foreground hidden sm:block">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer pr-6 focus:outline-none min-h-[44px]"
              aria-label="Sort products"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {visibleProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
              {visibleProducts.map((p) => {
                const d = designs.find((dd) => dd.id === p.designId);
                return (
                  <ProductCard
                    key={p.id}
                    product={p}
                    designSlug={d?.slug}
                    onQuickView={setQuickViewProduct}
                  />
                );
              })}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((c) => c + 12)}
                  className="px-8 py-3 text-xs font-medium uppercase tracking-wider border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all min-h-[44px]"
                >
                  Load More ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No products found"
            description={`No ${category.label.toLowerCase()} match your current filters. Try adjusting your selection.`}
            action={
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 text-xs font-medium uppercase tracking-wider bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]"
              >
                Clear Filters
              </button>
            }
          />
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={setFilters}
        onClear={handleClearFilters}
      />

      {/* Quick View */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          designSlug={designs.find((d) => d.id === quickViewProduct.designId)?.slug}
          open={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </SiteLayout>
  );
}
