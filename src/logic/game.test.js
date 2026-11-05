import { describe, it, expect } from 'vitest'
import { createGame, addHand, addPenalty, startCounting, derivePhase, finishGame, validateNewGame } from './game.js'
import { totals, getWinners } from './scoring.js'

const single = (totalHands = null) => createGame({ mode: 'single', names: ['A', 'B', 'C', 'D'], totalHands })
const sc = (a, b, c, d) => ({ s0: a, s1: b, s2: c, s3: d })

describe('oyun mantığı', () => {
  it('eşli oyunda 2 taraf oluşur', () => {
    expect(createGame({ mode: 'team', names: ['X', 'Y', 'Z'], totalHands: null }).sides).toHaveLength(2)
  })
  it('10 elde 9. el sayma, 10. el son el', () => {
    let g = single(10)
    for (let i = 1; i <= 8; i++) { expect(derivePhase(g)).toBe('playing'); g = addHand(g, sc(1, 2, 3, 4)) }
    expect(derivePhase(g)).toBe('counting')
    g = addHand(g, sc(1, 2, 3, 4))
    expect(g.hands[8].type).toBe('counting')
    expect(derivePhase(g)).toBe('final')
    g = addHand(g, sc(1, 2, 3, 4))
    expect(g.hands[9].type).toBe('final')
    expect(g.phase).toBe('finished')
  })
  it('sınırsız modda manuel sayma eli sonrası son el oyunu bitirir', () => {
    let g = addHand(single(), sc(10, 20, 30, 40))
    g = startCounting(g)
    expect(derivePhase(g)).toBe('final')
    g = addHand(g, sc(5, 5, 5, 5))
    expect(g.phase).toBe('finished')
  })
  it('cezalar normal skordan ayrı tutulur, genel toplama eklenir', () => {
    let g = addHand(single(), sc(10, 20, 30, 40))
    g = addPenalty(addPenalty(g, 's0', 101), 's0', 202)
    const t = totals(g)[0]
    expect(t.normal).toBe(10)
    expect(t.penalty).toBe(303)
    expect(t.grand).toBe(313)
  })
  it('en düşük toplam kazanır, eşitlikte beraberlik', () => {
    let g = finishGame(addHand(single(), sc(10, 20, 30, 40)))
    expect(getWinners(g).map((w) => w.side.name)).toEqual(['A'])
    g = finishGame(addHand(single(), sc(10, 10, 30, 40)))
    expect(getWinners(g)).toHaveLength(2)
  })
  it('doğrulama', () => {
    expect(validateNewGame({ mode: 'single', names: ['A', '', 'C', 'D'], totalHands: null })).toBeTruthy()
    expect(validateNewGame({ mode: 'single', names: ['A', 'B', 'C', 'D'], totalHands: 1 })).toBeTruthy()
    expect(validateNewGame({ mode: 'team', names: ['A', 'B'], totalHands: 10 })).toBeNull()
  })
})
