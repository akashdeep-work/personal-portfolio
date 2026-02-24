import { useEffect, useMemo, useRef, useState } from 'react'
import { AppContextProvider, useAppStore } from '../../context/AppStore'

const RagSidebar = () => {
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
    if (!file) return
    await uploadFile(file)
    event.target.value = ''
  }

  return (
    <aside className="rag-sidebar">
      <div className="rag-panel">
        <div className="rag-panel-head">
          <div>
            <p>Conversation</p>
            <h3>RAG Sessions</h3>
          </div>
          <button className="rag-mini-btn" onClick={resetConversation} type="button">
            +
          </button>
        </div>
        <div className="rag-list">
          {(loadingChats || uploadingFile) && <p className="rag-meta">Syncing...</p>}
          {chats.length === 0 && !loadingChats && <p className="rag-empty">No chat sessions yet.</p>}
          {chats.map((chat) => (
            <button
              key={chat.id}
              className={`rag-list-item ${selectedChatId === chat.id ? 'active' : ''}`}
              type="button"
              onClick={() => void selectChat(chat.id)}
            >
              <span>{chat.title}</span>
              <span>↗</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rag-panel">
        <div className="rag-panel-head">
          <div>
            <p>Knowledge</p>
            <h3>Files</h3>
          </div>
          <button
            className="rag-mini-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingFile}
            type="button"
          >
            {uploadingFile ? '…' : '↑'}
          </button>
          <input ref={fileInputRef} type="file" className="rag-hidden" onChange={handleUpload} />
        </div>
        <div className="rag-list">
          {loadingFiles && <p className="rag-meta">Loading files…</p>}
          {files.length === 0 && !loadingFiles && (
            <p className="rag-empty">Upload files so answers are grounded in your docs.</p>
          )}
          {files.map((file) => (
            <button
              key={String(file.id)}
              className={`rag-list-item ${selectedFileId === file.id ? 'active' : ''}`}
              type="button"
              onClick={() => selectFile(String(file.id))}
            >
              <span>{file.filename}</span>
              <span>📄</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

const RagChat = () => {
  const { messages, sending, loadingMessages, selectedFileId, files, selectedChatId, sendMessage } = useAppStore()
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)

  const selectedFile = useMemo(
    () => files.find((file) => String(file.id) === String(selectedFileId)),
    [files, selectedFileId],
  )

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

  return (
    <section className="rag-chat">
      <div className="rag-chat-head">
        <div>
          <p>RAG Pipeline</p>
          <h2>Ask about your documents</h2>
          {selectedFile && <small>Grounded with: {selectedFile.filename}</small>}
        </div>
        {selectedChatId && <span className="rag-chip">Session: {selectedChatId}</span>}
      </div>

      <div className="rag-messages" ref={listRef}>
        {messages.length === 0 && !loadingMessages && (
          <div className="rag-empty rag-center">
            Try: “Summarize my uploaded file”, “Extract action items”, or “Compare documents”.
          </div>
        )}
        {loadingMessages && <p className="rag-meta">Loading conversation…</p>}
        {messages.map((message) => (
          <div key={message.id} className={`rag-bubble-wrap ${message.role}`}>
            <article className="rag-bubble">{message.text}</article>
          </div>
        ))}
        {sending && <p className="rag-meta">Generating response…</p>}
      </div>

      <div className="rag-input-row">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              void handleSend()
            }
          }}
          placeholder="Ask anything about your files..."
        />
        <button className="rag-send" onClick={() => void handleSend()} type="button" disabled={sending || !input.trim()}>
          Send
        </button>
      </div>
      <p className="rag-meta">Enter to send • Shift + Enter for new line</p>
    </section>
  )
}

const RagWorkspaceInner = () => {
  return (
    <div className="rag-page">
      <div className="rag-shell">
        <header className="rag-header">
          <div>
            <p>Using existing API & services</p>
            <h1>Retrieval-Augmented Assistant</h1>
            <small>Theme aligned to your current Sawad-inspired UI.</small>
          </div>
          <a href="/" className="rag-back">
            Back to portfolio
          </a>
        </header>
        <div className="rag-layout">
          <RagSidebar />
          <RagChat />
        </div>
      </div>
    </div>
  )
}

export const RagWorkspace = () => (
  <AppContextProvider>
    <RagWorkspaceInner />
  </AppContextProvider>
)
