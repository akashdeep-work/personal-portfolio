import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'

export function Experience() {
  return (
    <Section id="experience" eyebrow="experience" title="Where I've worked">
      <ol className="relative space-y-10 border-l border-border pl-8">
        {portfolio.experience.map((role, i) => (
          <motion.li
            key={role.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative"
          >
            <span
              aria-hidden
              className="absolute -left-[35px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-signal bg-bg"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold text-ink">{role.role}</h3>
              <span className="font-mono text-xs text-ink-faint">
                {role.start} — {role.end}
              </span>
            </div>
            <p className="font-mono text-sm text-signal">
              {role.company} · {role.location}
            </p>
            <ul className="mt-3 space-y-2">
              {role.achievements.map((a, idx) => (
                <li key={idx} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                  {a}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}