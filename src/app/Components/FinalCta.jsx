"use client";
import Link from "next/link";
import { whatsappLink } from "../lib/site";

const GUARANTEES = [
  { icon: "✓", text: "On-time delivery, every project" },
  { icon: "✓", text: "Clean code & full source files" },
  { icon: "✓", text: "Free revisions until you're happy" },
  { icon: "✓", text: "24-hour response guarantee" },
];

export default function FinalCta() {
  return (
    <section className="py-16 sm:py-24 bg-brandBg dark:bg-slate-950 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-brandLine dark:border-slate-800 shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-brandPrimary to-brandSecondary" />
          
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-xs font-mono font-medium text-brandPrimary uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-brandPrimary animate-pulse" />
            Available for new projects
          </span>

          <h2 className="text-2xl sm:text-4xl font-bold text-brandInk dark:text-white uppercase tracking-tight mb-4">
            Ready to Build a <span className="text-brandPrimary">High-Performance</span> Website?
          </h2>
          
          <p className="text-sm sm:text-base text-brandMuted dark:text-slate-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Let&apos;s turn your vision into a fast, secure, and conversion-optimized web application. Get a fixed quote and clear timeline within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brandPrimary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brandSecondary transition-all shadow-lg shadow-brandPrimary/25"
            >
              Start Your Project
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 text-brandInk dark:text-white text-xs font-bold uppercase tracking-widest rounded-xl border border-brandLine dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
