import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  name: string;
  country: string;
  rating: number;
  date: string;
  text: string;
}

const mockReviews: Review[] = [
  {
    name: "Anna K.",
    country: "Germany",
    rating: 5,
    date: "2026-08-15",
    text: "Beautiful print quality. The design looks exactly like the mockup and the fabric feels premium. Arrived well-packaged.",
  },
  {
    name: "James W.",
    country: "United Kingdom",
    rating: 5,
    date: "2026-08-10",
    text: "Ordered the hoodie — the print is crisp and the material is soft. Sizing is accurate. Very happy with this purchase.",
  },
  {
    name: "Yuki T.",
    country: "Japan",
    rating: 4,
    date: "2026-08-05",
    text: "Love the design. The tote bag is sturdy and the print quality is excellent. Only wish there were more color options.",
  },
  {
    name: "Lina M.",
    country: "Sweden",
    rating: 5,
    date: "2026-07-28",
    text: "My third purchase from FAYANITY. The designs are original and the quality is consistently excellent. Shipping to Sweden was fast.",
  },
  {
    name: "Omar H.",
    country: "Saudi Arabia",
    rating: 5,
    date: "2026-07-20",
    text: "Premium quality products. The design is even better in person. Delivery to Saudi Arabia took about 10 days which was reasonable.",
  },
  {
    name: "Sophie D.",
    country: "France",
    rating: 4,
    date: "2026-07-15",
    text: "The mug is well-made and the design is vibrant. Fast shipping within Europe. Would definitely recommend.",
  },
];

const breakdown = [
  { stars: 5, count: 89, pct: 70 },
  { stars: 4, count: 28, pct: 22 },
  { stars: 3, count: 8, pct: 6 },
  { stars: 2, count: 2, pct: 1 },
  { stars: 1, count: 1, pct: 1 },
];

export function ReviewSection() {
  const avgRating = 4.8;
  const totalReviews = 128;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-10">
        <div className="shrink-0">
          <p className="text-4xl font-display font-medium">{avgRating}</p>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(avgRating) ? "text-gold fill-gold" : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Based on {totalReviews} reviews</p>
        </div>

        {/* Rating breakdown */}
        <div className="flex-1 space-y-1.5 max-w-xs">
          {breakdown.map((b) => (
            <div key={b.stars} className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-3 text-right">{b.stars}</span>
              <Star className="h-3 w-3 text-gold/50 fill-gold/50 shrink-0" />
              <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold/60 rounded-full transition-all"
                  style={{ width: `${b.pct}%` }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground w-6 text-right">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {mockReviews.map((review, i) => (
          <div key={i} className="pb-6 border-b border-border/30 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{review.name}</p>
                  <p className="text-[11px] text-muted-foreground">{review.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={cn(
                      "h-3 w-3",
                      j < review.rating ? "text-gold fill-gold" : "text-muted-foreground/20"
                    )}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
            <p className="text-[11px] text-muted-foreground/60 mt-2">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
