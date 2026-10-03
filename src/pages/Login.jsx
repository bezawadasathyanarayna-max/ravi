import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Compass, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Button from '../components/Button'
import { Input } from '../components/FormFields'

export default function Login() {
  const { user, login, notify } = useApp()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  if (user) return <Navigate to="/" replace />

  const submit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setLoading(true)
    setError('')
    try {
      const account = await login(form.get('identifier'), form.get('password'))
      notify(`Welcome back, ${account.name.split(' ')[0]}!`)
      navigate(account.role === 'admin' ? '/admin' : '/', { replace: true })
    } catch (exception) {
      setError(exception.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#24205f] via-[#383594] to-[#625cf5] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" /><div className="absolute -right-8 -top-8 h-64 w-64 rounded-full border border-white/10" />
        <a href="/" className="relative flex items-center gap-3"><span className="rounded-2xl bg-white/15 p-3"><Compass size={24} /></span><span className="font-display text-xl font-extrabold">CampusFind</span></a>
        <div className="relative max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-100"><ShieldCheck size={14} /> Your campus, connected</p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.13] tracking-tight xl:text-6xl">Lost something?<br />Find your way<br /><span className="text-indigo-200">back to it.</span></h1>
          <p className="mt-6 max-w-md text-base leading-7 text-indigo-100">A little help from your campus community can make all the difference. Report, discover, and reunite — all in one place.</p>
          <div className="mt-10 flex items-center gap-3"><div className="flex -space-x-2">{['JL', 'AM', 'SP', 'TB'].map((name, index) => <span key={name} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-indigo-700 text-[10px] font-bold ${['bg-amber-200 text-amber-800', 'bg-emerald-200 text-emerald-800', 'bg-sky-200 text-sky-800', 'bg-rose-200 text-rose-800'][index]}`}>{name}</span>)}</div><p className="text-xs text-indigo-100">Making campus life a little easier, together.</p></div>
        </div>
        <p className="relative text-xs text-indigo-200">© 2026 CampusFind · Built for your campus community</p>
      </section>
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 flex items-center gap-3 lg:hidden"><span className="rounded-xl bg-brand-600 p-2.5 text-white"><Compass size={21} /></span><span className="font-display text-lg font-extrabold">Campus<span className="text-brand-600">Find</span></span></div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.17em] text-brand-600">Welcome back</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-800">Sign in to your account</h2>
          <p className="mt-2 text-sm text-slate-500">Use your college email or student ID to continue.</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <Input label="College email or student ID" id="identifier" name="identifier" placeholder="you@college.edu" autoComplete="username" required />
            <div className="relative"><Input label="Password" id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[35px] rounded p-1 text-slate-400" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
            <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-slate-500"><input type="checkbox" name="remember" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />Remember me</label><button type="button" onClick={() => notify('Please contact your campus administrator to reset your password.', 'error')} className="font-semibold text-brand-600 hover:text-brand-700">Forgot password?</button></div>
            {error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm text-rose-700">{error}</p>}
            <Button type="submit" loading={loading} className="w-full py-3">Sign in <ArrowRight size={16} /></Button>
          </form>
          <p className="mt-7 text-center text-sm text-slate-500">New to CampusFind? <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">Create an account</Link></p>
          <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500"><strong className="text-slate-700">Demo accounts</strong><br />Student: student@campus.edu / campus123<br />Admin: admin@campus.edu / admin123</div>
        </div>
      </section>
    </main>
  )
}
