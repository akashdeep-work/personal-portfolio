import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '../../types'
import { Button } from '../ui/Button'

export type ProjectDetailsProps = {
  project: Project
  onClose: () => void
}

export const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-2xl"
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.8, 0.25, 1] } }}
        exit={{ scale: 0.98, y: 12, opacity: 0, transition: { duration: 0.25, ease: 'easeInOut' } }}
        layout
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(116,204,250,0.06),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(144,122,255,0.08),transparent_30%)]" />
        <div className="relative grid gap-0 md:grid-cols-2">
          <div className="relative h-64 overflow-hidden md:h-full">
            <motion.img
              src={project.image}
              alt={project.alt ?? project.title}
              className="h-full w-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent" />
            <motion.div
              className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-4 text-xs text-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.4 } }}
            >
              <span className="rounded-full bg-border/50 px-3 py-1 font-medium text-foreground">{project.title}</span>
              <span className="rounded-full bg-background/60 px-3 py-1">Featured project</span>
            </motion.div>
          </div>
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted">Project Detail</p>
                <h3 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">{project.title}</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close details">
                ✕
              </Button>
            </div>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-border/30 px-3 py-1 text-xs font-medium text-muted shadow-inner backdrop-blur"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.live && (
                <Button asChild>
                  <a href={project.live} target="_blank" rel="noreferrer">
                    View live project
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.github && (
                <Button variant="outline" asChild>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    View repository
                    <Github className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
            <div className="rounded-xl border border-border/70 bg-background/60 p-4 shadow-inner">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Spotlight</p>
              <p className="mt-2 text-sm text-foreground">
                Crafted with a consistent design language, motion presets, and accessible interactions to keep the storytelling cohesive across the portfolio.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
