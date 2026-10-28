// src/app/sitemap.js
// Complete sitemap — covers every indexable page:
// static routes, dynamic service & project pages, and all blog articles.
import { SITE } from "./lib/site";
import { ARTICLES } from "./lib/blog";
import { SERVICES_DATA } from "./lib/services-data";
import { PROJECT_DATA } from "./lib/projects";

const CURRENT_DATE = new Date().toISOString().split("T")[0];

const MONTH_INDEX = {
  January: "01", February: "02", March: "03", April: "04",
  May: "05", June: "06", July: "07", August: "08",
  September: "09", October: "10", November: "11", December: "12",
};

function articleLastModified(dateStr) {
  const [month, year] = dateStr.split(" ");
  return `${year}-${MONTH_INDEX[month] || "01"}-01`;
}

const BASE = SITE.url.replace(/\/$/, "");

// Static routes — every manually created page on the site.
const STATIC_ROUTES = [
  { path: "", priority: 1.0, frequency: "weekly" },
  { path: "about", priority: 0.9, frequency: "monthly" },
  { path: "projects", priority: 0.9, frequency: "weekly" },
  { path: "services", priority: 0.9, frequency: "monthly" },
  { path: "blog", priority: 0.8, frequency: "weekly" },
  { path: "contact", priority: 0.8, frequency: "monthly" },
  { path: "faq", priority: 0.6, frequency: "monthly" },
  { path: "privacy-policy", priority: 0.3, frequency: "yearly" },
  { path: "terms-conditions", priority: 0.3, frequency: "yearly" },
];

// Dynamic service detail pages.
const SERVICE_ROUTES = Object.keys(SERVICES_DATA).map((slug) => ({
  path: `services/${slug}`,
  priority: 0.8,
  frequency: "monthly",
}));

// Dynamic project detail pages.
const PROJECT_ROUTES = PROJECT_DATA.map((project) => ({
  path: `projects/${project.slug}`,
  priority: 0.7,
  frequency: "monthly",
}));

// Blog article pages.
const BLOG_ROUTES = ARTICLES.map((article) => ({
  path: `blog/${article.slug}`,
  priority: 0.7,
  frequency: "weekly",
  lastModified: articleLastModified(article.date),
}));

export default function sitemap() {
  const allRoutes = [
    ...STATIC_ROUTES,
    ...SERVICE_ROUTES,
    ...PROJECT_ROUTES,
    ...BLOG_ROUTES,
  ];

  return allRoutes.map((route) => ({
    url: `${BASE}/${route.path}`.replace(/\/$/, ""), // avoids trailing "//" on root
    lastModified: route.lastModified || CURRENT_DATE,
    changeFrequency: route.frequency,
    priority: route.priority,
  }));
}
