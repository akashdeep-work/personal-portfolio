import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        solid: 'bg-foreground text-background hover:bg-foreground/90',
        outline: 'border border-border/80 bg-transparent text-foreground hover:bg-card/70',
        ghost: 'text-foreground hover:bg-border/30',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-5',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
)

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
      className?: string
      asChild?: boolean
    }
>

export const Button = ({ className, variant, size, asChild = false, children, ...props }: ButtonProps) => {
  if (asChild && children && typeof children === 'object') {
    const child = children as ReactElement<Record<string, any>>
    return (
      <child.type
        {...child.props}
        className={cn(buttonVariants({ variant, size }), (child.props as any).className, className)}
        {...props}
      />
    )
  }

  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}
