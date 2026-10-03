export default function DashboardCard({ label, value, icon: Icon, tone = 'violet', detail }) {
  const tones = {
    violet: 'bg-violet-50 text-violet-600',
    blue: 'bg-sky-50 text-sky-600',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  }
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-800">{value}</p></div>
        <span className={`rounded-2xl p-3 ${tones[tone] || tones.violet}`}><Icon size={21} /></span>
      </div>
      {detail && <p className="mt-3 text-xs text-slate-400">{detail}</p>}
    </div>
  )
}
