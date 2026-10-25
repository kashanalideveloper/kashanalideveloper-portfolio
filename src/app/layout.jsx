// src/app/layout.jsx
import "./globals.css";
import SiteShell from "./Components/SiteShell";
import { LanguageProvider } from "./Components/LanguageContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SITE } from "./lib/site";

import { Poppins } from "next/font/google";

// Self-hosted Poppins (Google Fonts) — no external network requests at runtime.
// Montserrat/Arial act as system fallbacks defined in globals.css.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
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
    "Malik Kashan - Web Developer in Lahore, Pakistan. Next.js & Shopify expert building fast, custom web solutions.",
keywords: [
    "malik kashan portfolio",
    "kashan ali web developer",
    "web developer in Lahore Pakistan",
    "Shopify developer in Pakistan",
    "Next.js developer Pakistan",
    "frontend developer Lahore",
    "freelance web developer Pakistan",
    "React developer portfolio",
    "Shopify store developer",
    "Malik Kashan",
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
