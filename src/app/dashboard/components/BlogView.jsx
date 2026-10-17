import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogView({ posts, setPosts }) {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brandLine dark:border-slate-700">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brandPrimary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <h2 className="text-sm font-black text-brandInk dark:text-white">Blog Posts <span className="text-brandMuted font-mono text-xs">({posts.length})</span></h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono text-brandMuted">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> {posts.filter(p=>p.status==="Published").length} published
              <span className="w-2 h-2 rounded-full bg-slate-400 inline-block ml-2" /> {posts.filter(p=>p.status==="Draft").length} draft
            </div>
            <button onClick={() => router.push("/dashboard/new-post")}
              className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-brandPrimary hover:bg-brandSecondary px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              New Post
            </button>
          </div>
        </div>
        <div className="divide-y divide-brandLine/40 dark:divide-slate-700/50">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brandInk dark:text-white truncate">{p.title}</p>
                <p className="text-[10px] text-brandMuted font-mono mt-0.5">{p.date} · {p.views > 0 ? `${p.views.toLocaleString()} views` : "No views yet"}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${p.status==="Published"?"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400":"bg-slate-100 dark:bg-slate-800 text-brandMuted"}`}>{p.status}</span>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={()=>setPosts(prev=>prev.map(x=>x.id===p.id?{...x,status:x.status==="Published"?"Draft":"Published"}:x))}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors border ${p.status==="Published"?"border-amber-200 dark:border-amber-800 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20":"border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"}`}>
                  {p.status==="Published"?"Unpublish":"Publish"}
                </button>
                {p.status==="Published" && (
                  <Link href={`/blog/${p.slug}`} target="_blank"
                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-brandLine dark:border-slate-600 text-brandMuted hover:text-brandPrimary hover:border-brandPrimary transition-colors flex items-center gap-1">
                    View
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
