import { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { FormField, inputClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
  if (score === 2) return { score, label: "Fair", color: "bg-orange-400" };
  if (score === 3) return { score, label: "Good", color: "bg-blue-400" };
  return { score, label: "Strong", color: "bg-green-500" };
}

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

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

  const strength = useMemo(() => getPasswordStrength(form.password), [form.password]);

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
      {/* Mobile header */}
      <div className="lg:hidden border-b border-border/50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-medium tracking-tight">FAYANITY</Link>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left: Editorial visual (desktop only) */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/80" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.3\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
          <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
            <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-white">
              FAYANITY
            </Link>
            <div className="max-w-md">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4">Join the Community</p>
              <h2 className="font-display text-4xl xl:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-6">
                One design.<br />Every product.
              </h2>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                Create your account to save designs, track orders, and discover new collections made for everyday expression.
              </p>
            </div>
            <div className="flex items-center gap-6">
              {[
                { num: "120+", label: "Designs" },
                { num: "13", label: "Products" },
                { num: "2.4k", label: "Customers" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-medium text-white">{stat.num}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Register form */}
        <div className="flex-1 lg:w-1/2 xl:w-[45%] flex items-center justify-center px-4 sm:px-8 py-8 lg:py-12">
          <div className="w-full max-w-md">
            {/* Desktop logo */}
            <div className="hidden lg:block mb-10">
              <Link to="/" className="font-display text-xl font-medium tracking-tight">FAYANITY</Link>
            </div>

            <div className="mb-8">
              <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">Create your account</h1>
              <p className="text-sm text-muted-foreground">Join the community and keep your favorite designs, orders and products in one place.</p>
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

              <FormField label="Email Address" htmlFor="email" required>
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

                {/* Password strength */}
                {form.password.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-300", strength.color)} style={{ width: `${(strength.score / 4) * 100}%` }} />
                      </div>
                      <span className={cn("text-[10px] font-medium uppercase tracking-wider", strength.score <= 1 ? "text-red-500" : strength.score === 2 ? "text-orange-400" : strength.score === 3 ? "text-blue-400" : "text-green-500")}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {passwordRequirements.map((req) => (
                        <div key={req.label} className="flex items-center gap-1.5">
                          {req.test(form.password) ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-muted-foreground/40" />
                          )}
                          <span className={cn("text-[10px]", req.test(form.password) ? "text-foreground" : "text-muted-foreground/60")}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </FormField>

              <FormField label="Confirm Password" htmlFor="confirmPassword" required>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} placeholder="Repeat your password" className={cn(inputClass, "pl-10")} disabled={isLoading} required />
                  {form.confirmPassword.length > 0 && (
                    form.password === form.confirmPassword ? (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                    ) : (
                      <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                    )
                  )}
                </div>
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

            <p className="text-center text-[10px] text-muted-foreground/50 mt-6">
              By creating an account, you agree to our <Link to="/terms" className="underline underline-offset-2">Terms</Link> and <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
