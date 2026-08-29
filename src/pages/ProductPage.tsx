import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  Heart, Minus, Plus, ChevronRight, Truck, RotateCcw, Shield, Star, Eye,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/brand/ProductCard";
import { ImageViewer } from "@/components/brand/ImageViewer";
import { SizeGuideModal } from "@/components/brand/SizeGuideModal";
import { ProductAccordion } from "@/components/brand/ProductAccordion";
import { DeliveryEstimator } from "@/components/brand/DeliveryEstimator";
import { ReviewSection } from "@/components/brand/ReviewSection";
import { StickyMobileCartBar } from "@/components/brand/StickyMobileCartBar";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  getDesignBySlug, getProductsByDesign, getProductByDesignAndType,
  productTypeLabel, formatPrice, designs as allDesigns,
} from "@/data/mock";
import type { ProductType } from "@/data/types";
import { cn } from "@/lib/utils";

const typeVisuals: Record<ProductType, { label: string; shortLabel: string }> = {
  "t-shirt": { label: "T-Shirt", shortLabel: "Tee" },
  "hoodie": { label: "Hoodie", shortLabel: "Hoodie" },
  "sweatshirt": { label: "Sweatshirt", shortLabel: "Sweat" },
  "tote-bag": { label: "Tote Bag", shortLabel: "Tote" },
  "mug": { label: "Mug", shortLabel: "Mug" },
  "phone-case": { label: "Phone Case", shortLabel: "Phone" },
  "cap": { label: "Cap", shortLabel: "Cap" },
  "poster": { label: "Poster", shortLabel: "Poster" },
  "sticker": { label: "Sticker", shortLabel: "Sticker" },
  "notebook": { label: "Notebook", shortLabel: "Book" },
  "cushion": { label: "Cushion", shortLabel: "Cushion" },
  "kids-t-shirt": { label: "Kids T-Shirt", shortLabel: "Kids" },
  "baby-onesie": { label: "Baby Onesie", shortLabel: "Baby" },
};

const typeToUrlPart: Record<ProductType, string> = {
  "t-shirt": "t-shirt", "hoodie": "hoodie", "sweatshirt": "sweatshirt",
  "tote-bag": "tote-bag", "mug": "mug", "phone-case": "phone-case",
  "cap": "cap", "poster": "poster", "sticker": "sticker",
  "notebook": "notebook", "cushion": "cushion",
  "kids-t-shirt": "kids-t-shirt", "baby-onesie": "baby-onesie",
};

