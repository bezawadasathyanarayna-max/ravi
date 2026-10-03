import { LoaderCircle } from 'lucide-react'

const styles = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
  ghost: 'text-slate-600 hover:bg-slate-100',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
  soft: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
}

export default function Button({ children, variant = 'primary', icon: Icon, loading = false, className = '', type = 'button', ...props }) {
  return (
    <button type={type} disabled={loading || props.disabled} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`} {...props}>
      {loading ? <LoaderCircle size={17} className="animate-spin" /> : Icon ? <Icon size={17} strokeWidth={2} /> : null}
      {children}
    </button>
  )
}
