import type { PortfolioData } from '../types'

/**
 * ────────────────────────────────────────────────────────────────
 *  SITE CONTENT — the only file you should need to edit
 * ────────────────────────────────────────────────────────────────
 *  Every string rendered on the site lives here. Components read
 *  from this object and contain no hardcoded copy. To update your
 *  name, roles, projects, or testimonials, edit this file only —
 *  no component changes required.
 * ────────────────────────────────────────────────────────────────
 */
export const portfolio: PortfolioData = {
  profile: {
    name: 'Akashdeep',
    title: 'Full-Stack Engineer — AI & LLM Systems',
    tagline: 'I build production-grade AI systems and full-stack products — not prototypes.',
    location: 'India',
    remoteNote: 'Open to remote and Chandigarh-based work',
    email: 'akashdeep.work73@gmail.com',
    phone: '+91-7888929889',
    resumeUrl: '/resume.pdf', // replace with a real hosted resume file
    socials: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/akashdeep73', handle: '@akashdeep73' },
      { label: 'Github', href: 'https://github.com/akashdeep-work', handle: 'akashdeep-work' },
      { label: 'Email', href: 'mailto:akashdeep.work73@gmail.com', handle: 'akashdeep.work73@gmail.com' },
      { label: 'Phone', href: 'tel:+917888929889', handle: '+91 78889 29889' },
    ],
  },

  about: {
    heading: 'About',
    paragraphs: [
      'I\u2019m a full-stack engineer with 5 years building backend systems and product interfaces that stay reliable after the demo ends. Most of my recent work sits at the intersection of applied AI and traditional engineering: retrieval-augmented generation, computer vision pipelines, and the unglamorous infrastructure that keeps them running at 99% uptime.',
      'I care about the parts of AI engineering that don\u2019t show up in a pitch deck \u2014 latency budgets, vector index tuning, graceful fallbacks when a model call fails, and API contracts that don\u2019t break downstream teams. I\u2019ve led small teams, mentored junior engineers, and sat directly with clients to turn ambiguous requirements into shipped features.',
      'Outside of client work, I spend time going deeper on LangChain/LangGraph orchestration patterns and evaluating open-weight LLMs like Qwen for cost-sensitive production use cases.',
    ],
    highlights: [
      { label: 'Experience', value: '5 years' },
      { label: 'Focus', value: 'AI/LLM systems, full-stack' },
      { label: 'Based in', value: 'Punjab, India' },
      { label: 'Available for', value: 'Freelance & consulting' },
    ],
  },

  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'FastAPI', 'GraphQL', 'REST', 'Microservices'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      category: 'AI / ML',
      items: ['LangChain', 'LangGraph', 'RAG Systems', 'PyTorch', 'Vector Databases', 'TensorFlow'],
    },
  ],

  experience: [
    {
      id: 'cosmic-owl',
      company: 'Cosmic Owl Pvt Ltd',
      role: 'Full Stack Developer',
      location: 'Bangalore',
      start: 'Aug 2024',
      end: 'Mar 2026',
      achievements: [
        'Built an AI Hybrid Production Tool and a RAG AI Assistant on Qwen2.5 with a vector database backend, sustaining 99% uptime in production.',
        'Cut API response times by roughly 35% through query and caching optimizations across core services.',
        'Automated product spec generation, reducing manual effort on that workflow by 30\u201335%.',
      ],
    },
    {
      id: 'napworks',
      company: 'Napworks Pvt. Ltd.',
      role: 'Software Engineer',
      location: 'Mohali',
      start: 'Jul 2023',
      end: 'Jul 2024',
      achievements: [
        'Built Seatherny, an Android avian species identification app using TensorFlow for on-device inference, deployed on GCP.',
        'Maintained 99% uptime while optimizing and extending a legacy production system.',
      ],
    },
    {
      id: 'techbit',
      company: 'Techbit Solutions Pvt. Ltd.',
      role: 'Software Engineer',
      location: 'Chandigarh',
      start: 'Sep 2021',
      end: 'Dec 2022',
      achievements: [
        'Led a team of 3 engineers on client-facing feature delivery.',
        'Reduced API response times by approximately 35% through backend optimization work.',
        'Owned client relationship management and mentored junior engineers on the team.',
      ],
    },
    {
      id: 'bhanguz',
      company: 'Bhanguz',
      role: 'Software Engineer',
      location: 'Chandigarh',
      start: 'Feb 2021',
      end: 'Jul 2021',
      achievements: [
        'Shipped full-stack features end-to-end using React on the frontend and Node.js/Python on the backend.',
      ],
    },
  ],

  projects: [
    {
      id: 'rag-assistant',
      name: 'RAG AI Assistant',
      featured: true,
      problem:
        'Support and product teams were losing hours manually searching scattered internal docs to answer routine product questions.',
      solution:
        'Designed and built a retrieval-augmented generation assistant on Qwen2.5, backed by a vector database for semantic search over internal documentation, with caching and fallback handling for model latency spikes.',
      tech: ['Qwen2.5', 'LangChain', 'Vector DB', 'FastAPI', 'Redis'],
      outcome: '~35% faster response times with 99% uptime in production.',
    },
    {
      id: 'product-listing-cv',
      name: 'Product Listing Tool (Computer Vision)',
      featured: true,
      problem:
        'Generating structured product specifications from raw images was a slow, fully manual process for the catalog team.',
      solution:
        'Built a computer-vision-assisted pipeline that extracts product attributes from images and auto-drafts structured spec sheets for human review.',
      tech: ['Python', 'PyTorch', 'FastAPI', 'AWS'],
      outcome: '30\u201335% reduction in manual effort on spec generation.',
    },
    {
      id: 'resume-ai',
      name: 'Resume AI',
      featured: true,
      problem:
        'Job seekers were spending hours manually tailoring resumes for each application, often missing keywords that applicant tracking systems screen for.',
      solution:
        'Built an end-to-end resume analysis and generation tool: a React frontend for upload and editing, an Express.js backend handling parsing and LLM-driven suggestions, and PostgreSQL for storing user profiles, resume versions, and job-match history.',
      tech: ['React', 'Express.js', 'PostgreSQL', 'LLM API', 'Node.js'],
      outcome: 'End-to-end resume tailoring in minutes instead of hours, with structured, ATS-aware suggestions.',
    },
    {
      id: 'db-backup-tool',
      name: 'Automated Database Backup Tool',
      featured: false,
      problem:
        'Manual database backups were inconsistent and error-prone, leaving production data exposed to avoidable loss during failures or migrations.',
      solution:
        'Built an end-to-end automated backup system with a React dashboard for scheduling, monitoring, and restoring backups, and an Express.js backend that runs scheduled PostgreSQL dumps, verifies integrity, and manages retention policies.',
      tech: ['React', 'Express.js', 'PostgreSQL', 'Node.js', 'Cron'],
      outcome: 'Reliable, scheduled backups with integrity verification, removing manual backup work entirely.',
    },
    {
      id: 'seatherny',
      name: 'Seatherny',
      featured: false,
      problem:
        'Birdwatchers and field researchers needed a fast, offline-friendly way to identify avian species from photos in the field.',
      solution:
        'Built an Android app with an on-device TensorFlow model for species identification, deployed and monitored on GCP.',
      tech: ['Android', 'TensorFlow', 'GCP'],
      outcome: 'Shipped to production with 99% uptime.',
    },
  ],

  /**
   * TESTIMONIALS — real names, DRAFT quotes.
   * These attribute specific claims to real people. Get each person's
   * sign-off on their exact wording before publishing this site.
   */
  testimonials: [
    {
      id: 't1',
      quote:
        'Akashdeep built our RAG assistant end to end \u2014 Qwen2.5, vector search, the works \u2014 and it\u2019s held 99% uptime since launch. He owns problems past the point most engineers hand them off.',
      name: 'Karan Sharma',
      role: 'CEO',
      company: 'Cosmic Owl',
    },
    {
      id: 't2',
      quote: 'Akashdeep worked on a sensitive project with us under NDA and handled it exactly how you\u2019d want \u2014 careful with scope, clear about tradeoffs, and reliable on delivery. I\u2019d bring him onto another confidential build without hesitation.', // awaiting Tom's role/company + a real or draft quote
      name: 'Tom Pagram',
      role: 'Team Lead and Project Manager',
      company: '',
    },
    {
      id: 't3',
      quote:
        'We asked for a way to cut manual spec work and got a computer vision pipeline that actually held up in production. Akashdeep thinks past the demo.',
      name: 'Danial',
      role: 'CTO',
      company: 'Mr. Lister',
    },
    {
      id: 't4',
      quote:
        'Seatherny needed to work in the field, offline, on a phone \u2014 not just in a lab. Akashdeep got the model running on-device and shipped it without drama.',
      name: 'Alison',
      role: 'Owner',
      company: 'Seatherny',
    },
  ],

  contact: {
    heading: 'Let\u2019s build something that has to work',
    subheading:
      'Open to freelance and consulting engagements \u2014 AI/LLM integration, RAG systems, or full-stack builds that need someone who can own the whole stack.',
    ctaLabel: 'Start a conversation',
    availability: 'Currently accepting new projects for Q3 2026',
  },
}