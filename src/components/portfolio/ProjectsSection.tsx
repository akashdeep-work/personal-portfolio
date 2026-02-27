import type { Project } from '../../data/portfolio'

type ProjectsSectionProps = {
  projects: Project[]
  onSelectProject: (project: Project) => void
}

export const ProjectsSection = ({ projects, onSelectProject }: ProjectsSectionProps) => {
  return (
    <section className="block">
      <h2>
        <span>RECENT</span>
        <span className="muted">PROJECTS</span>
      </h2>
      {projects.map((project) => (
        <button
          key={project.title}
          className="list-item list-item-button"
          type="button"
          onClick={() => onSelectProject(project)}
        >
          <img src={project.image} alt={project.title} />
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
            <p>{project.overview}</p>
          </div>
          <span className="arrow">↗</span>
        </button>
      ))}
    </section>
  )
}
