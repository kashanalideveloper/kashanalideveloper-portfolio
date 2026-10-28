// src/app/blog/react-server-components-explained/page.jsx
import BlogArticleLayout from "../../Components/BlogArticleLayout";
import { blogMetadata } from "../../lib/seo";

export const metadata = blogMetadata({
  title: "React Server Components Explained: Less JavaScript, Faster Pages",
  description:
    "React Server Components ship zero JavaScript to the browser. Learn how RSCs work, when to use them, when not to, and how they change React architecture.",
  slug: "react-server-components-explained",
  keywords: [
    "react server components",
    "rsc explained",
    "server vs client components",
    "next.js app router",
    "react performance",
  ],
});

export default function Article() {
  return (
    <BlogArticleLayout
      category="React"
      title="React Server Components Explained: Less JavaScript, Faster Pages"
      date="October 2026"
      readTime="8 min read"
      intro="Server Components ship zero JavaScript to the browser. Learn when to use them, when not to, and how they change React architecture."
      sections={[
        {
          heading: "The Problem Server Components Solve",
          body: [
            "Traditional React ships a component tree to the browser, hydrates it, then renders. Every component — even one that just displays static text — costs JavaScript bytes, parse time and hydration work. On mid-range phones, that cost is the difference between a fast page and a sluggish one.",
            "Server Components flip the model: they render on the server and send only the result. No component code, no hydration, no effect wiring. A data-heavy page built from Server Components can ship 50–80% less JavaScript than its client-side equivalent.",
          ],
        },
        {
          heading: "How They Actually Work",
          body: [
            "In the App Router, every component is a Server Component by default. You opt into client-side interactivity with 'use client' — and only where you need it. Server Components can fetch data directly (async/await at the top level), access your database, and keep secrets on the server.",
            "The boundary matters: a Client Component can import another Client Component, but a Client Component cannot import a Server Component — it can only receive them as children props. Most RSC bugs come from crossing this line accidentally.",
          ],
        },
        {
          heading: "When to Use Server Components",
          body: [
            "Content that does not change per interaction: article text, product descriptions, nav, footers. Anything that reads from a database or CMS. Anything handling secrets — API keys never reach the browser in an RSC data fetch.",
            "Layouts, sidebars, tables of data, SEO-critical content — all ideal. The pattern: server-render the skeleton, then sprinkle small client islands for the interactive parts.",
          ],
        },
        {
          heading: "When Client Components Are Still Right",
          body: [
            "Anything with state or event handlers: forms, modals, dropdowns, drag-and-drop. Anything using browser APIs: localStorage, geolocation, canvas. Animations driven by user interaction (framer-motion) belong on the client.",
            "A common mistake is marking a whole page 'use client' because one widget needs interactivity. Push the directive down to the smallest possible component instead — that single habit is most of the performance win.",
          ],
        },
        {
          heading: "The Mental Model Shift",
          body: [
            "Stop thinking 'React app that fetches data' and start thinking 'server-rendered page with interactive islands.' Data fetching moves from useEffect into the component itself. Loading states become Suspense boundaries instead of spinner booleans.",
            "This is not a smaller API — it is a different architecture. Teams that embrace it report faster pages and simpler code, because the server does what servers are good at and the browser does what browsers are good at.",
          ],
        },
      ]}
      conclusion={[
        "Server Components are the biggest architectural shift in React since hooks — and the payoff is real: less JavaScript, faster loads, secrets that stay secret. The cost is learning a new boundary model, which pays for itself within the first project.",
        "I build client sites with this architecture by default. If you want a fast, modern React or Next.js application that follows current best practices, let's talk.",
      ]}
    />
  );
}
