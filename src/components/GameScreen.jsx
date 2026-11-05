import { useState } from 'react'
import { totals } from '../logic/scoring.js'
import { currentHandNo, derivePhase } from '../logic/game.js'
import HandHistoryTable from './HandHistoryTable.jsx'
import PenaltyModal from './PenaltyModal.jsx'
import ScoreSheet from './ScoreSheet.jsx'
import { ConfirmDialog, Icon, PhaseBadge, ScoreCard, Sheet } from './ui.jsx'

function CountingBanner({ phase, rows, unit }) {
  const final = phase === 'final'
  const sorted = [...rows].sort((a, b) => a.grand - b.grand)
  return (
    <section className="animate-rise rounded-3xl border border-lime/50 bg-gradient-to-b from-lime/10 to-card p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="grid place-items-center w-10 h-10 rounded-2xl bg-lime text-bg"><Icon name="flag" /></span>
        <div>
          <div className="font-bold text-lime">{final ? 'Son el başladı' : 'Sayma eli'}</div>
          <div className="text-xs text-mute">{final ? 'Bu el oyunu bitirir. Güncel durum:' : 'Sonraki el son el olacak. Güncel durum:'}</div>
        </div>
      </div>
      <ol className="space-y-1.5">
        {sorted.map((r, i) => (
          <li key={r.side.id} className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${i === 0 ? 'bg-lime/15' : 'bg-surface/70'}`}>
            <span className={`w-6 text-center text-sm font-bold ${i === 0 ? 'text-lime' : 'text-mute'}`}>{i + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{r.side.name}</div>
              <div className="text-[11px] text-mute tabular-nums">{unit} · {r.normal} normal{r.penalty ? <> + <span className="text-danger">{r.penalty} ceza</span></> : ''}</div>
            </div>
            <div className={`text-2xl font-black tabular-nums ${i === 0 ? 'text-lime' : ''}`}>{r.grand}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function GameScreen({ game, canUndo, actions, notify }) {
  const [scoreOpen, setScoreOpen] = useState(false)
  const [penaltySideId, setPenaltySideId] = useState(null)
  const [menu, setMenu] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const [showHands, setShowHands] = useState(false)
  const phase = derivePhase(game)
  const t = totals(game)
  const single = game.mode === 'single'
  const unit = single ? 'Oyuncu' : 'Takım'
  const special = phase === 'final' // skorlar sayma eli girildikten sonra açılır
  const canCount = !game.totalHands && !game.countingStarted && game.hands.length > 0
  const min = Math.min(...t.map((r) => r.grand))
  const hasScores = game.hands.length > 0 || game.penalties.length > 0

  const save = (scores) => {
    const no = currentHandNo(game)
    actions.addHand(scores)
    notify(`${no}. el kaydedildi`)
  }
  const undo = () => { actions.undo(); notify('Son işlem geri alındı') }

  return (
    <div className="space-y-4 pb-28">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wider text-mute">{single ? 'Tekli Oyun' : 'Eşli Oyun'}</div>
          <h2 className="text-2xl font-black tabular-nums">
            {currentHandNo(game)}. El<span className="text-mute font-semibold">{game.totalHands ? ` / ${game.totalHands}` : ''}</span>
          </h2>
          <div className="text-xs text-mute truncate mt-0.5">{game.sides.map((s) => s.name).join(' · ')}</div>
        </div>
        <PhaseBadge phase={phase} />
      </header>

      {special && <CountingBanner phase={phase} rows={t} unit={unit} />}

      {!special && (
        <div className="flex items-center gap-2 text-xs text-mute -mb-1">
          <Icon name="alert" className="w-4 h-4 text-lime shrink-0" />Skorlar gizli — sayma eli girildikten sonra açıklanacak.
        </div>
      )}
      <div className={`grid gap-3 ${single ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {t.map((r) => (
          <ScoreCard key={r.side.id} r={r} unit={unit} wide={!single} hidden={!special} leader={special && hasScores && r.grand === min}
            onPenalty={() => setPenaltySideId(r.side.id)} />
        ))}
      </div>

      <section className="card">
        <button className="w-full flex items-center justify-between p-4 font-bold" onClick={() => setShowHands((v) => !v)} aria-expanded={showHands}>
          <span className="flex items-center gap-2"><Icon name="list" className="w-5 h-5 text-mute" />El Geçmişi <span className="chip bg-surface text-mute">{game.hands.length}</span></span>
          <Icon name="chevron" className={`w-5 h-5 text-mute transition-transform ${showHands ? 'rotate-180' : ''}`} />
        </button>
        {showHands && <div className="px-4 pb-4 animate-fade-in"><HandHistoryTable game={game} /></div>}
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-bg via-bg/95 to-transparent pt-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <button className="btn-secondary !px-0 w-12" disabled={!canUndo} onClick={undo} aria-label="Geri al"><Icon name="undo" /></button>
          <button className="btn-primary flex-1 !min-h-[52px] text-base" onClick={() => setScoreOpen(true)}>
            <Icon name="edit" />{phase === 'final' ? 'Son El Puanını Gir' : 'Skor Gir'}
          </button>
          <button className="btn-secondary !px-0 w-12" onClick={() => setMenu(true)} aria-label="Daha fazla"><Icon name="more" /></button>
        </div>
      </div>

      {scoreOpen && <ScoreSheet game={game} phase={phase} onSave={save} onClose={() => setScoreOpen(false)} />}
      {penaltySideId && (
        <PenaltyModal sides={game.sides} initialSideId={penaltySideId} penalties={game.penalties}
          onAdd={actions.addPenalty} onClose={() => setPenaltySideId(null)} notify={notify} />
      )}
      {menu && (
        <Sheet title="Oyun menüsü" onClose={() => setMenu(false)}>
          {(close) => {
            const pick = (c) => { setConfirm(c); close() }
            return (
              <div className="space-y-2">
                {canCount && <button className="btn-secondary w-full justify-start" onClick={() => pick('count')}><Icon name="flag" />Sayma Eline Geç</button>}
                <button className="btn-secondary w-full justify-start" disabled={!game.hands.length} onClick={() => pick('finish')}><Icon name="trophy" />Oyunu Bitir</button>
                <button className="btn-secondary w-full justify-start !text-danger" onClick={() => pick('discard')}><Icon name="trash" />Oyunu İptal Et</button>
              </div>
            )
          }}
        </Sheet>
      )}
      {confirm === 'count' && (
        <ConfirmDialog title="Sayma Eli" message="Sayma eline geçilsin mi? Toplamlar gösterilecek ve sonraki el son el olacak. Yanlışlıkla basarsanız Geri Al ile dönebilirsiniz."
          confirmLabel="Sayma Eline Geç" onCancel={() => setConfirm(null)} onConfirm={() => { actions.startCounting(); setConfirm(null); notify('Sayma eli başladı') }} />
      )}
      {confirm === 'finish' && (
        <ConfirmDialog title="Oyunu Bitir" message="Oyun şu anki puanlarla bitirilsin mi?" confirmLabel="Bitir"
          onCancel={() => setConfirm(null)} onConfirm={() => { actions.finish(); setConfirm(null) }} />
      )}
      {confirm === 'discard' && (
        <ConfirmDialog danger title="Oyunu İptal Et" message="Oyun kaydedilmeden silinecek. Emin misiniz?" confirmLabel="Sil"
          onCancel={() => setConfirm(null)} onConfirm={() => { actions.discard(); setConfirm(null) }} />
      )}
    </div>
  )
}
