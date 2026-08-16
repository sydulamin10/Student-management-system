import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  BookOpen,
  CheckCheck,
  ClipboardCheck,
  FlaskConical,
  Megaphone,
  Settings2,
  Wallet,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Select,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { notifications as demoNotifications } from '../../data/demoData'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { cn } from '../../utils/cn'

const TYPES = [
  { id: '', label: 'All types' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'assignment', label: 'Assignment' },
  { id: 'exam', label: 'Exam' },
  { id: 'payment', label: 'Payment' },
  { id: 'announcement', label: 'Announcement' },
  { id: 'system', label: 'System' },
]

const typeConfig = {
  attendance: { tone: 'cyan', icon: ClipboardCheck, label: 'Attendance' },
  assignment: { tone: 'violet', icon: BookOpen, label: 'Assignment' },
  exam: { tone: 'amber', icon: FlaskConical, label: 'Exam' },
  payment: { tone: 'lime', icon: Wallet, label: 'Payment' },
  announcement: { tone: 'rose', icon: Megaphone, label: 'Announcement' },
  system: { tone: 'default', icon: Settings2, label: 'System' },
}

const STORAGE_KEY = 'eduvista_notifications'

function loadStoredNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return demoNotifications.map((n) => ({ ...n }))
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const [items, setItems] = useState(loadStoredNotifications)
  const [typeFilter, setTypeFilter] = useState('')

  const filtered = useMemo(() => {
    if (!typeFilter) return items
    return items.filter((n) => n.type === typeFilter)
  }, [items, typeFilter])

  const unreadCount = items.filter((n) => !n.read).length

  const persist = (next) => {
    setItems(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const markRead = (id) => {
    persist(items.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllRead = () => {
    persist(items.map((n) => ({ ...n, read: true })))
    toast('All notifications marked as read', 'success')
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      <motion.div
        variants={staggerItem}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet">
            Activity stream
          </p>
          <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">Notifications</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Stay current on attendance, assignments, exams, and campus alerts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {unreadCount > 0 && (
            <Badge tone="violet" className="normal-case tracking-normal">
              {unreadCount} unread
            </Badge>
          )}
          <Button variant="secondary" size="sm" onClick={markAllRead} disabled={!unreadCount}>
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="max-w-xs">
        <Select
          label="Filter by type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {TYPES.map((t) => (
            <option key={t.id || 'all'} value={t.id}>
              {t.label}
            </option>
          ))}
        </Select>
      </motion.div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up for this filter."
        />
      ) : (
        <motion.div variants={staggerContainer} className="space-y-3">
          {filtered.map((n, index) => {
            const cfg = typeConfig[n.type] || typeConfig.system
            const Icon = cfg.icon
            return (
              <motion.div
                key={n.id}
                variants={staggerItem}
                custom={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 360,
                  damping: 28,
                }}
              >
                <Card
                  hover={!n.read}
                  className={cn(
                    'flex items-start gap-4',
                    !n.read && 'border-violet/25 bg-violet/[0.03]'
                  )}
                  onClick={() => !n.read && markRead(n.id)}
                >
                  <div
                    className={cn(
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px]',
                      n.type === 'attendance' && 'bg-cyan/15 text-cyan',
                      n.type === 'assignment' && 'bg-violet/10 text-violet',
                      n.type === 'exam' && 'bg-amber/20 text-amber-700 dark:text-amber',
                      n.type === 'payment' && 'bg-lime/20 text-charcoal dark:text-lime',
                      n.type === 'announcement' && 'bg-rose/15 text-rose',
                      n.type === 'system' && 'bg-ivory-muted text-ink-secondary'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-ink">{n.title}</h2>
                      <Badge tone={cfg.tone}>{cfg.label}</Badge>
                      {!n.read && (
                        <span className="h-2 w-2 rounded-full bg-violet" aria-label="Unread" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-ink-secondary">{n.message}</p>
                    <p className="mt-2 text-xs font-medium text-ink-muted">{n.time}</p>
                  </div>

                  {!n.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        markRead(n.id)
                        toast('Marked as read', 'success')
                      }}
                    >
                      Mark read
                    </Button>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </motion.div>
  )
}
