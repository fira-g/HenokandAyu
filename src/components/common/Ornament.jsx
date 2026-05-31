/**
 * Decorative ornament divider — ✦ ✦ ✦
 */
export default function Ornament({ color = 'text-gold-400', size = 'text-xl', spacing = 'tracking-[6px]', symbol = '✦ ✦ ✦' }) {
  return (
    <p className={`ornament ${color} ${size} ${spacing}`}>
      {symbol}
    </p>
  )
}
