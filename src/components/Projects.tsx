import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'

export function Projects() {
  const projects = [...portfolio.projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  )

  return (
    <Section id="projects" eyebrow="projects" title="Selected work">
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Card className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
                {project.featured && <Badge tone="signal">featured</Badge>}
              </div>

              <div className="mt-4 space-y-3 text-sm leading-relaxed">
                <p>
                  <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                    Problem —{' '}
                  </span>
                  <span className="text-ink-muted">{project.problem}</span>
                </p>
                <p>
                  <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                    Built —{' '}
                  </span>
                  <span className="text-ink-muted">{project.solution}</span>
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div className="mt-5 flex-1" />

              <p className="mt-4 border-t border-border pt-4 font-mono text-sm text-signal">
                → {project.outcome}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}