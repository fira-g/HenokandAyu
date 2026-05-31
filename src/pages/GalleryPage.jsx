import { BackToHome } from '@/components/common'
import { PageHeader }  from '@/components/common'
import { GalleryFilter, GalleryGrid, Lightbox } from '@/components/gallery'

export default function GalleryPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Gallery"
        subtitle="Curated memories"
        gradientClass="bg-espresso-gradient"
      />
      <GalleryFilter />
      <GalleryGrid />
      <Lightbox />
      <BackToHome />
    </div>
  )
}
