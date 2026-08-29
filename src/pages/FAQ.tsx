import { useState } from "react";
import { Link } from "react-router";
import { Search, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqCategories = ["All", "Orders", "Products", "Shipping", "Returns", "Payments", "Account"];

const faqs = [
  { category: "Products", q: "What is Print-on-Demand?", a: "Print-on-Demand (POD) means products are created only after you place an order. There's no pre-made inventory sitting in a warehouse. Each item is individually produced, which reduces waste and ensures every piece is freshly made for you." },
  { category: "Products", q: "Where are products made?", a: "Our products are produced by specialized fulfillment partners across Europe and internationally. We work with manufacturers who meet our quality standards for materials, printing, and construction." },
  { category: "Orders", q: "How long does production take?", a: "Production typically takes 2–5 business days depending on the product type and current demand. This is the time between order placement and dispatch." },
  { category: "Shipping", q: "How long does delivery take?", a: "Delivery times vary by destination. EU orders typically arrive in 5–10 business days after dispatch. US/Canada orders take 7–14 business days. International orders may take 10–21 business days." },
  { category: "Shipping", q: "Which countries do you ship to?", a: "We ship to 50+ countries worldwide including all EU countries, UK, Switzerland, Norway, USA, Canada, Saudi Arabia, UAE, and many more. Shipping rates are calculated at checkout based on your location." },
  { category: "Orders", q: "How can I track my order?", a: "Every order includes a tracking number. You'll receive an email with tracking details once your order has been dispatched from our production facility. You can also track your order through your account." },
  { category: "Orders", q: "Can I change my shipping address?", a: "You can change your shipping address if your order hasn't entered production yet. Contact our support team with your order number and the updated address as soon as possible." },
  { category: "Orders", q: "Can I cancel my order?", a: "You can cancel your order if it hasn't entered production. Once production has begun, cancellation is no longer possible, but you can return the item after delivery following our return policy." },
  { category: "Returns", q: "What happens if my product arrives damaged?", a: "If your product arrives damaged, please contact us within 7 days with photos of the damage and your order number. We'll arrange a replacement at no additional cost to you." },
  { category: "Returns", q: "What happens if I receive the wrong product?", a: "If you receive the wrong product, contact us immediately with your order number and a photo of what you received. We'll send the correct item and arrange a return for the incorrect one." },
  { category: "Products", q: "How do I choose my size?", a: "Each product page includes a detailed size guide with measurements for chest, length, and sleeve. Our garments follow standard EU/US sizing. If you're between sizes, we recommend sizing up for a more comfortable fit." },
  { category: "Products", q: "How should I care for my product?", a: "For best results: wash inside out in cold water, tumble dry on low heat, and avoid ironing directly on the printed design. Following these steps will help maintain the print quality and garment shape over time." },
  { category: "Payments", q: "What payment methods are available?", a: "We accept major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and PayPal. All payments are processed securely." },
  { category: "Account", q: "How can I contact customer support?", a: "You can reach us through our Contact page, by email at hello@fayanity.com, or through the support options in your account. We aim to respond within 24 hours on business days." },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = !searchQuery || faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SiteLayout>
      {/* Hero */}
      <div className="bg-background border-b border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Support</p>
            <h1 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">How can we help?</h1>
            <p className="text-sm text-muted-foreground mb-8">Search our FAQ or browse by category.</p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full h-12 pl-11 pr-4 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 mb-8">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-xs font-medium rounded-sm border transition-all whitespace-nowrap min-h-[36px]",
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Results */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-display text-lg font-medium mb-2">We couldn't find that.</p>
              <p className="text-sm text-muted-foreground mb-6">Try another search or contact our support team.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 h-10 px-5 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors min-h-[44px]">
                Contact Support
              </Link>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-0">
              {filteredFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-sm font-medium text-left py-5 hover:no-underline hover:text-gold transition-colors">
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-muted-foreground bg-surface px-2 py-0.5 rounded-sm shrink-0">{faq.category}</span>
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {/* Contact CTA */}
          <div className="mt-12 pt-8 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground mb-3">Still have questions?</p>
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold transition-colors">
              Contact Us <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
