/**
 * Central type definitions for every content shape used across the site.
 * Components import these types; they never redefine their own shapes.
 */

export interface SocialLink {
  label: string
  href: string
  handle?: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  location: string
  remoteNote: string
  email: string
  phone: string
  resumeUrl: string
  socials: SocialLink[]
}

export interface AboutContent {
  heading: string
  paragraphs: string[]
  highlights: { label: string; value: string }[]
}

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Cloud & DevOps'
  | 'AI / ML'

export interface SkillGroup {
  category: SkillCategory
  items: string[]
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  location: string
  start: string
  end: string
  achievements: string[]
}

export interface ProjectEntry {
  id: string
  name: string
  featured: boolean
  problem: string
  solution: string
  tech: string[]
  outcome: string
  /** Short segment of the outcome to render in the accent color, e.g. "~35% faster" */
  outcomeHighlight?: string
  links?: { label: string; href: string }[]
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
}

export interface ContactContent {
  heading: string
  subheading: string
  ctaLabel: string
  availability: string
}

export interface PortfolioData {
  profile: Profile
  about: AboutContent
  skills: SkillGroup[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  testimonials: Testimonial[]
  contact: ContactContent
}