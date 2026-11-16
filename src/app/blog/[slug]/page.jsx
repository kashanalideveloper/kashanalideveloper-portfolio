// src/app/blog/[slug]/page.jsx
import { ARTICLES } from "../../lib/blog";
import { blogMetadata } from "../../lib/seo";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { alternates: { canonical: `/blog/${slug}` } };
  }

  return blogMetadata({
    title: article.title,
    description: article.excerpt,
    slug: article.slug,
  });
}

export default function DynamicBlogPostPage() {
  return <BlogPostClient />;
}
