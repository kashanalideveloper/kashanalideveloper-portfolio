// src/app/layout.jsx
import "./globals.css";
import SiteShell from "./Components/SiteShell";
import { LanguageProvider } from "./Components/LanguageContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SITE } from "./lib/site";

import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata = {
  title: {
    default: "Malik Kashan | Web Developer in Lahore | Next.js Expert",
    template: "%s | Malik Kashan - Web Developer",
  },
  description:
    "Malik Kashan - Web Developer in Lahore, Pakistan. Next.js & Shopify expert building fast, custom web solutions. Serving clients worldwide — USA, UK, Canada, Australia, UAE, Germany and more.",
keywords: [
    // --- Personal brand ---
    "malik kashan portfolio",
    "kashan ali web developer",
    "Malik Kashan",
    "web developer in Lahore Pakistan",
    "web developer in pakistan",
    "best web developer in pakistan",
    "best freelance frontend developer pakistan",
    "freelance web developer portfolio",
    "freelance web developer",
    "freelance website designer in lahore",
    "freelance website designer in karachi",
    "hire top web developer in lahore",
    "hire next.js developer online",
    "react js frontend developer for hire",
    "hire react developer",
    "hire react.js expert online",
    "next js portfolio website",
    "next.js and typescript expert portfolio",
    "full stack web developer portfolio",
    "full stack developer portfolio",
    "mern stack developer for hire",
    "business web specialist",
    "affordable web development services",
    "affordable web designer for small business",
    "custom web application development",
    "custom wordpress website specialist",
    "custom wordpress developer",
    "ecommerce website development services",
    "e-commerce website development",
    "web design agency near me",
    "website designer near me",
    "landing page developer for startups",
    "ui/ux design to code conversion",
    "figma to next.js conversion",
    "ai-powered web application development",
    "next.js app router performance optimization",
    "core web vitals optimization",
    "core web vitals seo fixes",
    "tailwind css web application design",
    "pagespeed insights 100 score developer",
    "serverless app development vercel",
    "react server components specialist",
    "next.js seo best practices 2026",
    "next.js vs react for seo 2026",
    "node js backend developer for hire",
    "node js and express api specialist",
    "python web development services",
    "typescript web application development",
    "Shopify developer in Pakistan",
    "frontend developer Lahore",
    "React developer portfolio",
    "Shopify store developer",
    // --- Portfolio / template searches (user-provided) ---
    "best google sites portfolio",
    "best portfolio websites for web developers",
    "best portfolio website design",
    "best portfolio",
    "best free portfolio websites for software developers",
    "best portfolio website free templates",
    "best site to create portfolio for free",
    "personal portfolio website templates",
    "responsive personal portfolio website templates",
    "portfolio in web development",
    "developer portfolio website design",
    // --- Next.js portfolio / template searches ---
    "next js free templates",
    "next js portfolio website template",
    "next js portfolio starter",
    "next js portfolio template free",
    "next js project",
    "next.js portfolio template",
    // --- AI development (user-provided) ---
    "ai developer portfolio website",
    "ai developer",
    "ai developer salary in pakistan",
    "ai developer course",
    "ai development course",
    "ai development services",
    "ai development company in pakistan",
    "ai development company in usa",
    "ai development life cycle",
    "ai development roadmap",
    "ai development agency",
    // --- Web development learning / hiring ---
    "web development free course with certificate",
    "web development jobs",
    "web development courses free",
    "web development internship",
    "web development companies in pakistan",
    // --- Language-specific projects ---
    "python projects",
    "python portfolio",
    "python projects github",
    "laravel project github",
    "laravel project",
    "php projects",
    "node js projects",
    "react js projects for beginners",
    // --- Global reach: countries ---
    "web developer in usa",
    "web developer in uk",
    "web developer in canada",
    "web developer in australia",
    "web developer in dubai",
    "web developer in uae",
    "web developer in saudi arabia",
    "web developer in germany",
    "web developer in netherlands",
    "web developer in india",
    "web developer in bangladesh",
    "web developer in qatar",
    "web developer in singapore",
    "web developer in new zealand",
    "web developer in europe",
    "hire web developer in usa",
    "hire web developer in uk",
    "hire web developer in canada",
    "hire web developer in australia",
    "hire web developer in dubai",
    "hire web developer in uae",
    "hire web developer in germany",
    "hire web developer in india",
    "hire web developer in saudi arabia",
    "hire web developer in qatar",
    "remote web developer for hire",
    "hire remote web developer",
    "remote frontend developer for hire",
    "remote react developer for hire",
    "remote next.js developer for hire",
    "web development services worldwide",
    "web development services usa",
    "web development services uk",
    "web development services canada",
    "web development services australia",
    "web development services dubai",
    "web development services uae",
    "web development services germany",
    "web development services india",
    "web development services saudi arabia",
    // --- Programming languages / stacks ---
    "hire python developer",
    "hire php developer",
    "hire laravel developer",
    "hire node.js developer",
    "hire javascript developer",
    "hire typescript developer",
    "hire html css developer",
    "hire tailwind css developer",
    "hire react native developer",
    "hire vue developer",
    "hire angular developer",
    "hire svelte developer",
    "hire django developer",
    "hire flask developer",
    "hire express js developer",
    "hire shopify developer",
    "hire wordpress developer",
    "hire woocommerce developer",
    "python developer for hire",
    "php developer for hire",
    "laravel developer for hire",
    "node.js developer for hire",
    "javascript developer for hire",
    "react native developer for hire",
    "vue developer for hire",
    "angular developer for hire",
    "django developer for hire",
    "express js developer for hire",
    "wordpress developer for hire",
    "woocommerce developer for hire",
    "shopify developer for hire",
    // --- Other languages / countries ---
    "web developer in spain",
    "web developer in france",
    "web developer in italy",
    "web developer in switzerland",
    "web developer in sweden",
    "web developer in norway",
    "web developer in denmark",
    "web developer in finland",
    "web developer in ireland",
    "web developer in poland",
    "web developer in portugal",
    "web developer in brazil",
    "web developer in mexico",
    "web developer in south africa",
    "web developer in nigeria",
    "web developer in kenya",
    "web developer in malaysia",
    "web developer in indonesia",
    "web developer in philippines",
    "web developer in japan",
    "web developer in south korea",
    "web developer in turkey",
    "web developer in egypt",
    "web developer in morocco",
    "web developer in sri lanka",
    "web developer in nepal",
    "web developer in kuwait",
    "web developer in bahrain",
    "web developer in oman",
    "web developer in jordan",
    "web developer in lebanon",
  ],
  authors: [
    { name: "Malik Kashan", url: "https://kashanalideveloper-portfolio.vercel.app/" },
  ],
  creator: "Malik Kashan",
  publisher: "Malik Kashan",
  applicationName: "Malik Kashan Developer Portfolio",
  category: "Web Development Portfolio",
  metadataBase: new URL("https://kashanalideveloper-portfolio.vercel.app"),

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: "Malik Kashan",
    statusBarStyle: "default",
  },

  alternates: {
    canonical: "https://kashanalideveloper-portfolio.vercel.app/",
  },

  verification: {
    google: "v2KWFtlz9ZQ_XELE-59AdmLBPLWkMIHtqIS57JLfMes",
  },

  icons: {
    icon: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    title: "Malik Kashan | Best Frontend & WordPress Developer in Pakistan",
    description:
      "Hire top frontend developers and custom WordPress experts in Lahore, Pakistan. Check out Malik Kashan's high-performance SaaS portfolio.",
    url: "https://kashanalideveloper-portfolio.vercel.app/",
    siteName: "Malik Kashan Developer Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Malik Kashan - Best Developer Portfolio Pakistan",
      },
    ],
    locale: "en_US",
    type: "profile",
  },

  twitter: {
    card: "summary_large_image",
    title: "Malik Kashan | Top Frontend & Custom Developer Pakistan",
    description:
      "Specializing in high-performance SaaS portfolios and WordPress layouts in Lahore, Pakistan.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  // GOOGLE SCHEMA MARKUP (Structured Data With Live Authentic Profiles)
  const siteUrl = SITE.url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Malik Kashan",
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    jobTitle: "Web Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    sameAs: ["https://github.com/kashanalideveloper", "https://linkedin.com/in/malik-kashan"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    knowsAbout: [
      "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
      "Python", "PHP", "Laravel", "WordPress", "Shopify",
      "Web Development", "AI Development", "Frontend Development", "SEO"
    ],
    knowsLanguage: ["English", "Urdu"],
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Malik Kashan - Web Development & Next.js Expert",
    image: `${siteUrl}/og-image.png`,
    "@id": siteUrl,
    url: siteUrl,
    telephone: SITE.phoneDisplay,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.5204,
      longitude: 74.3587,
    },
    sameAs: [
      "https://github.com/kashanalideveloper",
      "https://linkedin.com/in/malik-kashan"
    ],
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "Ireland" },
      { "@type": "Country", name: "New Zealand" },
      { "@type": "Country", name: "Worldwide" }
    ],
    knowsAbout: [
      "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
      "Python", "PHP", "Laravel", "WordPress", "Shopify",
      "Web Development", "AI Development", "Core Web Vitals", "SEO"
    ],
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Injecting Structured Data into HTML Head for Google Bot */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: `${SITE.name} Developer Portfolio`,
              url: siteUrl,
              description:
                "Portfolio of Malik Kashan — Frontend & WordPress Developer in Lahore, Pakistan.",
              author: { "@type": "Person", name: SITE.name, url: siteUrl },
              inLanguage: "en-US",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-brandBg text-brandInk">
        <LanguageProvider>
          <SiteShell>
            {children}
          </SiteShell>
        </LanguageProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-8WDLQDGS1C" />
    </html>
  );
}
