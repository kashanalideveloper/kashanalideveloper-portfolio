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
    <section className="py-20 sm:py-28 bg-brandBg dark:bg-slate-950 relative overflow-hidden font-sans">
      {/* bg blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brandPrimary/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-brandLine dark:border-slate-700 shadow-[0_24px_80px_rgba(15,23,42,0.10)] overflow-hidden">
          {/* Top accent */}
          <div className="h-1 w-full bg-linear-to-r from-brandPrimary to-brandSecondary" />

          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* Left */}
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[10px] font-mono tracking-widest text-brandPrimary uppercase mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandPrimary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brandPrimary" />
                  </span>
                  Available for new projects
                </span>

                <h2 className="text-3xl sm:text-4xl font-black text-brandInk dark:text-white uppercase tracking-tight leading-tight mb-4">
                  Ready to turn your idea into a{" "}
                  <span className="text-brandPrimary">revenue-generating</span>{" "}
                  website?
                </h2>
                <p className="text-sm text-brandMuted leading-relaxed mb-6">
                  I work with business owners who are serious about results — not just a pretty website. Let&apos;s build something that earns its cost back within months.
                </p>

                {/* Guarantees */}
                <ul className="space-y-2 mb-8">
                  {GUARANTEES.map((g) => (
                    <li key={g.text} className="flex items-center gap-2.5 text-sm">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0">{g.icon}</span>
                      <span className="text-brandInk dark:text-slate-200 font-medium">{g.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brandPrimary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-[0_4px_20px_rgba(8,145,178,0.35)] hover:bg-brandSecondary hover:-translate-y-0.5 active:translate-y-0 transition-all">
                    Start Your Project
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#25D366]/40 bg-[#25D366]/8 text-[#128C7E] dark:text-[#25D366] text-[11px] font-bold uppercase tracking-widest rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/15 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Me
                  </a>
                </div>
              </div>

              {/* Right — trust card */}
              <div className="space-y-4">
                {/* Response promise */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-brandPrimary/6 border border-brandPrimary/15">
                  <div className="w-12 h-12 rounded-xl bg-brandPrimary/15 text-brandPrimary flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-brandInk dark:text-white">Reply within 24 hours</p>
                    <p className="text-xs text-brandMuted mt-0.5">Send your brief today — get a proposal by tomorrow.</p>
                  </div>
                </div>

                {/* Milestone payment */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-800">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-brandInk dark:text-white">Milestone-based payments</p>
                    <p className="text-xs text-brandMuted mt-0.5">Pay only when you approve each stage. Zero upfront risk.</p>
                  </div>
                </div>

                {/* Portfolio proof */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-violet-50 dark:bg-violet-900/15 border border-violet-200 dark:border-violet-800">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-brandInk dark:text-white">100+ delivered projects</p>
                    <p className="text-xs text-brandMuted mt-0.5">Every project listed with live URLs you can actually test.</p>
                  </div>
                </div>

                <p className="text-center text-[10px] text-brandMuted font-mono pt-1">
                  No contracts. No retainers. Just great work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
