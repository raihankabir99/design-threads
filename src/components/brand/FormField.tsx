import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, htmlFor, required, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground block"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-500 mt-1" role="alert">{error}</p>
      )}
    </div>
  );
}

export const inputClass = "w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors";
export const selectClass = "w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors appearance-none cursor-pointer";
