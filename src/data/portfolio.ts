import type { NavItem } from '../components/portfolio/TopNav'
import type { ProfileContact } from '../components/portfolio/ProfileCard'

export type Stat = {
  value: string
  label: string
}

export type Feature = {
  text: string
  tone: 'orange' | 'lime'
}

export type Project = {
  title: string
  subtitle: string
  image: string
  overview: string
  stack: string[]
  link: string
}

export type ExperienceItem = {
  name: string
  details: string
  date: string
}

export type ToolItem = {
  name: string
  description: string
  icon: string
}

export const portfolioData = {
  navItems: [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' },
    { label: 'Tools', path: '/tools' },
    { label: 'Contact', path: '/contact' },
  ] as NavItem[],
  profile: {
    name: 'Akashdeep',
    title: 'Full-Stack Engineer',
    image:
      '/karan-profile.jpeg',
    bio: 'Seeking challenging Backend Developer or Full-Stack Developer roles to build scalable, secure, and high-performance applications that positively impact business growth and operational efficiency.',
    contacts: [
      { label: 'Phone', value: '+91-7888929889', href: 'tel:+917888929889' },
      {
        label: 'Email',
        value: 'akashdeep.work73@gmail.com',
        href: 'mailto:akashdeep.work73@gmail.com',
      },
      {
        label: 'LinkedIn',
        value: 'akashdeep73',
        href: 'http://www.linkedin.com/in/akashdeep73',
      },
      { label: 'Location', value: 'Remote / Chandigarh' },
    ] as ProfileContact[],
  },
  hero: {
    titleMain: 'FULL-STACK',
    titleMuted: 'ENGINEER',
    description:
      '4+ years building cloud-native backend and full-stack systems with NodeJS, ReactJS, Python, FastAPI, ExpressJS, and AI-enabled automation workflows.',
    stats: [
      { value: '4+', label: 'YEARS OF EXPERIENCE' },
      { value: '35%', label: 'WORKFLOW EFFICIENCY GAIN' },
      { value: '99%', label: 'PRODUCTION UPTIME' },
    ] as Stat[],
    features: [
      { text: 'NODEJS, REACTJS, PYTHON, FASTAPI, EXPRESSJS', tone: 'orange' },
      { text: 'AWS, AZURE, DOCKER, KUBERNETES, RAG SYSTEMS', tone: 'lime' },
    ] as Feature[],
  },
  projects: [
    {
      title: 'RAG AI Assistant',
      subtitle: 'Cosmic Owl | Production AI System',
      image:
        'https://framerusercontent.com/images/4mYEXU91rLBNKIW9k6hZh16l7Q.jpeg?width=2400&height=1800',
      overview:
        'Architected and deployed a production-ready RAG system using LLMs and vector databases to automate document summarization and reduce manual review effort.',
      stack: ['Python', 'FAISS', 'RAG', 'LLM', 'FastAPI'],
      link: '/rag-assistant',
    },
    {
      title: 'Product Listing Tool',
      subtitle: 'Cosmic Owl | AI Hybrid Production Tool',
      image:
        'https://framerusercontent.com/images/5Ra4AFZmEJOkMGLAEjkRXt2oqF4.png?width=2400&height=1800',
      overview:
        'Built an end-to-end computer vision pipeline using PyTorch and FastAPI that converts product images into structured listing data and reduced manual data entry by 35%.',
      stack: ['PyTorch', 'FastAPI', 'Computer Vision', 'Automation'],
      link: 'http://www.linkedin.com/in/akashdeep73',
    },
    {
      title: 'Seatherny',
      subtitle: 'Napworks | Bird Classification Platform',
      image:
        'https://framerusercontent.com/images/GyxvLZ0U5MeFKnTaiObmffY.png?width=2400&height=1800',
      overview:
        'Developed an Android and Python tool for image-based bird classification using TensorFlow, integrated with a scalable cloud-hosted backend.',
      stack: ['Python', 'TensorFlow', 'Android', 'Cloud Backend'],
      link: 'http://www.linkedin.com/in/akashdeep73',
    },
  ] as Project[],
  experience: [
    {
      name: 'Cosmic Owl Pvt Ltd, Bangalore | Full Stack Developer',
      details:
        'Developed AI hybrid production tooling and a RAG AI assistant, automated product specification generation, improved API response times by ~35%, and maintained 99% uptime with CI/CD best practices.',
      date: 'Aug 2024 – Present',
    },
    {
      name: 'Napworks Pvt. Ltd., Mohali | Software Engineer',
      details:
        'Optimized legacy systems to reduce latency, built productivity tooling for Android applications, and partnered with R&D and security teams to improve reliability and vulnerability mitigation.',
      date: 'Jul 2023 – Jul 2024',
    },
    {
      name: 'Techbit Solutions Pvt. Ltd., Chandigarh | Software Engineer',
      details:
        'Engineered full-stack and backend features, led a team of 3 engineers, managed integrations and critical analytics/billing modules, and improved API response times by ~35%.',
      date: 'Sep 2021 – Dec 2022',
    },
    {
      name: 'Bhanguz, Chandigarh | Software Engineer',
      details:
        'Developed React and Node.js/Python features, improved performance and user experience, and streamlined deployments through process optimization.',
      date: 'Feb 2021 – Jul 2021',
    },
  ] as ExperienceItem[],
  tools: [
    {
      name: 'NodeJS',
      description: 'Backend API',
      icon: 'https://cdn.simpleicons.org/nodedotjs/3C873A',
    },
    {
      name: 'ReactJS',
      description: 'Frontend UI',
      icon: 'https://cdn.simpleicons.org/react/61DAFB',
    },
    {
      name: 'Python',
      description: 'AI and ML',
      icon: 'https://cdn.simpleicons.org/python/3776AB',
    },
    {
      name: 'SQL/NoSQL',
      description: 'Data Layer',
      icon: 'https://cdn.simpleicons.org/databricks/4479A1',
    },
    {
      name: 'AWS/Azure',
      description: 'Cloud DevOps',
      icon: 'https://cdn.simpleicons.org/ebox/FF9900',
    },
    {
      name: 'PyTorch',
      description: 'AI Models',
      icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C',
    },
  ] as ToolItem[],
  contact: {
    headingMain: "LET'S BUILD",
    headingMuted: 'TOGETHER',
    subtitle:
      'Open to Backend Developer and Full-Stack Developer roles (Remote / Chandigarh).',
    details: [
      { label: 'Phone', value: '+91-7888929889', href: 'tel:+917888929889' },
      {
        label: 'Email',
        value: 'akashdeep.work73@gmail.com',
        href: 'mailto:akashdeep.work73@gmail.com',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/akashdeep73',
        href: 'http://www.linkedin.com/in/akashdeep73',
      },
      { label: 'Languages', value: 'English, Hindi, Punjabi' },
    ] as ProfileContact[],
  },
}
