import { CheckCircle2, CircleAlert, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ToastViewport() {
  const { toasts } = useApp()
  return (
    <div className="fixed right-4 top-4 z-[90] flex w-[min(380px,calc(100%-2rem))] flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} role="status" className="animate-in flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
          {toast.type === 'error' ? <CircleAlert className="shrink-0 text-rose-500" size={19} /> : <CheckCircle2 className="shrink-0 text-emerald-500" size={19} />}
          <p className="flex-1 text-sm font-medium text-slate-700">{toast.message}</p>
          <X size={15} className="text-slate-400" />
        </div>
      ))}
    </div>
  )
}
