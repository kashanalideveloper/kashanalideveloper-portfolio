// src/app/Components/TrustBar.jsx
"use client";

import { useLanguage } from "./LanguageContext";

export default function TrustBar() {
  const { t } = useLanguage();
  const rawItems = t("trustItems");
  const items = Array.isArray(rawItems) ? rawItems : [
    "Pakistan Based & Worldwide Clients",
    "Fast Communication & Transparent Workflow",
    "Performance-First Development (Core Web Vitals)",
    "100% Responsive Across All Devices",
    "Secure & Clean Maintainable Code",
  ];

  const icons = [
    // Globe / Location
    <svg key={0} className="w-4 h-4 text-brandPrimary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>,
    // Chat / Communication
    <svg key={1} className="w-4 h-4 text-brandPrimary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>,
    // Speed / Lightning
    <svg key={2} className="w-4 h-4 text-brandPrimary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>,
    // Responsive / Screen
    <svg key={3} className="w-4 h-4 text-brandPrimary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>,
    // Shield / Security
    <svg key={4} className="w-4 h-4 text-brandPrimary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
  ];

  return (
    <section className="bg-white border-y border-brandLine py-6 overflow-hidden relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brandInk tracking-wide">
              {icons[idx] || icons[0]}
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
