const LABEL = { counting: 'Sayma', final: 'Son' }

export default function HandHistoryTable({ game }) {
  if (!game.hands.length) return <p className="text-sm text-mute">Henüz el oynanmadı.</p>
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-mute border-b border-white/10">
            <th className="py-2 px-1 sticky left-0 bg-card font-medium">El</th>
            {game.sides.map((s) => <th key={s.id} className="py-2 px-2 text-right font-medium max-w-[7rem] truncate">{s.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {game.hands.map((h) => (
            <tr key={h.no} className="border-b border-white/5 last:border-0">
              <td className="py-2.5 px-1 sticky left-0 bg-card font-semibold whitespace-nowrap">
                {h.no}{LABEL[h.type] && <span className="chip ml-1.5 bg-lime/15 text-lime !py-0">{LABEL[h.type]}</span>}
              </td>
              {game.sides.map((s) => <td key={s.id} className="py-2.5 px-2 text-right tabular-nums">{h.scores[s.id]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
