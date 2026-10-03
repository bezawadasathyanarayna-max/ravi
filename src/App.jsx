import { useState } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import ToastViewport from './components/ToastViewport'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ItemListings from './pages/ItemListings'
import ReportItem from './pages/ReportItem'
import ItemDetails from './pages/ItemDetails'
import MyReports from './pages/MyReports'
import ClaimItem from './pages/ClaimItem'
import Claims from './pages/Claims'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import Help from './pages/Help'

function ProtectedRoute({ children }) {
  const { user } = useApp()
  const location = useLocation()
  return user ? children : <Navigate to="/login" replace state={{ from: location }} />
}

function AdminRoute({ children }) {
  const { user } = useApp()
  return user?.role === 'admin' ? children : <Navigate to="/" replace />
}

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="min-h-screen lg:pl-[260px]">
        <Navbar onMenuClick={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
          <Outlet />
        </main>
        <footer className="px-5 pb-6 text-center text-[10px] text-slate-400 lg:pl-9">CampusFind · Helping campus belongings find their way home.</footer>
      </div>
    </div>
  )
}

function ProtectedLayout() {
  return <ProtectedRoute><AppLayout /></ProtectedRoute>
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="lost-items" element={<ItemListings type="lost" />} />
          <Route path="found-items" element={<ItemListings type="found" />} />
          <Route path="report-lost" element={<ReportItem type="lost" />} />
          <Route path="report-found" element={<ReportItem type="found" />} />
          <Route path="items/:id" element={<ItemDetails />} />
          <Route path="items/:id/claim" element={<ClaimItem />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="claims" element={<Claims />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
          <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastViewport />
    </>
  )
}
