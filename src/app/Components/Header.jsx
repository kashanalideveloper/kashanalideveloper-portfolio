// src/app/Components/Header.jsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchModal from "./SearchModal";
import { useLanguage } from "./LanguageContext";

export default function Header() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const customServices = [
    { name: "Custom Web Development", href: "/services/web-development" },
    { name: "React.js Development", href: "/services/react-development" },
    { name: "Next.js Development", href: "/services/nextjs-development" },
  ];

  const otherServices = [
    { name: "WordPress Development", href: "/services/wordpress-development" },
    { name: "WooCommerce Development", href: "/services/woocommerce-development" },
    { name: "Website Redesign", href: "/services/website-redesign" },
    { name: "Performance Optimization", href: "/services/performance-optimization" },
    { name: "Website Maintenance", href: "/services/website-maintenance" },
  ];

  const navLinks = [
    { name: t("navHome"), href: "/" },
    { name: t("navAbout"), href: "/about" },
    { name: t("navWork"), href: "/projects" },
    { name: t("navBlog"), href: "/blog" },
    { name: t("navFaq"), href: "/faq" },
    { name: t("navContact"), href: "/contact" },
  ];

  return (
    <header className="animate-header-enter fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-brandLine shadow-[0_8px_32px_rgba(15,23,42,0.08)] transition-all duration-300 font-sans">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-brandPrimary/5 to-transparent rounded-2xl pointer-events-none" />

      <nav
        className="h-[68px] px-5 sm:px-6 lg:px-8 flex items-center justify-between relative z-10"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0 transition-transform duration-300 hover:scale-[1.01]"
          aria-label="Malik Kashan Homepage"
        >
          <Logo size={38} priority />
          <div className="flex flex-col justify-center leading-none">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.14em] text-brandInk dark:text-white uppercase">
              Malik Kashan
            </span>
            <span className="hidden sm:block text-[7px] sm:text-[8px] font-semibold tracking-[0.28em] text-brandPrimary uppercase mt-1">
              Business Web Specialist
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
          <li>
            <Link
              href="/"
              className="text-[11px] tracking-widest text-brandMuted hover:text-brandPrimary dark:text-slate-300 dark:hover:text-brandPrimary font-semibold uppercase transition-colors py-1 block"
            >
              {t("navHome")}
            </Link>
          </li>

          {/* Services Hover Dropdown */}
          <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/services"
              className="flex items-center gap-1 text-[11px] tracking-widest text-brandMuted hover:text-brandPrimary dark:text-slate-300 dark:hover:text-brandPrimary font-semibold uppercase transition-colors py-1 cursor-pointer"
            >
              {t("navServices")}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>

            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-brandLine p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="mb-3 pb-3 border-b border-brandLine">
                  <p className="text-[10px] font-mono tracking-widest text-brandPrimary uppercase mb-2 font-bold">
                    {t("customDevelopment")}
                  </p>
                  <div className="space-y-1">
                    {customServices.map((s) => (
                      <Link key={s.name} href={s.href} onClick={() => setIsServicesOpen(false)}
                        className="block px-3 py-1.5 text-xs font-semibold text-brandInk dark:text-slate-200 hover:bg-brandPrimary/10 hover:text-brandPrimary rounded-xl transition-colors">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-brandMuted uppercase mb-2 font-bold">
                    {t("cmsOptimization")}
                  </p>
                  <div className="space-y-1">
                    {otherServices.map((s) => (
                      <Link key={s.name} href={s.href} onClick={() => setIsServicesOpen(false)}
                        className="block px-3 py-1.5 text-xs font-semibold text-brandInk dark:text-slate-200 hover:bg-brandPrimary/10 hover:text-brandPrimary rounded-xl transition-colors">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>

          {navLinks.slice(1).map((link) => (
            <li key={link.name}>
              <Link href={link.href}
                className="text-[11px] tracking-widest text-brandMuted hover:text-brandPrimary dark:text-slate-300 dark:hover:text-brandPrimary font-semibold uppercase transition-colors py-1 block">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search — desktop only */}
          <button onClick={() => setIsSearchOpen(true)} aria-label={t("searchPlaceholder")}
            className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl border border-brandLine bg-white dark:bg-slate-800 hover:border-brandPrimary/50 text-brandInk dark:text-white transition-all cursor-pointer">
            <svg className="w-4 h-4 text-brandMuted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Language — desktop only */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          <ThemeSwitcher />

          {/* Let's Talk — desktop */}
          <Link href="/#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-[11px] font-bold tracking-widest text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-all uppercase shadow-md">
            {t("letsTalk")}
          </Link>

          {/* Hamburger — mobile/tablet */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl border border-brandLine bg-white dark:bg-slate-800 hover:border-brandPrimary/50 transition-all cursor-pointer"
            aria-label="Toggle navigation menu">
            <div className="space-y-1.5 w-5">
              <span className={`block h-0.5 bg-brandInk dark:bg-white transition-all rounded-full ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-brandInk dark:bg-white transition-all rounded-full ${isOpen ? "opacity-0" : "w-3/4 ml-auto"}`} />
              <span className={`block h-0.5 bg-brandInk dark:bg-white transition-all rounded-full ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 border-t border-brandLine/60 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl rounded-b-2xl px-6 ${
        isOpen ? "max-h-[720px] opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none py-0 border-t-0"
      }`}>
        <nav className="flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)}
            className="text-xs font-semibold tracking-widest text-brandInk dark:text-white uppercase py-1 border-b border-brandLine/40 hover:text-brandPrimary hover:translate-x-1 transition-all duration-200 block">
            {t("navHome")}
          </Link>
          <div className="py-1 border-b border-brandLine/40">
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between text-xs font-semibold tracking-widest text-brandInk dark:text-white uppercase py-1 cursor-pointer hover:text-brandPrimary hover:translate-x-1 transition-all duration-200"
            >
              {t("navServices")}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
              <div className="pl-3 space-y-2 pb-2">
                <p className="text-[10px] font-mono text-brandPrimary uppercase mt-1">{t("customDevelopment")}</p>
                {customServices.map((s) => (
                  <Link key={s.name} href={s.href} onClick={() => { setIsOpen(false); setIsMobileServicesOpen(false); }}
                    className="block text-xs text-brandMuted hover:text-brandPrimary dark:text-slate-300 font-medium py-0.5">
                    {s.name}
                  </Link>
                ))}
                <p className="text-[10px] font-mono text-brandMuted uppercase mt-2">{t("cmsOptimization")}</p>
                {otherServices.map((s) => (
                  <Link key={s.name} href={s.href} onClick={() => { setIsOpen(false); setIsMobileServicesOpen(false); }}
                    className="block text-xs text-brandMuted hover:text-brandPrimary dark:text-slate-300 font-medium py-0.5">
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navLinks.slice(1).map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}
              className="text-xs font-semibold tracking-widest text-brandInk dark:text-white uppercase py-1 border-b border-brandLine/40 hover:text-brandPrimary hover:translate-x-1 transition-all duration-200 block">
              {link.name}
            </Link>
          ))}

          {/* Language + Theme */}
          <div className="flex items-center gap-3 py-1 border-b border-brandLine/40">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>

          <div className="flex gap-3 mt-1">
            <Link href="/contact" onClick={() => setIsOpen(false)}
              className="flex-1 text-center py-2.5 text-xs font-bold tracking-widest text-white bg-brandPrimary rounded-xl uppercase shadow-md">
              {t("letsTalk")}
            </Link>
          </div>
        </nav>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
