// Central API service — all backend calls go through here

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ─── Helper ───────────────────────────────────────────────────────────────────
async function request(path, options = {}) {
  const token = localStorage.getItem('wm_admin_token')
  const headers = { ...options.headers }

  if (token) headers['Authorization'] = `Bearer ${token}`
  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login:  (email, password) => request('/auth/login',  { method: 'POST', body: JSON.stringify({ email, password }) }),
  getMe:  ()                => request('/auth/me'),
  seed:   ()                => request('/auth/seed',   { method: 'POST' }),
}

// ─── Wishes ───────────────────────────────────────────────────────────────────
export const wishAPI = {
  getAll:      ()       => request('/wishes'),
  getAllAdmin:  ()       => request('/wishes/admin'),
  create:      (body)   => request('/wishes',          { method: 'POST', body: JSON.stringify(body) }),
  approve:     (id)     => request(`/wishes/${id}/approve`, { method: 'PATCH' }),
  delete:      (id)     => request(`/wishes/${id}`,    { method: 'DELETE' }),
}

// ─── Guest Uploads ────────────────────────────────────────────────────────────
export const uploadAPI = {
  getAllAdmin:  ()           => request('/uploads/admin'),
  create:      (formData)   => request('/uploads',     { method: 'POST', body: formData }),
  approve:     (id)         => request(`/uploads/${id}/approve`, { method: 'PATCH' }),
  delete:      (id)         => request(`/uploads/${id}`, { method: 'DELETE' }),
}

// ─── Audio ────────────────────────────────────────────────────────────────────
export const audioAPI = {
  getAllAdmin:  ()           => request('/audio/admin'),
  create:      (formData)   => request('/audio',       { method: 'POST', body: formData }),
  delete:      (id)         => request(`/audio/${id}`, { method: 'DELETE' }),
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export const galleryAPI = {
  getAll:   (category) => request(`/gallery${category && category !== 'All' ? `?category=${category}` : ''}`),
  getOne:   (id)       => request(`/gallery/${id}`),
  add:      (formData) => request('/gallery',      { method: 'POST',   body: formData }),
  update:   (id, body) => request(`/gallery/${id}`, { method: 'PATCH',  body: JSON.stringify(body) }),
  delete:   (id)       => request(`/gallery/${id}`, { method: 'DELETE' }),
}

// ─── Reactions ────────────────────────────────────────────────────────────────
export const reactionAPI = {
  get:    (photoId, sessionId) => request(`/reactions/${photoId}?sessionId=${sessionId}`),
  toggle: (photoId, emoji, sessionId) =>
    request('/reactions', { method: 'POST', body: JSON.stringify({ photoId, emoji, sessionId }) }),
}
