import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, FilePlus, Loader2, Plus, Send, Upload } from 'lucide-react'
import { AppContextProvider, useAppStore } from '../../context/AppStore'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { InteractiveBackground } from '../layout/InteractiveBackground'
import { cn } from '../../utils/cn'

const Sidebar = () => {
  const {
    chats,
    files,
    selectedChatId,
    selectedFileId,
    selectChat,
    selectFile,
    resetConversation,
    uploadFile,
    loadingFiles,
    loadingChats,
    uploadingFile,
  } = useAppStore()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      await uploadFile(file)
      event.target.value = ''
    }
  }

  return (
    <aside className="flex w-full flex-col gap-4 lg:w-72">
      <Card className="space-y-4 border-border/60 bg-card/80 p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Conversation</p>
            <h3 className="text-lg font-semibold text-foreground">Your Chats</h3>
          </div>
          <Button size="icon" variant="outline" onClick={resetConversation} aria-label="Start new chat">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {(loadingChats || uploadingFile) && (
            <p className="text-xs text-muted">Syncing...</p>
          )}
          {chats.length === 0 && !loadingChats && (
            <p className="rounded-md bg-border/20 p-3 text-sm text-muted">New chats will appear here.</p>
          )}
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-2 text-left text-sm transition-colors hover:border-border/70 hover:bg-border/30',
                selectedChatId === chat.id && 'border-accent/60 bg-accent/10 text-foreground',
              )}
            >
              <span className="truncate">{chat.title}</span>
              <ArrowLeft className="h-4 w-4 rotate-180 opacity-60" />
            </button>
          ))}
        </div>
      </Card>
      <Card className="space-y-4 border-border/60 bg-card/80 p-4 shadow-soft">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Knowledge</p>
            <h3 className="text-lg font-semibold text-foreground">Uploaded Files</h3>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload file"
            disabled={uploadingFile}
          >
            {uploadingFile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
            aria-label="Upload file"
          />
        </div>
        <div className="space-y-2">
          {loadingFiles && <p className="text-xs text-muted">Loading your files…</p>}
          {files.length === 0 && !loadingFiles && (
            <p className="rounded-md bg-border/20 p-3 text-sm text-muted">Upload PDFs or docs to ground responses.</p>
          )}
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => selectFile(file.id)}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-left text-sm transition-colors hover:border-border/70 hover:bg-border/30',
                selectedFileId === file.id && 'border-accent/60 bg-accent/10 text-foreground',
              )}
            >
              <FilePlus className="h-4 w-4 opacity-70" />
              <span className="truncate">{file.filename}</span>
            </button>
          ))}
        </div>
      </Card>
    </aside>
  )
}

const MessageBubble = ({ role, text }: { role: 'assistant' | 'user'; text: string }) => (
  <div className={cn('flex w-full', role === 'user' ? 'justify-end' : 'justify-start')}>
    <div
      className={cn(
        'max-w-xl rounded-2xl border px-4 py-3 text-sm shadow-sm backdrop-blur',
        role === 'user'
          ? 'ml-12 border-accent/40 bg-accent text-background'
          : 'mr-12 border-border/60 bg-card/80 text-foreground',
      )}
    >
      <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
  </div>
)

const ChatPanel = () => {
  const {
    messages,
    sending,
    loadingMessages,
    selectedFileId,
    files,
    sendMessage,
    selectedChatId,
  } = useAppStore()
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)

  const selectedFile = useMemo(() => files.find((file) => file.id === selectedFileId), [files, selectedFileId])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, sending])

  const handleSend = async () => {
    if (!input.trim()) return
    await sendMessage(input.trim())
    setInput('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void handleSend()
    }
  }

  return (
    <Card className="flex h-[75vh] min-h-[520px] w-full flex-col gap-4 overflow-hidden border-border/60 bg-card/80 p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">RAG Demo</p>
          <h2 className="text-2xl font-semibold text-foreground">What can I help with?</h2>
          {selectedFile && <p className="text-sm text-muted">Grounded with: {selectedFile.filename}</p>}
        </div>
        {selectedChatId && <span className="rounded-full bg-border/40 px-3 py-1 text-xs text-muted">Session: {selectedChatId}</span>}
      </div>
      <div
        ref={listRef}
        className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-border/50 bg-background/60 p-4"
      >
        {messages.length === 0 && !loadingMessages && (
          <div className="grid place-items-center h-full text-center text-muted">
            <div className="space-y-2">
              <p className="text-sm">Ask anything about your uploaded files or paste a question to begin.</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-muted/80">
                <span className="rounded-full bg-border/40 px-3 py-1">Summaries</span>
                <span className="rounded-full bg-border/40 px-3 py-1">Action items</span>
                <span className="rounded-full bg-border/40 px-3 py-1">Compare documents</span>
              </div>
            </div>
          </div>
        )}
        {loadingMessages && <p className="text-sm text-muted">Loading conversation…</p>}
        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} text={message.text} />
        ))}
        {sending && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating response…
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-end gap-3">
          <div className="relative w-full">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything…"
              className="min-h-[70px] w-full resize-none rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground shadow-inner focus:border-accent focus:outline-none"
            />
            {selectedFile && (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-border/50 px-2 py-1 text-[11px] text-muted">
                <FilePlus className="h-3 w-3" /> {selectedFile.filename}
              </span>
            )}
          </div>
          <Button onClick={() => void handleSend()} disabled={sending || !input.trim()} className="h-[52px] px-4">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send
          </Button>
        </div>
        <p className="text-xs text-muted">Press Enter to send • Shift + Enter for a new line</p>
      </div>
    </Card>
  )
}

const RagWorkspaceInner = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <InteractiveBackground />
      <div className="relative z-10 py-10">
        <Container className="flex flex-col gap-8">
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Showcase</p>
              <h1 className="text-3xl font-bold text-foreground">Retrieval-Augmented Assistant</h1>
              <p className="text-sm text-muted">
                Bring your own documents, chat, and get grounded answers with our RAG stack.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="outline">
                <a href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to portfolio
                </a>
              </Button>
              <Button asChild>
                <a href="#" className="flex items-center gap-2">
                  <Send className="h-4 w-4" /> Book a demo
                </a>
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px,1fr]">
            <Sidebar />
            <ChatPanel />
          </div>
        </Container>
      </div>
    </div>
  )
}

export const RagWorkspace = () => (
  <AppContextProvider>
    <RagWorkspaceInner />
  </AppContextProvider>
)
