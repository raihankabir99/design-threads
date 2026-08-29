import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Terms() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-label text-gold mb-3">Legal</p>
          <h1 className="text-display text-3xl lg:text-4xl mb-6">Terms & Conditions</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: August 2026</p>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>By using the MIDTHREAD website and services, you agree to these terms and conditions.</p>
            <div>
              <h3 className="font-medium text-foreground mb-2">Products & Orders</h3>
              <p>All products are made to order. Product images are representations of the final product. Colors may vary slightly due to screen settings. We reserve the right to limit order quantities.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Pricing</h3>
              <p>All prices are displayed in the selected currency and include applicable taxes where required. Shipping costs are calculated at checkout based on destination.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Intellectual Property</h3>
              <p>All designs, images, and content on this website are the property of MIDTHREAD and are protected by intellectual property laws. Unauthorized use is prohibited.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Limitation of Liability</h3>
              <p>MIDTHREAD's liability is limited to the purchase price of the product. We are not responsible for indirect, incidental, or consequential damages.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
