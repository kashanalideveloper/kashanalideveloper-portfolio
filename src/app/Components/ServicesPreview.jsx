// src/app/Components/ServicesPreview.jsx
"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

const services = [
  {
    slug: "web-development",
    num: "01",
    title: "Website Development",
    desc: "Modern, responsive and high-performance business websites built for speed, SEO and conversions.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    slug: "react-development",
    num: "02",
    title: "React.js Development",
    desc: "Fast, interactive React applications with clean component architecture and modern UI/UX patterns.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    slug: "nextjs-development",
    num: "03",
    title: "Next.js Development",
    desc: "Full-stack Next.js apps with SSR, SEO optimization, and edge-ready APIs built for production scale.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 20 2 20"/><line x1="12" y1="9" x2="12" y2="14"/>
      </svg>
    ),
  },
  {
    slug: "wordpress-development",
    num: "04",
    title: "WordPress Development",
    desc: "Custom WordPress, Elementor, and WooCommerce solutions tailored to your exact business needs.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
      </svg>
    ),
  },
  {
    slug: "shopify-development",
    num: "05",
    title: "Shopify E-Commerce",
    desc: "Complete Shopify stores with custom themes, product setup, payment gateways and order management.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    slug: "seo-optimization",
    num: "06",
    title: "SEO Optimization",
    desc: "Technical SEO audit, on-page fixes, schema markup and Core Web Vitals to rank higher on Google.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    slug: "woocommerce-development",
    num: "07",
    title: "WooCommerce E-Commerce",
    desc: "High-converting online stores with secure payment gateways, product catalogs, and optimized checkout flows.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    slug: "website-redesign",
    num: "08",
    title: "Website Redesign",
    desc: "Transform your outdated website into a modern, high-converting digital asset that impresses clients.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0L6 8l-4 4 1.41 1.41L4 10.82l2.59-2.58L6 6.41z"/>
      </svg>
    ),
  },
  {
    slug: "performance-optimization",
    num: "09",
    title: "Performance Optimization",
    desc: "Boost website speed, fix Core Web Vitals, and achieve 95+ Lighthouse scores for higher rankings and retention.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    slug: "website-maintenance",
    num: "10",
    title: "Website Maintenance",
    desc: "Ongoing security updates, backups, monitoring, and technical support to keep your site online and secure.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    ),
  },
];

export default function ServicesPreview() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 sm:py-28 bg-brandBg border-t border-brandLine font-sans scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[10px] font-mono tracking-widest text-brandPrimary uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary animate-pulse" />
            {t("coreOfferings")}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brandInk dark:text-white tracking-tight leading-[1.1]">
                {t("servicesHeading")}
              </h2>
              <p className="mt-3 text-sm text-brandMuted font-light leading-relaxed max-w-lg">
                Every solution is crafted to meet your exact goals — scalable, fast, and built to convert.
              </p>
            </div>
            <Link
              href="/services"
              className="shrink-0 self-start sm:self-end inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brandLine hover:border-brandPrimary text-[11px] font-semibold tracking-wide text-brandMuted hover:text-brandPrimary transition-all duration-200 group"
            >
              {t("exploreService")}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, idx) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-brandLine hover:border-brandPrimary/40 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden p-6"
            >
              {/* subtle gradient bg on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brandPrimary/0 to-brandPrimary/0 group-hover:from-brandPrimary/5 group-hover:to-sky-50/50 dark:group-hover:to-slate-800 transition-all duration-300 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon + number row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-brandPrimary/10 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all duration-300 shadow-sm">
                    {s.icon}
                  </div>
                  <span className="text-[11px] font-mono text-brandMuted/40 mt-1">{"/"}{s.num}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-black text-brandInk dark:text-white uppercase tracking-tight mb-2.5 group-hover:text-brandPrimary transition-colors duration-200">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-brandMuted font-light leading-relaxed flex-1">
                  {s.desc}
                </p>

                {/* CTA */}
                <div className="mt-5 flex items-center gap-2 text-[11px] font-bold tracking-widest text-brandPrimary uppercase">
                  <span>Learn More</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
