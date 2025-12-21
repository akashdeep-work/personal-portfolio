export type GuestUser = {
  access_token: string
}

export type UploadedFile = {
  id: string
  filename: string
  upload_date?: string
}

export type Message = {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp?: string
}

export type ChatSession = {
  id: string | number
  title: string
  updatedAt?: string
}

export type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
  timestamp?: string
}
