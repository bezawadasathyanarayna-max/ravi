import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText, Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'
import { formatDate } from '../components/ItemCard'

const tabs = ['All reports', 'Lost', 'Found']

export default function MyReports() {
  const { items, claims, user } = useApp()
  const [active, setActive] = useState(tabs[0])
  const mine = items.filter((item) => item.reporterId === user?.id && (active === 'All reports' || item.type === active.toLowerCase()))
  const myClaims = claims.filter((claim) => claim.claimantId === user?.id)
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand-600"><FileText size={15} />Your activity</div><h1 className="page-title">My reports</h1><p className="mt-1 text-sm text-slate-500">Keep track of items you’ve reported and claimed.</p></div><Link to="/report-lost"><Button icon={Plus}>New report</Button></Link></div>
      <div className="grid gap-4 sm:grid-cols-3"><Summary label="Lost reports" value={items.filter((item) => item.reporterId === user?.id && item.type === 'lost').length} /><Summary label="Found reports" value={items.filter((item) => item.reporterId === user?.id && item.type === 'found').length} /><Summary label="Claims submitted" value={myClaims.length} /></div>
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5"><div><h2 className="font-display text-base font-extrabold text-slate-800">My item reports</h2><p className="mt-1 text-xs text-slate-400">Status updates for reports submitted by you.</p></div><div className="flex rounded-xl bg-slate-100 p-1">{tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={`rounded-lg px-3 py-2 text-[11px] font-bold transition ${active === tab ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}>{tab}</button>)}</div></div>
        {mine.length ? <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Item</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Location</th><th className="px-5 py-3">Reported</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"></th></tr></thead><tbody className="divide-y divide-slate-100">{mine.map((item) => <tr key={item.id} className="text-xs"><td className="px-5 py-3.5"><div className="flex items-center gap-3"><img src={item.image} alt="" className="h-10 w-10 rounded-xl object-cover" /><span className="font-bold text-slate-700">{item.name}</span></div></td><td className="px-5 py-3.5 capitalize text-slate-500">{item.type}</td><td className="px-5 py-3.5 text-slate-500">{item.location}</td><td className="px-5 py-3.5 text-slate-500">{formatDate(item.date)}</td><td className="px-5 py-3.5"><StatusBadge status={item.status} /></td><td className="px-5 py-3.5"><Link to={`/items/${item.id}`} aria-label={`View ${item.name}`} className="text-slate-400 hover:text-brand-600"><ArrowUpRight size={16} /></Link></td></tr>)}</tbody></table></div> : <div className="p-5"><EmptyState title={active === 'All reports' ? 'No reports yet' : `No ${active.toLowerCase()} reports yet`} description="When you report an item, you’ll find status updates here." action={<Link to="/report-lost"><Button>Report an item</Button></Link>} /></div>}
      </section>
      {myClaims.length > 0 && <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"><h2 className="font-display text-base font-extrabold text-slate-800">My claims</h2><div className="mt-4 divide-y divide-slate-100">{myClaims.map((claim) => <div key={claim.id} className="flex items-center justify-between py-3"><div><p className="text-sm font-semibold text-slate-700">{items.find((item) => item.id === claim.itemId)?.name || 'Campus item'}</p><p className="mt-1 text-xs text-slate-400">Submitted {new Date(claim.submittedAt).toLocaleDateString()}</p></div><StatusBadge status={claim.status} /></div>)}</div></section>}
    </div>
  )
}

function Summary({ label, value }) {
  return <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card"><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 font-display text-2xl font-extrabold text-slate-800">{value}</p></div>
}
