import { useParams, Link } from "react-router";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DesignCard } from "@/components/brand/DesignCard";
import { getCollectionBySlug, getDesignsByCollection, collections, designs } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug || "");
  const collectionDesigns = collection ? getDesignsByCollection(collection.id) : [];

  // Related collections (excluding current)
  const relatedCollections = collections.filter((c) => c.id !== collection?.id).slice(0, 3);

  if (!collection) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Collection not found</p>
            <Link to="/collections" className="text-sm font-medium text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
              Browse collections
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* ─── Hero ─── */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[55vh] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px] text-white/50 mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/collections" className="hover:text-white transition-colors">Collections</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{collection.name}</span>
            </nav>

            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Collection</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
              {collection.name}
            </h1>
            <p className="text-sm text-white/60 mt-3 max-w-lg leading-relaxed">
              {collection.description}
            </p>
            <div className="flex items-center gap-4 mt-5">
              <span className="text-xs text-white/50">
                {collectionDesigns.length} {collectionDesigns.length === 1 ? "design" : "designs"} · {collection.productCount} products
              </span>
              <a
                href="#collection-designs"
                className="text-xs font-medium text-white uppercase tracking-wider hover:text-gold transition-colors flex items-center gap-1"
              >
                Browse Designs <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Designs Grid ─── */}
      <div id="collection-designs" className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {collectionDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
            {collectionDesigns.map((d) => (
              <DesignCard key={d.id} design={d} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-sm text-muted-foreground">No designs in this collection yet.</p>
            <Link to="/designs" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 mt-2 inline-block">
              Browse all designs
            </Link>
          </div>
        )}
      </div>

      {/* ─── Other Designs (if collection is small) ─── */}
      {collectionDesigns.length < 6 && (
        <div className="border-t border-border/50">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">You May Also Like</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">
              More from FAYANITY
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
              {designs
                .filter((d) => !collectionDesigns.find((cd) => cd.id === d.id))
                .slice(0, 4)
                .map((d) => (
                  <DesignCard key={d.id} design={d} />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Related Collections ─── */}
      {relatedCollections.length > 0 && (
        <div className="border-t border-border/50 bg-surface/20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Related</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">
              Other Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedCollections.map((c) => (
                <Link
                  key={c.id}
                  to={`/collections/${c.slug}`}
                  className="group relative aspect-[16/9] rounded-sm overflow-hidden bg-surface"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">{c.productCount} products</p>
                    <h3 className="text-lg font-display font-medium text-white">{c.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Newsletter ─── */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Stay Connected</p>
          <h2 className="font-display text-2xl lg:text-3xl font-medium mb-3">Join the Community</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Discover new designs, collections and special releases.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-11 px-4 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"
            />
            <button
              type="submit"
              className="h-11 px-6 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}
