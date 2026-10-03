import { Bell, Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar({ onMenuClick }) {
  const { user, claims } = useApp()
  const pending = claims.filter((claim) => claim.claimantId === user?.id && claim.status === 'Pending').length
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-100 bg-white/90 px-4 backdrop-blur-md sm:px-7 lg:px-9">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open menu"><Menu size={21} /></button>
        <div className="hidden min-w-[250px] items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 sm:flex"><Search size={16} className="text-slate-400" /><span className="text-xs text-slate-400">Find something on campus...</span><kbd className="ml-auto rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400">⌘ K</kbd></div>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden text-right sm:block"><span className="block text-xs font-bold text-slate-700">{user?.name}</span><span className="text-[10px] text-slate-400">{user?.role === 'admin' ? 'Administrator' : user?.department}</span></span>
        <Link to="/claims" aria-label="Claims and notifications" className="relative rounded-xl border border-slate-100 p-2.5 text-slate-500 hover:bg-slate-50"><Bell size={18} />{pending > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">{pending}</span>}</Link>
        <Link to="/profile" className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-xs font-extrabold text-brand-700 ring-2 ring-white">{user?.avatar ? <img src={user.avatar} alt="Your profile" className="h-full w-full object-cover" /> : user?.name?.split(' ').map((part) => part[0]).slice(0, 2).join('')}</Link>
      </div>
    </header>
  )
}
