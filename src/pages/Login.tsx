import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { FormField, inputClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { signIn, isLoading: authLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate(returnTo);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.set("email", email);
      await signIn("email-otp", formData);
      // After email-otp, user goes to OTP verification
      navigate(`/auth?returnTo=${encodeURIComponent(returnTo)}`);
    } catch (err) {
      setError("Please check your email and password.");
      setIsLoading(false);
    }
  };

  const handleGuest = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signIn("anonymous");
      navigate(returnTo);
    } catch {
      setError("Could not continue as guest. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-medium tracking-tight">FAYANITY</Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Email" htmlFor="email" required>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="email@example.com"
                  className={cn(inputClass, "pl-10")}
                  disabled={isLoading}
                  required
                />
              </div>
            </FormField>

            <FormField label="Password" htmlFor="password" required>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                  className={cn(inputClass, "pl-10 pr-10")}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </FormField>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer min-h-[44px]">
                <input type="checkbox" className="w-4 h-4 rounded border-border bg-surface accent-foreground" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Forgot Password?
              </Link>
            </div>

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
                <>Sign In <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-background text-[11px] uppercase tracking-wider text-muted-foreground">Or</span></div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleGuest}
              disabled={isLoading}
              className="w-full h-10 text-xs font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[44px]"
            >
              Continue as Guest
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link to={`/register?returnTo=${encodeURIComponent(returnTo)}`} className="text-foreground font-medium hover:underline underline-offset-2">
              Create Account
            </Link>
          </p>

          <p className="text-center text-[10px] text-muted-foreground/50 mt-6">
            By signing in, you agree to our <Link to="/terms" className="underline underline-offset-2">Terms</Link> and <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
