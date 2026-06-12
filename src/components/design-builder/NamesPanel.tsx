import { Plus, X } from 'lucide-react'
import { useCustomizer } from '../customizer'
import { sizes } from '../customizer/constants'

// Custom Ink-style "Add Names" — one row per personalized garment.
// Priced at +$4 per entry (price-sheet Name/Number add-on).
export default function NamesPanel() {
  const roster = useCustomizer((s) => s.roster)
  const addRosterEntry = useCustomizer((s) => s.addRosterEntry)
  const updateRosterEntry = useCustomizer((s) => s.updateRosterEntry)
  const removeRosterEntry = useCustomizer((s) => s.removeRosterEntry)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-brand-silver/70 leading-relaxed">
        Team or group order? Add each person's name and/or number — we print
        each one individually (+$4 per personalized shirt).
      </p>

      {roster.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_56px_64px_24px] gap-1.5 text-[10px] font-black uppercase tracking-wider text-brand-silver/50 px-0.5">
            <span>Name</span><span>#</span><span>Size</span><span />
          </div>
          {roster.map((r) => (
            <div key={r.id} className="grid grid-cols-[1fr_56px_64px_24px] gap-1.5 items-center">
              <input
                value={r.name}
                onChange={(e) => updateRosterEntry(r.id, { name: e.target.value.toUpperCase() })}
                placeholder="SMITH"
                className="bg-brand-dark4 border border-white/10 rounded-md px-2.5 py-2 text-xs text-white placeholder:text-brand-silver/30 outline-none focus:border-brand-red min-w-0"
              />
              <input
                value={r.number}
                onChange={(e) => updateRosterEntry(r.id, { number: e.target.value.replace(/[^0-9]/g, '').slice(0, 3) })}
                placeholder="23"
                inputMode="numeric"
                className="bg-brand-dark4 border border-white/10 rounded-md px-2 py-2 text-xs text-white placeholder:text-brand-silver/30 outline-none focus:border-brand-red text-center"
              />
              <select
                value={r.size}
                onChange={(e) => updateRosterEntry(r.id, { size: e.target.value as typeof r.size })}
                className="bg-brand-dark4 border border-white/10 rounded-md px-1.5 py-2 text-xs text-white outline-none focus:border-brand-red"
              >
                {sizes.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button
                type="button"
                onClick={() => removeRosterEntry(r.id)}
                className="text-brand-silver/50 hover:text-brand-red transition-colors"
                aria-label="Remove row"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addRosterEntry}
        className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-lg border border-dashed border-white/20 text-xs font-bold text-brand-silver hover:text-white hover:border-brand-red/60 transition-colors"
      >
        <Plus size={14} /> Add a name
      </button>

      {roster.length > 0 && (
        <p className="text-[11px] text-brand-silver/70">
          {roster.length} personalized shirt{roster.length > 1 ? 's' : ''} · +${roster.length * 4} total
        </p>
      )}
    </div>
  )
}
