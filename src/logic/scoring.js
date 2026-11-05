// Saf skor fonksiyonları. Normal ve ceza puanları ayrı veri alanlarında tutulur.

export const normalTotal = (game, sideId) =>
  game.hands.reduce((sum, h) => sum + (h.scores[sideId] || 0), 0)

export const penaltyTotal = (game, sideId) =>
  game.penalties.filter((p) => p.sideId === sideId).reduce((s, p) => s + p.points, 0)

export const grandTotal = (game, sideId) => normalTotal(game, sideId) + penaltyTotal(game, sideId)

export const totals = (game) =>
  game.sides.map((s) => ({
    side: s,
    normal: normalTotal(game, s.id),
    penalty: penaltyTotal(game, s.id),
    grand: grandTotal(game, s.id),
  }))

// En düşük genel toplam kazanır; eşitlikte birden fazla kazanan döner.
export function getWinners(game) {
  const t = totals(game)
  const min = Math.min(...t.map((x) => x.grand))
  return t.filter((x) => x.grand === min)
}

export const isDraw = (game) => getWinners(game).length > 1

// Boş/geçersiz giriş kontrolü. Negatif tam sayı serbest, ondalık yok.
export function parseScore(raw) {
  if (raw === '' || raw === null || raw === undefined) return null
  const n = Number(raw)
  return Number.isInteger(n) ? n : null
}
