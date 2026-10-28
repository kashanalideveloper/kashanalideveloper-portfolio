// src/app/page.jsx
import dynamic from "next/dynamic";
import Hero from "./Components/Hero";
import TrustBar from "./Components/TrustBar";
import ServicesPreview from "./Components/ServicesPreview";
import Contact from "./Components/Contact";

// Below-the-fold sections are code-split: their JS only loads when the
// browser is idle, so the hero renders with a much smaller initial bundle.
const WhyWorkWithMe = dynamic(() => import("./Components/WhyWorkWithMe"));
const Projects = dynamic(() => import("./Components/Projects"));
const Process = dynamic(() => import("./Components/Process"));
const TechExpertise = dynamic(() => import("./Components/TechExpertise"));
const ProjectResults = dynamic(() => import("./Components/ProjectResults"));
const Industries = dynamic(() => import("./Components/Industries"));
const FaqSection = dynamic(() => import("./Components/FaqSection"));
const BlogPreview = dynamic(() => import("./Components/BlogPreview"));
const Testimonials = dynamic(() => import("./Components/Testimonials"));
const FinalCta = dynamic(() => import("./Components/FinalCta"));

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
      {sections.map((section) => (
        <div key={section.id} className={section.extraClass}>
          <section.Component />
        </div>
      ))}
    </main>
  );
}
