import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import type { ProductType } from "@/data/types";
import { cn } from "@/lib/utils";

export interface FilterState {
  types: ProductType[];
  sizes: string[];
  colors: string[];
  priceRange: string[];
  collections: string[];
  designStyles: string[];
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onClear: () => void;
}

const productTypes: { value: ProductType; label: string }[] = [
  { value: "t-shirt", label: "T-Shirts" },
  { value: "hoodie", label: "Hoodies" },
  { value: "sweatshirt", label: "Sweatshirts" },
  { value: "tote-bag", label: "Tote Bags" },
  { value: "mug", label: "Mugs" },
  { value: "phone-case", label: "Phone Cases" },
  { value: "cap", label: "Caps" },
  { value: "poster", label: "Posters" },
  { value: "sticker", label: "Stickers" },
  { value: "notebook", label: "Notebooks" },
  { value: "cushion", label: "Cushions" },
  { value: "kids-t-shirt", label: "Kids T-Shirts" },
  { value: "baby-onesie", label: "Baby Onesies" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const colors = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#f5f5f0" },
  { name: "Cream", hex: "#e8dcc8" },
  { name: "Grey", hex: "#888888" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Sand", hex: "#c2b280" },
  { name: "Olive", hex: "#556b2f" },
];

const priceRanges = [
  { value: "under-20", label: "Under €20" },
  { value: "20-30", label: "€20 – €30" },
  { value: "30-50", label: "€30 – €50" },
  { value: "50-plus", label: "€50+" },
];

const designStyles = [
  { value: "minimal", label: "Minimal" },
  { value: "typography", label: "Typography" },
  { value: "graphic", label: "Graphic" },
  { value: "illustration", label: "Illustration" },
  { value: "artistic", label: "Artistic" },
  { value: "lifestyle", label: "Lifestyle" },
];

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-5 border-b border-border/50 last:border-b-0">
      <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-3">{title}</h4>
      {children}
    </div>
  );
}

function ChipToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-xs rounded-sm border transition-all min-h-[44px] flex items-center",
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
      )}
    >
      {label}
    </button>
  );
}

export function FilterDrawer({ open, onClose, filters, onApply, onClear }: FilterDrawerProps) {
  const [local, setLocal] = useState<FilterState>(filters);

  useEffect(() => {
    if (open) setLocal(filters);
  }, [open, filters]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleInArray = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const selectedCount =
    local.types.length + local.sizes.length + local.colors.length +
    local.priceRange.length + local.designStyles.length;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex flex-col" role="dialog" aria-modal="true" aria-label="Filter products">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative ml-auto w-full max-w-sm h-full bg-background flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Filters</h3>
            {selectedCount > 0 && (
              <span className="text-[10px] bg-gold text-background px-1.5 py-0.5 rounded-full font-medium">
                {selectedCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Close filters">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Filter content */}
        <div className="flex-1 overflow-y-auto px-5">
          <FilterSection title="Product Type">
            <div className="flex flex-wrap gap-2">
              {productTypes.map((t) => (
                <ChipToggle
                  key={t.value}
                  label={t.label}
                  active={local.types.includes(t.value)}
                  onClick={() => setLocal({ ...local, types: toggleInArray(local.types, t.value) })}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Size">
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <ChipToggle
                  key={s}
                  label={s}
                  active={local.sizes.includes(s)}
                  onClick={() => setLocal({ ...local, sizes: toggleInArray(local.sizes, s) })}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Color">
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setLocal({ ...local, colors: toggleInArray(local.colors, c.name) })}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-xs rounded-sm border transition-all min-h-[44px]",
                    local.colors.includes(c.name)
                      ? "border-foreground bg-surface"
                      : "border-border hover:border-foreground/40"
                  )}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-border/60 shrink-0" style={{ backgroundColor: c.hex }} />
                  {c.name}
                  {local.colors.includes(c.name) && <Check className="h-3 w-3 text-gold" />}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Price">
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((p) => (
                <ChipToggle
                  key={p.value}
                  label={p.label}
                  active={local.priceRange.includes(p.value)}
                  onClick={() => setLocal({ ...local, priceRange: toggleInArray(local.priceRange, p.value) })}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Design Style">
            <div className="flex flex-wrap gap-2">
              {designStyles.map((s) => (
                <ChipToggle
                  key={s.value}
                  label={s.label}
                  active={local.designStyles.includes(s.value)}
                  onClick={() => setLocal({ ...local, designStyles: toggleInArray(local.designStyles, s.value) })}
                />
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/50 flex items-center gap-3 shrink-0">
          <button
            onClick={() => { onClear(); onClose(); }}
            className="flex-1 h-11 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-sm transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={() => { onApply(local); onClose(); }}
            className="flex-1 h-11 text-xs font-semibold bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
