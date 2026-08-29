import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: string | string[];
}

interface ProductAccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
}

export function ProductAccordion({ items, defaultOpen }: ProductAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="divide-y divide-border/50">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between py-4 text-left min-h-[44px]"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium">{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-4",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-[500px] pb-4" : "max-h-0"
              )}
            >
              {typeof item.content === "string" ? (
                <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
              ) : (
                <ul className="space-y-1.5">
                  {item.content.map((line, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-gold mt-1 shrink-0">·</span>
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
