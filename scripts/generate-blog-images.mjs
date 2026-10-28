// scripts/generate-blog-images.mjs
// Regenerates all blog banner SVGs (1200x630) with a consistent professional
// design system matching the site brand (cyan #0891b2 / ink #0f172a).
// Run: node scripts/generate-blog-images.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "blog");
mkdirSync(OUT, { recursive: true });

// ── Per-topic palettes & content ──────────
// Each entry: file, tag, title lines, subtitle, bg gradient stops, accent.
const T = [
  {
    file: "blog-webdev.svg",
    tag: "WEB DEVELOPMENT",
    l1: "Custom Web",
    l2: "Development",
    sub: "Next.js · React · TypeScript · APIs",
    bg: ["#0c2a3f", "#0891b2"],
    acc: ["#67e8f9", "#a5f3fc"],
  },
  {
    file: "blog-services.svg",
    tag: "SERVICES",
    l1: "Front-End",
    l2: "Development",
    sub: "Services in Pakistan",
    bg: ["#0b3a4a", "#0e7490"],
    acc: ["#67e8f9", "#a5f3fc"],
  },
  {
    file: "blog-services-isb.svg",
    tag: "SERVICES",
    l1: "Islamabad",
    l2: "Enterprise",
    sub: "Next.js · React · Modern Web Apps",
    bg: ["#082f49", "#0369a1"],
    acc: ["#7dd3fc", "#bae6fd"],
  },
  {
    file: "blog-services-khi.svg",
    tag: "SERVICES",
    l1: "Karachi",
    l2: "Scale Up",
    sub: "Web · Mobile · Digital Products",
    bg: ["#0c4a6e", "#0891b2"],
    acc: ["#38bdf8", "#7dd3fc"],
  },
  {
    file: "blog-nextjs.svg",
    tag: "NEXT.JS",
    l1: "Next.js",
    l2: "Framework",
    sub: "SSR · SSG · App Router · Full-Stack",
    bg: ["#0f172a", "#1e293b"],
    acc: ["#38bdf8", "#7dd3fc"],
  },
  {
    file: "blog-react.svg",
    tag: "REACT.JS",
    l1: "React.js",
    l2: "Development",
    sub: "SPA · Components · Hooks · State",
    bg: ["#082f49", "#0e7490"],
    acc: ["#22d3ee", "#67e8f9"],
  },
  {
    file: "blog-js-ts.svg",
    tag: "DEVELOPMENT",
    l1: "JS vs",
    l2: "TypeScript",
    sub: "Types · Safety · Scale · 2026",
    bg: ["#1c1917", "#1e3a5f"],
    acc: ["#fbbf24", "#60a5fa"],
  },
  {
    file: "blog-html-css.svg",
    tag: "WEB DEV",
    l1: "HTML",
    l2: "vs CSS",
    sub: "Structure · Style · Foundation",
    bg: ["#431407", "#0c2a3f"],
    acc: ["#fb923c", "#60a5fa"],
  },
  {
    file: "blog-css-fw.svg",
    tag: "UI/UX",
    l1: "Bootstrap",
    l2: "vs Tailwind",
    sub: "Utility · Components · CSS Scale",
    bg: ["#500724", "#0e7490"],
    acc: ["#a78bfa", "#22d3ee"],
  },
  {
    file: "blog-wordpress.svg",
    tag: "WORDPRESS",
    l1: "WordPress",
    l2: "Development",
    sub: "CMS · WooCommerce · Custom Themes",
    bg: ["#0c2a5f", "#1d4ed8"],
    acc: ["#93c5fd", "#bfdbfe"],
  },
  {
    file: "blog-wp-custom.svg",
    tag: "WORDPRESS",
    l1: "WP vs",
    l2: "Custom",
    sub: "Flexibility · Speed · Ownership",
    bg: ["#0c2a5f", "#1e40af"],
    acc: ["#60a5fa", "#93c5fd"],
  },
  {
    file: "blog-uiux.svg",
    tag: "UI/UX",
    l1: "UI/UX",
    l2: "Design",
    sub: "Wireframes · Design Systems · Figma",
    bg: ["#4c0519", "#9d174d"],
    acc: ["#f9a8d4", "#fbcfe8"],
  },
  {
    file: "blog-mobile.svg",
    tag: "UI/UX",
    l1: "Mobile",
    l2: "Responsive",
    sub: "Flexbox · Grid · 60% Mobile Traffic",
    bg: ["#500724", "#be185d"],
    acc: ["#f9a8d4", "#fbcfe8"],
  },
  {
    file: "blog-performance.svg",
    tag: "PERFORMANCE",
    l1: "Web Speed",
    l2: "Optimization",
    sub: "Core Web Vitals · LCP · CLS · FID",
    bg: ["#451a03", "#92400e"],
    acc: ["#fbbf24", "#fde68a"],
  },
  {
    file: "blog-seo.svg",
    tag: "SEO",
    l1: "SEO & Speed",
    l2: "Optimization",
    sub: "Rankings · Core Web Vitals · Traffic",
    bg: ["#082f49", "#075985"],
    acc: ["#38bdf8", "#7dd3fc"],
  },
  {
    file: "blog-ai.svg",
    tag: "AI",
    l1: "AI",
    l2: "Development",
    sub: "LLMs · Machine Learning · APIs",
    bg: ["#2e1065", "#6b21a8"],
    acc: ["#c084fc", "#e879f9"],
  },
  {
    file: "blog-ai-learn.svg",
    tag: "AI",
    l1: "Become",
    l2: "AI Dev",
    sub: "Python · LLMs · APIs · 2026 Guide",
    bg: ["#3b0764", "#7e22ce"],
    acc: ["#c084fc", "#d8b4fe"],
  },
  {
    file: "blog-backend.svg",
    tag: "BACKEND",
    l1: "Node.js &",
    l2: "Backend Dev",
    sub: "APIs · Databases · Scalable Services",
    bg: ["#052e16", "#166534"],
    acc: ["#4ade80", "#86efac"],
  },
  {
    file: "blog-nodejs.svg",
    tag: "BACKEND",
    l1: "Node.js",
    l2: "Backend",
    sub: "APIs · Real-time · Scalable Services",
    bg: ["#052e16", "#15803d"],
    acc: ["#4ade80", "#86efac"],
  },
  {
    file: "blog-career.svg",
    tag: "CAREER",
    l1: "Developer",
    l2: "Career Path",
    sub: "Roadmap · Skills · Growth",
    bg: ["#1e1b4b", "#4338ca"],
    acc: ["#a5b4fc", "#c7d2fe"],
  },
  {
    file: "blog-developer.svg",
    tag: "CAREER",
    l1: "Top",
    l2: "Developers",
    sub: "Skills · Mindset · Mastery",
    bg: ["#1e1b4b", "#4f46e5"],
    acc: ["#a5b4fc", "#c7d2fe"],
  },
  {
    file: "blog-projects.svg",
    tag: "CAREER",
    l1: "Dev",
    l2: "Projects",
    sub: "Build · Ship · Impress Recruiters",
    bg: ["#1e1b4b", "#4338ca"],
    acc: ["#818cf8", "#a5b4fc"],
  },
  {
    file: "blog-portfolio.svg",
    tag: "PORTFOLIO",
    l1: "Developer",
    l2: "Portfolio",
    sub: "Templates · Examples · Projects",
    bg: ["#042f2e", "#0f766e"],
    acc: ["#2dd4bf", "#5eead4"],
  },
  {
    file: "blog-interview.svg",
    tag: "INTERVIEWS",
    l1: "Interview",
    l2: "Questions",
    sub: "HTML · CSS · JavaScript · React",
    bg: ["#4c0519", "#be123c"],
    acc: ["#fda4af", "#fecdd3"],
  },
  {
    file: "blog-interview-exp.svg",
    tag: "INTERVIEWS",
    l1: "Senior",
    l2: "Interview",
    sub: "Architecture · React · System Design",
    bg: ["#450a0a", "#be123c"],
    acc: ["#fca5a5", "#fda4af"],
  },
  {
    file: "blog-hiring.svg",
    tag: "HIRING",
    l1: "Hiring a",
    l2: "Developer",
    sub: "Evaluate · Budget · Manage",
    bg: ["#022c22", "#065f46"],
    acc: ["#34d399", "#6ee7b7"],
  },
  {
    file: "blog-ecommerce.svg",
    tag: "WEB DEV",
    l1: "E-Commerce",
    l2: "Dev",
    sub: "Products · Cart · Checkout · Revenue",
    bg: ["#082f49", "#1d4ed8"],
    acc: ["#34d399", "#60a5fa"],
  },
  {
    file: "blog-maintenance.svg",
    tag: "WEB DEV",
    l1: "Website",
    l2: "Maintenance",
    sub: "Updates · Security · Backups",
    bg: ["#0c2a3f", "#1e40af"],
    acc: ["#60a5fa", "#93c5fd"],
  },
];

