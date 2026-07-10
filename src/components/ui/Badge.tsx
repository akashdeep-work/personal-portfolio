import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'default' | 'signal'
}

export function Badge({ children, tone = 'default' }: BadgeProps) {
  const toneClasses =
    tone === 'signal'
      ? 'border-signal/40 text-signal bg-signal-soft'
      : 'border-border-strong text-ink-muted bg-bg-inset'

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs ${toneClasses}`}
    >
      {children}
    </span>
  )
}