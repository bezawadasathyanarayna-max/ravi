import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Button from '../components/Button'
import { FileUpload, Input, TextArea } from '../components/FormFields'
import EmptyState from '../components/EmptyState'

export default function ClaimItem() {
  const { id } = useParams()
  const { items, submitClaim, notify, user } = useApp()
  const navigate = useNavigate()
  const item = items.find((entry) => entry.id === id && entry.type === 'found')
  const [image, setImage] = useState('')
  const [imageError, setImageError] = useState('')
  const [loading, setLoading] = useState(false)
  if (!item || item.reporterId === user?.id || ['Claimed', 'Returned', 'Closed'].includes(item.status)) return <EmptyState title="This item can't be claimed" description="It may not be available, or you may already be the person who reported it." action={<Link to="/found-items"><Button>Browse found items</Button></Link>} />
  const submit = (event) => {
    event.preventDefault()
    if (imageError) return
    const values = Object.fromEntries(new FormData(event.currentTarget))
    setLoading(true)
    try {
      submitClaim({ ...values, image, itemId: item.id })
      notify('Your claim has been submitted for review.')
      navigate('/claims')
    } catch (error) {
      console.error('Claim submission failed.', error)
      notify('We could not submit your claim. Please try again.', 'error')
    } finally { setLoading(false) }
  }
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to={`/items/${item.id}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-600"><ArrowLeft size={15} />Back to item details</Link>
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-600">Item claim</p><h1 className="page-title mt-2">Is this yours?</h1><p className="mt-2 text-sm text-slate-500">Tell the reporter why you believe this item belongs to you.</p>
        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-slate-50 p-3"><img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div><p className="text-sm font-bold text-slate-800">{item.name}</p><p className="mt-1 text-xs text-slate-500">{item.location} · {item.date}</p></div></div>
        <form onSubmit={submit} className="mt-6 space-y-5">
          <TextArea label="Why do you think this item belongs to you?" name="reason" placeholder="Explain when and where you lost it, or how you can identify it..." minLength={10} required />
          <TextArea label="Identifying details" name="identifyingDetails" placeholder="Share distinctive details that aren't visible in the public listing." minLength={5} required />
          <FileUpload label="Proof or reference photo (optional)" value={image} onChange={(value, error) => { setImage(value); setImageError(error) }} />
          {imageError && <p role="alert" className="text-xs text-rose-600">{imageError}</p>}
          <Input label="Best contact information" name="contact" type="text" placeholder="College email or phone number" required />
          <div className="flex gap-2 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800"><Info size={15} className="mt-0.5 shrink-0" />Your claim is shared with the person who reported this item. Please don’t include passwords or financial details.</div>
          <Button type="submit" loading={loading}>Submit claim</Button>
        </form>
      </section>
    </div>
  )
}
