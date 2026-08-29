import { SiteLayout } from "@/components/layout/SiteLayout";

const regions = [
  { region: "European Union", time: "5-10 business days", cost: "Free over €50", note: "All EU countries" },
  { region: "United Kingdom", time: "5-10 business days", cost: "€4.99 / Free over €75", note: "Import duties may apply" },
  { region: "Switzerland / Norway", time: "7-12 business days", cost: "€6.99 / Free over €100", note: "Import duties may apply" },
  { region: "USA / Canada", time: "7-14 business days", cost: "€6.99 / Free over €100", note: "Import duties may apply" },
  { region: "Middle East", time: "10-18 business days", cost: "€8.99 / Free over €120", note: "Select countries" },
  { region: "Rest of World", time: "10-21 business days", cost: "€9.99 / Free over €120", note: "50+ countries" },
];

export default function Shipping() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-label text-gold mb-3">Information</p>
          <h1 className="text-display text-3xl lg:text-4xl mb-6">Shipping Information</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-xl">
            We ship worldwide from Europe. Every order is produced on demand and shipped
            with tracking. Delivery times begin from the date of dispatch.
          </p>

          <div className="border border-border/50 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-surface">
                  <th className="text-left px-4 py-3 text-label text-muted-foreground font-medium">Region</th>
                  <th className="text-left px-4 py-3 text-label text-muted-foreground font-medium hidden sm:table-cell">Delivery</th>
                  <th className="text-left px-4 py-3 text-label text-muted-foreground font-medium">Shipping</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.region} className="border-b border-border/30 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{r.region}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{r.time}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{r.time}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <h3 className="font-display text-lg font-medium text-foreground">Important Notes</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>All orders include tracking. You'll receive a tracking number via email once dispatched.</li>
              <li>International orders may be subject to customs duties and taxes, which are the responsibility of the customer.</li>
              <li>Delivery times are estimates and may vary during peak periods.</li>
              <li>Orders are processed within 1-3 business days before shipping.</li>
            </ul>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
