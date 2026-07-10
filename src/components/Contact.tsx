import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'
import { Button } from './ui/Button'

export function Contact() {
  const { contact, profile } = portfolio

  return (
    <Section id="contact" eyebrow="contact" title="">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-border bg-bg-elevated p-8 sm:p-12"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal-soft px-3 py-1 font-mono text-xs text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          {contact.availability}
        </div>

        <h2 className="mt-6 max-w-2xl text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {contact.heading}
        </h2>

        <p className="mt-4 max-w-xl text-balance leading-relaxed text-ink-muted">
          {contact.subheading}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href={`mailto:${profile.email}`}>{contact.ctaLabel}</Button>
          <Button
            href={profile.socials[0].href}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </Button>
        </div>

        <dl className="mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint">Email</dt>
            <dd className="mt-1 text-sm text-ink">{profile.email}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint">Phone</dt>
            <dd className="mt-1 text-sm text-ink">{profile.phone}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint">Location</dt>
            <dd className="mt-1 text-sm text-ink">{profile.location}</dd>
          </div>
        </dl>
      </motion.div>
    </Section>
  )
}