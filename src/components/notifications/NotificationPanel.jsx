import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  BookOpen,
  CheckCheck,
  ClipboardCheck,
  FlaskConical,
  Megaphone,
  Settings2,
  Wallet,
  X,
} from 'lucide-react'
import { notifications as demoNotifications } from '../../data/demoData'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { cn } from '../../utils/cn'

const typeConfig = {
  attendance: { icon: ClipboardCheck, tone: 'cyan' },
  assignment: { icon: BookOpen, tone: 'violet' },
  exam: { icon: FlaskConical, tone: 'amber' },
  payment: { icon: Wallet, tone: 'lime' },
  announcement: { icon: Megaphone, tone: 'rose' },
  system: { icon: Settings2, tone: 'default' },
}

const STORAGE_KEY = 'eduvista_notifications'

function loadNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return demoNotifications.map((n) => ({ ...n }))
}

function saveNotifications(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(loadNotifications)
  const panelRef = useRef(null)

  const unread = useMemo(() => items.filter((n) => !n.read).length, [items])

  useEffect(() => {
    if (!open) return undefined
    const onClick = (e) => {
      if (!panelRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const updateItems = (next) => {
    setItems(next)
    saveNotifications(next)
  }

  const markRead = (id) => {
    updateItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllRead = () => {
    updateItems(items.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative" ref={panelRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet px-1 text-[10px] font-bold text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,380px)] overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-bold text-ink">Notifications</p>
                <p className="text-xs text-ink-muted">
                  {unread ? `${unread} unread` : 'All caught up'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {unread > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllRead}>
                    <CheckCheck className="h-3.5 w-3.5" />
                    Read all
                  </Button>
                )}
                <button
                  type="button"
                  className="rounded-[10px] p-2 text-ink-muted hover:bg-ivory-soft hover:text-ink"
                  onClick={() => setOpen(false)}
                  aria-label="Close notifications"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <ul className="max-h-[360px] overflow-y-auto scrollbar-thin">
              {items.length === 0 && (
                <li className="px-4 py-10 text-center text-sm text-ink-muted">
                  No notifications yet
                </li>
              )}
              {items.map((item) => {
                const meta = typeConfig[item.type] || typeConfig.system
                const Icon = meta.icon
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => markRead(item.id)}
                      className={cn(
                        'flex w-full gap-3 px-4 py-3 text-left transition hover:bg-ivory-soft/80',
                        !item.read && 'bg-violet/5'
                      )}
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-ivory-soft text-ink-secondary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span className="text-sm font-semibold text-ink">{item.title}</span>
                          {!item.read && (
                            <Badge tone="violet" className="shrink-0 normal-case tracking-normal">
                              New
                            </Badge>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-secondary line-clamp-2">
                          {item.message}
                        </span>
                        <span className="mt-1 block text-[11px] font-semibold text-ink-muted">
                          {item.time}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-border p-3">
              <Link
                to="/app/notifications"
                onClick={() => setOpen(false)}
                className="flex h-10 items-center justify-center rounded-[14px] bg-charcoal text-sm font-semibold text-ivory transition hover:bg-charcoal-soft dark:bg-violet"
              >
                View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
