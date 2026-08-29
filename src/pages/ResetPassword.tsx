import { useState } from "react";
import { Link } from "react-router";
import { Lock, ArrowRight, Loader2, Check, Eye, EyeOff } from "lucide-react";
import { FormField, inputClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setDone(true);
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
          {!done ? (
            <>
              <div className="text-center mb-8">
                <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-2">Reset your password</h1>
                <p className="text-sm text-muted-foreground">Choose a new password for your account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="New Password" htmlFor="password" required>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Minimum 8 characters" className={cn(inputClass, "pl-10 pr-10")} disabled={isLoading} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Hide" : "Show"}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormField>

                <FormField label="Confirm New Password" htmlFor="confirmPassword" required>
                  <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }} placeholder="Repeat password" className={inputClass} disabled={isLoading} required />
                </FormField>

                <div className="p-3 bg-surface/50 rounded-sm">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Password must be at least 8 characters. For best security, use a mix of letters, numbers, and symbols.
                  </p>
                </div>

                {error && <p className="text-[11px] text-red-500" role="alert">{error}</p>}

                <button type="submit" disabled={isLoading} className="w-full h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Reset Password <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <h1 className="font-display text-2xl font-medium tracking-tight mb-2">Password updated</h1>
              <p className="text-sm text-muted-foreground mb-8">Your password has been reset successfully.</p>
              <Link to="/login" className="w-full h-11 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 min-h-[44px]">
                Sign In <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
