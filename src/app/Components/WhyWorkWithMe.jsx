// src/app/Components/WhyWorkWithMe.jsx
"use client";

import { useLanguage } from "./LanguageContext";

export default function WhyWorkWithMe() {
  const { t } = useLanguage();
  const rawStrengths = t("strengths");
  const strengths = Array.isArray(rawStrengths) ? rawStrengths : [
    {
      title: "Business-Focused Development",
      desc: "Every website and web application I build is engineered around your commercial goals — converting visitors into paying clients.",
    },
    {
      title: "Performance-First Speed",
      desc: "Optimized for lightning-fast page loads and elite Core Web Vitals scores to keep bounce rates low and engagement high.",
    },
    {
      title: "SEO-Ready Architecture",
      desc: "Built with clean semantic HTML, correct schema metadata, and server-side rendering so Google ranks your business higher.",
    },
    {
      title: "Clean & Maintainable Code",
      desc: "No bloated plugins or messy spaghetti code. You get scalable, high-quality code that is easy to update and expand.",
    },
    {
      title: "Clear Communication",
      desc: "Regular updates, prompt replies, and honest timelines. You will always know the exact status of your project.",
    },
    {
      title: "Dedicated Post-Launch Support",
      desc: "Comprehensive handover, training, and ongoing maintenance support to ensure your digital asset runs smoothly 24/7.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-brandBg text-brandInk border-t border-brandLine font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            {t("whyChooseSub")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brandInk uppercase tracking-tight">
            {t("whyChooseHeading")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light">
            {t("whyChooseDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden p-8 rounded-3xl bg-brandCard border border-brandLine shadow-soft hover:border-brandPrimary/30 hover:shadow-soft-hover transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brandPrimary/60 to-transparent opacity-80" />
              <div className="w-12 h-12 rounded-2xl bg-brandPrimary/10 text-brandPrimary flex items-center justify-center font-mono font-bold text-sm mb-6 group-hover:bg-brandPrimary group-hover:text-white transition-all">
                {`0${idx + 1}`}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-brandInk uppercase tracking-wide mb-3">
                {item.title}
              </h3>
              <p className="text-brandMuted text-xs sm:text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
