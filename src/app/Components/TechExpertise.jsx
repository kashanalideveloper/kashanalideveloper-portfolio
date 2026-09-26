// src/app/Components/TechExpertise.jsx
export default function TechExpertise() {
  const categories = [
    {
      name: "Frontend Stack",
      skills: ["HTML5", "CSS3 / Tailwind", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js"],
    },
    {
      name: "CMS & E-Commerce",
      skills: ["WordPress", "WooCommerce", "Elementor Pro", "Custom Themes", "Plugin Optimization"],
    },
    {
      name: "Backend & APIs",
      skills: ["Node.js", "REST APIs", "JSON / XML", "Firebase", "Authentication"],
    },
    {
      name: "Development Tools",
      skills: ["Git", "GitHub", "Figma", "Vercel", "Lighthouse / Core Web Vitals"],
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-brandBg border-t border-brandLine font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            Technical Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brandInk uppercase tracking-tight">
            Technology & <span className="text-brandPrimary">Expertise</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light">
            Real, verified tools and frameworks used to build high-performance business websites and applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-brandLine shadow-xs"
            >
              <h3 className="text-sm font-bold text-brandInk uppercase tracking-wider mb-6 pb-3 border-b border-brandLine">
                {cat.name}
              </h3>
              <ul className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-brandMuted font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
