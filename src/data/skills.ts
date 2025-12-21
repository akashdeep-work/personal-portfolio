import type { SkillGroup } from '../types'

export const skills: SkillGroup[] = [
  {
    category: 'Front-End & Mobile',
    items: ['React.js', 'SwiftUI', 'Kotlin', 'Android', 'iOS', 'React Native'],
  },
  {
    category: 'Backend & APIs',
    items: ['Python', 'FastAPI', 'Django', 'Node.js', 'Express.js', 'NestJS', 'REST', 'GraphQL'],
  },
  {
    category: 'Machine Learning & AI',
    items: [
      'Model development',
      'NLP',
      'Computer vision',
      'Recommender systems',
      'Predictive analytics',
      'PyTorch',
      'MLX',
      'Transformers',
      'LangChain',
    ],
  },
  {
    category: 'Cloud, Data & MLOps',
    items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'MongoDB', 'MySQL', 'SQLite', 'ETL pipelines', 'CI/CD'],
  },
]
