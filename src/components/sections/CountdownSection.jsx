import { useCountdown } from '@/hooks/useCountdown'
import { WEDDING } from '@/constants'
import { pad } from '@/utils'

const UNITS = [
  { key: 'd', label: 'Days' },
  { key: 'h', label: 'Hrs'  },
  { key: 'm', label: 'Min'  },
  { key: 's', label: 'Sec'  },
]

export default function CountdownSection() {
  const time = useCountdown(WEDDING.date)

  return (
    <div className="bg-espresso-gradient px-6 py-7 text-center">
      <p className="font-sans text-gold-400 text-[11px] tracking-[4px] uppercase mb-4">
        Counting down to forever
      </p>
      <div className="flex justify-center gap-4">
        {UNITS.map(({ key, label }) => (
          <div key={key} className="text-center">
            <div className="bg-white/[0.07] rounded-xl px-4 py-3 min-w-[56px]">
              <span className="text-[#f5d9a8] text-3xl font-light font-serif">
                {pad(time[key] ?? 0)}
              </span>
            </div>
            <p className="font-sans text-[#c8a064]/70 text-[11px] tracking-[2px] mt-1.5 uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
