import { portfolio } from '../data/portfolio'

export function Footer() {
  const { profile } = portfolio
  const year = new Date().getFullYear()

  return (
    <footer className="py-8">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          © {year} {profile.name} — Built With React &amp; Tailwind
        </p>
        <ul className="flex gap-6">
          {profile.socials.map((s) => (
            <li key={s.label}>
              
              <a href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-mono text-[11px] uppercase tracking-wide text-ink-muted hover:text-red"
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