// ── Unique professional icon per topic (drawn inside a 120x120 glass tile) ─
const ICONS = {
  "blog-webdev.svg": `
    <rect x="14" y="18" width="92" height="64" rx="8" fill="none" stroke="#fff" stroke-width="2.5" opacity="0.65"/>
    <rect x="14" y="18" width="92" height="16" rx="8" fill="#fff" opacity="0.14"/>
    <circle cx="26" cy="26" r="3" fill="#f871"/><circle cx="37" cy="26" r="3" fill="#fbbf24"/><circle cx="48" cy="26" r="3" fill="#34d399"/>
    <path d="M40 46 L28 58 L40 70" stroke="ACCENT" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M80 46 L92 58 L80 70" stroke="ACCENT" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <line x1="66" y1="46" x2="54" y2="70" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>`,
  "blog-services.svg": `
    <path d="M34 44 L56 22 L58 40 L80 40 L58 62 L56 44 Z" fill="ACCENT" opacity="0.9"/>
    <rect x="26" y="72" width="68" height="10" rx="5" fill="#fff" opacity="0.35"/>
    <rect x="26" y="90" width="44" height="10" rx="5" fill="#fff" opacity="0.2"/>`,
  "blog-services-isb.svg": `
    <rect x="22" y="52" width="20" height="48" rx="3" fill="#fff" opacity="0.5"/>
    <rect x="50" y="34" width="20" height="66" rx="3" fill="ACCENT" opacity="0.9"/>
    <rect x="78" y="62" width="20" height="38" rx="3" fill="#fff" opacity="0.4"/>
    <line x1="16" y1="100" x2="104" y2="100" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.5"/>`,
  "blog-services-khi.svg": `
    <path d="M20 92 Q36 68 52 80 Q68 92 84 62 Q96 42 102 52" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    <path d="M20 92 Q36 68 52 80 Q68 92 84 62 Q96 42 102 52 L102 102 L20 102 Z" fill="ACCENT" opacity="0.35"/>
    <circle cx="52" cy="80" r="5" fill="#fff"/><circle cx="84" cy="62" r="5" fill="ACCENT"/>`,
  "blog-nextjs.svg": `
    <text x="60" y="88" font-family="'Inter','Segoe UI',sans-serif" font-size="66" font-weight="900" fill="#fff" text-anchor="middle">N</text>
    <line x1="34" y1="92" x2="86" y2="24" stroke="ACCENT" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`,
  "blog-react.svg": `
    <circle cx="60" cy="60" r="10" fill="ACCENT"/>
    <ellipse cx="60" cy="60" rx="44" ry="17" fill="none" stroke="ACCENT" stroke-width="3" opacity="0.85"/>
    <ellipse cx="60" cy="60" rx="44" ry="17" fill="none" stroke="ACCENT" stroke-width="3" opacity="0.85" transform="rotate(60 60 60)"/>
    <ellipse cx="60" cy="60" rx="44" ry="17" fill="none" stroke="ACCENT" stroke-width="3" opacity="0.85" transform="rotate(120 60 60)"/>`,
  "blog-js-ts.svg": `
    <rect x="14" y="24" width="42" height="72" rx="8" fill="#fbbf24" opacity="0.28"/>
    <text x="35" y="68" font-family="'Inter',sans-serif" font-size="22" font-weight="800" fill="#fbbf24" text-anchor="middle">JS</text>
    <rect x="64" y="24" width="42" height="72" rx="8" fill="#3b82f6" opacity="0.32"/>
    <text x="85" y="68" font-family="'Inter',sans-serif" font-size="22" font-weight="800" fill="#93c5fd" text-anchor="middle">TS</text>`,
  "blog-html-css.svg": `
    <text x="36" y="62" font-family="monospace" font-size="19" font-weight="700" fill="#fb923c" text-anchor="middle">&lt;&gt;</text>
    <text x="36" y="86" font-family="monospace" font-size="11" fill="#fb923c" text-anchor="middle" opacity="0.7">HTML</text>
    <text x="84" y="62" font-family="monospace" font-size="19" font-weight="700" fill="#60a5fa" text-anchor="middle">{ }</text>
    <text x="84" y="86" font-family="monospace" font-size="11" fill="#60a5fa" text-anchor="middle" opacity="0.7">CSS</text>`,
  "blog-css-fw.svg": `
    <rect x="18" y="22" width="84" height="18" rx="5" fill="#a78bfa" opacity="0.55"/>
    <rect x="18" y="48" width="60" height="12" rx="4" fill="#fff" opacity="0.28"/>
    <rect x="18" y="68" width="72" height="12" rx="4" fill="#22d3ee" opacity="0.35"/>
    <rect x="18" y="88" width="48" height="12" rx="4" fill="#fff" opacity="0.18"/>`,
  "blog-wordpress.svg": `
    <circle cx="60" cy="60" r="38" fill="none" stroke="#fff" stroke-width="3" opacity="0.75"/>
    <text x="60" y="74" font-family="Georgia,serif" font-size="40" font-weight="900" fill="#fff" text-anchor="middle" opacity="0.9">W</text>`,
  "blog-wp-custom.svg": `
    <rect x="14" y="28" width="40" height="64" rx="8" fill="#fff" opacity="0.25"/>
    <text x="34" y="68" font-family="monospace" font-size="19" font-weight="700" fill="#fff" text-anchor="middle" opacity="0.8">W</text>
    <line x1="58" y1="60" x2="66" y2="60" stroke="ACCENT" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="70" y="28" width="40" height="64" rx="8" fill="ACCENT" opacity="0.3"/>
    <text x="90" y="68" font-family="monospace" font-size="16" font-weight="700" fill="#fff" text-anchor="middle" opacity="0.85">&lt;/&gt;</text>`,
  "blog-uiux.svg": `
    <path d="M30 92 L78 28 L94 44 L46 108 Z" fill="#fff" opacity="0.45"/>
    <path d="M78 28 L94 44 L89 49 L73 33 Z" fill="ACCENT" opacity="0.95"/>
    <circle cx="88" cy="86" r="11" fill="ACCENT" opacity="0.8"/>
    <circle cx="70" cy="94" r="8" fill="#60a5fa" opacity="0.7"/>
    <circle cx="98" cy="100" r="6" fill="#fbbf24" opacity="0.7"/>`,
  "blog-mobile.svg": `
    <rect x="36" y="14" width="48" height="92" rx="10" fill="#fff" opacity="0.16"/>
    <rect x="36" y="14" width="48" height="92" rx="10" fill="none" stroke="ACCENT" stroke-width="2" opacity="0.7"/>
    <rect x="46" y="30" width="28" height="36" rx="4" fill="ACCENT" opacity="0.3"/>
    <rect x="46" y="74" width="28" height="7" rx="3.5" fill="#fff" opacity="0.28"/>
    <rect x="46" y="87" width="18" height="7" rx="3.5" fill="#fff" opacity="0.16"/>`,
  "blog-performance.svg": `
    <path d="M18 88 A44 44 0 0 1 102 88" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.22"/>
    <path d="M18 88 A44 44 0 0 1 96 66" fill="none" stroke="ACCENT" stroke-width="10" stroke-linecap="round"/>
    <text x="60" y="82" font-family="'Inter',sans-serif" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">95</text>`,
  "blog-seo.svg": `
    <circle cx="52" cy="52" r="28" fill="none" stroke="#fff" stroke-width="4" opacity="0.7"/>
    <line x1="73" y1="73" x2="98" y2="98" stroke="ACCENT" stroke-width="6" stroke-linecap="round"/>
    <line x1="40" y1="52" x2="64" y2="52" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>
    <line x1="52" y1="40" x2="52" y2="64" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>`,
  "blog-ai.svg": `
    <circle cx="60" cy="60" r="13" fill="ACCENT"/>
    <circle cx="24" cy="32" r="7" fill="#fff" opacity="0.5"/>
    <circle cx="96" cy="32" r="7" fill="#fff" opacity="0.5"/>
    <circle cx="24" cy="88" r="7" fill="#fff" opacity="0.5"/>
    <circle cx="96" cy="88" r="7" fill="#fff" opacity="0.5"/>
    <line x1="24" y1="32" x2="60" y2="60" stroke="ACCENT" stroke-width="2" opacity="0.7"/>
    <line x1="96" y1="32" x2="60" y2="60" stroke="ACCENT" stroke-width="2" opacity="0.7"/>
    <line x1="24" y1="88" x2="60" y2="60" stroke="ACCENT" stroke-width="2" opacity="0.7"/>
    <line x1="96" y1="88" x2="60" y2="60" stroke="ACCENT" stroke-width="2" opacity="0.7"/>`,
  "blog-ai-learn.svg": `
    <circle cx="60" cy="60" r="19" fill="none" stroke="ACCENT" stroke-width="3" opacity="0.85"/>
    <circle cx="60" cy="60" r="9" fill="ACCENT" opacity="0.45"/>
    <circle cx="60" cy="60" r="3.5" fill="#fff"/>
    <path d="M60 18 L60 36 M33 30 L48 44 M87 30 L72 44 M22 60 L40 60 M80 60 L98 60 M33 90 L48 76 M87 90 L72 76 M60 84 L60 102" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>`,
  "blog-backend.svg": `
    <rect x="16" y="20" width="88" height="24" rx="6" fill="none" stroke="#fff" stroke-width="2" opacity="0.65"/>
    <circle cx="96" cy="32" r="4.5" fill="ACCENT"/>
    <rect x="16" y="52" width="88" height="24" rx="6" fill="none" stroke="#fff" stroke-width="2" opacity="0.65"/>
    <circle cx="96" cy="64" r="4.5" fill="ACCENT"/>
    <rect x="16" y="84" width="88" height="24" rx="6" fill="none" stroke="#fff" stroke-width="2" opacity="0.45"/>
    <circle cx="96" cy="96" r="4.5" fill="#fff" opacity="0.3"/>`,
  "blog-nodejs.svg": `
    <text x="60" y="74" font-family="'Inter',sans-serif" font-size="42" font-weight="800" fill="ACCENT" text-anchor="middle" opacity="0.95">JS</text>
    <path d="M30 86 A38 38 0 0 0 90 86" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.5"/>`,
  "blog-career.svg": `
    <rect x="18" y="86" width="84" height="18" rx="4" fill="#fff" opacity="0.4"/>
    <rect x="30" y="64" width="60" height="18" rx="4" fill="#fff" opacity="0.6"/>
    <rect x="42" y="42" width="36" height="18" rx="4" fill="#fff" opacity="0.8"/>
    <rect x="52" y="20" width="16" height="18" rx="4" fill="ACCENT"/>`,
  "blog-developer.svg": `
    <polygon points="60,14 71,44 103,44 77,63 87,94 60,75 33,94 43,63 17,44 49,44" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round" opacity="0.7"/>
    <polygon points="60,26 68,50 92,50 73,64 80,88 60,74 40,88 47,64 28,50 52,50" fill="ACCENT" opacity="0.5"/>`,
  "blog-projects.svg": `
    <rect x="18" y="18" width="38" height="38" rx="7" fill="#fff" opacity="0.35"/>
    <rect x="64" y="18" width="38" height="38" rx="7" fill="ACCENT" opacity="0.7"/>
    <rect x="18" y="64" width="38" height="38" rx="7" fill="ACCENT" opacity="0.5"/>
    <rect x="64" y="64" width="38" height="38" rx="7" fill="#fff" opacity="0.25"/>`,
  "blog-portfolio.svg": `
    <rect x="16" y="16" width="40" height="40" rx="7" fill="#fff" opacity="0.25"/>
    <rect x="64" y="16" width="40" height="40" rx="7" fill="#fff" opacity="0.25"/>
    <rect x="16" y="64" width="40" height="40" rx="7" fill="#fff" opacity="0.25"/>
    <rect x="64" y="64" width="40" height="40" rx="7" fill="ACCENT" opacity="0.5"/>`,
  "blog-interview.svg": `
    <rect x="16" y="16" width="88" height="38" rx="8" fill="#fff" opacity="0.14" stroke="#fff" stroke-width="1.5" opacity="0.4"/>
    <text x="60" y="41" font-family="monospace" font-size="17" font-weight="700" fill="#fff" text-anchor="middle">Q.</text>
    <rect x="20" y="64" width="80" height="42" rx="8" fill="#fff" opacity="0.1" stroke="ACCENT" stroke-width="1.5" opacity="0.5"/>
    <text x="60" y="92" font-family="monospace" font-size="17" font-weight="700" fill="ACCENT" text-anchor="middle">A.</text>`,
  "blog-interview-exp.svg": `
    <rect x="16" y="24" width="76" height="56" rx="8" fill="#fff" opacity="0.12" stroke="ACCENT" stroke-width="1.5" opacity="0.55"/>
    <rect x="26" y="36" width="52" height="7" rx="3.5" fill="#fff" opacity="0.5"/>
    <rect x="26" y="50" width="36" height="6" rx="3" fill="#fff" opacity="0.3"/>
    <rect x="26" y="62" width="44" height="6" rx="3" fill="#fff" opacity="0.3"/>
    <circle cx="92" cy="88" r="16" fill="ACCENT" opacity="0.25"/>
    <text x="92" y="94" font-family="monospace" font-size="15" fill="#fff" text-anchor="middle" opacity="0.85">★</text>`,
  "blog-hiring.svg": `
    <circle cx="56" cy="34" r="16" fill="none" stroke="#fff" stroke-width="3" opacity="0.75"/>
    <path d="M24 90 Q24 62 56 62 Q88 62 88 90" fill="none" stroke="#fff" stroke-width="3" opacity="0.75"/>
    <path d="M46 96 L56 106 L76 82" stroke="ACCENT" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  "blog-ecommerce.svg": `
    <path d="M18 32 L28 32 L38 76 L90 76 L98 48 L36 48" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
    <circle cx="52" cy="92" r="7" fill="ACCENT" opacity="0.85"/>
    <circle cx="78" cy="92" r="7" fill="ACCENT" opacity="0.85"/>
    <path d="M56 54 L66 64 L82 42" stroke="ACCENT" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.95" fill="none"/>`,
  "blog-maintenance.svg": `
    <path d="M60 34 A26 26 0 1 0 86 60" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="0.35"/>
    <circle cx="60" cy="60" r="9" fill="ACCENT" opacity="0.85"/>
    <path d="M78 78 L100 100" stroke="ACCENT" stroke-width="7" stroke-linecap="round" opacity="0.85"/>
    <line x1="60" y1="24" x2="60" y2="14" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity="0.5"/>
    <line x1="24" y1="60" x2="14" y2="60" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity="0.5"/>`,
};

