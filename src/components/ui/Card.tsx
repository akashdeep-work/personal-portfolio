import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-bg-elevated p-6 transition-colors duration-200 hover:border-border-strong ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}