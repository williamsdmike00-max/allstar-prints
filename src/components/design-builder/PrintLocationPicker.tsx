import { Check, Lock } from 'lucide-react'
import { useCustomizer, type PrintLocation } from '../customizer'

const LOCATIONS: { key: PrintLocation; label: string; sub: string; locked: boolean }[] = [
  { key: 'front',  label: 'Front',  sub: 'Included',     locked: true  },
  { key: 'back',   label: 'Back',   sub: '+$5 / shirt',  locked: false },
  { key: 'sleeve', label: 'Sleeve', sub: '+$3 / shirt',  locked: false },
]

export default function PrintLocationPicker() {
  const printLocations = useCustomizer((s) => s.printLocations)
  const togglePrintLocation = useCustomizer((s) => s.togglePrintLocation)

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        {LOCATIONS.map((loc) => {
          const active = printLocations.includes(loc.key)
          const cls = active
            ? 'border-brand-red bg-brand-red/15 text-white'
            : 'border-white/15 bg-brand-dark4 text-brand-silver hover:border-brand-red/60 hover:text-white'
          return (
            <button
              key={loc.key}
              type="button"
              onClick={() => !loc.locked && togglePrintLocation(loc.key)}
              disabled={loc.locked}
              aria-pressed={active}
              className={`relative flex flex-col items-start gap-0.5 px-3 py-3 rounded-lg border text-left transition-colors ${cls} ${
                loc.locked ? 'cursor-default' : 'cursor-pointer'
              }`}
              title={
                loc.locked
                  ? 'Front print is always included'
                  : active
                    ? `Click to remove ${loc.label.toLowerCase()} print`
                    : `Click to add ${loc.label.toLowerCase()} print (${loc.sub})`
              }
            >
              <span
                className={`absolute top-1.5 right-1.5 w-4 h-4 rounded flex items-center justify-center ${
                  active
                    ? 'bg-brand-red text-white'
                    : 'bg-transparent border border-white/20 text-transparent'
                }`}
              >
                {loc.locked ? <Lock size={9} /> : active ? <Check size={11} strokeWidth={3} /> : null}
              </span>
              <span className="text-xs font-black uppercase tracking-wide">{loc.label}</span>
              <span className="text-[10px] opacity-70">{loc.sub}</span>
            </button>
          )
        })}
      </div>
      <p className="text-[11px] text-brand-silver/70 leading-relaxed">
        Front is always included. Add back or sleeve printing to get the same design (or describe a different one in your project notes) printed in those locations too — pricing updates instantly.
      </p>
    </div>
  )
}
