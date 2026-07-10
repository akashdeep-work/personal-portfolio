import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-all duration-200 font-sans'

  const variants = {
    primary: 'bg-signal text-bg hover:bg-signal/90 active:bg-signal/80',
    secondary:
      'border border-border-strong text-ink hover:border-signal/60 hover:text-signal',
  }

  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}