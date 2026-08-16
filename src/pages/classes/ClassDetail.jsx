import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FlaskConical,
  MapPin,
  Users,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Avatar,
  Badge,
  Card,
  EmptyState,
  Progress,
  Tabs,
} from '../../components/ui'
import {
  assignments,
  classes,
  exams,
  performanceSeries,
  schedule,
  students,
  subjects,
  teachers,
} from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatDate, formatGPA, formatPercent } from '../../utils/format'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'students', label: 'Students' },
  { id: 'subjects', label: 'Subjects' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'exams', label: 'Exams' },
  { id: 'performance', label: 'Performance' },
]

export default function ClassDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')

  const classItem = useMemo(() => classes.find((c) => c.id === id), [id])

  const classStudents = useMemo(
    () => (classItem ? students.filter((s) => s.class === classItem.name) : []),
    [classItem]
  )

  const classAssignments = useMemo(
    () => (classItem ? assignments.filter((a) => a.class === classItem.name) : []),
    [classItem]
  )

  const classExams = useMemo(
    () => (classItem ? exams.filter((e) => e.classes?.includes(classItem.name)) : []),
    [classItem]
  )

  const classSchedule = useMemo(() => {
    if (!classItem) return []
    return Object.entries(schedule).flatMap(([day, slots]) =>
      slots
        .filter((slot) => slot.class === classItem.name)
        .map((slot) => ({ ...slot, day }))
    )
  }, [classItem])

  const classTeachers = useMemo(() => {
    if (!classItem) return []
    return teachers.filter((t) => t.classes.includes(classItem.name))
  }, [classItem])

  const classSubjects = useMemo(() => {
    if (!classItem) return []
    const names = new Set(classSchedule.map((s) => s.subject))
    const fromTeachers = classTeachers.map((t) => t.subject)
    fromTeachers.forEach((n) => names.add(n))
    const list = [...names]
    return list.map((name, i) => {
      const meta = subjects.find((s) => s.name === name)
      return {
        id: meta?.id || `sub-local-${i}`,
        name,
        code: meta?.code || name.slice(0, 3).toUpperCase(),
        color: meta?.color || '#7C5CFC',
        department: meta?.department || 'General',
        teacher: classTeachers.find((t) => t.subject === name)?.name || classItem.teacher,
      }
    })
  }, [classItem, classSchedule, classTeachers])

  const avgAttendance = useMemo(() => {
    if (!classStudents.length) return classItem?.attendance || 0
    return Math.round(classStudents.reduce((sum, s) => sum + s.attendance, 0) / classStudents.length)
  }, [classStudents, classItem])

  const performanceBars = useMemo(
    () =>
      performanceSeries.week.map((row) => ({
        label: row.label,
        gpa: Math.round(row.gpa * 25 * (classItem ? classItem.gpa / 3.5 : 1)),
        attendance: Math.min(100, Math.round(row.attendance * ((classItem?.attendance || 90) / 91))),
      })),
    [classItem]
  )

  if (!classItem) {
    return (
      <motion.div {...pageTransition}>
        <EmptyState
          title="Class not found"
          description="This class ID is not in the campus catalog."
          actionLabel="Back to Classes"
          onAction={() => navigate('/app/classes')}
        />
      </motion.div>
    )
  }

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/app/classes')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Back to classes
      </button>

      <Card
        hover={false}
        padding={false}
        className="relative overflow-hidden border-0 bg-charcoal text-white shadow-[var(--shadow-lift)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(124,92,252,0.5),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(45,212,191,0.3),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(163,230,53,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan">
                <MapPin className="h-3.5 w-3.5" /> Room {classItem.room}
              </div>
              <h1 className="font-display text-5xl leading-none md:text-6xl">
                Class {classItem.name}
              </h1>
              <p className="mt-3 max-w-lg text-sm text-white/65">
                Homeroom led by {classItem.teacher}. Grade {classItem.grade} academic section with live
                attendance and performance tracking.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Students', value: classStudents.length || classItem.students, icon: Users },
                { label: 'Subjects', value: classSubjects.length || classItem.subjects, icon: BookOpen },
                { label: 'Attendance', value: formatPercent(classItem.attendance), icon: ClipboardCheck },
                { label: 'GPA', value: formatGPA(classItem.gpa), icon: FlaskConical },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                  <stat.icon className="mb-2 h-4 w-4 text-violet-soft" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">{stat.label}</p>
                  <p className="mt-0.5 text-xl font-extrabold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <Card hover={false}>
              <h3 className="mb-1 font-bold text-ink">Classroom Pulse</h3>
              <p className="mb-5 text-sm text-ink-muted">Weekly attendance and GPA momentum</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceBars}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,31,0.06)" vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: '#8a8a96', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#8a8a96', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 16,
                        border: '1px solid rgba(26,26,31,0.08)',
                        background: 'var(--color-surface)',
                      }}
                    />
                    <Bar dataKey="attendance" name="Attendance" fill="#2DD4BF" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="gpa" name="GPA ×25" fill="#7C5CFC" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Card hover={false} className="h-full">
              <h3 className="mb-4 font-bold text-ink">Faculty</h3>
              <div className="space-y-3">
                {classTeachers.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 rounded-[16px] bg-ivory-soft px-3 py-2.5">
                    <Avatar src={t.avatar} name={t.name} size="md" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-ink-muted">{t.subject}</p>
                    </div>
                  </div>
                ))}
                {classTeachers.length === 0 && (
                  <p className="text-sm text-ink-muted">Homeroom: {classItem.teacher}</p>
                )}
              </div>
              <div className="mt-6 space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs font-semibold">
                    <span className="text-ink-muted">Section attendance</span>
                    <span>{formatPercent(avgAttendance)}</span>
                  </div>
                  <Progress value={avgAttendance} tone="cyan" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs font-semibold">
                    <span className="text-ink-muted">Average GPA</span>
                    <span>{formatGPA(classItem.gpa)}</span>
                  </div>
                  <Progress value={classItem.gpa * 25} tone="violet" />
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {tab === 'students' && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {classStudents.map((s) => (
            <Card
              key={s.id}
              className="cursor-pointer"
              onClick={() => navigate(`/app/students/${s.id}`)}
            >
              <div className="flex items-center gap-3">
                <Avatar src={s.avatar} name={s.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{s.name}</p>
                  <p className="text-xs text-ink-muted">{s.id}</p>
                </div>
                <Badge tone={s.status}>{s.status}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-ink-muted">Attendance</p>
                  <p className="font-bold text-ink">{formatPercent(s.attendance)}</p>
                </div>
                <div>
                  <p className="text-ink-muted">GPA</p>
                  <p className="font-bold text-ink">{formatGPA(s.gpa)}</p>
                </div>
              </div>
            </Card>
          ))}
          {classStudents.length === 0 && (
            <EmptyState title="No students listed" description="Demo roster has no students for this section yet." />
          )}
        </div>
      )}

      {tab === 'subjects' && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {classSubjects.map((sub) => (
            <Card key={sub.id} hover={false}>
              <div
                className="mb-3 h-1.5 w-16 rounded-full"
                style={{ background: sub.color }}
              />
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">{sub.code}</p>
              <h3 className="mt-1 font-bold text-ink">{sub.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{sub.department}</p>
              <p className="mt-3 text-sm font-semibold text-ink">{sub.teacher}</p>
            </Card>
          ))}
        </div>
      )}

      {tab === 'schedule' && (
        <Card hover={false}>
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-violet" />
            <h3 className="font-bold text-ink">Weekly Schedule</h3>
          </div>
          {classSchedule.length === 0 ? (
            <p className="text-sm text-ink-muted">No periods mapped for this class in the demo timetable.</p>
          ) : (
            <div className="space-y-2">
              {classSchedule.map((slot, i) => (
                <div
                  key={`${slot.day}-${slot.time}-${i}`}
                  className="flex items-center gap-3 rounded-[16px] border border-border px-4 py-3"
                >
                  <div className="h-10 w-1.5 rounded-full" style={{ background: slot.color }} />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">{slot.subject}</p>
                    <p className="text-xs text-ink-muted">
                      {slot.day} · {slot.time} · {slot.teacher} · Room {slot.room}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {tab === 'attendance' && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card hover={false} className="lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Section rate</p>
            <p className="mt-2 text-5xl font-extrabold text-ink">{formatPercent(avgAttendance)}</p>
            <Progress value={avgAttendance} tone="cyan" className="mt-5 h-3" />
            <p className="mt-3 text-sm text-ink-muted">
              Aggregated from {classStudents.length || classItem.students} student records.
            </p>
          </Card>
          <Card hover={false} className="lg:col-span-2">
            <h3 className="mb-4 font-bold text-ink">Student Attendance</h3>
            <div className="space-y-3">
              {classStudents.slice(0, 10).map((s) => (
                <div key={s.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <Link to={`/app/students/${s.id}`} className="font-semibold text-ink hover:text-violet">
                      {s.name}
                    </Link>
                    <span className="text-ink-muted">{formatPercent(s.attendance)}</span>
                  </div>
                  <Progress
                    value={s.attendance}
                    tone={s.attendance >= 90 ? 'lime' : s.attendance >= 75 ? 'cyan' : 'rose'}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'assignments' && (
        <div className="space-y-3">
          {classAssignments.length === 0 ? (
            <EmptyState title="No assignments" description="Nothing assigned to this class yet." />
          ) : (
            classAssignments.map((a) => (
              <Card key={a.id} hover={false} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-ink">{a.title}</p>
                  <p className="text-sm text-ink-muted">
                    {a.subject} · Due {formatDate(a.deadline)} · {a.teacher}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-ink-muted">
                    {a.submitted}/{a.submitted + a.pending}
                  </span>
                  <Badge tone={a.status === 'completed' ? 'lime' : a.status === 'grading' ? 'amber' : 'violet'}>
                    {a.status}
                  </Badge>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {tab === 'exams' && (
        <div className="grid gap-3 md:grid-cols-2">
          {classExams.length === 0 ? (
            <EmptyState title="No exams" description="No exams scheduled for this class." />
          ) : (
            classExams.map((e) => (
              <Card key={e.id} hover={false}>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-bold text-ink">{e.name}</h3>
                  <Badge tone={e.status === 'completed' ? 'lime' : e.status === 'active' ? 'cyan' : 'violet'}>
                    {e.status}
                  </Badge>
                </div>
                <p className="text-sm text-ink-muted">
                  {formatDate(e.date)} · {e.duration} min · {e.type}
                </p>
                <p className="mt-2 text-xs text-ink-muted">{e.subjects.join(', ')}</p>
                {e.avgScore != null && (
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span className="text-ink-muted">Average score</span>
                      <span>{e.avgScore}%</span>
                    </div>
                    <Progress value={e.avgScore} tone="violet" />
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      )}

      {tab === 'performance' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card hover={false}>
            <h3 className="mb-4 font-bold text-ink">Status Distribution</h3>
            {['Excellent', 'Good', 'Needs Attention', 'At Risk'].map((status) => {
              const count = classStudents.filter((s) => s.status === status).length
              const pct = classStudents.length ? Math.round((count / classStudents.length) * 100) : 0
              const tone =
                status === 'Excellent' ? 'lime' : status === 'Good' ? 'cyan' : status === 'Needs Attention' ? 'amber' : 'rose'
              return (
                <div key={status} className="mb-4 last:mb-0">
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-semibold text-ink">{status}</span>
                    <span className="text-ink-muted">{count} · {pct}%</span>
                  </div>
                  <Progress value={pct} tone={tone} />
                </div>
              )
            })}
          </Card>
          <Card hover={false}>
            <h3 className="mb-4 font-bold text-ink">Top Performers</h3>
            <div className="space-y-3">
              {[...classStudents]
                .sort((a, b) => b.gpa - a.gpa)
                .slice(0, 6)
                .map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet/10 text-xs font-bold text-violet">
                      {i + 1}
                    </span>
                    <Avatar src={s.avatar} name={s.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{s.name}</p>
                      <p className="text-xs text-ink-muted">{formatPercent(s.attendance)} attendance</p>
                    </div>
                    <span className="font-bold text-ink">{formatGPA(s.gpa)}</span>
                  </div>
                ))}
              {classStudents.length === 0 && (
                <p className="text-sm text-ink-muted">No student performance data available.</p>
              )}
            </div>
          </Card>
        </div>
      )}
    </motion.div>
  )
}
