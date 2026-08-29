import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Privacy() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-label text-gold mb-3">Legal</p>
          <h1 className="text-display text-3xl lg:text-4xl mb-6">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: August 2026</p>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>At FAYANITY, we respect your privacy and are committed to protecting your personal data.</p>
            <div>
              <h3 className="font-medium text-foreground mb-2">Information We Collect</h3>
              <p>We collect information you provide directly, including your name, email address, shipping address, and payment information when you place an order or create an account.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">How We Use Your Information</h3>
              <p>We use your information to process orders, communicate about your purchases, improve our services, and send marketing communications (with your consent).</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Data Sharing</h3>
              <p>We share your information only with necessary third-party services (payment processors, shipping partners) to fulfill your orders. We never sell your personal data.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Your Rights (GDPR)</h3>
              <p>If you're in the EU, you have the right to access, correct, or delete your personal data. Contact us at hello@fayanity.com to exercise these rights.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Cookies</h3>
              <p>We use essential cookies to operate our website and analytics cookies to improve your experience. See our Cookie Policy for details.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
