import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Refunds() {
  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/legal" className="hover:text-foreground transition-colors">Legal</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Refund Policy</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Legal</p>
          <h1 className="font-display text-3xl lg:text-4xl font-medium tracking-tight mb-2">Refund Policy</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: August 2026</p>
          <p className="text-[11px] text-gold/60 mb-8 italic">[Replace with legally reviewed refund policy before launch.]</p>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>We stand behind the quality of our products. If you're not satisfied, here's our refund policy.</p>
            <div>
              <h3 className="font-medium text-foreground mb-2">Eligibility</h3>
              <p>Refunds are available for orders returned within 30 days of delivery. Items must be unworn, unused, and in original packaging.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Process</h3>
              <p>Contact hello@fayanity.com with your order number. Once we receive and verify the return, refunds are processed within 5-10 business days to your original payment method.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Non-Refundable Items</h3>
              <p>Items that have been worn, washed, or damaged by the customer are not eligible for refund. Custom orders are final sale.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Late or Missing Refunds</h3>
              <p>If you haven't received your refund within 10 business days, please check with your bank or payment provider, then contact us.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
