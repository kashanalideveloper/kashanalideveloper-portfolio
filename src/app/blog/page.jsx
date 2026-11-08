// src/app/blog/page.jsx
import Link from "next/link";
import Image from "next/image";
import PageHeader from "../Components/PageHeader";
import BlogCardImage from "../Components/BlogCardImage";
import { ARTICLES } from "../lib/blog";
import { SITE } from "../lib/site";

export const metadata = {
  title: "Web Development Blog | Malik Kashan — Frontend Developer",
  description:
    "Next.js, React, WordPress and web performance articles by Malik Kashan — frontend developer in Lahore, Pakistan.",
  alternates: { canonical: `${SITE.url}blog` },
  openGraph: {
    title: "Web Development Blog | Malik Kashan",
    description:
      "Next.js, React, WordPress and web performance articles by Malik Kashan — frontend developer in Lahore, Pakistan.",
    url: `${SITE.url}blog`,
    type: "website",
  },
};

// Unique categories from articles
const CATEGORIES = [...new Set(ARTICLES.map((a) => a.category))];

// Recent 5 articles for sidebar
const RECENT = ARTICLES.slice(0, 5);
const PAGE_SIZE = 6;

function blogHref(category, page = 1) {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default async function BlogPage({ searchParams }) {
  const query = searchParams ? await searchParams : {};
  const requestedCategory =
    typeof query.category === "string" ? query.category : "All";
  const selectedCategory = CATEGORIES.includes(requestedCategory)
    ? requestedCategory
    : "All";
  const filteredArticles =
    selectedCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((article) => article.category === selectedCategory);
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const requestedPage =
    typeof query.page === "string" && /^\d+$/.test(query.page)
      ? Number(query.page)
      : 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const pageArticles = filteredArticles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <PageHeader
        badge="Blog"
        title="Insights &"
        highlight="Tutorials"
        description="Practical articles on web development, design and performance — written from real client work, not theory."
      />

      <main className="relative bg-white pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
            {/* ── LEFT SIDEBAR ── */}
            <aside className="flex h-full flex-col gap-8">
              {/* About widget */}
              <div className="rounded-2xl border border-brandLine bg-brandBg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-brandPrimary/20 shrink-0">
                    <Image
                      src="/favicon.png"
                      alt="Malik Kashan"
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brandInk">
                      Malik Kashan
                    </p>
                    <p className="text-[10px] font-mono text-brandMuted uppercase tracking-wider">
                      Web Developer
                    </p>
                  </div>
                </div>
                <p className="text-xs text-brandMuted font-light leading-relaxed">
                  Frontend &amp; WordPress developer from Lahore, Pakistan. I
                  write about Next.js, React, SEO and practical web development.
                </p>
              </div>

              {/* Categories */}
              <div className="rounded-2xl border border-brandLine bg-brandBg p-6">
                <h2 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                  Categories
                </h2>
                <ul className="space-y-2">
                  {["All", ...CATEGORIES].map((cat) => {
                    const count =
                      cat === "All"
                        ? ARTICLES.length
                        : ARTICLES.filter((a) => a.category === cat).length;
                    return (
                      <li key={cat}>
                        <Link
                          href={blogHref(cat)}
                          aria-current={selectedCategory === cat ? "page" : undefined}
                          className={`flex items-center justify-between text-xs transition-colors py-1 border-b border-brandLine/50 last:border-0 ${
                            selectedCategory === cat
                              ? "text-brandPrimary"
                              : "text-brandMuted hover:text-brandPrimary"
                          }`}
                        >
                          <span className="font-medium">{cat === "All" ? "All Articles" : cat}</span>
                          <span className="text-[10px] font-mono bg-brandPrimary/10 text-brandPrimary px-2 py-0.5 rounded-full">
                            {count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="rounded-2xl border border-brandLine bg-brandBg p-6">
                <h2 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                  Recent Posts
                </h2>
                <ul className="space-y-4">
                  {RECENT.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/blog/${a.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-brandSoft">
                          <Image
                            src={a.image}
                            alt={a.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-brandInk group-hover:text-brandPrimary transition-colors leading-snug line-clamp-2">
                            {a.title}
                          </p>
                          <p className="text-[10px] font-mono text-brandMuted/70 mt-1 uppercase">
                            {a.date}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hire Me CTA */}
              <div className="mt-auto rounded-2xl bg-brandPrimary p-6 text-center">
                <p className="text-white font-bold text-sm mb-1">
                  Need a Website?
                </p>
                <p className="text-white/70 text-xs font-light mb-4">
                  Let&apos;s build something fast and modern together.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-5 py-2 bg-white text-brandPrimary text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-brandBg transition-colors"
                >
                  Hire Me →
                </Link>
              </div>
            </aside>

            {/* ── MAIN ARTICLES GRID ── */}
            <section className="flex min-w-0 flex-col">
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-xs text-brandMuted">
                  Showing{" "}
                  <span className="font-semibold text-brandInk">
                    {filteredArticles.length === 0
                      ? 0
                      : (currentPage - 1) * PAGE_SIZE + 1}
                    –
                    {Math.min(currentPage * PAGE_SIZE, filteredArticles.length)}
                  </span>{" "}
                  of {filteredArticles.length} articles
                </p>
                {selectedCategory !== "All" && (
                  <span className="rounded-full border border-brandPrimary/20 bg-brandPrimary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-brandPrimary">
                    {selectedCategory}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pageArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group relative overflow-hidden flex flex-col justify-between w-full rounded-2xl bg-brandBg border border-brandLine transition-all duration-300 hover:-translate-y-1 hover:border-brandPrimary/30 hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.1)]"
                  >
                    <div className="relative block w-full aspect-video overflow-hidden bg-brandSoft">
                      <BlogCardImage
                        src={article.image}
                        alt={`${article.title} — Malik Kashan web development blog`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        slug={article.slug}
                      />
                      <span className="absolute top-3 left-3 inline-block px-2.5 py-0.5 rounded font-mono text-[9px] tracking-wider bg-white/90 text-brandPrimary border border-brandPrimary/20 uppercase backdrop-blur-md shadow-sm z-10">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col justify-between grow">
                      <h2 className="text-sm font-bold text-brandInk tracking-wide mb-2 group-hover:text-brandPrimary transition-colors duration-200 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-brandMuted text-xs leading-relaxed font-light mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="px-5 pb-5">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-primary)] bg-brandPrimary/10 border border-brandPrimary/20 transition-all duration-300 group-hover:bg-brandPrimary group-hover:text-white group-hover:border-brandPrimary">
                        View Article
                        <svg
                          className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Blog pagination"
                  className="mt-8 flex flex-wrap items-center justify-center gap-2"
                >
                  <Link
                    href={blogHref(selectedCategory, currentPage - 1)}
                    aria-label="Previous page"
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : undefined}
                    className={`rounded-lg border border-brandLine px-3 py-2 text-xs font-medium transition-colors ${
                      currentPage === 1
                        ? "pointer-events-none opacity-40"
                        : "text-brandMuted hover:border-brandPrimary/40 hover:text-brandPrimary"
                    }`}
                  >
                    Previous
                  </Link>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <Link
                        key={page}
                        href={blogHref(selectedCategory, page)}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-xs font-semibold transition-colors ${
                          currentPage === page
                            ? "border-brandPrimary bg-brandPrimary text-white"
                            : "border-brandLine text-brandMuted hover:border-brandPrimary/40 hover:text-brandPrimary"
                        }`}
                      >
                        {page}
                      </Link>
                    ),
                  )}
                  <Link
                    href={blogHref(selectedCategory, currentPage + 1)}
                    aria-label="Next page"
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                    className={`rounded-lg border border-brandLine px-3 py-2 text-xs font-medium transition-colors ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-40"
                        : "text-brandMuted hover:border-brandPrimary/40 hover:text-brandPrimary"
                    }`}
                  >
                    Next
                  </Link>
                </nav>
              )}

              {/* Bottom CTA */}
              <div className="mt-14 rounded-2xl bg-brandPrimary/5 border border-brandPrimary/20 p-8 sm:p-10 text-center">
                <h2 className="text-2xl font-bold text-brandInk uppercase tracking-tight mb-2">
                  Want help with{" "}
                  <span className="text-brandPrimary">your project?</span>
                </h2>
                <p className="text-brandMuted text-sm font-light leading-relaxed max-w-xl mx-auto mb-6">
                  I build fast, modern websites and web apps. Let&apos;s talk
                  about what you need.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-brandPrimary text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-brandPrimary/20 hover:bg-brandSecondary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
