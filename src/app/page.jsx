// src/app/page.jsx
"use client";
import Hero from "./Components/Hero";
import TrustBar from "./Components/TrustBar";
import ServicesPreview from "./Components/ServicesPreview";
import WhyWorkWithMe from "./Components/WhyWorkWithMe";
import Projects from "./Components/Projects";
import Process from "./Components/Process";
import TechExpertise from "./Components/TechExpertise";
import ProjectResults from "./Components/ProjectResults";
import Industries from "./Components/Industries";
import FaqSection from "./Components/FaqSection";
import BlogPreview from "./Components/BlogPreview";
import Testimonials from "./Components/Testimonials";
import FinalCta from "./Components/FinalCta";
import Contact from "./Components/Contact";
import { motion, AnimatePresence } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  const sections = [
    { id: "hero", Component: Hero, extraClass: "mb-20 sm:mb-24" },
    { id: "trustbar", Component: TrustBar, extraClass: "" },
    { id: "services", Component: ServicesPreview, extraClass: "" },
    { id: "why", Component: WhyWorkWithMe, extraClass: "" },
    { id: "projects", Component: Projects, extraClass: "" },
    { id: "process", Component: Process, extraClass: "" },
    { id: "tech", Component: TechExpertise, extraClass: "" },
    { id: "results", Component: ProjectResults, extraClass: "" },
    { id: "industries", Component: Industries, extraClass: "" },
    { id: "faq", Component: FaqSection, extraClass: "" },
    { id: "blog", Component: BlogPreview, extraClass: "" },
    { id: "testimonials", Component: Testimonials, extraClass: "" },
    { id: "cta", Component: FinalCta, extraClass: "" },
    { id: "contact", Component: Contact, extraClass: "" },
  ];

  return (
    <main className="relative bg-brandBg overflow-hidden selection:bg-brandPrimary selection:text-white">
      <AnimatePresence>
        {sections.map((section) => (
          <motion.div
            key={section.id}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className={section.extraClass}
          >
            <section.Component />
          </motion.div>
        ))}
      </AnimatePresence>
    </main>
  );
}
