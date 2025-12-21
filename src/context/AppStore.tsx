import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiEndpoints } from '../services/api/endpoints'
import type { ChatMessage, UploadedFile } from '../types/rag'

type PrevChat = {
  id: string
  title: string
  lastMessage?: string
  updatedAt?: string
}

interface AppContextState {
  token: string | null
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
  loadingGuest: boolean

  loadFiles: () => Promise<void>
  loadChats: () => Promise<void>
  selectFile: (fileId: string | null) => void
  selectChat: (chatId: string | null) => Promise<void>
  uploadFile: (file: File) => Promise<void>
  sendMessage: (text: string) => Promise<void>
  resetConversation: () => void
  getGuestUserAccess: () => Promise<void>
}

const initialState: AppContextState = {
  token: null,
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
  loadingGuest: false,

  loadFiles: async () => {},
  loadChats: async () => {},
  selectFile: () => {},
  selectChat: async () => {},
  uploadFile: async () => {},
  sendMessage: async () => {},
  resetConversation: () => {},
  getGuestUserAccess: async () => {},
}

export const AppContext = createContext<AppContextState>(initialState)

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [chats, setChats] = useState<PrevChat[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  const [loadingFiles, setLoadingFiles] = useState(false)
  const [loadingGuest, setLoadingGuest] = useState(false)
  const [loadingChats, setLoadingChats] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [sending, setSending] = useState(false)

  const getGuestUserAccess = useCallback(async () => {
    if (typeof window === 'undefined') return

    const existing = localStorage.getItem('token')
    if (existing && existing.trim().length > 0) {
      setToken(existing)
      return
    }

    setLoadingGuest(true)
    try {
      const result = await apiEndpoints.getGuestAccess()
      if (result?.access_token) {
        localStorage.setItem('token', result.access_token)
        setToken(result.access_token)
      }
    } catch (error) {
      console.error('guest login error', error)
    } finally {
      setLoadingGuest(false)
    }
  }, [])

  const loadFiles = useCallback(async () => {
    setLoadingFiles(true)
    try {
      const result = await apiEndpoints.getFiles()
      setFiles(result ?? [])
    } catch (error) {
      console.error('loadFiles error', error)
      setFiles([])
    } finally {
      setLoadingFiles(false)
    }
  }, [])

  const loadChats = useCallback(async () => {
    setLoadingChats(true)
    try {
      const result = await apiEndpoints.getChats()
      const mappedChats: PrevChat[] =
        result?.map((session) => ({
          id: session.id.toString(),
          title: session.title,
          updatedAt: session.updatedAt,
        })) ?? []
      setChats(mappedChats)
    } catch (error) {
      console.error('loadChats error', error)
      setChats([])
    } finally {
      setLoadingChats(false)
    }
  }, [])

  const loadChatMessages = useCallback(async (chatId: string) => {
    setLoadingMessages(true)
    try {
      const result = await apiEndpoints.getChatMessages(chatId)
      const mappedMessages: ChatMessage[] =
        result?.map((message) => ({
          id: message.id,
          role: message.role === 'assistant' ? 'assistant' : 'user',
          text: message.content,
          timestamp: message.timestamp,
        })) ?? []
      setMessages(mappedMessages)
    } catch (error) {
      console.error('loadChatMessages error', error)
      setMessages([])
    } finally {
      setLoadingMessages(false)
    }
  }, [])

  const selectFile = useCallback((fileId: string | null) => {
    setSelectedFileId(fileId)
  }, [])

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

  const uploadFile = useCallback(async (file: File) => {
    setUploadingFile(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const uploaded = await apiEndpoints.uploadFile(formData)
      if (uploaded) {
        setFiles((prev: UploadedFile[]) => [{id:uploaded.id, filename:file.name} as UploadedFile, ...prev])
        setSelectedFileId(uploaded.id)
      }
    } catch (error) {
      console.error('uploadFile error', error)
    } finally {
      setUploadingFile(false)
    }
  }, [])

  const resetConversation = useCallback(() => {
    setMessages([])
    setSelectedChatId(null)
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      let chatId: string | null = null
      if (!selectedChatId) {
        try {
          const response = await apiEndpoints.startSession(text)
          chatId = response.id?.toString() ?? null
          if (chatId) {
            setChats((prev: PrevChat[]) => [{ id: chatId, title: response.title } as PrevChat, ...prev])
            setSelectedChatId(chatId)
          }
        } catch (error) {
          console.error('sendMessage error', error)
        }
      } else {
        chatId = selectedChatId
      }

      if (!text.trim()) return

      setSending(true)

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        text,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev: ChatMessage[]) => [...prev, userMessage])

      try {
        if (!chatId) {
          throw new Error('Chat session not initialized')
        }

        const response = await apiEndpoints.sendMessage(chatId, text)

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: response.content ?? 'No response',
          timestamp: response.timestamp ?? new Date().toISOString(),
        }

        setMessages((prev: ChatMessage[]) => [...prev, assistantMessage])
      } catch (error) {
        console.error('sendMessage error', error)
        setMessages((prev: ChatMessage[]) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            text: 'There was an error contacting the server.',
            timestamp: new Date().toISOString(),
          },
        ])
      } finally {
        setSending(false)
      }
    },
    [selectedChatId],
  )

  useEffect(() => {
    void (async () => {
      await getGuestUserAccess()
      await Promise.all([loadFiles(), loadChats()])
    })()
  }, [getGuestUserAccess, loadFiles, loadChats])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const existing = localStorage.getItem('token')
    if (existing && existing !== token) {
      setToken(existing)
    }
  }, [token])

  const providerValue = useMemo(
    () => ({
      token,
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
      loadingGuest,

      loadFiles,
      loadChats,
      selectFile,
      selectChat,
      uploadFile,
      sendMessage,
      resetConversation,
      getGuestUserAccess,
    }),
    [
      token,
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
      loadingGuest,
      loadFiles,
      loadChats,
      selectFile,
      selectChat,
      uploadFile,
      sendMessage,
      resetConversation,
      getGuestUserAccess,
    ],
  )

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
}

export const useAppStore = () => useContext(AppContext)
