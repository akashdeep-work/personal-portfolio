import { useEffect, useState } from 'react'
import { colors } from '../theme/colors'

const STORAGE_KEY = 'portfolio-theme'

type ThemeMode = 'light' | 'dark'

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    return (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    const palette = colors[theme]
    root.classList.remove(theme === 'dark' ? 'light' : 'dark')
    root.classList.add(theme)
    root.style.setProperty('--color-background', palette.background)
    root.style.setProperty('--color-foreground', palette.foreground)
    root.style.setProperty('--color-muted', palette.muted)
    root.style.setProperty('--color-accent', palette.accent)
    root.style.setProperty('--color-border', palette.border)
    root.style.setProperty('--color-card', palette.card)
    root.style.setProperty('--color-card-foreground', palette.cardForeground)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
