import { useParams, Link } from "react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DesignCard } from "@/components/brand/DesignCard";
import { getCollectionBySlug, getDesignsByCollection } from "@/data/mock";

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug || "");
  const collectionDesigns = collection ? getDesignsByCollection(collection.id) : [];

  if (!collection) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Collection not found</p>
            <Link to="/collections" className="text-sm text-gold hover:text-gold-light transition-colors">
              Browse collections
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 pb-10">
            <p className="text-label text-gold mb-2">Collection</p>
            <h1 className="text-display text-3xl lg:text-5xl">{collection.name}</h1>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg">{collection.description}</p>
          </div>
        </div>
      </div>

      {/* Designs */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {collectionDesigns.map((d) => (
            <DesignCard key={d.id} design={d} />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
