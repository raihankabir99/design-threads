import { Link } from "react-router";
import { ArrowRight, Package, Check, Truck, MapPin, Scissors, Recycle, Globe } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { designs } from "@/data/mock";
import { cn } from "@/lib/utils";

const principles = [
  { num: "01", title: "Simplicity", desc: "Clean, intentional design that speaks without shouting. Every element earns its place." },
  { num: "02", title: "Identity", desc: "Designs that reflect personality and creative expression — not mass-market trends." },
  { num: "03", title: "Quality", desc: "Premium materials, archival inks, and meticulous construction in every garment." },
  { num: "04", title: "Expression", desc: "Art that lives beyond the screen — wearable, giftable, and built to last." },
];

const processSteps = [
  { icon: Check, title: "Order Placed", desc: "You choose a design and select your product, color, and size." },
  { icon: Scissors, title: "Product Prepared", desc: "Your chosen blank garment is selected and prepared for printing." },
  { icon: Package, title: "Design Printed", desc: "The design is printed using archival inks on premium materials." },
  { icon: Check, title: "Quality Check", desc: "Every product is inspected to ensure it meets our standards." },
  { icon: Package, title: "Packed with Care", desc: "Your order is carefully packaged in recyclable materials." },
  { icon: Truck, title: "Shipped to You", desc: "The order is dispatched with tracking and delivered to your door." },
];

export default function About() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,110,0.05)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">About FAYANITY</p>
            <h1 className="font-display text-4xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
              Designed to be yours.
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              Thoughtful designs, made on demand and created for everyday expression.
            </p>
            <Link to="/designs" className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]">
              Explore Designs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Our Story</p>
              <h2 className="font-display text-2xl lg:text-4xl font-medium tracking-tight mb-6 leading-tight">
                We believe products<br /> can be more than objects.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                They can express personality, creativity, and identity. Our collections bring together contemporary design and everyday products through an on-demand approach.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                FAYANITY was born from a love of original design and premium apparel. We believe a great design deserves to exist on garments you actually want to wear — not generic blanks with a logo slapped on.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our design philosophy draws from contemporary art, minimalist aesthetics, and the confidence of modern independent brands. The result is a collection that feels both timeless and distinctly current.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] rounded-sm overflow-hidden bg-background">
                <img src={designs[1].heroImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-sm overflow-hidden bg-background mt-6">
                <img src={designs[3].heroImage} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Philosophy</p>
            <h2 className="font-display text-2xl lg:text-4xl font-medium tracking-tight">Design with intention.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {principles.map((p) => (
              <div key={p.num} className="text-center sm:text-left">
                <span className="font-display text-3xl lg:text-4xl font-light text-border block mb-3">{p.num}</span>
                <h3 className="font-display text-lg font-medium mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made On Demand */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Production</p>
            <h2 className="font-display text-2xl lg:text-4xl font-medium tracking-tight mb-4">Made when you order.</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Every product is created specifically for you after you place your order. No warehouses full of unsold inventory — just thoughtful production.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-4 p-5 bg-background border border-border/50 rounded-sm">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsible Production */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Responsibility</p>
              <h2 className="font-display text-2xl lg:text-4xl font-medium tracking-tight mb-6 leading-tight">
                Thoughtful production,<br /> by design.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                On-demand production can help reduce unnecessary inventory by producing products only after an order is placed. This approach means less waste from overproduction.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                We're transparent about our process: we don't own factories or manufacturing facilities. We partner with specialized fulfillment providers who share our commitment to quality and responsible practices.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Recycle, label: "On-Demand\nProduction" },
                  { icon: Globe, label: "International\nFulfillment" },
                  { icon: MapPin, label: "Recyclable\nPackaging" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-tight whitespace-pre-line">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface">
              <img src={designs[5]?.heroImage || designs[0].heroImage} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Global */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Global Reach</p>
          <h2 className="font-display text-2xl lg:text-4xl font-medium tracking-tight mb-4">Designed in Europe. Loved worldwide.</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
            We ship to 50+ countries across Europe, North America, the Middle East, and beyond.
            Every order is handled with care, from production to your doorstep.
          </p>
          <Link to="/shipping" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition-colors">
            Shipping Information <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-background border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl lg:text-4xl font-medium tracking-tight mb-4">Find your design.</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">Original artwork, made to order, delivered worldwide.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/designs" className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]">
              Explore Designs <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/shop" className="inline-flex items-center gap-2 h-11 px-6 border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-sm transition-colors min-h-[44px]">
              Shop All Products
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
