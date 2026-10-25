// src/app/Components/BlogCardImage.jsx
"use client";
import { useState } from "react";
import Image from "next/image";

// Client component: next/image event handlers (onError) can only be attached
// from Client Components, so the blog grid's image error fallback lives here.
export default function BlogCardImage({ src, alt, sizes, slug }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        data-fallback={slug}
        className="absolute inset-0 flex items-center justify-center bg-brandPrimary/5 flex-col gap-2 pointer-events-none"
      >
        <div className="w-12 h-12 rounded-lg bg-brandPrimary/20 border border-brandPrimary/30 flex items-center justify-center text-brandPrimary">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>
        </div>
        <span className="text-[10px] font-mono text-brandMuted/50 uppercase tracking-wider">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading="lazy"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      onError={() => setFailed(true)}
    />
  );
}
