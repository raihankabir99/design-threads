import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No products found",
  description = "We couldn't find anything matching your selection.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-20 md:py-28 px-6", className)}>
      {/* Minimal icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-border/50 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-muted-foreground/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <h3 className="font-display text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
