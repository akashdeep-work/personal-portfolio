import type { ToolItem } from '../../data/portfolio'

type ToolsSectionProps = {
  items: ToolItem[]
}

export const ToolsSection = ({ items }: ToolsSectionProps) => {
  return (
    <section className="block">
      <h2>
        <span>PREMIUM</span>
        <span className="muted">TOOLS</span>
      </h2>
      <div className="tools-grid">
        {items.map((item) => (
          <article key={item.name} className="tool-item">
            <span className="tool-icon">
              <img src={item.icon} alt={`${item.name} logo`} loading="lazy" />
            </span>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
