import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '../../data/projects'
import { site } from '../../data/site'
import { sectionMeta } from '../../data/sections'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { fadeInUp, staggerChildren } from '../../theme/motion'
import { SectionHeader } from '../ui/SectionHeader'
import { cn } from '../../utils/cn'
import type { Project } from '../../types'
import { ProjectDetails } from './ProjectDetails'
import { useMotionSafe } from '../../hooks/useMotionSafe'

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const { disableMotion } = useMotionSafe()

  return (
    <section id="projects" className="py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionHeader
          label={site.sections.projects}
          title={sectionMeta.projects.title}
          backgroundWord={sectionMeta.projects.background}
          description={sectionMeta.projects.description}
        />
        <motion.div
          className="grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(260px,_1fr))] auto-rows-[minmax(340px,_auto)] gap-6 sm:grid-cols-[repeat(auto-fit,minmax(280px,_1fr))] sm:auto-rows-[minmax(360px,_auto)]"
          variants={staggerChildren}
          initial={disableMotion ? false : 'hidden'}
          whileInView={disableMotion ? undefined : 'visible'}
          viewport={disableMotion ? undefined : { once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <Card
              key={project.title}
              as="article"
              className={cn(
                'group relative flex h-full flex-col overflow-hidden border-border/70 bg-card/80 p-0 shadow-soft transition-colors',
                index % 5 === 0 && 'sm:col-span-2',
              )}
              role="button"
              tabIndex={0}
              onClick={() => setActiveProject(project)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setActiveProject(project)
                }
              }}
            >
              <div className="relative h-56 overflow-hidden sm:h-60">
                <motion.img
                  src={project.image}
                  alt={project.alt ?? project.title}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.02 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              </div>
              <motion.div className="flex flex-1 flex-col gap-3 p-6" variants={fadeInUp}>
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-xl font-semibold text-foreground">{project.title}</h4>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        aria-label="View GitHub"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <a href={project.github}>
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        aria-label="View live site"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <a href={project.live}>
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-border/30 px-3 py-1 text-xs text-muted transition-colors group-hover:bg-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Card>
          ))}
        </motion.div>
        <AnimatePresence>
          {activeProject && (
            <ProjectDetails project={activeProject} onClose={() => setActiveProject(null)} />
          )}
        </AnimatePresence>
      </Container>
    </section>
  )
}
