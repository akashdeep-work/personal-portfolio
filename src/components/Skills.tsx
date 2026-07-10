import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'
import { Badge } from './ui/Badge'

export function Skills() {
  return (
    <Section id="skills" eyebrow="skills" title="What I work with">
      <div className="grid gap-6 sm:grid-cols-2">
        {portfolio.skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-lg border border-border bg-bg-elevated p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-wide text-signal">
              {group.category}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}