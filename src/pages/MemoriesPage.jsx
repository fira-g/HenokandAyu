import { PageHeader, BackToHome } from '@/components/common'
import { PhotoUploadForm } from '@/components/memories'

export default function MemoriesPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Your Memories"
        subtitle="Private gift to the couple"
        gradientClass="bg-green-gradient"
        ornamentColor="text-green-300"
        textColor="text-green-100"
        subColor="text-green-300"
      />
      <div className="px-6 py-8">
        <PhotoUploadForm />
      </div>
      <BackToHome />
    </div>
  )
}
