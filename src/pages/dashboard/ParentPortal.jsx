import { motion } from 'framer-motion'
import {
  Bell,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  Mail,
  Megaphone,
  MessageCircle,
  Sparkles,
  TrendingUp,
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
  fees,
  messages,
  students,
  teachers,
} from '../../data/demoData'
import { formatCurrency, formatDate, formatGPA, getGreeting } from '../../utils/format'

const CHILD_GRADES = [
  { subject: 'Mathematics', teacher: 'Dr. Amara Okonkwo', score: 94, grade: 'A' },
  { subject: 'Physics', teacher: 'Prof. Marcus Chen', score: 88, grade: 'B+' },
  { subject: 'Chemistry', teacher: 'Elena Vasquez', score: 91, grade: 'A-' },
  { subject: 'English Literature', teacher: 'James Whitfield', score: 96, grade: 'A' },
  { subject: 'Computer Science', teacher: 'Priya Nair', score: 93, grade: 'A' },
]

export default function ParentPortal() {
  const child = students.find((s) => s.id === 'STU-2400') || students[0]
  const fee = fees.find((f) => f.studentId === child.id) || {
    status: child.fees.status,
    due: child.fees.due,
    paid: child.fees.paid,
    amount: child.fees.total,
    dueDate: '2026-08-31',
  }

  const childAssignments = assignments
    .filter((a) => a.class === child.class)
    .slice(0, 5)

  const parentAnnouncements = announcements
    .filter((a) => a.audience === 'All' || a.audience === 'Parents')
    .slice(0, 4)

  const teacherMessages = [
    {
      id: 'tm-1',
      from: 'Dr. Amara Okonkwo',
      subject: 'Mathematics',
      preview: 'Aisha continues to excel in problem sets — wonderful focus this week.',
      time: 'Yesterday',
      avatar: teachers[0].avatar,
    },
    {
      id: 'tm-2',
      from: 'Prof. Marcus Chen',
      subject: 'Physics',
      preview: 'Lab report feedback shared. Aisha’s analysis section was especially strong.',
      time: '2 days ago',
      avatar: teachers[1].avatar,
    },
    {
      id: 'tm-3',
      from: messages[1]?.participants?.[1] || 'Campus Messaging',
      subject: 'General',
      preview: messages[1]?.preview || 'You have a new message from the school.',
      time: '3 days ago',
      avatar: messages[1]?.avatar,
    },
  ]

  const feeProgress = Math.round((fee.paid / (fee.amount || child.fees.total || 1)) * 100)
  const assignmentPct = Math.round(
    (child.assignments.completed / child.assignments.total) * 100
  )

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      <motion.div variants={staggerItem} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">Parent Portal</p>
          <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">
            {getGreeting()}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            A calm view of {child.name.split(' ')[0]}’s academic life at EDUVISTA.
          </p>
        </div>
        <Badge tone="violet" className="normal-case tracking-normal">
          Guardian access
        </Badge>
      </motion.div>

      {/* Child profile */}
      <motion.div variants={staggerItem}>
        <Card
          hover={false}
          className="relative overflow-hidden border-cyan/20 bg-gradient-to-br from-cyan/10 via-surface to-violet/10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar src={child.avatar} name={child.name} size="xl" />
              <div>
                <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-bold text-violet">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your child
                </div>
                <h2 className="text-2xl font-extrabold text-ink">{child.name}</h2>
                <p className="mt-0.5 text-sm text-ink-secondary">
                  {child.id} · Class {child.class} · {child.department}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone={child.status}>{child.status}</Badge>
                  <Badge tone="cyan">{child.attendance}% attendance</Badge>
                  <Badge tone="violet">GPA {formatGPA(child.gpa)}</Badge>
                </div>
              </div>
            </div>
            <div className="rounded-[22px] border border-border bg-surface/90 px-5 py-4 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Guardian
              </p>
              <p className="mt-1 text-sm font-bold text-ink">{child.guardian.name}</p>
              <p className="text-xs text-ink-secondary">
                {child.guardian.relation} · {child.guardian.phone}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Snapshot stats */}
      <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatWidget
          label="Attendance"
          value={child.attendance}
          suffix="%"
          trend={1}
          trendLabel="this month"
          icon={CalendarCheck}
          accent="cyan"
          spark={[75, 80, 82, 85, 88, 90, 93, 96]}
        />
        <StatWidget
          label="Current GPA"
          value={child.gpa}
          decimals={2}
          trend={2}
          trendLabel="vs last term"
          icon={TrendingUp}
          accent="violet"
          spark={[65, 70, 72, 78, 80, 85, 88, 92]}
        />
        <StatWidget
          label="Assignments"
          value={child.assignments.completed}
          suffix={`/${child.assignments.total}`}
          icon={ClipboardList}
          accent="lime"
          spark={[40, 50, 55, 60, 70, 75, 80, 85]}
        />
        <Card hover={false} className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber/15 to-transparent" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Fees
              </p>
              <CreditCard className="h-5 w-5 text-amber" />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-ink">
              {formatCurrency(fee.due)}
            </p>
            <p className="mt-1 text-xs text-ink-muted">Due {formatDate(fee.dueDate || '2026-08-31')}</p>
            <div className="mt-3">
              <Badge tone={fee.status}>{fee.status}</Badge>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Grades */}
        <motion.div variants={staggerItem} className="lg:col-span-7">
          <Card hover={false}>
            <CardHeader
              title="Recent Grades"
              subtitle={`How ${child.name.split(' ')[0]} is performing`}
              action={<Badge tone="lime">On track</Badge>}
            />
            <ul className="space-y-2.5">
              {CHILD_GRADES.map((g) => (
                <li
                  key={g.subject}
                  className="flex items-center justify-between gap-3 rounded-[16px] border border-border bg-ivory-soft/40 px-3 py-3"
                >
                  <div>
                    <p className="text-sm font-bold text-ink">{g.subject}</p>
                    <p className="text-xs text-ink-muted">{g.teacher}</p>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className="text-lg font-extrabold text-ink">{g.score}</p>
                      <p className="text-[11px] font-bold text-violet">{g.grade}</p>
                    </div>
                    <div className="hidden w-20 sm:block">
                      <Progress value={g.score} tone="violet" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Fees detail */}
        <motion.div variants={staggerItem} className="lg:col-span-5">
          <Card hover={false} className="h-full">
            <CardHeader
              title="Fee Status"
              subtitle="Tuition & campus charges"
              action={<Badge tone={fee.status}>{fee.status}</Badge>}
            />
            <div className="rounded-[18px] bg-charcoal p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">Balance due</p>
              <p className="mt-1 font-display text-4xl">{formatCurrency(fee.due)}</p>
              <p className="mt-2 text-sm text-white/55">
                Paid {formatCurrency(fee.paid)} of {formatCurrency(fee.amount || child.fees.total)}
              </p>
              <Progress value={feeProgress} tone="lime" className="mt-4 bg-white/10" />
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink-secondary">
                <span>Due date</span>
                <span className="font-semibold text-ink">{formatDate(fee.dueDate || '2026-08-31')}</span>
              </div>
              <div className="flex justify-between text-ink-secondary">
                <span>Category</span>
                <span className="font-semibold text-ink">{fee.category || 'Tuition'}</span>
              </div>
              <p className="pt-2 text-xs text-ink-muted">
                Online receipts are accepted. Contact Finance for payment plans.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Assignments */}
        <motion.div variants={staggerItem} className="lg:col-span-6">
          <Card hover={false}>
            <CardHeader
              title="Assignments"
              subtitle={`${assignmentPct}% completed in class ${child.class}`}
            />
            <Progress value={assignmentPct} tone="cyan" className="mb-4" />
            <ul className="space-y-2.5">
              {childAssignments.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start justify-between gap-3 rounded-[14px] border border-border px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{a.title}</p>
                    <p className="text-xs text-ink-muted">
                      {a.subject} · Due {formatDate(a.deadline)}
                    </p>
                  </div>
                  <Badge tone={a.status === 'completed' ? 'lime' : 'amber'}>{a.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Teacher messages */}
        <motion.div variants={staggerItem} className="lg:col-span-6">
          <Card hover={false}>
            <CardHeader
              title="Teacher Messages"
              subtitle="Notes from Aisha’s teachers"
              action={<MessageCircle className="h-4 w-4 text-violet" />}
            />
            <ul className="space-y-3">
              {teacherMessages.map((m) => (
                <li
                  key={m.id}
                  className="flex gap-3 rounded-[16px] border border-border bg-ivory-soft/50 p-3"
                >
                  <Avatar src={m.avatar} name={m.from} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-ink">{m.from}</p>
                      <span className="shrink-0 text-[11px] font-semibold text-ink-muted">{m.time}</span>
                    </div>
                    <p className="text-xs font-semibold text-violet">{m.subject}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-secondary">{m.preview}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 rounded-[14px] bg-violet/10 px-3 py-2.5 text-xs font-semibold text-violet">
              <Mail className="h-3.5 w-3.5" />
              Reply from Messaging in the parent menu.
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Announcements */}
      <motion.div variants={staggerItem}>
        <Card hover={false}>
          <CardHeader
            title="School Announcements"
            subtitle="Updates for families"
            action={
              <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan">
                <Bell className="h-3.5 w-3.5" />
                {parentAnnouncements.length} new
              </span>
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            {parentAnnouncements.map((a) => (
              <div
                key={a.id}
                className="rounded-[18px] border border-border bg-ivory-soft/50 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-cyan" />
                    <p className="text-sm font-bold text-ink">{a.title}</p>
                  </div>
                  <Badge
                    tone={
                      a.priority === 'high' || a.priority === 'urgent'
                        ? 'rose'
                        : a.priority === 'medium'
                          ? 'amber'
                          : 'default'
                    }
                  >
                    {a.priority}
                  </Badge>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">{a.content}</p>
                <p className="mt-3 text-[11px] font-semibold text-ink-muted">
                  {a.author} · {formatDate(a.date)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
