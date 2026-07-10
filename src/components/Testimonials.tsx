import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'
import { Card } from './ui/Card'

export function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="testimonials" title="What people say">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {portfolio.testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Card className="flex h-full flex-col justify-between">
              <p className="text-sm leading-relaxed text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium text-ink">{t.name}</p>
                <p className="font-mono text-xs text-ink-faint">
                  {t.role}, {t.company}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}