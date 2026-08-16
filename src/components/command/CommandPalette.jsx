import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Users,
  GraduationCap,
  School,
  FileText,
  FlaskConical,
  Megaphone,
} from 'lucide-react'
import { students, teachers, classes, assignments, exams, announcements } from '../../data/demoData'
import { cn } from '../../utils/cn'

const typeMeta = {
  student: { icon: Users, path: (id) => `/app/students/${id}` },
  teacher: { icon: GraduationCap, path: () => '/app/teachers' },
  class: { icon: School, path: (id) => `/app/classes/${id}` },
  assignment: { icon: FileText, path: (id) => `/app/assignments/${id}` },
  exam: { icon: FlaskConical, path: () => '/app/exams' },
  announcement: { icon: Megaphone, path: () => '/app/announcements' },
}

export function CommandPalette({ open, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const items = [
      ...students.map((s) => ({ id: s.id, label: s.name, meta: `${s.id} · ${s.class}`, type: 'student' })),
      ...teachers.map((t) => ({ id: t.id, label: t.name, meta: t.subject, type: 'teacher' })),
      ...classes.map((c) => ({ id: c.id, label: `Class ${c.name}`, meta: `${c.students} students`, type: 'class' })),
      ...assignments.map((a) => ({ id: a.id, label: a.title, meta: a.subject, type: 'assignment' })),
      ...exams.map((e) => ({ id: e.id, label: e.name, meta: e.date, type: 'exam' })),
      ...announcements.map((a) => ({ id: a.id, label: a.title, meta: a.type, type: 'announcement' })),
    ]
    if (!q) return items.slice(0, 8)
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.meta.toLowerCase().includes(q)).slice(0, 10)
  }, [query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[active]) {
        const item = results[active]
        navigate(typeMeta[item.type].path(item.id))
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, active, navigate, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
          <motion.button
            type="button"
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[24px] border border-border bg-surface shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-ink-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search students, teachers, classes..."
                className="h-10 w-full bg-transparent text-sm font-medium outline-none placeholder:text-ink-muted"
              />
              <kbd className="rounded-md bg-ivory-muted px-1.5 py-0.5 text-[10px] font-bold text-ink-muted">
                ESC
              </kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-ink-muted">No matches found</li>
              )}
              {results.map((item, index) => {
                const Icon = typeMeta[item.type].icon
                return (
                  <li key={`${item.type}-${item.id}`}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(index)}
                      onClick={() => {
                        navigate(typeMeta[item.type].path(item.id))
                        onClose()
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left',
                        active === index && 'bg-violet/10'
                      )}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-ivory-soft text-ink-secondary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">{item.label}</span>
                        <span className="block truncate text-xs text-ink-muted">{item.meta}</span>
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">
                        {item.type}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
