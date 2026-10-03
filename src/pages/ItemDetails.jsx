import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock3, Mail, MapPin, MessageCircle, ShieldCheck, UserRound } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'
import EmptyState from '../components/EmptyState'
import { formatDate } from '../components/ItemCard'

export default function ItemDetails() {
  const { id } = useParams()
  const { items, users, user, notify } = useApp()
  const navigate = useNavigate()
  const item = items.find((entry) => entry.id === id)
  const [contactOpen, setContactOpen] = useState(false)
  if (!item) return <EmptyState title="We couldn't find that item" description="It may have been removed or the link may be outdated." action={<Link to="/"><Button>Back to dashboard</Button></Link>} />
  const reporter = users.find((entry) => entry.id === item.reporterId)
  const isOwn = item.reporterId === user?.id
  const canClaim = item.type === 'found' && !isOwn && !['Claimed', 'Returned', 'Closed'].includes(item.status)
  const email = reporter?.email || 'student-affairs@campus.edu'
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Link to={item.type === 'lost' ? '/lost-items' : '/found-items'} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-600"><ArrowLeft size={15} />Back to {item.type} items</Link>
      <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[280px] bg-slate-100 sm:min-h-[420px]"><img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover" /><span className={`absolute left-5 top-5 rounded-full px-3 py-1.5 text-xs font-bold uppercase ${item.type === 'lost' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{item.type} item</span></div>
          <div className="p-6 sm:p-8 lg:p-9">
            <div className="flex flex-wrap items-center gap-2"><StatusBadge status={item.status} /><span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">{item.category}</span></div>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-800">{item.name}</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
            {item.additionalInfo && <div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Additional details</p><p className="mt-1.5 text-sm leading-6 text-slate-600">{item.additionalInfo}</p></div>}
            <div className="mt-6 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-2">
              <InfoLine icon={MapPin} title="Location" value={item.location} />
              <InfoLine icon={CalendarDays} title="Date" value={formatDate(item.date)} />
              <InfoLine icon={Clock3} title="Time" value={item.time || 'Not specified'} />
              <InfoLine icon={UserRound} title="Reported by" value={item.reportedBy} />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {canClaim && <Button className="flex-1" onClick={() => navigate(`/items/${item.id}/claim`)}>Claim this item</Button>}
              <Button variant={canClaim ? 'secondary' : 'primary'} icon={MessageCircle} onClick={() => setContactOpen(true)} className="flex-1">Contact reporter</Button>
            </div>
            <div className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-slate-400"><ShieldCheck size={14} className="mt-0.5 shrink-0" />Keep exchanges in a public campus place. CampusFind will never ask for your password.</div>
          </div>
        </div>
      </section>
      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Contact the reporter">
        <p className="text-sm leading-6 text-slate-500">Reach out to <strong className="text-slate-700">{item.reportedBy}</strong> about “{item.name}”. Please arrange to meet in a safe, public place on campus.</p>
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-4"><span className="rounded-xl bg-white p-2 text-brand-600 shadow-sm"><Mail size={18} /></span><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">College email</p><a className="text-sm font-semibold text-brand-700" href={`mailto:${email}?subject=${encodeURIComponent(`CampusFind: ${item.name}`)}`}>{email}</a></div></div>
      </Modal>
    </div>
  )
}

function InfoLine({ icon: Icon, title, value }) {
  return <div className="flex items-center gap-3"><span className="rounded-xl bg-brand-50 p-2.5 text-brand-600"><Icon size={17} /></span><span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</span><span className="mt-1 block text-xs font-semibold text-slate-700">{value}</span></span></div>
}
