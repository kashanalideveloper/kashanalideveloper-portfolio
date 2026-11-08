// src/app/Components/FaqSection.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

const faqs = [
  {
    q: "How much does a custom business website cost?",
    a: "Pricing varies depending on project scope, pages, and complexity. Contact me with your requirements for a clear, transparent quote.",
  },
  {
    q: "How long does website development take?",
    a: "Most business websites and landing pages take 2 to 4 weeks from initial discovery to final deployment.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes! I collaborate with startups, small businesses, and agencies in Pakistan, the US, UK, UAE, and worldwide.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. I specialize in modernizing outdated websites with high-performance Next.js or WordPress architectures while preserving SEO rankings.",
  },
  {
    q: "Do you build WordPress and WooCommerce stores?",
    a: "Yes, I build secure, custom WordPress websites, Elementor landing pages, and high-converting WooCommerce online stores.",
  },
  {
    q: "Will my website be mobile-friendly and fast?",
    a: "Every project is 100% responsive and optimized for lightning-fast load times and elite Core Web Vitals scores.",
  },
];

export default function FaqSection() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

  return (
    <section className="py-12 sm:py-16 bg-brandBg border-t border-brandLine font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            {t("faqSub")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brandInk dark:text-white uppercase tracking-tight">
            {t("faqHeading")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light">{t("faqDesc")}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-brandLine overflow-hidden shadow-xs"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer gap-2 transition-colors hover:bg-brandPrimary/5 dark:hover:bg-brandPrimary/10"
                >
                  <span className="text-sm font-semibold text-brandInk dark:text-white">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-brandSoft flex items-center justify-center text-brandPrimary font-bold shrink-0 text-base leading-none">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm font-light leading-relaxed border-t border-brandLine/50 pt-4 text-brandMuted dark:text-slate-400">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/faq"
            className="text-xs font-bold uppercase tracking-widest text-brandPrimary hover:underline"
          >
            View All FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
