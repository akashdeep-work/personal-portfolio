import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Briefcase } from 'lucide-react'
import { experience } from '../../data/experience'
import { site } from '../../data/site'
import { sectionMeta } from '../../data/sections'
import { Container } from '../layout/Container'
import { fadeInUp, staggerChildren } from '../../theme/motion'
import { SectionHeader } from '../ui/SectionHeader'
import { useMotionSafe } from '../../hooks/useMotionSafe'

const shellGlow = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, rotateX: -6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18, mass: 1.08 },
  },
}

const pulseLine = {
  animate: {
    scaleY: [0.6, 1.15, 0.6],
    boxShadow: ['0 0 0 rgba(129, 140, 248, 0.4)', '0 0 30px rgba(129, 140, 248, 0.3)', '0 0 0 rgba(129, 140, 248, 0.4)'],
  },
  transition: { repeat: Infinity, duration: 3.6, ease: 'easeInOut' },
}

export const Experience = () => {
  const { disableMotion } = useMotionSafe()

  return (
    <section id="experience" className="py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeader
          label={site.sections.experience}
          title={sectionMeta.experience.title}
          backgroundWord={sectionMeta.experience.background}
          description={sectionMeta.experience.description}
        />

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-surface/50 via-surface/20 to-background p-6 shadow-[0_20px_80px_-60px] shadow-foreground/30"
          variants={disableMotion ? undefined : shellGlow}
          initial={disableMotion ? 'visible' : 'hidden'}
          animate={disableMotion ? 'visible' : undefined}
          whileInView={disableMotion ? undefined : 'visible'}
          viewport={disableMotion ? undefined : { once: true, amount: 0.3 }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.06),transparent_35%)]" />
            <motion.div
              className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent/60 via-accent/20 to-transparent"
              animate={disableMotion ? undefined : { scaleY: [0.9, 1.05, 0.9] }}
              transition={disableMotion ? undefined : { repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative grid items-start gap-6 lg:grid-cols-[320px,1fr]">
            <div className="relative self-start overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 shadow-inner">
              <motion.div
                className="absolute -left-10 top-6 h-32 w-32 rounded-full bg-accent/20 blur-3xl"
                animate={{ x: [0, 12, -8, 0], y: [0, -6, 10, 0] }}
                transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
              />
              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted">Career Track</p>
                    <p className="text-lg font-semibold text-foreground">Interactive Journey</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted">
                  Follow the glowing rail to explore how each role pushed my craft forward. Hover to see the tech mix, achievements, and
                  the impact threads that tie everything together.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs text-muted">
                  <div className="rounded-xl border border-border/60 bg-surface/50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/70">Ship Speed</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">Sprint-ready</p>
                    <p>Design systems, data flows, observability baked in.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-surface/50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/70">Impact</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">Product-first</p>
                    <p>Outcome-led experiments, measurable lifts, resilient stacks.</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/70">What to look for</p>
                  <div className="grid gap-2">
                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/60 p-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_6px] shadow-accent/15" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Delivery Modes</p>
                        <p>Hands-on builds, system refactors, and coaching across squads.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/60 p-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_6px] shadow-primary/15" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Signals to Watch</p>
                        <p>Cycle time drops, activation lifts, and calmer on-call pages.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/60 p-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_6px] shadow-emerald-400/15" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Collaboration</p>
                        <p>Pairing with PM & Design, mentoring engineers, sharing playbooks.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="relative grid gap-6"
              variants={disableMotion ? undefined : staggerChildren}
              initial={disableMotion ? 'visible' : 'hidden'}
              animate={disableMotion ? 'visible' : undefined}
              whileInView={disableMotion ? undefined : 'visible'}
              viewport={disableMotion ? undefined : { once: true, amount: 0.2 }}
            >
              {experience.map((role, index) => {
                const alignLeft = index % 2 === 0

                return (
                  <motion.article
                    key={role.company}
                    variants={cardVariants}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-5 shadow-lg/30 backdrop-blur"
                    style={{ transformOrigin: alignLeft ? 'left center' : 'right center' }}
                    whileHover={{ y: -6, rotateX: alignLeft ? 3 : -3, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 14 }}
                  >
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.08),transparent_30%)] opacity-0 transition duration-500 group-hover:opacity-100"
                    animate={{ opacity: [0.12, 0.2, 0.12] }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                  />

                  <div className={`relative flex flex-col gap-4 ${alignLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-surface/60">
                        <motion.span
                          className="absolute inset-0 bg-[conic-gradient(from_120deg,rgba(167,139,250,0.12),transparent_30%,rgba(59,130,246,0.12),transparent_60%,rgba(16,185,129,0.12),transparent_90%)]"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                        />
                        <Briefcase className="relative h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted">{role.period}</p>
                        <p className="text-lg font-semibold text-foreground">{role.role}</p>
                        <p className="text-sm text-muted">{role.company} · {role.location}</p>
                      </div>
                    </div>

                    <div className="relative flex-1">
                      <div className={`absolute ${alignLeft ? 'left-0' : 'right-0'} top-3 h-full w-px bg-gradient-to-b from-accent/70 via-accent/15 to-transparent`} />
                      <motion.div
                        className={`absolute ${alignLeft ? 'left-0' : 'right-0'} top-3 h-5 w-[3px] rounded-full bg-accent shadow-[0_0_12px] shadow-accent`}
                        {...pulseLine}
                      />

                      <div className={`grid gap-3 text-sm text-muted ${alignLeft ? 'md:pl-6' : 'md:pr-6'}`}>
                        <motion.ul className="grid gap-2" variants={fadeInUp}>
                          {role.achievements.map((item) => (
                            <li
                              key={item}
                              className="relative overflow-hidden rounded-xl border border-border/60 bg-surface/60 px-4 py-3 transition duration-300 hover:border-accent/60"
                            >
                              <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-primary/10 opacity-0 blur-xl transition group-hover:opacity-100"
                                animate={{ translateX: ['-15%', '115%'] }}
                                transition={{ repeat: Infinity, duration: 7, ease: 'linear' }}
                              />
                              <span className="relative flex items-start gap-3 text-foreground">
                                <BadgeCheck className="mt-0.5 h-4 w-4 text-accent" />
                                <span className="text-muted">{item}</span>
                              </span>
                            </li>
                          ))}
                        </motion.ul>

                        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-foreground/80">
                          <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1">Systems Thinking</span>
                          <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1">Team Enablement</span>
                          <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1">Outcome-first</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1">Delivery</span>
                    <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1">DX</span>
                    <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1">Mentorship</span>
                    <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1">Experiments</span>
                    <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1">Data Signals</span>
                    <span className="flex items-center gap-1 rounded-full border border-border/60 bg-accent/10 px-3 py-1 text-accent">
                      <ArrowUpRight className="h-3 w-3" />
                      Impact trail
                    </span>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </Container>
  </section>
  )
}
