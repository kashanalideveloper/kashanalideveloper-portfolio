const INQUIRIES_DATA = [
  { name: "Ahmed Siddiqui", service: "E-Commerce Store", budget: "Rs 180k", status: "New" },
  { name: "Sara Khan", service: "Next.js Portfolio", budget: "Rs 90k", status: "Replied" },
  { name: "Usman Tariq", service: "WordPress Site", budget: "Rs 60k", status: "In Progress" },
  { name: "Fatima Malik", service: "Web Redesign", budget: "Rs 120k", status: "Closed" },
  { name: "Bilal Hassan", service: "React Dashboard", budget: "Rs 200k", status: "New" },
];

const STATUS_STYLE = {
  New: "bg-brandPrimary/10 text-brandPrimary",
  Replied: "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  "In Progress": "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-500",
  Closed: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
};

export default function InquiriesView({ inquiries = INQUIRIES_DATA }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-brandLine dark:border-slate-700">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-brandPrimary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <h2 className="text-sm font-black text-brandInk dark:text-white">All Inquiries</h2>
        </div>
        <span className="text-[10px] font-mono text-brandMuted">{inquiries.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-brandLine dark:border-slate-700">
              {["Client", "Service", "Budget", "Status", "Action"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-mono text-brandMuted uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries.map((row, i) => (
              <tr key={i} className="border-b border-brandLine/40 dark:border-slate-700/50 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-brandInk dark:text-white">{row.name}</td>
                <td className="px-5 py-3.5 text-brandMuted">{row.service}</td>
                <td className="px-5 py-3.5 font-semibold text-brandInk dark:text-slate-300">{row.budget}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="text-brandPrimary text-[10px] font-bold hover:underline cursor-pointer">Reply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
