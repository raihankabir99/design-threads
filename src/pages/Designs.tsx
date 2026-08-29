import { SiteLayout } from "@/components/layout/SiteLayout";
import { DesignCard } from "@/components/brand/DesignCard";
import { designs } from "@/data/mock";

export default function Designs() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Header */}
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <p className="text-label text-gold mb-3">Design-Led</p>
          <h1 className="text-display text-3xl lg:text-5xl">Our Designs</h1>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-lg">
            Each design is an independent visual entity — created to exist across
            multiple products. Explore our collection and discover your next favorite.
          </p>
        </div>

        {/* Designs grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {designs.map((d) => (
            <DesignCard key={d.id} design={d} />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
