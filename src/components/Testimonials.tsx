import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'

export function Testimonials() {
  return (
    <Section id="testimonials" figNumber="05" figLabel="References" title="What People Say">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 border-l-2 border-t-2 border-ink sm:grid-cols-2"
      >
        {portfolio.testimonials.map((t) => (
          <div key={t.id} className="border-b-2 border-r-2 border-ink p-8">
            <span
              aria-hidden
              className="mb-3.5 block font-grotesk text-[56px] font-bold leading-[0.5] text-red"
            >
              &ldquo;
            </span>
            <p className="text-base font-medium leading-relaxed">{t.quote}</p>
            <div className="mt-5 border-t border-hairline pt-4 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              <b className="mb-0.5 block font-grotesk text-sm font-bold normal-case tracking-normal text-ink">
                {t.name}
              </b>
              {t.company ? `${t.role}, ${t.company}` : t.role}
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  )
}