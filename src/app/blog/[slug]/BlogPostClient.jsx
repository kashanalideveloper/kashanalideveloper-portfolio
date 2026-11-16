// src/app/blog/[slug]/BlogPostClient.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ARTICLES } from "../../lib/blog";
import { getStoredPosts } from "../../lib/blogStorage";
import BlogArticleLayout from "../../Components/BlogArticleLayout";

export default function BlogPostClient() {
  const params = useParams();
  const slug = params?.slug;
  const [storedPost, setStoredPost] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const found = getStoredPosts().find((p) => p.slug === slug);
      if (found) setStoredPost(found);
    } catch (e) {
      // ignore
    }
  }, [slug]);

  const staticArticle = ARTICLES.find((a) => a.slug === slug);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brandPrimary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const post = storedPost || staticArticle;

  if (!post) {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col items-center justify-center gap-4 text-center px-4 font-sans">
        <h1 className="text-3xl font-black text-brandInk">Article Not Found</h1>
        <p className="text-brandMuted text-sm max-w-md">
          The article you are looking for might have been removed or the URL is incorrect.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center px-6 py-3 bg-brandPrimary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brandSecondary transition-all"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const title = post.title;
  const category = post.category || "Development";
  const date = post.date || "October 2026";
  const readTime = post.readTime || "6 min read";
  const intro = post.excerpt || title;

  let sections = [];
  let conclusion = [
    "Implementing these best practices will significantly elevate your web development projects and deliver exceptional results for users and clients.",
    "If you need expert assistance with your website or web app, get in touch with me today — I usually respond within a few hours.",
  ];

  if (post.content) {
    const lines = post.content.split("\n").filter(Boolean);
    let currentHeading = "Overview";
    let currentBody = [];
    
    lines.forEach((line) => {
      if (line.startsWith("## ") || line.startsWith("### ")) {
        if (currentBody.length > 0) {
          sections.push({ heading: currentHeading, body: currentBody });
          currentBody = [];
        }
        currentHeading = line.replace(/^#+\s*/, "");
      } else {
        currentBody.push(line);
      }
    });
    if (currentBody.length > 0) {
      sections.push({ heading: currentHeading, body: currentBody });
    }
  }

  if (sections.length === 0) {
    sections = [
      {
        heading: `Understanding ${category} Fundamentals`,
        body: [
          `When working on projects related to ${title.toLowerCase()}, establishing a solid architectural foundation is crucial for long-term success and maintainability.`,
          `Modern web standards demand high performance, accessibility, and robust security practices from day one. Skipping these fundamentals often leads to costly refactoring later in the product lifecycle.`,
        ],
      },
      {
        heading: "Key Implementation Strategies",
        body: [
          `To achieve optimal outcomes in ${category.toLowerCase()} development, focus on clean component design, efficient state management, and rigorous testing across all target devices.`,
          `Leveraging modern frameworks and tools like Next.js, Tailwind CSS, and optimized asset pipelines ensures your application loads instantly and provides a seamless user experience.`,
        ],
      },
      {
        heading: "Performance & SEO Best Practices",
        body: [
          `Search engines and users alike favor lightning-fast websites. Prioritizing Core Web Vitals, semantic HTML, and proper metadata configuration directly correlates with higher search rankings and improved conversion rates.`,
          `Regular audits and automated testing keep your codebase lean, secure, and free from performance regressions as new features are added.`,
        ],
      },
    ];
  }

  return (
    <BlogArticleLayout
      category={category}
      title={title}
      date={date}
      readTime={readTime}
      intro={intro}
      sections={sections}
      conclusion={conclusion}
    />
  );
}
