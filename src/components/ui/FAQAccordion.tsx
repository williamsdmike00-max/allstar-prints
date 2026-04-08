import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

function FAQItemRow({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${open ? 'border-brand-red/30 bg-brand-dark3' : 'border-white/8 bg-brand-dark2'}`}>
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-bold text-white pr-4">{question}</span>
        <span className="flex-shrink-0 text-brand-red">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-brand-silver leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <FAQItemRow key={i} {...item} />
      ))}
    </div>
  )
}
