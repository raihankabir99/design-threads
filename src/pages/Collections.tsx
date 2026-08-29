import { SiteLayout } from "@/components/layout/SiteLayout";
import { CollectionCard } from "@/components/brand/CollectionCard";
import { collections } from "@/data/mock";

export default function Collections() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <p className="text-label text-gold mb-3">Curated</p>
          <h1 className="text-display text-3xl lg:text-5xl">Collections</h1>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Thoughtfully curated groupings of designs united by a shared aesthetic.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
