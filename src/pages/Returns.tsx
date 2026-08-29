import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ChevronDown, Package, Camera, Search, RefreshCw, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { cn } from "@/lib/utils";

const returnSections = [
  {
    title: "Return Eligibility",
    content: "Items may be returned within 30 days of delivery if they are unworn, unused, and in their original packaging. [Insert verified return period and applicable consumer-law terms here before launch.]",
  },
  {
    title: "How to Start a Return",
    content: "Contact our support team at hello@fayanity.com with your order number and reason for return. We'll provide return instructions and a prepaid shipping label where applicable.",
  },
  {
    title: "Refund Process",
    content: "Once we receive and inspect your return, we'll process a refund to your original payment method within 5–10 business days. You'll receive an email confirmation when the refund is issued.",
  },
  {
    title: "Exchanges",
    content: "We offer exchanges for different sizes or colors of the same product. Contact us to arrange an exchange — we'll cover the shipping for defective or incorrect items.",
  },
  {
    title: "Order Cancellation",
    content: "You can cancel your order if it hasn't entered production yet. Once production has begun, cancellation is no longer possible, but you can return the item after delivery.",
  },
  {
    title: "Non-Returnable Items",
    content: "Items that have been worn, washed, or damaged by the customer are not eligible for return. Items purchased during special promotions may have different return terms.",
  },
];

const damagedFlow = [
  { icon: Package, title: "Product Arrives Damaged", desc: "You receive a product with visible damage or defects." },
  { icon: Camera, title: "Contact Support", desc: "Email us with your order number and photos of the damage." },
  { icon: Search, title: "We Review", desc: "Our team reviews your case within 1–2 business days." },
  { icon: RefreshCw, title: "Resolution", desc: "We send a replacement or process a refund — your choice." },
];

export default function Returns() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Returns</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="bg-background border-b border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Policy</p>
            <h1 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">Returns & Refunds</h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">A clear and simple guide to resolving order issues.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Expandable Sections */}
          <div className="mb-16 lg:mb-24">
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-6">Return Policy</h2>
            <div className="border border-border/50 rounded-sm divide-y divide-border/50">
              {returnSections.map((section, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenSection(openSection === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left min-h-[52px] hover:bg-surface/30 transition-colors"
                  >
                    <span className="text-sm font-medium">{section.title}</span>
                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0 ml-4", openSection === i && "rotate-180")} />
                  </button>
                  {openSection === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Damaged Product Flow */}
          <div className="mb-16 lg:mb-24">
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">Damaged Product Process</h2>
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {damagedFlow.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex gap-4 p-5 border border-border/50 rounded-sm">
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-gold">{String(i + 1).padStart(2, "0")}</span>
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

          {/* Contact CTA */}
          <div className="border border-border/50 rounded-sm p-6 lg:p-8 text-center">
            <h2 className="font-display text-lg font-medium mb-2">Need help with a return?</h2>
            <p className="text-sm text-muted-foreground mb-6">Our support team is here to help resolve any issues with your order.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 h-10 px-5 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]">
                Contact Support <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/track-order" className="inline-flex items-center gap-2 h-10 px-5 border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-sm transition-colors min-h-[44px]">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
