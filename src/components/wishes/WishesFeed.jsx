import { useEffect } from 'react'
import { useWishesStore } from '@/store'

export default function WishesFeed() {
  const { wishes, loading, fetchWishes } = useWishesStore()

  useEffect(() => { fetchWishes() }, [])

  if (loading) return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 shimmer h-24" />
      ))}
    </div>
  )

  if (!wishes.length) return (
    <p className="font-sans text-gold-500 text-center text-[13px] py-8">
      Be the first to leave a blessing ✨
    </p>
  )

  return (
    <div>
      <h3 className="text-2xl text-espresso mb-5 text-center">Blessings Received</h3>
      <div className="flex flex-col gap-3.5">
        {wishes.map((wish) => (
          <div key={wish._id || wish.id}
            className="bg-white rounded-2xl p-5 border-l-[3px] border-gold-400 shadow-[0_2px_12px_rgba(150,100,60,0.06)]">
            <p className="text-base text-gold-800 leading-[1.75] italic mb-2.5">"{wish.message}"</p>
            <div className="flex justify-between items-center">
              <p className="font-sans text-[13px] text-gold-400 font-medium">— {wish.senderName}</p>
              <p className="font-sans text-xs text-gold-500">
                {new Date(wish.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
