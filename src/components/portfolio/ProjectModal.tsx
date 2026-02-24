import type { Project } from '../../data/portfolio'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null

  return (
    <div className="project-modal-overlay" onClick={onClose} role="presentation">
      <article className="project-modal" onClick={(event) => event.stopPropagation()}>
        <button className="project-modal-close" type="button" onClick={onClose}>
          ×
        </button>
        <img src={project.image} alt={project.title} className="project-modal-image" />
        <p className="project-modal-kicker">{project.subtitle}</p>
        <h3>{project.title}</h3>
        <p className="project-modal-copy">{project.overview}</p>
        <div className="project-modal-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a className="project-modal-link" href={project.link} target="_blank" rel="noreferrer">
          Open project ↗
        </a>
      </article>
    </div>
  )
}
