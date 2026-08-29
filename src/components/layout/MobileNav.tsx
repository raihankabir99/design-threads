import { useEffect } from "react";
import { Link } from "react-router";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { designs } from "@/data/mock";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Designs", href: "/designs" },
  { label: "Collections", href: "/collections" },
  { label: "New Drops", href: "/shop?sort=new" },
  { label: "Best Sellers", href: "/shop?sort=best" },
  { label: "Blog", href: "/blog" },
];

const bottomLinks = [
  { label: "About", href: "/about" },
  { label: "Shipping", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-full max-w-sm bg-background border-r border-border/50 transition-transform duration-300 ease-out lg:hidden flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border/50">
          <span className="font-display text-lg font-semibold tracking-tight">MIDTHREAD</span>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-5">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-3 text-foreground text-base font-medium hover:text-gold transition-colors"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Featured designs */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-label text-muted-foreground mb-4">Featured Designs</p>
            <div className="space-y-3">
              {designs.slice(0, 4).map((d) => (
                <Link
                  key={d.id}
                  to={`/designs/${d.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded bg-surface overflow-hidden shrink-0">
                    <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.products.length} products</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom links */}
        <div className="px-5 py-4 border-t border-border/50">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {bottomLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
