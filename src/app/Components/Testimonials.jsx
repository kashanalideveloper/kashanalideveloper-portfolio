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

  const viewOptions = { once: true, margin: "-60px" };

  const PAGE_SIZE = 3;
  const pages = [];
  for (let i = 0; i < testimonials.length; i += PAGE_SIZE) {
    pages.push(testimonials.slice(i, i + PAGE_SIZE));
  }
  const totalPages = pages.length;

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
      className="relative py-20 sm:py-24 lg:py-28 bg-linear-to-b from-brandBg via-white to-brandBg text-brandInk overflow-hidden border-t border-brandLine scroll-mt-28"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16 text-center items-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/25 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brandPrimary animate-pulse" />
            Verified Client Feedback
          </span>
          <h2
            id={`${componentId}-heading`}
            className="text-3xl sm:text-5xl font-black text-brandInk leading-tight uppercase tracking-tight"
          >
            Trusted By <span className="text-brandPrimary">Founders</span> & Leaders.
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-brandMuted font-light">
            Here is what clients and project stakeholders say about working with Malik Kashan for custom frontend and full-stack development.
          </p>
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
          className="max-w-7xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-3xl bg-white border border-brandLine overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.07)] p-2 sm:p-4">
            {/* Top Accent Gradient Bar */}
            <div
              className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-cyan-500 via-sky-400 to-cyan-600 z-20"
              aria-hidden="true"
            />

            {/* Carousel Slider Track */}
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
              role="tablist"
              aria-label="Testimonial carousel"
            >
              {pages.map((page, p) => (
                <div
                  key={p}
                  className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8"
                  aria-hidden={p !== index}
                >
                  {page.map((t) => (
                    <figure
                      key={t.name}
                      className="relative flex flex-col justify-between rounded-2xl bg-brandBg/60 border border-brandLine/80 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brandPrimary/40 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(8,145,178,0.15)] group"
                    >
                      {/* Top Row: Rating + Project Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="flex items-center gap-1"
                          aria-label={`Rated ${t.rating} out of 5 stars`}
                        >
                          {Array.from({ length: t.rating }).map((_, s) => (
                            <svg
                              key={s}
                              className="w-4 h-4 text-amber-400 drop-shadow-xs"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-brandPrimary bg-brandPrimary/10 px-2.5 py-1 rounded-full border border-brandPrimary/20">
                          {t.project}
                        </span>
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-sm sm:text-[15px] text-brandMuted leading-relaxed font-light mb-8 flex-1">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>

                      {/* Author Info */}
                      <figcaption className="pt-5 border-t border-brandLine flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-brandPrimary/10 border border-brandPrimary/30 flex items-center justify-center text-xs font-bold text-brandPrimary font-mono shrink-0 shadow-xs group-hover:bg-brandPrimary group-hover:text-white transition-all duration-300">
                          {t.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-brandInk tracking-wide truncate group-hover:text-brandPrimary transition-colors duration-200">
                            {t.name}
                          </p>
                          <p className="text-[10px] font-mono text-brandMuted/70 tracking-wider uppercase mt-0.5 truncate">
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
          <div className="flex items-center justify-between mt-8 px-2">
            <p className="font-mono text-xs tracking-widest text-brandMuted uppercase">
              Page <span className="font-bold text-brandInk">{String(index + 1).padStart(2, "0")}</span> of {String(totalPages).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonial page"
                className="w-11 h-11 rounded-full bg-white border border-brandLine flex items-center justify-center text-brandMuted hover:text-brandPrimary hover:border-brandPrimary/50 transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 active:scale-95"
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
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === index
                        ? "w-8 bg-brandPrimary"
                        : "w-2.5 bg-brandPrimary/20 hover:bg-brandPrimary/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonial page"
                className="w-11 h-11 rounded-full bg-white border border-brandLine flex items-center justify-center text-brandMuted hover:text-brandPrimary hover:border-brandPrimary/50 transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 active:scale-95"
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
