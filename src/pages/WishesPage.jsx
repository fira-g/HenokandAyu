import { PageHeader, BackToHome } from '@/components/common'
import { WishForm, AudioRecorder, WishesFeed } from '@/components/wishes'

export default function WishesPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Wishes"
        subtitle="Words from the heart"
        gradientClass="bg-purple-gradient"
        ornamentColor="text-purple-300"
        textColor="text-purple-100"
        subColor="text-purple-300"
      />
      <div className="px-6 py-8">
        <WishForm />
        <AudioRecorder />
        <WishesFeed />
      </div>
      <BackToHome />
    </div>
  )
}
