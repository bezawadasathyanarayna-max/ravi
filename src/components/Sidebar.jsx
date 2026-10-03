import { NavLink, useNavigate } from 'react-router-dom'
import { Bell, ChevronLeft, CircleHelp, Compass, FilePlus2, FileText, LayoutDashboard, LogOut, Search, ShieldCheck, UserRound, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const mainLinks = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Lost items', to: '/lost-items', icon: Search },
  { label: 'Found items', to: '/found-items', icon: Compass },
]
const reportLinks = [
  { label: 'Report lost', to: '/report-lost', icon: FilePlus2 },
  { label: 'Report found', to: '/report-found', icon: FilePlus2 },
  { label: 'My reports', to: '/my-reports', icon: FileText },
  { label: 'Claims', to: '/claims', icon: Bell },
]

function LinkGroup({ heading, links, onNavigate }) {
  return <div className="mb-7"><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">{heading}</p>
    {links.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={onNavigate} className={({ isActive }) => `mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}><Icon size={17} strokeWidth={1.9} />{label}</NavLink>)}
  </div>
}

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const logOutNow = () => { logout(); navigate('/login') }
  const adminLinks = [{ label: 'Admin dashboard', to: '/admin', icon: ShieldCheck }]
  return (
    <>
      {open && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-100 bg-white px-4 py-5 transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2 pb-8">
          <a href="/" className="flex items-center gap-3" onClick={(event) => { event.preventDefault(); navigate('/'); onClose() }}>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-700 text-white shadow-lg shadow-indigo-200"><Compass size={21} /></span>
            <span><span className="block font-display text-[18px] font-extrabold tracking-tight text-slate-800">Campus<span className="text-brand-600">Find</span></span><span className="text-[10px] font-semibold uppercase tracking-[.13em] text-slate-400">Campus community</span></span>
          </a>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 lg:hidden" aria-label="Close menu"><X size={19} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <LinkGroup heading="Workspace" links={mainLinks} onNavigate={onClose} />
          <LinkGroup heading="Your activity" links={reportLinks} onNavigate={onClose} />
          {user?.role === 'admin' && <LinkGroup heading="Administration" links={adminLinks} onNavigate={onClose} />}
          <LinkGroup heading="Account" links={[{ label: 'My profile', to: '/profile', icon: UserRound }, { label: 'Help & support', to: '/help', icon: CircleHelp }]} onNavigate={onClose} />
        </nav>
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 p-4 text-white">
          <p className="text-xs font-bold">Lost something on campus?</p>
          <p className="mt-1 text-[11px] leading-4 text-indigo-100">A quick report helps your community bring it back.</p>
          <button className="mt-3 inline-flex items-center gap-1 text-xs font-bold" onClick={() => { navigate('/report-lost'); onClose() }}>Create a report <ChevronLeft size={13} className="rotate-180" /></button>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 px-1 pt-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-xs font-bold text-brand-700">{user?.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : user?.name?.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
          <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-700">{user?.name}</p><p className="truncate text-[10px] text-slate-400">{user?.role === 'admin' ? 'Campus administrator' : user?.department}</p></div>
          <button aria-label="Log out" title="Log out" className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" onClick={logOutNow}><LogOut size={16} /></button>
        </div>
      </aside>
    </>
  )
}
