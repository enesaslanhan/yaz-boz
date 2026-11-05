import { useState } from 'react'
import { totals, getWinners } from '../logic/scoring.js'
import HandHistoryTable from './HandHistoryTable.jsx'
import { Icon } from './ui.jsx'

export default function ResultView({ game }) {
  const [showHands, setShowHands] = useState(false)
  const winners = getWinners(game)
  const tie = winners.length > 1
  const rows = [...totals(game)].sort((a, b) => a.grand - b.grand)
  const isWinner = (r) => winners.some((w) => w.side.id === r.side.id)

  return (
    <div className="space-y-4">
      <section className="animate-rise-glow relative overflow-hidden rounded-3xl border border-lime/60 bg-gradient-to-b from-lime/15 to-card p-6 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-lime text-bg grid place-items-center shadow-[0_0_36px_-4px_rgba(163,230,53,.7)]">
          <Icon name="trophy" className="w-8 h-8" />
        </div>
        <div className="mt-4 text-xs uppercase tracking-[0.2em] text-lime font-semibold">{tie ? 'Beraberlik' : 'Kazanan'}</div>
        <div className="text-3xl sm:text-4xl font-black mt-1 break-words">{winners.map((w) => w.side.name).join(' & ')}</div>
        <div className="text-mute mt-2"><b className="text-lime tabular-nums text-xl">{winners[0].grand}</b> puan · {game.hands.length} el oynandı</div>
      </section>

      <section>
        <h3 className="font-bold mb-2 px-1">Sıralama</h3>
        <ol className="space-y-2.5">
          {rows.map((r, i) => {
            const win = isWinner(r)
            return (
              <li key={r.side.id} style={{ animationDelay: `${120 + i * 70}ms` }}
                className={`animate-rise card p-4 ${win ? 'border-lime/50' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid place-items-center w-9 h-9 rounded-xl font-black shrink-0 ${win ? 'bg-lime text-bg' : 'bg-surface text-mute'}`}>{i + 1}</span>
                  <div className="font-bold truncate flex-1">{r.side.name}</div>
                  <div className={`text-3xl font-black tabular-nums ${win ? 'text-lime' : ''}`}>{r.grand}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="rounded-xl bg-surface/70 px-3 py-2 flex justify-between"><span className="text-mute">Normal</span><b className="tabular-nums">{r.normal}</b></div>
                  <div className="rounded-xl bg-surface/70 px-3 py-2 flex justify-between"><span className="text-mute">Ceza</span><b className={`tabular-nums ${r.penalty ? 'text-danger' : ''}`}>{r.penalty}</b></div>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="card">
        <button className="w-full flex items-center justify-between p-4 font-bold" onClick={() => setShowHands((v) => !v)} aria-expanded={showHands}>
          <span className="flex items-center gap-2"><Icon name="list" className="w-5 h-5 text-mute" />El El Skor Geçmişi</span>
          <Icon name="chevron" className={`w-5 h-5 text-mute transition-transform ${showHands ? 'rotate-180' : ''}`} />
        </button>
        {showHands && <div className="px-4 pb-4 animate-fade-in"><HandHistoryTable game={game} /></div>}
      </section>
    </div>
  )
}
