import { motion } from 'framer-motion'
import { Binary, Compass, Gauge, Sparkles } from 'lucide-react'
import { about } from '../../data/about'
import { site } from '../../data/site'
import { sectionMeta } from '../../data/sections'
import { Container } from '../layout/Container'
import { fadeInUp, staggerChildren } from '../../theme/motion'
import { SectionHeader } from '../ui/SectionHeader'
import { useMotionSafe } from '../../hooks/useMotionSafe'

const values = [
  {
    title: 'Systems thinking',
    copy: 'Design systems, tokens, and repeatable patterns that keep teams shipping confidently.',
    Icon: Binary,
  },
  {
    title: 'Momentum & motion',
    copy: 'Micro-interactions, spatial rhythm, and intuitive flows that make interfaces feel alive.',
    Icon: Gauge,
  },
  {
    title: 'Guidance & collaboration',
    copy: 'Leading critiques, pairing on architecture, and mentoring engineers into animation-savvy builders.',
    Icon: Compass,
  },
]

export const About = () => {
  const { disableMotion } = useMotionSafe()

  return (
    <section id="about" className="py-16 sm:py-20">
      <Container className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            variants={fadeInUp}
            initial={disableMotion ? false : 'hidden'}
            whileInView={disableMotion ? undefined : 'visible'}
            viewport={disableMotion ? undefined : { once: true }}
          >
            <SectionHeader
              label={site.sections.about}
              title={about.subtitle}
              backgroundWord={sectionMeta.about.background}
            />
            <motion.div
              className="relative mt-6 overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-6 text-muted shadow-glow backdrop-blur"
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent" aria-hidden />
              <motion.div
                className="relative inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
              >
                <Sparkles className="h-4 w-4 text-accent" />
                {sectionMeta.about.background}
              </motion.div>
              <p className="relative mt-4 text-lg leading-relaxed text-foreground">{about.description}</p>
              <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                {about.highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground"
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-foreground/5 opacity-0 transition duration-300 hover:opacity-100" aria-hidden />
                    <div className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                    <motion.span
                      className="absolute bottom-2 right-3 h-2 w-2 rounded-full bg-foreground/40"
                      animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 3 + index * 0.4 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-6 shadow-lg backdrop-blur"
            variants={staggerChildren}
            initial={disableMotion ? false : 'hidden'}
            whileInView={disableMotion ? undefined : 'visible'}
            viewport={disableMotion ? undefined : { once: true, amount: 0.3 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-foreground/10 via-transparent to-accent/10" aria-hidden />
            <motion.p className="relative mb-4 text-sm uppercase tracking-[0.3em] text-muted" variants={fadeInUp}>
              What drives my work
            </motion.p>
            <motion.ul className="relative space-y-6" variants={fadeInUp}>
              {about.highlights.map((item, index) => (
                <li key={item} className="group relative pl-10 text-foreground">
                  <div className="absolute left-1 top-0 flex h-full flex-col items-center">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {index !== about.highlights.length - 1 && (
                      <motion.span
                        className="mt-2 h-full w-[2px] origin-top bg-border"
                        initial={{ scaleY: 0 }}
                        whileInView={disableMotion ? undefined : { scaleY: 1 }}
                        animate={disableMotion ? { scaleY: 1 } : undefined}
                        viewport={disableMotion ? undefined : { once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    )}
                  </div>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-muted shadow-sm"
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 via-transparent to-accent/5 opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden />
                    {item}
                  </motion.div>
                </li>
              ))}
            </motion.ul>
            <motion.div
              className="mt-6 grid gap-3 rounded-2xl border border-border/70 bg-background/60 p-4 text-sm text-muted"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-between text-foreground">
                <span className="text-xs uppercase tracking-[0.3em]">Signal</span>
                <span className="rounded-full bg-foreground/90 px-3 py-1 text-background">Always learning</span>
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-border">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  initial={{ width: '0%' }}
                  whileInView={disableMotion ? undefined : { width: '88%' }}
                  animate={disableMotion ? { width: '88%' } : undefined}
                  viewport={disableMotion ? undefined : { once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <p className="text-foreground">Building intuitive systems with motion as a guide, not a gimmick.</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-4 md:grid-cols-3"
          variants={staggerChildren}
          initial={disableMotion ? false : 'hidden'}
          whileInView={disableMotion ? undefined : 'visible'}
          viewport={disableMotion ? undefined : { once: true, amount: 0.2 }}
        >
          {values.map(({ title, copy, Icon }, index) => (
            <motion.div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 shadow-lg"
              variants={fadeInUp}
              custom={index * 0.05}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/0 via-accent/5 to-foreground/5 opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden />
              <div className="relative mb-3 inline-flex items-center justify-center rounded-full border border-border/70 bg-background/80 p-2 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <p className="relative text-lg font-semibold text-foreground">{title}</p>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{copy}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
