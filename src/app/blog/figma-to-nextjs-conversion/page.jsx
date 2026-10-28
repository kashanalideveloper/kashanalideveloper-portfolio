// src/app/blog/figma-to-nextjs-conversion/page.jsx
import BlogArticleLayout from "../../Components/BlogArticleLayout";
import { blogMetadata } from "../../lib/seo";

export const metadata = blogMetadata({
  title: "Figma to Next.js Conversion: Turning Designs Into Production Code",
  description:
    "The exact workflow I use to convert Figma designs into pixel-perfect, responsive Next.js + Tailwind applications — spacing systems, responsive breakpoints and all.",
  slug: "figma-to-nextjs-conversion",
  keywords: [
    "figma to next.js conversion",
    "figma to code service",
    "design to code workflow",
    "convert figma design to react",
  ],
});

export default function Article() {
  return (
    <BlogArticleLayout
      category="UI/UX"
      title="Figma to Next.js Conversion: Turning Designs Into Production Code"
      date="October 2026"
      readTime="6 min read"
      intro="The exact workflow I use to convert Figma designs into pixel-perfect, responsive Next.js + Tailwind applications — without AI slop."
      sections={[
        {
          heading: "Why Manual Conversion Beats AI-Generated Code",
          body: [
            "AI tools can spit out a page from a screenshot, but the output is usually unstructured: hardcoded pixel values, no component hierarchy, inconsistent spacing, and accessibility ignored. It looks right on one screen and breaks everywhere else.",
            "A proper conversion produces the opposite: a component structure that matches the design system, spacing driven by tokens, responsive breakpoints at every level, and code a team can extend for years. That is a craft, and it follows a consistent process.",
          ],
        },
        {
          heading: "Step 1: Extract the Design System First",
          body: [
            "Before writing any component, read the design's tokens: colour palette, type scale, spacing scale, border radii, and shadow levels. These go straight into a Tailwind config or CSS variables — not hardcoded into components.",
            "Figma's dev mode and inspect panels help, but the real skill is recognising patterns: that 4/8/12 rhythm of spacing, the consistent card radius, the two-level shadow system. Once extracted, every component you build stays consistent automatically.",
          ],
        },
        {
          heading: "Step 2: Build the Component Hierarchy",
          body: [
            "Break the design into sections, then sections into components, then components into primitives. A page isn't one giant JSX blob — it's a composition of small, named components: Hero, FeatureCard, Testimonial, CTA.",
            "Build each component to accept props rather than hardcoding content, so the same Card component renders three different features from an array. This is the difference between code that looks like the design and code that works like a product.",
          ],
        },
        {
          heading: "Step 3: Responsive by Structure, Not Media Queries",
          body: [
            "Responsive design isn't about shrinking things — it's about structure changing. A four-column desktop grid becomes a two-column tablet grid and a single mobile column. Navigation becomes a drawer. Content reorders by priority.",
            "In Tailwind, this means designing mobile-first: base styles for small screens, then sm:, md:, lg: overrides as screens grow. Every breakpoint decision comes from the content's needs, not the design file's pixel widths.",
          ],
        },
        {
          heading: "Step 4: Accessibility and Performance as Defaults",
          body: [
            "Semantic HTML first: real buttons, real headings in order, landmarks for regions, alt text that describes function. Keyboard navigation tested on every interactive element. Focus states visible, not suppressed.",
            "Images optimised through next/image with correct sizes and priority flags. Fonts loaded with next/font to eliminate layout shift. These aren't extras — they're what separates a design-to-code conversion from a screenshot pasted into HTML.",
          ],
        },
      ]}
      conclusion={[
        "The result is a pixel-perfect, accessible, production-ready codebase that matches the design and stays maintainable for years.",
        "Have a Figma design waiting to become a real product? Let's build it properly.",
      ]}
    />
  );
}
