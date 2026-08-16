import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  CheckCheck,
  ClipboardCheck,
  Save,
  Users,
} from 'lucide-react'
import { AttendanceHeatmap } from '../../components/charts/AttendanceHeatmap'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Progress,
  Select,
  StatWidget,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import {
  attendanceHeatmap,
  classes,
  students,
  subjects,
  teachers,
} from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { cn } from '../../utils/cn'
import { formatPercent } from '../../utils/format'

const STATUSES = [
  { id: 'present', label: 'Present', tone: 'present', active: 'bg-lime/25 text-charcoal ring-2 ring-lime/50 dark:text-lime' },
  { id: 'absent', label: 'Absent', tone: 'absent', active: 'bg-rose/20 text-rose ring-2 ring-rose/40' },
  { id: 'late', label: 'Late', tone: 'late', active: 'bg-amber/25 text-amber-800 ring-2 ring-amber/50 dark:text-amber' },
  { id: 'excused', label: 'Excused', tone: 'excused', active: 'bg-violet/15 text-violet ring-2 ring-violet/40' },
]

const STATUS_COLORS = {
  present: '#A3E635',
  absent: '#FB7185',
  late: '#FBBF24',
  excused: '#7C5CFC',
}

function seedStatus(index) {
  const roll = index % 11
  if (roll === 0) return 'absent'
  if (roll === 1) return 'late'
  if (roll === 2) return 'excused'
  return 'present'
}

export default function AttendancePage() {
  const { toast } = useToast()
  const [date, setDate] = useState('2026-08-08')
  const [className, setClassName] = useState('10-A')
  const [subjectId, setSubjectId] = useState(subjects[0].id)
  const [teacherId, setTeacherId] = useState(teachers[0].id)
  const [marks, setMarks] = useState(() => {
    const initial = {}
    students.forEach((s, i) => {
      initial[s.id] = seedStatus(i)
    })
    return initial
  })

  const classStudents = useMemo(
    () => students.filter((s) => s.class === className),
    [className]
  )

  const stats = useMemo(() => {
    const counts = { present: 0, absent: 0, late: 0, excused: 0 }
    classStudents.forEach((s) => {
      const st = marks[s.id] || 'present'
      counts[st] = (counts[st] || 0) + 1
    })
    const total = classStudents.length || 1
    return {
      ...counts,
      rate: Math.round((counts.present / total) * 100),
      chart: STATUSES.map((s) => ({
        name: s.label,
        value: counts[s.id],
        fill: STATUS_COLORS[s.id],
      })),
    }
  }, [classStudents, marks])

  const setStatus = (studentId, status) => {
    setMarks((prev) => ({ ...prev, [studentId]: status }))
  }

  const markAllPresent = () => {
    setMarks((prev) => {
      const next = { ...prev }
      classStudents.forEach((s) => {
        next[s.id] = 'present'
      })
      return next
    })
    toast('All students marked present', 'success')
  }

  const saveAttendance = () => {
    const subject = subjects.find((s) => s.id === subjectId)?.name || 'Subject'
    toast(`Attendance saved for ${className} · ${subject}`, 'success')
  }

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet">Daily roll</p>
          <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Attendance</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Mark presence with color-coded statuses, then review monthly patterns and class health.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={markAllPresent}>
            <CheckCheck className="h-4 w-4" />
            Mark all present
          </Button>
          <Button variant="violet" onClick={saveAttendance}>
            <Save className="h-4 w-4" />
            Save attendance
          </Button>
        </div>
      </div>

      <Card hover={false} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 w-full rounded-[14px] border border-border-strong bg-surface px-3.5 text-sm text-ink transition-all focus:border-violet focus:shadow-[var(--shadow-glow)]"
          />
        </label>
        <Select label="Class" value={className} onChange={(e) => setClassName(e.target.value)}>
          {classes.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </Select>
        <Select label="Subject" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>
        <Select label="Teacher" value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </Select>
      </Card>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <motion.div variants={staggerItem}>
          <StatWidget
            label="Present"
            value={stats.present}
            icon={Users}
            accent="lime"
            trend={4}
            trendLabel="vs yesterday"
            spark={[40, 55, 48, 70, 62, 80, 75]}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget label="Absent" value={stats.absent} accent="rose" trend={-2} trendLabel="vs yesterday" />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget label="Late" value={stats.late} accent="amber" trend={1} trendLabel="vs yesterday" />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget
            label="Attendance rate"
            value={stats.rate}
            suffix="%"
            icon={ClipboardCheck}
            accent="violet"
            spark={[72, 78, 74, 86, 82, 90, 88]}
          />
        </motion.div>
      </motion.div>

      <Card hover={false} padding={false} className="overflow-hidden">
        <div className="border-b border-border px-5 py-4 md:px-6">
          <CardHeader
            className="mb-0"
            title={`Class ${className}`}
            subtitle={`${classStudents.length} students · mark status for each row`}
            action={<Badge tone="violet">{formatPercent(stats.rate)} present</Badge>}
          />
        </div>
        <div className="divide-y divide-border">
          {classStudents.map((student, index) => {
            const status = marks[student.id] || 'present'
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar src={student.avatar} name={student.name} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{student.name}</p>
                    <p className="text-xs text-ink-muted">{student.id}</p>
                  </div>
                  <Badge tone={status} className="ml-1 hidden sm:inline-flex">{status}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStatus(student.id, s.id)}
                      className={cn(
                        'rounded-[12px] px-3 py-2 text-xs font-bold uppercase tracking-[0.04em] transition',
                        status === s.id
                          ? s.active
                          : 'bg-ivory-soft text-ink-muted hover:bg-ivory-muted hover:text-ink'
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card hover={false}>
          <CardHeader
            title="Attendance analytics"
            subtitle="Today’s status mix for the selected class"
          />
          <div className="mb-4 space-y-3">
            {STATUSES.map((s) => {
              const value = stats[s.id]
              const pct = classStudents.length ? Math.round((value / classStudents.length) * 100) : 0
              return (
                <div key={s.id}>
                  <div className="mb-1.5 flex justify-between text-xs font-semibold">
                    <span className="text-ink-muted">{s.label}</span>
                    <span className="text-ink">{value} · {pct}%</span>
                  </div>
                  <Progress
                    value={pct}
                    tone={s.id === 'present' ? 'lime' : s.id === 'absent' ? 'rose' : s.id === 'late' ? 'amber' : 'violet'}
                  />
                </div>
              )
            })}
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chart} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,31,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#8a8a96', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: '#8a8a96', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: '1px solid rgba(26,26,31,0.08)',
                    background: 'var(--color-surface)',
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {stats.chart.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card hover={false}>
          <CardHeader
            title="Monthly attendance heatmap"
            subtitle="Campus-wide presence intensity for the last 28 days"
          />
          <AttendanceHeatmap data={attendanceHeatmap} />
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-[4px] bg-lime" /> ≥95%</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-[4px] bg-cyan" /> ≥88%</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-[4px] bg-violet/70" /> ≥80%</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-[4px] bg-rose/70" /> Below 80%</span>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
