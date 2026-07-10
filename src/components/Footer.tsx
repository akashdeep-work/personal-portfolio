import { portfolio } from '../data/portfolio'

export function Footer() {
  const { profile } = portfolio
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-ink-faint">
          © {year} {profile.name}.
        </p>
        <ul className="flex gap-6">
          {profile.socials.map((s) => (
            <li key={s.label}>
              
                <a href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-mono text-xs text-ink-muted hover:text-signal"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}