export default function ProductPage() {
  const { "design-slug": designSlug, "product-slug": productSlug } = useParams<{
    "design-slug": string;
    "product-slug": string;
  }>();
  const navigate = useNavigate();
  const design = getDesignBySlug(designSlug || "");
  const allDesignProducts = design ? getProductsByDesign(design.id) : [];

  // Determine active product from slug or default to first
  const slugType = productSlug?.split("-").slice(-2).join("-") || "";
  const activeType = allDesignProducts.find((p) =>
    productSlug?.includes(typeToUrlPart[p.type as ProductType])
  )?.type || allDesignProducts[0]?.type;
  const activeProduct = allDesignProducts.find((p) => p.type === activeType);

  const { addItem } = useCart();
  const { toggle, has } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const purchaseAreaRef = useRef<HTMLDivElement>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    if (design) {
      setRecentlyViewed((prev) => {
        const next = [design.id, ...prev.filter((id) => id !== design.id)].slice(0, 6);
        return next;
      });
    }
  }, [design]);

  // Reset selections on product change
  useEffect(() => {
    setSelectedColor(0);
    setSelectedSize(0);
    setActiveImage(0);
    setQuantity(1);
    setAddedToCart(false);
  }, [activeType]);

  const switchProduct = useCallback((type: ProductType) => {
    if (!design) return;
    navigate(`/products/${design.slug}/${typeToUrlPart[type]}`, { replace: true });
  }, [design, navigate]);

  if (!design || !activeProduct) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Product not found</p>
            <Link to="/designs" className="text-sm font-medium text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
              Browse designs
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const isWishlisted = has(design.id);
  const color = activeProduct.colors[selectedColor];
  const images = activeProduct.images;

  const handleAddToCart = () => {
    if (!color) return;
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

  const accordionItems = [
    { title: "Product Details", content: activeProduct.details },
    {
      title: "Materials & Fit",
      content: activeProduct.type === "t-shirt" || activeProduct.type === "kids-t-shirt"
        ? ["100% organic cotton", "180 GSM fabric", "Pre-shrunk", "Side-seamed construction", "Regular fit, true to size"]
        : activeProduct.type === "hoodie"
          ? ["80% cotton, 20% polyester", "320 GSM fleece", "Kangaroo pocket", "Ribbed cuffs and hem", "Relaxed fit"]
          : ["Premium quality materials", "Designed for durability", "Printed with archival inks"],
    },
    {
      title: "Print Details",
      content: ["Direct-to-garment (DTG) printing", "Vibrant, long-lasting colors", "Eco-friendly water-based inks", "Design placement centered on product"],
    },
    {
      title: "Care Guide",
      content: ["Machine wash cold, inside out", "Do not bleach", "Tumble dry low", "Do not iron directly on print", "Do not dry clean"],
    },
    { title: "Shipping", content: ["Ships within 2–4 business days", "Free shipping on orders over €50", "Estimated delivery: 5–14 business days", "International shipping to 50+ countries"] },
    { title: "Returns", content: ["30-day return policy", "Items must be unworn and in original condition", "Return shipping covered within the EU", "Refund processed within 5–7 business days"] },
  ];

  const relatedDesigns = allDesigns.filter((d) => d.id !== design.id).slice(0, 4);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground overflow-x-auto" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors shrink-0">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/designs" className="hover:text-foreground transition-colors shrink-0">Designs</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to={`/designs/${design.slug}`} className="hover:text-foreground transition-colors shrink-0">{design.name}</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground truncate">{productTypeLabel(activeProduct.type as ProductType)}</span>
        </nav>
      </div>

      {/* Main Product Area */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-8 lg:gap-12 xl:gap-16">

          {/* ─── LEFT: Image Gallery ─── */}
          <div className="flex gap-3">
            {/* Vertical thumbnail rail (desktop) */}
            {images.length > 1 && (
              <div className="hidden lg:flex flex-col gap-2 w-20 shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "w-20 h-24 rounded-sm overflow-hidden bg-surface border-2 transition-all shrink-0",
                      activeImage === i ? "border-foreground" : "border-transparent opacity-50 hover:opacity-80"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 min-w-0">
              <div
                className="aspect-[3/4] lg:aspect-[4/5] rounded-sm overflow-hidden bg-surface relative cursor-zoom-in group"
                onClick={() => { setViewerIndex(activeImage); setViewerOpen(true); }}
                role="button"
                aria-label="View full image"
              >
                <img
                  src={images[activeImage]}
                  alt={`${design.name} — ${productTypeLabel(activeProduct.type as ProductType)}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80">
                    <Eye className="h-3.5 w-3.5" />
                  </div>
                </div>
                {design.isNew && (
                  <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-gold text-background rounded-sm">New</span>
                )}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-3 text-[10px] text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                    {activeImage + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Horizontal thumbnails (mobile/tablet) */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 mt-3 lg:hidden">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "w-16 h-20 rounded-sm overflow-hidden bg-surface border-2 transition-all shrink-0",
                        activeImage === i ? "border-foreground" : "border-transparent opacity-50 hover:opacity-80"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── RIGHT: Product Information ─── */}
          <div className="flex flex-col" ref={purchaseAreaRef}>
            {/* Design name */}
            <div className="mb-1">
              <Link to={`/designs/${design.slug}`} className="text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold/80 transition-colors">
                {design.name}
              </Link>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mt-1">
                {activeProduct.title}
              </h1>
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
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-xl font-medium text-price">{formatPrice(activeProduct.price)}</span>
              {activeProduct.compareAtPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(activeProduct.compareAtPrice)}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-red-600 text-white rounded-sm">Sale</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {activeProduct.description}
            </p>

            {/* ─── Product Type Switcher (compact horizontal) ─── */}
            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-2.5">Product</p>
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                {allDesignProducts.map((p) => {
                  const v = typeVisuals[p.type as ProductType];
                  const isActive = p.type === activeType;
                  return (
                    <button
                      key={p.type}
                      onClick={() => switchProduct(p.type as ProductType)}
                      className={cn(
                        "whitespace-nowrap px-3 py-2 text-[11px] font-medium rounded-sm border transition-all shrink-0",
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                      )}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ─── Color Selector ─── */}
            {activeProduct.colors.length > 0 && (
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
                        "w-9 h-9 rounded-full border-2 transition-all",
                        selectedColor === i ? "border-foreground scale-110 ring-1 ring-foreground/20" : "border-border/40 hover:border-foreground/40"
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
            {activeProduct.sizes && activeProduct.sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    Size — <span className="text-foreground normal-case tracking-normal">{activeProduct.sizes[selectedSize]}</span>
                  </p>
                  <button onClick={() => setSizeGuideOpen(true)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
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
                        selectedSize === i ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
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
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Decrease quantity">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-sm font-medium tabular-nums">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Increase quantity">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 h-10 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all min-h-[44px]",
                  addedToCart ? "bg-green-600 text-white" : "bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]"
                )}
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggle(design.id)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-sm border transition-all shrink-0",
                  isWishlisted ? "bg-gold/10 border-gold/30 text-gold" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
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
            <div className="mb-6"><DeliveryEstimator /></div>

            {/* Accordion */}
            <ProductAccordion items={accordionItems} defaultOpen={0} />
          </div>
        </div>
      </div>

      {/* ─── ONE DESIGN. EVERY PRODUCT. ─── */}
      <div className="border-t border-border/50 bg-surface/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">One Design. Every Product.</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight">
              Love the design? Explore it across the collection.
            </h2>
          </div>

          {/* Product family horizontal cards */}
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 justify-start lg:justify-center">
            {allDesignProducts.map((p) => {
              const v = typeVisuals[p.type as ProductType];
              const isActive = p.type === activeType;
              return (
                <button
                  key={p.id}
                  onClick={() => switchProduct(p.type as ProductType)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-sm border transition-all shrink-0 min-w-[100px]",
                    isActive ? "border-foreground bg-foreground/5" : "border-border/50 hover:border-foreground/30 bg-surface/30"
                  )}
                >
                  <div className="w-14 h-14 rounded-sm overflow-hidden bg-surface border border-border/30">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-medium text-center leading-tight">{v.label}</p>
                  <p className="text-[10px] text-muted-foreground">{formatPrice(p.price)}</p>
                  {isActive && <span className="text-[9px] text-gold font-medium">Selected</span>}
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
      </div>

      {/* ─── The Story Behind the Design ─── */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="aspect-square lg:aspect-[4/5] rounded-sm overflow-hidden bg-surface">
              <img src={design.heroImage} alt={design.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">The Story</p>
              <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-4">{design.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{design.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Every design begins as an original artwork — sketched, refined, and digitized with obsessive attention to detail.
                This piece was created to translate across materials and product types without losing its impact, whether
                printed on organic cotton or embossed on ceramic.
              </p>
              <div className="flex items-center gap-4">
                <Link to={`/designs/${design.slug}`} className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                  View All Products
                </Link>
                <Link to="/designs" className="text-xs font-medium uppercase tracking-wider text-gold hover:text-gold/80 transition-colors">
                  Explore All Designs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Reviews ─── */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Reviews</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-10">Loved by the Community</h2>
          <ReviewSection />
        </div>
      </div>

      {/* ─── You May Also Like ─── */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">You May Also Like</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">More from FAYANITY</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedDesigns.map((d) => (
              <Link key={d.id} to={`/designs/${d.slug}`} className="group block">
                <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface mb-3">
                  <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-0.5">{d.products.length} products</p>
                <h3 className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 1 && (
        <div className="border-t border-border/50">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h3 className="font-display text-lg font-medium tracking-tight mb-6">Recently Viewed</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {recentlyViewed.filter((id) => id !== design.id).slice(0, 5).map((id) => {
                const d = allDesigns.find((x) => x.id === id);
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

      {/* Sticky mobile cart bar */}
      <StickyMobileCartBar price={activeProduct.price} compareAtPrice={activeProduct.compareAtPrice} onAddToCart={handleAddToCart} added={addedToCart} />

      {/* Modals */}
      <ImageViewer images={images} initialIndex={viewerIndex} alt={activeProduct.title} open={viewerOpen} onClose={() => setViewerOpen(false)} />
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} productType={activeProduct.type} />
    </SiteLayout>
  );
}
