"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../Components/Logo";
import { useAuth } from "../Components/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "register" && form.password !== form.confirm) {
      setMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    setLoading(true);
    setMsg(null);
    setTimeout(() => {
      setLoading(false);
      login();
      router.push("/dashboard");
    }, 1400);
  };

  return (
    <main className="min-h-screen bg-brandBg dark:bg-slate-950 flex items-center justify-center p-4 pt-28 pb-8 font-sans">
      {/* bg blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-brandPrimary/6 blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brandSecondary/6 blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="relative w-full max-w-lg z-10">

        {/* Top accent */}
        <div className="h-1 w-full bg-linear-to-r from-brandPrimary to-brandSecondary rounded-t-3xl" />

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-b-3xl border-x border-b border-brandLine dark:border-slate-700 shadow-[0_20px_60px_rgba(15,23,42,0.10)] overflow-hidden">
          <div className="p-8 sm:p-10">

            {/* Logo + Back */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <Logo size={34} />
                <div>
                  <p className="text-sm font-extrabold tracking-[0.12em] text-brandInk dark:text-white uppercase leading-none">Malik Kashan</p>
                  <p className="text-[9px] font-mono tracking-[0.22em] text-brandPrimary uppercase mt-1">Client Portal</p>
                </div>
              </Link>
              <Link href="/" className="flex items-center gap-1.5 text-[11px] font-semibold text-brandMuted hover:text-brandPrimary transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-2xl font-black text-brandInk dark:text-white leading-tight">
                {tab === "login" ? "Welcome back" : "Create account"}
              </h1>
              <p className="text-xs text-brandMuted mt-1.5">
                {tab === "login"
                  ? "Sign in to access your project dashboard"
                  : "Register as a client to track your projects"}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex bg-brandSoft dark:bg-slate-800 rounded-xl p-1 mb-6">
              {["login", "register"].map((t) => (
                <button key={t} onClick={() => { setTab(t); setMsg(null); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold tracking-widest rounded-lg transition-all capitalize cursor-pointer ${
                    tab === t
                      ? "bg-white dark:bg-slate-700 text-brandPrimary shadow-sm"
                      : "text-brandMuted hover:text-brandInk dark:text-slate-400"
                  }`}>
                  {t}
                </button>
              ))}
            </div>


            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "register" && (
                <Field label="Full Name" icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                }>
                  <input type="text" required placeholder="Your full name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={INPUT_CLS} />
                </Field>
              )}

              <Field label="Email Address" icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }>
                <input type="email" required placeholder="you@example.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={INPUT_CLS} />
              </Field>

              <Field
                label="Password"
                icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
                right={tab === "login" && <Link href="#" className="text-[10px] text-brandPrimary hover:underline font-bold">Forgot?</Link>}
              >
                <div className="relative">
                  <input type={showPass ? "text" : "password"} required placeholder="••••••••"
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`${INPUT_CLS} pr-10`} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brandMuted hover:text-brandPrimary transition-colors cursor-pointer">
                    {showPass
                      ? <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    }
                  </button>
                </div>
              </Field>

              {tab === "register" && (
                <Field label="Confirm Password" icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" /><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }>
                  <input type="password" required placeholder="••••••••"
                    value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    className={INPUT_CLS} />
                </Field>
              )}

              {msg && (
                <div className={`flex items-start gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold ${
                  msg.type === "error"
                    ? "bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                    : "bg-brandPrimary/8 border border-brandPrimary/20 text-brandPrimary"
                }`}>
                  <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                  </svg>
                  {msg.text}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full mt-1 py-3.5 text-[11px] font-bold tracking-widest text-white bg-brandPrimary hover:bg-brandSecondary disabled:opacity-60 rounded-xl transition-all uppercase shadow-[0_4px_16px_rgba(8,145,178,0.3)] hover:shadow-[0_4px_20px_rgba(8,145,178,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>
                    {tab === "login" ? "Sign In" : "Create Account"}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-brandMuted mt-5">
              {tab === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setTab(tab === "login" ? "register" : "login"); setMsg(null); }}
                className="text-brandPrimary font-bold hover:underline cursor-pointer">
                {tab === "login" ? "Register here" : "Sign in"}
              </button>
            </p>

            <div className="mt-4 pt-4 border-t border-brandLine dark:border-slate-700 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-brandMuted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
              <Link href="/dashboard" className="text-[11px] font-semibold text-brandMuted hover:text-brandPrimary transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-brandMuted/50 mt-5 font-mono">
          © 2026 Malik Kashan · Secure client portal
        </p>
      </div>
    </main>
  );
}

const INPUT_CLS = "w-full pl-10 pr-4 py-3 text-sm bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary focus:bg-white dark:focus:bg-slate-700 transition-all";

function Field({ label, icon, right, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[10px] font-mono tracking-widest text-brandMuted uppercase font-bold">{label}</label>
        {right}
      </div>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brandMuted pointer-events-none">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}
