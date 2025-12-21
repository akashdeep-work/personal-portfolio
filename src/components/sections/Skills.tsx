import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import { site } from '../../data/site'
import { sectionMeta } from '../../data/sections'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { fadeInUp, staggerChildren } from '../../theme/motion'
import { SectionHeader } from '../ui/SectionHeader'
import { cn } from '../../utils/cn'
import { useMotionSafe } from '../../hooks/useMotionSafe'

const skillCatalog = Object.fromEntries(skills.map((group) => [group.category, group.items]))

const skillTracks = [
  {
    id: 'frontend',
    title: 'Frontend Systems Lab',
    accent: 'from-emerald-400/60 via-emerald-500/15 to-emerald-400/5',
    badge: 'Interfaces that feel alive',
    summary: 'Design systems, view transitions, and inclusive interactions shipped with QA baked in.',
    stack: skillCatalog['Frontend Engineering'] ?? [],
    flows: [
      { label: 'Design tokens → components → docs', span: 88 },
      { label: 'Motion timelines & microcopy', span: 76 },
      { label: 'Playwright + a11y gates', span: 72 },
    ],
    code: `const Page = () => (\n  <Surface motion='ease' a11y='aria-live'>\n    <Card variant='glass'>\n      <CTA onClick={ship}>Deploy preview</CTA>\n    </Card>\n  </Surface>\n)`,
  },
  {
    id: 'backend',
    title: 'Backend & Platform',
    accent: 'from-indigo-400/60 via-purple-500/10 to-indigo-400/5',
    badge: 'APIs with guardrails',
    summary: 'Typed services, observability, and edge delivery tuned for performance budgets.',
    stack: skillCatalog['Backend Engineering'] ?? [],
    flows: [
      { label: 'GraphQL/REST + input validation', span: 86 },
      { label: 'Data layer: Prisma, Redis, queues', span: 80 },
      { label: 'CI deploys → health + tracing', span: 78 },
    ],
    code: `export async function handler(req) {\n  const input = validate(req.body)\n  const data = await db.plan.run(input)\n  return json({ ok: true, data })\n}`,
  },
  {
    id: 'ai',
    title: 'AI & ML Delivery',
    accent: 'from-amber-400/60 via-orange-500/10 to-amber-400/5',
    badge: 'Models in production',
    summary: 'Feature engineering, retrieval, and model evaluation built into the product loop.',
    stack: skillCatalog['AI & ML Systems'] ?? [],
    flows: [
      { label: 'Prompt stacks + tools orchestration', span: 84 },
      { label: 'Vector search + guardrails', span: 78 },
      { label: 'Offline evals → live metrics', span: 82 },
    ],
    code: `const chain = compose([embed, retrieve, reason])\nconst result = await chain.run(userQuery)\nstream(result, { onToken: pushToUI })`,
  },
]

export const Skills = () => {
  const { disableMotion } = useMotionSafe()

  return (
    <section id="skills" className="py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionHeader
          label={site.sections.skills}
          title={sectionMeta.skills.title}
          backgroundWord={sectionMeta.skills.background}
          description={sectionMeta.skills.description}
        />
        <div className="relative">
          <motion.div
            className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-accent/10 via-transparent to-accent/5 blur-3xl"
            initial={disableMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={disableMotion ? undefined : { opacity: 1 }}
            viewport={disableMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          />
          <motion.div
            className="grid gap-6 lg:grid-cols-3"
            variants={staggerChildren}
            initial={disableMotion ? false : 'hidden'}
            whileInView={disableMotion ? undefined : 'visible'}
            viewport={disableMotion ? undefined : { once: true, amount: 0.2 }}
          >
            {skillTracks.map((track) => (
              <Card
                key={track.id}
                className={cn(
                  'relative flex h-full flex-col overflow-hidden border-border/60 bg-card/70 p-6 shadow-xl shadow-black/10 backdrop-blur',
                  'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:opacity-80',
                  `before:${track.accent}`,
                )}
                as="article"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
                  <motion.div
                    className="absolute -left-10 top-6 h-32 w-32 rounded-full bg-foreground/10 blur-3xl"
                    animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden
                  />
                  <motion.div
                    className="absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-accent/20 blur-3xl"
                    animate={{ x: [0, -12, 0], y: [0, 8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden
                  />
                </div>
                <motion.div className="space-y-3" variants={fadeInUp}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">{site.sections.skills}</p>
                      <h4 className="text-xl font-semibold text-foreground">{track.title}</h4>
                    </div>
                    <motion.span
                      className="rounded-full bg-foreground/5 px-3 py-1 text-[11px] font-semibold text-accent shadow-inner"
                      animate={{ opacity: [0.7, 1, 0.7], y: [-2, 0, -2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {track.badge}
                    </motion.span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{track.summary}</p>
                </motion.div>

                <motion.div className="mt-4 flex flex-wrap gap-2" variants={fadeInUp}>
                  {track.stack.map((skill) => (
                    <motion.span
                      key={skill}
                      className="flex items-center gap-2 rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs font-semibold text-foreground"
                      whileHover={{ y: -2, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(255,255,255,0.05)]" />
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div className="mt-6 space-y-3" variants={fadeInUp}>
                  {track.flows.map((flow, index) => (
                    <div
                      key={flow.label}
                      className="relative overflow-hidden rounded-xl border border-border/70 bg-foreground/5 px-3 py-3"
                    >
                      <div className="flex items-center justify-between gap-3 text-sm text-foreground">
                        <span className="flex items-center gap-2">
                          <span className="relative h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]">
                            <motion.span
                              className="absolute inset-0 rounded-full bg-accent"
                              animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
                              transition={{ duration: 2 + index * 0.2, repeat: Infinity }}
                            />
                          </span>
                          {flow.label}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-muted">{flow.span}%</span>
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent via-foreground/80 to-accent/80"
                          initial={{ width: disableMotion ? `${flow.span}%` : '0%' }}
                          whileInView={disableMotion ? undefined : { width: `${flow.span}%` }}
                          viewport={disableMotion ? undefined : { once: true, amount: 0.35 }}
                          transition={{ duration: 1.1, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-6 flex flex-1 flex-col justify-end gap-3 rounded-2xl border border-border/60 bg-background/40 p-4"
                  variants={fadeInUp}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-accent/80">
                    <span>Live build</span>
                    <span className="text-muted">Hands-on</span>
                  </div>
                  <pre className="relative overflow-hidden rounded-xl bg-foreground/5 p-4 text-[12px] leading-relaxed text-foreground">
                    <motion.span
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                      animate={{ x: ['-30%', '110%'] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      aria-hidden
                    />
                    <code>{track.code}</code>
                  </pre>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-foreground/5 px-2 py-2">
                      <span className="h-2 w-2 rounded-full bg-green-400" />
                      <div>
                        <p className="font-semibold text-foreground">Deployable</p>
                        <p className="text-muted">CI ready</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-foreground/5 px-2 py-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      <div>
                        <p className="font-semibold text-foreground">Typed</p>
                        <p className="text-muted">Safe inputs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-foreground/5 px-2 py-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      <div>
                        <p className="font-semibold text-foreground">Observed</p>
                        <p className="text-muted">Metrics live</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
