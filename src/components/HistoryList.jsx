import { getWinners } from '../logic/scoring.js'
import { Icon } from './ui.jsx'

export default function HistoryList({ history, onOpen, onDelete }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3">Oyun Geçmişi</h2>
      {!history.length && (
        <div className="card p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-surface grid place-items-center text-mute mb-3"><Icon name="history" className="w-7 h-7" /></div>
          <div className="font-semibold">Henüz tamamlanmış oyun yok</div>
          <p className="text-sm text-mute mt-1">Bitirdiğin oyunlar burada listelenir.</p>
        </div>
      )}
      <ul className="space-y-3">
        {history.map((g) => {
          const w = getWinners(g)
          const tie = w.length > 1
          return (
            <li key={g.id} className="card flex items-stretch overflow-hidden">
              <button className="flex-1 min-w-0 text-left p-4 hover:bg-white/[0.03] transition-colors" onClick={() => onOpen(g)}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="chip bg-surface text-mute">{g.mode === 'single' ? 'Tekli' : 'Eşli'}</span>
                  <span className="text-xs text-mute">{g.hands.length} el · {new Date(g.finishedAt || g.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <Icon name="trophy" className="w-4 h-4 text-lime shrink-0" />
                  <span className="truncate">{tie ? 'Beraberlik' : w[0].side.name}</span>
                  <span className="text-lime tabular-nums">{w[0].grand}</span>
                </div>
                <div className="text-xs text-mute truncate mt-1">{g.sides.map((s) => s.name).join(' · ')}</div>
              </button>
              <button className="px-4 text-mute hover:text-danger hover:bg-danger/10 transition-colors border-l border-white/[0.07]" onClick={() => onDelete(g)} aria-label={`${w[0].side.name} oyununu sil`}>
                <Icon name="trash" />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
