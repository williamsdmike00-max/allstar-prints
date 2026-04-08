import { Link, useLocation } from 'react-router-dom'
import { MessageSquarePlus } from 'lucide-react'

export default function FloatingQuoteButton() {
  const { pathname } = useLocation()

  // Don't show on pricing page (already has quote form)
  if (pathname === '/pricing') return null

  return (
    <Link
      to="/pricing"
      className="fixed bottom-6 right-5 z-40 lg:hidden flex items-center gap-2 bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-full shadow-glow-red shadow-lg hover:bg-brand-red-dark transition-all hover:scale-105 active:scale-95"
    >
      <MessageSquarePlus size={16} />
      <span>Quick Quote</span>
    </Link>
  )
}
