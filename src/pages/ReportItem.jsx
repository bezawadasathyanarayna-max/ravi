import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Button from '../components/Button'
import { FileUpload, Input, Select, TextArea } from '../components/FormFields'
import { campusLocations, categories } from '../data/mockData'

export default function ReportItem({ type }) {
  const lost = type === 'lost'
  const navigate = useNavigate()
  const { addItem, notify } = useApp()
  const [image, setImage] = useState('')
  const [imageError, setImageError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    if (imageError) return
    const values = Object.fromEntries(new FormData(event.currentTarget))
    setLoading(true)
    try {
      const item = addItem({ ...values, type, image })
      notify(lost ? 'Your lost item report is now live.' : 'Thanks for helping return a found item!')
      navigate(`/items/${item.id}`)
    } catch (error) {
      notify('We could not save your report. Please try again.', 'error')
      console.error('Report submission failed.', error)
    } finally { setLoading(false) }
  }
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-600"><ArrowLeft size={15} />Back to dashboard</Link>
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
        <div className="mb-7"><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-bold text-brand-700"><CheckCircle2 size={14} />{lost ? 'LOST ITEM REPORT' : 'FOUND ITEM REPORT'}</div><h1 className="page-title">{lost ? 'Tell us what you lost' : 'Tell us what you found'}</h1><p className="mt-2 text-sm leading-6 text-slate-500">{lost ? 'Share a few details and the campus community can keep an eye out.' : 'A clear description helps us connect an item with its owner.'}</p></div>
        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Item name" name="name" placeholder={lost ? 'e.g. Black leather wallet' : 'e.g. Blue water bottle'} required />
            <Select label="Category" name="category" options={categories} required />
            <Select label={lost ? 'Last seen location' : 'Found location'} name="location" options={campusLocations} required />
            <div className="grid grid-cols-2 gap-3"><Input label={lost ? 'Date lost' : 'Date found'} name="date" type="date" max={new Date().toISOString().slice(0, 10)} required /><Input label="Approx. time" name="time" type="time" required /></div>
          </div>
          <TextArea label="Description" name="description" placeholder="Describe the item, including color, brand, or anything distinctive..." minLength={10} required />
          <FileUpload value={image} onChange={(value, error) => { setImage(value); setImageError(error) }} label="Item photo (optional)" />
          {imageError && <p role="alert" className="text-xs text-rose-600">{imageError}</p>}
          <TextArea label="Additional information (optional)" name="additionalInfo" placeholder="Anything else that might help? Leave out sensitive personal details." />
          <div className="flex gap-3 rounded-xl bg-sky-50 px-4 py-3 text-xs leading-5 text-sky-800"><Info size={16} className="mt-0.5 shrink-0" /><span>For everyone’s safety, please don’t include passwords, full ID numbers, or highly sensitive personal information.</span></div>
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end"><Link to="/" className="sm:w-auto"><Button variant="secondary" className="w-full">Cancel</Button></Link><Button type="submit" loading={loading}>{lost ? 'Submit lost report' : 'Submit found item'}</Button></div>
        </form>
      </section>
    </div>
  )
}
