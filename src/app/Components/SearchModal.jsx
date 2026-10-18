// src/app/Components/SearchModal.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECT_DATA } from "../lib/projects";
import { SERVICES_DATA } from "../lib/services-data";
import { ARTICLES } from "../lib/blog";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement;
      setTimeout(() => inputRef.current?.focus(), 50);
      
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
        if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === "function") {
          previousActiveElementRef.current.focus();
        }
      };
    } else {
      // Query resets on remount since component returns null when closed
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingProjects = q
    ? PROJECT_DATA.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : [];

  const matchingServices = q
    ? Object.values(SERVICES_DATA).filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      )
    : [];

  const matchingArticles = q
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : [];

  const hasResults =
    matchingProjects.length > 0 ||
    matchingServices.length > 0 ||
    matchingArticles.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-brandLine overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-brandLine">
          <svg
            className="w-5 h-5 text-brandMuted mr-3 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, services, articles..."
            className="w-full text-sm sm:text-base text-brandInk bg-transparent focus:outline-none placeholder:text-brandMuted/50 font-sans"
          />
          <button
            onClick={onClose}
            className="text-xs font-mono text-brandMuted hover:text-brandInk px-2 py-1 rounded bg-brandSoft ml-2"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q && (
            <p className="text-xs text-brandMuted text-center py-6 font-mono">
              Start typing to search across the portfolio...
            </p>
          )}

          {q && !hasResults && (
            <p className="text-xs text-brandMuted text-center py-6 font-mono">
              No results found for &ldquo;{query}&rdquo;
            </p>
          )}

          {matchingServices.length > 0 && (
            <div>
              <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-2">
                Services ({matchingServices.length})
              </h3>
              <div className="space-y-1">
                {matchingServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-xl hover:bg-brandSoft transition-colors"
                  >
                    <p className="text-xs font-bold text-brandInk">{s.title}</p>
                    <p className="text-[11px] text-brandMuted truncate">
                      {s.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchingProjects.length > 0 && (
            <div>
              <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-2">
                Projects ({matchingProjects.length})
              </h3>
              <div className="space-y-1">
                {matchingProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-xl hover:bg-brandSoft transition-colors"
                  >
                    <p className="text-xs font-bold text-brandInk">{p.title}</p>
                    <p className="text-[11px] text-brandMuted truncate">
                      {p.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchingArticles.length > 0 && (
            <div>
              <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-2">
                Articles ({matchingArticles.length})
              </h3>
              <div className="space-y-1">
                {matchingArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-xl hover:bg-brandSoft transition-colors"
                  >
                    <p className="text-xs font-bold text-brandInk">{a.title}</p>
                    <p className="text-[11px] text-brandMuted truncate">
                      {a.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
