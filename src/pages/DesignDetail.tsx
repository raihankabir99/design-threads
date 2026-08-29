import { useState, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import { ArrowRight, Heart } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/brand/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import {
  getDesignBySlug,
  getProductsByDesign,
  productTypeLabel,
  formatPrice,
} from "@/data/mock";
import { designs } from "@/data/mock";
import type { ProductType } from "@/data/types";
import { cn } from "@/lib/utils";

const typeIcons: Record<ProductType, string> = {
  "t-shirt": "Tee",
  "hoodie": "Hoodie",
  "sweatshirt": "Sweat",
  "tote-bag": "Tote",
  "mug": "Mug",
  "phone-case": "Phone",
  "cap": "Cap",
  "poster": "Poster",
  "sticker": "Sticker",
  "notebook": "Book",
  "cushion": "Cushion",
  "kids-t-shirt": "Kids",
  "baby-onesie": "Baby",
};

export default function DesignDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const design = getDesignBySlug(slug || "");
  const allProducts = design ? getProductsByDesign(design.id) : [];
  const { toggle, has } = useWishlist();

  const activeType = (searchParams.get("type") as ProductType) || allProducts[0]?.type;
  const activeProduct = allProducts.find((p) => p.type === activeType);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  if (!design) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Design not found</p>
            <Link to="/designs" className="text-sm text-gold hover:text-gold-light transition-colors">
              Browse all designs
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const isWishlisted = has(design.id);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/designs" className="hover:text-foreground transition-colors">Designs</Link>
          <span>/</span>
          <span className="text-foreground">{design.name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          {/* Image */}
          <div className="aspect-[4/5] lg:aspect-square rounded-sm overflow-hidden bg-surface relative">
            <img
              src={activeProduct?.mockupImage || design.heroImage}
              alt={design.name}
              className="w-full h-full object-cover"
            />
            {design.isNew && (
              <span className="absolute top-4 left-4 text-label text-gold bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                New
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-label text-gold mb-3">Design</p>
            <h1 className="text-display text-3xl lg:text-5xl mb-4">{design.name}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-8">
              {design.description}
            </p>

            {/* Product type selector */}
            <div className="mb-6">
              <p className="text-label text-muted-foreground mb-3">Available On</p>
              <div className="flex flex-wrap gap-2">
                {allProducts.map((p) => (
                  <button
                    key={p.type}
                    onClick={() => {
                      setSearchParams({ type: p.type });
                      setSelectedColor(0);
                      setSelectedSize(0);
                    }}
                    className={cn(
                      "px-3 py-2 text-xs font-medium rounded-sm border transition-all",
                      activeType === p.type
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    )}
                  >
                    {typeIcons[p.type] || productTypeLabel(p.type)}
                  </button>
                ))}
              </div>
            </div>

            {/* Active product info */}
            {activeProduct && (
              <div className="space-y-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-lg font-medium text-price">{formatPrice(activeProduct.price)}</span>
                  {activeProduct.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(activeProduct.compareAtPrice)}
                    </span>
                  )}
                </div>

                {/* Color selector */}
                {activeProduct.colors.length > 1 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Color: <span className="text-foreground">{activeProduct.colors[selectedColor]?.name}</span>
                    </p>
                    <div className="flex gap-2">
                      {activeProduct.colors.map((color, i) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(i)}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            selectedColor === i ? "border-foreground scale-110" : "border-border/40 hover:border-foreground/30"
                          )}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size selector */}
                {activeProduct.sizes && activeProduct.sizes.length > 1 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Size: <span className="text-foreground">{activeProduct.sizes[selectedSize]}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.sizes.map((size, i) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(i)}
                          className={cn(
                            "min-w-[44px] h-10 px-3 text-xs font-medium rounded-sm border transition-all",
                            selectedSize === i
                              ? "bg-foreground text-background border-foreground"
                              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Link
                    to={`/shop/${activeProduct.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 h-12 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
                  >
                    View Product
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => toggle(design.id)}
                    className={cn(
                      "w-12 h-12 flex items-center justify-center rounded-sm border transition-all",
                      isWishlisted
                        ? "bg-gold/10 border-gold/30 text-gold"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    )}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                  </button>
                </div>

                {/* Details */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Premium quality · Made to order · Ships worldwide · Designed in Europe
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product grid — all products with this design */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-label text-gold mb-2">Explore</p>
              <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight">
                {design.name} Across All Products
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {allProducts.map((p) => (
              <ProductCard key={p.id} product={p} designSlug={design.slug} />
            ))}
          </div>
        </div>

        {/* More designs */}
        <div className="mt-20 lg:mt-28 pt-12 border-t border-border/50">
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">
            More Designs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {designs
              .filter((d) => d.id !== design.id)
              .slice(0, 4)
              .map((d) => (
                <Link
                  key={d.id}
                  to={`/designs/${d.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface mb-3">
                    <img
                      src={d.heroImage}
                      alt={d.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.products.length} products</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
