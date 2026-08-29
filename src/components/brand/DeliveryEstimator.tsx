import { useState } from "react";
import { MapPin, Clock, Package } from "lucide-react";

const countries = [
  { code: "DE", name: "Germany", flag: "🇩🇪", days: "5–8" },
  { code: "FR", name: "France", flag: "🇫🇷", days: "5–8" },
  { code: "IT", name: "Italy", flag: "🇮🇹", days: "6–9" },
  { code: "ES", name: "Spain", flag: "🇪🇸", days: "6–9" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", days: "5–7" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", days: "5–7" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", days: "6–9" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", days: "6–8" },
  { code: "AT", name: "Austria", flag: "🇦🇹", days: "5–8" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", days: "7–10" },
  { code: "PL", name: "Poland", flag: "🇵🇱", days: "5–8" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", days: "5–8" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", days: "5–8" },
  { code: "NO", name: "Norway", flag: "🇳🇴", days: "6–10" },
  { code: "US", name: "United States", flag: "🇺🇸", days: "8–14" },
  { code: "CA", name: "Canada", flag: "🇨🇦", days: "8–14" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", days: "8–14" },
  { code: "AE", name: "UAE", flag: "🇦🇪", days: "8–14" },
  { code: "JP", name: "Japan", flag: "🇯🇵", days: "10–16" },
  { code: "AU", name: "Australia", flag: "🇦🇺", days: "10–16" },
];

export function DeliveryEstimator() {
  const [selectedCountry, setSelectedCountry] = useState("DE");
  const country = countries.find((c) => c.code === selectedCountry) || countries[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Deliver to</p>
        </div>
      </div>

      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="w-full h-10 px-3 bg-surface border border-border rounded-sm text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors appearance-none cursor-pointer"
        aria-label="Select country"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.name}
          </option>
        ))}
      </select>

      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs">
              <span className="text-muted-foreground">Estimated delivery: </span>
              <span className="font-medium">{country.days} business days</span>
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Orders placed before 12:00 CET ship within 2–4 business days
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Package className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs">
              <span className="text-muted-foreground">Free shipping on orders over </span>
              <span className="font-medium">€50</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
