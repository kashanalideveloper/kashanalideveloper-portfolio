"use client";

import { useState, useMemo } from "react";
import { SITE } from "../../lib/site";

const INITIAL_INQUIRIES = [
  { id: 1, name: "Ahmed Siddiqui", email: "ahmed@mail.com", service: "E-Commerce Store", budget: "Rs 180k", status: "New", date: "3 days ago", message: "I need an e-commerce store for my clothing brand with payment gateway integration." },
  { id: 2, name: "Sara Khan", email: "sara@mail.com", service: "Next.js Portfolio", budget: "Rs 90k", status: "Replied", date: "4 days ago", message: "Looking for a professional Next.js portfolio website to showcase my design work." },
  { id: 3, name: "Usman Tariq", email: "usman@mail.com", service: "WordPress Site", budget: "Rs 60k", status: "In Progress", date: "5 days ago", message: "Need a corporate WordPress website with Elementor page builder." },
  { id: 4, name: "Fatima Malik", email: "fatima@mail.com", service: "Web Redesign", budget: "Rs 120k", status: "Closed", date: "6 days ago", message: "Redesign our outdated business website to be mobile responsive and faster." },
  { id: 5, name: "Bilal Hassan", email: "bilal@mail.com", service: "React Dashboard", budget: "Rs 200k", status: "New", date: "7 days ago", message: "Need a React-based admin dashboard with user management and analytics." },
];

const STATUS_STYLE = {
  New: "bg-brandPrimary/10 text-brandPrimary border border-brandPrimary/20",
  Replied: "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400 border border-violet-200 dark:border-violet-800",
  "In Progress": "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-500 border border-amber-200 dark:border-amber-800",
  Closed: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
};

const STATUS_OPTIONS = ["New", "Replied", "In Progress", "Closed"];

const EXCERPT_LEN = 60;

export default function InquiriesView() {
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openStatusId, setOpenStatusId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        inq.name.toLowerCase().includes(search.toLowerCase()) ||
        inq.email.toLowerCase().includes(search.toLowerCase()) ||
        inq.service.toLowerCase().includes(search.toLowerCase()) ||
        inq.message.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [inquiries, search, statusFilter]);

  const counts = useMemo(() => {
    return STATUS_OPTIONS.reduce(
      (acc, s) => {
        acc[s] = inquiries.filter((i) => i.status === s).length;
        return acc;
      },
      { All: inquiries.length }
    );
  }, [inquiries]);

  const handleStatusChange = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    setOpenStatusId(null);
  };

  const handleDelete = (id) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    setConfirmDeleteId(null);
  };

  const handleReply = (inq) => {
    const url = `mailto:${inq.email}?subject=Re:${encodeURIComponent(inq.service)}&body=${encodeURIComponent(`Hi ${inq.name},\n\nThank you for reaching out regarding ${inq.service} (${inq.budget}).\n\nBest regards,\nMalik Kashan\n${SITE.url}`)}`;
    window.open(url, "_blank");
  };

  const excerpt = (text) =>
    text.length > EXCERPT_LEN ? text.slice(0, EXCERPT_LEN) + "…" : text;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brandLine dark:border-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col">
      {/* Header with KPI badges */}
      <div className="px-5 py-4 border-b border-brandLine dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-brandPrimary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <h2 className="text-sm font-black text-brandInk dark:text-white">All Inquiries</h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {STATUS_OPTIONS.concat("All").map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                statusFilter === s
                  ? "bg-brandPrimary text-white border-brandPrimary"
                  : "bg-brandSoft dark:bg-slate-800 text-brandMuted border-brandLine/50 hover:bg-brandPrimary/10 hover:text-brandPrimary"
              }`}
            >
              {s} <span className="opacity-70">{counts[s]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="px-5 py-3 border-b border-brandLine dark:border-slate-700 bg-brandSoft dark:bg-slate-800/40">
        <div className="relative">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brandMuted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            type="text"
            placeholder="Search client, email, service or message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-brandLine dark:border-slate-600 rounded-xl text-brandInk dark:text-white placeholder:text-brandMuted/50 focus:outline-none focus:border-brandPrimary transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brandMuted hover:text-brandPrimary cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-brandLine dark:border-slate-700">
              {[
                "Client",
                "Service",
                "Budget",
                "Date",
                "Status",
                "Message",
                "Action",
              ].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-mono text-brandMuted uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-brandMuted text-sm">
                  <p className="font-medium text-brandInk dark:text-white mb-1">No inquiries found</p>
                  {search ? (
                    <p className="text-[10px]">Try adjusting your search or filter.</p>
                  ) : (
                    <p className="text-[10px]">All clear — no new inquiries at the moment.</p>
                  )}
                </td>
              </tr>
            ) : (
              filtered.map((inq) => (
                <tr
                  key={inq.id}
                  className="border-b border-brandLine/40 dark:border-slate-700/50 hover:bg-brandSoft dark:hover:bg-slate-800 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center text-[9px] font-bold text-brandPrimary font-mono shrink-0">
                        {inq.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-brandInk dark:text-white truncate">{inq.name}</p>
                        <p className="text-[10px] text-brandMuted truncate font-mono">{inq.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-brandInk dark:text-white font-medium">{inq.service}</td>
                  <td className="px-5 py-4 font-semibold text-brandInk dark:text-slate-300">{inq.budget}</td>
                  <td className="px-5 py-4 text-brandMuted font-mono">{inq.date}</td>
                  <td className="px-5 py-4">
                    <div className="relative inline-block">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenStatusId(openStatusId === inq.id ? null : inq.id);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${STATUS_STYLE[inq.status]} flex items-center gap-1 cursor-pointer hover:opacity-90 transition-colors`}
                      >
                        {inq.status}
                        <svg className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      {openStatusId === inq.id && (
                        <div className="absolute bottom-full left-0 mb-1 w-full z-20 bg-white dark:bg-slate-800 border border-brandLine dark:border-slate-700 rounded-xl shadow-lg py-1.5">
                          {STATUS_OPTIONS.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleStatusChange(inq.id, s)}
                              className={`w-full text-left px-3 py-1.5 text-[10px] font-bold border-b border-brandLine/40 dark:border-slate-700/50 last:border-0 transition-colors ${
                                inq.status === s
                                  ? "bg-brandPrimary/10 text-brandPrimary"
                                  : "text-brandMuted hover:bg-brandSoft dark:hover:bg-slate-700 hover:text-brandPrimary cursor-pointer"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-brandMuted text-xs max-w-[200px] truncate font-light leading-snug">
                    {excerpt(inq.message)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReply(inq)}
                        className="p-1.5 text-brandPrimary hover:text-brandInk dark:hover:text-brandPrimary transition-colors cursor-pointer"
                        title="Reply via email"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </button>
                      {confirmDeleteId === inq.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(inq.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="p-1.5 text-brandMuted hover:text-brandInk dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Cancel"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(inq.id)}
                          className="p-1.5 text-brandMuted hover:text-rose-500 dark:hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                          title="Delete inquiry"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer summary */}
      <div className="border-t border-brandLine dark:border-slate-700 bg-brandSoft dark:bg-slate-800/40 px-5 py-3">
        <p className="text-[10px] font-mono text-brandMuted uppercase tracking-wider">
          {filtered.length} of {inquiries.length} inquiries &nbsp;|&nbsp;
          {counts.New} new &nbsp;|&nbsp;
          {counts["In Progress"]} in progress &nbsp;|&nbsp;
          {counts.Replied} replied &nbsp;|&nbsp;
          {counts.Closed} closed
        </p>
      </div>
    </div>
  );
}
