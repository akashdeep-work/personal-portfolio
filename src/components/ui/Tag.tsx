import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center border border-ink px-3 py-1.5 font-mono text-xs text-ink">
      {children}
    </span>
  )
}