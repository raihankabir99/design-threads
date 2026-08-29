import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Star, Package, Palette, Globe, Shield, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DesignCard } from "@/components/brand/DesignCard";
import { ProductCard } from "@/components/brand/ProductCard";
import { designs, collections, products, blogPosts, getFeaturedDesigns, getBestsellerDesigns, productPlaceholder } from "@/data/mock";

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,110,0.06)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <p className="text-label text-gold mb-6">New Collection</p>
            <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground">
              Wear the Design.
              <br />
              <span className="text-muted-foreground">Live the Idea.</span>
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground mt-6 max-w-md leading-relaxed">
              Original designs, made on demand. Premium apparel and accessories crafted
              with intention — every piece created for someone who chose it.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/shop?sort=new"
                className="inline-flex items-center gap-2 h-12 px-7 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
              >
                Shop New Drops
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/designs"
                className="inline-flex items-center gap-2 h-12 px-7 border border-border text-sm font-medium tracking-wide rounded-sm hover:bg-surface transition-colors"
              >
                Explore Designs
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
              {[
                { title: "Premium", subtitle: "Quality Materials" },
                { title: "Made to Order", subtitle: "Zero Waste" },
                { title: "Worldwide", subtitle: "Shipping" },
              ].map((badge, i) => (
                <div key={i} className={i > 0 ? "border-l border-border/50 pl-4 sm:pl-6" : ""}>
                  <p className="text-base sm:text-lg font-display font-semibold">{badge.title}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{badge.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Featured design showcase */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface">
                <img
                  src={designs[0].heroImage}
                  alt={designs[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-background border border-border/60 rounded-sm p-4 shadow-xl max-w-[200px]">
                <p className="text-label text-gold mb-1">Featured</p>
                <p className="text-sm font-medium">{designs[0].name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {designs[0].products.length} products
                </p>
              </div>
              {/* Floating mini cards */}
              <div className="absolute -top-4 -right-4 flex flex-col gap-2">
                {products.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="w-16 h-16 rounded-sm bg-background border border-border/40 overflow-hidden shadow-lg"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURED DESIGNS
   ───────────────────────────────────────────── */
function FeaturedDesignsSection() {
  const featured = getFeaturedDesigns();
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-label text-gold mb-3">Curated</p>
            <h2 className="text-display text-3xl lg:text-4xl">Featured Designs</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Discover designs made to live beyond the screen.
            </p>
          </div>
          <Link
            to="/designs"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((d) => (
            <DesignCard key={d.id} design={d} />
          ))}
        </div>
        <Link
          to="/designs"
          className="sm:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-6"
        >
          View All Designs
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SHOP BY PRODUCT
   ───────────────────────────────────────────── */
function ShopByProductSection() {
  const categories = [
    { label: "T-Shirts", type: "t-shirt", icon: "Tee" },
    { label: "Hoodies", type: "hoodie", icon: "Hood" },
    { label: "Sweatshirts", type: "sweatshirt", icon: "Sweat" },
    { label: "Tote Bags", type: "tote-bag", icon: "Tote" },
    { label: "Mugs", type: "mug", icon: "Mug" },
    { label: "Phone Cases", type: "phone-case", icon: "Phone" },
    { label: "Caps", type: "cap", icon: "Cap" },
    { label: "Posters", type: "poster", icon: "Art" },
    { label: "Stickers", type: "sticker", icon: "Stick" },
    { label: "Notebooks", type: "notebook", icon: "Book" },
    { label: "Cushions", type: "cushion", icon: "Cush" },
    { label: "Kids", type: "kids-t-shirt", icon: "Kids" },
    { label: "Baby", type: "baby-onesie", icon: "Baby" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-label text-gold mb-3">Browse</p>
            <h2 className="text-display text-3xl lg:text-4xl">Shop by Product</h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 lg:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.type}
              to={`/shop?type=${cat.type}`}
              className="group text-center"
            >
              <div className="aspect-square rounded-sm bg-background border border-border/40 overflow-hidden mb-3 flex items-center justify-center group-hover:border-border transition-colors">
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.icon}
                </span>
              </div>
              <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {cat.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NEW DROPS
   ───────────────────────────────────────────── */
function NewDropsSection() {
  const newDesigns = designs.filter((d) => d.isNew).slice(0, 4);
  const newProducts = newDesigns
    .flatMap((d) => products.filter((p) => p.designId === d.id && p.type === "t-shirt"))
    .slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-label text-gold mb-3">Fresh</p>
            <h2 className="text-display text-3xl lg:text-4xl">New Drops</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Fresh designs. Made when you order.
            </p>
          </div>
          <Link
            to="/shop?sort=new"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {newProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              designSlug={newDesigns.find((d) => d.id === p.designId)?.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ONE DESIGN → MANY PRODUCTS (Signature)
   ───────────────────────────────────────────── */
function OneDesignSection() {
  const showcase = designs[0]; // Midnight Lion
  const showcaseProducts = products.filter((p) => p.designId === showcase.id);
  const displayTypes = showcaseProducts.slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.04)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-label text-gold mb-3">Signature Concept</p>
          <h2 className="text-display text-3xl lg:text-5xl">
            One Design.
            <br />
            <span className="text-muted-foreground">Many Expressions.</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            Choose the design you love. Wear it your way — on a tee, a hoodie, a tote, a mug,
            or any of 13+ products.
          </p>
        </div>

        {/* Design hero */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-12">
          {/* Main design image */}
          <div className="w-full lg:w-1/3 max-w-[320px]">
            <div className="aspect-square rounded-sm overflow-hidden bg-background border border-border/40 shadow-2xl">
              <img
                src={showcase.heroImage}
                alt={showcase.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
              {displayTypes.map((p) => (
                <Link
                  key={p.id}
                  to={`/designs/${showcase.slug}?type=${p.type}`}
                  className="group"
                >
                  <div className="aspect-square rounded-sm overflow-hidden bg-background border border-border/40 mb-2 group-hover:border-border transition-colors">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">
                    {p.title.replace(showcase.name + " ", "")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to={`/designs/${showcase.slug}`}
            className="inline-flex items-center gap-2 h-12 px-7 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
          >
            Explore the Design
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BEST SELLERS
   ───────────────────────────────────────────── */
function BestSellersSection() {
  const bestsellers = getBestsellerDesigns();
  const featuredProducts = bestsellers
    .flatMap((d) =>
      products.filter((p) => p.designId === d.id && p.type === "t-shirt")
    )
    .slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-label text-gold mb-3">Trending</p>
            <h2 className="text-display text-3xl lg:text-4xl">Best Sellers</h2>
          </div>
          <Link
            to="/shop?sort=best"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              designSlug={bestsellers.find((d) => d.id === p.designId)?.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COLLECTION EDITORIAL
   ───────────────────────────────────────────── */
function CollectionEditorialSection() {
  const featured = collections[0]; // Essentials

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Visual */}
          <Link
            to={`/collections/${featured.slug}`}
            className="group aspect-[4/3] rounded-sm overflow-hidden bg-background relative"
          >
            <img
              src={featured.image}
              alt={featured.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          </Link>

          {/* Copy */}
          <div className="lg:pl-8">
            <p className="text-label text-gold mb-3">Collection</p>
            <h2 className="text-display text-3xl lg:text-4xl mb-4">
              The {featured.name} Collection
            </h2>
            <p className="text-lg text-muted-foreground mb-2 italic">
              Quiet design. Strong identity.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
              {featured.description}
            </p>
            <Link
              to={`/collections/${featured.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
            >
              Explore Collection
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BRAND STORY
   ───────────────────────────────────────────── */
function BrandStorySection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,169,110,0.04)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-label text-gold mb-3">Our Story</p>
            <h2 className="text-display text-3xl lg:text-4xl mb-6">
              Designed with Intention.
              <br />
              <span className="text-muted-foreground">Made with Purpose.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Every design on FAYANITY starts as an original work of art — then finds its way
              onto premium apparel and accessories. No mass production, no compromise.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Each piece is made to order, reducing waste while maintaining the highest
              quality standards. Organic cotton, archival inks, and meticulous construction.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
            >
              Learn More About Us
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface">
              <img
                src={designs[2].heroImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface mt-8">
              <img
                src={designs[4].heroImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   QUALITY / TRUST
   ───────────────────────────────────────────── */
function TrustSection() {
  const points = [
    {
      icon: <Palette className="h-5 w-5" />,
      title: "Thoughtful Design",
      desc: "Every design is original, created with intention and artistic vision.",
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Made on Demand",
      desc: "Each piece is produced only when you order — no overstock, no waste.",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "International Delivery",
      desc: "We ship worldwide. Europe, UK, USA, Middle East, and beyond.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure Checkout",
      desc: "Your payment is protected with industry-standard encryption.",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Customer Support",
      desc: "Reach us anytime. We care about your experience from start to finish.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface border-t border-border/50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-label text-gold mb-3">Why FAYANITY</p>
          <h2 className="text-display text-3xl lg:text-4xl">Quality You Can Trust</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-6">
          {points.map((point) => (
            <div key={point.title} className="text-center">
              <div className="w-12 h-12 rounded-full bg-background border border-border/50 flex items-center justify-center mx-auto mb-4 text-gold">
                {point.icon}
              </div>
              <h3 className="font-display text-sm font-medium mb-2">
                {point.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px] mx-auto">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CUSTOMER REVIEWS
   ───────────────────────────────────────────── */
function ReviewsSection() {
  const reviews = [
    {
      stars: 5,
      text: "Beautiful print and the design looks exactly like the preview. The fabric quality is incredible.",
      name: "Anna K.",
      location: "Berlin, Germany",
    },
    {
      stars: 5,
      text: "Ordered the Midnight Lion hoodie — the attention to detail is next level. Already ordered another.",
      name: "Marcus T.",
      location: "London, UK",
    },
    {
      stars: 5,
      text: "Shipping was faster than expected and the product is premium. The design feels like real art.",
      name: "Yuki S.",
      location: "Tokyo, Japan",
    },
    {
      stars: 5,
      text: "This is not your typical print-on-demand. The quality is genuinely premium. Very impressed.",
      name: "Sara M.",
      location: "Dubai, UAE",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-label text-gold mb-3">Testimonials</p>
          <h2 className="text-display text-3xl lg:text-4xl">
            Loved by the Community
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-surface border border-border/40 rounded-sm p-6"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 text-gold fill-gold"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{review.text}"
              </p>
              <div>
                <p className="text-sm font-medium">{review.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BLOG PREVIEW
   ───────────────────────────────────────────── */
function BlogPreviewSection() {

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-label text-gold mb-3">From the Journal</p>
            <h2 className="text-display text-3xl lg:text-4xl">Stories & Guides</h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View All Articles
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {blogPosts.slice(0, 3).map((post: any) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="aspect-[16/10] rounded-sm overflow-hidden bg-background mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">
                  {post.category}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-[11px] text-muted-foreground">
                  {post.readTime}
                </span>
              </div>
              <h3 className="font-display text-base font-medium group-hover:text-gold transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
        <Link
          to="/blog"
          className="sm:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-6"
        >
          View All Articles
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NEWSLETTER
   ───────────────────────────────────────────── */
function NewsletterSection() {
  return (
    <section className="py-20 lg:py-28 bg-background border-t border-border/50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-label text-gold mb-3">Stay Connected</p>
          <h2 className="text-display text-3xl lg:text-4xl mb-3">
            Join the Community
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Discover new designs, collections, and special releases.
          </p>
          <form
            className="flex gap-2 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-12 px-4 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
            />
            <button
              type="submit"
              className="h-12 px-6 bg-gold text-background text-sm font-medium tracking-wide rounded-sm hover:bg-gold-light transition-colors flex items-center gap-2 shrink-0"
            >
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
          <p className="text-[11px] text-muted-foreground/60 mt-4">
            By subscribing, you agree to receive updates from FAYANITY.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA
   ───────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-background border-t border-border/50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-label text-gold mb-4">Ready to Start?</p>
        <h2 className="text-display text-3xl lg:text-5xl mb-6">
          Find Your Next Favorite Tee.
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
          Explore our collection of original designs on premium apparel and accessories.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/designs"
            className="inline-flex items-center gap-2 h-12 px-7 bg-gold text-background text-sm font-medium tracking-wide rounded-sm hover:bg-gold-light transition-colors"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 h-12 px-7 border border-border text-sm font-medium tracking-wide rounded-sm hover:bg-surface transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */
export default function Landing() {
  return (
    <SiteLayout>
      <HeroSection />
      <FeaturedDesignsSection />
      <ShopByProductSection />
      <NewDropsSection />
      <OneDesignSection />
      <BestSellersSection />
      <CollectionEditorialSection />
      <BrandStorySection />
      <TrustSection />
      <ReviewsSection />
      <BlogPreviewSection />
      <NewsletterSection />
    </SiteLayout>
  );
}
