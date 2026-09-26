// src/app/services/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "../../lib/services-data";
import { SITE, whatsappLink } from "../../lib/site";
import PageHeader from "../../Components/PageHeader";

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = `${service.title} | Malik Kashan`;
  const description = service.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}services/${slug}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: ["Pakistan", "Worldwide"],
    serviceType: service.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        badge={service.eyebrow}
        title={service.title}
        highlight="Expertise"
        description={service.description}
      />

      <main className="relative bg-brandBg pb-20 font-sans">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* Problem vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-3xl bg-white border border-brandLine shadow-xs">
              <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                The Business Problem
              </span>
              <p className="text-brandMuted text-sm sm:text-base leading-relaxed font-light">
                {service.problem}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-brandPrimary/30 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandPrimary/10 blur-3xl pointer-events-none" />
              <span className="inline-block px-3 py-1 rounded-full bg-brandPrimary/10 text-brandPrimary border border-brandPrimary/20 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                My Solution
              </span>
              <p className="text-brandInk text-sm sm:text-base leading-relaxed font-normal">
                {service.solution}
              </p>
            </div>
          </div>

          {/* Deliverables Section */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brandInk uppercase tracking-tight mb-8 text-center">
              What Is <span className="text-brandPrimary">Delivered</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-brandLine flex items-start gap-3.5 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-brandPrimary/10 text-brandPrimary flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-brandInk text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brandInk uppercase tracking-tight mb-8 text-center">
              Development <span className="text-brandPrimary">Process</span>
            </h2>
            <div className="space-y-4">
              {service.process.map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-brandLine flex items-center gap-6 shadow-xs">
                  <span className="text-lg font-mono font-bold text-brandPrimary">
                    {`0${idx + 1}`}
                  </span>
                  <span className="text-brandInk text-sm sm:text-base font-medium">
                    {step.replace(/^0\d\s\w+:\s/, "")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brandInk uppercase tracking-tight mb-6 text-center">
              Technology <span className="text-brandPrimary">Stack</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {service.technology.map((tech, idx) => (
                <span key={idx} className="px-5 py-2.5 rounded-xl bg-white border border-brandLine text-brandInk font-mono text-xs uppercase tracking-wider shadow-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brandInk uppercase tracking-tight mb-8 text-center">
                Frequently Asked <span className="text-brandPrimary">Questions</span>
              </h2>
              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-brandLine shadow-xs">
                    <h3 className="text-base font-bold text-brandInk mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-brandMuted text-sm font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="rounded-3xl bg-white border border-brandLine p-8 sm:p-12 text-center shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brandInk uppercase tracking-tight mb-3">
              Ready to Start Your <span className="text-brandPrimary">Project?</span>
            </h2>
            <p className="text-brandMuted text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-8">
              Let&apos;s discuss your requirements and build a high-performance solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-brandPrimary text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-brandPrimary/20 hover:bg-brandSecondary transition-all"
              >
                Start Your Project
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white text-brandInk text-xs font-bold uppercase tracking-widest rounded-xl border border-brandLine hover:border-[#25D366] hover:text-[#25D366] transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
