// src/app/Components/LanguageSwitcher.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ur", label: "اردو", flag: "🇵🇰" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (l) => {
    setLang(l.code);
    setIsOpen(false);
    setSearchQuery("");
  };

  const filtered = languages.filter((l) =>
    l.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-brandLine bg-white hover:border-brandPrimary/50 text-xs font-semibold text-brandInk transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-brandPrimary/40"
      >
        <span>{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.label}</span>
        <svg
          className={`w-3 h-3 text-brandMuted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-brandLine p-3 z-50 transition-all duration-200 ease-out transform origin-top animate-in fade-in zoom-in-95">
          <div className="mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language..."
              className="w-full px-3 py-2 text-xs bg-brandSoft border border-brandLine rounded-xl text-brandInk focus:outline-none focus:border-brandPrimary"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1">
            {filtered.length === 0 ? (
              <p className="text-[11px] text-brandMuted text-center py-2 font-mono">
                No language found
              </p>
            ) : (
              filtered.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleSelect(l)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left hover:bg-brandSoft transition-colors cursor-pointer ${
                    currentLang.code === l.code
                      ? "text-brandPrimary font-bold bg-brandPrimary/10"
                      : "text-brandInk"
                  }`}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
