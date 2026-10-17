import { useRouter } from "next/navigation";

const PROJ_STATUS_STYLE = {
  Planning:      "bg-slate-100 dark:bg-slate-800 text-brandMuted",
  "In Progress": "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  Review:        "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  Completed:     "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
};

export default function ProjectsView({ projects, setProjects }) {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brandLine dark:border-slate-700">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brandPrimary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            <h2 className="text-sm font-black text-brandInk dark:text-white">All Projects <span className="text-brandMuted font-mono text-xs">({projects.length})</span></h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono text-brandMuted">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> {projects.filter(p=>p.status==="Completed").length} done
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block ml-2" /> {projects.filter(p=>p.status==="In Progress").length} active
            </div>
            <button onClick={() => router.push("/dashboard/new-project")}
              className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-brandPrimary hover:bg-brandSecondary px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              New Project
            </button>
          </div>
        </div>
        <div className="divide-y divide-brandLine/40 dark:divide-slate-700/50">
          {projects.map((p) => (
            <div key={p.id} className="px-5 py-4 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-brandInk dark:text-white truncate">{p.name}</p>
                  <p className="text-[10px] text-brandMuted mt-0.5">{p.client} · <span className="font-mono">{p.tech}</span> · Due {p.deadline}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{p.budget}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${PROJ_STATUS_STYLE[p.status]}`}>{p.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-brandLine dark:bg-slate-700 overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${p.progress===100?"bg-emerald-500":p.progress>=60?"bg-brandPrimary":"bg-amber-500"}`} style={{width:`${p.progress}%`}} />
                </div>
                <span className="text-[10px] font-mono text-brandMuted w-8 text-right">{p.progress}%</span>
                <div className="flex gap-1">
                  <button onClick={()=>setProjects(prev=>prev.map(x=>x.id===p.id?{...x,progress:Math.min(100,x.progress+10),status:x.progress+10>=100?"Completed":x.progress+10>=60?"In Progress":x.status}:x))}
                    className="text-[9px] px-2 py-1 rounded-lg bg-brandPrimary/10 text-brandPrimary font-bold hover:bg-brandPrimary/20 cursor-pointer transition-colors">+10%</button>
                  <button onClick={()=>setProjects(prev=>prev.map(x=>x.id===p.id?{...x,status:x.status==="Completed"?"In Progress":"Completed",progress:x.status==="Completed"?x.progress:100}:x))}
                    className="text-[9px] px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-100 cursor-pointer transition-colors">
                    {p.status==="Completed"?"Reopen":"Done"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
