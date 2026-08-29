import { Link } from "react-router";
import { ChevronRight, Shield, FileText, Cookie, Truck, RotateCcw, Receipt } from "lucide-react";

const policies = [
  { icon: Shield, title: "Privacy Policy", desc: "How we collect, use, and protect your personal data.", href: "/privacy" },
  { icon: FileText, title: "Terms & Conditions", desc: "The rules governing your use of our website and services.", href: "/terms" },
  { icon: Cookie, title: "Cookie Policy", desc: "How we use cookies and similar technologies.", href: "/cookies" },
  { icon: Truck, title: "Shipping Policy", desc: "Delivery times, costs, and international shipping information.", href: "/shipping" },
  { icon: RotateCcw, title: "Returns & Refunds", desc: "Our return policy, refund process, and exchange options.", href: "/returns" },
  { icon: Receipt, title: "Refund Policy", desc: "Detailed refund terms and eligibility requirements.", href: "/refunds" },
];

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Legal</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Legal</p>
            <h1 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">Legal & Policies</h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">Transparent policies for a trustworthy shopping experience.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <Link key={policy.href} to={policy.href} className="group p-6 border border-border/50 rounded-sm hover:bg-surface/30 transition-colors block">
                <Icon className="h-5 w-5 text-gold mb-3" />
                <h2 className="text-sm font-medium mb-1 group-hover:text-gold transition-colors">{policy.title}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">{policy.desc}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[11px] text-muted-foreground/60">Last updated: August 2026</p>
          <p className="text-[11px] text-muted-foreground/60 mt-1">For questions about our policies, <Link to="/contact" className="underline underline-offset-2 hover:text-foreground transition-colors">contact us</Link>.</p>
        </div>
      </div>
    </div>
  );
}
