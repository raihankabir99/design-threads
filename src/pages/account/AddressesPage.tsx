import { useState } from "react";
import { MapPin, Plus, Edit3, Trash2, Star, X } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { mockAddresses, type MockAddress } from "@/data/accountData";
import { FormField, inputClass, selectClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

const countries = [
  "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Sweden", "Denmark",
  "United Kingdom", "Switzerland", "Norway", "United States", "Canada", "Saudi Arabia",
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<MockAddress[]>(mockAddresses);
  const [editing, setEditing] = useState<MockAddress | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyForm: Omit<MockAddress, "id"> = {
    label: "Home",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Germany",
    phone: "",
    isDefault: false,
  };
  const [form, setForm] = useState(emptyForm);

  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleEdit = (addr: MockAddress) => {
    setEditing(addr);
    setForm({ ...addr });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const handleSave = () => {
    if (editing) {
      setAddresses((prev) => prev.map((a) => a.id === editing.id ? { ...a, ...form } : a));
    } else {
      const newAddr: MockAddress = { ...form, id: `addr-${Date.now()}` };
      setAddresses((prev) => [...prev, newAddr]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">Addresses</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-xs font-medium bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors flex items-center gap-1.5 min-h-[36px]"
          >
            <Plus className="h-3.5 w-3.5" /> Add Address
          </button>
        </div>

        {/* Address Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowForm(false)} />
            <div className="relative bg-background border border-border/60 rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-medium">{editing ? "Edit Address" : "Add New Address"}</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <FormField label="Label" htmlFor="label">
                  <input id="label" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="Home, Office..." className={inputClass} />
                </FormField>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="First Name" htmlFor="firstName" required>
                    <input id="firstName" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} className={inputClass} />
                  </FormField>
                  <FormField label="Last Name" htmlFor="lastName" required>
                    <input id="lastName" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} className={inputClass} />
                  </FormField>
                </div>
                <FormField label="Address" htmlFor="address" required>
                  <input id="address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} placeholder="Street address" className={inputClass} />
                </FormField>
                <FormField label="Apartment / Suite" htmlFor="apartment">
                  <input id="apartment" value={form.apartment || ""} onChange={(e) => setForm((f) => ({ ...f, apartment: e.target.value }))} className={inputClass} />
                </FormField>
                <div className="grid grid-cols-3 gap-3">
                  <FormField label="City" htmlFor="city" required>
                    <input id="city" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className={inputClass} />
                  </FormField>
                  <FormField label="State" htmlFor="state">
                    <input id="state" value={form.state || ""} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} className={inputClass} />
                  </FormField>
                  <FormField label="Postal Code" htmlFor="postalCode" required>
                    <input id="postalCode" value={form.postalCode} onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))} className={inputClass} />
                  </FormField>
                </div>
                <FormField label="Country" htmlFor="country" required>
                  <select id="country" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} className={selectClass}>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Phone" htmlFor="phone">
                  <input id="phone" type="tel" value={form.phone || ""} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+49 ..." className={inputClass} />
                </FormField>
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer min-h-[44px]">
                  <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))} className="w-4 h-4 rounded border-border bg-surface accent-foreground" />
                  Set as default address
                </label>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-border/50">
                <button onClick={() => setShowForm(false)} className="flex-1 h-10 text-xs font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} className="flex-1 h-10 text-xs font-semibold bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors">
                  Save Address
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Address Cards */}
        {addresses.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-sm font-medium mb-1">No saved addresses</p>
            <p className="text-xs text-muted-foreground mb-6">Add an address to speed up checkout.</p>
            <button onClick={handleAdd} className="text-xs font-medium text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
              Add Your First Address →
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div key={addr.id} className={cn("border rounded-sm p-5", addr.isDefault ? "border-foreground/30" : "border-border/50")}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-medium px-2 py-0.5 bg-gold/10 text-gold rounded-sm flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" /> Default
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm">{addr.firstName} {addr.lastName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{addr.address}{addr.apartment ? `, ${addr.apartment}` : ""}</p>
                <p className="text-xs text-muted-foreground">{addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.postalCode}</p>
                <p className="text-xs text-muted-foreground">{addr.country}</p>
                {addr.phone && <p className="text-xs text-muted-foreground mt-1">{addr.phone}</p>}

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                  <button onClick={() => handleEdit(addr)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    <Edit3 className="h-3 w-3" /> Edit
                  </button>
                  {!addr.isDefault && (
                    <button onClick={() => handleSetDefault(addr.id)} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                      Set as Default
                    </button>
                  )}
                  <button onClick={() => handleDelete(addr.id)} className="text-[11px] text-muted-foreground hover:text-red-500 transition-colors ml-auto flex items-center gap-1">
                    <Trash2 className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
