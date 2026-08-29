import { useState } from "react";
import { Link } from "react-router";
import { Instagram, ArrowRight, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "T-Shirts", href: "/shop?type=t-shirt" },
      { label: "Hoodies", href: "/shop?type=hoodie" },
      { label: "Sweatshirts", href: "/shop?type=sweatshirt" },
      { label: "Tote Bags", href: "/shop?type=tote-bag" },
      { label: "Mugs", href: "/shop?type=mug" },
      { label: "Phone Cases", href: "/shop?type=phone-case" },
      { label: "Accessories", href: "/shop?category=accessories" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Designs", href: "/designs" },
      { label: "Collections", href: "/collections" },
      { label: "New Drops", href: "/shop?sort=new" },
      { label: "Best Sellers", href: "/shop?sort=best" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
      { label: "Order Tracking", href: "/track-order" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Design Philosophy", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Legal Center", href: "/legal" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

const regions = [
  { label: "Europe", flag: "🇪🇺", currency: "EUR €" },
  { label: "United Kingdom", flag: "🇬🇧", currency: "GBP £" },
  { label: "United States", flag: "🇺🇸", currency: "USD $" },
  { label: "Saudi Arabia", flag: "🇸🇦", currency: "SAR ﷼" },
  { label: "Canada", flag: "🇨🇦", currency: "CAD $" },
  { label: "Switzerland", flag: "🇨🇭", currency: "CHF ₣" },
  { label: "Norway", flag: "🇳🇴", currency: "NOK kr" },
  { label: "Bangladesh", flag: "🇧🇩", currency: "BDT ৳" },
];

const languages = [
  { label: "English", code: "EN" },
  { label: "Deutsch", code: "DE" },
  { label: "Français", code: "FR" },
  { label: "Español", code: "ES" },
  { label: "العربية", code: "AR" },
];

export function Footer() {
  const [regionOpen, setRegionOpen] = useState(false);

  return (
    <footer className="bg-background border-t border-border/50">
      {/* Newsletter */}
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-label text-gold mb-3">Stay Connected</p>
            <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-3">
              Join the Community
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Discover new designs, collections, and special releases.
            </p>
            <form
              className="flex gap-2 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-11 px-4 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="submit"
                className="h-11 px-5 bg-gold text-background text-sm font-medium tracking-wide rounded-sm hover:bg-gold-light transition-colors flex items-center gap-2 shrink-0"
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
            <p className="text-[11px] text-muted-foreground/60 mt-3">
              By subscribing, you agree to receive updates from FAYANITY.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 mb-4 lg:mb-0">
            <Link
              to="/"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              FAYANITY
            </Link>
            <p className="text-sm text-muted-foreground mt-3 max-w-[260px] leading-relaxed">
              Premium t-shirts and apparel. Bold designs, consciously crafted.
              One design, every product.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  aria-label={social.label}
                >
                  <Instagram className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Country / Region selector */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <button
                onClick={() => setRegionOpen(!regionOpen)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Region & Currency</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    regionOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  regionOpen ? "max-h-[300px] opacity-100 mt-3" : "max-h-0 opacity-0"
                )}
              >
                <div className="grid grid-cols-2 gap-1.5">
                  {regions.map((region) => (
                    <button
                      key={region.label}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5 text-left"
                    >
                      <span>{region.flag}</span>
                      <span>{region.label}</span>
                      <span className="text-muted-foreground/50 ml-auto">{region.currency}</span>
                    </button>
                  ))}
                </div>

                {/* Language selector */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground mb-2">
                    Language
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={cn(
                          "text-xs px-2.5 py-1 rounded-sm border transition-colors",
                          lang.code === "EN"
                            ? "border-gold/50 text-gold bg-gold/5"
                            : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-label text-muted-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Community section */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span className="font-medium text-label text-muted-foreground">Community</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} FAYANITY. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Designed with intention</span>
            <span className="mx-1.5">·</span>
            <span>Shipped worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
