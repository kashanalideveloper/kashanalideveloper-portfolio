// src/app/layout.jsx
import "./globals.css";
import SiteShell from "./Components/SiteShell";
import { LanguageProvider } from "./Components/LanguageContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { SITE } from "./lib/site";

import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#071018" },
  ],
};

export const metadata = {
  title: {
    default: "Malik Kashan | Web Developer in Lahore, Pakistan",
    template: "%s | Malik Kashan",
  },
  description:
    "Malik Kashan is a Lahore-based web developer specializing in Next.js, React, WordPress and Shopify. Explore web projects and get in touch about a fast, responsive website.",
  keywords: [
    "Malik Kashan web developer",
    "web developer in Lahore Pakistan",
    "freelance web developer Pakistan",
    "Next.js developer for hire",
    "React developer Pakistan",
    "WordPress developer Lahore",
    "Shopify developer Pakistan",
    "custom web application development",
    "website performance optimization",
    "SEO-friendly web development",
    "hire remote frontend developer",
    "full stack web developer Pakistan",
    "affordable web design agency",
    "top web developer Lahore",
    "hire React.js developer USA UK",
    "front-end development services Lahore Karachi Islamabad",
    "AI web development services Pakistan",
    "WooCommerce and Shopify expert Pakistan",
    "Core Web Vitals optimization specialist",
    "hire freelance web designer Pakistan",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: "Malik Kashan",
  publisher: "Malik Kashan",
  applicationName: "Malik Kashan Developer Portfolio",
  category: "Web Development Portfolio",
  metadataBase: new URL(SITE.url),

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
    canonical: "./",
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
    title: "Malik Kashan | Web Developer in Lahore, Pakistan",
    description:
      "Explore Next.js, React, WordPress and Shopify projects by Malik Kashan, a web developer based in Lahore, Pakistan.",
    url: SITE.url,
    siteName: "Malik Kashan Developer Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Malik Kashan, web developer in Lahore, Pakistan",
      },
    ],
    locale: "en_US",
    type: "profile",
  },

  twitter: {
    card: "summary_large_image",
    title: "Malik Kashan | Web Developer in Lahore, Pakistan",
    description:
      "Next.js, React, WordPress and Shopify projects by Malik Kashan, a web developer based in Lahore, Pakistan.",
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
    sameAs: [
      SITE.github,
      "https://www.linkedin.com/in/kashan-ali-62401a420/",
    ],
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
      SITE.github,
      "https://www.linkedin.com/in/kashan-ali-62401a420/",
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
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="JRt/iijwZuJNXE1CnFms7A"
          async
          strategy="afterInteractive"
        />
      </body>
      <GoogleAnalytics gaId="G-8WDLQDGS1C" />
    </html>
  );
}
