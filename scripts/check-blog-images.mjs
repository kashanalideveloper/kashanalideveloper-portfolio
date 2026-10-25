// scripts/check-blog-images.mjs — verify every blog image path exists
import { readFileSync, existsSync } from "node:fs";
const src = readFileSync("src/app/lib/blog.js", "utf8");
const images = [...src.matchAll(/image:\s*["']([^"']+)["']/g)].map((m) => m[1]);
const uniq = [...new Set(images)];
const missing = uniq.filter((p) => !existsSync("public" + p));
console.log("unique images:", uniq.length);
if (missing.length) {
  console.log("MISSING:");
  missing.forEach((m) => console.log("  ", m));
} else {
  console.log("all image files exist ✓");
}
