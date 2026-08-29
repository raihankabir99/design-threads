import { useState } from "react";
import { Link } from "react-router";
import { Mail, ArrowLeft, ArrowRight, Loader2, Check } from "lucide-react";
import { FormField, inputClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    setError("");
    // Mock delay
    setTimeout(() => {
      setSent(true);
      setIsLoading(false);
    }, 1500);
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
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">Forgot your password?</h1>
                <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Email" htmlFor="email" required>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="email@example.com" className={cn(inputClass, "pl-10")} disabled={isLoading} required />
                  </div>
                </FormField>

                {error && <p className="text-[11px] text-red-500" role="alert">{error}</p>}

                <button type="submit" disabled={isLoading} className="w-full h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send Reset Link <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <h1 className="font-display text-2xl font-medium tracking-tight mb-2">Check your inbox</h1>
              <p className="text-sm text-muted-foreground mb-2">
                We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>.
              </p>
              <p className="text-xs text-muted-foreground mb-8">
                Didn't receive it? Check your spam folder or try again.
              </p>
              <div className="space-y-3">
                <button onClick={() => setSent(false)} className="w-full h-11 text-xs font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[44px]">
                  Try Another Email
                </button>
                <Link to="/login" className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-3 w-3" /> Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
