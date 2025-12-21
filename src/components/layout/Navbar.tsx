import { Github, Linkedin, Mail, Moon, Sun, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../../data/site'
import { socials } from '../../data/socials'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/cn'
import { Container } from './Container'
import { Button } from '../ui/Button'
import { fadeInUp } from '../../theme/motion'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ids = useMemo(() => site.nav.map((item) => item.id), [])
  const activeId = useScrollSpy(ids)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <motion.a
          href="#hero"
          className="font-mono text-sm uppercase tracking-[0.3em] text-foreground"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          {site.title}
        </motion.a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {site.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'relative pb-1 transition-colors duration-200 hover:text-foreground',
                activeId === item.id && 'text-foreground',
              )}
            >
              {activeId === item.id && (
                <motion.span
                  layoutId="active-section"
                  className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-accent"
                />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex md:items-center md:gap-3">
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
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full border border-border/70 bg-card/50"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <button
            className={cn(
              'relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-card/70 text-foreground shadow-md transition hover:border-accent/60 md:hidden',
              isOpen && 'border-accent/60 shadow-glow',
            )}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <div className="flex h-6 w-6 flex-col justify-center gap-1.5">
              <span
                className={cn(
                  'block h-0.5 w-full origin-center rounded-full bg-foreground transition-all duration-300',
                  isOpen && 'translate-y-[7px] rotate-45 bg-accent',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-4 self-end rounded-full bg-foreground transition-all duration-300',
                  isOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full origin-center rounded-full bg-foreground transition-all duration-300',
                  isOpen && '-translate-y-[7px] -rotate-45 bg-accent',
                )}
              />
            </div>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-border/80 bg-background/95 shadow-xl md:hidden"
          >
            <Container className="flex flex-col gap-4 py-5">
              <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-foreground/5" aria-hidden />
                <div className="relative flex items-center gap-3 text-sm text-muted">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>Curated jump list—pick a section to glide to.</span>
                </div>
              </div>
              <div className="grid gap-3">
                {site.nav.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 px-4 py-3 text-base font-medium text-muted transition-colors hover:text-foreground',
                      activeId === item.id && 'border-accent/60 text-foreground shadow-glow',
                    )}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.span
                      className="absolute inset-0 -z-10 scale-100 bg-gradient-to-r from-accent/10 via-transparent to-foreground/5 opacity-0 transition duration-300 group-hover:opacity-100"
                      whileHover={{ scale: 1.05 }}
                      layoutId={activeId === item.id ? 'active-mobile' : undefined}
                    />
                  </motion.a>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 hover:text-foreground"
                    aria-label={social.label}
                    whileHover={{ y: -1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {social.icon === 'github' && <Github className="h-4 w-4" />}
                    {social.icon === 'linkedin' && <Linkedin className="h-4 w-4" />}
                    {social.icon === 'mail' && <Mail className="h-4 w-4" />}
                    <span className="text-xs uppercase tracking-[0.2em]">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
