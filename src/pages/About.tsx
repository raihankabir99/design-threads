import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { designs } from "@/data/mock";

export default function About() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,110,0.05)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-label text-gold mb-4">About MIDTHREAD</p>
            <h1 className="text-display text-4xl lg:text-6xl mb-6">
              Design Is the Product.
              <br />
              <span className="text-muted-foreground">The Product Is the Medium.</span>
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
              We are a design-led fashion and lifestyle brand. We believe a design is an independent
              visual entity that deserves to exist across many forms.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                title: "Design First",
                desc: "Every piece starts with a design — not a product template. Our visual language is the foundation of everything we create.",
              },
              {
                title: "Quality Always",
                desc: "Premium organic cotton, high-grade ceramics, archival inks. We partner with the best manufacturers to deliver exceptional quality.",
              },
              {
                title: "Conscious Creation",
                desc: "Made to order means zero waste. No overstock, no landfills. Every product is created specifically for you.",
              },
            ].map((value, i) => (
              <div key={i}>
                <span className="font-display text-4xl font-light text-border">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-medium mt-3 mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-display text-2xl lg:text-3xl mb-6">Our Story</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                MIDTHREAD was born from a simple observation: great design shouldn't be limited
                to a single product. A powerful visual statement deserves to live on your chest,
                in your hands, on your wall — wherever you want to carry it.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We operate globally from Europe, working with premium print-on-demand partners
                who share our commitment to quality. Every product is manufactured to order,
                eliminating waste while maintaining the highest standards.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our design philosophy draws from minimal Scandinavian aesthetics, bold
                contemporary art, and the confidence of modern luxury brands. The result is
                a collection that feels both timeless and distinctly current.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface">
                <img src={designs[1].heroImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface mt-6">
                <img src={designs[3].heroImage} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-label text-gold mb-3">Global Reach</p>
          <h2 className="text-display text-2xl lg:text-3xl mb-4">Designed in Europe. Loved Worldwide.</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
            We ship to 50+ countries across Europe, North America, the Middle East, and beyond.
            Every order is handled with care, from production to your doorstep.
          </p>
          <Link
            to="/shipping"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            Shipping Information
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
