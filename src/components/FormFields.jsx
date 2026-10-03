import { ImagePlus, X } from 'lucide-react'

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="label" htmlFor={props.id}>{label}{props.required && <span className="text-rose-500"> *</span>}</label>}
      <input className={`field ${error ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''}`} {...props} />
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  )
}

export function Select({ label, error, options = [], className = '', placeholder = 'Select an option', ...props }) {
  return (
    <div className={className}>
      {label && <label className="label" htmlFor={props.id}>{label}{props.required && <span className="text-rose-500"> *</span>}</label>}
      <select className={`field ${error ? 'border-rose-400' : ''}`} defaultValue="" {...props}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const text = typeof option === 'string' ? option : option.label
          return <option value={value} key={value}>{text}</option>
        })}
      </select>
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  )
}

export function TextArea({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="label" htmlFor={props.id}>{label}{props.required && <span className="text-rose-500"> *</span>}</label>}
      <textarea className={`field ${error ? 'border-rose-400' : ''}`} {...props} />
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  )
}

export function FileUpload({ label = 'Add a photo', value, onChange, accept = 'image/*', helper = 'PNG or JPG, up to 2 MB' }) {
  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      onChange('', 'Please choose an image file.')
      event.target.value = ''
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      onChange('', 'Image must be 2 MB or smaller.')
      event.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result, '')
    reader.onerror = () => onChange('', 'We could not read that image. Please try another file.')
    reader.readAsDataURL(file)
  }
  return (
    <div>
      <span className="label">{label}</span>
      {value ? (
        <div className="relative h-40 overflow-hidden rounded-2xl border border-slate-200">
          <img src={value} alt="Selected upload preview" className="h-full w-full object-cover" />
          <button type="button" onClick={() => onChange('', '')} aria-label="Remove image" className="absolute right-2 top-2 rounded-full bg-white p-2 text-slate-700 shadow"><X size={15} /></button>
        </div>
      ) : (
        <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-6 text-center transition hover:border-brand-500 hover:bg-brand-50/50">
          <span className="mb-2 rounded-xl bg-white p-2.5 text-brand-600 shadow-sm"><ImagePlus size={20} /></span>
          <span className="text-sm font-semibold text-slate-700">Click to upload an image</span>
          <span className="mt-1 text-xs text-slate-400">{helper}</span>
          <input type="file" accept={accept} className="sr-only" onChange={handleFile} />
        </label>
      )}
    </div>
  )
}
