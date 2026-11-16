// src/app/projects/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECT_DATA, LIVE_DEMO_URL_PLACEHOLDER } from "../../lib/projects";
import { SITE } from "../../lib/site";
import PageHeader from "../../Components/PageHeader";

export async function generateStaticParams() {
  return PROJECT_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECT_DATA.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Malik Kashan Portfolio`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Malik Kashan`,
      description: project.description,
      url: `${SITE.url}projects/${project.slug}`,
      type: "article",
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = PROJECT_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const hasLiveDemo =
    project.liveDemo &&
    project.liveDemo !== LIVE_DEMO_URL_PLACEHOLDER &&
    project.liveDemo !== "";

  return (
    <>
      <PageHeader
        badge={project.category}
        title={project.title}
        highlight="Project Details"
        description={project.description}
      />

      <main className="relative bg-brandBg pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brandPrimary hover:underline"
            >
              <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Back to All Projects
            </Link>
          </div>

          <div className="rounded-3xl bg-white border border-brandLine overflow-hidden shadow-xl mb-12">
            <div className="relative aspect-16/9 w-full bg-brandSoft">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>

            <div className="p-8 sm:p-12">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-brandLine">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-brandPrimary/10 text-brandPrimary border border-brandPrimary/20 uppercase mb-3">
                    {project.category}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black text-brandInk uppercase tracking-tight">
                    {project.title}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  {hasLiveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brandPrimary text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-brandPrimary/25 hover:bg-brandSecondary transition-all"
                    >
                      Live Demo
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-brandLine text-brandMuted font-semibold text-xs tracking-wider uppercase hover:bg-brandPrimary/10 hover:text-brandPrimary hover:border-brandPrimary/30 transition-all"
                    >
                      GitHub Code
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-brandInk uppercase tracking-wide mb-3">
                    Overview
                  </h2>
                  <p className="text-brandMuted text-base leading-relaxed font-light">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {project.features && project.features.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-brandInk uppercase tracking-wide mb-4">
                      Key Features
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-brandMuted">
                          <svg className="w-4 h-4 text-brandPrimary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.challenge && (
                  <div>
                    <h2 className="text-lg font-bold text-brandInk uppercase tracking-wide mb-3">
                      The Challenge
                    </h2>
                    <p className="text-brandMuted text-sm sm:text-base leading-relaxed font-light">
                      {project.challenge}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div>
                    <h2 className="text-lg font-bold text-brandInk uppercase tracking-wide mb-3">
                      The Solution
                    </h2>
                    <p className="text-brandMuted text-sm sm:text-base leading-relaxed font-light">
                      {project.solution}
                    </p>
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-bold text-brandInk uppercase tracking-wide mb-3">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono bg-brandSoft text-brandMuted px-3 py-1.5 rounded-lg border border-brandLine tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
