export type NavItem = {
  id: string
  label: string
}

export type SocialLink = {
  label: string
  href: string
  icon: string
}

export type HeroContent = {
  greeting: string
  name: string
  title: string
  summary: string
  photo: {
    src: string
    alt: string
  }
  ctas: { label: string; href: string; variant?: 'solid' | 'outline' }[]
  meta: {
    availability: string
    focus: string
    location: string
    experience: string
  }
  stats: { label: string; value: string, percent:string }[]
}

export type AboutContent = {
  subtitle: string
  description: string
  highlights: string[]
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  achievements: string[]
}

export type Project = {
  title: string
  description: string
  tech: string[]
  image: string
  alt?: string
  github?: string
  live?: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type ContactContent = {
  email: string
  location: string
  availability: string
  message: string
  heading: string
  cta: string
}
