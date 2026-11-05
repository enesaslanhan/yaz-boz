import { parseScore } from './scoring.js'

export const MODES = { single: 'single', team: 'team' }

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

export function validateNewGame({ mode, names, totalHands }) {
  const needed = mode === MODES.single ? 4 : 2
  const clean = names.slice(0, needed).map((n) => n.trim())
  if (clean.length < needed || clean.some((n) => !n)) return 'Tüm isimler doldurulmalı.'
  if (new Set(clean.map((n) => n.toLocaleLowerCase('tr'))).size !== needed) return 'İsimler birbirinden farklı olmalı.'
  if (totalHands !== null && (!Number.isInteger(totalHands) || totalHands < 2)) return 'El sayısı en az 2 olmalı.'
  return null
}

export function createGame({ mode, names, totalHands }) {
  const needed = mode === MODES.single ? 4 : 2
  return {
    id: uid(),
    mode,
    sides: names.slice(0, needed).map((n, i) => ({ id: `s${i}`, name: n.trim() })),
    totalHands: totalHands || null,
    hands: [],
    penalties: [],
    countingStarted: false, // sınırsız modda manuel sayma eli
    phase: 'playing', // playing | counting | final | finished
    createdAt: Date.now(),
    finishedAt: null,
  }
}

// Mevcut oynanacak elin numarası ve türü
export function currentHandNo(game) {
  return game.hands.length + 1
}

// Fazı hesapla (hesaplanmış, saklanmış faza bağımlı değil)
export function derivePhase(game) {
  if (game.phase === 'finished') return 'finished'
  const no = currentHandNo(game)
  if (game.totalHands) {
    if (no > game.totalHands) return 'finished'
    if (no === game.totalHands) return 'final'
    if (no === game.totalHands - 1) return 'counting'
    return 'playing'
  }
  // sınırsız: sayma eli butonuna basıldıysa bir sonraki el sayma/son el
  if (game.countingStarted) return 'final'
  return 'playing'
}

export const handTypeFor = (game) => {
  const p = derivePhase(game)
  return p === 'counting' ? 'counting' : p === 'final' ? 'final' : 'normal'
}

export function validateScores(game, raw) {
  const scores = {}
  for (const s of game.sides) {
    const v = parseScore(raw[s.id])
    if (v === null) return { error: `"${s.name}" için geçerli bir tam sayı girin.` }
    scores[s.id] = v
  }
  return { scores }
}

export function addHand(game, scores) {
  const type = handTypeFor(game)
  const hand = { no: currentHandNo(game), type, scores }
  const next = { ...game, hands: [...game.hands, hand] }
  if (game.totalHands) {
    if (next.hands.length >= game.totalHands) {
      return { ...next, phase: 'finished', finishedAt: Date.now() }
    }
    return next
  }
  // sınırsız: son el girildiyse bitir
  if (type === 'final') return { ...next, phase: 'finished', finishedAt: Date.now() }
  return next
}

// Sınırsız modda sayma eline geç: sonraki el, sayma eli tamamlandıktan sonra son el olur.
// Sayma eli: o ana kadarki toplamlar gösterilir; sonraki giriş "son el" olarak kaydedilir.
export function startCounting(game) {
  if (game.totalHands || game.countingStarted || game.hands.length === 0) return game
  return { ...game, countingStarted: true }
}

export function addPenalty(game, sideId, points) {
  const p = Number(points)
  if (!Number.isInteger(p) || p <= 0) return game
  return {
    ...game,
    penalties: [...game.penalties, { id: uid(), sideId, points: p, handNo: currentHandNo(game) }],
  }
}

export function removePenalty(game, penaltyId) {
  return { ...game, penalties: game.penalties.filter((p) => p.id !== penaltyId) }
}

export function finishGame(game) {
  return { ...game, phase: 'finished', finishedAt: Date.now() }
}
