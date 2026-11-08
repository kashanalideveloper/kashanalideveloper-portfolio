// src/app/Components/Testimonials.jsx
"use client";

import { useId, useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Malik delivered a flawless, high-performance web application ahead of schedule. His attention to detail and pixel-perfect execution exceeded our expectations completely.",
    name: "Ayesha Khan",
    role: "Product Manager, SaaS Startup",
    initials: "AK",
    rating: 5,
    project: "SaaS Dashboard Redesign",
  },
  {
    quote:
      "Working with Malik was seamless. He transformed our complex requirements into a clean, scalable Next.js platform that our users love. Truly a professional.",
    name: "David Ofori",
    role: "Founder, Digital Agency",
    initials: "DO",
    rating: 5,
    project: "Next.js Web Portal",
  },
  {
    quote:
      "Excellent communication and technical depth. Malik rebuilt our dashboard with remarkable speed and the results speak for themselves. Highly recommend hiring him.",
    name: "Muhammad Usman",
    role: "CTO, Enterprise Solutions",
    initials: "MU",
    rating: 5,
    project: "Enterprise Dashboard",
  },
  {
    quote:
      "From the first call to the final launch, everything was organised and transparent. Our e-commerce store now loads twice as fast and sales have jumped. Money well spent.",
    name: "Sarah Ahmed",
    role: "Owner, E-Commerce Store",
    initials: "SA",
    rating: 5,
    project: "E-Commerce Optimization",
  },
  {
    quote:
      "He rebuilt our WordPress site into a modern Next.js experience. SEO rankings improved within weeks and our team can update content effortlessly. Outstanding work.",
    name: "James Carter",
    role: "Marketing Director, UK Agency",
    initials: "JC",
    rating: 5,
    project: "WordPress to Next.js Migration",
  },
  {
    quote:
      "The most reliable developer we have worked with remotely. Clear updates, honest timelines and code that is actually maintainable. We are already planning our next project with him.",
    name: "Fatima Noor",
    role: "Startup Co-Founder, Dubai",
    initials: "FN",
    rating: 5,
    project: "Custom Web App",
  },
];

export default function Testimonials() {
  const componentId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageSize, setPageSize] = useState(1);

  const viewOptions = { once: true, margin: "-60px" };

  const pages = [];
  for (let i = 0; i < testimonials.length; i += pageSize) {
    pages.push(testimonials.slice(i, i + pageSize));
  }
  const totalPages = pages.length;
  const activeIndex = index % totalPages;

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => {
    if (!paused) {
      const autoTimer = setInterval(() => {
        setIndex((prev) => (prev + 1) % totalPages);
      }, 6000);
      return () => clearInterval(autoTimer);
    }
  }, [paused, totalPages]);

  const goTo = (i) => setIndex((i + totalPages) % totalPages);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-brandLine bg-brandBg py-16 text-brandInk scroll-mt-28 sm:py-20 lg:py-24"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}
      aria-labelledby={`${componentId}-heading`}
    >
      {/* Decorative Grid Mesh & Glow */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px),linear-gradient(to_bottom,#0f172a04_1px,transparent_1px)] bg-size-[3rem_3rem] sm:bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brandPrimary/5 blur-[120px] pointer-events-none -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-9 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brandPrimary/25 bg-brandPrimary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-brandPrimary">
              <span className="h-1.5 w-1.5 rounded-full bg-brandPrimary" />
              Client stories
            </span>
            <h2
              id={`${componentId}-heading`}
              className="text-3xl font-bold leading-tight tracking-tight text-brandInk sm:text-4xl lg:text-5xl"
            >
              Good work speaks{" "}
              <span className="text-brandPrimary">for itself.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-brandMuted sm:text-base">
              A few words from the people behind the products, platforms and
              businesses I have worked with.
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-brandLine pt-4 sm:border-l sm:border-t-0 sm:pb-1 sm:pl-5 sm:pt-0">
            <span className="font-mono text-3xl font-semibold tracking-tight text-brandPrimary">
              0{testimonials.length}
            </span>
            <span className="max-w-24 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-brandMuted">
              Client stories
            </span>
          </div>
        </div>

        {/* Testimonial Carousel Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewOptions}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mx-auto max-w-7xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-brandLine bg-white p-2 shadow-[0_2px_8px_rgba(15,23,42,0.03)] dark:bg-brandCard dark:shadow-none sm:p-3">
            {/* Top Accent Gradient Bar */}
            <div
              className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-cyan-500 via-sky-400 to-cyan-600 z-20"
              aria-hidden="true"
            />

            {/* Carousel Slider Track */}
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              aria-roledescription="carousel"
              aria-label="Testimonial carousel"
            >
              {pages.map((page, p) => (
                <div
                  key={p}
                  className="grid w-full shrink-0 grid-cols-1 gap-3 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-3 lg:gap-5 lg:p-5"
                  aria-hidden={p !== activeIndex}
                >
                  {page.map((t) => (
                      <figure
                        key={t.name}
                        className="group relative flex h-full flex-col rounded-2xl border border-brandLine bg-brandBg/70 dark:bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brandPrimary/40 hover:bg-brandCard hover:shadow-[0_4px_12px_-8px_rgba(8,145,178,0.08)] dark:hover:shadow-none sm:p-5 lg:p-6"
                      >
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div
                          className="flex items-center gap-1"
                          aria-label={`Rated ${t.rating} out of 5 stars`}
                        >
                          {Array.from({ length: t.rating }).map((_, s) => (
                            <svg
                              key={s}
                              className="h-3.5 w-3.5 text-amber-400"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="max-w-full rounded-full border border-brandPrimary/20 bg-brandPrimary/10 px-2.5 py-1 text-[9px] font-mono uppercase leading-relaxed tracking-wide text-brandPrimary sm:text-[10px]">
                          {t.project}
                        </span>
                      </div>

                      <div className="mb-3 font-serif text-4xl leading-none text-brandPrimary/40" aria-hidden="true">
                        &ldquo;
                      </div>
                      <blockquote className="mb-7 flex-1 text-sm font-light leading-relaxed text-brandInk/80 dark:text-slate-200 sm:text-[15px]">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>

                      <figcaption className="flex items-center gap-3 border-t border-brandLine pt-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brandPrimary/30 bg-brandPrimary/10 font-mono text-xs font-bold text-brandPrimary transition-colors duration-300 group-hover:bg-brandPrimary group-hover:text-white">
                          {t.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold tracking-wide text-brandInk transition-colors duration-200 group-hover:text-brandPrimary">
                            {t.name}
                          </p>
                          <p className="mt-0.5 truncate text-[10px] font-mono uppercase tracking-wider text-brandMuted/80">
                            {t.role}
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Controls: Arrows + Dots */}
          <div className="mt-5 flex items-center justify-between px-1 sm:mt-6 sm:px-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brandMuted sm:text-xs">
              <span className="font-bold text-brandInk">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1.5 text-brandMuted/50">/</span>
              {String(totalPages).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous testimonial page"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-brandLine bg-white text-brandMuted transition-all duration-200 hover:border-brandPrimary/50 hover:text-brandPrimary active:scale-95 dark:bg-brandCard sm:h-10 sm:w-10"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {pages.map((page, i) => (
                  <button
                    key={page[0].name}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial page ${i + 1}`}
                    className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 bg-brandPrimary"
                        : "w-2.5 bg-brandPrimary/20 hover:bg-brandPrimary/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next testimonial page"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-brandLine bg-white text-brandMuted transition-all duration-200 hover:border-brandPrimary/50 hover:text-brandPrimary active:scale-95 dark:bg-brandCard sm:h-10 sm:w-10"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
