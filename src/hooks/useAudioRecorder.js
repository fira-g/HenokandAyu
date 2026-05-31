import { useState, useRef } from 'react'

/**
 * Encapsulates MediaRecorder logic for in-browser audio recording.
 * Returns { recording, audioBlob, audioUrl, start, stop, reset }
 */
export function useAudioRecorder() {
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl,  setAudioUrl]  = useState(null)
  const mediaRef  = useRef(null)
  const chunksRef = useRef([])

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRef.current   = new MediaRecorder(stream)
      chunksRef.current  = []

      mediaRef.current.ondataavailable = (e) => chunksRef.current.push(e.data)

      mediaRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        // Stop all tracks so mic indicator disappears
        stream.getTracks().forEach((t) => t.stop())
      }

      mediaRef.current.start()
      setRecording(true)
    } catch (err) {
      console.error('Microphone access denied:', err)
    }
  }

  const stop = () => {
    mediaRef.current?.stop()
    setRecording(false)
  }

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioBlob(null)
    setAudioUrl(null)
    setRecording(false)
  }

  return { recording, audioBlob, audioUrl, start, stop, reset }
}
