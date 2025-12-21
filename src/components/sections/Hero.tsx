import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkle, Waves } from 'lucide-react'
import { hero } from '../../data/hero'
import { socials } from '../../data/socials'
import { Button } from '../ui/Button'
import { AnimatedText } from '../ui/AnimatedText'
import { Container } from '../layout/Container'
import { fadeInUp, pageFade, staggerChildren } from '../../theme/motion'
import { useMotionSafe } from '../../hooks/useMotionSafe'

export const Hero = () => {
  const { disableMotion } = useMotionSafe()

  return (
    <section id="hero" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid [background-size:32px_32px]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-accent/15 via-transparent to-transparent blur-3xl" />
      <motion.div
        className="pointer-events-none absolute -left-28 top-10 h-64 w-64 rounded-full bg-foreground/5 blur-3xl"
        animate={disableMotion ? undefined : { scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }}
        transition={disableMotion ? undefined : { repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-[120px]"
        animate={disableMotion ? undefined : { scale: [1, 1.1, 1], y: [0, 12, -8, 0] }}
        transition={disableMotion ? undefined : { repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        aria-hidden
      />
      <Container className="relative grid gap-12 md:grid-cols-[1.2fr_0.9fr] md:items-center">
        <motion.div
          className="space-y-7"
          variants={disableMotion ? undefined : staggerChildren}
          initial={disableMotion ? false : 'hidden'}
          animate={disableMotion ? undefined : 'visible'}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-muted shadow-glow"
            variants={disableMotion ? undefined : fadeInUp}
            initial={disableMotion ? false : undefined}
          >
            <Sparkle className="h-4 w-4 text-accent" />
            {hero.greeting}
          </motion.div>
          <motion.h1
            className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl"
            style={{ lineHeight: 1.05 }}
            variants={disableMotion ? undefined : pageFade}
            initial={disableMotion ? false : 'hidden'}
            animate={disableMotion ? undefined : 'visible'}
          >
            <AnimatedText>{hero.name}</AnimatedText>
          </motion.h1>
          <motion.h2
            className="text-2xl font-medium text-muted sm:text-3xl"
            style={{ lineHeight: 1.2 }}
            variants={disableMotion ? undefined : fadeInUp}
            initial={disableMotion ? false : undefined}
          >
            {hero.title}
          </motion.h2>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-6 text-muted shadow-glow backdrop-blur"
            variants={disableMotion ? undefined : fadeInUp}
            initial={disableMotion ? false : undefined}
            whileHover={{ translateY: disableMotion ? 0 : -4 }}
            transition={disableMotion ? undefined : { type: 'spring', stiffness: 200, damping: 18 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent" aria-hidden />
            <motion.div
              className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-foreground/5 blur-2xl"
              animate={disableMotion ? undefined : { rotate: [0, 12, -8, 0] }}
              transition={disableMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.p
              className="relative max-w-2xl text-lg"
              animate={disableMotion ? undefined : { y: [0, -4, 0] }}
              transition={disableMotion ? undefined : { repeat: Infinity, duration: 12, ease: 'easeInOut' }}
            >
              {hero.summary}
            </motion.p>
            <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
              {[hero.meta.focus, hero.meta.location, hero.meta.experience].map((item, index) => (
                <motion.span
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground"
                  whileHover={disableMotion ? undefined : { scale: 1.05, y: -2, rotate: index === 1 ? 0.6 : -0.6 }}
                  transition={disableMotion ? undefined : { type: 'spring', stiffness: 220, damping: 18 }}
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-4"
            variants={disableMotion ? undefined : fadeInUp}
            initial={disableMotion ? false : undefined}
          >
            {hero.ctas.map((cta) => (
              <Button key={cta.label} asChild variant={cta.variant ?? 'solid'}>
                <a href={cta.href} className="inline-flex items-center gap-2">
                  {cta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-4 text-sm text-muted"
            variants={disableMotion ? undefined : fadeInUp}
            initial={disableMotion ? false : undefined}
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="group relative rounded-full border border-transparent px-2 py-1 hover:border-border/70 hover:text-foreground"
                whileHover={disableMotion ? undefined : { y: -2 }}
                transition={disableMotion ? undefined : { type: 'spring', stiffness: 300, damping: 22 }}
              >
                <span className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
                {social.label}
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            className="grid gap-4 sm:grid-cols-3"
            variants={disableMotion ? undefined : staggerChildren}
            initial={disableMotion ? false : 'hidden'}
            animate={disableMotion ? undefined : 'visible'}
          >
            {hero.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-4 text-center shadow-lg"
                variants={disableMotion ? undefined : fadeInUp}
                initial={disableMotion ? false : undefined}
                custom={index * 0.05}
                whileHover={disableMotion ? undefined : { scale: 1.06, rotate: index === 0 ? 0.6 : -0.4 }}
                transition={disableMotion ? undefined : { type: 'spring', stiffness: 240, damping: 18 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent" aria-hidden />
                <motion.div
                  className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-accent/10 blur-2xl"
                  animate={disableMotion ? undefined : { rotate: [0, 16, -12, 0] }}
                  transition={disableMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="relative text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="relative text-sm text-muted">{stat.label}</p>
                <div className="relative mt-3 h-1.5 rounded-full bg-border">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                    initial={{ width: disableMotion ? stat.percent : '0%' }}
                    animate={disableMotion ? undefined : { width: stat.percent }}
                    transition={
                      disableMotion ? undefined : { delay: 0.2 + index * 0.1, duration: 1.2, ease: 'easeOut' }
                    }
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-8 shadow-glow backdrop-blur"
          variants={disableMotion ? undefined : fadeInUp}
          initial={disableMotion ? false : 'hidden'}
          animate={disableMotion ? undefined : 'visible'}
        >
          <div className="absolute -left-24 -top-10 h-48 w-48 rounded-full bg-accent/20 blur-[120px]" aria-hidden />
          <div className="absolute -right-14 bottom-10 h-32 w-32 rounded-full bg-foreground/10 blur-3xl" aria-hidden />
          <motion.div
            className="absolute inset-4 rounded-[28px] border border-accent/10"
            animate={disableMotion ? undefined : { opacity: [0.6, 1, 0.6], scale: [0.98, 1, 0.98] }}
            transition={disableMotion ? undefined : { repeat: Infinity, duration: 9, ease: 'easeInOut' }}
            aria-hidden
          />
          <div className="relative mb-8 overflow-hidden rounded-2xl border border-border/70 bg-background/50 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/10" aria-hidden />
            <img
              src={hero.photo.src}
              alt={hero.photo.alt}
              className="aspect-[4/5] w-full object-cover object-center"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 border border-white/5" aria-hidden />
            <div className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground shadow-glow">
              Featured developer
            </div>
          </div>
          <div className="relative mb-8 flex items-center justify-between rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-xs text-muted">
            <span className="inline-flex items-center gap-2 text-foreground">
              <Waves className="h-4 w-4 text-accent" />
              Availability
            </span>
            <span className="flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-foreground shadow-glow">
              <span className="h-2.5 w-2.5 animate-pulse-slow rounded-full bg-green-400" />
              {hero.meta.availability}
            </span>
          </div>
          <div className="relative space-y-6">
            {[
              { label: 'Focus', value: hero.meta.focus },
              { label: 'Location', value: hero.meta.location },
              { label: 'Experience', value: hero.meta.experience },
            ].map(({ label, value }) => (
              <motion.div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm"
                whileHover={disableMotion ? undefined : { y: -2 }}
                transition={disableMotion ? undefined : { type: 'spring', stiffness: 240, damping: 18 }}
              >
                <span className="text-muted">{label}</span>
                <span className="text-foreground">{value}</span>
              </motion.div>
            ))}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-gradient-to-r from-accent/10 via-background to-background p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Momentum</p>
                <div className="mt-3 flex items-center justify-between text-sm text-foreground">
                  <span>Projects in motion</span>
                  <span className="rounded-full bg-foreground/90 px-3 py-1 text-background">{hero.stats[0].value}</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-border">
                  <motion.div
                    className="h-2 rounded-full bg-accent"
                    initial={{ width: disableMotion ? '82%' : '0%' }}
                    animate={disableMotion ? undefined : { width: '82%' }}
                    transition={disableMotion ? undefined : { delay: 0.4, duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4"
                whileHover={disableMotion ? undefined : { y: -4 }}
                transition={disableMotion ? undefined : { type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-accent/10" aria-hidden />
                <div className="relative flex items-center justify-between text-sm text-foreground">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted">Next slot</p>
                    <p className="mt-1 font-semibold">Q3 onboarding window</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-accent shadow-glow">
                    <Sparkle className="h-4 w-4" />
                  </div>
                </div>
                <div className="relative mt-4 h-1.5 rounded-full bg-border">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-foreground"
                    initial={{ width: disableMotion ? '64%' : '0%' }}
                    animate={disableMotion ? undefined : { width: '64%' }}
                    transition={disableMotion ? undefined : { delay: 0.6, duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
