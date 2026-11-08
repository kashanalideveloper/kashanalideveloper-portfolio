// src/app/Components/BlogArticleLayout.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "../lib/site";
import { ARTICLES } from "../lib/blog";
import Logo from "./Logo";
import BlogNewsletterSignup from "./BlogNewsletterSignup";

const MONTH_INDEX = {
  January: "01", February: "02", March: "03", April: "04",
  May: "05", June: "06", July: "07", August: "08",
  September: "09", October: "10", November: "11", December: "12",
};

function toIsoDate(dateStr) {
  const [month, year] = dateStr.split(" ");
  return `${year}-${MONTH_INDEX[month] || "01"}-01`;
}

export default function BlogArticleLayout({
  category, title, date, readTime, intro, sections, conclusion,
}) {
  const article = ARTICLES.find((a) => a.title === title);
  const slug = article ? article.slug : title.toLowerCase().replace(/\s+/g, "-");
  const articleUrl = `${SITE.url}blog/${slug}`;
  const imageUrl = article ? `${SITE.url}${article.image}` : `${SITE.url}/og-image.png`;

  // Related posts: same category, exclude self, take 3
  const related = ARTICLES.filter((a) => a.category === category && a.slug !== slug).slice(0, 3);
  // Recent for sidebar
  const recent = ARTICLES.filter((a) => a.slug !== slug).slice(0, 4);

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = sections.map((_, i) => document.getElementById(`article-section-${i + 1}`)).filter(Boolean);
      if (conclusion) {
        headingElements.push(document.getElementById("article-conclusion"));
      }

      const scrollPosition = window.scrollY + 180;
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, conclusion]);

  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: title, image: imageUrl, articleSection: category,
    inLanguage: "en-US", datePublished: toIsoDate(date), dateModified: toIsoDate(date),
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: `${SITE.name} Developer Portfolio`, url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.webp` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}blog` },
      { "@type": "ListItem", position: 3, name: title, item: articleUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero header */}
      <section className="relative pt-32 sm:pt-40 pb-10 bg-brandBg overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px),linear-gradient(to_bottom,#0f172a04_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" aria-hidden="true" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-56 bg-brandPrimary/10 blur-[100px] pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-brandMuted mb-5">
            <Link href="/" className="hover:text-brandPrimary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brandPrimary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-brandPrimary">{category}</span>
          </nav>

          <h1 className="text-2xl sm:text-4xl font-bold text-brandInk leading-tight tracking-tight max-w-4xl">
            {title}
          </h1>

          <div className="flex items-center gap-3 mt-4 text-[10px] font-mono text-brandMuted/70 uppercase tracking-wider">
            <span>By {SITE.name}</span>
            <span>•</span>
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <main className="relative bg-brandBg dark:bg-brandBg pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* ── ARTICLE CONTENT ── */}
            <article className="flex-1 min-w-0">
              {/* Intro */}
              <p className="text-base sm:text-lg text-brandInk dark:text-brandInk leading-relaxed font-medium border-l-4 border-brandPrimary pl-4 mb-10">
                {intro}
              </p>

              <div className="space-y-10">
                {sections.map((section, index) => (
                  <section key={section.heading} id={`article-section-${index + 1}`} className="scroll-mt-28">
                    <h2 className="text-lg sm:text-2xl font-bold text-brandInk dark:text-brandInk tracking-wide mb-4">
                      {section.heading}
                    </h2>
                    <div className="space-y-4">
                      {section.body.map((paragraph, idx) => (
                        <p key={idx} className="text-sm sm:text-[15px] text-brandMuted dark:text-brandMuted leading-relaxed font-light">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}

                {conclusion && (
                  <section id="article-conclusion" className="scroll-mt-28">
                    <h2 className="text-lg sm:text-2xl font-bold text-brandInk dark:text-brandInk tracking-wide mb-4">Conclusion</h2>
                    <div className="space-y-4">
                      {conclusion.map((paragraph, idx) => (
                        <p key={idx} className="text-sm sm:text-[15px] text-brandMuted dark:text-brandMuted leading-relaxed font-light">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* In-article CTA */}
              <div className="mt-12 rounded-2xl bg-brandPrimary/5 border border-brandPrimary/20 p-6 sm:p-8 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-brandInk uppercase tracking-tight mb-2">
                  Want help with <span className="text-brandPrimary">your project?</span>
                </h3>
                <p className="text-brandMuted text-sm font-light leading-relaxed max-w-xl mx-auto mb-5">
                  I build fast, modern and SEO-ready websites. Let&apos;s talk about what you need — I usually respond within a few hours.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-brandPrimary text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-brandPrimary/20 hover:bg-brandSecondary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Get in Touch →
                </Link>
              </div>

              {/* Author card */}
              <div className="mt-12 rounded-2xl bg-brandBg border border-brandLine p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center shrink-0 p-2">
                  <Logo size={32} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-brandInk">Malik Kashan</p>
                  <p className="text-[10px] font-mono text-brandMuted/70 tracking-wider uppercase mt-0.5 mb-3">
                    Frontend &amp; WordPress Developer · Lahore, Pakistan
                  </p>
                  <p className="text-xs text-brandMuted font-light leading-relaxed mb-4">
                    I build fast, SEO-ready websites for startups and businesses worldwide using Next.js, React and WordPress.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-brandPrimary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-md shadow-brandPrimary/20 hover:bg-brandSecondary transition-all duration-200"
                  >
                    Hire Me for Your Project
                  </Link>
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((a) => (
                      <Link key={a.slug} href={`/blog/${a.slug}`}
                        className="group flex flex-col rounded-xl border border-brandLine bg-brandBg hover:border-brandPrimary/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                        <div className="relative w-full aspect-video bg-brandSoft overflow-hidden">
                          <Image src={a.image} alt={a.title} fill sizes="240px" className="object-cover group-hover:scale-[1.03] transition-transform duration-400" />
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-semibold text-brandInk group-hover:text-brandPrimary transition-colors line-clamp-2 leading-snug">{a.title}</p>
                          <p className="text-[10px] font-mono text-brandMuted/60 mt-1 uppercase">{a.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ── RIGHT SIDEBAR ── */}
            <aside className="lg:w-72 xl:w-80 shrink-0 space-y-6 lg:pt-0">
              <BlogNewsletterSignup />

              {/* Table of contents */}
              {sections.length > 0 && (
                <div className="rounded-2xl border border-brandLine/80 bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)]">
                  <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary animate-pulse" />
                    Table of Contents
                  </h3>
                  <ol className="space-y-3">
                    {sections.map((s, i) => {
                      const id = `article-section-${i + 1}`;
                      const isActive = activeId === id;
                      return (
                        <li key={i}>
                          <a href={`#${id}`} className={`group flex items-start gap-3 rounded-md py-1 px-1.5 transition-colors ${isActive ? "bg-brandPrimary/10 text-brandPrimary font-semibold" : "hover:bg-brandBg dark:hover:bg-slate-800"}`}>
                            <span className={`w-7 shrink-0 rounded px-1 py-0.5 text-center font-mono text-[10px] font-bold transition-colors ${isActive ? "bg-brandPrimary text-white" : "bg-brandPrimary/10 text-brandPrimary group-hover:bg-brandPrimary group-hover:text-white"}`}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className={`min-w-0 text-xs transition-colors leading-snug ${isActive ? "text-brandPrimary font-semibold" : "font-medium text-brandMuted dark:text-slate-300 group-hover:text-brandInk dark:group-hover:text-white"}`}>
                              {s.heading}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                    {conclusion && (() => {
                      const id = "article-conclusion";
                      const isActive = activeId === id;
                      return (
                        <li>
                          <a href={`#${id}`} className={`group flex items-start gap-3 rounded-md py-1 px-1.5 transition-colors ${isActive ? "bg-brandPrimary/10 text-brandPrimary font-semibold" : "hover:bg-brandBg dark:hover:bg-slate-800"}`}>
                            <span className={`w-7 shrink-0 rounded px-1 py-0.5 text-center font-mono text-[10px] font-bold transition-colors ${isActive ? "bg-brandPrimary text-white" : "bg-brandPrimary/10 text-brandPrimary group-hover:bg-brandPrimary group-hover:text-white"}`}>
                              {String(sections.length + 1).padStart(2, "0")}
                            </span>
                            <span className={`min-w-0 text-xs transition-colors leading-snug ${isActive ? "text-brandPrimary font-semibold" : "font-medium text-brandMuted dark:text-slate-300 group-hover:text-brandInk dark:group-hover:text-white"}`}>
                              Conclusion
                            </span>
                          </a>
                        </li>
                      );
                    })()}
                  </ol>
                </div>
              )}

              {/* Recent posts */}
              <div className="rounded-2xl border border-brandLine/80 bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)]">
                <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                  Recent Articles
                </h3>
                <ul className="space-y-4">
                  {recent.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`} className="flex items-center gap-3.5 group p-1.5 -mx-1.5 rounded-xl hover:bg-brandBg dark:hover:bg-slate-800 transition-all">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-brandSoft border border-brandLine/50 shadow-sm">
                          <Image src={a.image} alt={a.title} fill sizes="56px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-brandInk dark:text-white group-hover:text-brandPrimary transition-colors leading-snug line-clamp-2">{a.title}</p>
                          <p className="text-[10px] font-mono text-brandMuted/70 dark:text-slate-400 mt-1 uppercase">{a.date}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-brandPrimary to-brandSecondary p-6 text-center shadow-xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <p className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Need a Custom Website?</p>
                <p className="text-white/80 text-xs font-light mb-5 leading-relaxed">Fast, modern and SEO-ready — tailored for your growth.</p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-brandPrimary text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-brandSoft hover:shadow-lg transition-all"
                >
                  Get in Touch →
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </>
  );
}
