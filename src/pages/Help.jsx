import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake, MapPin, ShieldCheck } from 'lucide-react'

const tips = [
  { icon: ShieldCheck, title: 'Protect your personal details', text: 'Avoid sharing full student ID numbers, home addresses, passwords, or financial information in public descriptions.' },
  { icon: MapPin, title: 'Meet somewhere public', text: 'Arrange handovers in a busy campus location, such as the library desk or student center.' },
  { icon: HeartHandshake, title: 'Be kind and considerate', text: 'A prompt, respectful reply makes it easier for someone to get a meaningful item back.' },
]

export default function Help() {
  return <div className="mx-auto max-w-3xl space-y-6"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-brand-600">CampusFind community</p><h1 className="page-title">Help &amp; safety</h1><p className="mt-1 text-sm text-slate-500">A few simple practices help keep item handovers safe and smooth.</p></div><div className="grid gap-4">{tips.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card"><span className="h-fit rounded-xl bg-brand-50 p-3 text-brand-600"><Icon size={19} /></span><div><h2 className="font-display text-sm font-extrabold text-slate-800">{title}</h2><p className="mt-1.5 text-sm leading-6 text-slate-500">{text}</p></div></div>)}</div><div className="rounded-2xl bg-brand-900 p-6 text-white"><h2 className="font-display text-lg font-extrabold">Need to report something?</h2><p className="mt-2 text-sm text-indigo-100">Choose whether you lost or found an item and share the details you know.</p><div className="mt-4 flex flex-wrap gap-3"><Link to="/report-lost" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-brand-900">Report lost item <ArrowRight size={14} /></Link><Link to="/report-found" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white">Report found item <ArrowRight size={14} /></Link></div></div></div>
}
