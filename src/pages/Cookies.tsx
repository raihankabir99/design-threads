import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export default function Cookies() {
  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/legal" className="hover:text-foreground transition-colors">Legal</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Cookie Policy</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Legal</p>
          <h1 className="font-display text-3xl lg:text-4xl font-medium tracking-tight mb-2">Cookie Policy</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: August 2026</p>
          <p className="text-[11px] text-gold/60 mb-8 italic">[Replace with legally reviewed cookie policy before launch.]</p>
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
