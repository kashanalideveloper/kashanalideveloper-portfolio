"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../Components/Logo";
import emailjs from "@emailjs/browser";
import { useAuth } from "../Components/AuthContext";
import InquiriesView from "./components/InquiriesView";
import ProjectsView from "./components/ProjectsView";
import BlogView from "./components/BlogView";
import ServicesView from "./components/ServicesView";
import SkillsView from "./components/SkillsView";
import TestimonialsView from "./components/TestimonialsView";

/* ─── EmailJS config ─── */
const EJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  replyTemplateId: process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

/* ─── date helpers ─── */
const TODAY = new Date();
const fmt = (d, opts = { month: "short", day: "numeric" }) =>
  d.toLocaleDateString("en-PK", opts);
const daysAgo = (n) => { const d = new Date(TODAY); d.setDate(d.getDate() - n); return fmt(d); };
const daysFromNow = (n) => { const d = new Date(TODAY); d.setDate(d.getDate() + n); return fmt(d); };
const weekLabel = () => {
  const mon = new Date(TODAY); mon.setDate(TODAY.getDate() - TODAY.getDay() + 1);
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
  return `${fmt(mon)} – ${fmt(sun, { month: "short", day: "numeric", year: "numeric" })}`;
};
const monthsAgo = (n) => {
  const d = new Date(TODAY); d.setMonth(d.getMonth() - n);
  return d.toLocaleDateString("en-PK", { month: "short", year: "numeric" });
};

