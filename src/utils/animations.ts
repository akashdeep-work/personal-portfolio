import { useReducedMotion } from 'framer-motion'

export const useRespectMotionPreference = () => {
  const shouldReduceMotion = useReducedMotion()
  return shouldReduceMotion
}
