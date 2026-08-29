import { useState } from "react";
import { Link } from "react-router";
import { X, AlertTriangle, LogOut, Trash2, Shield, Monitor, Smartphone, Globe, Check, ArrowRight } from "lucide-react";
import { AccountLayout } from "@/components/layout/AccountLayout";
import { useAuth } from "@/hooks/use-auth";
import { FormField, inputClass, selectClass } from "@/components/brand/FormField";
import { cn } from "@/lib/utils";

const mockSessions = [
  { id: "s1", device: "Chrome on macOS", location: "Berlin, Germany", lastActive: "Current session", isCurrent: true, icon: Monitor },
  { id: "s2", device: "Safari on iPhone", location: "Berlin, Germany", lastActive: "2 hours ago", isCurrent: false, icon: Smartphone },
  { id: "s3", device: "Firefox on Windows", location: "Munich, Germany", lastActive: "3 days ago", isCurrent: false, icon: Monitor },
];

export default function SettingsPage() {
  const { signOut } = useAuth();
  const [signOutModal, setSignOutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  // Preferences
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("EUR");

  // Communication
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);

  // Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  // Security
  const [twoFA, setTwoFA] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    window.location.href = "/";
  };

  const handlePasswordSave = () => {
    setPwSaved(true);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => setPwSaved(false), 2000);
  };

  return (
    <AccountLayout>
      <div className="space-y-8 max-w-2xl">
        <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">Account Settings</h1>

        {/* Password */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Password</h2>
          <div className="p-5 border border-border/50 rounded-sm space-y-4">
            <FormField label="Current Password" htmlFor="currentPw">
              <input id="currentPw" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} className={inputClass} placeholder="Enter current password" />
            </FormField>
            <FormField label="New Password" htmlFor="newPw">
              <input id="newPw" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} className={inputClass} placeholder="Enter new password" />
            </FormField>
            <FormField label="Confirm New Password" htmlFor="confirmPw">
              <input id="confirmPw" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className={inputClass} placeholder="Confirm new password" />
            </FormField>
            <p className="text-[10px] text-muted-foreground">Password must be at least 8 characters.</p>
            <button
              onClick={handlePasswordSave}
              disabled={!currentPw || !newPw || newPw !== confirmPw}
              className="h-10 px-5 text-xs font-medium bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {pwSaved ? <><Check className="h-3.5 w-3.5" /> Password Updated</> : "Update Password"}
            </button>
          </div>
        </section>

        {/* Two-Step Verification */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Security</h2>
          <div className="border border-border/50 rounded-sm divide-y divide-border/50">
            {/* 2FA */}
            <div className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Two-Step Verification</p>
                  <p className="text-[11px] text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button
                onClick={() => setTwoFA(!twoFA)}
                className={cn(
                  "relative w-10 h-6 rounded-full transition-colors shrink-0",
                  twoFA ? "bg-foreground" : "bg-border"
                )}
                role="switch"
                aria-checked={twoFA}
              >
                <span className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-background transition-transform",
                  twoFA ? "left-5" : "left-1"
                )} />
              </button>
            </div>

            {/* Active Sessions */}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Sessions</p>
                    <p className="text-[11px] text-muted-foreground">{mockSessions.length} devices signed in</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSessions(!showSessions)}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {showSessions ? "Hide" : "View Sessions"}
                  <ArrowRight className={cn("h-3 w-3 transition-transform", showSessions && "rotate-90")} />
                </button>
              </div>
              {showSessions && (
                <div className="mt-4 space-y-2">
                  {mockSessions.map((session) => {
                    const Icon = session.icon;
                    return (
                      <div key={session.id} className="flex items-center gap-3 p-3 bg-surface/30 rounded-sm">
                        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-medium truncate">{session.device}</p>
                            {session.isCurrent && (
                              <span className="text-[9px] px-1.5 py-0.5 bg-green-500/10 text-green-500 rounded-sm font-medium">Current</span>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground">{session.location} · {session.lastActive}</p>
                        </div>
                        {!session.isCurrent && (
                          <button className="text-[10px] text-muted-foreground hover:text-red-500 transition-colors">
                            Revoke
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Preferences</h2>
          <div className="p-5 border border-border/50 rounded-sm space-y-4">
            <FormField label="Language" htmlFor="language">
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className={selectClass}>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="it">Italiano</option>
                <option value="ar">العربية</option>
              </select>
              <p className="text-[10px] text-muted-foreground mt-1">UI language — more languages coming soon.</p>
            </FormField>
            <FormField label="Currency" htmlFor="currency">
              <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className={selectClass}>
                <option value="EUR">EUR €</option>
                <option value="GBP">GBP £</option>
                <option value="USD">USD $</option>
                <option value="SAR">SAR ﷼</option>
                <option value="CHF">CHF ₣</option>
                <option value="CAD">CAD $</option>
              </select>
              <p className="text-[10px] text-muted-foreground mt-1">Display currency — conversion rates are applied at checkout.</p>
            </FormField>
          </div>
        </section>

        {/* Communication */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Communication</h2>
          <div className="p-5 border border-border/50 rounded-sm space-y-4">
            {[
              { label: "Email Notifications", desc: "Receive important account updates", checked: emailNotifs, onChange: setEmailNotifs },
              { label: "Order Updates", desc: "Get notified about your order status", checked: orderUpdates, onChange: setOrderUpdates },
              { label: "Marketing Emails", desc: "New designs, collections and special offers", checked: marketing, onChange: setMarketing },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between gap-4 cursor-pointer min-h-[44px]">
                <div>
                  <p className="text-sm">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => item.onChange(!item.checked)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors shrink-0",
                    item.checked ? "bg-foreground" : "bg-border"
                  )}
                  role="switch"
                  aria-checked={item.checked}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-background transition-transform",
                    item.checked ? "left-5" : "left-1"
                  )} />
                </button>
              </label>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Privacy</h2>
          <div className="p-5 border border-border/50 rounded-sm space-y-2">
            <Link to="/privacy" className="flex items-center justify-between p-3 rounded-sm hover:bg-surface/50 transition-colors min-h-[44px]">
              <span className="text-sm">Privacy Policy</span>
              <span className="text-xs text-muted-foreground">→</span>
            </Link>
            <Link to="/cookies" className="flex items-center justify-between p-3 rounded-sm hover:bg-surface/50 transition-colors min-h-[44px]">
              <span className="text-sm">Cookie Preferences</span>
              <span className="text-xs text-muted-foreground">→</span>
            </Link>
          </div>
        </section>

        {/* Account Actions */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Account</h2>
          <div className="p-5 border border-border/50 rounded-sm space-y-3">
            <button
              onClick={() => setSignOutModal(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] w-full"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
            <div className="border-t border-border/50 pt-3">
              <button
                onClick={() => setDeleteModal(true)}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors min-h-[44px] w-full"
              >
                <Trash2 className="h-4 w-4" /> Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Sign Out Modal */}
      {signOutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSignOutModal(false)} />
          <div className="relative bg-background border border-border/60 rounded-sm shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setSignOutModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-display text-lg font-medium mb-2">Sign out of your account?</h3>
            <p className="text-xs text-muted-foreground mb-6">You will need to sign in again to access your account.</p>
            <div className="flex gap-3">
              <button onClick={() => setSignOutModal(false)} className="flex-1 h-10 text-xs font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button onClick={handleSignOut} disabled={signingOut} className="flex-1 h-10 text-xs font-semibold bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors">
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setDeleteModal(false); setDeleteConfirm(""); }} />
          <div className="relative bg-background border border-border/60 rounded-sm shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium">Delete your account?</h3>
                <p className="text-[11px] text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              All your data including orders, wishlist, and addresses will be permanently deleted. You will not be able to recover this information.
            </p>
            <FormField label="Type DELETE to confirm" htmlFor="deleteConfirm">
              <input
                id="deleteConfirm"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="DELETE"
                className={inputClass}
              />
            </FormField>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setDeleteModal(false); setDeleteConfirm(""); }} className="flex-1 h-10 text-xs font-medium border border-border rounded-sm text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button
                disabled={deleteConfirm !== "DELETE"}
                className="flex-1 h-10 text-xs font-semibold bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
