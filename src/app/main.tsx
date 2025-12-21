import App from './App'
import { RagWorkspace } from '../components/rag/RagWorkspace'

const isRagShowcase = typeof window !== 'undefined' && window.location.pathname.includes('rag-assistant')

const AppRoot = () => {
  if (isRagShowcase) {
    return <RagWorkspace />
  }
  return <App />
}

export default AppRoot
