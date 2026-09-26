// src/app/Components/ServicesPreview.jsx
"use client";

import Link from "next/link";
import { SERVICES_DATA } from "../lib/services-data";
import { useLanguage } from "./LanguageContext";

export default function ServicesPreview() {
  const { t } = useLanguage();
  const list = Object.values(SERVICES_DATA);

  return (
    <section id="services" className="py-20 sm:py-24 bg-white border-t border-brandLine font-sans scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            {t("coreOfferings")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brandInk uppercase tracking-tight">
            {t("servicesHeading")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light leading-relaxed">
            {t("servicesDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="p-8 rounded-3xl bg-brandBg border border-brandLine flex flex-col justify-between hover:border-brandPrimary/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 font-mono text-xs font-bold text-brandMuted/40">
                {`//0${index + 1}`}
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-brandPrimary/10 text-brandPrimary flex items-center justify-center mb-6 group-hover:bg-brandPrimary group-hover:text-white transition-all duration-300 shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono tracking-wider bg-brandPrimary/10 text-brandPrimary uppercase mb-3">
                  {service.eyebrow}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-brandInk uppercase tracking-wide mb-3 group-hover:text-brandPrimary transition-colors">
                  {service.title}
                </h3>
                <p className="text-brandMuted text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-brandLine flex items-center justify-between text-xs font-bold uppercase tracking-widest text-brandPrimary">
                <span>{t("exploreService")}</span>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
