export default function TestimonialsView({ testimonials, setTestimonials }) {
  const avg = testimonials.length ? (testimonials.reduce((a,t)=>a+t.rating,0)/testimonials.length).toFixed(1) : "0.0";
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Reviews", value: testimonials.length, color: "text-brandPrimary", bg: "bg-brandPrimary/10" },
          { label: "Approved", value: testimonials.filter(t=>t.approved).length, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Avg. Rating", value: `${avg} ★`, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-mono text-brandMuted uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700 flex items-center gap-2">
          <svg className="w-4 h-4 text-brandPrimary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          <h2 className="text-sm font-black text-brandInk dark:text-white">Client Reviews</h2>
        </div>
        <div className="divide-y divide-brandLine/40 dark:divide-slate-700/50">
          {testimonials.map((t) => (
            <div key={t.id} className="px-5 py-4 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center text-[10px] font-bold text-brandPrimary font-mono shrink-0">{t.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <div>
                      <span className="text-xs font-bold text-brandInk dark:text-white">{t.name}</span>
                      <span className="text-[10px] text-brandMuted ml-2">{t.role}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-amber-400 text-xs">{"★".repeat(t.rating)}{"☆".repeat(5-t.rating)}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${t.approved ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-500"}`}>
                        {t.approved ? "Live" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-brandMuted leading-relaxed mb-2">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-brandMuted">{t.date}</span>
                    <button
                      onClick={() => setTestimonials(prev => prev.map(x => x.id===t.id ? {...x, approved: !x.approved} : x))}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${t.approved ? "border-amber-200 dark:border-amber-800 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20" : "border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"}`}>
                      {t.approved ? "Hide" : "Approve"}
                    </button>
                    <button
                      onClick={() => setTestimonials(prev => prev.filter(x => x.id !== t.id))}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 cursor-pointer transition-colors flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
