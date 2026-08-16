import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import { CampusPulse } from '../../components/dashboard/CampusPulse'
import { TodaysFlow } from '../../components/dashboard/TodaysFlow'
import { PerformanceChart } from '../../components/charts/PerformanceChart'
import { AttendanceHeatmap } from '../../components/charts/AttendanceHeatmap'
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  Progress,
  StatWidget,
  Tabs,
} from '../../components/ui'
import { staggerContainer, staggerItem } from '../../animations/variants'
import {
  attendanceHeatmap,
  campusActivity,
  campusStats,
  performanceSeries,
  students,
  todaysFlow,
} from '../../data/demoData'
import { formatCurrency, formatGPA, getGreeting } from '../../utils/format'

const RANGE_TABS = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'semester', label: 'Semester' },
  { id: 'year', label: 'Year' },
]

const activityTone = {
  attendance: 'cyan',
  assignment: 'violet',
  exam: 'amber',
  fee: 'lime',
  announcement: 'rose',
  grade: 'violet',
  message: 'cyan',
  ai: 'amber',
}

export default function AdminDashboard() {
  const [range, setRange] = useState('month')

  const chartData = useMemo(
    () =>
      (performanceSeries[range] || performanceSeries.month).map((row) => ({
        ...row,
        gpa: Number((row.gpa * 25).toFixed(1)),
      })),
    [range]
  )

  const topStudents = useMemo(
    () => [...students].sort((a, b) => b.gpa - a.gpa).slice(0, 6),
    []
  )

  const atRisk = students.filter((s) => s.status === 'At Risk')

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      <motion.div variants={staggerItem} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet">
            Academic Command Center
          </p>
          <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">
            {getGreeting()}, Campus Lead
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Live overview of enrollment, presence, academics, and risk across EDUVISTA.
          </p>
        </div>
        <Badge tone="lime" className="gap-1.5 normal-case tracking-normal">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          Systems healthy
        </Badge>
      </motion.div>

      {/* Pulse + Flow */}
      <motion.div variants={staggerItem} className="grid gap-4 md:grid-cols-12">
        <CampusPulse stats={campusStats} />
        <TodaysFlow items={todaysFlow} />
      </motion.div>

      {/* Stat widgets — varied structures */}
      <motion.div
        variants={staggerItem}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatWidget
          label="Total Students"
          value={campusStats.totalStudents}
          trend={4}
          trendLabel="vs last term"
          icon={GraduationCap}
          accent="violet"
          spark={[40, 48, 45, 60, 58, 72, 70, 80]}
        />
        <StatWidget
          label="Active Teachers"
          value={campusStats.activeTeachers}
          trend={2}
          trendLabel="staffed"
          icon={Users}
          accent="cyan"
          spark={[50, 55, 52, 60, 62, 70, 68, 75]}
        />
        <Card className="relative overflow-hidden sm:col-span-2 xl:col-span-1" padding={false}>
          <div className="absolute inset-0 bg-gradient-to-br from-lime/20 to-transparent" />
          <div className="relative flex h-full flex-col justify-between p-5">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Attendance Today
              </p>
              <ClipboardCheck className="h-5 w-5 text-charcoal dark:text-lime" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold text-ink">{campusStats.attendanceToday}%</p>
              <Progress value={campusStats.attendanceToday} tone="lime" className="mt-3" />
              <p className="mt-2 text-xs font-semibold text-ink-muted">Campus-wide presence</p>
            </div>
          </div>
        </Card>
        <StatWidget
          label="Average GPA"
          value={campusStats.averageGPA}
          decimals={2}
          trend={1}
          trendLabel="semester"
          icon={TrendingUp}
          accent="amber"
          spark={[55, 58, 60, 62, 65, 68, 70, 72]}
        />
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <Card className="border-rose/20 bg-gradient-to-br from-rose/10 to-surface" hover={false}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-rose/15 text-rose">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Pending Fees
              </p>
              <p className="text-2xl font-extrabold text-ink">
                {formatCurrency(campusStats.pendingFees)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink-muted">Outstanding balance across open accounts</p>
        </Card>

        <StatWidget
          label="Upcoming Exams"
          value={campusStats.upcomingExams}
          trend={0}
          trendLabel="this month"
          icon={CalendarDays}
          accent="violet"
          compact
        />

        <Card hover={false} className="flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Assignment Completion
              </p>
              <p className="mt-2 text-3xl font-extrabold text-ink">
                {campusStats.assignmentCompletion}%
              </p>
            </div>
            <BookOpen className="h-5 w-5 text-violet" />
          </div>
          <Progress value={campusStats.assignmentCompletion} tone="violet" className="mt-4" />
          <p className="mt-2 text-xs font-semibold text-ink-muted">Active assignments submitted</p>
        </Card>

        <Card className="relative overflow-hidden border-amber/25" hover={false}>
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber/15" />
          <div className="relative flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-amber/20 text-amber">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Students At Risk
              </p>
              <p className="mt-1 text-3xl font-extrabold text-ink">{campusStats.atRisk}</p>
              <p className="mt-1 text-xs text-ink-secondary">
                {atRisk.map((s) => s.name.split(' ')[0]).join(', ') || 'None flagged'}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Performance chart */}
      <motion.div variants={staggerItem}>
        <Card hover={false}>
          <CardHeader
            title="Campus Performance"
            subtitle="GPA (×25), attendance, assignments, and exams"
            action={
              <Tabs
                tabs={RANGE_TABS}
                active={range}
                onChange={setRange}
                className="max-w-full"
              />
            }
          />
          <PerformanceChart data={chartData} />
        </Card>
      </motion.div>

      <motion.div variants={staggerItem} className="grid gap-4 lg:grid-cols-12">
        {/* Top performers */}
        <Card hover={false} className="lg:col-span-5">
          <CardHeader
            title="Top Performing Students"
            subtitle="Highest GPA this term"
            action={<Badge tone="violet">Top 6</Badge>}
          />
          <ul className="space-y-3">
            {topStudents.map((s, i) => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center gap-3 rounded-[16px] border border-border bg-ivory-soft/50 px-3 py-2.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-charcoal text-[11px] font-bold text-ivory">
                  {i + 1}
                </span>
                <Avatar src={s.avatar} name={s.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{s.name}</p>
                  <p className="text-xs text-ink-muted">
                    {s.class} · {s.department}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-violet">{formatGPA(s.gpa)}</p>
                  <Badge tone={s.status}>{s.status}</Badge>
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>

        {/* Activity stream */}
        <Card hover={false} className="lg:col-span-7">
          <CardHeader
            title="Campus Activity"
            subtitle="Live operational stream"
            action={
              <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan">
                <Sparkles className="h-3.5 w-3.5" />
                Live
              </span>
            }
          />
          <ul className="space-y-1">
            {campusActivity.map((act, i) => (
              <motion.li
                key={act.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="flex items-start gap-3 rounded-[14px] px-2 py-3 transition hover:bg-ivory-soft/70"
              >
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    activityTone[act.type] === 'cyan'
                      ? 'bg-cyan'
                      : activityTone[act.type] === 'lime'
                        ? 'bg-lime'
                        : activityTone[act.type] === 'rose'
                          ? 'bg-rose'
                          : activityTone[act.type] === 'amber'
                            ? 'bg-amber'
                            : 'bg-violet'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{act.text}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {act.user} · {act.time}
                  </p>
                </div>
                <Badge tone={activityTone[act.type] || 'default'}>{act.type}</Badge>
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Attendance heatmap */}
      <motion.div variants={staggerItem}>
        <Card hover={false}>
          <CardHeader
            title="Attendance Heatmap"
            subtitle="Last 28 days — campus presence intensity"
            action={
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-ink-muted">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-rose/70" /> Low
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-violet/70" /> Mid
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-cyan" /> High
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-lime" /> Peak
                </span>
              </div>
            }
          />
          <AttendanceHeatmap data={attendanceHeatmap} />
          <p className="mt-4 text-xs text-ink-muted">
            Cell color reflects daily attendance rate across the last four weeks.
          </p>
        </Card>
      </motion.div>
    </motion.div>
  )
}
