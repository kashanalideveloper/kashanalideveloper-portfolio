// src/app/Components/Industries.jsx
export default function Industries() {
  const industries = [
    { title: "Startups", desc: "Building fast MVPs, scalable web apps, and modern landing pages to attract investors and users." },
    { title: "Small Businesses", desc: "Professional business websites that establish credibility and turn local or online traffic into leads." },
    { title: "Digital & Creative Agencies", desc: "Reliable frontend and WordPress development partnership to handle client overflow with precision." },
    { title: "E-Commerce Stores", desc: "High-converting WooCommerce and online storefronts designed for secure checkout and fast browsing." },
    { title: "SaaS Companies", desc: "Interactive dashboards, user portals, and high-performance marketing sites built with Next.js." },
    { title: "Professional Services", desc: "Law firms, consultants, clinics, and service providers looking to elevate their digital presence." },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-brandLine font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-[11px] font-mono tracking-widest text-brandPrimary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
            Client Spectrum
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brandInk uppercase tracking-tight">
            Who I <span className="text-brandPrimary">Work With</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brandMuted font-light">
            Collaborating with ambitious founders, growing businesses, and agencies worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-brandBg border border-brandLine hover:border-brandPrimary/40 transition-all duration-300"
            >
              <h3 className="text-base sm:text-lg font-bold text-brandInk uppercase tracking-wide mb-2">
                {ind.title}
              </h3>
              <p className="text-brandMuted text-xs sm:text-sm leading-relaxed font-light">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
