import Link from "next/link";

export const metadata = { title: "Page Not Found — Malik Kashan" };

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brandBg flex items-center justify-center px-6 font-sans relative overflow-hidden">
      {/* bg blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-brandPrimary/6 blur-[160px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brandSecondary/6 blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 text-center max-w-xl">
        {/* Big 404 */}
        <div className="relative inline-block mb-6">
          <p className="text-[120px] sm:text-[160px] font-black text-brandInk/5 dark:text-white/5 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center text-brandPrimary">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                <path d="M11 8v3M11 14h.01" />
              </svg>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-[10px] font-mono tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          Page Not Found
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-brandInk dark:text-white uppercase tracking-tight mb-3">
          This page doesn&apos;t exist
        </h1>
        <p className="text-sm text-brandMuted leading-relaxed mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for may have been moved, deleted, or never existed. Let&apos;s get you back on track.
        </p>

        {/* Quick links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link href="/" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brandPrimary text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-[0_4px_16px_rgba(8,145,178,0.3)] hover:bg-brandSecondary hover:-translate-y-0.5 transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </Link>
          <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-brandLine dark:border-slate-700 text-brandMuted dark:text-slate-300 hover:border-brandPrimary hover:text-brandPrimary text-xs font-bold tracking-widest uppercase rounded-xl transition-all">
            Contact Me
          </Link>
        </div>

        {/* Helpful links */}
        <div className="border-t border-brandLine dark:border-slate-700 pt-6">
          <p className="text-[10px] font-mono tracking-widest text-brandMuted uppercase mb-3">Maybe you were looking for</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Projects", href: "/projects" },
              { label: "Services", href: "/services" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
            ].map((l) => (
              <Link key={l.label} href={l.href}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-brandLine dark:border-slate-700 text-xs font-semibold text-brandInk dark:text-slate-300 hover:border-brandPrimary hover:text-brandPrimary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
