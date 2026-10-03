import { useState } from 'react'
import { Check, ShieldCheck, UserRound } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Button from '../components/Button'
import { FileUpload, Input, Select } from '../components/FormFields'

const departments = ['Computer Science', 'Engineering', 'Business', 'Arts & Humanities', 'Natural Sciences', 'Health Sciences', 'Student Affairs', 'Other']

export default function Profile() {
  const { user, updateProfile, notify } = useApp()
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [avatarError, setAvatarError] = useState('')
  const submit = (event) => {
    event.preventDefault()
    if (avatarError) return
    const values = Object.fromEntries(new FormData(event.currentTarget))
    updateProfile({ ...values, avatar })
    notify('Your profile has been updated.')
  }
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div><p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-brand-600">Your account</p><h1 className="page-title">Profile settings</h1><p className="mt-1 text-sm text-slate-500">Keep your details up to date so your campus community can reach you.</p></div>
      <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
        <div className="h-28 bg-gradient-to-r from-brand-700 via-indigo-600 to-violet-500" />
        <div className="px-6 pb-7 sm:px-8">
          <div className="-mt-10 mb-5 flex flex-wrap items-end justify-between gap-3"><div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-brand-100 font-display text-xl font-extrabold text-brand-700 shadow">{avatar ? <img src={avatar} alt="Profile" className="h-full w-full object-cover" /> : user?.name?.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div><span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700"><ShieldCheck size={14} />Verified campus account</span></div>
          <div className="mb-6"><h2 className="font-display text-xl font-extrabold text-slate-800">{user?.name}</h2><p className="mt-1 text-xs text-slate-500">{user?.role === 'admin' ? 'Campus administrator' : `${user?.department} · ${user?.year}`}</p></div>
          <form onSubmit={submit}>
            <div className="mb-6 max-w-sm"><FileUpload label="Profile photo (optional)" value={avatar} onChange={(value, error) => { setAvatar(value); setAvatarError(error) }} helper="Square images work best · 2 MB max" />{avatarError && <p className="mt-1 text-xs text-rose-600">{avatarError}</p>}</div>
            <div className="grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <Input label="Full name" name="name" defaultValue={user?.name} required />
              <Input label="Student ID" name="studentId" defaultValue={user?.studentId} required />
              <Input label="College email" name="email" type="email" defaultValue={user?.email} required />
              <Input label="Phone number" name="phone" type="tel" defaultValue={user?.phone} required />
              <Select label="Department" name="department" options={departments} defaultValue={user?.department} required />
              <Select label="Year of study" name="year" options={['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Staff']} defaultValue={user?.year} required />
            </div>
            <div className="mt-6 flex justify-end"><Button type="submit" icon={Check}>Save changes</Button></div>
          </form>
        </div>
      </section>
      <div className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card"><span className="rounded-xl bg-brand-50 p-2.5 text-brand-600"><UserRound size={17} /></span><div><p className="text-xs font-bold text-slate-700">Your information stays on this device</p><p className="mt-1 text-xs leading-5 text-slate-400">CampusFind stores this demo profile in your browser’s local storage. Connect a secure backend before using real personal data.</p></div></div>
    </div>
  )
}
