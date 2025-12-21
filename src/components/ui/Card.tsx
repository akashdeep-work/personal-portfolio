import type { PropsWithChildren } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../utils/cn'
import { scaleOnHover } from '../../theme/motion'

type CardProps = PropsWithChildren<{
  className?: string
  as?: 'div' | 'article'
}> &
  HTMLMotionProps<'div'>


export const Card = ({ children, className, as = 'div', ...rest }: CardProps) => {
  const Component = motion[as]

  return (
    <Component
      variants={scaleOnHover}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      className={cn('group relative rounded-2xl border border-border/60 bg-card/70 p-6 shadow-soft backdrop-blur', className)}
      {...rest}
    >
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </Component>
  )
}
