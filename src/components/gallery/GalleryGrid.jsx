import { useEffect } from 'react'
import { useGalleryStore } from '@/store'
import { LOCAL_GALLERY } from '@/constants'

export default function GalleryGrid() {
  const { photos, loading, activeFilter, openLightbox, fetchPhotos } = useGalleryStore()

  useEffect(() => { fetchPhotos(activeFilter) }, [activeFilter])

  // Merge API photos with local gallery; prefer API if available
  const apiPhotos = photos.length > 0
    ? (activeFilter === 'All' ? photos : photos.filter(p => p.category === activeFilter))
    : (activeFilter === 'All' ? LOCAL_GALLERY : LOCAL_GALLERY.filter(p => p.category === activeFilter))

  if (loading) {
    return (
      <div className="px-4 pb-8" style={{ columns: 2, columnGap: 10 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="break-inside-avoid mb-2.5 rounded-2xl shimmer"
            style={{ height: i % 3 === 0 ? 220 : 160 }} />
        ))}
      </div>
    )
  }

  if (!apiPhotos.length) {
    return (
      <div className="text-center py-16 px-6">
        <p className="text-3xl mb-3">📷</p>
        <p className="font-sans text-gold-500 text-sm">No photos in this category yet</p>
      </div>
    )
  }

  return (
    <div className="px-4 pb-8" style={{ columns: 2, columnGap: 10 }}>
      {apiPhotos.map((photo, i) => (
        <div
          key={photo._id || photo.id}
          onClick={() => openLightbox(i)}
          className="gallery-img break-inside-avoid mb-2.5 rounded-2xl overflow-hidden cursor-pointer relative group"
        >
          <img
            src={photo.imageUrl || photo.url}
            alt={photo.caption}
            loading="lazy"
            className="w-full block object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ height: i % 3 === 0 ? 220 : 160 }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Full screen icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-white text-base">⛶</span>
            </div>
          </div>
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-[12px] italic leading-snug drop-shadow">{photo.caption}</p>
            <span className="font-sans bg-gold-400/70 text-white text-[9px] tracking-wide px-1.5 py-0.5 rounded-full">
              {photo.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
