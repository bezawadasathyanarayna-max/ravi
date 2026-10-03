import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Button from '../components/Button'
import { Input, Select } from '../components/FormFields'

const departments = ['Computer Science', 'Engineering', 'Business', 'Arts & Humanities', 'Natural Sciences', 'Health Sciences', 'Other']

export default function Register() {
  const { user, register, notify } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  if (user) return <Navigate to="/" replace />
  const submit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    if (data.password.length < 8) { setError('Your password must be at least 8 characters long.'); return }
    if (data.password !== data.confirmPassword) { setError('The passwords do not match.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !data.email.toLowerCase().includes('.edu')) { setError('Enter a valid college email address ending in .edu.'); return }
    setLoading(true)
    setError('')
    try {
      const account = await register({ name: data.name.trim(), studentId: data.studentId.trim(), email: data.email.trim(), department: data.department, year: data.year, phone: data.phone.trim(), password: data.password })
      notify(`Welcome to CampusFind, ${account.name.split(' ')[0]}!`)
      navigate('/', { replace: true })
    } catch (exception) { setError(exception.message) } finally { setLoading(false) }
  }
  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-600"><ArrowLeft size={16} />Back to sign in</Link>
        <div className="mb-6 mt-7 flex items-center gap-3"><span className="rounded-xl bg-brand-600 p-2.5 text-white"><Compass size={21} /></span><span className="font-display text-lg font-extrabold">Campus<span className="text-brand-600">Find</span></span></div>
        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[.17em] text-brand-600">Join the community</p><h1 className="page-title mt-2">Create your account</h1><p className="mt-2 text-sm text-slate-500">A few details to get you connected with your campus.</p>
          <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2">
            <Input label="Full name" name="name" placeholder="Alex Morgan" autoComplete="name" required />
            <Input label="Student ID" name="studentId" placeholder="e.g. STU2026042" required />
            <Input label="College email" name="email" type="email" placeholder="you@college.edu" autoComplete="email" required />
            <Input label="Phone number" name="phone" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" required />
            <Select label="Department" name="department" options={departments} required />
            <Select label="Year of study" name="year" options={['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Staff']} required />
            <Input label="Password" name="password" type="password" placeholder="At least 8 characters" autoComplete="new-password" required />
            <Input label="Confirm password" name="confirmPassword" type="password" placeholder="Enter your password again" autoComplete="new-password" required />
            {error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm text-rose-700 sm:col-span-2">{error}</p>}
            <div className="pt-1 sm:col-span-2"><Button type="submit" loading={loading} className="w-full sm:w-auto">Create account</Button><p className="mt-4 text-xs leading-5 text-slate-400">By joining, you agree to use CampusFind responsibly and help keep our campus community safe.</p></div>
          </form>
        </section>
      </div>
    </main>
  )
}
