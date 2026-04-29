import { ReactNode } from 'react'

// Section label + content — local copy of the helper that lives in Home.tsx.
export default function CustGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,.5)',
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}
