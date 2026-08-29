import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Refunds() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-label text-gold mb-3">Legal</p>
          <h1 className="text-display text-3xl lg:text-4xl mb-6">Refund Policy</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: August 2026</p>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>We stand behind the quality of our products. If you're not satisfied, here's our refund policy.</p>
            <div>
              <h3 className="font-medium text-foreground mb-2">Eligibility</h3>
              <p>Refunds are available for orders returned within 30 days of delivery. Items must be unworn, unused, and in original packaging.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Process</h3>
              <p>Contact hello@midthread.com with your order number. Once we receive and verify the return, refunds are processed within 5-10 business days to your original payment method.</p>
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
