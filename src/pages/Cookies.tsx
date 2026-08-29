import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Cookies() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-label text-gold mb-3">Legal</p>
          <h1 className="text-display text-3xl lg:text-4xl mb-6">Cookie Policy</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: August 2026</p>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>This policy explains how FAYANITY uses cookies and similar technologies when you visit our website.</p>
            <div>
              <h3 className="font-medium text-foreground mb-2">Essential Cookies</h3>
              <p>Required for the website to function properly. These handle authentication, security, and basic site operations. Cannot be disabled.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Analytics Cookies</h3>
              <p>Help us understand how visitors use our website, allowing us to improve the user experience. Data is collected anonymously.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Marketing Cookies</h3>
              <p>Used to deliver relevant advertisements and track campaign performance. Only set with your explicit consent.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Managing Cookies</h3>
              <p>You can control cookie preferences through your browser settings. Disabling essential cookies may affect website functionality.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
