import { useEffect, useState } from 'react'
import { portfolio } from '../data/portfolio'

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#experience', label: 'experience' },
  { href: '#projects', label: 'projects' },
  { href: '#testimonials', label: 'testimonials' },
  { href: '#contact', label: 'contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/90 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm text-ink hover:text-signal">
          akashdeep<span className="text-signal">.</span>dev
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              
                <a href={link.href}
                className="group flex items-center rounded px-3 py-2 font-mono text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <span className="mr-1 text-signal opacity-0 transition-opacity group-hover:opacity-100">
                  $
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        
          <a href={`mailto:${portfolio.profile.email}`}
          className="hidden rounded-md border border-border-strong px-4 py-2 font-mono text-sm text-ink transition-colors hover:border-signal/60 hover:text-signal md:inline-flex"
        >
          hire_me
        </a>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-ink md:hidden"
        >
          <span className="font-mono text-sm">{open ? 'x' : '='}</span>
        </button>
      </nav>

      {open && (
        <ul className="border-t border-border bg-bg px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              
                <a href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm text-ink-muted hover:text-signal"
              >
                <span className="mr-2 text-signal">$</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}