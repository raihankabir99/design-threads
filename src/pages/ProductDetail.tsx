import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
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
  getProductBySlug, getProductsByDesign, productTypeLabel, formatPrice, designs as allDesigns,
} from "@/data/mock";
import type { ProductType } from "@/data/types";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
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
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setRecentlyViewed((prev) => {
        const next = [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 6);
        return next;
      });
    }
  }, [product]);

  useEffect(() => {
    if (!purchaseAreaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(purchaseAreaRef.current);
    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Product not found</p>
            <Link to="/shop" className="text-sm text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
              Browse all products
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const design = allDesigns.find((d) => d.id === product.designId);
  const relatedProducts = design ? getProductsByDesign(design.id).filter((p) => p.id !== product.id) : [];
  const isWishlisted = has(product.designId);
  const color = product.colors[selectedColor];
  const images = product.images;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      designId: product.designId,
      type: product.type as ProductType,
      designName: product.designName,
      title: product.title,
      color: color?.name || "Black",
      colorHex: color?.hex || "#111",
      size: product.sizes?.[selectedSize],
      price: product.price,
      image: images[0],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const accordionItems = [
    { title: "Details", content: product.details },
    {
      title: "Materials",
      content: product.type === "t-shirt" || product.type === "kids-t-shirt"
        ? ["100% organic cotton", "180 GSM fabric", "Pre-shrunk", "Side-seamed construction"]
        : product.type === "hoodie"
          ? ["80% cotton, 20% polyester", "320 GSM fleece", "Kangaroo pocket", "Ribbed cuffs and hem"]
          : ["Premium quality materials", "Designed for durability", "Printed with archival inks"],
    },
    { title: "Fit & Size", content: "Regular fit. True to size. For detailed measurements, please refer to our Size Guide." },
    { title: "Care", content: ["Machine wash cold, inside out", "Do not bleach", "Tumble dry low", "Do not iron directly on print", "Do not dry clean"] },
    { title: "Shipping", content: ["Ships within 2–4 business days", "Free shipping on orders over €50", "Estimated delivery: 5–14 business days", "International shipping available"] },
    { title: "Returns", content: ["30-day return policy", "Items must be unworn and in original condition", "Return shipping covered within the EU", "Refund processed within 5–7 business days"] },
  ];

  const relatedDesigns = allDesigns.filter((d) => d.id !== product.designId).slice(0, 4);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground overflow-x-auto" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors shrink-0">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/shop" className="hover:text-foreground transition-colors shrink-0">Shop</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          {design && (
            <>
              <Link to={`/designs/${design.slug}`} className="hover:text-foreground transition-colors shrink-0">{design.name}</Link>
              <ChevronRight className="h-3 w-3 shrink-0" />
            </>
          )}
          <span className="text-foreground truncate">{productTypeLabel(product.type as ProductType)}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-8 lg:gap-12 xl:gap-16">

          {/* LEFT: Image Gallery */}
          <div className="space-y-3">
            <div
              className="aspect-[3/4] lg:aspect-[4/5] rounded-sm overflow-hidden bg-surface relative cursor-zoom-in group"
              onClick={() => { setViewerIndex(activeImage); setViewerOpen(true); }}
              role="button"
              aria-label="View full image"
            >
              <img
                src={images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80">
                  <Eye className="h-3.5 w-3.5" />
                </div>
              </div>
              {product.badge && (
                <span className={cn(
                  "absolute top-4 left-4 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm",
                  product.badge === "new" && "bg-gold text-background",
                  product.badge === "bestseller" && "bg-foreground text-background",
                  product.badge === "sale" && "bg-red-600 text-white",
                  product.badge === "limited" && "bg-white/10 text-white border border-white/20"
                )}>
                  {product.badge}
                </span>
              )}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-3 text-[10px] text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                  {activeImage + 1} / {images.length}
                </div>
              )}
            </div>

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

          {/* RIGHT: Product Info */}
          <div className="flex flex-col" ref={purchaseAreaRef}>
            {design && (
              <Link to={`/designs/${design.slug}`} className="text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold/80 transition-colors mb-2">
                {design.name}
              </Link>
            )}
            <p className="text-sm text-muted-foreground mb-1">{productTypeLabel(product.type as ProductType)}</p>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-1">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5", i < 4 ? "text-gold fill-gold" : i < 5 ? "text-gold/50 fill-gold/50" : "text-muted-foreground/20")} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">4.8 · 128 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-xl font-medium text-price">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-red-600 text-white rounded-sm">Sale</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-2.5">
                  Color — <span className="text-foreground normal-case tracking-normal">{color?.name}</span>
                </p>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      className={cn(
                        "w-9 h-9 rounded-full border-2 transition-all",
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

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    Size — <span className="text-foreground normal-case tracking-normal">{product.sizes[selectedSize]}</span>
                  </p>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size}
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

            {/* Quantity + Add to Cart */}
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
                onClick={() => toggle(product.designId)}
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

            {/* Trust */}
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

      {/* Same Design, Different Product */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border/50">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Same Design</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">
              {product.designName} Across the Collection
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} designSlug={design?.slug} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Reviews</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-10">Loved by the Community</h2>
          <ReviewSection />
        </div>
      </div>

      {/* You May Also Like */}
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
              {recentlyViewed.filter((id) => id !== product.id).slice(0, 5).map((id) => {
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
      <StickyMobileCartBar
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        onAddToCart={handleAddToCart}
        added={addedToCart}
      />

      {/* Modals */}
      <ImageViewer images={images} initialIndex={viewerIndex} alt={product.title} open={viewerOpen} onClose={() => setViewerOpen(false)} />
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} productType={product.type} />
    </SiteLayout>
  );
}
