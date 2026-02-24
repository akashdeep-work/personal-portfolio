export type UploadedFile = {
  id: number | string
  filename: string
  upload_date?: string
}

export type UploadResponse = {
  file_id: string
  path: string
  indexed: boolean
}

export type MessageStatus = 'pending' | 'completed' | 'failed'

export type Message = {
  id: number | string
  role: 'assistant' | 'user'
  content: string
  status?: MessageStatus
  timestamp?: string
}

export type ChatSession = {
  id: number | string
  title: string
  session_id?: string
  created_at?: string
}

export type ChatResponse = {
  assistant_message_id: number
  role: 'assistant'
  status: MessageStatus
  content: string
}

export type StreamMessageEvent =
  | { assistant_message_id: number; status: 'pending' | 'completed' | 'failed' }
  | { token: string }

export type HealthResponse = {
  status: 'ok' | string
  indexed_files: number
  index_size: number
}

export type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
  timestamp?: string
}
