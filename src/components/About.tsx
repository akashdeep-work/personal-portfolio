import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'

export function About() {
  const { about } = portfolio

  return (
    <Section id="about" figNumber="01" figLabel="About" title={about.heading}>
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="mb-[18px] text-balance text-base leading-relaxed text-ink-muted"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <dl className="flex flex-col border-t-2 border-ink">
          {about.highlights.map((h) => (
            <div
              key={h.label}
              className="flex items-baseline justify-between border-b border-hairline py-4"
            >
              <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                {h.label}
              </dt>
              <dd className="text-[15px] font-semibold">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}