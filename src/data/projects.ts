import type { Project } from '../types'

export const projects: Project[] = [
  {
    title: 'RAG Knowledge Assistant',
    description: 'Document-aware AI chat that grounds answers on your uploaded PDFs and Word files.',
    tech: ['React', 'Tailwind', 'Python', 'FIASS', 'FastAPI', 'SqlLITE', 'Pytorch', 'LLama', 'LLM'],
    image: '/rag.png',
    alt: 'Minimal chat interface on light background',
    live: '/rag-assistant',
  },
  {
    title: 'Memory Cherish',
    description: 'Memory Cherish is an AI-powered image enhancement app designed to bring your old, faded, scratched, and black-and-white photos back to life. With just one tap, transform damaged memories into clear, vibrant images you can cherish forever.',
    tech: ['IOS', 'SwiftUI', 'MLX'],
    image: '/memory.png',
    alt: 'Enhance. Relive Your Memories',
  },
  {
    title: 'Bürger Mich Ein! – Einbürgerungstest 2025',
    description: 'Bürger Mich Ein! – Einbürgerungstest 2025 is a modern quiz-based mobile application designed to help users confidently prepare for the German citizenship (Einbürgerungstest).The app combines official question formats, state-specific tests, and AI-powered assistance to deliver an effective and user-friendly learning experience.',
    tech: ['React Native', 'Python', 'Pytorch', 'LLM', 'MySQL'],
    image: '/quizapp.png',
    alt: 'AI-Powered German Citizenship Preparation App',
  },
  {
    title: 'Hapiverse – AI-Powered Social Networking Experience',
    description: 'Hapiverse is an AI-powered social platform designed for both businesses and individuals to connect, collaborate, and grow through intelligent matchmaking and personalized recommendations. The app leverages advanced AI algorithms to create meaningful connections based on user interests, goals, and behavior.',
    tech: ['Android', 'Kotlin', 'IOS', 'SwiftUI', 'Nodejs', 'NextJs', 'MongoDB', 'Python', 'Pytorch', 'AI', 'Machine Learning'],
    image: '/hapiverse.png',
    alt: 'Hapiverse – AI-Powered Social Networking Experience',
  },
  {
    title: 'Focusly – AI-Powered Productivity & Focus App',
    description: 'Focusly is an AI-powered productivity and focus management app designed to help individuals and professionals eliminate distractions, manage time efficiently, and build sustainable work habits. The app combines behavioral AI, smart task prioritization, and real-time focus insights to improve productivity without burnout.',
    tech: ['IOS', 'Swift', 'Python', 'Pytorch', 'MongoDB', 'FastAPI'],
    image: '/focusly.png',
    alt: 'Focus Better. Work Smarter. Achieve More.',
  },
  {
    title: 'ProductFielder',
    description: 'ProductFielder is an AI-powered web application designed to help e-commerce sellers, brands, and digital entrepreneurs create high-quality product listings in seconds. Built with React.js on the frontend and a Python + PyTorch AI backend, ProductFielder transforms minimal product input into complete, optimized product data ready for online marketplaces. The platform eliminates repetitive manual work and ensures consistency, accuracy, and SEO-optimized content for every product.',
    tech: ['ReactJS', 'MongoDB', 'Python', 'Pytorch', 'AI', 'Machine Learning'],
    image: '/productfielder.png',
    alt: 'AI-Powered Product Listing Generator for E-commerce',
  },
  {
    title: 'InsightTrendr',
    description: 'InsightTrendr is an AI-driven web application that helps businesses, marketers, and analysts identify, analyze, and predict market trends using machine learning. Built with React.js and powered by a Python + PyTorch backend, InsightTrendr transforms large volumes of data into actionable insights.',
    tech: ['ReactJS', 'Python', 'Pytorch', 'MongoDB', 'FastAPI'],
    image: '/insight.png',
    alt: 'AI-Powered Market Trend Analysis & Forecasting Platform',
  },
]
