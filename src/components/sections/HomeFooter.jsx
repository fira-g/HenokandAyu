import { WEDDING } from '@/constants'

export default function HomeFooter() {
  return (
    <footer className="bg-espresso px-6 py-8 text-center">
      <p className="text-[#f5d9a8] text-3xl font-light italic font-serif">
        {WEDDING.bride} &amp; {WEDDING.groom}
      </p>
      <p className="font-sans text-[#c8a064]/60 text-xs tracking-[2px] mt-2">
        {WEDDING.dateLabel.toUpperCase()}
      </p>
      <p className="ornament text-gold-400 mt-3">✦</p>
    </footer>
  )
}
