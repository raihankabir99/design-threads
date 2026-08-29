import { Link } from "react-router";
import { Instagram, Twitter, ArrowRight } from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "T-Shirts", href: "/shop?type=t-shirt" },
      { label: "Hoodies", href: "/shop?type=hoodie" },
      { label: "Sweatshirts", href: "/shop?type=sweatshirt" },
      { label: "Tote Bags", href: "/shop?type=tote-bag" },
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
      { label: "Returns", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  },
];

export function Footer() {
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
              Be the first to know about new drops, exclusive designs, and member-only offers.
            </p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
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
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="font-display text-xl font-semibold tracking-tight text-foreground">
              MIDTHREAD
            </Link>
            <p className="text-sm text-muted-foreground mt-3 max-w-[240px] leading-relaxed">
              Design-led fashion and lifestyle. One design, many products.
              Premium quality, conscious creation.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                aria-label="TikTok"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-label text-muted-foreground mb-4">{section.title}</h4>
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

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MIDTHREAD. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Designed in Europe</span>
            <span className="mx-1.5">·</span>
            <span>Shipped Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
