import { SiteLayout } from "@/components/layout/SiteLayout";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div>
            <p className="text-label text-gold mb-3">Get in Touch</p>
            <h1 className="text-display text-3xl lg:text-4xl mb-6">Contact Us</h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-md">
              Have a question, suggestion, or partnership inquiry? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-surface flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">hello@fayanity.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-surface flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Europe · Shipping Worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-surface flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Response Time</p>
                  <p className="text-sm text-muted-foreground">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1.5">Name</label>
                  <input type="text" className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1.5">Email</label>
                  <input type="email" className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" placeholder="name@email.com" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Subject</label>
                <input type="text" className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Message</label>
                <textarea className="w-full h-32 px-3 py-2 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors resize-none" placeholder="Tell us more..." />
              </div>
              <button
                type="submit"
                className="h-11 px-6 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
