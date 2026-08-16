import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CalendarClock,
  FileText,
  Plus,
  Search,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Progress,
  Select,
  Textarea,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { assignments as demoAssignments, classes, subjects } from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatDate } from '../../utils/format'

const emptyForm = () => ({
  title: '',
  className: '10-A',
  subject: 'Mathematics',
  deadline: '2026-08-20',
  description: '',
})

function statusTone(status) {
  if (status === 'completed') return 'lime'
  if (status === 'grading') return 'amber'
  return 'violet'
}

export default function AssignmentsPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [list, setList] = useState(() => [...demoAssignments])
  const [query, setQuery] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return list.filter((a) => {
      if (classFilter && a.class !== classFilter) return false
      if (statusFilter && a.status !== statusFilter) return false
      if (q && !`${a.title} ${a.subject} ${a.class} ${a.teacher}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [list, query, classFilter, statusFilter])

  const openCreate = () => {
    setForm(emptyForm())
    setModalOpen(true)
  }

  const createAssignment = () => {
    if (!form.title.trim()) {
      toast('Please enter an assignment title', 'error')
      return
    }
    const total = classes.find((c) => c.name === form.className)?.students || 30
    const item = {
      id: `a-${list.length + 21}`,
      title: form.title.trim(),
      subject: form.subject,
      class: form.className,
      deadline: form.deadline,
      submitted: 0,
      pending: total,
      averageScore: 0,
      status: 'active',
      teacher: 'You',
      description: form.description.trim(),
    }
    setList((prev) => [item, ...prev])
    setModalOpen(false)
    toast('Assignment created', 'success')
  }

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet">Coursework</p>
          <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Assignments</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Track deadlines, submissions, and average scores across every class.
          </p>
        </div>
        <Button variant="violet" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Create assignment
        </Button>
      </div>

      <Card hover={false} className="grid gap-3 md:grid-cols-[1fr_160px_160px]">
        <Input
          icon={Search}
          placeholder="Search title, subject, or teacher…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="">All classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="grading">Grading</option>
          <option value="completed">Completed</option>
        </Select>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No assignments found"
          description="Try a different filter or create a new assignment."
          actionLabel="Create assignment"
          onAction={openCreate}
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((assignment) => {
            const total = assignment.submitted + assignment.pending
            const pct = total ? Math.round((assignment.submitted / total) * 100) : 0
            return (
              <motion.div key={assignment.id} variants={staggerItem}>
                <Card
                  className="group relative cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/app/assignments/${assignment.id}`)}
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/10 transition group-hover:bg-violet/15" />
                  <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-cyan/10" />
                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2">
                          <Badge tone={statusTone(assignment.status)}>{assignment.status}</Badge>
                          <Badge tone="cyan">{assignment.class}</Badge>
                        </div>
                        <h3 className="mt-3 font-display text-2xl leading-tight text-ink">
                          {assignment.title}
                        </h3>
                        <p className="mt-1 text-sm text-ink-muted">{assignment.subject}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-ink-secondary">
                      <CalendarClock className="h-4 w-4 text-violet" />
                      Due {formatDate(assignment.deadline)}
                    </div>

                    <div className="grid grid-cols-3 gap-3 rounded-[16px] bg-ivory-soft/80 p-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">Submitted</p>
                        <p className="mt-1 text-lg font-extrabold text-ink">{assignment.submitted}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">Pending</p>
                        <p className="mt-1 text-lg font-extrabold text-ink">{assignment.pending}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">Avg score</p>
                        <p className="mt-1 text-lg font-extrabold text-ink">
                          {assignment.averageScore || '—'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-semibold">
                        <span className="text-ink-muted">Submission progress</span>
                        <span className="text-ink">{pct}%</span>
                      </div>
                      <Progress value={pct} tone={pct >= 80 ? 'lime' : pct >= 50 ? 'cyan' : 'amber'} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create assignment"
        subtitle="Publish a new task for a class"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            placeholder="e.g. Quadratic Equations Problem Set"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Class"
              value={form.className}
              onChange={(e) => setForm((f) => ({ ...f, className: e.target.value }))}
            >
              {classes.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </Select>
            <Select
              label="Subject"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </Select>
          </div>
          <Input
            label="Deadline"
            type="date"
            value={form.deadline}
            onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
          />
          <Textarea
            label="Description"
            placeholder="Instructions, rubric notes, or resources…"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="violet" onClick={createAssignment}>Create</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}
