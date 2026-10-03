import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoUsers, mockItems } from '../data/mockData'
import { hashPassword, publicUser, storedUser, verifyPassword } from '../utils/auth'

const AppContext = createContext(null)
const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch (error) {
    console.error(`Unable to read ${key} from localStorage.`, error)
    return fallback
  }
}

export function AppProvider({ children }) {
  const [items, setItems] = useState(() => readStorage('campusfind_items', mockItems))
  const [users, setUsers] = useState(() => readStorage('campusfind_users', demoUsers))
  const [claims, setClaims] = useState(() => readStorage('campusfind_claims', []))
  const [user, setUser] = useState(() => {
    const storedUser = readStorage('campusfind_user', null)
    return storedUser ? publicUser(storedUser) : null
  })
  const [toasts, setToasts] = useState([])

  useEffect(() => { localStorage.setItem('campusfind_items', JSON.stringify(items)) }, [items])
  useEffect(() => { localStorage.setItem('campusfind_users', JSON.stringify(users.map(storedUser))) }, [users])
  useEffect(() => { localStorage.setItem('campusfind_claims', JSON.stringify(claims)) }, [claims])
  useEffect(() => {
    if (user) localStorage.setItem('campusfind_user', JSON.stringify(publicUser(user)))
    else localStorage.removeItem('campusfind_user')
  }, [user])

  const notify = (message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((current) => [...current, { id, message, type }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3600)
  }

  const login = async (identifier, password) => {
    const account = users.find((candidate) =>
      [candidate.email, candidate.studentId].some((value) => value.toLowerCase() === identifier.trim().toLowerCase()),
    )
    if (!account) throw new Error('We couldn’t find an account with those credentials.')
    const demoAccount = demoUsers.find((candidate) => candidate.id === account.id)
    let isValid = false
    if (demoAccount) {
      isValid = demoAccount.password === password
    } else if (account.passwordHash && account.passwordSalt) {
      isValid = await verifyPassword(password, account.passwordSalt, account.passwordHash)
    } else if (account.password) {
      isValid = account.password === password
      if (isValid) {
        const credentials = await hashPassword(password)
        setUsers((current) => current.map((candidate) => candidate.id === account.id ? { ...publicUser(candidate), ...credentials } : candidate))
      }
    }
    if (!isValid) throw new Error('We couldn’t find an account with those credentials.')
    const profile = publicUser(account)
    setUser(profile)
    return profile
  }

  const register = async (details) => {
    const exists = users.some((candidate) => candidate.email.toLowerCase() === details.email.toLowerCase() || candidate.studentId.toLowerCase() === details.studentId.toLowerCase())
    if (exists) throw new Error('An account already exists with that college email or student ID.')
    const credentials = await hashPassword(details.password)
    const created = { ...details, ...credentials, id: `user-${Date.now()}`, role: 'student', avatar: '' }
    setUsers((current) => [...current, created])
    const profile = publicUser(created)
    setUser(profile)
    return profile
  }

  const addItem = (values) => {
    const created = {
      ...values,
      id: `item-${Date.now()}`,
      reportedBy: user.name,
      reporterId: user.id,
      status: 'Pending',
    }
    setItems((current) => [created, ...current])
    return created
  }

  const submitClaim = (values) => {
    const created = { ...values, id: `claim-${Date.now()}`, itemId: values.itemId, claimantId: user.id, claimantName: user.name, status: 'Pending', submittedAt: new Date().toISOString() }
    setClaims((current) => [created, ...current])
    setItems((current) => current.map((item) => item.id === values.itemId ? { ...item, status: 'Matching' } : item))
    return created
  }

  const updateItemStatus = (id, status) => setItems((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  const updateClaimStatus = (id, status) => {
    const claim = claims.find((entry) => entry.id === id)
    setClaims((current) => current.map((entry) => entry.id === id ? { ...entry, status } : entry))
    if (claim && status === 'Approved') updateItemStatus(claim.itemId, 'Claimed')
  }
  const updateProfile = (details) => {
    const updated = { ...user, ...details }
    setUser(updated)
    setUsers((current) => current.map((entry) => entry.id === updated.id ? { ...entry, ...updated } : entry))
  }
  const logout = () => setUser(null)

  const value = useMemo(() => ({
    items, users, claims, user, toasts, notify, login, register, logout, addItem,
    submitClaim, updateItemStatus, updateClaimStatus, updateProfile,
  }), [items, users, claims, user, toasts])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider.')
  return context
}
