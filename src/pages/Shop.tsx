import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, Grid3X3, Grid2X2, ChevronDown } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/brand/ProductCard";
import { products, designs } from "@/data/mock";
import type { ProductType } from "@/data/types";
import { cn } from "@/lib/utils";

const productTypes: { value: ProductType | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "t-shirt", label: "T-Shirts" },
  { value: "hoodie", label: "Hoodies" },
  { value: "sweatshirt", label: "Sweatshirts" },
  { value: "tote-bag", label: "Tote Bags" },
  { value: "mug", label: "Mugs" },
  { value: "phone-case", label: "Phone Cases" },
  { value: "cap", label: "Caps" },
  { value: "poster", label: "Posters" },
  { value: "sticker", label: "Stickers" },
  { value: "notebook", label: "Notebooks" },
  { value: "cushion", label: "Cushions" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best", label: "Best Sellers" },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState<ProductType | "all">(
    (searchParams.get("type") as ProductType | "all") || "all"
  );
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = selectedType === "all"
      ? [...products]
      : products.filter((p) => p.type === selectedType);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best":
        result.sort((a, b) => (a.badge === "bestseller" ? -1 : 1));
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
  }, [selectedType, sortBy]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <p className="text-label text-gold mb-2">Collection</p>
          <h1 className="text-display text-3xl lg:text-4xl">Shop All</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {filtered.length} products · Premium quality · Made to order
          </p>
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-label text-muted-foreground mb-4">Product Type</h3>
              <ul className="space-y-1">
                {productTypes.map((t) => (
                  <li key={t.value}>
                    <button
                      onClick={() => setSelectedType(t.value)}
                      className={cn(
                        "w-full text-left text-sm py-1.5 px-2 rounded-sm transition-colors",
                        selectedType === t.value
                          ? "text-foreground bg-surface font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
                      )}
                    >
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </button>

                {/* Mobile type pills */}
                <div className="flex gap-2 overflow-x-auto lg:hidden pb-1 -mb-1">
                  {productTypes.slice(0, 6).map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setSelectedType(t.value)}
                      className={cn(
                        "text-xs whitespace-nowrap px-3 py-1.5 rounded-full border transition-colors shrink-0",
                        selectedType === t.value
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer pr-6 focus:outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Mobile filters panel */}
            {showFilters && (
              <div className="lg:hidden mb-6 pb-4 border-b border-border/50">
                <div className="grid grid-cols-2 gap-2">
                  {productTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => { setSelectedType(t.value); setShowFilters(false); }}
                      className={cn(
                        "text-sm py-2 px-3 rounded-sm border transition-colors text-left",
                        selectedType === t.value
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filtered.map((p) => {
                  const d = designs.find((dd) => dd.id === p.designId);
                  return (
                    <ProductCard
                      key={p.id}
                      product={p}
                      designSlug={d?.slug}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-sm text-muted-foreground">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
