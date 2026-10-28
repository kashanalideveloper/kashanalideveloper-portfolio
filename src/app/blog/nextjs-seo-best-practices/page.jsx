// src/app/blog/nextjs-seo-best-practices/page.jsx
import BlogArticleLayout from "../../Components/BlogArticleLayout";
import { blogMetadata } from "../../lib/seo";

export const metadata = blogMetadata({
  title: "Next.js SEO Best Practices 2026: Rank Higher With the App Router",
  description:
    "Metadata API, structured data, sitemaps, robots and Core Web Vitals — the complete Next.js SEO checklist that gets pages indexed and ranked.",
  slug: "nextjs-seo-best-practices",
  keywords: [
    "next.js seo best practices 2026",
    "next.js vs react for seo 2026",
    "next.js app router seo",
    "next.js metadata api",
    "next.js structured data",
  ],
});

export default function Article() {
  return (
    <BlogArticleLayout
      category="SEO"
      title="Next.js SEO Best Practices 2026: Rank Higher With the App Router"
      date="October 2026"
      readTime="8 min read"
      intro="Metadata API, structured data, sitemaps, robots and Core Web Vitals — the complete Next.js SEO checklist that gets pages indexed and ranked."
      sections={[
        {
          heading: "Why Next.js Wins at SEO (When Configured Right)",
          body: [
            "React SPAs render in the browser — crawlers see an empty div first, and indexing gets unreliable. Next.js server-renders every page by default, so crawlers receive complete HTML immediately. That single difference is why Next.js is the default answer to 'which framework for SEO?'",
            "But server rendering alone is not SEO. The framework gives you the tools — Metadata API, file-based sitemaps, structured data support, image optimization — and ranking comes from using all of them correctly.",
          ],
        },
        {
          heading: "The Metadata API Checklist",
          body: [
            "Every page exports metadata: a unique title (50–60 chars), a compelling description (140–160 chars), and a canonical URL through the alternates field — canonicals prevent duplicate-content issues between trailing-slash variants. Use the title.template in your root layout so every page gets consistent branding.",
            "Set metadataBase once in the root layout so relative OG image URLs resolve correctly. Add openGraph and twitter blocks per page — social click-through is traffic Google notices.",
          ],
        },
        {
          heading: "Structured Data (JSON-LD)",
          body: [
            "Add schema.org markup: Person on a portfolio, Article on blog posts (with datePublished, author, image), BreadcrumbList on nested pages, FAQPage on FAQ sections. Google uses this for rich results, and AI search engines use it to understand your content.",
            "Inject it with a script tag of type application/ld+json inside the page or layout. Validate with Google's Rich Results Test after every deploy — broken markup silently does nothing.",
          ],
        },
        {
          heading: "Sitemaps, Robots and Indexing",
          body: [
            "Generate sitemap.xml and robots.txt as code (app/sitemap.js, app/robots.js) so they stay in sync with your routes automatically — a hand-maintained sitemap is always out of date. Reference the sitemap from robots and from Google Search Console.",
            "After publishing, request indexing in Search Console for key pages. Check the Pages report monthly: 'Crawled – currently not indexed' usually means thin content or weak internal linking, not a technical bug.",
          ],
        },
        {
          heading: "Performance Is an SEO Feature",
          body: [
            "Core Web Vitals are a ranking input: optimise the LCP image (priority prop, correct sizes), avoid layout shifts (explicit dimensions), keep interactions fast. Use next/image everywhere, self-host fonts with next/font, and keep client components small.",
            "One often-missed item: security headers including a correct Content-Security-Policy. They protect your rankings too — a hacked or spam-injected site gets deindexed fast.",
          ],
        },
      ]}
      conclusion={[
        "Next.js SEO is a checklist, not a mystery: complete metadata on every page, structured data, a code-generated sitemap and robots, fast Core Web Vitals, and content that answers real questions. Do all five consistently and indexing follows.",
        "Every site I build ships with this exact SEO stack configured from day one. Want your Next.js site audited or rebuilt properly? Let's talk.",
      ]}
    />
  );
}
