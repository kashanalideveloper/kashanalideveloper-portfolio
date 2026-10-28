// src/app/robots.js
import { SITE } from "./lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep crawlers out of API/utility paths
        disallow: ["/api/"],
      },
      // Explicitly welcome AI search/answer engines — increasingly a traffic source
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE.url}sitemap.xml`,
    host: SITE.url,
  };
}
