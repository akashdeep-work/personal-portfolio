import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  /** Eyebrow rendered like a code comment, e.g. "about" -> "// about" */
  eyebrow: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 sm:mb-14"
        >
          <p className="font-mono text-sm text-signal">{`// ${eyebrow}`}</p>
          {title && (
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {title}
            </h2>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  )
}