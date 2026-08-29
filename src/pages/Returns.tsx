import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Returns() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-label text-gold mb-3">Policy</p>
          <h1 className="text-display text-3xl lg:text-4xl mb-6">Returns & Exchanges</h1>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>We want you to love your MIDTHREAD products. If you're not completely satisfied, we're here to help.</p>
            <div>
              <h3 className="font-medium text-foreground mb-2">30-Day Return Window</h3>
              <p>You have 30 days from the date of delivery to initiate a return. Items must be unworn, unused, and in their original packaging.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">How to Initiate a Return</h3>
              <p>Contact our support team at hello@midthread.com with your order number and reason for return. We'll provide return instructions and a prepaid shipping label where applicable.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Refunds</h3>
              <p>Once we receive and inspect your return, we'll process a refund to your original payment method within 5-10 business days.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Exchanges</h3>
              <p>We offer free exchanges for different sizes or colors of the same product. Contact us to arrange an exchange.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Damaged or Defective Items</h3>
              <p>If your order arrives damaged or defective, please contact us within 7 days with photos of the issue. We'll send a replacement at no cost.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
