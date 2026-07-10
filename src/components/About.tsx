import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'

export function About() {
  const { about } = portfolio

  return (
    <Section id="about" eyebrow="about" title={about.heading}>
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-balance leading-relaxed text-ink-muted"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-6 self-start rounded-lg border border-border bg-bg-elevated p-6 lg:grid-cols-1">
          {about.highlights.map((h) => (
            <div key={h.label}>
              <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                {h.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}