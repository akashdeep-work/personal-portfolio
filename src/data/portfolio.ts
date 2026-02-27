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
      '/akash.jpeg',
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
        '/rag.png',
      overview:
        'Engineered the core retrieval backend for a production-ready Retrieval-Augmented Generation (RAG) system. Built a highly efficient vector database pipeline from scratch using FAISS for semantic search. Implemented advanced reranking algorithms to optimize context retrieval, drastically minimizing LLM hallucinations and ensuring highly accurate, grounded document summarization.',
      stack: ['Python', 'FAISS', 'RAG', 'LLM', 'FastAPI'],
      link: '/rag-assistant',
    },
    {
      title: 'Product Fielder',
      subtitle: 'AI-Powered Product Listing generator for Sellers',
      image:
        '/productfielder.png',
      overview:
        'Developed an intelligent product listing generator that leverages AI to automatically create optimized, high-converting product titles, descriptions, bullet points, and SEO keywords for e-commerce sellers.',
      stack: ['Python', 'ReactJS', 'FastAPI', 'API Optimization', 'LLM'],
    },
    {
      title: 'Video Streaming Architecture',
      subtitle: 'Cosmic Owl | Full-Stack Platform',
      image:
        '/videostream.png',
      overview:
        'Developed scalable, full-stack streaming solutions focused on advanced video compression and efficient delivery protocols. Successfully maintained high-quality playback on the client side while significantly reducing backend CDN costs and data payloads.',
      stack: ['NodeJS', 'ReactJS', 'Streaming', 'API Optimization'],
    },
    {
      title: 'Memory Cherish',
      subtitle: 'AI-Powered Image Restoration App',
      image:
        '/MemoryCharrish.png',
      overview:
        'Built a full-stack, AI-powered image enhancement application utilizing React for an intuitive frontend and Python for the backend engine. The platform successfully restores, colorizes, and repairs old, faded, and scratched black-and-white photos.',
      stack: ['ReactJS', 'Python', 'AI Models', 'Image Processing'],
    },
     
    {
      title: 'Hapiverse',
      subtitle: 'AI-powered social networking application',
      image:
        '/hapiverse.png',
      overview:
        'Developed Hapiverse, an AI-powered social networking application designed for businesses and individuals to connect through an intelligent match algorithm and personalized recommendation system. The platform enhances professional networking by delivering meaningful, interest-based connections and business opportunities.',
      stack: ['ReactJS', 'Python', 'Nodejs', 'IOS', 'Android', 'AI Models'],
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
