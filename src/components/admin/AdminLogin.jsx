import { useState } from 'react'
import { useAdminStore } from '@/store'

export default function AdminLogin() {
  const { login, error, clearError, loading } = useAdminStore()
  const [email, setEmail]   = useState('')
  const [pass,  setPass]    = useState('')

  const handleLogin = () => login(email, pass)
  const handleKey   = (e) => { if (e.key === 'Enter') handleLogin(); if (error) clearError() }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <span className="text-5xl mb-4">🔐</span>
      <h2 className="section-title mb-2">Admin Access</h2>
      <p className="font-sans text-gold-600 text-[13px] mb-8">For the couple &amp; family only</p>
      <div className="flex flex-col gap-3 w-full max-w-[280px]">
        <input className="input-field" type="email" placeholder="Admin email"
          value={email} onChange={(e) => { setEmail(e.target.value); clearError() }} onKeyDown={handleKey} />
        <input className="input-field" type="password" placeholder="Password"
          value={pass} onChange={(e) => { setPass(e.target.value); clearError() }} onKeyDown={handleKey} />
        {error && <p className="font-sans text-red-500 text-xs">{error}</p>}
        <button className="btn-primary" onClick={handleLogin} disabled={loading}>
          {loading ? 'Signing in…' : 'Enter Dashboard'}
        </button>
      </div>
      <p className="font-sans text-gold-400/50 text-[11px] mt-6">
        First time? POST /api/auth/seed to create admin account
      </p>
    </div>
  )
}
