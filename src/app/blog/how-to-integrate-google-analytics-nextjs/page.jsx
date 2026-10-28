// src/app/blog/how-to-integrate-google-analytics-nextjs/page.jsx
import BlogArticleLayout from "../../Components/BlogArticleLayout";
import { blogMetadata } from "../../lib/seo";

export const metadata = blogMetadata({
  title: "How to Integrate Google Analytics in Next.js (GA4, the Right Way)",
  description:
    "Add GA4 to Next.js App Router with @next/third-parties, fix Content-Security-Policy blocking your analytics, and keep your PageSpeed score intact.",
  slug: "how-to-integrate-google-analytics-nextjs",
  keywords: [
    "how to integrate google analytics in next.js",
    "google analytics 4 next.js",
    "next.js gtag setup",
    "ga4 app router",
    "content security policy google analytics",
  ],
});

export default function Article() {
  return (
    <BlogArticleLayout
      category="Next.js"
      title="How to Integrate Google Analytics in Next.js (GA4, the Right Way)"
      date="October 2026"
      readTime="5 min read"
      intro="Add GA4 to Next.js App Router with @next/third-parties, fix Content-Security-Policy blocking, and keep your PageSpeed score intact."
      sections={[
        {
          heading: "The Clean Way: @next/third-parties",
          body: [
            "Don't paste raw gtag.js script tags into your layout — you'll manage script loading, consent and CSP yourself. Install the official package: npm install @next/third-parties google.",
            "In app/layout.jsx: import { GoogleAnalytics } from '@next/third-parties/google' and render <GoogleAnalytics gaId=\"G-XXXXXXXXXX\" /> inside the html element. That's it — the component handles script injection, the gtag stub and page-view tracking across client navigations automatically.",
          ],
        },
        {
          heading: "Getting Your Measurement ID",
          body: [
            "In the Google Analytics dashboard: Admin → Data Streams → create a Web stream for your site. The Measurement ID (format G-XXXXXXXXXX) appears at the top of the stream details. Copy exactly — a wrong ID fails silently, with no errors anywhere.",
            "Put the ID in an environment variable (NEXT_PUBLIC_GA_ID) rather than hardcoding it, so staging and production can use different properties.",
          ],
        },
        {
          heading: "Fixing 'Script Blocked by Content-Security-Policy'",
          body: [
            "If you set security headers in next.config.mjs, a strict CSP will silently block GA. The console shows 'Loading the script violates the following Content-Security-Policy directive: script-src'. The fix is allowing the analytics domains explicitly.",
            "Add to script-src: https://www.googletagmanager.com (loads the script) and https://va.vercel-scripts.com if you also run Vercel Analytics. Add to connect-src: https://www.google-analytics.com and your regional endpoint (region1.google-analytics.com) — this is where beacons are sent. Add the same domains to img-src for tracking pixels. Changing CSP requires a full redeploy.",
          ],
        },
        {
          heading: "Verifying It Actually Works",
          body: [
            "Open your site, then in the GA dashboard check Reports → Realtime — your own visit should appear within a minute. Also check the browser Network tab for a request to google-analytics.com with status 200, and the console for CSP violations.",
            "For deeper verification, install the Google Analytics Debugger extension — it logs every hit your browser sends, including events and their parameters.",
          ],
        },
        {
          heading: "Keeping Performance Intact",
          body: [
            "The @next/third-parties component loads GA with proper async handling, so it doesn't block rendering. Still, keep your site lean: analytics is one more script, and every script costs a little. Don't stack three analytics tools when one will do.",
            "Test your PageSpeed score after adding analytics — if LCP or INP regressed, the culprit is usually script loading order, and facades or delayed loading can fix it.",
          ],
        },
      ]}
      conclusion={[
        "Five minutes of setup, one component, three CSP domains — and you have production-grade analytics on a Next.js site. Verify in Realtime reports, and keep an eye on performance after any analytics change.",
        "I set up analytics, CSP and performance monitoring as standard on every client build. Want your site properly instrumented? Let's talk.",
      ]}
    />
  );
}
