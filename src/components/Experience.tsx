import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'

export function Experience() {
  return (
    <Section id="experience" figNumber="03" figLabel="Timeline" title="Where I've Worked">
      <div>
        {portfolio.experience.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`grid grid-cols-[56px_1fr] gap-5 py-9 sm:grid-cols-[90px_1fr] sm:gap-6 ${
              i === portfolio.experience.length - 1 ? '' : 'border-b border-hairline'
            } ${i === 0 ? 'pt-0' : ''}`}
          >
            <span className="font-mono text-[28px] font-bold leading-none text-red sm:text-[44px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-bold sm:text-xl">{role.role}</h3>
                <span className="font-mono text-[11px] uppercase text-ink-muted">
                  {role.start} — {role.end}
                </span>
              </div>
              <p className="mt-1 font-mono text-[13px] uppercase tracking-wide text-ink-muted">
                {role.company} · {role.location}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {role.achievements.map((a, idx) => (
                  <li
                    key={idx}
                    className="relative pl-[18px] text-sm leading-relaxed text-ink-muted sm:text-[14.5px]"
                  >
                    <span className="absolute left-0 text-ink-faint">—</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}