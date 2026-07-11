import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'
import { Tag } from './ui/Tag'
import type { ProjectEntry } from '../types'

function renderOutcome(project: ProjectEntry) {
  if (!project.outcomeHighlight) return project.outcome

  const parts = project.outcome.split(project.outcomeHighlight)
  return (
    <>
      {parts[0]}
      <span className="text-red">{project.outcomeHighlight}</span>
      {parts[1]}
    </>
  )
}

export function Projects() {
  const projects = [...portfolio.projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  )

  return (
    <Section id="projects" figNumber="04" figLabel="Selected Work" title="Projects">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 border-l-2 border-t-2 border-ink sm:grid-cols-2"
      >
        {projects.map((project) => (
          <div key={project.id} className="border-b-2 border-r-2 border-ink">
            <div className="flex items-center justify-between bg-ink px-[22px] py-3.5">
              <span className="text-[15px] font-bold uppercase tracking-wide text-paper">
                {project.name}
              </span>
              {project.featured && (
                <span className="bg-paper px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-red">
                  Featured
                </span>
              )}
            </div>
            <div className="p-[22px]">
              <p className="mb-3 text-sm leading-relaxed text-ink-muted">
                <span className="mb-0.5 block font-mono text-[10px] font-bold uppercase tracking-wide text-ink">
                  Problem
                </span>
                {project.problem}
              </p>
              <p className="mb-4 text-sm leading-relaxed text-ink-muted">
                <span className="mb-0.5 block font-mono text-[10px] font-bold uppercase tracking-wide text-ink">
                  Built
                </span>
                {project.solution}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <p className="border-t border-hairline pt-3.5 font-mono text-[13px] font-bold text-ink">
                → {renderOutcome(project)}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  )
}