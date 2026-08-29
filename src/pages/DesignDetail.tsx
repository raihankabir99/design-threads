import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import {
  Heart, Minus, Plus, ChevronRight, Truck, RotateCcw, Shield, Star,
  Eye, ChevronDown,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/brand/ProductCard";
import { ImageViewer } from "@/components/brand/ImageViewer";
import { SizeGuideModal } from "@/components/brand/SizeGuideModal";
import { ProductAccordion } from "@/components/brand/ProductAccordion";
import { DeliveryEstimator } from "@/components/brand/DeliveryEstimator";
import { ReviewSection } from "@/components/brand/ReviewSection";
import { StickyMobileCartBar } from "@/components/brand/StickyMobileCartBar";
import { CommentSection } from "@/components/brand/CommentSection";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  getDesignBySlug, getProductsByDesign, productTypeLabel, formatPrice, products as allProducts,
} from "@/data/mock";
import { designs } from "@/data/mock";
import type { ProductType } from "@/data/types";
import { cn } from "@/lib/utils";

/* ─── Product type icons for the switcher ─── */
const typeVisuals: Record<ProductType, { label: string; shortLabel: string; icon: string }> = {
  "t-shirt": { label: "T-Shirt", shortLabel: "Tee", icon: "👕" },
  "hoodie": { label: "Hoodie", shortLabel: "Hoodie", icon: "🧥" },
  "sweatshirt": { label: "Sweatshirt", shortLabel: "Sweat", icon: "🧶" },
  "tote-bag": { label: "Tote Bag", shortLabel: "Tote", icon: "👜" },
  "mug": { label: "Mug", shortLabel: "Mug", icon: "☕" },
  "phone-case": { label: "Phone Case", shortLabel: "Phone", icon: "📱" },
  "cap": { label: "Cap", shortLabel: "Cap", icon: "🧢" },
  "poster": { label: "Poster", shortLabel: "Poster", icon: "🖼️" },
  "sticker": { label: "Sticker", shortLabel: "Sticker", icon: "🏷️" },
  "notebook": { label: "Notebook", shortLabel: "Book", icon: "📓" },
  "cushion": { label: "Cushion", shortLabel: "Cushion", icon: "🛋️" },
  "kids-t-shirt": { label: "Kids T-Shirt", shortLabel: "Kids", icon: "👶" },
  "baby-onesie": { label: "Baby Onesie", shortLabel: "Baby", icon: "🍼" },
};

