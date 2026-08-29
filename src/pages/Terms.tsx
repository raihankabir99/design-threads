import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Terms() {
  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/legal" className="hover:text-foreground transition-colors">Legal</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Terms & Conditions</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Legal</p>
          <h1 className="font-display text-3xl lg:text-4xl font-medium tracking-tight mb-2">Terms & Conditions</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: August 2026</p>
          <p className="text-[11px] text-gold/60 mb-8 italic">[Replace with legally reviewed terms before launch.]</p>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>By using the FAYANITY website and services, you agree to these terms and conditions.</p>
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
              <p>All designs, images, and content on this website are the property of FAYANITY and are protected by intellectual property laws. Unauthorized use is prohibited.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Limitation of Liability</h3>
              <p>FAYANITY's liability is limited to the purchase price of the product. We are not responsible for indirect, incidental, or consequential damages.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
