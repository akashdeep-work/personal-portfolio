import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoot from './app/main'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)
