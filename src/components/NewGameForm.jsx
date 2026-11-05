import { useState } from 'react'
import { MODES, validateNewGame } from '../logic/game.js'
import { Icon } from './ui.jsx'

const OPTIONS = [
  [MODES.single, 'Tekli Oyun', '4 oyuncu, herkes kendi adına', 'user'],
  [MODES.team, 'Eşli Oyun', '2 takım, ortak skor', 'users'],
]

export default function NewGameForm({ onStart, notify }) {
  const [mode, setMode] = useState(MODES.single)
  const [names, setNames] = useState(['', '', '', ''])
  const [hands, setHands] = useState('')
  const count = mode === MODES.single ? 4 : 2
  const n = Number(hands)

  const submit = (e) => {
    e.preventDefault()
    const totalHands = hands.trim() === '' ? null : Number(hands)
    const err = validateNewGame({ mode, names, totalHands })
    if (err) return notify(err, 'error')
    onStart({ mode, names: names.slice(0, count), totalHands })
  }
  const step = (d) => {
    if (hands === '') return d > 0 ? setHands('2') : undefined
    const v = n + d
    setHands(v < 2 ? '' : String(v))
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <h2 className="text-xl font-bold">Yeni Oyun</h2>

      <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Oyun modu">
        {OPTIONS.map(([m, label, sub, icon]) => {
          const active = mode === m
          return (
            <button type="button" key={m} role="radio" aria-checked={active} onClick={() => setMode(m)}
              className={`relative text-left rounded-3xl border-2 p-4 transition duration-200 active:scale-[0.97] ${active ? 'border-lime bg-lime/10 shadow-[0_0_28px_-10px_rgba(163,230,53,.6)]' : 'border-white/10 bg-card hover:border-white/25'}`}>
              <span className={`grid place-items-center w-11 h-11 rounded-2xl mb-3 transition-colors ${active ? 'bg-lime text-bg' : 'bg-surface text-mute'}`}>
                <Icon name={icon} className="w-6 h-6" />
              </span>
              <div className="font-bold">{label}</div>
              <div className="text-xs text-mute mt-0.5">{sub}</div>
              {active && <span className="absolute top-3 right-3 grid place-items-center w-5 h-5 rounded-full bg-lime text-bg animate-pop"><Icon name="check" className="w-3.5 h-3.5" strokeWidth={3} /></span>}
            </button>
          )
        })}
      </div>

      <div className="space-y-2.5">
        <div className="text-sm font-semibold text-mute">{mode === MODES.single ? 'Oyuncular' : 'Takımlar'}</div>
        {Array.from({ length: count }, (_, i) => (
          <div key={mode + i} className="flex items-center gap-3 rounded-2xl bg-card border border-white/[0.07] p-1.5 pr-2 focus-within:border-lime transition-colors">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-surface text-lime font-bold shrink-0">{i + 1}</span>
            <input className="flex-1 min-w-0 bg-transparent text-base placeholder:text-mute/70 focus:outline-none !ring-0 !ring-offset-0 min-h-[40px]"
              placeholder={mode === MODES.single ? `${i + 1}. oyuncu adı` : `${i + 1}. takım adı`}
              aria-label={mode === MODES.single ? `${i + 1}. oyuncu adı` : `${i + 1}. takım adı`}
              value={names[i]} maxLength={24}
              onChange={(e) => setNames((x) => x.map((v, j) => (j === i ? e.target.value : v)))} />
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-dashed border-lime/30 bg-surface/60 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <label htmlFor="total-hands" className="font-semibold">Toplam el sayısı</label>
            <div className="text-xs text-mute">İsteğe bağlı</div>
          </div>
          <div className="flex items-center gap-1.5">
            <button type="button" className="btn-secondary !px-0 w-11" onClick={() => step(-1)} aria-label="Azalt"><Icon name="minus" /></button>
            <input id="total-hands" className="input !w-20 text-center text-xl font-bold !px-1" type="number" inputMode="numeric" min="2" placeholder="∞" value={hands} onChange={(e) => setHands(e.target.value)} />
            <button type="button" className="btn-secondary !px-0 w-11" onClick={() => step(1)} aria-label="Artır"><Icon name="plus" /></button>
          </div>
        </div>
        <p className="text-xs text-mute mt-3">
          {hands && n >= 2 ? `${n - 1}. el sayma eli, ${n}. el son el olacak.` : 'Boş bırakılırsa sınırsız: Sayma Eli butonunu siz kullanırsınız.'}
        </p>
      </div>

      <div className="sticky bottom-0 -mx-4 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-bg via-bg/95 to-transparent z-10">
        <button className="btn-primary w-full !min-h-[56px] text-base">Oyunu Başlat</button>
      </div>
    </form>
  )
}
