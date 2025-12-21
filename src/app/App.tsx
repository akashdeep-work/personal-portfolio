import { motion } from 'framer-motion'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Experience } from '../components/sections/Experience'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'
import { Contact } from '../components/sections/Contact'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { InteractiveBackground } from '../components/layout/InteractiveBackground'
import { pageFade } from '../theme/motion'
import '../styles/globals.css'

const App = () => {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen bg-background text-foreground"
    >
      <InteractiveBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="space-y-6">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </motion.div>
  )
}

export default App
