import { Zap, ShieldCheck, BadgeCheck, HeartHandshake } from 'lucide-react'

const items = [
  { icon: <Zap size={15} />, label: '48-Hr Rush Available' },
  { icon: <BadgeCheck size={15} />, label: 'No Minimum Orders' },
  { icon: <ShieldCheck size={15} />, label: '100% Quality Guarantee' },
  { icon: <HeartHandshake size={15} />, label: 'Local Business · Real Support' },
]

export default function TrustBar() {
  return (
    <div className="bg-brand-dark2 border-y border-white/8">
      <div className="container-xl section-padding py-3.5">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-brand-silver">
              <span className="text-brand-red">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
