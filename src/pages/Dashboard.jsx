import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CircleCheck, Clock3, Compass, FilePlus2, Package, Plus, Search, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import DashboardCard from '../components/DashboardCard'
import ItemCard from '../components/ItemCard'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'

export default function Dashboard() {
  const { user, items } = useApp()
  const lost = items.filter((item) => item.type === 'lost')
  const found = items.filter((item) => item.type === 'found')
  const recovered = items.filter((item) => item.status === 'Returned').length
  const mine = items.filter((item) => item.reporterId === user?.id).length
  const recent = [...items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#29256d] via-[#4338ca] to-[#7168f8] p-6 text-white shadow-lg shadow-indigo-100 sm:p-8">
        <div className="absolute -right-10 -top-28 h-72 w-72 rounded-full border-[35px] border-white/[.06]" /><div className="absolute right-40 top-24 h-32 w-32 rounded-full bg-white/[.06] blur-2xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-indigo-100"><Sparkles size={13} /> YOUR CAMPUS COMMUNITY</span>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Good to see you, {user?.name?.split(' ')[0]}.</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">Every found item has a story. Let’s help it find its way home.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link to="/report-lost"><Button variant="secondary" icon={Plus} className="border-0">Report a lost item</Button></Link><Link to="/lost-items"><Button className="border border-white/25 bg-white/10 text-white hover:bg-white/20" icon={Search}>Browse items</Button></Link></div>
        </div>
        <Compass className="absolute bottom-4 right-8 hidden h-28 w-28 text-white/10 sm:block" strokeWidth={1} />
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="Lost items" value={lost.length} icon={Package} tone="violet" detail="Items still being looked for" />
        <DashboardCard label="Found items" value={found.length} icon={Compass} tone="blue" detail="Ready to be reunited" />
        <DashboardCard label="Items returned" value={recovered} icon={CircleCheck} tone="green" detail="Successfully back with their owners" />
        <DashboardCard label="My reports" value={mine} icon={Clock3} tone="amber" detail="Items you have shared with campus" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_290px]">
        <div>
          <div className="mb-4 flex items-end justify-between"><div><h2 className="font-display text-xl font-extrabold text-slate-800">Recent campus activity</h2><p className="mt-1 text-xs text-slate-500">The latest items reported by your community.</p></div><Link to="/found-items" className="hidden items-center gap-1 text-xs font-bold text-brand-600 sm:flex">View all <ArrowRight size={14} /></Link></div>
          {recent.length ? <div className="grid gap-4 sm:grid-cols-2">{recent.map((item) => <ItemCard key={item.id} item={item} />)}</div> : <EmptyState title="No items reported yet" description="Be the first to help your campus community." />}
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"><div className="flex items-center gap-2"><span className="rounded-lg bg-brand-50 p-2 text-brand-600"><FilePlus2 size={17} /></span><h3 className="font-display text-sm font-extrabold text-slate-800">Quick actions</h3></div><div className="mt-4 space-y-2">
            {[['Report lost item', '/report-lost', 'A few details can help it turn up.'], ['Report found item', '/report-found', 'Help someone get their item back.'], ['Browse campus items', '/found-items', 'Search what the community found.']].map(([label, to, desc]) => <Link to={to} key={to} className="group flex items-center justify-between rounded-xl border border-slate-100 p-3 transition hover:border-brand-100 hover:bg-brand-50/40"><span><span className="block text-xs font-bold text-slate-700">{label}</span><span className="mt-1 block text-[10px] text-slate-400">{desc}</span></span><ArrowUpRight size={16} className="text-slate-300 group-hover:text-brand-600" /></Link>)}
          </div></div>
          <div className="rounded-2xl bg-[#f0efff] p-5"><p className="font-display text-sm font-extrabold text-brand-900">Good to know</p><p className="mt-2 text-xs leading-5 text-brand-900/70">Found an item? Keep it safe and meet claimants at a public campus location.</p><Link to="/help" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-700">Community guidelines <ArrowRight size={13} /></Link></div>
          <Link to="/my-reports" className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-card"><span><span className="block text-xs font-bold text-slate-700">Track your reports</span><span className="mt-1 block text-[10px] text-slate-400">See the latest status updates</span></span><ArrowRight size={17} className="text-brand-600" /></Link>
        </aside>
      </section>
    </div>
  )
}
