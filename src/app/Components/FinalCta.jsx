// src/app/Components/FinalCta.jsx
import Link from "next/link";
import { whatsappLink } from "../lib/site";

export default function FinalCta() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-brandLine font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
          Ready to Grow Your Business?
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-brandInk uppercase tracking-tight mb-4">
          Let&apos;s Build Something <span className="text-brandPrimary">Exceptional Together</span>
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-brandMuted font-light leading-relaxed mb-8">
          Whether you need a brand new custom web application, a high-converting business website, or a WordPress solution, I am ready to help.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brandPrimary text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-brandPrimary/25 hover:bg-brandSecondary transition-all"
          >
            Start Your Project
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-brandInk text-xs font-bold uppercase tracking-widest rounded-xl border border-brandLine hover:border-[#25D366] hover:text-[#25D366] transition-all"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
