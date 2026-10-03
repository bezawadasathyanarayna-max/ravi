import { SearchX } from 'lucide-react'

export default function EmptyState({ title = 'Nothing to see here yet', description = 'Try changing your filters, or check back later.', action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
      <span className="mb-4 rounded-2xl bg-brand-50 p-4 text-brand-600"><SearchX size={27} /></span>
      <h3 className="font-display text-base font-bold text-slate-800">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
