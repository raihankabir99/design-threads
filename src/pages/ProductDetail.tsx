import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowRight, Heart, Minus, Plus, Truck, RotateCcw, Shield, Star } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/brand/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  getProductBySlug,
  getProductsByDesign,
  productTypeLabel,
  formatPrice,
} from "@/data/mock";
import { designs } from "@/data/mock";
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

  if (!product) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Product not found</p>
            <Link to="/shop" className="text-sm text-gold hover:text-gold-light transition-colors">
              Browse all products
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const design = designs.find((d) => d.id === product.designId);
  const relatedProducts = design ? getProductsByDesign(design.id).filter((p) => p.id !== product.id) : [];
  const isWishlisted = has(product.designId);
  const color = product.colors[selectedColor];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      designId: product.designId,
      type: product.type as ProductType,
      designName: product.designName,
      title: product.title,
      color: color.name,
      colorHex: color.hex,
      size: product.sizes?.[selectedSize],
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          {design && (
            <>
              <Link to={`/designs/${design.slug}`} className="hover:text-foreground transition-colors">{design.name}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{productTypeLabel(product.type as ProductType)}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface">
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "aspect-square rounded-sm overflow-hidden bg-surface border-2 transition-all",
                    activeImage === i ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <p className="text-label text-gold mb-2">{productTypeLabel(product.type as ProductType)}</p>
            <h1 className="text-display text-2xl lg:text-3xl mb-1">{product.title}</h1>
            {design && (
              <Link to={`/designs/${design.slug}`} className="text-sm text-muted-foreground hover:text-gold transition-colors mb-4">
                Design: {design.name}
              </Link>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-xl font-medium text-price">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
                  <span className="text-xs font-medium text-red-500">Sale</span>
                </>
              )}
            </div>

            {/* Color selector */}
            {product.colors.length > 1 && (
              <div className="mb-5">
                <p className="text-xs text-muted-foreground mb-2">
                  Color: <span className="text-foreground">{color.name}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      className={cn(
                        "w-9 h-9 rounded-full border-2 transition-all",
                        selectedColor === i ? "border-foreground scale-110" : "border-border/40 hover:border-foreground/30"
                      )}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">
                    Size: <span className="text-foreground">{product.sizes[selectedSize]}</span>
                  </p>
                  <button className="text-xs text-gold hover:text-gold-light transition-colors underline">
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
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-sm font-medium">{quantity}</span>
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
                className="flex-1 flex items-center justify-center gap-2 h-10 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggle(product.designId)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-sm border transition-all shrink-0",
                  isWishlisted
                    ? "bg-gold/10 border-gold/30 text-gold"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
              </button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-border/50 mb-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-4 w-4 text-muted-foreground mb-1.5" />
                <p className="text-[11px] text-muted-foreground">Free Shipping<br/>€50+</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-4 w-4 text-muted-foreground mb-1.5" />
                <p className="text-[11px] text-muted-foreground">30 Day<br/>Returns</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-4 w-4 text-muted-foreground mb-1.5" />
                <p className="text-[11px] text-muted-foreground">Premium<br/>Quality</p>
              </div>
            </div>

            {/* Product details */}
            <div>
              <h3 className="text-sm font-medium mb-3">Details</h3>
              <ul className="space-y-1.5">
                {product.details.map((detail, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-gold mt-0.5">·</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 lg:mt-28 pt-12 border-t border-border/50">
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">
              Same Design, Different Product
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} designSlug={design?.slug} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}


