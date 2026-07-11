import { useEffect, useState } from 'react'
import { portfolio } from '../data/portfolio'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
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
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color] duration-200 ${
        scrolled ? 'border-b-2 border-ink' : 'border-b border-hairline'
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-[18px] sm:px-8">
        <a href="#top" className="font-mono text-[13px] font-bold uppercase tracking-wide">
          Akashdeep<span className="text-red">.</span>Dev
        </a>

        <ul className="hidden items-center gap-[26px] md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              
              <a href={link.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        
        <a href={`mailto:${portfolio.profile.email}`}
          className="hidden border-2 border-ink px-[18px] py-[9px] font-mono text-[11px] font-bold uppercase tracking-wide transition-colors hover:bg-ink hover:text-paper md:inline-flex"
        >
          Hire Me
        </a>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center border-2 border-ink md:hidden"
        >
          <span className="font-mono text-sm font-bold">{open ? '×' : '='}</span>
        </button>
      </nav>

      {open && (
        <ul className="border-t-2 border-ink bg-paper px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              
              <a href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}