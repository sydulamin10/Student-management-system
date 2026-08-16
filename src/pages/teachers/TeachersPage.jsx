import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Search,
  Star,
  Users,
} from 'lucide-react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Progress,
  Select,
  Tabs,
} from '../../components/ui'
import {
  assignments,
  departments,
  schedule,
  students,
  teachers,
} from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatPercent } from '../../utils/format'

const DETAIL_TABS = [
  { id: 'classes', label: 'Classes' },
  { id: 'students', label: 'Students' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'performance', label: 'Performance' },
]

export default function TeachersPage() {
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('')
  const [view, setView] = useState('grid')
  const [selected, setSelected] = useState(null)
  const [detailTab, setDetailTab] = useState('classes')
  const [expanded, setExpanded] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return teachers.filter((t) => {
      if (department && t.department !== department) return false
      if (q && !`${t.name} ${t.subject} ${t.email}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, department])

  const openTeacher = (teacher) => {
    setSelected(teacher)
    setDetailTab('classes')
  }

  const teacherStudents = useMemo(() => {
    if (!selected) return []
    return students.filter((s) => selected.classes.includes(s.class)).slice(0, 12)
  }, [selected])

  const teacherAssignments = useMemo(() => {
    if (!selected) return []
    return assignments.filter((a) => a.teacher === selected.name)
  }, [selected])

  const teacherSchedule = useMemo(() => {
    if (!selected) return []
    return Object.entries(schedule).flatMap(([day, slots]) =>
      slots
        .filter((slot) => slot.teacher === selected.name)
        .map((slot) => ({ ...slot, day }))
    )
  }, [selected])

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet">Faculty</p>
          <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Teachers</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Explore faculty across departments with class load, attendance, and performance.
          </p>
        </div>
        <div className="flex rounded-[14px] border border-border bg-ivory-soft p-1">
          {['grid', 'list'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              className={`rounded-[10px] px-3.5 py-2 text-sm font-semibold capitalize transition ${
                view === mode ? 'bg-surface text-ink shadow-[var(--shadow-soft)]' : 'text-ink-muted'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <Card hover={false} className="grid gap-3 md:grid-cols-[1fr_220px]">
        <Input
          icon={Search}
          placeholder="Search teachers, subjects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </Select>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No teachers found"
          description="Adjust search or department filters."
        />
      ) : view === 'grid' ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((t) => (
            <motion.div key={t.id} variants={staggerItem}>
              <Card
                className="cursor-pointer"
                onClick={() => openTeacher(t)}
              >
                <div className="flex items-start gap-3">
                  <Avatar src={t.avatar} name={t.name} size="lg" online />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-ink">{t.name}</h3>
                    <p className="text-sm text-ink-muted">{t.subject}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge tone="violet">{t.department}</Badge>
                      <Badge tone="cyan">{t.classes.length} classes</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Attendance</p>
                    <p className="mt-1 text-lg font-extrabold text-ink">{formatPercent(t.attendance)}</p>
                    <Progress value={t.attendance} tone="cyan" className="mt-2" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Performance</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-lg font-extrabold text-ink">
                      <Star className="h-4 w-4 text-amber" /> {t.performance}
                    </p>
                    <Progress value={(t.performance / 5) * 100} tone="violet" className="mt-2" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => {
            const isOpen = expanded === t.id
            return (
              <Card key={t.id} hover={false} padding={false} className="overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center gap-4 p-5 text-left"
                  onClick={() => setExpanded(isOpen ? null : t.id)}
                >
                  <Avatar src={t.avatar} name={t.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-ink">{t.name}</p>
                      <Badge tone="violet">{t.department}</Badge>
                    </div>
                    <p className="text-sm text-ink-muted">
                      {t.subject} · {t.classes.join(', ')} · {formatPercent(t.attendance)} attendance · {t.performance}★
                    </p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-ink-muted transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="grid gap-4 p-5 sm:grid-cols-3">
                        <div className="rounded-[16px] bg-ivory-soft p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Classes</p>
                          <p className="mt-1 font-semibold text-ink">{t.classes.join(' · ')}</p>
                        </div>
                        <div className="rounded-[16px] bg-ivory-soft p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Experience</p>
                          <p className="mt-1 font-semibold text-ink">{t.experience} years</p>
                        </div>
                        <div className="flex items-end">
                          <Button size="sm" variant="violet" onClick={() => openTeacher(t)}>
                            Open full detail
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        subtitle={`${selected?.subject} · ${selected?.department}`}
        size="xl"
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar src={selected.avatar} name={selected.name} size="xl" online />
              <div className="flex-1">
                <p className="text-sm text-ink-muted">{selected.email}</p>
                <p className="text-sm text-ink-muted">{selected.phone}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge tone="cyan">{formatPercent(selected.attendance)} attendance</Badge>
                  <Badge tone="violet">{selected.performance} performance</Badge>
                  <Badge tone="lime">{selected.experience} yrs</Badge>
                </div>
              </div>
            </div>

            <Tabs tabs={DETAIL_TABS} active={detailTab} onChange={setDetailTab} />

            {detailTab === 'classes' && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {selected.classes.map((c) => (
                  <div key={c} className="rounded-[18px] border border-border bg-ivory-soft/70 p-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-[12px] bg-violet/10 text-violet">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <p className="font-bold text-ink">Class {c}</p>
                    <p className="text-sm text-ink-muted">
                      {students.filter((s) => s.class === c).length} students in roster
                    </p>
                  </div>
                ))}
              </div>
            )}

            {detailTab === 'students' && (
              <div className="grid gap-3 sm:grid-cols-2">
                {teacherStudents.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 rounded-[16px] border border-border px-3 py-2.5">
                    <Avatar src={s.avatar} name={s.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{s.name}</p>
                      <p className="text-xs text-ink-muted">{s.class} · GPA {s.gpa}</p>
                    </div>
                    <Badge tone={s.status}>{s.status}</Badge>
                  </div>
                ))}
                {teacherStudents.length === 0 && (
                  <p className="text-sm text-ink-muted">No linked students in demo data.</p>
                )}
              </div>
            )}

            {detailTab === 'schedule' && (
              <div className="space-y-2">
                {teacherSchedule.length === 0 ? (
                  <p className="text-sm text-ink-muted">No scheduled periods this week.</p>
                ) : (
                  teacherSchedule.map((slot, i) => (
                    <div
                      key={`${slot.day}-${slot.time}-${i}`}
                      className="flex items-center gap-3 rounded-[16px] border border-border px-4 py-3"
                    >
                      <div
                        className="h-10 w-1.5 rounded-full"
                        style={{ background: slot.color }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-ink">{slot.subject}</p>
                        <p className="text-xs text-ink-muted">
                          {slot.day} · {slot.time} · Room {slot.room} · {slot.class}
                        </p>
                      </div>
                      <CalendarDays className="h-4 w-4 text-ink-muted" />
                    </div>
                  ))
                )}
              </div>
            )}

            {detailTab === 'attendance' && (
              <Card hover={false} className="bg-ivory-soft/50">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Faculty presence</p>
                    <p className="mt-1 text-4xl font-extrabold text-ink">{formatPercent(selected.attendance)}</p>
                  </div>
                  <Users className="h-8 w-8 text-cyan" />
                </div>
                <Progress value={selected.attendance} tone="cyan" className="mt-5 h-3" />
                <p className="mt-3 text-sm text-ink-muted">
                  Consistent on-campus presence across assigned periods this term.
                </p>
              </Card>
            )}

            {detailTab === 'assignments' && (
              <div className="space-y-3">
                {teacherAssignments.length === 0 ? (
                  <p className="text-sm text-ink-muted">No active assignments authored.</p>
                ) : (
                  teacherAssignments.map((a) => (
                    <div key={a.id} className="rounded-[16px] border border-border px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-ink">{a.title}</p>
                          <p className="text-xs text-ink-muted">
                            {a.class} · {a.submitted} submitted · {a.pending} pending
                          </p>
                        </div>
                        <Badge tone={a.status === 'completed' ? 'lime' : 'violet'}>{a.status}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {detailTab === 'performance' && (
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Rating', value: `${selected.performance}/5`, pct: (selected.performance / 5) * 100, tone: 'violet' },
                  { label: 'Attendance', value: formatPercent(selected.attendance), pct: selected.attendance, tone: 'cyan' },
                  { label: 'Class load', value: `${selected.classes.length}`, pct: Math.min(100, selected.classes.length * 25), tone: 'lime' },
                ].map((m) => (
                  <div key={m.label} className="rounded-[18px] border border-border p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">{m.label}</p>
                    <p className="mt-2 text-2xl font-extrabold text-ink">{m.value}</p>
                    <Progress value={m.pct} tone={m.tone} className="mt-3" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  )
}
