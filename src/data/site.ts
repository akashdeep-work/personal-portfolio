import type { NavItem } from '../types'

export const site = {
  title: 'Akashdeep | Portfolio',
  nav: [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ] satisfies NavItem[],
  footer: 'Crafted for the web.',
  sections: {
    about: 'About',
    experience: 'Experience',
    projects: 'Selected Work',
    skills: 'Skills',
    contact: 'Contact',
  },
}
