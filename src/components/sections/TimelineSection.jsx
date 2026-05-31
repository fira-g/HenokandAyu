import { TIMELINE } from '@/constants'

export default function TimelineSection() {
  return (
    <section className="px-6 pb-12">
      <h2 className="section-title text-center mb-6">The Day</h2>
      <div className="flex flex-col gap-5">
        {TIMELINE.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-espresso text-[#f5d9a8] flex items-center justify-center text-xl flex-shrink-0">
              {item.emoji}
            </div>
            <div>
              <p className="font-sans text-[11px] text-gold-400 tracking-[2px] uppercase">{item.time}</p>
              <p className="text-lg text-espresso">{item.event}</p>
              <p className="font-sans text-[13px] text-gold-600">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
