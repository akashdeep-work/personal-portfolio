import type { Feature, Stat } from '../../data/portfolio'

type HeroSectionProps = {
  titleMain: string
  titleMuted: string
  description: string
  stats: Stat[]
  features: Feature[]
  ragUrl: string
}

export const HeroSection = ({
  titleMain,
  titleMuted,
  description,
  stats,
  features,
  ragUrl,
}: HeroSectionProps) => {
  return (
    <section className="hero">
      <h1>
        <span>{titleMain}</span>
        <span className="muted">{titleMuted}</span>
      </h1>
      <p>{description}</p>
      <div className="stats">
        {stats.map((item) => (
          <article key={item.value + item.label}>
            <strong>{item.value}</strong>
            <small>{item.label}</small>
          </article>
        ))}
      </div>
      <div className="hero-quick-actions">
        <a
          href={ragUrl}
          className="hero-action-btn rag"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Try AI Knowledge Assistant RAG in a new tab"
        >
          <span className="btn-icon" aria-hidden="true">🧠</span>
          <span>Try AI Knowledge Assistant (RAG)</span>
          <span className="btn-external" aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="hero-action-helper" aria-hidden="true">
        <small><strong>AI:</strong> Document Q&amp;A with RAG pipeline</small>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <article key={feature.text} className={`feature ${feature.tone}`}>
            <p>{feature.text}</p>
            <span>→</span>
          </article>
        ))}
      </div>
    </section>
  )
}
