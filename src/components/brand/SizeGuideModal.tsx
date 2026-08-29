import { useState, useEffect } from "react";
import { X, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  productType?: string;
}

const sizeData: Record<string, { headers: string[]; rows: string[][] }> = {
  "t-shirt": {
    headers: ["Size", "Chest", "Length", "Sleeve"],
    rows: [
      ["XS", "86 cm", "68 cm", "19 cm"],
      ["S", "92 cm", "70 cm", "20 cm"],
      ["M", "98 cm", "72 cm", "21 cm"],
      ["L", "104 cm", "74 cm", "22 cm"],
      ["XL", "110 cm", "76 cm", "23 cm"],
      ["XXL", "116 cm", "78 cm", "24 cm"],
    ],
  },
  hoodie: {
    headers: ["Size", "Chest", "Length", "Sleeve"],
    rows: [
      ["S", "102 cm", "70 cm", "64 cm"],
      ["M", "108 cm", "72 cm", "65 cm"],
      ["L", "114 cm", "74 cm", "66 cm"],
      ["XL", "120 cm", "76 cm", "67 cm"],
      ["XXL", "126 cm", "78 cm", "68 cm"],
    ],
  },
  sweatshirt: {
    headers: ["Size", "Chest", "Length", "Sleeve"],
    rows: [
      ["S", "100 cm", "68 cm", "62 cm"],
      ["M", "106 cm", "70 cm", "63 cm"],
      ["L", "112 cm", "72 cm", "64 cm"],
      ["XL", "118 cm", "74 cm", "65 cm"],
      ["XXL", "124 cm", "76 cm", "66 cm"],
    ],
  },
};

function getTypeGuide(type: string) {
  if (sizeData[type]) return sizeData[type];
  return sizeData["t-shirt"];
}

export function SizeGuideModal({ open, onClose, productType = "t-shirt" }: SizeGuideModalProps) {
  const guide = getTypeGuide(productType);
  const [activeTab, setActiveTab] = useState<"sizes" | "measure">("sizes");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-background border border-border/60 rounded-sm shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h3 className="font-display text-lg font-medium">Size Guide</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/50">
          <button
            onClick={() => setActiveTab("sizes")}
            className={cn(
              "flex-1 py-3 text-xs font-medium tracking-wider transition-colors border-b-2",
              activeTab === "sizes" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"
            )}
          >
            Size Chart
          </button>
          <button
            onClick={() => setActiveTab("measure")}
            className={cn(
              "flex-1 py-3 text-xs font-medium tracking-wider transition-colors border-b-2",
              activeTab === "measure" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"
            )}
          >
            How to Measure
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "sizes" ? (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    {guide.headers.map((h) => (
                      <th key={h} className="text-left py-3 pr-4 text-[11px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-b-0">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={cn(
                            "py-3 pr-4 text-sm whitespace-nowrap",
                            j === 0 ? "font-medium" : "text-muted-foreground"
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Chest</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Measure around the fullest part of your chest, keeping the tape level and under your arms.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Length</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Measure from the highest point of the shoulder down to the bottom hem.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Sleeve</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Measure from the shoulder seam to the end of the sleeve along the outside arm.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-surface/50 rounded-sm">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Tip:</span> If you are between sizes, we recommend sizing up for a relaxed fit or staying true to size for a regular fit.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/50">
          <p className="text-[11px] text-muted-foreground text-center">
            Measurements are approximate. All sizes are in centimeters.
          </p>
        </div>
      </div>
    </div>
  );
}
