const statusStyles = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  Matching: 'bg-violet-50 text-violet-700 ring-violet-200',
  Claimed: 'bg-sky-50 text-sky-700 ring-sky-200',
  Returned: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Closed: 'bg-slate-100 text-slate-600 ring-slate-200',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 ring-rose-200',
  Lost: 'bg-rose-50 text-rose-700 ring-rose-200',
  Found: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export default function StatusBadge({ status }) {
  const label = status || 'Pending'
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${statusStyles[label] || statusStyles.Pending}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{label}</span>
}
