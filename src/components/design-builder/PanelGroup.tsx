import { ReactNode, useState } from 'react'
import { ChevronDown } from 'lucide-react'

// A small accordion section used inside the right-side action panel. Closed
// by default on mobile to keep the panel compact, open on desktop.
export default function PanelGroup({
  label,
  icon,
  defaultOpen = false,
  children,
}: {
  label: string
  icon?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-xl border border-white/8 bg-brand-dark3 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5">
          {icon && <span className="text-brand-red">{icon}</span>}
          <span className="text-xs font-black uppercase tracking-wide text-white">
            {label}
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`text-brand-silver transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-4 pb-4 pt-1">{children}</div>}
    </div>
  )
}
