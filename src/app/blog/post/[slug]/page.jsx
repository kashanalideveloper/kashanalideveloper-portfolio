"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getStoredPosts } from "../../../lib/blogStorage";

export default function DynamicBlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const posts = getStoredPosts();
      const found = posts.find((p) => p.slug === slug);
      setPost(found || null);
    } catch {}
    setLoaded(true);
  }, [slug]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-brandBg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brandPrimary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col items-center justify-center gap-4 font-sans">
        <h1 className="text-2xl font-black text-brandInk">Post Not Found</h1>
        <Link href="/blog" className="text-brandPrimary font-bold text-sm hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const paragraphs = post.content
    ? post.content.split("\n").filter(Boolean)
    : [];

  return (
    <article className="min-h-screen bg-brandBg font-sans pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-brandMuted hover:text-brandPrimary mb-8 transition-colors">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Blog
        </Link>

        {/* Category + date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-0.5 rounded font-mono text-[9px] tracking-wider bg-brandPrimary/10 text-brandPrimary border border-brandPrimary/20 uppercase">
            {post.category}
          </span>
          <span className="text-[10px] font-mono text-brandMuted">{post.date} · {post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-brandInk dark:text-white uppercase tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Cover image */}
        {post.image && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-brandSoft mb-8 border border-brandLine">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-sm sm:prose max-w-none text-brandMuted leading-relaxed space-y-4">
          {paragraphs.map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-black text-brandInk dark:text-white uppercase mt-8 mb-3">{line.slice(3)}</h2>;
            if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-black text-brandInk dark:text-white uppercase mt-8 mb-4">{line.slice(2)}</h1>;
            if (line.startsWith("### ")) return <h3 key={i} className="text-base font-bold text-brandInk dark:text-white mt-6 mb-2">{line.slice(4)}</h3>;
            return <p key={i} className="text-sm leading-relaxed text-brandMuted">{line}</p>;
          })}
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-mono bg-brandSoft border border-brandLine text-brandMuted">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
