import { useEffect, useMemo, useState } from 'react'
import '../styles/globals.css'
import { portfolioData, type Project } from '../data/portfolio'
import { TopNav } from '../components/portfolio/TopNav'
import { ProfileCard } from '../components/portfolio/ProfileCard'
import { HeroSection } from '../components/portfolio/HeroSection'
import { ProjectsSection } from '../components/portfolio/ProjectsSection'
import { ExperienceSection } from '../components/portfolio/ExperienceSection'
import { ToolsSection } from '../components/portfolio/ToolsSection'
import { ContactSection } from '../components/portfolio/ContactSection'
import { ChessSection } from '../components/portfolio/ChessSection'
import { ProjectModal } from '../components/portfolio/ProjectModal'
import { FloatingChessCTA } from '../components/portfolio/FloatingChessCTA'

const getPagePath = () => {
  if (typeof window === 'undefined') return '/'
  const path = window.location.pathname
  if (['/', '/projects', '/experience', '/tools', '/contact', '/chess'].includes(path)) {
    return path
  }
  return '/'
}

const App = () => {
  const { navItems, profile, hero, projects, experience, tools, contact } = portfolioData
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activePath, setActivePath] = useState(getPagePath)

  useEffect(() => {
    const handlePopState = () => setActivePath(getPagePath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path: string) => {
    if (path === activePath) return
    window.history.pushState({}, '', path)
    setActivePath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageContent = useMemo(() => {
    if (activePath === '/projects') {
      return <ProjectsSection projects={projects} onSelectProject={setActiveProject} />
    }

    if (activePath === '/experience') {
      return <ExperienceSection items={experience} />
    }

    if (activePath === '/tools') {
      return <ToolsSection items={tools} />
    }

    if (activePath === '/contact') {
      return <ContactSection headingMain={contact.headingMain} headingMuted={contact.headingMuted} subtitle={contact.subtitle} details={contact.details} />
    }

    if (activePath === '/chess') {
      return <ChessSection />
    }

    return (
      <>
        <HeroSection
          titleMain={hero.titleMain}
          titleMuted={hero.titleMuted}
          description={hero.description}
          stats={hero.stats}
          features={hero.features}
          ragUrl="/rag-assistant"
        />
        <div className='spacer' />
        <ProjectsSection projects={projects} onSelectProject={setActiveProject} />
        <div className='spacer' />
        <ExperienceSection items={experience} />
        <div className='spacer' />
        <ToolsSection items={tools} />
        <div className='spacer' />
        <ContactSection headingMain={contact.headingMain} headingMuted={contact.headingMuted} subtitle={contact.subtitle} details={contact.details} />
      </>
    )
  }, [activePath, contact, experience, hero, projects, tools])

  return (
    <>
      <div className="page">
        <TopNav items={navItems} activePath={activePath} onNavigate={navigate} />
        <aside className="sidebar">
          <ProfileCard
            name={profile.name}
            image={profile.image}
            bio={profile.bio}
            title={profile.title}
            contacts={profile.contacts}
          />
        </aside>

        <main className="content">{pageContent}</main>
      </div>
      {activePath !== '/chess' && <FloatingChessCTA onActivate={() => navigate('/chess')} />}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}

export default App
