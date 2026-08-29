import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { Design } from "@/data/types";
import { productTypeLabel } from "@/data/mock";

interface DesignCardProps {
  design: Design;
}

const typeIcons: Record<string, string> = {
  "t-shirt": "Tee",
  "hoodie": "Hoodie",
  "sweatshirt": "Sweat",
  "tote-bag": "Tote",
  "mug": "Mug",
  "phone-case": "Phone",
  "cap": "Cap",
  "poster": "Art",
  "sticker": "Sticker",
  "notebook": "Book",
  "cushion": "Cushion",
  "kids-t-shirt": "Kids",
  "baby-onesie": "Baby",
};

export function DesignCard({ design }: DesignCardProps) {
  const featuredTypes = design.products.slice(0, 5);
  const extraCount = design.products.length - featuredTypes.length;

  return (
    <Link
      to={`/designs/${design.slug}`}
      className="group block relative"
    >
      {/* Image */}
      <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface mb-4 relative">
        <img
          src={design.heroImage}
          alt={design.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            Explore Design
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
        {design.isNew && (
          <span className="absolute top-3 left-3 text-label text-gold bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-sm">
            New
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="font-display text-base font-medium tracking-tight group-hover:text-gold transition-colors">
          {design.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
          {design.description}
        </p>

        {/* Product type pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {featuredTypes.map((type) => (
            <span
              key={type}
              className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground bg-surface px-2 py-0.5 rounded-sm"
            >
              {typeIcons[type] || productTypeLabel(type)}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-[10px] font-medium tracking-wider uppercase text-gold px-1 py-0.5">
              +{extraCount}
            </span>
          )}
        </div>

        <p className="text-[11px] text-muted-foreground mt-2">
          {design.products.length} products
        </p>
      </div>
    </Link>
  );
}