// ── SVG template ───────────
function svg(t) {
  const icon = (ICONS[t.file] || "").replaceAll("ACCENT", t.acc[0]);
  const tagW = Math.max(t.tag.length * 9 + 36, 64);
  const [c1, c2] = t.bg;
  const [a1, a2] = t.acc;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${t.l1} ${t.l2}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${a1}"/>
      <stop offset="100%" stop-color="${a2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${a1}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${a1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="80%" r="60%">
      <stop offset="0%" stop-color="${c2}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- subtle grid -->
  <g stroke="rgba(255,255,255,0.05)" stroke-width="1">
    <line x1="0" y1="126" x2="1200" y2="126"/><line x1="0" y1="252" x2="1200" y2="252"/>
    <line x1="0" y1="378" x2="1200" y2="378"/><line x1="0" y1="504" x2="1200" y2="504"/>
    <line x1="150" y1="0" x2="150" y2="630"/><line x1="300" y1="0" x2="300" y2="630"/>
    <line x1="450" y1="0" x2="450" y2="630"/><line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="750" y1="0" x2="750" y2="630"/><line x1="900" y1="0" x2="900" y2="630"/>
    <line x1="1050" y1="0" x2="1050" y2="630"/>
  </g>

  <!-- decorative rings -->
  <circle cx="1060" cy="80" r="180" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
  <circle cx="1060" cy="80" r="120" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5"/>

  <!-- accent spine -->
  <rect x="0" y="0" width="6" height="630" fill="url(#acc)"/>

  <!-- icon tile -->
  <g transform="translate(160, 150)">
    <rect width="132" height="132" rx="28" fill="rgba(255,255,255,0.12)"/>
    <rect x="1.5" y="1.5" width="129" height="129" rx="26.5" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
    <rect x="6" y="6" width="120" height="120" rx="22" fill="${a1}" opacity="0.10"/>
    <g transform="translate(6, 6)">${icon}</g>
  </g>

  <!-- tag pill -->
  <rect x="160" y="330" width="${tagW}" height="30" rx="15" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
  <text x="${160 + tagW / 2}" y="350" font-family="'JetBrains Mono','Consolas',monospace" font-size="11.5" fill="${a1}" text-anchor="middle" letter-spacing="2.5" font-weight="700">${t.tag}</text>

  <!-- title -->
  <text x="160" y="416" font-family="'Poppins','Inter','Segoe UI',sans-serif" font-size="58" font-weight="800" fill="#ffffff" letter-spacing="-1.5">${t.l1}</text>
  <text x="160" y="486" font-family="'Poppins','Inter','Segoe UI',sans-serif" font-size="58" font-weight="800" fill="url(#acc)" letter-spacing="-1.5">${t.l2}</text>

  <!-- subtitle -->
  <line x1="160" y1="518" x2="${160 + 56}" y2="518" stroke="${a1}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <text x="232" y="526" font-family="'Poppins','Inter','Segoe UI',sans-serif" font-size="22" font-weight="400" fill="rgba(255,255,255,0.72)" letter-spacing="0.5">${t.sub}</text>

  <!-- footer brand -->
  <g transform="translate(160, 585)">
    <circle cx="8" cy="-4" r="4" fill="${a1}" opacity="0.9"/>
    <text x="22" y="0" font-family="'JetBrains Mono','Consolas',monospace" font-size="13" fill="rgba(255,255,255,0.42)" letter-spacing="1.5">malikkashan.dev</text>
  </g>
</svg>
`;
}

for (const t of T) {
  writeFileSync(join(OUT, t.file), svg(t), "utf8");
  console.log("✓", t.file);
}
console.log(`\nDone — ${T.length} banners regenerated in public/blog`);
