import { GALLERY_CATEGORIES } from '@/constants'
import { useGalleryStore } from '@/store'

export default function GalleryFilter() {
  const activeFilter = useGalleryStore((s) => s.activeFilter)
  const setFilter    = useGalleryStore((s) => s.setFilter)

  return (
    <div className="px-6 py-5 flex gap-2 overflow-x-auto scrollbar-none">
      {GALLERY_CATEGORIES.map((cat) => {
        const active = activeFilter === cat
        return (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`
              flex-shrink-0 font-sans text-[13px] tracking-wide px-[18px] py-2 rounded-full border
              transition-all duration-200 cursor-pointer
              ${active
                ? 'bg-espresso text-[#f5d9a8] border-espresso'
                : 'bg-transparent text-gold-600 border-gold-200 hover:bg-gold-100'
              }
            `}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
