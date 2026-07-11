import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Button } from './ui/Button'

export function Hero() {
  const { profile } = portfolio

  return (
    <section id="top" className="border-b-2 border-ink pb-[70px] pt-[150px]">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted"
        >
          <span className="h-2 w-2 bg-red" />
          Engineering Profile / Rev. 2026.03
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[clamp(56px,10vw,132px)] font-bold uppercase leading-[0.92] tracking-[-0.04em]"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-[640px] border-t border-hairline pt-5 font-mono text-sm uppercase tracking-wide sm:text-base"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-[600px] text-balance text-lg leading-relaxed text-ink-muted sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-wrap gap-3.5"
        >
          <Button href="#contact">Let&rsquo;s Work Together</Button>
          <Button href={profile.resumeUrl} variant="secondary" download>
            Download Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-wrap gap-8 border-t border-hairline pt-6"
        >
          <div className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
            Location
            <b className="mt-1 block font-grotesk text-[15px] font-semibold normal-case tracking-normal text-ink">
              {profile.location}
            </b>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
            Availability
            <b className="mt-1 block font-grotesk text-[15px] font-semibold normal-case tracking-normal text-ink">
              {profile.remoteNote}
            </b>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
            Experience
            <b className="mt-1 block font-grotesk text-[15px] font-semibold normal-case tracking-normal text-ink">
              5 Years
            </b>
          </div>
        </motion.div>
      </div>
    </section>
  )
}