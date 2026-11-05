import { useEffect, useRef, useState } from 'react'

const PATHS = {
  trophy: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 4 6',
  undo: 'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  check: 'M5 12.5 10 17.5 19 7',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  chevron: 'M6 9l6 6 6-6',
  back: 'M15 18l-6-6 6-6',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  edit: 'M4 20h4L19 9l-4-4L4 16v4zM13 7l4 4',
  history: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2',
  x: 'M6 6l12 12M18 6 6 18',
}

export function Icon({ name, className = 'w-5 h-5', strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  )
}

export function Logo({ className = 'w-12 h-12' }) {
  return (
    <div className={`${className} rounded-2xl bg-lime text-bg grid place-items-center font-black shadow-[0_8px_24px_-8px_rgba(163,230,53,.6)] shrink-0`} aria-hidden="true">
      <span className="text-[1.1em] leading-none tracking-tighter">101</span>
    </div>
  )
}

export function PhaseBadge({ phase }) {
  const map = {
    playing: ['Normal el', 'bg-white/10 text-mute'],
    counting: ['Sayma eli', 'bg-lime/15 text-lime border border-lime/40'],
    final: ['Son el', 'bg-lime text-bg'],
  }
  const [label, cls] = map[phase] || map.playing
  return <span className={`chip ${cls}`}>{label}</span>
}

// Değer değişince kısa "pop" animasyonu (key ile yeniden bağlanır)
export function AnimatedNumber({ value, className = '' }) {
  const [pop, setPop] = useState(false)
  const prev = useRef(value)
  useEffect(() => {
    if (prev.current === value) return
    prev.current = value
    setPop(true)
    const t = setTimeout(() => setPop(false), 400)
    return () => clearTimeout(t)
  }, [value])
  return <span className={`inline-block tabular-nums ${pop ? 'animate-pop' : ''} ${className}`}>{value}</span>
}

export function ScoreCard({ r, unit, leader, onPenalty, wide, hidden }) {
  const blur = hidden ? 'blur-md select-none pointer-events-none' : 'transition-[filter] duration-500'
  return (
    <div className={`card p-3.5 sm:p-4 relative overflow-hidden transition-colors ${leader ? 'border-lime/60' : ''} ${wide ? 'sm:p-5' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wider text-mute">{unit}</div>
          <div className="font-bold truncate">{r.side.name}</div>
        </div>
        {leader && <Icon name="trophy" className="w-4 h-4 text-lime shrink-0 mt-1" />}
      </div>
      <div className={`font-black leading-none my-3 ${wide ? 'text-6xl' : 'text-5xl'} ${leader ? 'text-lime' : 'text-tx'} ${blur}`} aria-hidden={hidden || undefined}>
        <AnimatedNumber value={r.grand} />
      </div>
      <div className={`flex items-center justify-between text-xs text-mute tabular-nums ${blur}`} aria-hidden={hidden || undefined}>
        <span>Normal <b className="text-tx font-semibold">{r.normal}</b></span>
        <span className={r.penalty ? 'text-danger' : ''}>Ceza <b className="font-semibold">{r.penalty}</b></span>
      </div>
      {hidden && <span className="sr-only">Skor sayma eli girildikten sonra açıklanacak</span>}
      {onPenalty && (
        <button onClick={onPenalty} className="mt-3 w-full min-h-[40px] rounded-xl border border-danger/30 text-danger text-sm font-semibold hover:bg-danger/10 active:scale-[0.97] transition">
          Ceza Ekle
        </button>
      )}
    </div>
  )
}

// Mobilde alttan açılan sheet, geniş ekranda ortalanmış modal. Çıkış animasyonu dahil.
export function Sheet({ title, subtitle, tone, children, onClose }) {
  const [closing, setClosing] = useState(false)
  const panel = useRef(null)
  const close = () => setClosing(true)

  useEffect(() => {
    const prev = document.activeElement
    panel.current?.focus()
    const h = (e) => e.key === 'Escape' && setClosing(true)
    window.addEventListener('keydown', h)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = overflow; prev?.focus?.() }
  }, [])

  return (
    <div className={`fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4 ${closing ? 'animate-fade-out' : 'animate-fade-in'}`} onClick={close}
      onAnimationEnd={(e) => { if (closing && e.target === e.currentTarget) onClose() }}>
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}
        className={`w-full sm:max-w-md focus:outline-none focus-visible:!ring-0 bg-card border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto pb-[max(1.25rem,env(safe-area-inset-bottom))] px-5 pt-3 sm:pt-5 ${closing ? 'animate-sheet-down' : 'animate-sheet-up'} ${tone === 'danger' ? 'border-t-danger/60' : ''}`}>
        <div className="sm:hidden mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h3 className={`text-lg font-bold ${tone === 'danger' ? 'text-danger' : ''}`}>{title}</h3>
            {subtitle && <p className="text-sm text-mute">{subtitle}</p>}
          </div>
          <button onClick={close} className="btn-ghost !px-2 -mr-2" aria-label="Kapat"><Icon name="x" /></button>
        </div>
        {typeof children === 'function' ? children(close) : children}
      </div>
    </div>
  )
}

// Eski API uyumluluğu için
export const Modal = Sheet

export function ConfirmDialog({ title, message, confirmLabel = 'Onayla', danger, onConfirm, onCancel }) {
  return (
    <Sheet title={title} tone={danger ? 'danger' : undefined} onClose={onCancel}>
      {(close) => (
        <>
          <p className="text-mute mb-5">{message}</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-secondary" onClick={close}>Vazgeç</button>
            <button className={danger ? 'btn-danger' : 'btn-primary'} onClick={onConfirm}>{confirmLabel}</button>
          </div>
        </>
      )}
    </Sheet>
  )
}

export function Toast({ toast }) {
  if (!toast) return null
  const err = toast.type === 'error'
  return (
    <div className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex justify-center px-4 pointer-events-none">
      <div key={toast.msg} role="status" className={`animate-rise flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-xl max-w-full border ${err ? 'bg-card text-danger border-danger/40' : 'bg-card text-tx border-lime/40'}`}>
        <Icon name={err ? 'alert' : 'check'} className={`w-4 h-4 shrink-0 ${err ? '' : 'text-lime'}`} />
        <span>{toast.msg}</span>
      </div>
    </div>
  )
}
