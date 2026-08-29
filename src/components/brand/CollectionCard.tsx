import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { Collection } from "@/data/types";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className="group block relative"
    >
      <div className="aspect-[16/9] rounded-sm overflow-hidden bg-surface relative">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
          <p className="text-label text-gold/80 mb-1.5">{collection.productCount} Products</p>
          <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-white mb-1.5">
            {collection.name}
          </h3>
          <p className="text-sm text-white/70 max-w-xs line-clamp-2">{collection.description}</p>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 group-hover:text-gold transition-colors mt-3">
            View Collection
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
        {collection.isNew && (
          <span className="absolute top-4 left-4 text-label text-gold bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-sm">
            New
          </span>
        )}
      </div>
    </Link>
  );
}
