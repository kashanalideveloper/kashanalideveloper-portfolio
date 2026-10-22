export default function ServicesView({ services, setServices }) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brandLine dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brandPrimary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              <h2 className="text-sm font-black text-brandInk dark:text-white">Services <span className="text-brandMuted font-mono text-xs">({services.length})</span></h2>
            </div>
            <p className="text-[10px] text-brandMuted mt-0.5 ml-6">Manage services shown on your portfolio</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-brandMuted">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />{services.filter(s=>s.active).length} active
            <span className="w-2 h-2 rounded-full bg-slate-400 inline-block ml-2" />{services.filter(s=>!s.active).length} hidden
          </div>
        </div>
        <div className="divide-y divide-brandLine/40 dark:divide-slate-700/50">
          {services.map((s) => (
            <div key={s.id} className="flex items-start gap-4 px-5 py-4 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brandPrimary/8 flex items-center justify-center text-lg shrink-0">{s.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-brandInk dark:text-white">{s.title}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${s.active ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-brandMuted"}`}>
                    {s.active ? "Active" : "Hidden"}
                  </span>
                </div>
                <p className="text-[11px] text-brandMuted leading-relaxed mb-1.5">{s.desc}</p>
                <div className="flex gap-3 text-[10px] font-mono text-brandMuted">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{s.price}</span>
                  <span>·</span>
                  <span>{s.delivery}</span>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0 mt-0.5">
                <button
                  onClick={() => setServices(prev => prev.map(x => x.id===s.id ? {...x, active: !x.active} : x))}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors border ${s.active ? "border-amber-200 dark:border-amber-800 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20" : "border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"}`}>
                  {s.active ? "Hide" : "Show"}
                </button>
                <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-brandLine dark:border-slate-600 text-brandMuted hover:text-brandPrimary hover:border-brandPrimary cursor-pointer transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] text-brandMuted font-mono">Changes sync to your portfolio after redeployment.</p>
    </div>
  );
}