export default function DesignDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const design = getDesignBySlug(slug || "");
  const allDesignProducts = design ? getProductsByDesign(design.id) : [];

  const { addItem } = useCart();
  const { toggle, has } = useWishlist();

  // Active product type from URL
  const activeType = (searchParams.get("type") as ProductType) || allDesignProducts[0]?.type;
  const activeProduct = allDesignProducts.find((p) => p.type === activeType);

  // Selection state
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // Modals
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Sticky purchase area reference
  const purchaseAreaRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Recently viewed (mock local state)
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Track recently viewed
  useEffect(() => {
    if (design) {
      setRecentlyViewed((prev) => {
        const next = [design.id, ...prev.filter((id) => id !== design.id)].slice(0, 6);
        return next;
      });
    }
  }, [design]);

  // Observe purchase area for sticky bar
  useEffect(() => {
    if (!purchaseAreaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(purchaseAreaRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset selections when product type changes
  const switchType = useCallback((type: ProductType) => {
    setSearchParams({ type }, { replace: true });
    setSelectedColor(0);
    setSelectedSize(0);
    setActiveImage(0);
    setQuantity(1);
    setAddedToCart(false);
  }, [setSearchParams]);

  if (!design) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Design not found</p>
            <Link to="/designs" className="text-sm text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
              Browse all designs
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const isWishlisted = has(design.id);
  const color = activeProduct?.colors[selectedColor];
  const images = activeProduct?.images || [design.heroImage];

  const handleAddToCart = () => {
    if (!activeProduct || !color) return;
    addItem({
      productId: activeProduct.id,
      designId: design.id,
      type: activeProduct.type as ProductType,
      designName: design.name,
      title: activeProduct.title,
      color: color.name,
      colorHex: color.hex,
      size: activeProduct.sizes?.[selectedSize],
      price: activeProduct.price,
      image: images[0],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Accordion items
  const accordionItems = [
    {
      title: "Details",
      content: activeProduct?.details || ["Premium quality", "Designed in Europe", "Printed to order"],
    },
    {
      title: "Materials",
      content: activeProduct?.type === "t-shirt" || activeProduct?.type === "kids-t-shirt"
        ? ["100% organic cotton", "180 GSM fabric", "Pre-shrunk", "Side-seamed construction"]
        : activeProduct?.type === "hoodie"
          ? ["80% cotton, 20% polyester", "320 GSM fleece", "Kangaroo pocket", "Ribbed cuffs and hem"]
          : ["Premium quality materials", "Designed for durability", "Printed with archival inks"],
    },
    {
      title: "Fit & Size",
      content: "Regular fit. True to size. For detailed measurements, please refer to our Size Guide.",
    },
    {
      title: "Care",
      content: [
        "Machine wash cold, inside out",
        "Do not bleach",
        "Tumble dry low",
        "Do not iron directly on print",
        "Do not dry clean",
      ],
    },
    {
      title: "Shipping",
      content: [
        "Ships within 2–4 business days",
        "Free shipping on orders over €50",
        "Estimated delivery: 5–14 business days depending on location",
        "International shipping available to 50+ countries",
      ],
    },
    {
      title: "Returns",
      content: [
        "30-day return policy",
        "Items must be unworn and in original condition",
        "Return shipping covered within the EU",
        "Refund processed within 5–7 business days",
      ],
    },
  ];

  // Related products: different designs, same category
  const relatedDesigns = designs
    .filter((d) => d.id !== design.id)
    .slice(0, 4);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground overflow-x-auto" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors shrink-0">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/shop" className="hover:text-foreground transition-colors shrink-0">Shop</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/designs" className="hover:text-foreground transition-colors shrink-0">Designs</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground truncate">{design.name}</span>
          {activeProduct && (
            <>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="text-foreground truncate">{productTypeLabel(activeProduct.type as ProductType)}</span>
            </>
          )}
        </nav>
      </div>

      {/* Main Product Area */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-8 lg:gap-12 xl:gap-16">

          {/* ─── LEFT: Image Gallery ─── */}
          <div className="space-y-3">
            {/* Main image */}
            <div
              className="aspect-[3/4] lg:aspect-[4/5] rounded-sm overflow-hidden bg-surface relative cursor-zoom-in group"
              onClick={() => { setViewerIndex(activeImage); setViewerOpen(true); }}
              role="button"
              aria-label="View full image"
            >
              <img
                src={images[activeImage]}
                alt={`${design.name} — ${activeProduct ? productTypeLabel(activeProduct.type as ProductType) : ""}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80">
                  <Eye className="h-3.5 w-3.5" />
                </div>
              </div>
              {/* New badge */}
              {design.isNew && (
                <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-gold text-background rounded-sm">
                  New
                </span>
              )}
              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-3 text-[10px] text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                  {activeImage + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "w-16 h-20 lg:w-20 lg:h-24 rounded-sm overflow-hidden bg-surface border-2 transition-all shrink-0",
                      activeImage === i ? "border-foreground" : "border-transparent opacity-50 hover:opacity-80"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── RIGHT: Product Information ─── */}
          <div className="flex flex-col" ref={purchaseAreaRef}>
            {/* Design name + type */}
            <div className="mb-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Design</p>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">
                {design.name}
              </h1>
              {activeProduct && (
                <p className="text-sm text-muted-foreground mt-1">
                  {productTypeLabel(activeProduct.type as ProductType)}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5", i < 4 ? "text-gold fill-gold" : i < 5 ? "text-gold/50 fill-gold/50" : "text-muted-foreground/20")} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">4.8 · 128 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-xl font-medium text-price">{activeProduct ? formatPrice(activeProduct.price) : ""}</span>
              {activeProduct?.compareAtPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(activeProduct.compareAtPrice)}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-red-600 text-white rounded-sm">Sale</span>
                </>
              )}
            </div>

            {/* ─── Product Type Switcher ─── */}
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-3">
                Choose Your Product
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-1.5">
                {allDesignProducts.map((p) => {
                  const v = typeVisuals[p.type as ProductType];
                  const isActive = p.type === activeType;
                  return (
                    <button
                      key={p.type}
                      onClick={() => switchType(p.type as ProductType)}
                      className={cn(
                        "flex flex-col items-center gap-1 py-3 px-1 rounded-sm border transition-all min-h-[60px]",
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-surface/30"
                      )}
                    >
                      <span className="text-base leading-none">{v.icon}</span>
                      <span className="text-[10px] font-medium leading-tight text-center">{v.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ─── Color Selector ─── */}
            {activeProduct && activeProduct.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-2.5">
                  Color — <span className="text-foreground normal-case tracking-normal">{color?.name}</span>
                </p>
                <div className="flex items-center gap-2.5">
                  {activeProduct.colors.map((c, i) => (
                    <button
                      key={`${activeType}-${c.name}`}
                      onClick={() => setSelectedColor(i)}
                      className={cn(
                        "w-9 h-9 rounded-full border-2 transition-all relative",
                        selectedColor === i
                          ? "border-foreground scale-110 ring-1 ring-foreground/20"
                          : "border-border/40 hover:border-foreground/40"
                      )}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Color: ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ─── Size Selector ─── */}
            {activeProduct && activeProduct.sizes && activeProduct.sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    Size — <span className="text-foreground normal-case tracking-normal">{activeProduct.sizes[selectedSize]}</span>
                  </p>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.sizes.map((size, i) => (
                    <button
                      key={`${activeType}-${size}`}
                      onClick={() => setSelectedSize(i)}
                      className={cn(
                        "min-w-[44px] h-10 px-3 text-xs font-medium rounded-sm border transition-all",
                        selectedSize === i
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Quantity + Add to Cart ─── */}
            <div className="flex gap-3 mb-5">
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-sm font-medium tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 h-10 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all min-h-[44px]",
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]"
                )}
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => toggle(design.id)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-sm border transition-all shrink-0",
                  isWishlisted
                    ? "bg-gold/10 border-gold/30 text-gold"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                )}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
              </button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 py-4 mb-5 border-y border-border/50">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-4 w-4 text-muted-foreground mb-1" />
                <p className="text-[10px] text-muted-foreground leading-tight">Free Shipping<br />€50+</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-4 w-4 text-muted-foreground mb-1" />
                <p className="text-[10px] text-muted-foreground leading-tight">30-Day<br />Returns</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-4 w-4 text-muted-foreground mb-1" />
                <p className="text-[10px] text-muted-foreground leading-tight">Premium<br />Quality</p>
              </div>
            </div>

            {/* Delivery Estimator */}
            <div className="mb-6">
              <DeliveryEstimator />
            </div>

            {/* Accordion */}
            <ProductAccordion items={accordionItems} defaultOpen={0} />
          </div>
        </div>
      </div>

      {/* ─── Design Story ─── */}
      <div className="border-t border-border/50 bg-surface/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="aspect-square lg:aspect-[4/5] rounded-sm overflow-hidden bg-surface">
              <img src={design.heroImage} alt={design.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">The Design</p>
              <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-4">{design.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{design.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Every design begins as an original artwork — sketched, refined, and digitized with
                obsessive attention to detail. This piece was created to translate across materials and
                product types without losing its impact, whether printed on organic cotton or embossed on
                ceramic.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to={`/designs/${design.slug}`}
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  View All Products
                </Link>
                <Link
                  to="/designs"
                  className="text-xs font-medium uppercase tracking-wider text-gold hover:text-gold/80 transition-colors"
                >
                  Explore All Designs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Shop the Design (same design, many products) ─── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Shop the Design</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight">
              {design.name} Across the Collection
            </h2>
          </div>
        </div>

        {/* Horizontal product family cards */}
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
          {allDesignProducts.map((p) => {
            const v = typeVisuals[p.type as ProductType];
            const isActive = p.type === activeType;
            return (
              <button
                key={p.id}
                onClick={() => switchType(p.type as ProductType)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-sm border transition-all shrink-0 min-w-[100px]",
                  isActive
                    ? "border-foreground bg-foreground/5"
                    : "border-border/50 hover:border-foreground/30 bg-surface/30"
                )}
              >
                <div className="w-14 h-14 rounded-sm overflow-hidden bg-surface border border-border/30">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-medium text-center leading-tight">{v.shortLabel}</p>
                <p className="text-[10px] text-muted-foreground">{formatPrice(p.price)}</p>
              </button>
            );
          })}
        </div>

        {/* Full product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mt-8">
          {allDesignProducts.map((p) => (
            <ProductCard key={p.id} product={p} designSlug={design.slug} />
          ))}
        </div>
      </div>

      {/* ─── Reviews ─── */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Reviews</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-10">
            Loved by the Community
          </h2>
          <ReviewSection />
        </div>
      </div>

      {/* ─── Comments ─── */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <CommentSection designName={design.name} />
        </div>
      </div>

      {/* ─── You May Also Like (different designs) ─── */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">You May Also Like</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">
            More from FAYANITY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedDesigns.map((d) => (
              <Link key={d.id} to={`/designs/${d.slug}`} className="group block">
                <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface mb-3">
                  <img
                    src={d.heroImage}
                    alt={d.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-0.5">
                  {d.products.length} products
                </p>
                <h3 className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Recently Viewed ─── */}
      {recentlyViewed.length > 1 && (
        <div className="border-t border-border/50">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h3 className="font-display text-lg font-medium tracking-tight mb-6">Recently Viewed</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {recentlyViewed.filter((id) => id !== design.id).slice(0, 5).map((id) => {
                const d = designs.find((x) => x.id === id);
                if (!d) return null;
                return (
                  <Link key={d.id} to={`/designs/${d.slug}`} className="group block">
                    <div className="aspect-square rounded-sm overflow-hidden bg-surface mb-2">
                      <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                    </div>
                    <p className="text-xs font-medium group-hover:text-gold transition-colors truncate">{d.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sticky mobile purchase bar */}
      <StickyMobileCartBar
        price={activeProduct?.price || 0}
        compareAtPrice={activeProduct?.compareAtPrice}
        onAddToCart={handleAddToCart}
        added={addedToCart}
      />

      {/* Modals */}
      <ImageViewer
        images={images}
        initialIndex={viewerIndex}
        alt={`${design.name} — product`}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />

      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        productType={activeProduct?.type || "t-shirt"}
      />
    </SiteLayout>
  );
}
