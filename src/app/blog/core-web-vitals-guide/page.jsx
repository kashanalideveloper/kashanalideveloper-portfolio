// src/app/blog/core-web-vitals-guide/page.jsx
import BlogArticleLayout from "../../Components/BlogArticleLayout";
import { blogMetadata } from "../../lib/seo";

export const metadata = blogMetadata({
  title: "Core Web Vitals 2026: The Complete Guide to Passing Every Metric",
  description:
    "LCP, INP and CLS explained with real fixes. The exact Core Web Vitals checklist I use to get client sites into the green on every metric.",
  slug: "core-web-vitals-guide",
  keywords: [
    "core web vitals",
    "lcp optimization",
    "inp fix",
    "cls fix",
    "page speed optimization",
  ],
});

export default function Article() {
  return (
    <BlogArticleLayout
      category="Performance"
      title="Core Web Vitals 2026: The Complete Guide to Passing Every Metric"
      date="October 2026"
      readTime="8 min read"
      intro="LCP, INP and CLS explained with real fixes. The exact checklist I use to get client sites into the green on every metric."
      sections={[
        {
          heading: "The Three Metrics That Matter",
          body: [
            "LCP (Largest Contentful Paint): how fast your main content appears. Target: under 2.5 seconds. INP (Interaction to Next Paint): how fast the page responds to taps and clicks. Target: under 200 milliseconds. CLS (Cumulative Layout Shift): how much the page jumps while loading. Target: under 0.1.",
            "Google uses these in ranking — but more importantly, users feel them. Every metric maps to a real frustration: slow first paint, unresponsive buttons, and content that moves as you try to read it.",
          ],
        },
        {
          heading: "Fixing LCP",
          body: [
            "Identify the element first — usually a hero image or heading. Then: serve it with priority (next/image priority prop), preload the font it uses, and make sure nothing blocks its render. Server-render it so HTML arrives with content, not an empty shell waiting for JS.",
            "Image discipline matters more than anything: correct sizes, modern formats (AVIF/WebP), and never lazy-load the LCP image. Lazy-loading your hero is the single most common cause of a failing LCP I see in audits.",
          ],
        },
        {
          heading: "Fixing INP",
          body: [
            "INP got tough because it measures every interaction, not just the first. The main killers: long JavaScript tasks, hydration blocking, and expensive re-renders on click.",
            "Fixes: split long tasks (scheduler.yield or just smaller components), debounce expensive handlers, memoise heavy lists, and move work off the main thread where possible. A page that feels instant on a fast laptop can fail badly on a mid-range Android — test on real devices.",
          ],
        },
        {
          heading: "Fixing CLS",
          body: [
            "Layout shifts come from content loading without reserved space. Every image needs explicit width/height or an aspect-ratio box. Fonts need font-display: swap with a size-adjusted fallback. Ads, embeds and late-loading banners need fixed slots.",
            "One sneaky source: dynamically injected content above existing content — cookie banners, sticky headers that appear after scroll. Animate them in with transform instead of pushing content down.",
          ],
        },
        {
          heading: "The Measurement Loop",
          body: [
            "Lab tools (Lighthouse, PageSpeed Insights) find problems, but field data (Chrome UX Report, Search Console's Core Web Vitals report) is what Google actually grades. Optimise with lab tools, verify with field data.",
            "Re-test after every release. Performance rots quietly — one new chat widget or analytics script can undo months of optimisation.",
          ],
        },
      ]}
      conclusion={[
        "Core Web Vitals are not a one-time audit — they are a habit. Reserve space, prioritise the LCP asset, keep interactions cheap, and measure real users. Do those four things consistently and the green scores follow.",
        "I include a full Core Web Vitals pass in every website I build. If your site is failing these metrics, let's talk — the fixes are usually faster and cheaper than you expect.",
      ]}
    />
  );
}
