// localStorage için tek merkez.
const ACTIVE = 'okey101:active'
const HISTORY = 'okey101:history'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

// Aktif oyun: { game, undo: [önceki oyun durumları] }
export const loadActive = () => read(ACTIVE, null)
export const saveActive = (data) => write(ACTIVE, data)
export const clearActive = () => {
  try { localStorage.removeItem(ACTIVE) } catch { /* yoksay */ }
}

export const loadHistory = () => read(HISTORY, [])
export const saveHistory = (list) => write(HISTORY, list)
