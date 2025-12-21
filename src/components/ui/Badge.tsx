import type { PropsWithChildren } from 'react'
import { cn } from '../../utils/cn'

export const Badge = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <span className={cn('rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted', className)}>
    {children}
  </span>
)
