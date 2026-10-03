import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Package, Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import SearchFilters from '../components/SearchFilters'
import ItemCard from '../components/ItemCard'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'

export default function ItemListings({ type }) {
  const { items } = useApp()
  const [filters, setFilters] = useState({ search: '', category: '', location: '', date: '' })
  const lost = type === 'lost'
  const filtered = useMemo(() => items.filter((item) => item.type === type)
    .filter((item) => !filters.search || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(filters.search.toLowerCase()))
    .filter((item) => !filters.category || item.category === filters.category)
    .filter((item) => !filters.location || item.location === filters.location)
    .filter((item) => !filters.date || item.date === filters.date), [items, type, filters])
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand-600">{lost ? <Package size={15} /> : <Compass size={15} />}{lost ? 'Lost & looking' : 'Found on campus'}</div><h1 className="page-title">{lost ? 'Lost items' : 'Found items'}</h1><p className="mt-1 text-sm text-slate-500">{lost ? 'Help someone find what they’re missing.' : 'Browse items your campus community has found.'}</p></div><Link to={lost ? '/report-lost' : '/report-found'}><Button icon={Plus}>{lost ? 'Report lost item' : 'Report found item'}</Button></Link></div>
      <SearchFilters values={filters} onChange={setFilters} />
      <div className="flex items-center justify-between"><p className="text-xs font-medium text-slate-500"><strong className="text-slate-700">{filtered.length}</strong> {filtered.length === 1 ? 'item' : 'items'} found</p>{(filters.search || filters.category || filters.location || filters.date) && <button onClick={() => setFilters({ search: '', category: '', location: '', date: '' })} className="text-xs font-semibold text-brand-600">Clear filters</button>}</div>
      {filtered.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <ItemCard key={item.id} item={item} />)}</div> : <EmptyState title="No matching items" description="Try another search term or clear one of your filters." action={<Button variant="soft" onClick={() => setFilters({ search: '', category: '', location: '', date: '' })}>Clear filters</Button>} />}
      <div className="flex justify-center pt-1"><Link to="/my-reports" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand-600">Have you already reported an item? Track your reports <ArrowRight size={13} /></Link></div>
    </div>
  )
}
