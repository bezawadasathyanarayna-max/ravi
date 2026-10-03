import { LoaderCircle } from 'lucide-react'

export default function LoadingSpinner({ label = 'Loading...' }) {
  return <div role="status" className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-slate-500"><LoaderCircle size={19} className="animate-spin text-brand-600" />{label}</div>
}
