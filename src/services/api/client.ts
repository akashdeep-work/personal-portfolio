const API_BASE_URL = import.meta.env.VITE_RAG_API_URL ?? 'https://ragapi.cosmicowl.in'
const SESSION_STORAGE_KEY = 'rag_session_id'

const createSessionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `web_${crypto.randomUUID()}`
  }

  return `web_${Date.now()}`
}

export const getSessionId = () => {
  if (typeof window === 'undefined') return null

  const existingSessionId = localStorage.getItem(SESSION_STORAGE_KEY)
  if (existingSessionId) return existingSessionId

  const nextSessionId = createSessionId()
  localStorage.setItem(SESSION_STORAGE_KEY, nextSessionId)
  return nextSessionId
}

async function parseApiError(response: Response): Promise<string> {
  const raw = await response.text()
  if (!raw) return response.statusText

  try {
    const parsed = JSON.parse(raw) as { detail?: string }
    return parsed.detail ?? raw
  } catch {
    return raw
  }
}

function createRequestHeaders(body?: BodyInit | null, headers?: HeadersInit): Headers {
  const requestHeaders = new Headers(headers)
  const sessionId = getSessionId()

  if (!(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  if (sessionId) {
    requestHeaders.set('X-Session-Id', sessionId)
  }

  return requestHeaders
}

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: createRequestHeaders(options.body, options.headers),
  })

  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

type SseHandler<T> = (event: T) => void

async function postSse<T>(path: string, body: unknown, onMessage: SseHandler<T>): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: createRequestHeaders(undefined, {
      Accept: 'text/event-stream',
    }),
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  if (!response.body) {
    throw new Error('Streaming response body is missing')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue

      const payload = trimmed.replace(/^data:\s*/, '')
      if (!payload) continue

      onMessage(JSON.parse(payload) as T)
    }
  }
}

export const api = {
  get: async <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: async <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    }),
  postSse,
}
