import { useAdminStore } from '@/store'
import { AdminLogin, AdminDashboard } from '@/components/admin'

export default function AdminPage() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated)

  if (!isAuthenticated) return <AdminLogin />

  return (
    <div className="animate-fade-up">
      {/* Admin header */}
      <div className="bg-dark-gradient pt-14 pb-8 px-6 text-center">
        <p className="text-amber-300/60 text-xl tracking-[6px]">✦ ✦ ✦</p>
        <h1 className="text-amber-100 text-4xl font-light italic font-serif mt-2">Dashboard</h1>
        <p className="font-sans text-amber-400/60 text-[11px] tracking-[3px] mt-2 uppercase">
          Manage · Review · Curate
        </p>
      </div>
      <AdminDashboard />
    </div>
  )
}
