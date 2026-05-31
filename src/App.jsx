import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout'
import HomePage     from '@/pages/HomePage'
import GalleryPage  from '@/pages/GalleryPage'
import WishesPage   from '@/pages/WishesPage'
import MemoriesPage from '@/pages/MemoriesPage'
import AdminPage    from '@/pages/AdminPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index          element={<HomePage />}    />
        <Route path="gallery"  element={<GalleryPage />} />
        <Route path="wishes"   element={<WishesPage />}  />
        <Route path="memories" element={<MemoriesPage />}/>
        <Route path="admin"    element={<AdminPage />}   />
        <Route path="*"        element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
