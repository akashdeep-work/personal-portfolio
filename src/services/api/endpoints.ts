import { api } from './client'
import type {
  ChatResponse,
  ChatSession,
  HealthResponse,
  Message,
  StreamMessageEvent,
  UploadedFile,
  UploadResponse,
} from '../../types/rag'

type SearchResponse = {
  query: string
  results: Array<Record<string, unknown>>
  summary?: string
}

type ChunkResponse = {
  chunk_id: string
  metadata: Record<string, unknown>
  vector?: number[]
}

export const apiEndpoints = {
  getHealth: () => api.get<HealthResponse>('/health'),
  getFiles: () => api.get<UploadedFile[]>('/upload/list'),
  uploadFile: (formData: FormData) => api.post<UploadResponse>('/upload', formData),
  getChats: () => api.get<ChatSession[]>('/chat/sessions'),
  getChatMessages: (chatId: string) => api.get<Message[]>(`/chat/${chatId}/history`),
  startSession: (title: string) => api.post<ChatSession>('/chat/sessions', { title }),
  sendMessage: (chatId: string, content: string) =>
    api.post<ChatResponse>(`/chat/${chatId}/message`, { content }),
  sendMessageStream: (chatId: string, content: string, onMessage: (event: StreamMessageEvent) => void) =>
    api.postSse<StreamMessageEvent>(`/chat/${chatId}/message/stream`, { content }, onMessage),
  getMessage: (messageId: string) => api.get<Message>(`/chat/messages/${messageId}`),
  search: (query: string, k = 10, summarize = true) =>
    api.get<SearchResponse>(`/search?q=${encodeURIComponent(query)}&k=${k}&summarize=${summarize}`),
  getChunk: (chunkId: string) => api.get<ChunkResponse>(`/chunk/${chunkId}`),
}
