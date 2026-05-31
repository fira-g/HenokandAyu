/**
 * Pad a number to 2 digits (e.g. 7 → "07")
 */
export const pad = (n) => String(n).padStart(2, '0')

/**
 * Format a Date object to a human-readable string
 */
export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

/**
 * Truncate a string to maxLen characters with ellipsis
 */
export const truncate = (str, maxLen = 120) =>
  str.length > maxLen ? str.slice(0, maxLen).trimEnd() + '…' : str

/**
 * Convert a File to a base64 data URL (for preview)
 */
export const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
