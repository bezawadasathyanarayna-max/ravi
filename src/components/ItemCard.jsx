import { ArrowUpRight, MapPin, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

export function formatDate(value) {
  if (!value) return 'Date not set'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`))
}

export default function ItemCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/items/${item.id}`} className="relative block h-48 overflow-hidden bg-slate-100">
        <img src={item.image || 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9?auto=format&fit=crop&w=900&q=80'} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${item.type === 'lost' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{item.type}</span>
        <span className="absolute right-3 top-3"><StatusBadge status={item.status} /></span>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><p className="truncate font-display text-base font-bold text-slate-800">{item.name}</p><p className="mt-1 text-xs font-medium text-brand-600">{item.category}</p></div>
          <Link to={`/items/${item.id}`} aria-label={`View ${item.name}`} className="rounded-xl p-2 text-slate-400 transition hover:bg-brand-50 hover:text-brand-600"><ArrowUpRight size={17} /></Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{item.location}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{formatDate(item.date)}</span>
        </div>
      </div>
    </article>
  )
}
