import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  BookMarked,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Flame,
  Megaphone,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  Progress,
  StatWidget,
} from '../../components/ui'
import { staggerContainer, staggerItem } from '../../animations/variants'
import {
  announcements,
  assignments,
  exams,
  schedule,
  students,
} from '../../data/demoData'
import { formatDate, formatGPA, getGreeting } from '../../utils/format'

const GOALS = [
  { id: 'g1', label: 'Maintain 3.8+ GPA', value: 98, tone: 'violet' },
  { id: 'g2', label: '95% attendance streak', value: 96, tone: 'cyan' },
  { id: 'g3', label: 'Submit all assignments on time', value: 85, tone: 'lime' },
  { id: 'g4', label: 'Science Fair project milestone', value: 62, tone: 'amber' },
]

const RECENT_GRADES = [
  { subject: 'Mathematics', score: 94, grade: 'A', date: '2026-08-01' },
  { subject: 'Physics', score: 88, grade: 'B+', date: '2026-07-28' },
  { subject: 'Chemistry', score: 91, grade: 'A-', date: '2026-07-25' },
  { subject: 'English Literature', score: 96, grade: 'A', date: '2026-07-22' },
  { subject: 'Computer Science', score: 93, grade: 'A', date: '2026-07-18' },
]

export default function StudentPortal() {
  const student = students.find((s) => s.id === 'STU-2400') || students[0]

  const todayKey = useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // Demo day: Saturday Aug 8, 2026 — use Saturday schedule; fall back to Monday
    const key = days[new Date().getDay()]
    return schedule[key]?.length ? key : 'Monday'
  }, [])

  const todaySchedule = (schedule[todayKey] || schedule.Monday).filter(
    (slot) => slot.class === student.class || slot.class === 'Open'
  )

  const myAssignments = assignments
    .filter((a) => a.class === student.class)
    .slice(0, 5)

  const upcomingExams = exams
    .filter(
      (e) =>
        (e.status === 'upcoming' || e.status === 'active') &&
        e.classes.includes(student.class)
    )
    .slice(0, 4)

  const myAnnouncements = announcements
    .filter((a) => a.audience === 'All' || a.audience === 'Students')
    .slice(0, 4)

  const assignmentPct = Math.round(
    (student.assignments.completed / student.assignments.total) * 100
  )

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      {/* Welcome */}
      <motion.div variants={staggerItem}>
        <Card
          hover={false}
          className="relative overflow-hidden border-0 bg-charcoal p-0 text-white"
          padding={false}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,92,252,0.4),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(45,212,191,0.28),transparent_35%)]" />
          <div className="absolute inset-0 bg-noise opacity-40" />
          <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-center gap-4">
              <Avatar src={student.avatar} name={student.name} size="xl" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan">
                  Student Portal
                </p>
                <h1 className="mt-1 font-display text-3xl md:text-4xl">
                  {getGreeting()}, {student.name.split(' ')[0]}
                </h1>
                <p className="mt-1 text-sm text-white/60">
                  {student.id} · Class {student.class} · {student.department}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-[18px] bg-white/10 px-4 py-3">
                <p className="text-[10px] font-bold uppercase text-white/50">GPA</p>
                <p className="text-2xl font-extrabold text-lime">{formatGPA(student.gpa)}</p>
              </div>
              <div className="rounded-[18px] bg-white/10 px-4 py-3">
                <p className="text-[10px] font-bold uppercase text-white/50">Attendance</p>
                <p className="text-2xl font-extrabold">{student.attendance}%</p>
              </div>
              <div className="rounded-[18px] bg-white/10 px-4 py-3">
                <p className="text-[10px] font-bold uppercase text-white/50">Status</p>
                <p className="text-lg font-extrabold text-cyan">{student.status}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatWidget
          label="Your GPA"
          value={student.gpa}
          decimals={2}
          trend={3}
          trendLabel="this term"
          icon={Trophy}
          accent="violet"
          spark={[60, 65, 68, 72, 75, 80, 85, 90]}
        />
        <StatWidget
          label="Attendance"
          value={student.attendance}
          suffix="%"
          trend={2}
          trendLabel="vs last month"
          icon={Flame}
          accent="cyan"
          spark={[70, 75, 72, 80, 85, 88, 90, 96]}
        />
        <StatWidget
          label="Assignments Done"
          value={student.assignments.completed}
          suffix={`/${student.assignments.total}`}
          icon={ClipboardList}
          accent="lime"
          spark={[40, 50, 55, 60, 65, 70, 78, 85]}
        />
        <StatWidget
          label="Upcoming Exams"
          value={upcomingExams.length}
          icon={Calendar}
          accent="amber"
          spark={[30, 40, 35, 50, 45, 60, 55, 70]}
        />
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Today's schedule */}
        <motion.div variants={staggerItem} className="lg:col-span-5">
          <Card hover={false} className="h-full">
            <CardHeader
              title="Today's Schedule"
              subtitle={`${todayKey} · Class ${student.class}`}
              action={<Badge tone="cyan">{todaySchedule.length} periods</Badge>}
            />
            <div className="space-y-3">
              {todaySchedule.length === 0 && (
                <p className="text-sm text-ink-muted">No classes scheduled — enjoy the break!</p>
              )}
              {todaySchedule.map((slot, i) => (
                <motion.div
                  key={`${slot.time}-${slot.subject}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 rounded-[16px] border border-border bg-ivory-soft/50 p-3"
                >
                  <div
                    className="w-1 shrink-0 rounded-full"
                    style={{ background: slot.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-ink">{slot.subject}</p>
                      <p className="shrink-0 text-xs font-semibold text-ink-muted">{slot.time}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-secondary">
                      {slot.teacher} · Room {slot.room}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Assignments + Exams */}
        <motion.div variants={staggerItem} className="space-y-4 lg:col-span-7">
          <Card hover={false}>
            <CardHeader
              title="Assignments"
              subtitle={`${assignmentPct}% complete this term`}
              action={<Badge tone="violet">{student.assignments.completed} done</Badge>}
            />
            <Progress value={assignmentPct} tone="violet" className="mb-4" />
            <ul className="space-y-2.5">
              {myAssignments.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-3 rounded-[14px] border border-border px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{a.title}</p>
                    <p className="text-xs text-ink-muted">
                      {a.subject} · Due {formatDate(a.deadline)}
                    </p>
                  </div>
                  <Badge tone={a.status === 'completed' ? 'lime' : a.status === 'grading' ? 'amber' : 'cyan'}>
                    {a.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card hover={false}>
            <CardHeader
              title="Upcoming Exams"
              subtitle="Stay sharp — you’ve got this"
              action={<BookMarked className="h-4 w-4 text-violet" />}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {upcomingExams.map((e) => (
                <div
                  key={e.id}
                  className="rounded-[16px] border border-border bg-ivory-soft/60 p-4"
                >
                  <Badge tone={e.status === 'active' ? 'rose' : 'violet'}>{e.type}</Badge>
                  <p className="mt-2 text-sm font-bold text-ink">{e.name}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {formatDate(e.date)} · {e.duration} min
                  </p>
                </div>
              ))}
              {upcomingExams.length === 0 && (
                <p className="text-sm text-ink-muted sm:col-span-2">No exams on your calendar right now.</p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Motivational journey */}
      <motion.div variants={staggerItem}>
        <Card
          hover={false}
          className="relative overflow-hidden border-violet/20 bg-gradient-to-br from-violet/10 via-surface to-cyan/10"
        >
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet/15 px-3 py-1 text-xs font-bold text-violet">
                <Sparkles className="h-3.5 w-3.5" />
                Your academic journey
              </div>
              <h2 className="font-display text-2xl text-ink md:text-3xl">
                Small wins compound into excellence.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-ink-secondary">
                You’re on an Excellent track, {student.name.split(' ')[0]}. Keep the streak alive —
                your goals are within reach this semester.
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-charcoal text-lime">
              <Target className="h-6 w-6" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {GOALS.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="rounded-[18px] border border-border bg-surface/80 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-ink">{g.label}</p>
                  <span className="text-xs font-extrabold text-ink-muted">{g.value}%</span>
                </div>
                <Progress value={g.value} tone={g.tone} />
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Recent grades */}
        <motion.div variants={staggerItem} className="lg:col-span-7">
          <Card hover={false}>
            <CardHeader
              title="Recent Grades"
              subtitle="Latest assessed work"
              action={<Badge tone="lime">Strong</Badge>}
            />
            <ul className="divide-y divide-border">
              {RECENT_GRADES.map((g) => (
                <li key={g.subject} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-violet/10 text-violet">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{g.subject}</p>
                      <p className="text-xs text-ink-muted">{formatDate(g.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-ink">{g.score}</p>
                    <Badge tone="violet">{g.grade}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Announcements */}
        <motion.div variants={staggerItem} className="lg:col-span-5">
          <Card hover={false} className="h-full">
            <CardHeader
              title="Announcements"
              subtitle="What’s happening on campus"
              action={<Megaphone className="h-4 w-4 text-cyan" />}
            />
            <ul className="space-y-3">
              {myAnnouncements.map((a) => (
                <li
                  key={a.id}
                  className="rounded-[16px] border border-border bg-ivory-soft/50 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-ink">{a.title}</p>
                    <Badge
                      tone={
                        a.priority === 'urgent' || a.priority === 'high'
                          ? 'rose'
                          : a.priority === 'medium'
                            ? 'amber'
                            : 'default'
                      }
                    >
                      {a.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-secondary">{a.content}</p>
                  <p className="mt-2 text-[11px] font-semibold text-ink-muted">
                    {a.author} · {formatDate(a.date)}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
