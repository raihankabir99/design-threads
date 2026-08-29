import { useState } from "react";
import { Camera, Check } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { useAuth } from "@/hooks/use-auth";
import { mockCustomer } from "@/data/accountData";
import { FormField, inputClass } from "@/components/brand/FormField";

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || mockCustomer.firstName,
    lastName: user?.name?.split(" ")[1] || mockCustomer.lastName,
    email: user?.email || mockCustomer.email,
    phone: mockCustomer.phone,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AccountLayout>
      <div className="space-y-6 max-w-lg">
        <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">Profile</h1>

        {/* Avatar */}
        <div className="flex items-center gap-4 p-5 border border-border/50 rounded-sm">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-lg font-medium text-muted-foreground">
              {form.firstName[0]}{form.lastName[0]}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center"
              aria-label="Change photo"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium">{form.firstName} {form.lastName}</p>
            <p className="text-xs text-muted-foreground">{form.email}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Member since {new Date(mockCustomer.joinedDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="First Name" htmlFor="firstName">
              <input id="firstName" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} className={inputClass} />
            </FormField>
            <FormField label="Last Name" htmlFor="lastName">
              <input id="lastName" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} className={inputClass} />
            </FormField>
          </div>
          <FormField label="Email" htmlFor="email">
            <input id="email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} readOnly />
            <p className="text-[10px] text-muted-foreground mt-1">Email changes require verification.</p>
          </FormField>
          <FormField label="Phone" htmlFor="phone">
            <input id="phone" type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+49 ..." className={inputClass} />
          </FormField>
        </div>

        <button
          onClick={handleSave}
          className="h-11 px-6 text-xs font-semibold uppercase tracking-wider bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors flex items-center gap-2 min-h-[44px]"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </AccountLayout>
  );
}
