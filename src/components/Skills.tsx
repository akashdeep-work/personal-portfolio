import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'
import { Tag } from './ui/Tag'

export function Skills() {
  return (
    <Section id="skills" figNumber="02" figLabel="Stack" title="What I Work With">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="border-t-2 border-ink"
      >
        {portfolio.skills.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 gap-3 border-b border-hairline py-5 sm:grid-cols-[200px_1fr] sm:items-start sm:gap-6"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-wide">{group.category}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  )
}