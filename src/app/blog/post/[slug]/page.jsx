"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getStoredPosts } from "../../../lib/blogStorage";
import { ARTICLES } from "../../../lib/blog";
import { SITE } from "../../../lib/site";

// Fallback renderer: static articles get the full server-style layout
// (sidebar, TOC, JSON-LD) instead of the bare client view.
function StaticArticleFallback({ slug }) {
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return null;

  const articleUrl = `${SITE.url}blog/${article.slug}`;
  const imageUrl = `${SITE.url}${article.image}`;
  const MONTHS = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  const [month, year] = (article.date || "").split(" ");
  const iso = `${year}-${MONTHS[month] || "01"}-01`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: imageUrl,
    articleSection: article.category,
    inLanguage: "en-US",
    datePublished: iso,
    dateModified: iso,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: `${SITE.name} Developer Portfolio`,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE.url}blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  const rendered = (
    <div className="bg-brandBg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="relative pt-32 sm:pt-40 pb-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-56 bg-brandPrimary/10 blur-[100px] pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-brandMuted mb-5"
          >
            <Link
              href="/"
              className="hover:text-brandPrimary transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-brandPrimary transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-brandPrimary">{article.category}</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-bold text-brandInk leading-tight tracking-tight max-w-4xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 mt-4 text-[10px] font-mono text-brandMuted/70 uppercase tracking-wider">
            <span>By {SITE.name}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          {article.excerpt && (
            <p className="mt-6 max-w-3xl text-base sm:text-lg text-brandMuted font-light leading-relaxed border-l-4 border-brandPrimary pl-4">
              {article.excerpt}
            </p>
          )}
        </div>
      </section>

      <main className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {article.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-brandSoft border border-brandLine mb-10">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                priority
                className="object-cover"
              />
            </div>
          )}
          <p className="text-base sm:text-lg text-brandInk leading-relaxed font-medium mb-10">
            {article.excerpt}
          </p>
        </div>
      </main>
    </div>
  );

  return rendered;
}

export default function DynamicBlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [checked, setChecked] = useState(false);

  // localStorage is only available on the client; read it lazily
  // after mount so SSR/SSG output stays stable.
  useEffect(() => {
    let found = null;
    try {
      found = getStoredPosts().find((p) => p.slug === slug) || null;
    } catch {
      found = null;
    }
    // Defer state updates to a microtask so the effect body stays
    // side-effect free per react-hooks/set-state-in-effect.
    const t = setTimeout(() => {
      setPost(found);
      setChecked(true);
    }, 0);
    return () => clearTimeout(t);
  }, [slug]);

  const isDataOrRemote =
    post?.image &&
    (post.image.startsWith("data:") || post.image.startsWith("http"));
  const related = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === post?.category,
  ).slice(0, 3);
  const fallbackRelated = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;

  if (!checked) {
    return (
      <div className="min-h-screen bg-brandBg flex items-center justify-center font-sans">
        <div
          className="w-8 h-8 border-2 border-brandPrimary border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col items-center justify-center gap-4 font-sans">
        <h1 className="text-2xl font-black text-brandInk">Post Not Found</h1>
        <Link
          href="/blog"
          className="text-brandPrimary font-bold text-sm hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const paragraphs = post.content
    ? post.content.split("\n").filter(Boolean)
    : [];

  return (
    <article className="min-h-screen bg-brandBg font-sans">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-10 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-56 bg-brandPrimary/10 blur-[100px] pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-brandMuted mb-5"
          >
            <Link
              href="/"
              className="hover:text-brandPrimary transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-brandPrimary transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-brandPrimary">{post.category}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-2.5 py-0.5 rounded font-mono text-[9px] tracking-wider bg-brandPrimary/10 text-brandPrimary border border-brandPrimary/20 uppercase">
              {post.category}
            </span>
            <span className="text-[10px] font-mono text-brandMuted">
              {post.date} · {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-brandInk tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-sm sm:text-base text-brandMuted font-light leading-relaxed border-l-4 border-brandPrimary pl-4 max-w-2xl">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Cover image */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-brandSoft border border-brandLine">
            {isDataOrRemote ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                priority
                className="object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-4">
            {paragraphs.map((line, i) => {
              if (line.startsWith("### "))
                return (
                  <h3
                    key={i}
                    className="text-base sm:text-lg font-bold text-brandInk mt-8 mb-2"
                  >
                    {line.slice(4)}
                  </h3>
                );
              if (line.startsWith("## "))
                return (
                  <h2
                    key={i}
                    className="text-lg sm:text-2xl font-bold text-brandInk tracking-wide mt-10 mb-3"
                  >
                    {line.slice(3)}
                  </h2>
                );
              if (line.startsWith("# "))
                return (
                  <h1
                    key={i}
                    className="text-xl sm:text-2xl font-black text-brandInk uppercase tracking-tight mt-10 mb-4"
                  >
                    {line.slice(2)}
                  </h1>
                );
              return (
                <p
                  key={i}
                  className="text-sm sm:text-[15px] text-brandMuted leading-relaxed font-light"
                >
                  {line}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[10px] font-mono bg-brandSoft border border-brandLine text-brandMuted"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          )}

          {/* Author card */}
          <div className="mt-12 rounded-2xl border border-brandLine bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
            <div className="w-14 h-14 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center text-sm font-bold text-brandPrimary font-mono shrink-0">
              MK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-brandInk">{SITE.name}</p>
              <p className="text-[10px] font-mono text-brandMuted/70 tracking-wider uppercase mt-0.5 mb-3">
                Frontend &amp; WordPress Developer · Lahore, Pakistan
              </p>
              <p className="text-xs text-brandMuted font-light leading-relaxed mb-4">
                I build fast, SEO-ready websites for startups and businesses
                worldwide using Next.js, React and WordPress.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-brandPrimary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-md shadow-brandPrimary/20 hover:bg-brandSecondary transition-all duration-200"
              >
                Hire Me for Your Project
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-2xl bg-brandPrimary/5 border border-brandPrimary/20 p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-brandInk uppercase tracking-tight mb-2">
              Want help with{" "}
              <span className="text-brandPrimary">your project?</span>
            </h3>
            <p className="text-brandMuted text-sm font-light leading-relaxed max-w-xl mx-auto mb-5">
              I build fast, modern and SEO-ready websites. Let&apos;s talk about
              what you need — I usually respond within a few hours.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-brandPrimary text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-brandPrimary/20 hover:bg-brandSecondary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Get in Touch →
            </Link>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                Related Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group flex flex-col rounded-xl border border-brandLine bg-white hover:border-brandPrimary/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden min-w-0"
                  >
                    <div className="relative w-full aspect-video bg-brandSoft overflow-hidden">
                      <Image
                        src={a.image}
                        alt={a.title}
                        fill
                        sizes="240px"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-brandInk group-hover:text-brandPrimary transition-colors line-clamp-2 leading-snug">
                        {a.title}
                      </p>
                      <p className="text-[10px] font-mono text-brandMuted/60 mt-1 uppercase">
                        {a.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </article>
  );
}
