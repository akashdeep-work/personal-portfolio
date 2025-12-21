import { motion } from 'framer-motion'
import { Badge } from './Badge'
import { fadeInUp } from '../../theme/motion'
import { cn } from '../../utils/cn'
import { useMotionSafe } from '../../hooks/useMotionSafe'

type SectionHeaderProps = {
  label: string
  title: string
  align?: 'left' | 'center'
  backgroundWord?: string
  description?: string
}

export const SectionHeader = ({
  label,
  title,
  align = 'left',
  backgroundWord,
  description,
}: SectionHeaderProps) => {
  const { disableMotion } = useMotionSafe()
  const background = backgroundWord ?? label

  return (
    <div className={cn('relative py-2', align === 'center' ? 'text-center' : 'text-left')}>
      <span
        className={cn(
          'pointer-events-none absolute select-none uppercase font-black tracking-tight text-6xl sm:text-7xl',
          'text-foreground/5 blur-sm',
          align === 'center'
            ? 'left-1/2 -translate-x-1/2 -translate-y-1/2'
            : 'left-0 -translate-y-1/2',
          'top-6 sm:top-8'
        )}
        aria-hidden
      >
        {background}
      </span>
      <motion.div
        className={`relative inline-flex items-center gap-3 ${align === 'center' ? 'mx-auto' : ''}`}
        variants={fadeInUp}
        initial={disableMotion ? false : 'hidden'}
        whileInView={disableMotion ? undefined : 'visible'}
        viewport={disableMotion ? undefined : { once: true }}
      >
        <Badge>{label}</Badge>
        <div className="h-px w-16 bg-border/60" />
      </motion.div>
      <div className={`relative mt-4 ${align === 'center' ? 'mx-auto max-w-3xl' : ''}`}>
        <motion.h3
          className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
          variants={fadeInUp}
          initial={disableMotion ? false : 'hidden'}
          whileInView={disableMotion ? undefined : 'visible'}
          viewport={disableMotion ? undefined : { once: true }}
        >
          {title}
        </motion.h3>
        {description ? (
          <motion.p
            className="mt-3 max-w-3xl text-lg text-muted"
            variants={fadeInUp}
            initial={disableMotion ? false : 'hidden'}
            whileInView={disableMotion ? undefined : 'visible'}
            viewport={disableMotion ? undefined : { once: true, amount: 0.3 }}
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </div>
  )
}
