// src/app/Components/BlogArticleLayout.jsx
import Link from "next/link";
import Image from "next/image";
import { SITE } from "../lib/site";
import { ARTICLES } from "../lib/blog";

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
      <main className="relative bg-white pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* ── ARTICLE CONTENT ── */}
            <article className="flex-1 min-w-0">
              {/* Intro */}
              <p className="text-base sm:text-lg text-brandInk leading-relaxed font-medium border-l-4 border-brandPrimary pl-4 mb-10">
                {intro}
              </p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-lg sm:text-2xl font-bold text-brandInk tracking-wide mb-4">
                      {section.heading}
                    </h2>
                    <div className="space-y-4">
                      {section.body.map((paragraph, idx) => (
                        <p key={idx} className="text-sm sm:text-[15px] text-brandMuted leading-relaxed font-light">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}

                {conclusion && (
                  <section>
                    <h2 className="text-lg sm:text-2xl font-bold text-brandInk tracking-wide mb-4">Conclusion</h2>
                    <div className="space-y-4">
                      {conclusion.map((paragraph, idx) => (
                        <p key={idx} className="text-sm sm:text-[15px] text-brandMuted leading-relaxed font-light">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Author card */}
              <div className="mt-12 rounded-2xl bg-brandBg border border-brandLine p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center text-sm font-bold text-brandPrimary font-mono shrink-0">
                  MK
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
            <aside className="lg:w-72 xl:w-80 shrink-0 space-y-7 lg:pt-0">

              {/* Table of contents */}
              {sections.length > 0 && (
                <div className="rounded-2xl border border-brandLine bg-brandBg p-5 sticky top-28">
                  <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                    Table of Contents
                  </h3>
                  <ol className="space-y-2">
                    {sections.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[10px] font-mono text-brandPrimary mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                        <span className="text-xs text-brandMuted hover:text-brandPrimary transition-colors leading-snug cursor-default">{s.heading}</span>
                      </li>
                    ))}
                    {conclusion && (
                      <li className="flex items-start gap-2">
                        <span className="text-[10px] font-mono text-brandPrimary mt-0.5 shrink-0">{String(sections.length + 1).padStart(2, "0")}.</span>
                        <span className="text-xs text-brandMuted hover:text-brandPrimary transition-colors leading-snug cursor-default">Conclusion</span>
                      </li>
                    )}
                  </ol>
                </div>
              )}

              {/* Recent posts */}
              <div className="rounded-2xl border border-brandLine bg-brandBg p-5">
                <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                  Recent Posts
                </h3>
                <ul className="space-y-4">
                  {recent.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`} className="flex items-start gap-3 group">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-brandSoft">
                          <Image src={a.image} alt={a.title} fill sizes="56px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-brandInk group-hover:text-brandPrimary transition-colors leading-snug line-clamp-2">{a.title}</p>
                          <p className="text-[10px] font-mono text-brandMuted/70 mt-1 uppercase">{a.date}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-brandPrimary p-6 text-center">
                <p className="text-white font-bold text-sm mb-1">Need a Website?</p>
                <p className="text-white/70 text-xs font-light mb-4 leading-relaxed">Fast, modern and SEO-ready — built for your business goals.</p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-5 py-2 bg-white text-brandPrimary text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-brandBg transition-colors"
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
