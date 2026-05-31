import { create } from 'zustand'
import { wishAPI, galleryAPI, uploadAPI, audioAPI, authAPI, reactionAPI } from '@/services/api'
import { LOCAL_GALLERY } from '@/constants'
import { getSessionId } from '@/utils/session'

// ─── Reactions persistence for local photos (no backend) ──────────────────────
const REACTIONS_KEY = 'wm_reactions'
const USER_REACTED_KEY = 'wm_user_reacted'

function loadLocalReactions() {
  try { return JSON.parse(localStorage.getItem(REACTIONS_KEY) || '{}') } catch { return {} }
}
function saveLocalReactions(data) {
  localStorage.setItem(REACTIONS_KEY, JSON.stringify(data))
}
function loadUserReacted() {
  try { return JSON.parse(localStorage.getItem(USER_REACTED_KEY) || '{}') } catch { return {} }
}
function saveUserReacted(data) {
  localStorage.setItem(USER_REACTED_KEY, JSON.stringify(data))
}

// ─── Gallery Store ─────────────────────────────────────────────────────────────
export const useGalleryStore = create((set, get) => ({
  photos:        [],
  loading:       false,
  error:         null,
  activeFilter:  'All',
  lightboxIndex: null,

  setFilter: (filter) => {
    set({ activeFilter: filter })
    get().fetchPhotos(filter)
  },

  fetchPhotos: async (category) => {
    set({ loading: true, error: null })
    try {
      const res = await galleryAPI.getAll(category || get().activeFilter)
      set({ photos: res.data, loading: false })
    } catch {
      // fall back to local gallery silently
      set({ photos: [], loading: false, error: null })
    }
  },

  openLightbox:  (index) => set({ lightboxIndex: index }),
  closeLightbox: ()      => set({ lightboxIndex: null }),

  // These use the effective display list length (passed from Lightbox)
  nextPhoto: (total) => set((s) => ({ lightboxIndex: (s.lightboxIndex + 1) % total })),
  prevPhoto: (total) => set((s) => ({
    lightboxIndex: s.lightboxIndex > 0 ? s.lightboxIndex - 1 : total - 1
  })),

  updatePhotoReactions: (photoId, reactions) =>
    set((s) => ({
      photos: s.photos.map((p) =>
        (p._id || p.id) === photoId ? { ...p, reactions } : p
      ),
    })),
}))

// ─── Wishes Store ──────────────────────────────────────────────────────────────
export const useWishesStore = create((set) => ({
  wishes:  [],
  loading: false,
  error:   null,

  fetchWishes: async () => {
    set({ loading: true, error: null })
    try {
      const res = await wishAPI.getAll()
      set({ wishes: res.data, loading: false })
    } catch (err) { set({ error: err.message, loading: false }) }
  },

  fetchAllAdmin: async () => {
    set({ loading: true, error: null })
    try {
      const res = await wishAPI.getAllAdmin()
      set({ wishes: res.data, loading: false })
    } catch (err) { set({ error: err.message, loading: false }) }
  },

  addWish: async (wish) => {
    const res = await wishAPI.create(wish)
    set((s) => ({ wishes: [res.data, ...s.wishes] }))
    return res.data
  },

  deleteWish: async (id) => {
    await wishAPI.delete(id)
    set((s) => ({ wishes: s.wishes.filter((w) => (w._id || w.id) !== id) }))
  },

  approveWish: async (id) => {
    const res = await wishAPI.approve(id)
    set((s) => ({ wishes: s.wishes.map((w) => (w._id || w.id) === id ? res.data : w) }))
  },
}))

// ─── Uploads Store ─────────────────────────────────────────────────────────────
export const useUploadsStore = create((set) => ({
  uploads: [],
  loading: false,

  fetchAllAdmin: async () => {
    set({ loading: true })
    try {
      const res = await uploadAPI.getAllAdmin()
      set({ uploads: res.data, loading: false })
    } catch { set({ loading: false }) }
  },

  submitUpload: async (formData) => {
    const res = await uploadAPI.create(formData)
    return res.data
  },

  approveUpload: async (id) => {
    const res = await uploadAPI.approve(id)
    set((s) => ({ uploads: s.uploads.map((u) => (u._id || u.id) === id ? res.data : u) }))
  },

  deleteUpload: async (id) => {
    await uploadAPI.delete(id)
    set((s) => ({ uploads: s.uploads.filter((u) => (u._id || u.id) !== id) }))
  },
}))

// ─── Audio Store ───────────────────────────────────────────────────────────────
export const useAudioStore = create((set) => ({
  messages: [],
  loading:  false,

  fetchAllAdmin: async () => {
    set({ loading: true })
    try {
      const res = await audioAPI.getAllAdmin()
      set({ messages: res.data, loading: false })
    } catch { set({ loading: false }) }
  },

  submitAudio: async (formData) => {
    const res = await audioAPI.create(formData)
    return res.data
  },

  deleteMessage: async (id) => {
    await audioAPI.delete(id)
    set((s) => ({ messages: s.messages.filter((m) => (m._id || m.id) !== id) }))
  },
}))

// ─── Admin Auth Store ──────────────────────────────────────────────────────────
export const useAdminStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('wm_admin_token'),
  admin:   null,
  error:   null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const res = await authAPI.login(email, password)
      localStorage.setItem('wm_admin_token', res.token)
      set({ isAuthenticated: true, admin: res.admin, loading: false })
      return true
    } catch (err) {
      set({ error: err.message, loading: false })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('wm_admin_token')
    set({ isAuthenticated: false, admin: null, error: null })
  },

  clearError: () => set({ error: null }),
}))

// Export local reaction helpers for use in components
export { loadLocalReactions, saveLocalReactions, loadUserReacted, saveUserReacted }