/* ─── mock data ─── */
const KPI = [
  {
    label: "New Inquiries",
    value: "24",
    change: "+8 this week",
    up: true,
    color: "brandPrimary",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Active Projects",
    value: "6",
    change: "+2 this month",
    up: true,
    color: "emerald",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Blog Articles",
    value: "40",
    change: "+8 this month",
    up: true,
    color: "violet",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Registered Users",
    value: "12",
    change: "+3 this week",
    up: true,
    color: "amber",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const KPI_COLOR = {
  brandPrimary: { bg: "bg-brandPrimary/10", text: "text-brandPrimary", ring: "ring-brandPrimary/20" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-200 dark:ring-emerald-800" },
  violet: { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-600 dark:text-violet-400", ring: "ring-violet-200 dark:ring-violet-800" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", ring: "ring-amber-200 dark:ring-amber-800" },
};

const INQUIRIES = [
  { name: "Ahmed Siddiqui", service: "E-Commerce Store", date: daysAgo(3), status: "New", budget: "Rs 180k" },
  { name: "Sara Khan", service: "Next.js Portfolio", date: daysAgo(4), status: "Replied", budget: "Rs 90k" },
  { name: "Usman Tariq", service: "WordPress Site", date: daysAgo(5), status: "In Progress", budget: "Rs 60k" },
  { name: "Fatima Malik", service: "Web Redesign", date: daysAgo(6), status: "Closed", budget: "Rs 120k" },
  { name: "Bilal Hassan", service: "React Dashboard", date: daysAgo(7), status: "New", budget: "Rs 200k" },
];

const STATUS_STYLE = {
  New: "bg-brandPrimary/10 text-brandPrimary",
  Replied: "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  "In Progress": "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-500",
  Closed: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
};

const INITIAL_USERS = [
  { id: 1, name: "Ahmed Siddiqui", email: "ahmed@mail.com", role: "Client", joined: daysAgo(3), avatar: "AS" },
  { id: 2, name: "Sara Khan", email: "sara@mail.com", role: "Client", joined: daysAgo(4), avatar: "SK" },
  { id: 3, name: "Usman Tariq", email: "usman@mail.com", role: "Client", joined: daysAgo(5), avatar: "UT" },
  { id: 4, name: "Fatima Malik", email: "fatima@mail.com", role: "Client", joined: daysAgo(6), avatar: "FM" },
  { id: 5, name: "Admin User", email: "admin@malikkashan.com", role: "Admin", joined: fmt(new Date(TODAY.getFullYear(), 0, 1)), avatar: "AU" },
  { id: 6, name: "Malik Kashan", email: "malik@malikkashan.com", role: "Admin", joined: fmt(new Date(TODAY.getFullYear(), 0, 1)), avatar: "MK" },
];

const ROLE_BADGE = {
  Client: "bg-brandPrimary/10 text-brandPrimary",
  Admin: "bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
};

const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      { id: "overview",      label: "Overview",      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
      { id: "inquiries",     label: "Inquiries",     icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, badge: "5" },
      { id: "messages",      label: "Messages",      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, badge: "3" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { id: "projects",      label: "Projects",      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
      { id: "services",      label: "Services",      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
      { id: "skills",        label: "Skills",        icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
      { id: "testimonials",  label: "Testimonials",  icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8M8 14h5"/></svg> },
      { id: "blog",          label: "Blog",          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    ],
  },
  {
    label: "Admin",
    items: [
      { id: "users",         label: "Users",         icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
      { id: "analytics",     label: "Analytics",     icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
      { id: "reports",       label: "Reports",       icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
      { id: "settings",      label: "Settings",      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 1 0 4.93 19.07"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg> },
    ],
  },
];
const NAV = NAV_GROUPS.flatMap((g) => g.items);

const INITIAL_PROJECTS = [
  { id: 1, name: "Zara E-Commerce Store", client: "Ahmed Siddiqui", status: "In Progress", progress: 65, budget: "Rs 1.8L", deadline: daysFromNow(29), tech: "Shopify" },
  { id: 2, name: "Portfolio — Next.js", client: "Sara Khan", status: "Review", progress: 90, budget: "Rs 90k", deadline: daysFromNow(8), tech: "Next.js" },
  { id: 3, name: "Corporate WordPress", client: "Usman Tariq", status: "Completed", progress: 100, budget: "Rs 60k", deadline: daysAgo(7), tech: "WordPress" },
  { id: 4, name: "Clothing Brand Landing", client: "Fatima Malik", status: "In Progress", progress: 40, budget: "Rs 1.2L", deadline: daysFromNow(45), tech: "React" },
  { id: 5, name: "React Admin Dashboard", client: "Bilal Hassan", status: "Planning", progress: 10, budget: "Rs 2.0L", deadline: daysFromNow(64), tech: "React" },
  { id: 6, name: "Bakery Website", client: "Nadia Asif", status: "Completed", progress: 100, budget: "Rs 45k", deadline: daysAgo(17), tech: "WordPress" },
];

const PROJ_STATUS_STYLE = {
  Planning:    "bg-slate-100 dark:bg-slate-800 text-brandMuted",
  "In Progress": "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  Review:      "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  Completed:   "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
};

const INITIAL_POSTS = [
  { id: 1, title: "How to Build a Next.js Portfolio", views: 1240, status: "Published", date: daysAgo(5), slug: "nextjs-portfolio-website" },
  { id: 2, title: "Laravel vs WordPress: Which to Choose?", views: 980, status: "Published", date: daysAgo(9), slug: "laravel-vs-wordpress" },
  { id: 3, title: "E-Commerce Website Development Guide", views: 760, status: "Published", date: daysAgo(12), slug: "ecommerce-website-development" },
  { id: 4, title: `Web Development Cost in Pakistan ${TODAY.getFullYear()}`, views: 2100, status: "Published", date: daysAgo(19), slug: "web-development-cost-pakistan" },
  { id: 5, title: "SEO-Friendly Website Design Tips", views: 0, status: "Draft", date: daysAgo(1), slug: "seo-friendly-website-design" },
  { id: 6, title: "Hire Freelance Web Developer in Pakistan", views: 540, status: "Published", date: daysAgo(27), slug: "hire-freelance-web-developer" },
];

const INITIAL_MESSAGES = [
  { id: 1, name: "Ahmed Siddiqui", email: "ahmed@mail.com", avatar: "AS", subject: "Project Update", preview: "Can we schedule a call to discuss the homepage layout?", time: "2 min ago", unread: true, thread: [
    { from: "client", text: "Hi Malik! I wanted to check in on the project progress.", time: `${daysAgo(1)}, 3:00 PM` },
    { from: "me", text: "Hey Ahmed! We're at 65% — homepage and product pages are done, working on checkout now.", time: `${daysAgo(1)}, 4:12 PM` },
    { from: "client", text: "Great! Can we schedule a call to discuss the homepage layout?", time: "Today, 2 min ago" },
  ]},
  { id: 2, name: "Sara Khan", email: "sara@mail.com", avatar: "SK", subject: "Portfolio Review", preview: "I love the design! Just one small change on the hero.", time: "1 hr ago", unread: true, thread: [
    { from: "client", text: `Hi Malik, I reviewed the portfolio build — looks absolutely amazing! Just one small change on the hero section. Can you shift the CTA button slightly to the right?`, time: "Today, 1 hr ago" },
  ]},
  { id: 3, name: "Bilal Hassan", email: "bilal@mail.com", avatar: "BH", subject: "Dashboard Project", preview: "When can we start? I've sent over the requirements doc.", time: "3 hrs ago", unread: true, thread: [
    { from: "client", text: "Hello Malik, I've sent over the requirements document to your email. When can we start on the React Dashboard?", time: "Today, 3 hrs ago" },
  ]},
  { id: 4, name: "Fatima Malik", email: "fatima@mail.com", avatar: "FM", subject: "Invoice Query", preview: "Received the invoice. Will pay by end of week.", time: daysAgo(1), unread: false, thread: [
    { from: "me", text: "Hi Fatima, please find the invoice attached for milestone 2 (landing page completion). Total: Rs 60k.", time: `${daysAgo(2)}, 11:00 AM` },
    { from: "client", text: "Received the invoice, thank you! Will transfer by end of this week.", time: `${daysAgo(1)}, 2:30 PM` },
  ]},
];

const WEEKLY_VISITORS = [42, 68, 55, 91, 73, 110, 88];
const WEEKLY_DAYS = (() => {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const todayIdx = (TODAY.getDay() + 6) % 7; // Mon=0
  return days.map((d, i) => i === todayIdx ? `${d}*` : d);
})();

const NOTIFICATIONS = [
  { id: 1, type: "inquiry", text: "New inquiry from Bilal Hassan — React Dashboard (Rs 2.0L)", time: "2 min ago", unread: true },
  { id: 2, type: "user", text: "Sara Khan registered as a new client", time: "1 hr ago", unread: true },
  { id: 3, type: "inquiry", text: "Ahmed Siddiqui replied to your project update message", time: "3 hrs ago", unread: true },
  { id: 4, type: "project", text: `Zara E-Commerce reached 65% — milestone payment due`, time: daysAgo(1), unread: false },
  { id: 5, type: "system", text: `Weekly report generated — ${monthsAgo(0)}`, time: daysAgo(2), unread: false },
];

const NOTIF_ICON = {
  inquiry: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  user: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  project: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  system: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93A10 10 0 1 0 4.93 19.07" /></svg>,
};

const INITIAL_SERVICES = [
  { id: 1, title: "Next.js / React Website", desc: "Fast, SEO-ready websites built with Next.js and React. Perfect for portfolios, SaaS, and agencies.", price: "Rs 80k–2L", delivery: "7–21 days", active: true, icon: "⚡" },
  { id: 2, title: "Shopify E-Commerce Store", desc: "Complete Shopify stores with custom theme, product setup, payment gateway, and order management.", price: "Rs 1.2L–3L", delivery: "10–25 days", active: true, icon: "🛒" },
  { id: 3, title: "WordPress Development", desc: "Business websites and blogs on WordPress with custom theme, plugins, and on-page SEO.", price: "Rs 50k–1.5L", delivery: "5–15 days", active: true, icon: "🌐" },
  { id: 4, title: "Laravel Backend / API", desc: "Custom Laravel backends, REST APIs, admin panels, and database-driven web apps.", price: "Rs 1.5L–5L", delivery: "15–45 days", active: true, icon: "🔧" },
  { id: 5, title: "Website Redesign", desc: "Modernize an outdated website — improved UI, performance, and mobile responsiveness.", price: "Rs 60k–1.8L", delivery: "7–20 days", active: true, icon: "🎨" },
  { id: 6, title: "SEO Optimization", desc: "Technical SEO audit, on-page fixes, schema markup, and Core Web Vitals optimization.", price: "Rs 25k–80k", delivery: "3–7 days", active: false, icon: "📈" },
];

const INITIAL_SKILLS = [
  { id: 1, name: "Next.js", level: 95, category: "Frontend" },
  { id: 2, name: "React", level: 92, category: "Frontend" },
  { id: 3, name: "Tailwind CSS", level: 96, category: "Frontend" },
  { id: 4, name: "TypeScript", level: 78, category: "Frontend" },
  { id: 5, name: "Laravel", level: 80, category: "Backend" },
  { id: 6, name: "PHP", level: 82, category: "Backend" },
  { id: 7, name: "MySQL", level: 75, category: "Backend" },
  { id: 8, name: "REST APIs", level: 85, category: "Backend" },
  { id: 9, name: "Shopify", level: 90, category: "CMS/Platform" },
  { id: 10, name: "WordPress", level: 88, category: "CMS/Platform" },
  { id: 11, name: "Git / GitHub", level: 88, category: "Tools" },
  { id: 12, name: "Vercel / Netlify", level: 90, category: "Tools" },
];

const INITIAL_TESTIMONIALS = [
  { id: 1, name: "Ahmed Siddiqui", role: "E-Commerce Owner", avatar: "AS", rating: 5, text: "Malik built our Shopify store from scratch. Delivery was on time and the design was better than what we imagined. Highly recommend!", date: daysAgo(12), approved: true },
  { id: 2, name: "Sara Khan", role: "Freelance Designer", avatar: "SK", rating: 5, text: "My Next.js portfolio looks absolutely professional. The performance score is 98 on Lighthouse. Malik knows his stuff!", date: daysAgo(18), approved: true },
  { id: 3, name: "Bilal Hassan", role: "SaaS Founder", avatar: "BH", rating: 5, text: "We hired Malik for a React dashboard project. Clean code, great communication, and delivered before deadline.", date: daysAgo(25), approved: true },
  { id: 4, name: "Fatima Malik", role: "Boutique Owner", avatar: "FM", rating: 4, text: "The landing page Malik designed for our clothing brand increased our WhatsApp inquiries by 3x. Really happy with the result.", date: daysAgo(34), approved: true },
  { id: 5, name: "Usman Tariq", role: "Corporate Client", avatar: "UT", rating: 5, text: "Our WordPress corporate site needed a full redesign. Malik delivered a modern, fast website that we're proud to share.", date: daysAgo(45), approved: false },
];

const NOTIF_COLOR = {
  inquiry: "bg-brandPrimary/10 text-brandPrimary",
  user: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  project: "bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
  system: "bg-slate-100 dark:bg-slate-800 text-brandMuted",
};

export default function DashboardPage() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  const [users, setUsers] = useState(INITIAL_USERS);
  const [userTab, setUserTab] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyStatus, setReplyStatus] = useState(null); // "sent" | "error" | null
  const [notifSettings, setNotifSettings] = useState({ inquiry: true, user: true, milestone: false, weekly: true });
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const unreadMsgs = messages.filter((m) => m.unread).length;
  const router = useRouter();
  const { logout } = useAuth();
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);

  const filteredUsers = userTab === "admins"
    ? users.filter((u) => u.role === "Admin")
    : userTab === "clients"
    ? users.filter((u) => u.role === "Client")
    : users;

  const handleSendReply = async () => {
    if (!replyText.trim() || replySending) return;
    const conv = messages.find((m) => m.id === selectedMsg);
    if (!conv) return;
    setReplySending(true);
    setReplyStatus(null);
    const now = new Date().toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });
    /* optimistic UI — append to thread immediately */
    setMessages((prev) =>
      prev.map((x) =>
        x.id === selectedMsg
          ? { ...x, thread: [...x.thread, { from: "me", text: replyText.trim(), time: now }], preview: replyText.trim() }
          : x
      )
    );
    const draft = replyText.trim();
    setReplyText("");
    try {
      /* TODO: create a dedicated "reply" template in EmailJS dashboard:
         template vars → to_name, to_email, original_message, reply_message, from_name */
      await emailjs.send(
        EJS.serviceId,
        EJS.replyTemplateId,
        {
          to_name: conv.name,
          to_email: conv.email,
          from_name: "Malik Kashan",
          original_message: conv.thread[0]?.text ?? "",
          reply_message: draft,
          subject: `Re: ${conv.subject ?? "Your inquiry"}`,
        },
        EJS.publicKey
      );
      setReplyStatus("sent");
    } catch {
      setReplyStatus("error");
    } finally {
      setReplySending(false);
      setTimeout(() => setReplyStatus(null), 4000);
    }
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
  };

  const toggleRole = (id) => {
    setUsers((prev) => prev.map((u) =>
      u.id === id ? { ...u, role: u.role === "Admin" ? "Client" : "Admin" } : u
    ));
  };

  return (
    <div className="min-h-screen bg-brandBg dark:bg-slate-950 flex font-sans">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-40
        w-64 bg-white dark:bg-slate-900 border-r border-brandLine dark:border-slate-700
        flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-brandLine dark:border-slate-700">
          <Logo size={32} />
          <div>
            <p className="text-xs font-black text-brandInk dark:text-white tracking-widest uppercase">Malik Kashan</p>
            <p className="text-[9px] font-mono text-brandPrimary tracking-[0.2em] uppercase">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 space-y-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[9px] font-mono tracking-widest text-brandMuted uppercase px-3 mb-1.5">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActive(item.id); setSidebarOpen(false); setNotifOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      active === item.id
                        ? "bg-brandPrimary/10 text-brandPrimary"
                        : "text-brandMuted hover:text-brandInk dark:text-slate-400 dark:hover:text-white hover:bg-brandSoft dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    {(item.id === "messages" ? unreadMsgs > 0 : item.badge) && (
                      <span className="ml-auto bg-brandPrimary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.id === "messages" ? unreadMsgs : item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-brandLine dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brandPrimary/10 border border-brandPrimary/25 flex items-center justify-center text-[10px] font-bold text-brandPrimary font-mono">MK</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-brandInk dark:text-white truncate">Malik Kashan</p>
              <p className="text-[10px] text-brandMuted truncate">admin@malikkashan.com</p>
            </div>
            <Link href="/login" className="text-brandMuted hover:text-rose-500 transition-colors" title="Logout">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </Link>
          </div>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="bg-white dark:bg-slate-900 border-b border-brandLine dark:border-slate-700 px-5 py-3.5 flex items-center gap-4 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl border border-brandLine dark:border-slate-700 text-brandMuted hover:text-brandPrimary transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-black text-brandInk dark:text-white capitalize">{active}</h1>
            <p className="text-[10px] text-brandMuted font-mono hidden sm:block">
              {new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-xl border border-brandLine dark:border-slate-700 text-brandMuted hover:text-brandPrimary transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brandPrimary text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-brandLine dark:border-slate-700">
                    <div>
                      <p className="text-xs font-black text-brandInk dark:text-white">Notifications</p>
                      {unreadCount > 0 && <p className="text-[10px] text-brandPrimary font-semibold">{unreadCount} unread</p>}
                    </div>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-[10px] text-brandPrimary hover:underline font-bold cursor-pointer">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-brandLine/40 dark:divide-slate-700/50 max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-brandSoft dark:hover:bg-slate-800 ${n.unread ? "bg-brandPrimary/3" : ""}`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${NOTIF_COLOR[n.type]}`}>
                          {NOTIF_ICON[n.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-snug ${n.unread ? "font-semibold text-brandInk dark:text-white" : "text-brandMuted"}`}>{n.text}</p>
                          <p className="text-[10px] text-brandMuted font-mono mt-1">{n.time}</p>
                        </div>
                        {n.unread && <span className="w-2 h-2 rounded-full bg-brandPrimary shrink-0 mt-1.5" />}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-brandLine dark:border-slate-700 text-center">
                    <button onClick={() => setNotifOpen(false)} className="text-[10px] text-brandMuted hover:text-brandPrimary font-semibold cursor-pointer transition-colors">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/"
              className="text-xs font-bold text-brandMuted hover:text-brandPrimary border border-brandLine dark:border-slate-700 px-3 py-2 rounded-xl transition-colors hidden sm:block"
            >
              ← Back to Site
            </Link>
            <button
              onClick={() => { logout(); router.push("/"); }}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-rose-500 border border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-5 sm:p-6 overflow-y-auto">

          {/* ── OVERVIEW ── */}
          {active === "overview" && (
            <div className="space-y-6">
              {/* KPI grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {KPI.map((k) => {
                  const c = KPI_COLOR[k.color];
                  return (
                    <div key={k.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} ring-1 ${c.ring} flex items-center justify-center mb-4`}>
                        {k.icon}
                      </div>
                      <p className="text-2xl font-black text-brandInk dark:text-white">{k.value}</p>
                      <p className="text-[10px] font-mono text-brandMuted uppercase tracking-wider mt-0.5">{k.label}</p>
                      <p className={`text-[10px] font-semibold mt-2 ${k.up ? "text-emerald-500" : "text-rose-500"}`}>
                        ↑ {k.change}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Recent Inquiries</h2>
                  <button onClick={() => setActive("inquiries")} className="text-[10px] text-brandPrimary font-bold hover:underline cursor-pointer">View all →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-brandLine dark:border-slate-700">
                        {["Client", "Service", "Budget", "Date", "Status"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-[10px] font-mono text-brandMuted uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {INQUIRIES.map((row, i) => (
                        <tr key={i} className="border-b border-brandLine/40 dark:border-slate-700/50 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors">
                          <td className="px-5 py-3.5 font-semibold text-brandInk dark:text-white">{row.name}</td>
                          <td className="px-5 py-3.5 text-brandMuted">{row.service}</td>
                          <td className="px-5 py-3.5 font-semibold text-brandInk dark:text-slate-300">{row.budget}</td>
                          <td className="px-5 py-3.5 text-brandMuted font-mono">{row.date}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${STATUS_STYLE[row.status]}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick actions row */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Quick Actions</h2>
                </div>
                <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "New Blog Post", color: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800", action: () => router.push("/dashboard/new-post"), icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg> },
                    { label: "View Site", color: "bg-brandPrimary/8 text-brandPrimary border-brandPrimary/20", action: () => router.push("/"), icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> },
                    { label: "View Reports", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800", action: () => setActive("reports"), icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> },
                    { label: "Add Project", color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800", action: () => router.push("/dashboard/new-project"), icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4M9 8h6M9 12h4" /></svg> },
                  ].map((a) => (
                    <button key={a.label} onClick={a.action} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${a.color} transition-all hover:scale-[1.02] cursor-pointer`}>
                      {a.icon}
                      <span className="text-[10px] font-bold tracking-wide">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── INQUIRIES VIEW ── */}
          {active === "inquiries" && <InquiriesView />}

          {/* ── USERS VIEW ── */}
          {active === "users" && (
            <div className="space-y-4">
              {/* Delete confirmation modal */}
              {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-2xl p-6 w-full max-w-sm">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-black text-brandInk dark:text-white mb-1">Delete User?</h3>
                    <p className="text-xs text-brandMuted mb-5">
                      <span className="font-bold text-brandInk dark:text-white">{users.find((u) => u.id === deleteConfirm)?.name}</span> will be permanently removed.
                    </p>
                    <div className="flex gap-3">
                      <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 text-xs font-bold text-brandMuted border border-brandLine dark:border-slate-600 rounded-xl hover:border-brandPrimary hover:text-brandPrimary transition-colors cursor-pointer">Cancel</button>
                      <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-colors cursor-pointer">Delete</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                {/* Header + Invite */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">
                    Users <span className="text-brandMuted font-mono text-xs">({users.length})</span>
                  </h2>
                  <button
                    onClick={() => setShowInvite(!showInvite)}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-brandPrimary hover:bg-brandSecondary px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                    Invite Admin
                  </button>
                </div>

                {/* Invite form */}
                {showInvite && (
                  <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700 bg-brandSoft dark:bg-slate-800/50">
                    <p className="text-[10px] font-mono tracking-widest text-brandMuted uppercase font-bold mb-2">Invite New Admin</p>
                    <div className="flex gap-2">
                      <input
                        type="email" placeholder="admin@example.com" value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/50 focus:outline-none focus:border-brandPrimary transition-all"
                      />
                      <button
                        onClick={() => { setInviteEmail(""); setShowInvite(false); }}
                        className="px-4 py-2 text-[11px] font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer"
                      >
                        Send Invite
                      </button>
                    </div>
                    <p className="text-[10px] text-brandMuted mt-2">Admin accounts cannot be created from the public register page.</p>
                  </div>
                )}

                {/* Tabs */}
                <div className="flex border-b border-brandLine dark:border-slate-700 px-5">
                  {[
                    { id: "all", label: "All Users", count: users.length },
                    { id: "clients", label: "Clients", count: users.filter((u) => u.role === "Client").length },
                    { id: "admins", label: "Admins", count: users.filter((u) => u.role === "Admin").length },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setUserTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-3 text-[11px] font-bold tracking-wide border-b-2 transition-colors cursor-pointer ${
                        userTab === tab.id
                          ? "border-brandPrimary text-brandPrimary"
                          : "border-transparent text-brandMuted hover:text-brandInk dark:text-slate-400"
                      }`}
                    >
                      {tab.label}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
                        userTab === tab.id ? "bg-brandPrimary/10 text-brandPrimary" : "bg-brandSoft dark:bg-slate-700 text-brandMuted"
                      }`}>{tab.count}</span>
                    </button>
                  ))}
                </div>

                {/* User list */}
                <div className="divide-y divide-brandLine/40 dark:divide-slate-700/50">
                  {filteredUsers.length === 0 && (
                    <p className="text-center text-xs text-brandMuted py-10">No users in this category.</p>
                  )}
                  {filteredUsers.map((u) => (
                    <div key={u.id} className="flex items-center gap-4 px-5 py-4 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center text-xs font-bold text-brandPrimary font-mono shrink-0">{u.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brandInk dark:text-white truncate">{u.name}</p>
                        <p className="text-xs text-brandMuted truncate">{u.email}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${ROLE_BADGE[u.role]}`}>{u.role}</span>
                      <p className="text-[10px] text-brandMuted font-mono hidden sm:block shrink-0">Joined {u.joined}</p>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => toggleRole(u.id)}
                          title={u.role === "Admin" ? "Remove Admin" : "Make Admin"}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer text-[10px] font-bold ${
                            u.role === "Admin"
                              ? "border-rose-200 dark:border-rose-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                              : "border-brandPrimary/30 text-brandPrimary hover:bg-brandPrimary/10"
                          }`}
                        >
                          {u.role === "Admin" ? (
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(u.id)}
                          title="Delete user"
                          className="p-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PROJECTS VIEW ── */}
          {active === "projects" && <ProjectsView projects={projects} setProjects={setProjects} />}

          {/* ── BLOG VIEW ── */}
          {active === "blog" && <BlogView posts={posts} setPosts={setPosts} />}

          {/* ── MESSAGES VIEW ── */}
          {active === "messages" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden" style={{height:"calc(100vh - 140px)"}}>
              <div className="flex h-full">
                {/* Inbox list */}
                <div className="w-72 border-r border-brandLine dark:border-slate-700 flex flex-col shrink-0">
                  <div className="px-4 py-3.5 border-b border-brandLine dark:border-slate-700">
                    <p className="text-sm font-black text-brandInk dark:text-white">Inbox</p>
                    {unreadMsgs > 0 && <p className="text-[10px] text-brandPrimary font-semibold">{unreadMsgs} unread</p>}
                  </div>
                  <div className="overflow-y-auto flex-1 divide-y divide-brandLine/40 dark:divide-slate-700/40">
                    {messages.map((m) => (
                      <div key={m.id} onClick={()=>{setSelectedMsg(m.id);setMessages(prev=>prev.map(x=>x.id===m.id?{...x,unread:false}:x));}}
                        className={`px-4 py-3.5 cursor-pointer transition-colors hover:bg-brandSoft dark:hover:bg-slate-800 ${selectedMsg===m.id?"bg-brandPrimary/5 dark:bg-brandPrimary/10":""}`}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brandPrimary/10 text-brandPrimary text-[10px] font-bold font-mono flex items-center justify-center shrink-0">{m.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-xs truncate ${m.unread?"font-bold text-brandInk dark:text-white":"font-semibold text-brandMuted"}`}>{m.name}</p>
                              <p className="text-[9px] text-brandMuted font-mono shrink-0 ml-1">{m.time}</p>
                            </div>
                            <p className="text-[10px] text-brandMuted truncate mt-0.5">{m.preview}</p>
                          </div>
                          {m.unread && <span className="w-2 h-2 rounded-full bg-brandPrimary shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thread */}
                <div className="flex-1 flex flex-col min-w-0">
                  {selectedMsg ? (() => {
                    const conv = messages.find(m=>m.id===selectedMsg);
                    return (
                      <>
                        <div className="px-5 py-3.5 border-b border-brandLine dark:border-slate-700 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brandPrimary/10 text-brandPrimary text-[10px] font-bold font-mono flex items-center justify-center">{conv.avatar}</div>
                          <div>
                            <p className="text-xs font-bold text-brandInk dark:text-white">{conv.name}</p>
                            <p className="text-[10px] text-brandMuted">{conv.email}</p>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 space-y-3">
                          {conv.thread.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from==="me"?"justify-end":""}`}>
                              <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-xs ${msg.from==="me"?"bg-brandPrimary text-white rounded-br-sm":"bg-brandSoft dark:bg-slate-800 text-brandInk dark:text-slate-200 rounded-bl-sm"}`}>
                                <p className="leading-relaxed">{msg.text}</p>
                                <p className={`text-[9px] mt-1 ${msg.from==="me"?"text-white/70":"text-brandMuted"}`}>{msg.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* status bar */}
                        {replyStatus && (
                          <div className={`mx-4 mb-1 mt-0 px-3 py-2 rounded-xl text-[11px] font-bold flex items-center gap-2 ${replyStatus==="sent"?"bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800":"bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"}`}>
                            {replyStatus==="sent"
                              ? <><svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Email sent to {conv.email}</>
                              : <><svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Email failed — check EmailJS config</>
                            }
                          </div>
                        )}
                        <div className="px-4 py-3 border-t border-brandLine dark:border-slate-700 flex gap-2">
                          <input value={replyText} onChange={e=>setReplyText(e.target.value)}
                            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey)handleSendReply();}}
                            disabled={replySending}
                            placeholder={`Reply to ${conv.name}… (Enter to send)`}
                            className="flex-1 px-3 py-2 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/50 focus:outline-none focus:border-brandPrimary transition-all disabled:opacity-60" />
                          <button onClick={handleSendReply}
                            disabled={!replyText.trim() || replySending}
                            className="px-4 py-2 text-xs font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5">
                            {replySending
                              ? <><svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Sending</>
                              : <>Send <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>
                            }
                          </button>
                        </div>
                      </>
                    );
                  })() : (
                    <div className="flex-1 flex items-center justify-center text-center">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-brandPrimary/10 text-brandPrimary flex items-center justify-center mx-auto mb-3">
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </div>
                        <p className="text-sm font-bold text-brandInk dark:text-white">Select a conversation</p>
                        <p className="text-[11px] text-brandMuted mt-1">Click any message from the inbox</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── ANALYTICS VIEW ── */}
          {active === "analytics" && (
            <div className="space-y-5">
              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Visitors", value: "4,821", change: "+12% this week", up: true, color: "text-brandPrimary bg-brandPrimary/10" },
                  { label: "Page Views", value: "12,340", change: "+8% this week", up: true, color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20" },
                  { label: "Avg. Session", value: "2m 34s", change: "+0.3s vs last week", up: true, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" },
                  { label: "Bounce Rate", value: "42%", change: "-3% improvement", up: true, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20" },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-sm font-black ${s.color}`}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <p className="text-xl font-black text-brandInk dark:text-white">{s.value}</p>
                    <p className="text-[10px] font-mono text-brandMuted uppercase tracking-wider mt-0.5">{s.label}</p>
                    <p className="text-[10px] text-emerald-500 font-semibold mt-1.5">{s.change}</p>
                  </div>
                ))}
              </div>

              {/* Weekly visitors SVG bar chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-black text-brandInk dark:text-white">Weekly Visitors</h2>
                    <p className="text-[10px] text-brandMuted font-mono mt-0.5">{weekLabel()}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-500">↑ {WEEKLY_VISITORS.reduce((a,b)=>a+b,0)} this week</span>
                </div>
                {(() => {
                  const vals = WEEKLY_VISITORS;
                  const maxV = Math.max(...vals);
                  const W = 560, H = 160;
                  const padL = 38, padR = 8, padT = 18, padB = 28;
                  const cW = W - padL - padR;
                  const cH = H - padT - padB;
                  const slot = cW / vals.length;
                  const bw = slot * 0.55;
                  const bx = (i) => padL + i * slot + (slot - bw) / 2;
                  const bh = (v) => (v / maxV) * cH;
                  const by = (v) => padT + cH - bh(v);
                  const todayIdx = (TODAY.getDay() + 6) % 7;
                  const gridSteps = [0, Math.round(maxV*0.33), Math.round(maxV*0.66), maxV];
                  const gy = (v) => padT + cH - (v / maxV) * cH;
                  return (
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:160}}>
                      {gridSteps.map(v => (
                        <g key={v}>
                          <line x1={padL} x2={W-padR} y1={gy(v)} y2={gy(v)} stroke="#e2e8f0" strokeWidth={v===0?1:0.6} strokeDasharray={v===0?"":"3 3"} />
                          <text x={padL-5} y={gy(v)+3.5} textAnchor="end" fontSize={8} fill="#94a3b8" fontFamily="ui-monospace,monospace">{v}</text>
                        </g>
                      ))}
                      {vals.map((v, i) => (
                        <g key={i}>
                          <rect x={bx(i)} y={by(v)} width={bw} height={bh(v)} rx={4}
                            fill={i===todayIdx ? "#0ea5e9" : "#bae6fd"} />
                          {bh(v) > 14 && (
                            <text x={bx(i)+bw/2} y={by(v)-5} textAnchor="middle" fontSize={8} fill="#64748b" fontFamily="ui-monospace,monospace">{v}</text>
                          )}
                          <text x={bx(i)+bw/2} y={H-4} textAnchor="middle" fontSize={8.5}
                            fill={i===todayIdx?"#0ea5e9":"#94a3b8"}
                            fontWeight={i===todayIdx?"700":"400"} fontFamily="ui-monospace,monospace">
                            {WEEKLY_DAYS[i].replace("*","")}
                          </text>
                        </g>
                      ))}
                    </svg>
                  );
                })()}
                <p className="text-[9px] text-brandMuted font-mono mt-1 text-center">* highlighted bar = today</p>
              </div>

              {/* Monthly trend line chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-black text-brandInk dark:text-white">6-Month Visitor Trend</h2>
                    <p className="text-[10px] text-brandMuted font-mono mt-0.5">{monthsAgo(5)} — {monthsAgo(0)}</p>
                  </div>
                  <span className="text-xs font-bold text-brandPrimary">+136% growth</span>
                </div>
                {(() => {
                  const data = [
                    { label: monthsAgo(5), v: 890 },
                    { label: monthsAgo(4), v: 1200 },
                    { label: monthsAgo(3), v: 980 },
                    { label: monthsAgo(2), v: 1450 },
                    { label: monthsAgo(1), v: 1890 },
                    { label: monthsAgo(0), v: 2100 },
                  ];
                  const W = 560, H = 140;
                  const padL = 42, padR = 12, padT = 16, padB = 28;
                  const cW = W - padL - padR;
                  const cH = H - padT - padB;
                  const minV = 0, maxV = 2400;
                  const px = (i) => padL + (i / (data.length-1)) * cW;
                  const py = (v) => padT + cH - ((v - minV) / (maxV - minV)) * cH;
                  const pts = data.map((d,i) => `${px(i)},${py(d.v)}`).join(" ");
                  const areaPath = `M${px(0)},${py(data[0].v)} ` + data.slice(1).map((d,i)=>`L${px(i+1)},${py(d.v)}`).join(" ") + ` L${px(data.length-1)},${padT+cH} L${px(0)},${padT+cH} Z`;
                  const gridVals = [0, 600, 1200, 1800, 2400];
                  return (
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:140}}>
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02"/>
                        </linearGradient>
                      </defs>
                      {gridVals.map(v => (
                        <g key={v}>
                          <line x1={padL} x2={W-padR} y1={py(v)} y2={py(v)} stroke="#e2e8f0" strokeWidth={v===0?1:0.5} strokeDasharray={v===0?"":"3 3"}/>
                          <text x={padL-5} y={py(v)+3.5} textAnchor="end" fontSize={8} fill="#94a3b8" fontFamily="ui-monospace,monospace">{v===0?0:v>=1000?`${v/1000}k`:v}</text>
                        </g>
                      ))}
                      <path d={areaPath} fill="url(#areaGrad)" />
                      <polyline points={pts} fill="none" stroke="#0ea5e9" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round"/>
                      {data.map((d,i) => (
                        <g key={i}>
                          <circle cx={px(i)} cy={py(d.v)} r={4} fill="#fff" stroke="#0ea5e9" strokeWidth={2}/>
                          <text x={px(i)} y={py(d.v)-10} textAnchor="middle" fontSize={8.5} fill="#0ea5e9" fontFamily="ui-monospace,monospace" fontWeight="600">{d.v>=1000?`${(d.v/1000).toFixed(1)}k`:d.v}</text>
                          <text x={px(i)} y={H-4} textAnchor="middle" fontSize={8} fill="#94a3b8" fontFamily="ui-monospace,monospace">{d.label}</text>
                        </g>
                      ))}
                    </svg>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Top Pages */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                  <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700">
                    <h2 className="text-sm font-black text-brandInk dark:text-white">Top Pages</h2>
                  </div>
                  <div className="divide-y divide-brandLine/40 dark:divide-slate-700/50">
                    {[
                      { page: "/", label: "Home", views: 1840, pct: 100 },
                      { page: "/blog/web-development-cost-pakistan", label: "Blog: Dev Cost", views: 1240, pct: 67 },
                      { page: "/projects", label: "Projects", views: 980, pct: 53 },
                      { page: "/contact", label: "Contact", views: 720, pct: 39 },
                      { page: "/services", label: "Services", views: 540, pct: 29 },
                    ].map((pg) => (
                      <div key={pg.page} className="px-5 py-3 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-brandInk dark:text-white truncate">{pg.label}</p>
                          <p className="text-[9px] font-mono text-brandMuted truncate">{pg.page}</p>
                        </div>
                        <div className="w-24 h-1.5 rounded-full bg-brandLine dark:bg-slate-700 overflow-hidden">
                          <div className="h-full rounded-full bg-brandPrimary" style={{width:`${pg.pct}%`}} />
                        </div>
                        <span className="text-[10px] font-mono text-brandMuted w-10 text-right">{pg.views.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traffic sources + Devices */}
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <h2 className="text-sm font-black text-brandInk dark:text-white mb-4">Traffic Sources</h2>
                    <div className="space-y-2.5">
                      {[
                        { label: "Organic Search", pct: 52, color: "bg-brandPrimary" },
                        { label: "Direct", pct: 28, color: "bg-violet-500" },
                        { label: "Social Media", pct: 14, color: "bg-emerald-500" },
                        { label: "Referral", pct: 6, color: "bg-amber-500" },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center gap-3">
                          <span className="text-[10px] text-brandMuted w-28 shrink-0">{s.label}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-brandLine dark:bg-slate-700 overflow-hidden">
                            <div className={`h-full rounded-full ${s.color}`} style={{width:`${s.pct}%`}} />
                          </div>
                          <span className="text-[10px] font-mono text-brandMuted w-7 text-right">{s.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <h2 className="text-sm font-black text-brandInk dark:text-white mb-4">Devices</h2>
                    <div className="space-y-2.5">
                      {[
                        { label: "Mobile", pct: 61, color: "bg-brandPrimary" },
                        { label: "Desktop", pct: 32, color: "bg-violet-500" },
                        { label: "Tablet", pct: 7, color: "bg-emerald-500" },
                      ].map((d) => (
                        <div key={d.label} className="flex items-center gap-3">
                          <span className="text-[10px] text-brandMuted w-28 shrink-0">{d.label}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-brandLine dark:bg-slate-700 overflow-hidden">
                            <div className={`h-full rounded-full ${d.color}`} style={{width:`${d.pct}%`}} />
                          </div>
                          <span className="text-[10px] font-mono text-brandMuted w-7 text-right">{d.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SERVICES VIEW ── */}
          {active === "services" && <ServicesView services={services} setServices={setServices} />}

          {/* ── SKILLS VIEW ── */}
          {active === "skills" && <SkillsView skills={skills} setSkills={setSkills} />}

          {/* ── TESTIMONIALS VIEW ── */}
          {active === "testimonials" && <TestimonialsView testimonials={testimonials} setTestimonials={setTestimonials} />}

          {/* ── REPORTS VIEW ── */}
          {active === "reports" && (
            <div className="space-y-5">
              {/* Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Revenue", value: "Rs 8.4L", sub: "This year", color: "emerald", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                  { label: "Projects Closed", value: "18", sub: "This year", color: "violet", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
                  { label: "Avg. Project Value", value: "Rs 46k", sub: "Per project", color: "amber", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      s.color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" :
                      s.color === "violet" ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" :
                      "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                    }`}>{s.icon}</div>
                    <p className="text-2xl font-black text-brandInk dark:text-white">{s.value}</p>
                    <p className="text-[10px] font-mono text-brandMuted uppercase tracking-wider mt-0.5">{s.label}</p>
                    <p className="text-[10px] text-brandMuted mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Monthly breakdown table */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Monthly Breakdown</h2>
                  <span className="text-[10px] font-mono text-brandMuted">{TODAY.getFullYear() - 1} — {TODAY.getFullYear()}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-brandLine dark:border-slate-700">
                        {["Month", "Projects", "Revenue", "Inquiries", "Conversion"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-[10px] font-mono text-brandMuted uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { month: monthsAgo(0), projects: 3, revenue: "Rs 1.2L", inquiries: 9, rate: "33%" },
                        { month: monthsAgo(1), projects: 4, revenue: "Rs 1.6L", inquiries: 11, rate: "36%" },
                        { month: monthsAgo(2), projects: 2, revenue: "Rs 80k", inquiries: 7, rate: "28%" },
                        { month: monthsAgo(3), projects: 3, revenue: "Rs 1.1L", inquiries: 8, rate: "37%" },
                        { month: monthsAgo(4), projects: 2, revenue: "Rs 90k", inquiries: 6, rate: "33%" },
                        { month: monthsAgo(5), projects: 4, revenue: "Rs 1.5L", inquiries: 10, rate: "40%" },
                      ].map((r) => (
                        <tr key={r.month} className="border-b border-brandLine/40 dark:border-slate-700/50 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors">
                          <td className="px-5 py-3.5 font-semibold text-brandInk dark:text-white">{r.month}</td>
                          <td className="px-5 py-3.5 text-brandMuted">{r.projects}</td>
                          <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">{r.revenue}</td>
                          <td className="px-5 py-3.5 text-brandMuted">{r.inquiries}</td>
                          <td className="px-5 py-3.5">
                            <span className="bg-brandPrimary/10 text-brandPrimary px-2.5 py-1 rounded-full text-[10px] font-bold">{r.rate}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-center text-[10px] text-brandMuted font-mono">Full charts & CSV export coming with Laravel backend integration.</p>
            </div>
          )}

          {/* ── SETTINGS VIEW ── */}
          {active === "settings" && (
            <div className="space-y-5 max-w-2xl">

              {/* Profile settings */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Profile</h2>
                  <p className="text-[10px] text-brandMuted font-mono mt-0.5">Update your admin profile details</p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-brandPrimary/10 border-2 border-brandPrimary/25 flex items-center justify-center text-sm font-black text-brandPrimary font-mono">MK</div>
                    <div>
                      <p className="text-xs font-bold text-brandInk dark:text-white">Malik Kashan</p>
                      <p className="text-[10px] text-brandMuted">admin@malikkashan.com</p>
                      <button className="text-[10px] text-brandPrimary font-semibold hover:underline mt-1 cursor-pointer">Change Avatar</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Full Name", value: "Malik Kashan", type: "text" },
                      { label: "Email", value: "admin@malikkashan.com", type: "email" },
                      { label: "Phone", value: "+92 300 0000000", type: "tel" },
                      { label: "Location", value: "Lahore, Pakistan", type: "text" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">{f.label}</label>
                        <input type={f.type} defaultValue={f.value}
                          className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white focus:outline-none focus:border-brandPrimary transition-all" />
                      </div>
                    ))}
                  </div>
                  <button className="px-5 py-2.5 text-xs font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer">Save Changes</button>
                </div>
              </div>

              {/* Logo settings */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Site Logo</h2>
                  <p className="text-[10px] text-brandMuted font-mono mt-0.5">Preview a new logo — then replace <code className="bg-brandSoft dark:bg-slate-800 px-1 rounded">/public/logo.webp</code></p>
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-5">
                    {/* Current / Preview */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className="w-20 h-20 rounded-2xl border-2 border-brandLine dark:border-slate-700 overflow-hidden bg-brandSoft dark:bg-slate-800 flex items-center justify-center">
                        {logoPreview
                          ? <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                          : <img src="/logo.webp" alt="Current logo" className="w-full h-full object-contain" />}
                      </div>
                      <p className="text-[9px] font-mono text-brandMuted">{logoPreview ? "Preview" : "Current"}</p>
                    </div>

                    <div className="flex-1 space-y-3">
                      <label className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl border-2 border-dashed border-brandLine dark:border-slate-600 hover:border-brandPrimary hover:bg-brandPrimary/3 transition-all cursor-pointer group">
                        <svg className="w-6 h-6 text-brandMuted group-hover:text-brandPrimary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <span className="text-[11px] font-semibold text-brandMuted group-hover:text-brandPrimary transition-colors">
                          {logoFile ? logoFile.name : "Click to choose logo file"}
                        </span>
                        <span className="text-[9px] text-brandMuted/60 font-mono">PNG, WEBP, SVG — recommended 512×512</span>
                        <input type="file" accept="image/png,image/webp,image/svg+xml,image/jpeg" className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setLogoFile(file);
                            const url = URL.createObjectURL(file);
                            setLogoPreview(url);
                          }} />
                      </label>

                      {logoPreview && (
                        <div className="flex gap-2">
                          <a href={logoPreview} download={`logo.${logoFile?.name.split(".").pop() || "webp"}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Download File
                          </a>
                          <button onClick={() => { setLogoPreview(null); setLogoFile(null); }}
                            className="px-4 py-2.5 text-[11px] font-bold text-brandMuted border border-brandLine dark:border-slate-600 rounded-xl hover:border-rose-400 hover:text-rose-500 transition-colors cursor-pointer">
                            Reset
                          </button>
                        </div>
                      )}

                      {logoPreview && (
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-800">
                          <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold leading-relaxed">
                            <strong>To apply:</strong> Download the file above → rename it to <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">logo.webp</code> → replace <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">/public/logo.webp</code> in the project → redeploy.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications settings */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Notifications</h2>
                  <p className="text-[10px] text-brandMuted font-mono mt-0.5">Choose what alerts you receive</p>
                </div>
                <div className="divide-y divide-brandLine/40 dark:divide-slate-700/50">
                  {[
                    { key: "inquiry", label: "New Inquiry Alert", sub: "Get notified when someone submits the contact form" },
                    { key: "user", label: "New User Registration", sub: "Alert when a new client registers" },
                    { key: "milestone", label: "Project Milestone", sub: "When a milestone is marked complete" },
                    { key: "weekly", label: "Weekly Summary", sub: "Email digest every Monday morning" },
                  ].map((n) => (
                    <div key={n.key} className="flex items-center justify-between px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-brandInk dark:text-white">{n.label}</p>
                        <p className="text-[10px] text-brandMuted mt-0.5">{n.sub}</p>
                      </div>
                      <div onClick={()=>setNotifSettings(prev=>({...prev,[n.key]:!prev[n.key]}))}
                        className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${notifSettings[n.key] ? "bg-brandPrimary" : "bg-brandLine dark:bg-slate-700"}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${notifSettings[n.key] ? "translate-x-5" : "translate-x-0"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Site Info */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Site Information</h2>
                  <p className="text-[10px] text-brandMuted font-mono mt-0.5">Public-facing site details</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Site Name", value: "Malik Kashan", type: "text" },
                      { label: "Tagline", value: "Web Developer in Lahore", type: "text" },
                      { label: "Contact Email", value: "alihumdard125@gmail.com", type: "email" },
                      { label: "WhatsApp Number", value: "+92 311 4777391", type: "tel" },
                      { label: "City", value: "Lahore, Pakistan", type: "text" },
                      { label: "Availability", value: "Available for projects", type: "text" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">{f.label}</label>
                        <input type={f.type} defaultValue={f.value}
                          className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white focus:outline-none focus:border-brandPrimary transition-all" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">Short Bio</label>
                    <textarea rows={3} defaultValue="I build fast, modern websites for businesses in Pakistan and worldwide. Specializing in Next.js, React, Shopify, and WordPress."
                      className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white focus:outline-none focus:border-brandPrimary transition-all resize-none" />
                  </div>
                  <button className="px-5 py-2.5 text-xs font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer">Save Site Info</button>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Social Links</h2>
                  <p className="text-[10px] text-brandMuted font-mono mt-0.5">Links shown on your portfolio</p>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { label: "GitHub", placeholder: "https://github.com/username", icon: "GH" },
                    { label: "LinkedIn", placeholder: "https://linkedin.com/in/username", icon: "LI" },
                    { label: "Twitter / X", placeholder: "https://x.com/username", icon: "TW" },
                    { label: "Upwork", placeholder: "https://upwork.com/freelancers/...", icon: "UP" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 flex items-center justify-center text-[9px] font-black text-brandMuted font-mono shrink-0">{s.icon}</div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1">{s.label}</label>
                        <input type="url" placeholder={s.placeholder}
                          className="w-full px-3 py-2 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all" />
                      </div>
                    </div>
                  ))}
                  <button className="px-5 py-2.5 text-xs font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer">Save Links</button>
                </div>
              </div>

              {/* Security */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700">
                  <h2 className="text-sm font-black text-brandInk dark:text-white">Security</h2>
                  <p className="text-[10px] text-brandMuted font-mono mt-0.5">Manage your password and session</p>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { label: "Current Password", placeholder: "••••••••" },
                    { label: "New Password", placeholder: "Min 8 characters" },
                    { label: "Confirm Password", placeholder: "Repeat new password" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-[10px] font-mono text-brandMuted uppercase tracking-widest mb-1.5">{f.label}</label>
                      <input type="password" placeholder={f.placeholder}
                        className="w-full px-3 py-2.5 text-xs bg-brandSoft dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/40 focus:outline-none focus:border-brandPrimary transition-all" />
                    </div>
                  ))}
                  <div className="flex gap-3 pt-1">
                    <button className="px-5 py-2.5 text-xs font-bold text-white bg-brandPrimary hover:bg-brandSecondary rounded-xl transition-colors cursor-pointer">Update Password</button>
                    <button className="px-5 py-2.5 text-xs font-bold text-rose-500 border border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors cursor-pointer">Sign Out All Devices</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
