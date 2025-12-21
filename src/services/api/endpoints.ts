import { api } from './client'
import type { ChatSession, GuestUser, Message, UploadedFile } from '../../types/rag'

export const apiEndpoints = {
  getGuestAccess: () => api.post<GuestUser>('/auth/guest', {}),

  getFiles: () => api.get<UploadedFile[]>('/upload/list'),

  uploadFile: (formData: FormData) => api.post<UploadedFile>('/upload', formData),

  getChats: () => api.get<ChatSession[]>('/chat/sessions'),

  getChatMessages: (chatId: string) => api.get<Message[]>(`/chat/${chatId}/history`),

  startSession: (title: string) => api.post<ChatSession>(`/chat/sessions`, { title }),

  sendMessage: (chatId: string, content: string) => api.post<Message>(`/chat/${chatId}/message`, { content }),
}
