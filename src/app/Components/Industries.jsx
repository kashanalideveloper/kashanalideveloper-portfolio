"use client";
import { useLanguage } from "./LanguageContext";

const DESCS = [
  "Building fast MVPs, scalable web apps, and modern landing pages to attract investors and users.",
  "Professional business websites that establish credibility and turn local or online traffic into leads.",
  "Reliable frontend and WordPress development partnership to handle client overflow with precision.",
  "High-converting WooCommerce and online storefronts designed for secure checkout and fast browsing.",
  "Interactive dashboards, user portals, and high-performance marketing sites built with Next.js.",
  "Law firms, consultants, clinics, and service providers looking to elevate their digital presence.",
];

export default function Industries() {
  const { t } = useLanguage();
  const rawList = t("industriesList");
  const titles = Array.isArray(rawList) ? rawList : [];

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-slate-950 border-t border-brandLine font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            {t("industriesSub")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brandInk dark:text-white uppercase tracking-tight">
            {t("industriesHeading")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light">{t("industriesDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {titles.map((title, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-brandBg dark:bg-slate-900 border border-brandLine hover:border-brandPrimary/40 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-brandInk dark:text-white uppercase tracking-wide mb-2">{title}</h3>
              <p className="text-brandMuted text-xs sm:text-sm leading-relaxed font-light">{DESCS[idx] ?? ""}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
