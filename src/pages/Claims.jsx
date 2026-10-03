import { Link } from 'react-router-dom'
import { ArrowUpRight, ClipboardCheck, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'

export default function Claims() {
  const { items, claims, user } = useApp()
  const mine = claims.filter((claim) => claim.claimantId === user?.id)
  const available = items.filter((item) => item.type === 'found' && item.reporterId !== user?.id && !['Claimed', 'Returned', 'Closed'].includes(item.status))
  return (
    <div className="space-y-7">
      <div><div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand-600"><ClipboardCheck size={15} />Claim center</div><h1 className="page-title">Claims</h1><p className="mt-1 text-sm text-slate-500">Follow up on your claims or find an item that might be yours.</p></div>
      <section className="rounded-2xl border border-slate-100 bg-white shadow-card">
        <div className="border-b border-slate-100 p-5"><h2 className="font-display text-base font-extrabold text-slate-800">Claims you submitted</h2><p className="mt-1 text-xs text-slate-400">The reporter will review your identifying details.</p></div>
        {mine.length ? <div className="divide-y divide-slate-100 px-5">{mine.map((claim) => <div key={claim.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div className="flex items-center gap-3"><img src={items.find((item) => item.id === claim.itemId)?.image} alt="" className="h-12 w-12 rounded-xl object-cover" /><div><p className="text-sm font-bold text-slate-700">{items.find((item) => item.id === claim.itemId)?.name || 'Campus item'}</p><p className="mt-1 text-xs text-slate-400">Submitted {new Date(claim.submittedAt).toLocaleDateString()}</p></div></div><div className="flex items-center gap-3"><StatusBadge status={claim.status} /><Link to={`/items/${claim.itemId}`} className="text-slate-400 hover:text-brand-600"><ArrowUpRight size={17} /></Link></div></div>)}</div> : <div className="p-5"><EmptyState title="No claims submitted" description="If you recognize something in the found items list, submit a claim with identifying details." /></div>}
      </section>
      <section>
        <div className="mb-4 flex items-end justify-between"><div><h2 className="font-display text-lg font-extrabold text-slate-800">Found items you can claim</h2><p className="mt-1 text-xs text-slate-500">Items reported by other members of the campus community.</p></div><Link to="/found-items" className="hidden text-xs font-bold text-brand-600 sm:block">Browse all found items</Link></div>
        {available.length ? <div className="grid gap-3 md:grid-cols-2">{available.slice(0, 4).map((item) => <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-card"><img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">{item.name}</p><p className="mt-1 text-xs text-slate-500">{item.location} · {item.category}</p><div className="mt-2"><StatusBadge status={item.status} /></div></div><Link to={`/items/${item.id}`} aria-label={`View ${item.name}`} className="rounded-xl p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-600"><Search size={16} /></Link></div>)}</div> : <EmptyState title="No claimable items right now" description="Check back as your campus community reports found items." />}
      </section>
    </div>
  )
}
