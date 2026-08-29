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

  const handleSocialAuth = (provider: string) => {
    // Visual placeholder only
    setIsLoading(true);
    setTimeout(() => {
      setError(`Continue with ${provider} is not available yet.`);
      setIsLoading(false);
    }, 800);
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
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4">Welcome Back</p>
              <h2 className="font-display text-4xl xl:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-6">
                Where design<br />meets identity.
              </h2>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                Discover original designs made on demand. Explore t-shirts, hoodies, accessories and lifestyle products crafted for everyday expression.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {["#1a1a1a", "#c2a87d", "#f5f0e8", "#2d3748"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-foreground/80 overflow-hidden" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="text-[11px] text-white/40">Join 2,400+ design lovers</p>
            </div>
          </div>
        </div>

        {/* Right: Login form */}
        <div className="flex-1 lg:w-1/2 xl:w-[45%] flex items-center justify-center px-4 sm:px-8 py-8 lg:py-12">
          <div className="w-full max-w-md">
            {/* Desktop logo */}
            <div className="hidden lg:block mb-10">
              <Link to="/" className="font-display text-xl font-medium tracking-tight">FAYANITY</Link>
            </div>

            <div className="mb-8">
              <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to your account to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Email Address" htmlFor="email" required>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="Enter your email"
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

            {/* Social auth */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
              <div className="relative flex justify-center"><span className="px-3 bg-background text-[11px] uppercase tracking-wider text-muted-foreground">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Google", icon: (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="currentColor" className="text-[#4285F4]" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" className="text-[#34A853]" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" className="text-[#FBBC05]" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" className="text-[#EA4335]" />
                  </svg>
                )},
                { label: "Facebook", icon: (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )},
                { label: "Email", icon: <Mail className="h-4 w-4" />},
              ].map((provider) => (
                <button
                  key={provider.label}
                  onClick={() => handleSocialAuth(provider.label)}
                  disabled={isLoading}
                  className="h-11 flex items-center justify-center gap-2 text-xs font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[44px] disabled:opacity-50"
                >
                  {provider.icon}
                  <span className="hidden sm:inline">{provider.label}</span>
                </button>
              ))}
            </div>

            {/* Guest */}
            <div className="mt-4">
              <button
                onClick={handleGuest}
                disabled={isLoading}
                className="w-full h-10 text-xs font-medium border border-border/50 rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[44px]"
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
    </div>
  );
}
