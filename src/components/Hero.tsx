import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Button } from './ui/Button'

const COMMAND = 'whoami'

export function Hero() {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typed.length >= COMMAND.length) {
      const t = setTimeout(() => setDone(true), 250)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTyped(COMMAND.slice(0, typed.length + 1)), 70)
    return () => clearTimeout(t)
  }, [typed])

  const { profile } = portfolio

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Faint structural grid — subtle, not decorative-for-its-own-sake */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ECEBE4 1px, transparent 1px), linear-gradient(to bottom, #ECEBE4 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-border-strong bg-bg-elevated px-3 py-1.5 font-mono text-xs text-ink-muted">
          <span className="text-signal">$</span>
          <span>{typed}</span>
          <span className="animate-blink text-signal">_</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-balance text-4xl font-bold tracking-tight text-ink sm:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-3 font-mono text-lg text-signal sm:text-xl"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="#contact">Let&rsquo;s work together</Button>
          <Button href={profile.resumeUrl} variant="secondary" download>
            Download resume
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 font-mono text-sm text-ink-faint"
        >
          {profile.location} · {profile.remoteNote}
        </motion.p>
      </div>
    </section>
  )
}