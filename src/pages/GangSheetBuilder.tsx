/**
 * GangSheetBuilder.tsx
 *
 * Thin redirect shell. The real builder is the LMM canonical static page at
 * /gang-sheet-builder.html (deployed from the lmm-gang-sheet-builder skill).
 *
 * Why a redirect: keeping the page in the React Router preserves backwards
 * compatibility for any in-SPA <Link to="/gang-sheet-builder"> click. The
 * Vercel rewrite in vercel.json catches direct/external hits server-side
 * before they reach this component.
 *
 * The previous 943-line React implementation (FAQ, sheet-size selector,
 * upload form) is preserved in git history if any of its marketing copy
 * needs to be ported into the static page later.
 */
import { useEffect } from 'react'

export default function GangSheetBuilder() {
  useEffect(() => {
    window.location.replace('/gang-sheet-builder.html')
  }, [])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="w-10 h-10 rounded-full border-2 border-brand-red border-t-transparent animate-spin" />
      <p className="text-sm font-bold uppercase tracking-widest text-brand-silver">
        Loading the Gang Sheet Builder…
      </p>
      <p className="text-sm text-brand-silver/60 max-w-md">
        If you are not redirected automatically,{' '}
        <a
          href="/gang-sheet-builder.html"
          className="text-brand-red font-bold underline hover:text-white transition-colors"
        >
          click here to launch the builder
        </a>
        .
      </p>
    </div>
  )
}
