/**
 * Returns a stable session ID stored in localStorage.
 * Used to track per-user reactions without requiring login.
 */
export function getSessionId() {
  const KEY = 'wm_session_id'
  let id = localStorage.getItem(KEY)
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
    localStorage.setItem(KEY, id)
  }
  return id
}
