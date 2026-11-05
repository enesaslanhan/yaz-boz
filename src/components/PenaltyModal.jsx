import { useState } from 'react'
import { Sheet, Icon } from './ui.jsx'

export default function PenaltyModal({ sides, initialSideId, penalties, onAdd, onClose, notify }) {
  const [sideId, setSideId] = useState(initialSideId)
  const [val, setVal] = useState('')
  const side = sides.find((s) => s.id === sideId)

  const add = (raw) => {
    const n = Number(raw)
    if (raw === '' || !Number.isInteger(n) || n <= 0) return notify('Ceza puanı pozitif bir tam sayı olmalı.', 'error')
    onAdd(side.id, n)
    notify(`${side.name}: +${n} ceza eklendi`)
    setVal('')
  }
  const list = penalties.filter((p) => p.sideId === sideId)

  return (
    <Sheet title="Ceza Ekle" subtitle="Normal skordan ayrı tutulur, genel toplama eklenir." tone="danger" onClose={onClose}>
      {(close) => (
        <>
          <div className="text-xs font-semibold uppercase tracking-wider text-mute mb-2">Kime</div>
          <div className="flex flex-wrap gap-2 mb-5" role="radiogroup" aria-label="Ceza alacak taraf">
            {sides.map((s) => (
              <button key={s.id} role="radio" aria-checked={s.id === sideId} onClick={() => setSideId(s.id)}
                className={`px-3.5 min-h-[40px] rounded-full text-sm font-semibold border transition active:scale-95 max-w-full truncate ${s.id === sideId ? 'bg-danger text-bg border-danger' : 'bg-surface border-white/10 text-mute'}`}>
                {s.name}
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-mute mb-2">Ceza puanı</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[101, 202, 404].map((p) => (
              <button key={p} className="btn bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20" onClick={() => add(p)}>+{p}</button>
            ))}
          </div>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); add(val) }}>
            <input className="input !border-danger/30 focus:!border-danger focus:!ring-danger/30" type="number" inputMode="numeric" placeholder="Elle gir" aria-label="Ceza puanı"
              value={val} onChange={(e) => setVal(e.target.value)} autoFocus />
            <button className="btn-danger shrink-0">Onayla</button>
          </form>

          {list.length > 0 && (
            <div className="mt-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-mute mb-2">{side.name} için eklenen cezalar</div>
              <div className="flex flex-wrap gap-1.5">
                {list.map((p) => (
                  <span key={p.id} className="chip bg-danger/10 text-danger tabular-nums gap-1">
                    <Icon name="alert" className="w-3 h-3" />{p.points}<span className="opacity-60 font-normal">· el {p.handNo}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          <button className="btn-secondary w-full mt-5" onClick={close}>Kapat</button>
        </>
      )}
    </Sheet>
  )
}
