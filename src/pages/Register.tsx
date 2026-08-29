import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { FormField, inputClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const { signIn, isLoading: authLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/account";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate(returnTo);
    return null;
  }

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("Please accept the Terms & Conditions to continue.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.set("email", form.email);
      await signIn("email-otp", formData);
      navigate(`/auth?returnTo=${encodeURIComponent(returnTo)}`);
    } catch {
      setError("Could not create account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="border-b border-border/50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-medium tracking-tight">FAYANITY</Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">Create your account</h1>
            <p className="text-sm text-muted-foreground">Join the community and start discovering.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="First Name" htmlFor="firstName" required>
                <input id="firstName" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass} disabled={isLoading} required />
              </FormField>
              <FormField label="Last Name" htmlFor="lastName" required>
                <input id="lastName" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass} disabled={isLoading} required />
              </FormField>
            </div>

            <FormField label="Email" htmlFor="email" required>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@example.com" className={cn(inputClass, "pl-10")} disabled={isLoading} required />
              </div>
            </FormField>

            <FormField label="Password" htmlFor="password" required>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <input id="password" type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Minimum 8 characters" className={cn(inputClass, "pl-10 pr-10")} disabled={isLoading} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Hide" : "Show"}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </FormField>

            <FormField label="Confirm Password" htmlFor="confirmPassword" required>
              <input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} placeholder="Repeat password" className={inputClass} disabled={isLoading} required />
            </FormField>

            <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer min-h-[44px]">
              <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="w-4 h-4 rounded border-border bg-surface accent-foreground mt-0.5 shrink-0" />
              <span>
                I agree to the <Link to="/terms" className="text-foreground hover:underline">Terms & Conditions</Link> and acknowledge the <Link to="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            {error && (
              <p className="text-[11px] text-red-500 py-1" role="alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to={`/login?returnTo=${encodeURIComponent(returnTo)}`} className="text-foreground font-medium hover:underline underline-offset-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
