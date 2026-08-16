import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Inbox,
  Paperclip,
  Search,
  Send,
  Star,
  StarOff,
  Mail,
  MailOpen,
} from 'lucide-react'
import {
  Avatar,
  Badge,
  Button,
  EmptyState,
  Input,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'
import { messages as demoMessages } from '../../data/demoData'
import { pageTransition } from '../../animations/variants'
import { cn } from '../../utils/cn'

const FILTERS = [
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'sent', label: 'Sent', icon: Send },
  { id: 'starred', label: 'Starred', icon: Star },
  { id: 'unread', label: 'Unread', icon: Mail },
]

function selfAliases(user) {
  const names = new Set(['Admin'])
  if (user?.name) names.add(user.name)
  if (user?.role === 'admin') names.add('Admin')
  return names
}

function otherParticipant(conversation, aliases) {
  return (
    conversation.participants.find((p) => !aliases.has(p)) ||
    conversation.participants[0]
  )
}

function isMine(from, aliases) {
  return aliases.has(from)
}

export default function MessagesPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const aliases = useMemo(() => selfAliases(user), [user])
  const selfName = user?.name || 'Admin'

  // Firebase-ready: replace local state with Firestore listeners / sendMessage() later
  const [conversations, setConversations] = useState(() =>
    demoMessages.map((m) => ({ ...m, thread: [...m.thread] }))
  )
  const [filter, setFilter] = useState('inbox')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(demoMessages[0]?.id || null)
  const [draft, setDraft] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return conversations.filter((c) => {
      const name = otherParticipant(c, aliases).toLowerCase()
      if (q && !`${name} ${c.preview}`.toLowerCase().includes(q)) return false
      if (filter === 'starred' && !c.starred) return false
      if (filter === 'unread' && !c.unread) return false
      if (filter === 'sent') {
        const last = c.thread[c.thread.length - 1]
        if (!last || !isMine(last.from, aliases)) return false
      }
      return true
    })
  }, [conversations, filter, query, aliases])

  const active = conversations.find((c) => c.id === activeId) || filtered[0] || null

  const selectConversation = (id) => {
    setActiveId(id)
    // Mark as read locally (Firebase: updateDoc unread: 0)
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    )
  }

  const toggleStar = (id) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c))
    )
  }

  const sendMessage = () => {
    if (!active || !draft.trim()) return
    const text = draft.trim()
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    // Firebase-ready: await addDoc(collection(db, 'messages', active.id, 'thread'), {...})
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== active.id) return c
        return {
          ...c,
          preview: text,
          updatedAt: new Date().toISOString(),
          unread: 0,
          thread: [...c.thread, { from: selfName, text, time }],
        }
      })
    )
    setDraft('')
    toast('Message sent', 'success')
  }

  const attachStub = () => {
    toast('Attachment picker ready for Firebase Storage', 'info')
  }

  return (
    <motion.div {...pageTransition} className="pb-8">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet">Messaging</p>
        <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">Inbox</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Coordinate with teachers, parents, and campus teams.
        </p>
      </div>

      <div className="grid h-[min(720px,calc(100vh-12rem))] overflow-hidden rounded-[24px] border border-border bg-surface shadow-[var(--shadow-soft)] lg:grid-cols-[220px_300px_1fr]">
        {/* Sidebar filters */}
        <aside className="border-b border-border p-3 lg:border-b-0 lg:border-r">
          <div className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {FILTERS.map((f) => {
              const Icon = f.icon
              const activeFilter = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm font-semibold transition',
                    activeFilter
                      ? 'bg-violet/10 text-violet'
                      : 'text-ink-secondary hover:bg-ivory-soft hover:text-ink'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {f.label}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Conversation list */}
        <div className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="border-b border-border p-3">
            <Input
              icon={Search}
              placeholder="Search conversations…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
            {filtered.length === 0 ? (
              <div className="p-4">
                <EmptyState
                  icon={MailOpen}
                  title="No conversations"
                  description="Nothing matches this filter."
                  className="border-0 bg-transparent py-10 shadow-none"
                />
              </div>
            ) : (
              filtered.map((c) => {
                const name = otherParticipant(c, aliases)
                const isActive = active?.id === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectConversation(c.id)}
                    className={cn(
                      'flex w-full items-start gap-3 border-b border-border px-3 py-3.5 text-left transition',
                      isActive ? 'bg-violet/8' : 'hover:bg-ivory-soft'
                    )}
                  >
                    <Avatar src={c.avatar} name={name} size="md" online={c.online} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-bold text-ink">{name}</p>
                        {c.unread > 0 && (
                          <Badge tone="violet" className="shrink-0">
                            {c.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-ink-muted">{c.preview}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleStar(c.id)
                      }}
                      className="mt-0.5 rounded-lg p-1 text-ink-muted hover:text-amber"
                      aria-label={c.starred ? 'Unstar' : 'Star'}
                    >
                      {c.starred ? (
                        <Star className="h-3.5 w-3.5 fill-amber text-amber" />
                      ) : (
                        <StarOff className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Conversation panel */}
        <div className="flex min-h-0 min-w-0 flex-col">
          {!active ? (
            <div className="flex flex-1 items-center justify-center p-6">
              <EmptyState
                icon={Inbox}
                title="Select a conversation"
                description="Choose a thread from the list to view messages."
                className="border-0 bg-transparent shadow-none"
              />
            </div>
          ) : (
            <>
              <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={active.avatar}
                    name={otherParticipant(active, aliases)}
                    size="md"
                    online={active.online}
                  />
                  <div>
                    <p className="text-sm font-bold text-ink">
                      {otherParticipant(active, aliases)}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {active.online ? 'Online now' : 'Offline'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleStar(active.id)}
                  aria-label="Toggle star"
                >
                  {active.starred ? (
                    <Star className="h-4 w-4 fill-amber text-amber" />
                  ) : (
                    <Star className="h-4 w-4" />
                  )}
                </Button>
              </header>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
                {active.thread.map((msg, i) => {
                  const mine = isMine(msg.from, aliases)
                  return (
                    <motion.div
                      key={`${msg.time}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn('flex', mine ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-[18px] px-4 py-2.5 text-sm',
                          mine
                            ? 'rounded-br-md bg-violet text-white'
                            : 'rounded-bl-md bg-ivory-soft text-ink'
                        )}
                      >
                        {!mine && (
                          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.06em] opacity-70">
                            {msg.from}
                          </p>
                        )}
                        <p className="leading-relaxed">{msg.text}</p>
                        <p
                          className={cn(
                            'mt-1 text-[10px]',
                            mine ? 'text-white/70' : 'text-ink-muted'
                          )}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <footer className="border-t border-border p-3">
                <div className="flex items-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={attachStub}
                    aria-label="Attach file"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      placeholder="Write a message…"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                    />
                  </div>
                  <Button variant="violet" onClick={sendMessage} disabled={!draft.trim()}>
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </footer>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
