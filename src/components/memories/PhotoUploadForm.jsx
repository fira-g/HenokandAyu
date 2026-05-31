import { useState } from 'react'
import { useUploadsStore } from '@/store'
import { AlertSuccess } from '@/components/common'

export default function PhotoUploadForm() {
  const submitUpload = useUploadsStore((s) => s.submitUpload)
  const [form, setForm]      = useState({ caption: '', uploaderName: '', file: null, preview: null })
  const [uploaded, setUpload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]    = useState('')

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    setForm(p => ({ ...p, file, preview }))
  }

  const handleSubmit = async () => {
    if (!form.file) return
    setLoading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('image', form.file)
      fd.append('caption', form.caption.trim())
      fd.append('uploaderName', form.uploaderName.trim() || 'Guest')
      await submitUpload(fd)
      setUpload(true)
      setForm({ caption: '', uploaderName: '', file: null, preview: null })
      setTimeout(() => setUpload(false), 3000)
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="card">
      <h3 className="text-2xl text-espresso mb-1">Upload Your Photos</h3>
      <p className="font-sans text-gold-600 text-[13px] mb-6">
        Photos go directly and privately to <span className="italic text-gold-500">Ayantu &amp; Eyob</span>
      </p>
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gold-200 rounded-2xl p-8 text-center cursor-pointer bg-cream-warm mb-4 transition-colors hover:border-gold-400">
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFile} />
        {form.preview ? (
          <>
            <img src={form.preview} alt="Preview" className="w-full max-h-48 object-cover rounded-xl mb-2" />
            <p className="font-sans text-green-600 text-sm">✓ {form.file?.name}</p>
            <p className="font-sans text-gold-500 text-xs">Tap to change</p>
          </>
        ) : (
          <>
            <span className="text-5xl mb-2">🖼</span>
            <p className="text-[17px] italic text-gold-600">Tap to choose photos</p>
            <p className="font-sans text-xs text-gold-500 mt-1">JPG, PNG, HEIC · Multiple files ok</p>
          </>
        )}
      </label>
      <div className="flex flex-col gap-3">
        <input className="input-field" placeholder="Your name (optional)"
          value={form.uploaderName} onChange={(e) => setForm(p => ({ ...p, uploaderName: e.target.value }))} />
        <textarea className="input-field" rows={3} placeholder="Add a caption or message..."
          value={form.caption} onChange={(e) => setForm(p => ({ ...p, caption: e.target.value }))} />
        {error && <p className="font-sans text-red-500 text-xs">{error}</p>}
        {uploaded
          ? <AlertSuccess message="✓ Uploaded privately to the couple 💕" />
          : <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Uploading…' : 'Send Privately'}
            </button>
        }
      </div>
      <div className="mt-5 bg-cream-warm rounded-xl p-4">
        <p className="font-sans text-xs text-gold-600 text-center leading-relaxed">
          🔒 Your photos are completely private. Only Ayantu &amp; Eyob will be able to view them.
        </p>
      </div>
    </div>
  )
}
