import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { staggerChildren, fadeInUp } from '../../theme/motion'

export const AnimatedText = ({ children }: PropsWithChildren) => (
  <motion.span
    variants={staggerChildren}
    initial="hidden"
    animate="visible"
    className="inline-flex flex-wrap"
  >
    {String(children)
      .split(' ')
      .map((word, index) => (
        <motion.span key={`${word}-${index}`} className="mr-2" variants={fadeInUp} custom={index * 0.04}>
          {word}
        </motion.span>
      ))}
  </motion.span>
)
