import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  /** e.g. "01" -> renders "FIG. 01" */
  figNumber: string
  figLabel: string
  title: string
  children: ReactNode
  /** Omit the bottom rule for the last section before the footer */
  noBorder?: boolean
}

export function Section({ id, figNumber, figLabel, title, children, noBorder }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-[72px] ${noBorder ? '' : 'border-b-2 border-ink'}`}
    >
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted"
        >
          <span className="font-bold text-red">{`FIG. ${figNumber}`}</span>
          {'— ' + figLabel}
        </motion.p>
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-10 text-balance text-[clamp(30px,4.5vw,44px)] font-bold uppercase tracking-tight sm:mb-12"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  )
}