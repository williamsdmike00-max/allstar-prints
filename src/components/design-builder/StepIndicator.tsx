import { Check } from 'lucide-react'

export type StepKey = 'product' | 'design' | 'checkout'

const STEPS: { key: StepKey; label: string; sub: string }[] = [
  { key: 'product',  label: 'Choose Product', sub: 'Pick a blank' },
  { key: 'design',   label: 'Design Online',  sub: 'Add art + text' },
  { key: 'checkout', label: 'Checkout',       sub: 'Quote or order' },
]

export default function StepIndicator({
  current,
  onJump,
}: {
  current: StepKey
  onJump?: (k: StepKey) => void
}) {
  const currentIdx = STEPS.findIndex((s) => s.key === current)

  return (
    <ol className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-0 w-full max-w-3xl mx-auto">
      {STEPS.map((step, i) => {
        const status = i < currentIdx ? 'done' : i === currentIdx ? 'active' : 'pending'
        const clickable = !!onJump && status === 'done'
        return (
          <li
            key={step.key}
            className="flex items-center flex-1 min-w-[140px] sm:min-w-0"
          >
            <button
              type="button"
              onClick={() => clickable && onJump?.(step.key)}
              disabled={!clickable}
              className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 rounded-xl w-full text-left transition-colors ${
                status === 'active'
                  ? 'bg-brand-red/10 border border-brand-red/40'
                  : status === 'done'
                    ? 'bg-brand-dark3 border border-white/10 hover:border-brand-red/40 cursor-pointer'
                    : 'bg-brand-dark3/40 border border-white/5 opacity-60'
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-black flex-shrink-0 ${
                  status === 'active'
                    ? 'bg-brand-red text-white'
                    : status === 'done'
                      ? 'bg-brand-red/20 text-brand-red'
                      : 'bg-white/10 text-brand-silver'
                }`}
              >
                {status === 'done' ? <Check size={14} strokeWidth={3} /> : i + 1}
              </span>
              <span className="flex flex-col min-w-0">
                <span
                  className={`text-xs font-black uppercase tracking-wide truncate ${
                    status === 'pending' ? 'text-brand-silver' : 'text-white'
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-brand-silver/70 hidden sm:inline">
                  {step.sub}
                </span>
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                aria-hidden
                className={`hidden sm:block w-6 h-px flex-shrink-0 ${
                  i < currentIdx ? 'bg-brand-red/60' : 'bg-white/10'
                }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
