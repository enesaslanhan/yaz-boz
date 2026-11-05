import { useCallback, useRef, useState } from 'react'
import { useApp } from './hooks/useGame.js'
import NewGameForm from './components/NewGameForm.jsx'
import GameScreen from './components/GameScreen.jsx'
import ResultView from './components/ResultView.jsx'
import { ConfirmDialog, Icon, Logo, Toast } from './components/ui.jsx'

export default function App() {
  const app = useApp()
  const [viewing, setViewing] = useState(null) // geçmişten açılan oyun
  const [toDelete, setToDelete] = useState(null)
  const [toast, setToast] = useState(null)
  const timer = useRef()

  const notify = useCallback((msg, type = 'ok') => {
    setToast({ msg, type })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 2500)
  }, [])

  const { game } = app
  const home = !viewing && !game
  let body
  if (viewing) {
    body = (
      <div className="space-y-4 max-w-2xl mx-auto">
        <button className="btn-secondary" onClick={() => setViewing(null)}><Icon name="back" />Geri</button>
        <ResultView game={viewing} />
      </div>
    )
  } else if (game && game.phase === 'finished') {
    body = (
      <div className="space-y-4 max-w-2xl mx-auto pb-28">
        <ResultView game={game} />
        <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-bg via-bg/95 to-transparent pt-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-4">
          <div className="max-w-2xl mx-auto flex gap-2">
            <button className="btn-secondary !px-0 w-12" onClick={app.undo} disabled={!app.canUndo} aria-label="Geri al"><Icon name="undo" /></button>
            <button className="btn-primary flex-1 !min-h-[52px] text-base" onClick={() => { app.archive(); notify('Oyun geçmişe kaydedildi') }}>Geçmişe Kaydet ve Ana Sayfa</button>
          </div>
        </div>
      </div>
    )
  } else if (game) {
    body = <GameScreen game={game} canUndo={app.canUndo} notify={notify} actions={app} />
  } else {
    body = (
      <div className="space-y-8">
        <section className="flex items-center gap-4">
          <Logo className="w-16 h-16 text-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Okey <span className="text-lime">Score</span></h1>
            <p className="text-sm text-mute">Okey 101 skorlarını, cezaları ve sayma elini kolayca takip et.</p>
          </div>
        </section>
        <div className="max-w-2xl">
          <NewGameForm onStart={app.start} notify={notify} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {!home && (
        <header className="sticky top-0 z-20 bg-bg/90 backdrop-blur border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center gap-2.5">
            <Logo className="w-8 h-8 text-xs !rounded-xl" />
            <span className="font-extrabold tracking-tight">Okey <span className="text-lime">Score</span></span>
          </div>
        </header>
      )}
      <main className={`max-w-4xl mx-auto px-4 ${home ? 'pt-[max(1.5rem,env(safe-area-inset-top))]' : 'pt-4'} pb-6`}>{body}</main>
      {toDelete && (
        <ConfirmDialog danger title="Oyunu Sil" message="Bu oyun geçmişten kalıcı olarak silinecek." confirmLabel="Sil"
          onCancel={() => setToDelete(null)} onConfirm={() => { app.removeFromHistory(toDelete.id); setToDelete(null); notify('Oyun silindi') }} />
      )}
      <Toast toast={toast} />
    </div>
  )
}
