"use client";
import Link from "next/link";
import { PROJECT_DATA } from "../lib/projects";
import { useLanguage } from "./LanguageContext";

export default function ProjectResults() {
  const { t } = useLanguage();
  const featured = PROJECT_DATA.slice(0, 3);

  return (
    <section className="py-20 sm:py-24 bg-brandBg border-t border-brandLine font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            {t("resultsSub")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brandInk dark:text-white uppercase tracking-tight">
            {t("resultsHeading")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light">{t("resultsDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featured.map((p, idx) => (
            <div key={p.slug} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-brandLine flex flex-col justify-between shadow-xs">
              <div>
                <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono tracking-wider bg-brandPrimary/10 text-brandPrimary uppercase mb-4">
                  {p.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-brandInk dark:text-white uppercase tracking-wide mb-3">{p.title}</h3>
                <p className="text-brandMuted text-xs sm:text-sm font-light leading-relaxed mb-6">{p.description}</p>
              </div>
              <div className="pt-4 border-t border-brandLine flex items-center justify-between">
                <span className="text-xs font-mono text-brandMuted">{`//0${idx + 1}`}</span>
                <Link href={`/projects/${p.slug}`} className="text-xs font-bold uppercase tracking-widest text-brandPrimary hover:underline">
                  {t("liveDemo")} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects" className="inline-flex items-center justify-center px-8 py-3.5 bg-brandInk dark:bg-brandPrimary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brandPrimary transition-all">
            {t("viewAllProjects")}
          </Link>
        </div>
      </div>
    </section>
  );
}
