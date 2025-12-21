import type { Variants } from 'framer-motion'

export const transitions = {
  base: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  subtle: { duration: 0.5, ease: 'easeOut' },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...transitions.base, delay },
  }),
}

export const staggerChildren: Variants = {
  hidden: {},
  visible: ({ stagger = 0.08, delay = 0 } = {}) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  }),
}

export const scaleOnHover: Variants = {
  rest: { scale: 1, transition: { duration: 0.2 } },
  hover: { scale: 1.02, transition: { duration: 0.25 } },
}

export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
}
