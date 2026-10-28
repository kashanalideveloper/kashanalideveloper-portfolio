// src/app/lib/seo.js
// Shared SEO metadata builder for blog articles — keeps OpenGraph/Twitter
// markup consistent across every article without duplicating it per page.
import { SITE } from "./site";
import { ARTICLES } from "./blog";

// Global keyword pool — every article gets a targeted slice of these plus
// keywords derived from its own title/category so each page carries
// distinct, relevant keyword metadata for search engines.
const GLOBAL_KEYWORDS = [
  "web developer pakistan",
  "web development services pakistan",
  "hire web developer lahore",
  "freelance web developer pakistan",
  "custom website development",
  "next.js developer for hire",
  "react developer pakistan",
  "frontend developer for hire",
  "wordpress development services",
  "seo friendly web design",
  "website performance optimization",
  "responsive web design services",
];

// Category-specific keywords — mixed into each article's metadata.
const CATEGORY_KEYWORDS = {
  Services: ["front-end development services", "hire dedicated frontend developer"],
  Career: ["frontend developer career guide", "learn frontend development 2026"],
  Interviews: ["frontend interview questions", "web developer interview preparation"],
  Development: ["web development tips", "software development guide"],
  Hiring: ["hire web developer guide", "how to hire a website developer"],
  "Web Development": ["custom web development services", "professional website development"],
  WordPress: ["wordpress developer pakistan", "custom wordpress development"],
  "React.js": ["react js development services", "react development company"],
  "UI/UX": ["ui ux design services", "conversion focused web design"],
  Performance: ["website speed optimization services", "core web vitals optimization"],
  Maintenance: ["website maintenance services", "website security services"],
  "Next.js": ["next js development services", "next.js app router developer"],
  AI: ["ai web development", "hire ai developer"],
  Portfolio: ["developer portfolio tips", "frontend portfolio examples"],
  Projects: ["frontend project ideas", "developer portfolio projects"],
  SEO: ["seo services pakistan", "improve website ranking google"],
  Backend: ["backend development services", "node.js api development"],
  React: ["react development services", "react performance optimization"],
};

// Derive keyword phrases from the article title — each meaningful line of the
// title becomes a long-tail keyword phrase.
function titleKeywords(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s:]/g, " ")
    .split(/\s{2,}|\s:\s|:\s/)
    .filter((part) => part.trim().length > 3)
    .map((part) => part.trim());
}

export function articleKeywords(slug, extra = []) {
  const article = ARTICLES.find((a) => a.slug === slug);
  const categoryKeys = article ? CATEGORY_KEYWORDS[article.category] || [] : [];
  const titleKeys = article ? titleKeywords(article.title) : [];
  return [...new Set([...titleKeys, ...categoryKeys, ...GLOBAL_KEYWORDS, ...extra])].slice(0, 20);
}

export function blogMetadata({ title, description, slug, keywords }) {
  const url = `${SITE.url}blog/${slug}`;
  // Use the article's own banner as the OG image when available — much better
  // social click-through than one generic site-wide image.
  const article = ARTICLES.find((a) => a.slug === slug);
  const ogImage = article
    ? `${SITE.url}${article.image}`
    : `${SITE.url}og-image.png`;
  // Auto-assembled keywords: title-derived + category + global + any extras.
  const kw = articleKeywords(slug, keywords || []);
  return {
    title,
    description,
    keywords: kw,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article ? toIsoDate(article.date) : undefined,
      locale: "en_US",
      siteName: `${SITE.name} Developer Portfolio`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const MONTH_INDEX = {
  January: "01", February: "02", March: "03", April: "04",
  May: "05", June: "06", July: "07", August: "08",
  September: "09", October: "10", November: "11", December: "12",
};

function toIsoDate(dateStr) {
  const [month, year] = dateStr.split(" ");
  return `${year}-${MONTH_INDEX[month] || "01"}-01`;
}