import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export const useMotionSafe = () => {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 768px)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const handleChange = () => setIsMobile(mediaQuery.matches)
    handleChange()

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const disableMotion = prefersReducedMotion || isMobile

  return { disableMotion }
}
