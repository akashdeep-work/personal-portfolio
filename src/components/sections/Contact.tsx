import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { contact } from '../../data/contact'
import { site } from '../../data/site'
import { sectionMeta } from '../../data/sections'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { fadeInUp } from '../../theme/motion'
import { SectionHeader } from '../ui/SectionHeader'
import { useMotionSafe } from '../../hooks/useMotionSafe'

export const Contact = () => {
  const { disableMotion } = useMotionSafe()

  return (
    <section id="contact" className="py-16 sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-4">
          <SectionHeader
            label={site.sections.contact}
            title={contact.heading}
            backgroundWord={sectionMeta.contact.background}
            description={contact.availability}
          />
          <div className="space-y-3 text-sm text-muted">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {contact.email}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {contact.location}
            </p>
          </div>
        </div>
        <Card className="space-y-5">
          <motion.p
            className="text-lg text-foreground"
            variants={fadeInUp}
            initial={disableMotion ? false : 'hidden'}
            whileInView={disableMotion ? undefined : 'visible'}
          >
            {contact.message}
          </motion.p>
          <Button asChild>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2">
              {contact.cta} <Send className="h-4 w-4" />
            </a>
          </Button>
        </Card>
      </Container>
    </section>
  )
}
