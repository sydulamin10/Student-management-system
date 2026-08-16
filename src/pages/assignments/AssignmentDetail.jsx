import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CalendarClock,
  File,
  FileText,
  Paperclip,
  Save,
  Users,
} from 'lucide-react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  Input,
  Progress,
  StatWidget,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { assignments, students } from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatDate } from '../../utils/format'

const ATTACHMENTS = [
  { id: 1, name: 'Assignment brief.pdf', size: '240 KB' },
  { id: 2, name: 'Rubric.xlsx', size: '88 KB' },
  { id: 3, name: 'Reference worksheet.pdf', size: '512 KB' },
]

function letterGrade(score) {
  if (score == null || score === '') return '—'
  const n = Number(score)
  if (n >= 90) return 'A'
  if (n >= 80) return 'B'
  if (n >= 70) return 'C'
  if (n >= 60) return 'D'
  return 'F'
}

function buildSubmissions(assignment) {
  const classStudents = students.filter((s) => s.class === assignment.class)
  return classStudents.map((s, i) => {
    const submitted = i < assignment.submitted
    const base = assignment.averageScore || 78
    const score = submitted ? Math.min(100, Math.max(45, base + ((i * 7) % 21) - 8)) : null
    return {
      studentId: s.id,
      name: s.name,
      avatar: s.avatar,
      submittedAt: submitted ? `2026-08-${String(5 + (i % 4)).padStart(2, '0')} 14:${String(10 + i).padStart(2, '0')}` : null,
      status: submitted ? (score != null && i % 5 === 0 ? 'Needs review' : 'Submitted') : 'Pending',
      score,
      feedback: '',
    }
  })
}

export default function AssignmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const assignment = useMemo(() => assignments.find((a) => a.id === id), [id])

  const [rows, setRows] = useState([])

  useEffect(() => {
    if (assignment) setRows(buildSubmissions(assignment))
    else setRows([])
  }, [assignment])

  const stats = useMemo(() => {
    const submitted = rows.filter((r) => r.submittedAt).length
    const pending = rows.length - submitted
    const graded = rows.filter((r) => r.score != null && r.score !== '')
    const avg = graded.length
      ? Math.round(graded.reduce((sum, r) => sum + Number(r.score), 0) / graded.length)
      : assignment?.averageScore || 0
    return { submitted, pending, avg, total: rows.length }
  }, [rows, assignment])

  if (!assignment) {
    return (
      <motion.div {...pageTransition}>
        <EmptyState
          icon={FileText}
          title="Assignment not found"
          description="This assignment may have been removed or the link is incorrect."
          actionLabel="Back to assignments"
          onAction={() => navigate('/app/assignments')}
        />
      </motion.div>
    )
  }

  const completion = stats.total ? Math.round((stats.submitted / stats.total) * 100) : 0

  const updateScore = (studentId, value) => {
    const next = value === '' ? '' : Math.min(100, Math.max(0, Number(value)))
    setRows((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, score: next } : r))
    )
  }

  const saveGrades = () => {
    toast('Grades saved successfully', 'success')
  }

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            to="/app/assignments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition hover:text-violet"
          >
            <ArrowLeft className="h-4 w-4" />
            Assignments
          </Link>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="violet">{assignment.status}</Badge>
            <Badge tone="cyan">{assignment.class}</Badge>
            <Badge>{assignment.subject}</Badge>
          </div>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{assignment.title}</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
            <CalendarClock className="h-4 w-4 text-violet" />
            Due {formatDate(assignment.deadline)} · {assignment.teacher}
          </p>
        </div>
        <Button variant="violet" onClick={saveGrades}>
          <Save className="h-4 w-4" />
          Save grades
        </Button>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <motion.div variants={staggerItem}>
          <StatWidget label="Submitted" value={stats.submitted} icon={Users} accent="cyan" />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget label="Pending" value={stats.pending} accent="amber" />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget label="Average score" value={stats.avg} accent="violet" />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget label="Completion" value={completion} suffix="%" accent="lime" />
        </motion.div>
      </motion.div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card hover={false}>
          <CardHeader title="Description" subtitle="Instructions for students" />
          <p className="text-sm leading-relaxed text-ink-secondary">
            {assignment.description ||
              `Complete the ${assignment.subject} assignment for class ${assignment.class}. Show all working clearly, cite sources where relevant, and submit before the deadline. Late submissions may receive a reduced score unless excused.`}
          </p>
          <div className="mt-5">
            <div className="mb-1.5 flex justify-between text-xs font-semibold">
              <span className="text-ink-muted">Class submissions</span>
              <span className="text-ink">{completion}%</span>
            </div>
            <Progress value={completion} tone={completion >= 80 ? 'lime' : 'cyan'} />
          </div>
        </Card>

        <Card hover={false}>
          <CardHeader title="Attachments" subtitle="Shared resources" />
          <div className="space-y-2">
            {ATTACHMENTS.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-[16px] border border-border bg-ivory-soft/60 px-3.5 py-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-violet/10 text-violet">
                  {file.name.endsWith('.xlsx') ? <File className="h-4 w-4" /> : <Paperclip className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
                  <p className="text-xs text-ink-muted">{file.size}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card hover={false} padding={false}>
        <div className="border-b border-border px-5 py-4 md:px-6">
          <CardHeader
            className="mb-0"
            title="Student submissions"
            subtitle="Enter scores to grade submitted work"
          />
        </div>
        <Table className="border-0 shadow-none">
          <THead>
            <TR>
              <TH>Student</TH>
              <TH>Status</TH>
              <TH>Submitted</TH>
              <TH>Score</TH>
              <TH>Grade</TH>
            </TR>
          </THead>
          <TBody>
            {rows.map((row) => (
              <TR key={row.studentId}>
                <TD>
                  <div className="flex items-center gap-3">
                    <Avatar src={row.avatar} name={row.name} size="sm" />
                    <div>
                      <p className="font-semibold text-ink">{row.name}</p>
                      <p className="text-xs text-ink-muted">{row.studentId}</p>
                    </div>
                  </div>
                </TD>
                <TD>
                  <Badge
                    tone={
                      row.status === 'Pending'
                        ? 'pending'
                        : row.status === 'Needs review'
                          ? 'amber'
                          : 'success'
                    }
                  >
                    {row.status}
                  </Badge>
                </TD>
                <TD>{row.submittedAt || '—'}</TD>
                <TD>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    disabled={!row.submittedAt}
                    value={row.score ?? ''}
                    onChange={(e) => updateScore(row.studentId, e.target.value)}
                    className="h-10 w-24"
                    placeholder="—"
                  />
                </TD>
                <TD>
                  <span className="font-bold text-ink">{letterGrade(row.score)}</span>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </motion.div>
  )
}
