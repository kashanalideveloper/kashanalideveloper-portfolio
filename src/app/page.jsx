// src/app/page.jsx
import Hero from "./Components/Hero";
import TrustBar from "./Components/TrustBar";
import ServicesPreview from "./Components/ServicesPreview";
import WhyWorkWithMe from "./Components/WhyWorkWithMe";
import Projects from "./Components/Projects";
import Process from "./Components/Process";
import TechExpertise from "./Components/TechExpertise";
import ProjectResults from "./Components/ProjectResults";
import Industries from "./Components/Industries";
import About from "./Components/About";
import FaqSection from "./Components/FaqSection";
import BlogPreview from "./Components/BlogPreview";
import Contact from "./Components/Contact";

export default function Home() {
  return (
    <main className="relative bg-brandBg overflow-hidden selection:bg-brandPrimary selection:text-white">
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <WhyWorkWithMe />
      <Projects />
      <Process />
      <TechExpertise />
      <ProjectResults />
      <Industries />
      <About />
      <FaqSection />
      <BlogPreview />
      <Contact />
    </main>
  );
}
