import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Mail, MessageCircle, Package, HelpCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { FormField, inputClass, selectClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

const supportOptions = [
  { icon: Mail, title: "Email Support", desc: "General questions, feedback, and partnership inquiries.", action: "hello@fayanity.com", href: "mailto:hello@fayanity.com" },
  { icon: Package, title: "Order Support", desc: "Issues with an existing order, delivery, or product.", action: "Track or manage order", href: "/track-order" },
  { icon: MessageCircle, title: "Shipping Support", desc: "Questions about delivery times, tracking, or international shipping.", action: "Shipping info", href: "/shipping" },
  { icon: HelpCircle, title: "General Questions", desc: "Anything else — our FAQ might also help.", action: "Browse FAQ", href: "/faq" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", orderNumber: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Please enter a valid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Contact</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="bg-background border-b border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Support</p>
            <h1 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">We're here to help.</h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">Questions about an order, product, or anything else? Reach out and we'll get back to you within 24 hours.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Support Options */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 lg:mb-24 max-w-5xl mx-auto">
          {supportOptions.map((opt) => {
            const Icon = opt.icon;
            const isExternal = opt.href.startsWith("mailto:");
            return (
              <Link
                key={opt.title}
                to={opt.href}
                className="p-5 border border-border/50 rounded-sm hover:bg-surface/30 transition-colors group block"
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon className="h-5 w-5 text-gold mb-3" />
                <h3 className="text-sm font-medium mb-1">{opt.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{opt.desc}</p>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                  {opt.action} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="font-display text-xl font-medium tracking-tight mb-6">Send a Message</h2>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Name" htmlFor="name" required error={errors.name}>
                    <input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" className={inputClass} />
                  </FormField>
                  <FormField label="Email" htmlFor="email" required error={errors.email}>
                    <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="name@email.com" className={inputClass} />
                  </FormField>
                </div>
                <FormField label="Order Number (optional)" htmlFor="orderNumber">
                  <input id="orderNumber" value={form.orderNumber} onChange={(e) => set("orderNumber", e.target.value)} placeholder="FY-2026-00124" className={inputClass} />
                </FormField>
                <FormField label="Subject" htmlFor="subject" required error={errors.subject}>
                  <select id="subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} className={selectClass}>
                    <option value="">Select a topic</option>
                    <option value="order">Order Issue</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="return">Return or Exchange</option>
                    <option value="product">Product Question</option>
                    <option value="general">General Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </FormField>
                <FormField label="Message" htmlFor="message" required error={errors.message}>
                  <textarea id="message" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us more..." rows={5} className={cn(inputClass, "resize-none h-auto py-2.5")} />
                </FormField>
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-11 px-6 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors flex items-center gap-2 min-h-[44px] disabled:opacity-50"
                >
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="p-6 border border-border/50 rounded-sm text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-display text-lg font-medium mb-2">Message sent</h3>
                <p className="text-sm text-muted-foreground mb-4">We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", orderNumber: "", subject: "", message: "" }); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* Order Support */}
          <div>
            <h2 className="font-display text-xl font-medium tracking-tight mb-6">Need help with an order?</h2>
            <div className="border border-border/50 rounded-sm p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4">Enter your order number to quickly identify your purchase and get faster support.</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Order number" className="flex-1 h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors" />
                <Link to="/track-order" className="h-10 px-4 bg-foreground text-background text-xs font-semibold rounded-sm hover:bg-foreground/90 transition-colors flex items-center min-w-[80px] justify-center">
                  Get Help
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Response Times</h3>
              <div className="space-y-2">
                {[
                  { label: "General inquiries", time: "Within 24 hours" },
                  { label: "Order issues", time: "Within 12 hours" },
                  { label: "Returns & refunds", time: "Within 24 hours" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-surface/30 rounded-sm">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground/60">Response times apply during business days (Mon–Fri).</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
