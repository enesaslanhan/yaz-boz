import { useRef, useState } from 'react'
import { currentHandNo, validateScores } from '../logic/game.js'
import { PhaseBadge, Sheet } from './ui.jsx'

const QUICK = [-101, 202, 404]

function Form({ game, phase, onSave, close }) {
  const [raw, setRaw] = useState({})
  const [error, setError] = useState(null)
  const inputs = useRef([])
  const last = game.sides.length - 1

  const submit = (e) => {
    e.preventDefault()
    const { scores, error: err } = validateScores(game, raw)
    if (err) return setError(err)
    onSave(scores)
    close()
  }
  // Hızlı seçim: değeri girişe yansıt, aynı değere tekrar basınca temizle
  const pick = (id, q) => {
    setError(null)
    setRaw((r) => ({ ...r, [id]: String(r[id] ?? '') === String(q) ? '' : String(q) }))
  }
  const next = (e, i) => {
    if (e.key === 'Enter' && i < last) { e.preventDefault(); inputs.current[i + 1]?.focus() }
  }

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-2 gap-3">
        {game.sides.map((s, i) => (
          <div key={s.id} className={game.sides.length === 2 ? 'col-span-2' : ''}>
            <label className="block">
              <span className="text-sm font-medium text-mute truncate block mb-1">{s.name}</span>
              <input ref={(el) => (inputs.current[i] = el)} autoFocus={i === 0}
                className="input !min-h-[60px] text-2xl font-bold tabular-nums text-center"
                type="number" inputMode="numeric" enterKeyHint={i === last ? 'done' : 'next'} placeholder="0"
                value={raw[s.id] ?? ''} onKeyDown={(e) => next(e, i)}
                onChange={(e) => { setError(null); setRaw((r) => ({ ...r, [s.id]: e.target.value })) }} />
            </label>
            <div className="grid grid-cols-3 gap-1.5 mt-1.5" role="group" aria-label={`${s.name} hızlı seçim`}>
              {QUICK.map((q) => {
                const on = String(raw[s.id] ?? '') === String(q)
                return (
                  <button type="button" key={q} aria-pressed={on} onClick={() => pick(s.id, q)}
                    className={`min-h-[40px] rounded-xl text-sm font-bold tabular-nums border transition active:scale-95 ${on ? 'bg-lime text-bg border-lime' : 'bg-surface text-mute border-white/10 hover:text-tx'}`}>
                    {q}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-danger mt-3" role="alert">{error}</p>}
      <button className="btn-primary w-full !min-h-[56px] text-base mt-5">{phase === 'final' ? 'Son Eli Kaydet ve Bitir' : 'Eli Kaydet'}</button>
    </form>
  )
}

export default function ScoreSheet({ game, phase, onSave, onClose }) {
  return (
    <Sheet title={`${currentHandNo(game)}. el puanları`} subtitle="Negatif değerler de girilebilir." onClose={onClose}>
      {(close) => (
        <>
          <div className="-mt-2 mb-4"><PhaseBadge phase={phase} /></div>
          <Form game={game} phase={phase} onSave={onSave} close={close} />
        </>
      )}
    </Sheet>
  )
}
