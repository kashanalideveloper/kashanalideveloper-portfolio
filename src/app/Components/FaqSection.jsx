// src/app/Components/FaqSection.jsx
"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="py-20 sm:py-24 bg-brandBg border-t border-brandLine font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brandInk uppercase tracking-tight">
            Frequently Asked <span className="text-brandPrimary">Questions</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light">
            Honest, straightforward answers about timelines, pricing, and our development process.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brandLine overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-brandInk">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-brandSoft flex items-center justify-center text-brandPrimary font-bold shrink-0 ml-4">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-brandMuted text-xs sm:text-sm font-light leading-relaxed border-t border-brandLine/50 pt-4">
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
