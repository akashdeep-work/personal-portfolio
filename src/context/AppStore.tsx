import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { apiEndpoints } from '../services/api/endpoints'
import type {
  ChatMessage,
  ChatSession,
  Message,
  StreamMessageEvent,
  UploadedFile,
  UploadResponse,
} from '../types/rag'

type PrevChat = {
  id: string
  title: string
  lastMessage?: string
  updatedAt?: string
}

interface AppContextState {
  files: UploadedFile[]
  chats: PrevChat[]
  messages: ChatMessage[]
  selectedFileId?: string | null
  selectedChatId?: string | null
  loadingFiles: boolean
  loadingChats: boolean
  loadingMessages: boolean
  uploadingFile: boolean
  sending: boolean
  loadFiles: () => Promise<void>
  loadChats: () => Promise<void>
  selectFile: (fileId: string | null) => void
  selectChat: (chatId: string | null) => Promise<void>
  uploadFile: (file: File) => Promise<void>
  sendMessage: (text: string) => Promise<void>
  resetConversation: () => void
}

const initialState: AppContextState = {
  files: [],
  chats: [],
  messages: [],
  selectedFileId: null,
  selectedChatId: null,
  loadingFiles: false,
  loadingChats: false,
  loadingMessages: false,
  uploadingFile: false,
  sending: false,
  loadFiles: async () => {},
  loadChats: async () => {},
  selectFile: () => {},
  selectChat: async () => {},
  uploadFile: async () => {},
  sendMessage: async () => {},
  resetConversation: () => {},
}

const mapSessionToPrevChat = (session: ChatSession): PrevChat => ({
  id: String(session.id),
  title: session.title,
  updatedAt: session.created_at,
})

const mapApiMessageToUiMessage = (message: Message): ChatMessage => ({
  id: String(message.id),
  role: message.role === 'assistant' ? 'assistant' : 'user',
  text: message.content,
  timestamp: message.timestamp,
})

const buildOptimisticUserMessage = (text: string): ChatMessage => ({
  id: crypto.randomUUID(),
  role: 'user',
  text,
  timestamp: new Date().toISOString(),
})

export const AppContext = createContext<AppContextState>(initialState)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [chats, setChats] = useState<PrevChat[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [loadingChats, setLoadingChats] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [sending, setSending] = useState(false)

  const loadFiles = useCallback(async () => {
    setLoadingFiles(true)
    try {
      const result = await apiEndpoints.getFiles()
      setFiles((result ?? []).map((file) => ({ ...file, id: String(file.id) })))
    } catch {
      setFiles([])
    } finally {
      setLoadingFiles(false)
    }
  }, [])

  const loadChats = useCallback(async () => {
    setLoadingChats(true)
    try {
      const result = await apiEndpoints.getChats()
      setChats(result?.map(mapSessionToPrevChat) ?? [])
    } catch {
      setChats([])
    } finally {
      setLoadingChats(false)
    }
  }, [])

  const loadChatMessages = useCallback(async (chatId: string) => {
    setLoadingMessages(true)
    try {
      const result = await apiEndpoints.getChatMessages(chatId)
      setMessages(result?.map(mapApiMessageToUiMessage) ?? [])
    } catch {
      setMessages([])
    } finally {
      setLoadingMessages(false)
    }
  }, [])

  const selectFile = useCallback((fileId: string | null) => setSelectedFileId(fileId), [])

  const selectChat = useCallback(
    async (chatId: string | null) => {
      setSelectedChatId(chatId)
      if (!chatId) {
        setMessages([])
        return
      }
      await loadChatMessages(chatId)
    },
    [loadChatMessages],
  )

  const prependUploadedFile = (uploaded: UploadResponse, file: File) => {
    const nextFile: UploadedFile = {
      id: uploaded.file_id,
      filename: file.name,
      upload_date: new Date().toISOString(),
    }
    setFiles((prev) => [nextFile, ...prev])
    setSelectedFileId(uploaded.file_id)
  }

  const uploadFile = useCallback(async (file: File) => {
    setUploadingFile(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const uploaded = await apiEndpoints.uploadFile(formData)
      prependUploadedFile(uploaded, file)
    } finally {
      setUploadingFile(false)
    }
  }, [])

  const resetConversation = useCallback(() => {
    setMessages([])
    setSelectedChatId(null)
  }, [])

  const ensureChatSession = useCallback(
    async (text: string) => {
      if (selectedChatId) return selectedChatId
      const session = await apiEndpoints.startSession(text)
      const nextChatId = String(session.id)
      setChats((prev) => [mapSessionToPrevChat(session), ...prev])
      setSelectedChatId(nextChatId)
      return nextChatId
    },
    [selectedChatId],
  )

  const sendMessage = useCallback(
    async (text: string) => {
      const normalizedText = text.trim()
      if (!normalizedText) return

      const assistantPlaceholderId = crypto.randomUUID()
      let persistedAssistantMessageId: string | null = null
      const isStreamingAssistantMessage = (messageId: string) =>
        messageId === assistantPlaceholderId || messageId === persistedAssistantMessageId

      setSending(true)
      setMessages((prev) => [
        ...prev,
        buildOptimisticUserMessage(normalizedText),
        { id: assistantPlaceholderId, role: 'assistant', text: '', timestamp: new Date().toISOString() },
      ])

      try {
        const chatId = await ensureChatSession(normalizedText)
        await apiEndpoints.sendMessageStream(chatId, normalizedText, (event: StreamMessageEvent) => {
          if ('token' in event) {
            flushSync(() => {
              setMessages((prev) =>
                prev.map((message) =>
                  isStreamingAssistantMessage(message.id)
                    ? { ...message, text: `${message.text}${event.token}` }
                    : message,
                ),
              )
            })
            return
          }

          if (event.status === 'pending') {
            const persistedId = String(event.assistant_message_id)
            persistedAssistantMessageId = persistedId
            setMessages((prev) =>
              prev.map((message) =>
                isStreamingAssistantMessage(message.id) ? { ...message, id: persistedId } : message,
              ),
            )
          }

          if (event.status === 'failed') {
            setMessages((prev) =>
              prev.map((message) =>
                isStreamingAssistantMessage(message.id)
                  ? { ...message, id: String(event.assistant_message_id), text: message.text || 'Failed response.' }
                  : message,
              ),
            )
          }
        })
      } catch {
        setMessages((prev) =>
          prev.map((message) =>
            isStreamingAssistantMessage(message.id)
              ? { ...message, text: 'There was an error contacting the server.' }
              : message,
          ),
        )
      } finally {
        setSending(false)
      }
    },
    [ensureChatSession],
  )

  useEffect(() => {
    void Promise.all([loadFiles(), loadChats()])
  }, [loadFiles, loadChats])

  const providerValue = useMemo(
    () => ({
      files,
      chats,
      messages,
      selectedFileId,
      selectedChatId,
      loadingFiles,
      loadingChats,
      loadingMessages,
      uploadingFile,
      sending,
      loadFiles,
      loadChats,
      selectFile,
      selectChat,
      uploadFile,
      sendMessage,
      resetConversation,
    }),
    [
      files,
      chats,
      messages,
      selectedFileId,
      selectedChatId,
      loadingFiles,
      loadingChats,
      loadingMessages,
      uploadingFile,
      sending,
      loadFiles,
      loadChats,
      selectFile,
      selectChat,
      uploadFile,
      sendMessage,
      resetConversation,
    ],
  )

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
}

export const useAppStore = () => useContext(AppContext)
