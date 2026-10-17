"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../Components/Logo";

const TECH_OPTIONS = ["Next.js", "React", "Shopify", "WordPress", "Laravel", "Vue.js", "Tailwind CSS", "Other"];
const STATUS_OPTIONS = ["Planning", "In Progress", "Review", "Completed"];

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    client: "",
    tech: "Next.js",
    budget: "",
    deadline: "",
    status: "Planning",
    progress: 0,
    notes: "",
  });
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    if (!form.name.trim() || !form.client.trim()) return;
    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  const STATUS_COLOR = {
    Planning: "border-slate-300 text-brandMuted",
    "In Progress": "border-amber-400 text-amber-600",
    Review: "border-violet-400 text-violet-600",
    Completed: "border-emerald-400 text-emerald-600",
  };

  return (
    <div className="min-h-screen bg-brandBg dark:bg-slate-950 font-sans">
      {/* Topbar */}
      <header className="bg-white dark:bg-slate-900 border-b border-brandLine dark:border-slate-700 px-5 py-3.5 flex items-center gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <div>
            <p className="text-[10px] font-black text-brandInk dark:text-white tracking-widest uppercase">Malik Kashan</p>
            <p className="text-[9px] font-mono text-brandPrimary tracking-[0.2em] uppercase">New Project</p>
          </div>
        </div>
        <div className="flex-1" />
        <Link href="/dashboard"
          className="text-xs font-bold text-brandMuted hover:text-brandPrimary border border-brandLine dark:border-slate-700 px-3 py-2 rounded-xl transition-colors">
          ← Back to Dashboard
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8 space-y-5">
        <div>
          <h1 className="text-xl font-black text-brandInk dark:text-white">Add New Project</h1>
          <p className="text-xs text-brandMuted mt-1">Track a new client project with progress and deadline.</p>
        </div>

        {saved && (
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Project saved! Redirecting to dashboard…</p>
          </div>
        )}

        {/* Basic info */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5 space-y-4">
          <p className="text-[10px] font-mono text-brandMuted uppercase tracking-widest font-bold">Project Details</p>
          <div>
            <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Project Name *</label>
            <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Zara E-Commerce Store"
              className="w-full px-4 py-3 text-sm font-semibold bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Client Name *</label>
              <input type="text" value={form.client} onChange={(e) => set("client", e.target.value)}
                placeholder="e.g. Ahmed Siddiqui"
                className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Technology</label>
              <select value={form.tech} onChange={(e) => set("tech", e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white focus:outline-none focus:border-brandPrimary transition-all cursor-pointer">
                {TECH_OPTIONS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Budget (Rs)</label>
              <input type="text" value={form.budget} onChange={(e) => set("budget", e.target.value)}
                placeholder="e.g. Rs 1.2L or Rs 80,000"
                className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Deadline</label>
              <input type="date" value={form.deadline} onChange={(e) => set("deadline", e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white focus:outline-none focus:border-brandPrimary transition-all cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Status + Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5 space-y-4">
          <p className="text-[10px] font-mono text-brandMuted uppercase tracking-widest font-bold">Status & Progress</p>
          <div>
            <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-2">Project Status</label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button key={s} onClick={() => set("status", s)}
                  className={`px-4 py-2 text-[11px] font-bold rounded-xl border-2 transition-all cursor-pointer ${
                    form.status === s
                      ? `${STATUS_COLOR[s]} bg-current/5`
                      : "border-brandLine dark:border-slate-600 text-brandMuted hover:border-brandPrimary hover:text-brandPrimary"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-mono text-brandMuted uppercase tracking-widest">Initial Progress</label>
              <span className="text-sm font-black text-brandPrimary font-mono">{form.progress}%</span>
            </div>
            <input type="range" min={0} max={100} step={5} value={form.progress}
              onChange={(e) => set("progress", Number(e.target.value))}
              className="w-full accent-brandPrimary cursor-pointer" />
            <div className="mt-2 h-2 rounded-full bg-brandLine dark:bg-slate-700 overflow-hidden">
              <div className={`h-full rounded-full transition-all ${form.progress===100?"bg-emerald-500":form.progress>=60?"bg-brandPrimary":"bg-amber-500"}`}
                style={{width:`${form.progress}%`}} />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5">
          <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Project Notes</label>
          <textarea rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)}
            placeholder="Requirements, client preferences, milestones, or any other notes…"
            className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all resize-none" />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <Link href="/dashboard"
            className="px-5 py-2.5 text-xs font-bold text-brandMuted border border-brandLine dark:border-slate-600 rounded-xl hover:border-rose-400 hover:text-rose-500 transition-colors">
            Cancel
          </Link>
          <button onClick={handleSave}
            disabled={!form.name.trim() || !form.client.trim()}
            className="px-6 py-2.5 text-xs font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(8,145,178,0.3)]">
            Save Project
          </button>
        </div>
      </main>
    </div>
  );
}
