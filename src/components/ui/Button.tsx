import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 border-2 border-ink px-6 py-[15px] font-mono text-[13px] font-bold uppercase tracking-wide transition-all duration-200'

  const variants = {
    primary: 'bg-ink text-paper hover:bg-red hover:border-red',
    secondary: 'bg-transparent text-ink hover:bg-ink hover:text-paper',
  }

  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}