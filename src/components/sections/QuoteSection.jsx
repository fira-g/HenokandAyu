import { WEDDING } from '@/constants'

export default function QuoteSection() {
  return (
    <div className="mx-6 mb-10 bg-gradient-to-br from-gold-100 to-cream-warm rounded-3xl p-8 text-center border-l-4 border-gold-400">
      <p className="text-2xl italic text-espresso leading-[1.7] font-light font-serif">
        {WEDDING.quote}
      </p>
      <p className="font-sans mt-3 text-gold-400 text-[13px] tracking-[2px]">
        {WEDDING.verse}
      </p>
    </div>
  )
}
