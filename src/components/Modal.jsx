import { useEffect } from 'react'
import { X } from 'lucide-react'
import Button from './Button'

export default function Modal({ open, onClose, title, children, footer, size = 'max-w-lg' }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section role="dialog" aria-modal="true" aria-labelledby="modal-title" className={`animate-in w-full ${size} rounded-3xl bg-white p-6 shadow-2xl`}>
        <div className="mb-5 flex items-center justify-between">
          <h2 id="modal-title" className="font-display text-lg font-extrabold text-slate-800">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={18} /></button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </section>
    </div>
  )
}

export function ConfirmationDialog({ open, onClose, onConfirm, title = 'Are you sure?', message, confirmLabel = 'Confirm', variant = 'danger' }) {
  return (
    <Modal open={open} onClose={onClose} title={title} footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant={variant} onClick={onConfirm}>{confirmLabel}</Button></>}>
      <p className="text-sm leading-6 text-slate-500">{message}</p>
    </Modal>
  )
}
