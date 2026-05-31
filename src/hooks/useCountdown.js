import { useState, useEffect } from 'react'

/**
 * Returns live countdown { d, h, m, s } to the given target Date.
 */
export function useCountdown(targetDate) {
  const [time, setTime] = useState(calcDiff(targetDate))

  useEffect(() => {
    const id = setInterval(() => setTime(calcDiff(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return time
}

function calcDiff(target) {
  const diff = target - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
  }
}
