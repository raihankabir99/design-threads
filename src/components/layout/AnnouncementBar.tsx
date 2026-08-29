import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

const announcements = [
  "NEW DROP — Explore the latest collection of original designs",
  "Free worldwide shipping on orders over €75",
  "Every design. Every product. Made to order.",
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  if (!visible) return null;

  const nextAnnouncement = () => {
    setIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="relative bg-foreground text-background z-[55]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          <div className="flex-1 flex items-center justify-center gap-2 text-center">
            <p className="text-[11px] sm:text-xs font-medium tracking-wide truncate">
              {announcements[index]}
            </p>
            <Link
              to="/designs"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-gold hover:text-gold-light transition-colors shrink-0"
            >
              Shop Now
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={nextAnnouncement}
              className="w-6 h-6 flex items-center justify-center text-background/60 hover:text-background transition-colors"
              aria-label="Next announcement"
            >
              <ArrowRight className="h-3 w-3 -rotate-90" />
            </button>
            <button
              onClick={() => setVisible(false)}
              className="w-6 h-6 flex items-center justify-center text-background/60 hover:text-background transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
