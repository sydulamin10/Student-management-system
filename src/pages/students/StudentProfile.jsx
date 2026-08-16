import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  MessageSquare,
  Pencil,
  Sparkles,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Progress,
  Tabs,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import {
  assignments,
  campusActivity,
  exams,
  fees,
  performanceSeries,
  students,
} from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatCurrency, formatDate, formatGPA, formatPercent } from '../../utils/format'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'academic', label: 'Academic' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'exams', label: 'Exams' },
  { id: 'fees', label: 'Fees' },
  { id: 'documents', label: 'Documents' },
  { id: 'activity', label: 'Activity' },
]

const JOURNEY = [
  { title: 'Admission', date: 'Aug 2023', detail: 'Enrolled at EDUVISTA', tone: 'violet' },
  { title: 'Semester 1', date: 'Fall 2023', detail: 'Foundation courses completed', tone: 'cyan' },
  { title: 'Semester 2', date: 'Spring 2024', detail: 'Strong subject momentum', tone: 'lime' },
  { title: 'Midterm', date: 'Jul 2026', detail: 'Assessment cycle active', tone: 'amber' },
  { title: 'Current', date: 'Aug 2026', detail: 'Live academic term', tone: 'violet' },
]

function buildCalendar(seed = 0) {
  const days = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2
    if (day < 1 || day > 31) return { day: null, status: 'empty' }
    const roll = (day + seed) % 7
    let status = 'present'
    if (roll === 0) status = 'absent'
    else if (roll === 3) status = 'late'
    else if (roll === 5) status = 'excused'
    return { day, status }
  })
  return days
}

