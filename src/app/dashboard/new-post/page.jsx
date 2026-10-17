"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../Components/Logo";

const CATEGORIES = ["Web Development", "Next.js", "WordPress", "Shopify", "React", "Laravel", "SEO", "Freelancing"];

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Web Development",
    metaDesc: "",
    tags: "",
    content: "",
    status: "Draft",
  });
  const [slugManual, setSlugManual] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleTitle = (val) => {
    set("title", val);
    if (!slugManual) set("slug", slugify(val));
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  return (
    <div className="min-h-screen bg-brandBg dark:bg-slate-950 font-sans">
      {/* Topbar */}
      <header className="bg-white dark:bg-slate-900 border-b border-brandLine dark:border-slate-700 px-5 py-3.5 flex items-center gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <div>
            <p className="text-[10px] font-black text-brandInk dark:text-white tracking-widest uppercase">Malik Kashan</p>
            <p className="text-[9px] font-mono text-brandPrimary tracking-[0.2em] uppercase">New Blog Post</p>
          </div>
        </div>
        <div className="flex-1" />
        <Link href="/dashboard"
          className="text-xs font-bold text-brandMuted hover:text-brandPrimary border border-brandLine dark:border-slate-700 px-3 py-2 rounded-xl transition-colors">
          ← Back to Dashboard
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8 space-y-5">
        <div>
          <h1 className="text-xl font-black text-brandInk dark:text-white">Create New Blog Post</h1>
          <p className="text-xs text-brandMuted mt-1">Fill in the details below — save as Draft or publish immediately.</p>
        </div>

        {saved && (
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Post saved! Redirecting to dashboard…</p>
          </div>
        )}

        {/* Title */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5 space-y-4">
          <div>
            <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Post Title *</label>
            <input type="text" value={form.title} onChange={(e) => handleTitle(e.target.value)}
              placeholder="e.g. How to Build a Next.js Portfolio in 2026"
              className="w-full px-4 py-3 text-sm font-semibold bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all" />
          </div>
          <div>
            <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">URL Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-brandMuted bg-brandSoft dark:bg-slate-800 px-3 py-2.5 rounded-l-xl border border-r-0 border-brandLine dark:border-slate-600 shrink-0">/blog/</span>
              <input type="text" value={form.slug}
                onChange={(e) => { setSlugManual(true); set("slug", slugify(e.target.value)); }}
                placeholder="auto-generated-from-title"
                className="flex-1 px-3 py-2.5 text-xs font-mono bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-r-xl text-brandPrimary placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all" />
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white focus:outline-none focus:border-brandPrimary transition-all cursor-pointer">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Tags (comma-separated)</label>
              <input type="text" value={form.tags} onChange={(e) => set("tags", e.target.value)}
                placeholder="next.js, react, portfolio"
                className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Meta Description <span className="text-brandPrimary">(SEO)</span></label>
            <textarea rows={2} value={form.metaDesc} onChange={(e) => set("metaDesc", e.target.value)}
              placeholder="Write a 150-160 character description for Google search results…"
              className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all resize-none" />
            <p className={`text-[9px] font-mono mt-1 ${form.metaDesc.length > 160 ? "text-rose-500" : "text-brandMuted"}`}>
              {form.metaDesc.length}/160 characters
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5">
          <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Post Content (Markdown)</label>
          <textarea rows={16} value={form.content} onChange={(e) => set("content", e.target.value)}
            placeholder={"# Introduction\n\nStart writing your blog post here…\n\n## Section 1\n\nYour content goes here.\n\n## Conclusion\n\nWrap up your post."}
            className="w-full px-3 py-3 text-xs font-mono bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/30 focus:outline-none focus:border-brandPrimary transition-all resize-none leading-relaxed" />
          <p className="text-[9px] font-mono text-brandMuted mt-1">{form.content.split(/\s+/).filter(Boolean).length} words</p>
        </div>

        {/* Publish controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-[10px] font-mono text-brandMuted uppercase tracking-widest">Status</label>
              <div className="flex gap-1">
                {["Draft", "Published"].map((s) => (
                  <button key={s} onClick={() => set("status", s)}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors cursor-pointer border ${
                      form.status === s
                        ? s === "Published" ? "bg-emerald-500 text-white border-emerald-500" : "bg-brandPrimary/10 text-brandPrimary border-brandPrimary/30"
                        : "border-brandLine dark:border-slate-600 text-brandMuted hover:border-brandPrimary hover:text-brandPrimary"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard"
                className="px-5 py-2.5 text-xs font-bold text-brandMuted border border-brandLine dark:border-slate-600 rounded-xl hover:border-rose-400 hover:text-rose-500 transition-colors">
                Cancel
              </Link>
              <button onClick={handleSave}
                disabled={!form.title.trim()}
                className="px-6 py-2.5 text-xs font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                {form.status === "Published" ? "Publish Post" : "Save as Draft"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
