import type { ExperienceItem } from '../../data/portfolio'

type ExperienceSectionProps = {
  items: ExperienceItem[]
}

export const ExperienceSection = ({ items }: ExperienceSectionProps) => {
  return (
    <section className="block">
      <h2>
        <span>6+ YEARS OF</span>
        <span className="muted">EXPERIENCE</span>
      </h2>
      {items.map((item) => (
        <article key={item.name} className="exp-item">
          <div>
            <h3>{item.name}</h3>
            <p>{item.details}</p>
            <small>{item.date}</small>
          </div>
          <span className="arrow">↗</span>
        </article>
      ))}
    </section>
  )
}
