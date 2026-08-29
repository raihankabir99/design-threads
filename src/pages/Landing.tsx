import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DesignCard } from "@/components/brand/DesignCard";
import { CollectionCard } from "@/components/brand/CollectionCard";
import { ProductCard } from "@/components/brand/ProductCard";
import { designs, collections, products, getFeaturedDesigns, getBestsellerDesigns } from "@/data/mock";

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
            <p className="text-label text-gold mb-6">Design-Led Fashion & Lifestyle</p>
            <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground">
              One Design.
              <br />
              <span className="text-muted-foreground">Many Products.</span>
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground mt-6 max-w-md leading-relaxed">
              Premium prints on fashion, accessories, and lifestyle products.
              Each design tells a story — choose how you wear it.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/designs"
                className="inline-flex items-center gap-2 h-12 px-7 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
              >
                Explore Designs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 h-12 px-7 border border-border text-sm font-medium tracking-wide rounded-sm hover:bg-surface transition-colors"
              >
                Shop All
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border/50">
              <div>
                <p className="text-lg font-display font-semibold">500+</p>
                <p className="text-xs text-muted-foreground">Designs</p>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div>
                <p className="text-lg font-display font-semibold">50+</p>
                <p className="text-xs text-muted-foreground">Countries</p>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div>
                <p className="text-lg font-display font-semibold">100%</p>
                <p className="text-xs text-muted-foreground">Organic</p>
              </div>
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
                <p className="text-xs text-muted-foreground mt-1">{designs[0].products.length} products</p>
              </div>
              {/* Floating mini cards */}
              <div className="absolute -top-4 -right-4 flex flex-col gap-2">
                {products.slice(0, 3).map((p) => (
                  <div key={p.id} className="w-16 h-16 rounded-sm bg-background border border-border/40 overflow-hidden shadow-lg">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
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

function FeaturedDesignsSection() {
  const featured = getFeaturedDesigns();
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-label text-gold mb-3">Curated</p>
            <h2 className="text-display text-3xl lg:text-4xl">Featured Designs</h2>
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

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Choose a Design", desc: "Browse our curated collection of original designs — each one a unique visual statement." },
    { num: "02", title: "Pick Your Product", desc: "Express the design on t-shirts, hoodies, totes, mugs, posters, and 10+ more products." },
    { num: "03", title: "Make It Yours", desc: "Select your color, size, and finish. Every piece is made to order with premium quality." },
  ];
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-label text-gold mb-3">How It Works</p>
          <h2 className="text-display text-3xl lg:text-4xl">Design to Doorstep</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.num} className="text-center lg:text-left">
              <span className="font-display text-5xl lg:text-6xl font-light text-border">{step.num}</span>
              <h3 className="font-display text-lg font-medium mt-4 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto lg:mx-0">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionsSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-label text-gold mb-3">Explore</p>
            <h2 className="text-display text-3xl lg:text-4xl">Collections</h2>
          </div>
          <Link
            to="/collections"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellersSection() {
  const bestsellers = getBestsellerDesigns();
  const featuredProducts = bestsellers.flatMap((d) =>
    products.filter((p) => p.designId === d.id && p.type === "t-shirt").slice(0, 1)
  ).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-surface">
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
            <ProductCard key={p.id} product={p} designSlug={bestsellers.find((d) => d.id === p.designId)?.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignPhilosophySection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,169,110,0.04)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-label text-gold mb-3">Our Philosophy</p>
            <h2 className="text-display text-3xl lg:text-4xl mb-6">
              Design Is the Product.
              <br />
              <span className="text-muted-foreground">The Product Is the Medium.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We believe a design is an independent visual entity. It deserves to exist across
              many forms — on your chest, in your hands, on your wall, in your daily life.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Every product we create is made to order, reducing waste while maintaining
              the highest quality standards. Premium materials, conscious creation, global reach.
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
              <img src={designs[2].heroImage} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface mt-8">
              <img src={designs[4].heroImage} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-background border-t border-border/50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-label text-gold mb-4">Ready to Start?</p>
        <h2 className="text-display text-3xl lg:text-5xl mb-6">
          Find Your Design.
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
          Explore our full collection of original designs and discover your next favorite piece.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/designs"
            className="inline-flex items-center gap-2 h-12 px-7 bg-gold text-background text-sm font-medium tracking-wide rounded-sm hover:bg-gold-light transition-colors"
          >
            Browse All Designs
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 h-12 px-7 border border-border text-sm font-medium tracking-wide rounded-sm hover:bg-surface transition-colors"
          >
            Shop Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <SiteLayout>
      <HeroSection />
      <FeaturedDesignsSection />
      <HowItWorksSection />
      <CollectionsSection />
      <BestSellersSection />
      <DesignPhilosophySection />
      <CTASection />
    </SiteLayout>
  );
}
