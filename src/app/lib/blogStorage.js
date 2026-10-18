// src/app/lib/blogStorage.js
// Client-side localStorage persistence for dashboard-created blog posts.

const KEY = "mk_blog_posts";

export function getStoredPosts() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function savePost(post) {
  const posts = getStoredPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  if (idx >= 0) posts[idx] = post;
  else posts.unshift(post);
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export function updatePostStatus(id, status) {
  const posts = getStoredPosts().map((p) =>
    p.id === id ? { ...p, status } : p
  );
  localStorage.setItem(KEY, JSON.stringify(posts));
  return posts;
}

export function deletePost(id) {
  const posts = getStoredPosts().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(posts));
  return posts;
}

export function getPublishedPosts() {
  return getStoredPosts().filter((p) => p.status === "Published");
}
