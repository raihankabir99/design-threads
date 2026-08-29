import { Link } from "react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is FAYANITY?", a: "FAYANITY is a premium t-shirt and apparel brand. We create original designs and bring them to life on high-quality garments and accessories. Every piece is made to order with care." },
  { q: "How does made-to-order work?", a: "Every garment is made to order. When you place an order, it's produced by our manufacturing partner and shipped directly to you. This means zero waste, no overstock, and every piece is freshly made just for you." },
  { q: "What is the quality like?", a: "We use premium materials: 100% organic cotton (180 GSM for tees, 320 GSM for hoodies), archival inks, and meticulous construction. Every garment is pre-shrunk and built to last. Quality is non-negotiable." },
  { q: "How long does shipping take?", a: "Shipping times vary by destination. EU orders typically arrive in 5-10 business days, US/Canada in 7-14 business days, and international orders in 10-21 business days. All orders include tracking." },
  { q: "Do you ship internationally?", a: "Yes! We ship to 50+ countries worldwide including all EU countries, UK, Switzerland, Norway, USA, Canada, Saudi Arabia, Bangladesh, and many more. Shipping rates are calculated at checkout." },
  { q: "What is your return policy?", a: "We offer 30-day returns on all unworn, unused garments in their original packaging. If you're not satisfied with your order, contact us within 30 days of delivery for a full refund or exchange." },
  { q: "Can I request a custom design?", a: "We feature our own curated collection of original designs. We're always expanding, so if there's something you'd love to see, let us know through our contact page." },
  { q: "Are your products sustainable?", a: "We prioritize sustainability through made-to-order production (zero waste), organic cotton, eco-friendly inks, and recyclable packaging. Our model eliminates the environmental cost of overproduction." },
  { q: "How do sizes run?", a: "Our garments follow standard EU/US sizing with a detailed size guide available on each product page. All items are pre-shrunk to maintain their fit after washing." },
  { q: "Can I track my order?", a: "Yes, every order includes a tracking number. You'll receive an email with tracking details once your order has been dispatched from our production facility." },
];

export default function FAQ() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10 lg:mb-14">
            <p className="text-label text-gold mb-3">Support</p>
            <h1 className="text-display text-3xl lg:text-4xl">Frequently Asked Questions</h1>
          </div>

          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/50">
                <AccordionTrigger className="text-sm font-medium text-left py-5 hover:no-underline hover:text-gold transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 pt-8 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground mb-3">Still have questions?</p>
            <Link
              to="/contact"
              className="text-sm font-medium text-gold hover:text-gold-light transition-colors"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
