import { useState } from 'react'
import { useWishesStore } from '@/store'
import { AlertSuccess } from '@/components/common'

export default function WishForm() {
  const addWish = useWishesStore((s) => s.addWish)
  const [form, setForm]       = useState({ message: '', senderName: '', anonymous: false })
  const [submitted, setSubmit] = useState(false)
  const [loading, setLoading]  = useState(false)
  const [error, setError]      = useState('')

  const handleSubmit = async () => {
    if (!form.message.trim()) return
    setLoading(true); setError('')
    try {
      await addWish({ ...form, senderName: form.anonymous ? 'Anonymous' : (form.senderName || 'Guest') })
      setSubmit(true)
      setForm({ message: '', senderName: '', anonymous: false })
      setTimeout(() => setSubmit(false), 3000)
    } catch (err) {
      setError(err.message || 'Failed to send. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="card mb-7">
      <h3 className="text-2xl text-espresso mb-1">Leave a Blessing</h3>
      <p className="font-sans text-gold-600 text-[13px] mb-5">Share your love, prayers &amp; memories</p>
      <div className="flex flex-col gap-3">
        {!form.anonymous && (
          <input className="input-field" placeholder="Your name (optional)"
            value={form.senderName} onChange={(e) => setForm(p => ({ ...p, senderName: e.target.value }))} />
        )}
        <textarea className="input-field" rows={4} placeholder="Write your heartfelt message..."
          value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} />
        <label className="flex items-center gap-2 font-sans text-[13px] text-gold-600 cursor-pointer">
          <input type="checkbox" checked={form.anonymous} className="accent-gold-400"
            onChange={(e) => setForm(p => ({ ...p, anonymous: e.target.checked }))} />
          Send anonymously
        </label>
        {error && <p className="font-sans text-red-500 text-xs">{error}</p>}
        {submitted
          ? <AlertSuccess message="✓ Your blessing has been sent with love 💕" />
          : <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Sending…' : 'Send My Blessing'}
            </button>
        }
      </div>
    </div>
  )
}
