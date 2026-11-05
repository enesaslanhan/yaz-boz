import { useCallback, useEffect, useState } from 'react'
import { loadActive, saveActive, clearActive, loadHistory, saveHistory } from '../storage/storage.js'
import * as G from '../logic/game.js'

const MAX_UNDO = 30

export function useApp() {
  const [active, setActive] = useState(() => loadActive()) // { game, undo }
  const [history, setHistory] = useState(() => loadHistory())

  useEffect(() => {
    if (active) saveActive(active)
    else clearActive()
  }, [active])
  useEffect(() => { saveHistory(history) }, [history])

  const game = active?.game || null

  // Her değişiklikte önceki durumu geri alma yığınına ekle
  const apply = useCallback((fn) => {
    setActive((cur) => {
      if (!cur) return cur
      const next = fn(cur.game)
      if (next === cur.game) return cur
      return { game: next, undo: [...cur.undo, cur.game].slice(-MAX_UNDO) }
    })
  }, [])

  const start = useCallback((opts) => setActive({ game: G.createGame(opts), undo: [] }), [])
  const addHand = useCallback((scores) => apply((g) => G.addHand(g, scores)), [apply])
  const addPenalty = useCallback((sideId, pts) => apply((g) => G.addPenalty(g, sideId, pts)), [apply])
  const startCounting = useCallback(() => apply(G.startCounting), [apply])
  const finish = useCallback(() => apply(G.finishGame), [apply])
  const undo = useCallback(() => {
    setActive((cur) => {
      if (!cur || !cur.undo.length) return cur
      return { game: cur.undo[cur.undo.length - 1], undo: cur.undo.slice(0, -1) }
    })
  }, [])

  // Biten oyunu geçmişe taşı
  const archive = useCallback(() => {
    if (!game || game.phase !== 'finished') return
    setHistory((h) => [game, ...h.filter((x) => x.id !== game.id)])
    setActive(null)
  }, [game])

  const discard = useCallback(() => setActive(null), [])
  const removeFromHistory = useCallback((id) => setHistory((h) => h.filter((g) => g.id !== id)), [])

  return {
    game, canUndo: !!active?.undo.length, history,
    start, addHand, addPenalty, startCounting, finish, undo, archive, discard, removeFromHistory,
  }
}
