import { useState } from 'react'
import { Activity, CheckCircle2, Clock3, Package, ShieldCheck, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import DashboardCard from '../components/DashboardCard'
import StatusBadge from '../components/StatusBadge'
import { formatDate } from '../components/ItemCard'

const itemStatuses = ['Pending', 'Matching', 'Claimed', 'Returned', 'Closed']
const claimStatuses = ['Pending', 'Approved', 'Rejected']

export default function AdminDashboard() {
  const { users, items, claims, updateItemStatus, updateClaimStatus, notify } = useApp()
  const [tab, setTab] = useState('reports')
  const recent = [...items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)
  const setItemStatus = (item, status) => {
    updateItemStatus(item.id, status)
    notify(`${item.name} status updated to ${status}.`)
  }
  const setClaimStatus = (claim, status) => {
    updateClaimStatus(claim.id, status)
    notify(`Claim ${status.toLowerCase()}.`)
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand-600"><ShieldCheck size={15} />Campus operations</div><h1 className="page-title">Admin dashboard</h1><p className="mt-1 text-sm text-slate-500">Review campus activity and help items find their way home.</p></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">● System active</span></div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardCard label="Total users" value={users.length} icon={Users} tone="violet" />
        <DashboardCard label="Lost items" value={items.filter((item) => item.type === 'lost').length} icon={Package} tone="amber" />
        <DashboardCard label="Found items" value={items.filter((item) => item.type === 'found').length} icon={Activity} tone="blue" />
        <DashboardCard label="Pending claims" value={claims.filter((claim) => claim.status === 'Pending').length} icon={Clock3} tone="amber" />
        <DashboardCard label="Returned" value={items.filter((item) => item.status === 'Returned').length} icon={CheckCircle2} tone="green" />
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5"><div><h2 className="font-display text-base font-extrabold text-slate-800">Manage campus activity</h2><p className="mt-1 text-xs text-slate-400">Review reports, claims, and registered accounts.</p></div><div className="flex rounded-xl bg-slate-100 p-1">{[['reports', 'Manage reports'], ['claims', 'Manage claims'], ['users', 'Manage users']].map(([key, label]) => <button key={key} onClick={() => setTab(key)} className={`rounded-lg px-3 py-2 text-[11px] font-bold transition ${tab === key ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}>{label}</button>)}</div></div>
        {tab === 'reports' && <div className="overflow-x-auto"><table className="w-full min-w-[770px] text-left"><thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Report</th><th className="px-5 py-3">Reporter</th><th className="px-5 py-3">Location</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Update status</th></tr></thead><tbody className="divide-y divide-slate-100">{recent.map((item) => <tr key={item.id} className="text-xs"><td className="px-5 py-3"><div className="flex items-center gap-3"><img src={item.image} alt="" className="h-9 w-9 rounded-lg object-cover" /><div><p className="font-bold text-slate-700">{item.name}</p><p className="mt-1 capitalize text-slate-400">{item.type} · {item.category}</p></div></div></td><td className="px-5 py-3 text-slate-500">{item.reportedBy}</td><td className="px-5 py-3 text-slate-500">{item.location}</td><td className="px-5 py-3 text-slate-500">{formatDate(item.date)}</td><td className="px-5 py-3"><StatusBadge status={item.status} /></td><td className="px-5 py-3"><select aria-label={`Update ${item.name} status`} value={item.status} onChange={(event) => setItemStatus(item, event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] text-slate-600 outline-none focus:border-brand-500">{itemStatuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table></div>}
        {tab === 'claims' && <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left"><thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Item</th><th className="px-5 py-3">Claimant</th><th className="px-5 py-3">Submitted</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Review</th></tr></thead><tbody className="divide-y divide-slate-100">{claims.map((claim) => <tr key={claim.id} className="text-xs"><td className="px-5 py-3 font-bold text-slate-700">{items.find((item) => item.id === claim.itemId)?.name || 'Removed item'}<p className="mt-1 max-w-xs truncate font-normal text-slate-400">{claim.reason}</p></td><td className="px-5 py-3 text-slate-500">{claim.claimantName}</td><td className="px-5 py-3 text-slate-500">{new Date(claim.submittedAt).toLocaleDateString()}</td><td className="px-5 py-3"><StatusBadge status={claim.status} /></td><td className="px-5 py-3"><select aria-label={`Review claim by ${claim.claimantName}`} value={claim.status} onChange={(event) => setClaimStatus(claim, event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] text-slate-600 outline-none focus:border-brand-500">{claimStatuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table>{claims.length === 0 && <p className="p-8 text-center text-sm text-slate-400">No claims have been submitted.</p>}</div>}
        {tab === 'users' && <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">Student ID</th><th className="px-5 py-3">College email</th><th className="px-5 py-3">Department</th><th className="px-5 py-3">Role</th></tr></thead><tbody className="divide-y divide-slate-100">{users.map((entry) => <tr key={entry.id} className="text-xs"><td className="px-5 py-3 font-bold text-slate-700">{entry.name}</td><td className="px-5 py-3 text-slate-500">{entry.studentId}</td><td className="px-5 py-3 text-slate-500">{entry.email}</td><td className="px-5 py-3 text-slate-500">{entry.department}</td><td className="px-5 py-3"><span className="rounded-full bg-slate-100 px-2.5 py-1 capitalize text-[10px] font-bold text-slate-600">{entry.role}</span></td></tr>)}</tbody></table></div>}
      </section>
      <p className="text-center text-[11px] text-slate-400">Demo administration only · changes are stored locally in this browser.</p>
    </div>
  )
}
