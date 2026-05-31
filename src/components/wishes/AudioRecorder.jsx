import { useState } from 'react'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { useAudioStore } from '@/store'
import { AlertSuccess } from '@/components/common'

export default function AudioRecorder() {
  const { recording, audioUrl, audioBlob, start, stop, reset } = useAudioRecorder()
  const submitAudio = useAudioStore((s) => s.submitAudio)
  const [senderName, setSenderName] = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const handleSend = async () => {
    if (!audioBlob) return
    setLoading(true); setError('')
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'wish.webm')
      formData.append('senderName', senderName.trim() || 'Guest')
      await submitAudio(formData)
      setSent(true)
      reset()
      setSenderName('')
      setTimeout(() => setSent(false), 3000)
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="card mb-7">
      <h3 className="text-2xl text-espresso mb-1">Record a Message</h3>
      <p className="font-sans text-gold-600 text-[13px] mb-5">Let them hear your voice &amp; feel your love</p>
      <div className="text-center">
        <button
          onClick={recording ? stop : start}
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl border-none cursor-pointer transition-all duration-300
            ${recording
              ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_0_12px_rgba(239,68,68,0.2)] animate-pulse-ring'
              : 'bg-gold-gradient shadow-[0_6px_24px_rgba(160,114,74,0.35)] hover:-translate-y-0.5'
            }`}
        >
          {recording ? '⏹' : '🎤'}
        </button>
        <p className="font-sans text-[13px] text-gold-600 mb-3">
          {recording ? 'Recording… tap to stop' : 'Tap to record'}
        </p>
        {audioUrl && !sent && (
          <div className="space-y-3">
            <audio controls src={audioUrl} className="w-full" />
            <input className="input-field" placeholder="Your name (optional)"
              value={senderName} onChange={(e) => setSenderName(e.target.value)} />
            {error && <p className="font-sans text-red-500 text-xs">{error}</p>}
            <div className="flex gap-2">
              <button className="btn-outline flex-1 text-xs" onClick={reset}>Re-record</button>
              <button className="btn-primary flex-1 text-xs py-3" onClick={handleSend} disabled={loading}>
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </div>
          </div>
        )}
        {sent && <AlertSuccess message="✓ Your audio wish has been sent 🎙️" />}
      </div>
    </div>
  )
}
