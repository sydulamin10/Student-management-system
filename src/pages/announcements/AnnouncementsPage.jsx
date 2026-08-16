import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  Filter,
  Megaphone,
  Plus,
  Users,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Select,
  Textarea,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'
import { announcements as demoAnnouncements } from '../../data/demoData'
import { staggerContainer, staggerItem } from '../../animations/variants'

const TYPES = ['General', 'Exam', 'Holiday', 'Emergency', 'Academic']
const PRIORITIES = ['low', 'medium', 'high', 'urgent']
const AUDIENCES = ['All', 'Students', 'Parents', 'Teachers']

const typeMeta = {
  General: { tone: 'default', icon: Megaphone },
  Exam: { tone: 'amber', icon: BookOpen },
  Holiday: { tone: 'cyan', icon: CalendarDays },
  Emergency: { tone: 'rose', icon: AlertTriangle },
  Academic: { tone: 'violet', icon: BookOpen },
  System: { tone: 'default', icon: Megaphone },
}

const priorityTone = {
  low: 'default',
  medium: 'cyan',
  high: 'amber',
  urgent: 'rose',
}

const emptyForm = () => ({
  type: 'General',
  title: '',
  content: '',
  audience: 'All',
  priority: 'medium',
})

export default function AnnouncementsPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [items, setItems] = useState(() => [...demoAnnouncements])
  const [typeFilter, setTypeFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = useMemo(() => {
    return items.filter((a) => {
      if (typeFilter && a.type !== typeFilter) return false
      if (priorityFilter && a.priority !== priorityFilter) return false
      return true
    })
  }, [items, typeFilter, priorityFilter])

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const publish = () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast('Title and content are required', 'error')
      return
    }
    const today = new Date().toISOString().slice(0, 10)
    const next = {
      id: `an-${Date.now()}`,
      title: form.title.trim(),
      content: form.content.trim(),
      type: form.type,
      audience: form.audience,
      priority: form.priority,
      author: user?.name || 'Admin Office',
      date: today,
    }
    setItems((prev) => [next, ...prev])
    setOpen(false)
    setForm(emptyForm())
    toast('Announcement published', 'success')
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
            Campus Broadcast
          </p>
          <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">Announcements</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Publish and manage notices for students, parents, and staff.
          </p>
        </div>
        <Button variant="violet" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          Publish
        </Button>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-wrap items-end gap-3">
        <div className="flex items-center gap-2 text-ink-muted">
          <Filter className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.08em]">Filter</span>
        </div>
        <Select
          label="Type"
          className="min-w-[160px]"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All types</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Select
          label="Priority"
          className="min-w-[160px]"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
        {(typeFilter || priorityFilter) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTypeFilter('')
              setPriorityFilter('')
            }}
          >
            Clear
          </Button>
        )}
      </motion.div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No announcements match"
          description="Try clearing filters or publish a new notice."
          actionLabel="Publish announcement"
          onAction={() => setOpen(true)}
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((item) => {
            const meta = typeMeta[item.type] || typeMeta.General
            const Icon = meta.icon
            return (
              <motion.div key={item.id} variants={staggerItem}>
                <Card className="flex h-full flex-col gap-4" hover>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-violet/10 text-violet">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <Badge tone={meta.tone}>{item.type}</Badge>
                      <Badge tone={priorityTone[item.priority] || 'default'}>
                        {item.priority}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-xl leading-snug text-ink">{item.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-secondary">
                      {item.content}
                    </p>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
                    <div>
                      <p className="font-semibold uppercase tracking-[0.08em] text-ink-muted">
                        Author
                      </p>
                      <p className="mt-1 font-semibold text-ink">{item.author}</p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase tracking-[0.08em] text-ink-muted">
                        Date
                      </p>
                      <p className="mt-1 font-semibold text-ink">{item.date}</p>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-cyan" />
                      <span className="font-semibold text-ink-secondary">
                        Audience · {item.audience}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Publish announcement"
        subtitle="Share a notice with the campus community"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Type"
              value={form.type}
              onChange={(e) => update('type', e.target.value)}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
            <Select
              label="Priority"
              value={form.priority}
              onChange={(e) => update('priority', e.target.value)}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <Input
            label="Title"
            placeholder="e.g. Midterm schedule update"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
          />
          <Textarea
            label="Content"
            placeholder="Write the full announcement…"
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
          />
          <Select
            label="Audience"
            value={form.audience}
            onChange={(e) => update('audience', e.target.value)}
          >
            {AUDIENCES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="violet" onClick={publish}>
              <Megaphone className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}
