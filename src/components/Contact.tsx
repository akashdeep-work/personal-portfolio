import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Section } from './ui/Section'
import { Button } from './ui/Button'

export function Contact() {
  const { contact, profile } = portfolio

  return (
    <Section id="contact" figNumber="06" figLabel="Contact" title="" noBorder>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="border-2 border-ink p-8 sm:p-14"
      >
        <span className="inline-flex items-center gap-2 border border-red px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-red">
          <span className="h-1.5 w-1.5 bg-red" />
          {contact.availability}
        </span>

        <h2 className="mt-6 max-w-[700px] text-balance text-[clamp(30px,4.5vw,48px)] font-bold uppercase leading-tight tracking-tight">
          {contact.heading}
        </h2>

        <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-muted sm:text-lg">
          {contact.subheading}
        </p>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <Button href={`mailto:${profile.email}`}>{contact.ctaLabel}</Button>
          <Button
            href={profile.socials[0].href}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect On LinkedIn
          </Button>
        </div>

        <dl className="mt-11 grid gap-6 border-t border-hairline pt-6 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">Email</dt>
            <dd className="mt-1.5 text-[15px] font-semibold">{profile.email}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">Phone</dt>
            <dd className="mt-1.5 text-[15px] font-semibold">{profile.phone}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              Location
            </dt>
            <dd className="mt-1.5 text-[15px] font-semibold">{profile.location}</dd>
          </div>
        </dl>
      </motion.div>
    </Section>
  )
}