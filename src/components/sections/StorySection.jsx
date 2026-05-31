import { WEDDING } from '@/constants'
import { SectionTitle } from '@/components/common'

export default function StorySection() {
  return (
    <section className="px-6 py-12 text-center">
      <SectionTitle title="Our Story" subtitle="How it all began" />
      <p className="text-gold-700 text-[17px] leading-[1.8] font-light mt-6">
        {WEDDING.story}
      </p>
      <div className="mt-8 flex gap-3">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80"
          alt="Couple"
          className="w-1/2 rounded-2xl object-cover h-44"
        />
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80"
          alt="Couple"
          className="w-1/2 rounded-2xl object-cover h-44"
        />
      </div>
    </section>
  )
}