function PerformanceOrbit({ student }) {
  const nodes = [
    { label: 'Attendance', value: `${student.attendance}%`, angle: -40, color: '#2DD4BF' },
    { label: 'GPA', value: formatGPA(student.gpa), angle: 40, color: '#7C5CFC' },
    { label: 'Assignments', value: `${Math.round((student.assignments.completed / student.assignments.total) * 100)}%`, angle: 140, color: '#A3E635' },
    { label: 'Exams', value: student.status === 'Excellent' ? 'A' : student.status === 'At Risk' ? 'C' : 'B', angle: 220, color: '#FB7185' },
  ]

  return (
    <div className="relative mx-auto h-64 w-64 md:h-72 md:w-72">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full border border-dashed border-white/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-10 rounded-full border border-white/10"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Avatar src={student.avatar} name={student.name} size="2xl" className="ring-4 ring-white/20" />
      </div>
      {nodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180
        const r = 108
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r
        return (
          <motion.div
            key={node.label}
            className="absolute left-1/2 top-1/2"
            initial={{ opacity: 0, scale: 0.8, x: x - 40, y: y - 24 }}
            animate={{ opacity: 1, scale: 1, x: x - 40, y: y - 24 }}
            transition={{ delay: 0.15 * i, type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div
              className="rounded-[14px] border border-white/15 bg-charcoal/80 px-3 py-2 text-center shadow-[var(--shadow-lift)] backdrop-blur"
              style={{ boxShadow: `0 0 0 1px ${node.color}33` }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/55">{node.label}</p>
              <p className="text-sm font-extrabold" style={{ color: node.color }}>{node.value}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function StudentProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [tab, setTab] = useState('overview')

  const student = useMemo(() => students.find((s) => s.id === id), [id])
  const calendar = useMemo(() => buildCalendar(student ? Number(student.id.replace(/\D/g, '')) % 9 : 0), [student])
  const studentAssignments = useMemo(
    () => assignments.filter((a) => a.class === student?.class).slice(0, 6),
    [student]
  )
  const studentExams = useMemo(
    () => exams.filter((e) => e.classes?.includes(student?.class)).slice(0, 6),
    [student]
  )
  const studentFee = useMemo(() => fees.find((f) => f.studentId === student?.id), [student])
  const activity = useMemo(
    () => campusActivity.filter((a) => a.text.includes(student?.name?.split(' ')[0] || '—') || a.type !== 'ai').slice(0, 8),
    [student]
  )

  const chartData = useMemo(
    () =>
      performanceSeries.month.map((row, i) => ({
        label: row.label,
        score: Math.min(100, Math.round(student ? student.gpa * 22 + i * 2 : 70)),
        attendance: Math.min(100, (student?.attendance || 80) - 4 + i * 2),
      })),
    [student]
  )

  if (!student) {
    return (
      <motion.div {...pageTransition}>
        <EmptyState
          title="Student not found"
          description="This profile ID is not in the demo roster."
          actionLabel="Back to Students"
          onAction={() => navigate('/app/students')}
        />
      </motion.div>
    )
  }

  const assignPct = Math.round((student.assignments.completed / student.assignments.total) * 100)
  const academicScore = Math.round(student.gpa * 25)

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/app/students')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Back to students
      </button>

      <Card
        hover={false}
        padding={false}
        className="relative overflow-hidden border-0 bg-charcoal text-white shadow-[var(--shadow-lift)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,92,252,0.45),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(45,212,191,0.28),transparent_38%),radial-gradient(circle_at_70%_90%,rgba(163,230,53,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="relative grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <Avatar src={student.avatar} name={student.name} size="2xl" />
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge tone={student.status}>{student.status}</Badge>
                  <Badge tone="cyan">{student.class}</Badge>
                </div>
                <h1 className="font-display text-4xl leading-tight md:text-5xl">{student.name}</h1>
                <p className="mt-2 font-mono text-sm text-white/55">{student.id}</p>
                <p className="mt-1 text-sm text-white/70">
                  {student.department} · Enrolled {formatDate(student.enrollmentDate)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                className="bg-white text-charcoal hover:bg-ivory"
                onClick={() => toast('Edit profile opens in settings', 'info')}
              >
                <Pencil className="h-4 w-4" /> Edit Profile
              </Button>
              <Button
                variant="ghost"
                className="border border-white/20 text-white hover:bg-white/10"
                onClick={() => toast(`Message draft started for ${student.name}`, 'info')}
              >
                <MessageSquare className="h-4 w-4" /> Message
              </Button>
              <Button
                variant="ghost"
                className="border border-white/20 text-white hover:bg-white/10"
                onClick={() => toast('Report download started')}
              >
                <Download className="h-4 w-4" /> Download Report
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <PerformanceOrbit student={student} />
          </div>
        </div>
      </Card>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-4">
          {[
            { label: 'Academic Score', value: academicScore, suffix: '/100', tone: 'violet', pct: academicScore },
            { label: 'Attendance', value: student.attendance, suffix: '%', tone: 'cyan', pct: student.attendance },
            { label: 'Assignment Completion', value: assignPct, suffix: '%', tone: 'lime', pct: assignPct },
            { label: 'GPA', value: formatGPA(student.gpa), suffix: '', tone: 'amber', pct: student.gpa * 25 },
          ].map((m) => (
            <motion.div key={m.label} variants={staggerItem}>
              <Card hover={false}>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{m.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-ink">
                  {m.value}
                  <span className="ml-1 text-base font-semibold text-ink-muted">{m.suffix}</span>
                </p>
                <Progress value={m.pct} tone={m.tone} className="mt-4" />
              </Card>
            </motion.div>
          ))}

          <Card hover={false} className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet" />
              <h3 className="font-bold text-ink">Academic Journey</h3>
            </div>
            <div className="relative space-y-0 pl-2">
              <div className="absolute bottom-2 left-[19px] top-2 w-px bg-border-strong" />
              {JOURNEY.map((item, i) => (
                <div key={item.title} className="relative flex gap-4 pb-5 last:pb-0">
                  <div className={`relative z-10 mt-1 h-3.5 w-3.5 rounded-full ring-4 ring-surface ${
                    i === JOURNEY.length - 1 ? 'bg-violet' : 'bg-cyan'
                  }`} />
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="text-xs text-ink-muted">{item.date} · {item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false} className="lg:col-span-2">
            <h3 className="mb-1 font-bold text-ink">Performance Trend</h3>
            <p className="mb-4 text-sm text-ink-muted">Monthly academic score and attendance</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C5CFC" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#7C5CFC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area type="monotone" dataKey="score" name="Score" stroke="#7C5CFC" fill="url(#scoreFill)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="attendance" name="Attendance" stroke="#2DD4BF" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card hover={false} className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-cyan" />
              <h3 className="font-bold text-ink">Attendance · August</h3>
            </div>
            <div className="mb-3 grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-ink-muted">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {calendar.map((cell, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-[10px] text-xs font-semibold ${
                    !cell.day
                      ? 'bg-transparent'
                      : cell.status === 'present'
                        ? 'bg-lime/25 text-ink'
                        : cell.status === 'absent'
                          ? 'bg-rose/20 text-rose'
                          : cell.status === 'late'
                            ? 'bg-amber/25 text-amber-800'
                            : 'bg-violet/15 text-violet'
                  }`}
                >
                  {cell.day || ''}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-semibold text-ink-muted">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-lime" /> Present</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose" /> Absent</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber" /> Late</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet" /> Excused</span>
            </div>
          </Card>

          <Card hover={false} className="lg:col-span-2">
            <h3 className="mb-4 font-bold text-ink">Recent Activity</h3>
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="flex gap-3 border-b border-border pb-3 last:border-0">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet" />
                  <div>
                    <p className="text-sm font-medium text-ink">{item.text}</p>
                    <p className="text-xs text-ink-muted">{item.time} · {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {tab === 'academic' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card hover={false}>
            <h3 className="mb-4 font-bold text-ink">Subject Snapshot</h3>
            {[
              { name: 'Core Major', score: academicScore },
              { name: 'Supporting Courses', score: Math.max(60, academicScore - 8) },
              { name: 'Labs / Practicals', score: Math.min(98, academicScore + 4) },
              { name: 'Electives', score: Math.max(55, academicScore - 12) },
            ].map((row) => (
              <div key={row.name} className="mb-4 last:mb-0">
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-semibold text-ink">{row.name}</span>
                  <span className="text-ink-muted">{row.score}%</span>
                </div>
                <Progress value={row.score} tone={row.score >= 85 ? 'lime' : row.score >= 70 ? 'violet' : 'amber'} />
              </div>
            ))}
          </Card>
          <Card hover={false}>
            <h3 className="mb-4 font-bold text-ink">Journey Timeline</h3>
            {JOURNEY.map((item) => (
              <div key={item.title} className="mb-4 flex items-start justify-between gap-3 rounded-[16px] bg-ivory-soft px-4 py-3 last:mb-0">
                <div>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="text-xs text-ink-muted">{item.detail}</p>
                </div>
                <Badge tone={item.tone}>{item.date}</Badge>
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === 'attendance' && (
        <Card hover={false}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="font-bold text-ink">Attendance Detail</h3>
              <p className="text-sm text-ink-muted">Month grid with presence status</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{formatPercent(student.attendance)}</p>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendar.map((cell, i) => (
              <div
                key={i}
                className={`flex h-14 flex-col items-center justify-center rounded-[14px] text-xs font-semibold ${
                  !cell.day
                    ? 'bg-transparent'
                    : cell.status === 'present'
                      ? 'bg-lime/20'
                      : cell.status === 'absent'
                        ? 'bg-rose/15 text-rose'
                        : cell.status === 'late'
                          ? 'bg-amber/20'
                          : 'bg-violet/10 text-violet'
                }`}
              >
                {cell.day && (
                  <>
                    <span>{cell.day}</span>
                    <span className="mt-0.5 text-[10px] capitalize text-ink-muted">{cell.status}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'assignments' && (
        <div className="grid gap-3">
          {studentAssignments.map((a) => (
            <Card key={a.id} hover={false} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-ink">{a.title}</p>
                <p className="text-sm text-ink-muted">{a.subject} · Due {formatDate(a.deadline)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={a.status === 'completed' ? 'lime' : a.status === 'grading' ? 'amber' : 'violet'}>
                  {a.status}
                </Badge>
                <span className="text-sm font-semibold text-ink-muted">
                  {a.submitted}/{a.submitted + a.pending}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'exams' && (
        <div className="grid gap-3 md:grid-cols-2">
          {studentExams.map((e) => (
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
              {e.avgScore != null && (
                <p className="mt-3 text-sm font-semibold text-ink">Avg score {e.avgScore}%</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === 'fees' && (
        <Card hover={false}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-ink">Fee Account</h3>
              <p className="text-sm text-ink-muted">Tuition and campus charges</p>
            </div>
            <Badge tone={student.fees.status}>{student.fees.status}</Badge>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[18px] bg-ivory-soft p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Total</p>
              <p className="mt-1 text-2xl font-extrabold text-ink">{formatCurrency(student.fees.total)}</p>
            </div>
            <div className="rounded-[18px] bg-lime/15 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Paid</p>
              <p className="mt-1 text-2xl font-extrabold text-ink">{formatCurrency(student.fees.paid)}</p>
            </div>
            <div className="rounded-[18px] bg-rose/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Due</p>
              <p className="mt-1 text-2xl font-extrabold text-ink">{formatCurrency(student.fees.due)}</p>
            </div>
          </div>
          {studentFee && (
            <p className="mt-4 text-sm text-ink-muted">
              Category {studentFee.category} · Due by {formatDate(studentFee.dueDate)}
              {studentFee.lastPayment ? ` · Last payment ${formatDate(studentFee.lastPayment)}` : ''}
            </p>
          )}
        </Card>
      )}

      {tab === 'documents' && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Enrollment Form',
            'ID Verification',
            'Guardian Consent',
            'Medical Record',
            'Previous Transcript',
            'Photo ID',
          ].map((doc) => (
            <Card key={doc} hover className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-violet/10 text-violet">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-ink">{doc}</p>
                <p className="text-xs text-ink-muted">PDF · Verified</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => toast(`${doc} downloaded`)}>
                <Download className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}

      {tab === 'activity' && (
        <Card hover={false}>
          <h3 className="mb-5 font-bold text-ink">Activity Timeline</h3>
          <div className="relative space-y-0 pl-1">
            <div className="absolute bottom-3 left-[11px] top-3 w-px bg-border-strong" />
            {activity.map((item) => (
              <div key={item.id} className="relative flex gap-4 pb-5 last:pb-0">
                <div className="relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan ring-4 ring-surface" />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.text}</p>
                  <p className="text-xs text-ink-muted">{item.time} · {item.user}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            View class context in{' '}
            <Link to="/app/classes" className="font-semibold text-violet hover:underline">
              Classes
            </Link>
          </p>
        </Card>
      )}
    </motion.div>
  )
}
