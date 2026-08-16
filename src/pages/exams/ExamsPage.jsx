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
  Clock3,
  FlaskConical,
  Save,
  Users,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Progress,
  Tabs,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { exams, students } from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatDate, formatGPA } from '../../utils/format'

const TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
]

function toGrade(marks) {
  if (marks >= 90) return { grade: 'A', gpa: 4.0 }
  if (marks >= 80) return { grade: 'B', gpa: 3.0 }
  if (marks >= 70) return { grade: 'C', gpa: 2.0 }
  if (marks >= 60) return { grade: 'D', gpa: 1.0 }
  return { grade: 'F', gpa: 0 }
}

function buildResults(exam) {
  const pool = students.filter((s) => exam.classes.includes(s.class)).slice(0, 12)
  const subject = exam.subjects[0] || 'General'
  return pool.map((s, i) => {
    const marks = exam.status === 'completed'
      ? Math.min(100, Math.max(48, (exam.avgScore || 78) + ((i * 9) % 24) - 10))
      : exam.status === 'active'
        ? i % 3 === 0
          ? Math.min(100, 70 + ((i * 5) % 25))
          : null
        : null
    const meta = marks != null ? toGrade(marks) : { grade: '—', gpa: null }
    return {
      studentId: s.id,
      name: s.name,
      subject,
      marks,
      grade: meta.grade,
      gpa: meta.gpa,
    }
  })
}

export default function ExamsPage() {
  const { toast } = useToast()
  const [tab, setTab] = useState('upcoming')
  const [selected, setSelected] = useState(null)
  const [results, setResults] = useState([])

  const filtered = useMemo(
    () => exams.filter((e) => e.status === tab),
    [tab]
  )

  const openExam = (exam) => {
    setSelected(exam)
    setResults(buildResults(exam))
  }

  const updateMarks = (studentId, value) => {
    const marks = value === '' ? null : Math.min(100, Math.max(0, Number(value)))
    setResults((prev) =>
      prev.map((row) => {
        if (row.studentId !== studentId) return row
        if (marks == null) return { ...row, marks: null, grade: '—', gpa: null }
        const meta = toGrade(marks)
        return { ...row, marks, grade: meta.grade, gpa: meta.gpa }
      })
    )
  }

  const saveResults = () => {
    toast(`Results saved for ${selected?.name}`, 'success')
  }

  const gradeChart = useMemo(() => {
    const buckets = { A: 0, B: 0, C: 0, D: 0, F: 0 }
    results.forEach((r) => {
      if (buckets[r.grade] != null) buckets[r.grade] += 1
    })
    return Object.entries(buckets).map(([name, value]) => ({ name, value }))
  }, [results])

  const gradeColors = {
    A: '#A3E635',
    B: '#2DD4BF',
    C: '#7C5CFC',
    D: '#FBBF24',
    F: '#FB7185',
  }

  const avgMarks = useMemo(() => {
    const scored = results.filter((r) => r.marks != null)
    if (!scored.length) return 0
    return Math.round(scored.reduce((sum, r) => sum + r.marks, 0) / scored.length)
  }, [results])

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet">Assessment</p>
        <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Exams</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Plan upcoming sittings, monitor active papers, and manage completed results.
        </p>
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} className="max-w-md" />

      {filtered.length === 0 ? (
        <EmptyState
          icon={FlaskConical}
          title={`No ${tab} exams`}
          description="Switch tabs to explore other exam stages."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((exam) => (
            <motion.div key={exam.id} variants={staggerItem}>
              <Card
                className="group relative cursor-pointer overflow-hidden"
                onClick={() => openExam(exam)}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet/10 transition group-hover:bg-violet/15" />
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge
                        tone={
                          exam.status === 'completed'
                            ? 'lime'
                            : exam.status === 'active'
                              ? 'cyan'
                              : 'violet'
                        }
                      >
                        {exam.type}
                      </Badge>
                      <h3 className="mt-3 font-display text-2xl leading-tight text-ink">
                        {exam.name}
                      </h3>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-charcoal text-ivory">
                      <FlaskConical className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-ink-secondary">
                    <p className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-violet" />
                      {formatDate(exam.date)} · {exam.duration} min
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-cyan" />
                      {exam.students} students
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exam.subjects.map((s) => (
                      <Badge key={s} tone="cyan">{s}</Badge>
                    ))}
                    {exam.classes.map((c) => (
                      <Badge key={c}>{c}</Badge>
                    ))}
                  </div>

                  {exam.avgScore != null && (
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-semibold">
                        <span className="text-ink-muted">Average score</span>
                        <span className="text-ink">{exam.avgScore}%</span>
                      </div>
                      <Progress value={exam.avgScore} tone="violet" />
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        subtitle={
          selected
            ? `${formatDate(selected.date)} · ${selected.duration} min · Result management`
            : ''
        }
        size="xl"
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[18px] bg-ivory-soft/80 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">Students listed</p>
                <p className="mt-1 text-2xl font-extrabold text-ink">{results.length}</p>
              </div>
              <div className="rounded-[18px] bg-ivory-soft/80 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">Graded</p>
                <p className="mt-1 text-2xl font-extrabold text-ink">
                  {results.filter((r) => r.marks != null).length}
                </p>
              </div>
              <div className="rounded-[18px] bg-ivory-soft/80 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">Avg marks</p>
                <p className="mt-1 text-2xl font-extrabold text-ink">{avgMarks || '—'}</p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
              <Table>
                <THead>
                  <TR>
                    <TH>Student</TH>
                    <TH>Subject</TH>
                    <TH>Marks</TH>
                    <TH>Grade</TH>
                    <TH>GPA</TH>
                  </TR>
                </THead>
                <TBody>
                  {results.map((row) => (
                    <TR key={row.studentId}>
                      <TD>
                        <div>
                          <p className="font-semibold text-ink">{row.name}</p>
                          <p className="text-xs text-ink-muted">{row.studentId}</p>
                        </div>
                      </TD>
                      <TD>{row.subject}</TD>
                      <TD>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={row.marks ?? ''}
                          onChange={(e) => updateMarks(row.studentId, e.target.value)}
                          className="h-10 w-24"
                          placeholder="—"
                        />
                      </TD>
                      <TD>
                        <Badge
                          tone={
                            row.grade === 'A'
                              ? 'lime'
                              : row.grade === 'F'
                                ? 'rose'
                                : row.grade === '—'
                                  ? 'default'
                                  : 'violet'
                          }
                        >
                          {row.grade}
                        </Badge>
                      </TD>
                      <TD>{row.gpa != null ? formatGPA(row.gpa) : '—'}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>

              <Card hover={false}>
                <h3 className="text-base font-bold text-ink">Grade visualization</h3>
                <p className="mt-0.5 text-sm text-ink-muted">Distribution of entered grades</p>
                <div className="mt-4 h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gradeChart} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
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
                        {gradeChart.map((entry) => (
                          <Cell key={entry.name} fill={gradeColors[entry.name]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
              <Button variant="violet" onClick={saveResults}>
                <Save className="h-4 w-4" />
                Save results
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}
