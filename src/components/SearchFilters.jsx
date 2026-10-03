import { Search, SlidersHorizontal } from 'lucide-react'
import { Input, Select } from './FormFields'
import { campusLocations, categories } from '../data/mockData'

export default function SearchFilters({ values, onChange, showDate = true }) {
  const set = (field, value) => onChange((current) => ({ ...current, [field]: value }))
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><SlidersHorizontal size={14} />Find an item</div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative">
          <Search size={17} className="absolute left-3 top-[13px] z-10 text-slate-400" />
          <Input aria-label="Search items" placeholder="Search by item name..." value={values.search} onChange={(event) => set('search', event.target.value)} className="[&_.field]:pl-10" />
        </div>
        <Select aria-label="Filter by category" value={values.category} onChange={(event) => set('category', event.target.value)} options={categories} placeholder="All categories" />
        <Select aria-label="Filter by location" value={values.location} onChange={(event) => set('location', event.target.value)} options={campusLocations} placeholder="All locations" />
        {showDate ? <Input aria-label="Filter by date" type="date" value={values.date} onChange={(event) => set('date', event.target.value)} /> : <div className="hidden xl:block" />}
      </div>
    </div>
  )
}
