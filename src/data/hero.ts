import type { HeroContent } from '../types'

export const hero: HeroContent = {
  greeting: 'Hi there, I am',
  name: 'Akashdeep',
  title: 'Full-Stack & ML Engineer | 7+ Years of Experience',
  summary:
    'Versatile ML Engineer and Full-Stack Developer delivering scalable backends, AI systems, and polished web/mobile experiences from concept to launch.',
  photo: {
    src: '/karan-profile.jpeg',
    alt: 'Portrait of Akashdeep in a blazer and glasses',
  },
  ctas: [
    { label: 'View Projects', href: '#projects', variant: 'solid' },
    { label: 'Download Résumé', href: '#contact', variant: 'outline' },
  ],
  meta: {
    availability: 'Open to full-time roles and select freelance AI builds',
    focus: 'Full-Stack Engineering · Machine Learning · MLOps',
    location: 'India · Remote',
    experience: '7+ yrs',
  },
  stats: [
    { label: 'AI/ML deployments', value: '30+', percent: '75%' },
    { label: 'Full-stack launches', value: '50+', percent: '85%' },
    { label: 'Industries served', value: 'Fintech · Healthcare · E-commerce', percent: '100%' },
  ],
}
