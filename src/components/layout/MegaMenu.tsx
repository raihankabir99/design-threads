import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { designs, products } from "@/data/mock";

interface MegaMenuPanelProps {
  open: boolean;
  type: "shop" | "designs" | "collections";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const shopCategories = [
  {
    label: "Apparel",
    items: [
      { label: "T-Shirts", href: "/shop?type=t-shirt" },
      { label: "Hoodies", href: "/shop?type=hoodie" },
      { label: "Sweatshirts", href: "/shop?type=sweatshirt" },
      { label: "Kids T-Shirts", href: "/shop?type=kids-t-shirt" },
      { label: "Baby Onesies", href: "/shop?type=baby-onesie" },
    ],
  },
  {
    label: "Accessories",
    items: [
      { label: "Tote Bags", href: "/shop?type=tote-bag" },
      { label: "Caps", href: "/shop?type=cap" },
      { label: "Phone Cases", href: "/shop?type=phone-case" },
    ],
  },
  {
    label: "Home & Lifestyle",
    items: [
      { label: "Mugs", href: "/shop?type=mug" },
      { label: "Posters & Wall Art", href: "/shop?type=poster" },
      { label: "Cushions", href: "/shop?type=cushion" },
      { label: "Notebooks", href: "/shop?type=notebook" },
      { label: "Stickers", href: "/shop?type=sticker" },
    ],
  },
  {
    label: "Featured",
    items: [
      { label: "New Drops", href: "/shop?sort=new" },
      { label: "Best Sellers", href: "/shop?sort=best" },
      { label: "All Products", href: "/shop" },
    ],
  },
];

const designCategories = [
  {
    label: "Browse",
    items: [
      { label: "All Designs", href: "/designs" },
      { label: "New Designs", href: "/designs?sort=new" },
      { label: "Best Sellers", href: "/designs?sort=best" },
    ],
  },
  {
    label: "Collections",
    items: [
      { label: "Essentials", href: "/collections/essentials" },
      { label: "Urban Nights", href: "/collections/urban-nights" },
      { label: "Botanical Dark", href: "/collections/botanical-dark" },
      { label: "All Collections", href: "/collections" },
    ],
  },
];

const collectionCategories = [
  {
    label: "Collections",
    items: [
      { label: "Essentials", href: "/collections/essentials" },
      { label: "Urban Nights", href: "/collections/urban-nights" },
      { label: "Botanical Dark", href: "/collections/botanical-dark" },
    ],
  },
  {
    label: "Shop by Theme",
    items: [
      { label: "Minimal", href: "/shop?sort=new" },
      { label: "Streetwear", href: "/shop?sort=best" },
      { label: "Art & Illustration", href: "/shop" },
      { label: "Gift Ideas", href: "/shop" },
    ],
  },
];

function ShopMegaMenu() {
  const featuredDesign = designs[0];
  const featuredProducts = products
    .filter((p) => p.designId === featuredDesign.id)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-5 gap-8 lg:gap-10">
      {shopCategories.map((cat) => (
        <div key={cat.label}>
          <p className="text-label text-muted-foreground mb-4">{cat.label}</p>
          <ul className="space-y-2.5">
            {cat.items.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Featured product area */}
      <div className="col-span-1">
        <p className="text-label text-gold mb-4">Featured</p>
        <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface mb-3 relative group">
          <img
            src={featuredDesign.heroImage}
            alt={featuredDesign.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-xs font-medium text-white">{featuredDesign.name}</p>
            <p className="text-[10px] text-white/60">{featuredDesign.products.length} products</p>
          </div>
        </div>
        <Link
          to={`/designs/${featuredDesign.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-light transition-colors"
        >
          Explore Design
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function DesignsMegaMenu() {
  return (
    <div className="grid grid-cols-4 gap-8 lg:gap-10">
      {designCategories.map((cat) => (
        <div key={cat.label}>
          <p className="text-label text-muted-foreground mb-4">{cat.label}</p>
          <ul className="space-y-2.5">
            {cat.items.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Featured design showcase */}
      <div className="col-span-2">
        <p className="text-label text-gold mb-4">Explore a Design</p>
        <div className="grid grid-cols-2 gap-3">
          {designs.slice(0, 4).map((d) => (
            <Link
              key={d.id}
              to={`/designs/${d.slug}`}
              className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-surface transition-colors group"
            >
              <div className="w-12 h-12 rounded-sm bg-surface overflow-hidden shrink-0 border border-border/40">
                <img
                  src={d.heroImage}
                  alt={d.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium group-hover:text-gold transition-colors truncate">
                  {d.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {d.products.length} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollectionsMegaMenu() {
  return (
    <div className="grid grid-cols-3 gap-8 lg:gap-10">
      {collectionCategories.map((cat) => (
        <div key={cat.label}>
          <p className="text-label text-muted-foreground mb-4">{cat.label}</p>
          <ul className="space-y-2.5">
            {cat.items.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Featured collection visual */}
      <div className="col-span-1">
        <p className="text-label text-gold mb-4">Featured Collection</p>
        <Link
          to="/collections/essentials"
          className="group block aspect-[4/3] rounded-sm overflow-hidden bg-surface relative"
        >
          <img
            src={designs[2].heroImage}
            alt="Essentials"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-gold/80 mb-1">Essentials</p>
            <p className="text-sm font-medium text-white">Core designs for everyday expression</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function MegaMenuPanel({ open, type }: MegaMenuPanelProps) {
  return (
    <div
      className={`
        absolute left-0 right-0 top-full bg-background/98 backdrop-blur-md border-b border-border/50
        transition-all duration-200 ease-out origin-top
        ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
      `}
      style={{ transformOrigin: "top" }}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {type === "shop" && <ShopMegaMenu />}
        {type === "designs" && <DesignsMegaMenu />}
        {type === "collections" && <CollectionsMegaMenu />}
      </div>
    </div>
  );
}
