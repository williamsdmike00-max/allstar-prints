import { useCustomizer, type PrintLocation } from '../customizer'

const LOCATIONS: { key: PrintLocation; label: string; sub: string; available: boolean }[] = [
  { key: 'front',  label: 'Front',  sub: 'Included',     available: true  },
  { key: 'back',   label: 'Back',   sub: '+$5 / shirt',  available: false },
  { key: 'sleeve', label: 'Sleeve', sub: '+$3 / shirt',  available: false },
]

export default function PrintLocationPicker() {
  const printLocation = useCustomizer((s) => s.printLocation)
  const setPrintLocation = useCustomizer((s) => s.setPrintLocation)

  return (
    <div className="grid grid-cols-3 gap-2">
      {LOCATIONS.map((loc) => {
        const active = printLocation === loc.key
        const cls = active
          ? 'border-brand-red bg-brand-red/15 text-white'
          : loc.available
            ? 'border-white/15 bg-brand-dark4 text-brand-silver hover:border-brand-red/60 hover:text-white'
            : 'border-white/8 bg-brand-dark4/60 text-brand-silver/50'
        return (
          <button
            key={loc.key}
            type="button"
            onClick={() => loc.available && setPrintLocation(loc.key)}
            disabled={!loc.available}
            className={`flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg border text-left transition-colors ${cls}`}
            title={loc.available ? loc.label : `${loc.label} — coming soon`}
          >
            <span className="text-xs font-black uppercase tracking-wide">
              {loc.label}
            </span>
            <span className="text-[10px] opacity-70">
              {loc.available ? loc.sub : 'Coming soon'}
            </span>
          </button>
        )
      })}
    </div>
  )
}
