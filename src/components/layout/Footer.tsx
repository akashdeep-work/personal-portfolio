import { Github, Linkedin, Mail } from 'lucide-react'
import { socials } from '../../data/socials'
import { Container } from './Container'

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/70 bg-background/90">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted md:flex-row">
        <p className="text-center md:text-left">© {year} Crafted for the web.</p>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-muted transition-colors hover:text-foreground"
              aria-label={social.label}
            >
              {social.icon === 'github' && <Github className="h-4 w-4" />}
              {social.icon === 'linkedin' && <Linkedin className="h-4 w-4" />}
              {social.icon === 'mail' && <Mail className="h-4 w-4" />}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  )
}
