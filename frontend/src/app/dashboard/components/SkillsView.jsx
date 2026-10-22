export default function SkillsView({ skills, setSkills }) {
  const categories = ["Frontend", "Backend", "CMS/Platform", "Tools"];
  return (
    <div className="space-y-5">
      {categories.map((cat) => {
        const catSkills = skills.filter(s => s.category === cat);
        return (
          <div key={cat} className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
            <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brandPrimary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                <h2 className="text-sm font-black text-brandInk dark:text-white">{cat}</h2>
              </div>
              <span className="text-[10px] font-mono text-brandMuted">{catSkills.length} skills</span>
            </div>
            <div className="p-5 space-y-3">
              {catSkills.map((sk) => (
                <div key={sk.id} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-brandInk dark:text-white w-32 shrink-0">{sk.name}</span>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-brandLine dark:bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${sk.level >= 90 ? "bg-emerald-500" : sk.level >= 75 ? "bg-brandPrimary" : "bg-amber-500"}`}
                        style={{width:`${sk.level}%`}}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-brandMuted w-7 text-right">{sk.level}%</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => setSkills(prev => prev.map(x => x.id===sk.id ? {...x, level: Math.min(100, x.level+5)} : x))}
                      className="text-[9px] px-2 py-1 rounded-lg bg-brandPrimary/10 text-brandPrimary font-bold hover:bg-brandPrimary/20 cursor-pointer transition-colors">+5</button>
                    <button
                      onClick={() => setSkills(prev => prev.map(x => x.id===sk.id ? {...x, level: Math.max(0, x.level-5)} : x))}
                      className="text-[9px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-brandMuted font-bold hover:bg-slate-200 cursor-pointer transition-colors">-5</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
