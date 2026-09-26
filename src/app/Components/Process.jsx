// src/app/Components/Process.jsx
export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We discuss your business model, target audience, project goals, and exact functional requirements.",
    },
    {
      num: "02",
      title: "Planning & Design",
      desc: "Mapping out user flows, wireframes, and UI design mockups tailored to your brand identity.",
    },
    {
      num: "03",
      title: "Development",
      desc: "Writing clean, modular code with Next.js, React, or custom WordPress configurations.",
    },
    {
      num: "04",
      title: "Testing",
      desc: "Rigorous cross-browser checks, responsiveness testing, speed tuning, and security audits.",
    },
    {
      num: "05",
      title: "Launch",
      desc: "Smooth production deployment, domain setup, DNS configuration, and SEO index verification.",
    },
    {
      num: "06",
      title: "Support",
      desc: "Content handover training, ongoing maintenance, and responsive technical support whenever needed.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-brandLine font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            Transparent Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brandInk uppercase tracking-tight">
            How We <span className="text-brandPrimary">Work Together</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light">
            A structured, reliable process designed to eliminate uncertainty and deliver exceptional results on time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-3xl bg-brandBg border border-brandLine flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black font-mono text-brandPrimary/30">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-brandInk uppercase tracking-wide mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-brandMuted text-xs sm:text-sm leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
