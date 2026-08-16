import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Download,
  Eye,
  FileUp,
  Filter,
  Plus,
  Search,
  Upload,
  UserPlus,
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
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { departments, students as demoStudents } from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatCurrency, formatGPA } from '../../utils/format'

const STEPS = ['Personal', 'Contact', 'Guardian', 'Academic', 'Documents', 'Review']
const CLASS_OPTIONS = ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B']
const STATUS_OPTIONS = ['Excellent', 'Good', 'Needs Attention', 'At Risk']
const ATTENDANCE_OPTIONS = [
  { value: '', label: 'All attendance' },
  { value: 'high', label: '90% and above' },
  { value: 'mid', label: '75% – 89%' },
  { value: 'low', label: 'Below 75%' },
]

const emptyForm = () => ({
  name: '',
  gender: 'F',
  dob: '',
  email: '',
  phone: '',
  address: '',
  guardianName: '',
  guardianRelation: 'Father',
  guardianPhone: '',
  guardianEmail: '',
  className: '10-A',
  department: 'Science',
  documents: { idCard: false, transcript: false, photo: false },
})

function statusFromMetrics(gpa, attendance) {
  if (gpa >= 3.7 && attendance >= 92) return 'Excellent'
  if (gpa < 2.5 || attendance < 70) return 'At Risk'
  if (gpa < 3.1 || attendance < 80) return 'Needs Attention'
  return 'Good'
}

export default function StudentsPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [list, setList] = useState(() => [...demoStudents])
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    className: '',
    department: '',
    gender: '',
    attendance: '',
    status: '',
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(emptyForm)
  const [direction, setDirection] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return list.filter((s) => {
      if (q && !`${s.name} ${s.id} ${s.email}`.toLowerCase().includes(q)) return false
      if (filters.className && s.class !== filters.className) return false
      if (filters.department && s.department !== filters.department) return false
      if (filters.gender && s.gender !== filters.gender) return false
      if (filters.status && s.status !== filters.status) return false
      if (filters.attendance === 'high' && s.attendance < 90) return false
      if (filters.attendance === 'mid' && (s.attendance < 75 || s.attendance >= 90)) return false
      if (filters.attendance === 'low' && s.attendance >= 75) return false
      return true
    })
  }, [list, query, filters])

  const openAdd = () => {
    setForm(emptyForm())
    setStep(0)
    setDirection(1)
    setModalOpen(true)
  }

  const closeAdd = () => {
    setModalOpen(false)
    setStep(0)
  }

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const canNext = () => {
    if (step === 0) return form.name.trim().length > 1 && form.dob
    if (step === 1) return form.email.includes('@') && form.phone.trim()
    if (step === 2) return form.guardianName.trim() && form.guardianPhone.trim()
    if (step === 3) return form.className && form.department
    return true
  }

  const goNext = () => {
    if (!canNext()) {
      toast('Please complete the required fields', 'error')
      return
    }
    setDirection(1)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const submitStudent = () => {
    const gpa = 3.0
    const attendance = 90
    const id = `STU-${2500 + list.length}`
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(form.name.replace(/\s/g, ''))}&backgroundColor=b6e3f4,c0aede,d1d4f9`
    const student = {
      id,
      name: form.name.trim(),
      gender: form.gender,
      class: form.className,
      department: form.department,
      gpa,
      attendance,
      status: statusFromMetrics(gpa, attendance),
      email: form.email.trim(),
      phone: form.phone.trim(),
      avatar,
      dob: form.dob,
      address: form.address.trim() || 'Campus Residence',
      guardian: {
        name: form.guardianName.trim(),
        relation: form.guardianRelation,
        phone: form.guardianPhone.trim(),
        email: form.guardianEmail.trim() || `parent.${form.name.split(' ')[0]?.toLowerCase() || 'student'}@mail.com`,
      },
      assignments: { completed: 0, total: 20 },
      fees: { status: 'Pending', due: 1200, paid: 0, total: 1200 },
      enrollmentDate: new Date().toISOString().slice(0, 10),
      trend: 'stable',
    }
    setList((prev) => [student, ...prev])
    toast(`${student.name} enrolled successfully`)
    closeAdd()
  }

  const handleExport = () => toast(`Exported ${filtered.length} student records`, 'info')
  const handleImport = () => toast('Import started — drop a CSV to continue', 'info')

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet">Roster</p>
          <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Students</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Search, filter, and manage the full campus roster with live academic health signals.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleImport}>
            <Upload className="h-4 w-4" /> Import
          </Button>
          <Button variant="secondary" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="violet" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Student
          </Button>
        </div>
      </div>

      <Card hover={false} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <div className="md:col-span-2">
            <Input
              icon={Search}
              placeholder="Search name, ID, or email…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select
            value={filters.className}
            onChange={(e) => setFilters((f) => ({ ...f, className: e.target.value }))}
          >
            <option value="">All classes</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Select
            value={filters.department}
            onChange={(e) => setFilters((f) => ({ ...f, department: e.target.value }))}
          >
            <option value="">All departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Select>
          <Select
            value={filters.gender}
            onChange={(e) => setFilters((f) => ({ ...f, gender: e.target.value }))}
          >
            <option value="">All genders</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
          </Select>
          <Select
            value={filters.attendance}
            onChange={(e) => setFilters((f) => ({ ...f, attendance: e.target.value }))}
          >
            {ATTENDANCE_OPTIONS.map((o) => (
              <option key={o.value || 'all'} value={o.value}>{o.label}</option>
            ))}
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            className="max-w-[220px]"
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="">All performance</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
          <div className="inline-flex items-center gap-2 rounded-[14px] bg-ivory-soft px-3 py-2 text-xs font-semibold text-ink-muted">
            <Filter className="h-3.5 w-3.5 text-violet" />
            {filtered.length} of {list.length} students
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={UserPlus}
          title="No students match"
          description="Try clearing filters or add a new student to the roster."
          actionLabel="Add Student"
          onAction={openAdd}
        />
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <Table>
            <THead>
              <TR>
                <TH>Student</TH>
                <TH>ID</TH>
                <TH>Class</TH>
                <TH>Attendance</TH>
                <TH>GPA</TH>
                <TH>Assignments</TH>
                <TH>Fees</TH>
                <TH>Status</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {filtered.map((s) => {
                const assignPct = Math.round((s.assignments.completed / s.assignments.total) * 100)
                return (
                  <motion.tr
                    key={s.id}
                    variants={staggerItem}
                    onClick={() => navigate(`/app/students/${s.id}`)}
                    className="cursor-pointer transition-colors hover:bg-ivory-soft/70"
                  >
                    <TD>
                      <div className="flex items-center gap-3">
                        <Avatar src={s.avatar} name={s.name} size="md" />
                        <div>
                          <p className="font-semibold text-ink">{s.name}</p>
                          <p className="text-xs text-ink-muted">{s.department}</p>
                        </div>
                      </div>
                    </TD>
                    <TD className="font-mono text-xs text-ink">{s.id}</TD>
                    <TD>
                      <Badge tone="violet">{s.class}</Badge>
                    </TD>
                    <TD>
                      <div className="min-w-[110px] space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{s.attendance}%</span>
                        </div>
                        <Progress
                          value={s.attendance}
                          tone={s.attendance >= 90 ? 'lime' : s.attendance >= 75 ? 'cyan' : 'rose'}
                        />
                      </div>
                    </TD>
                    <TD className="font-semibold text-ink">{formatGPA(s.gpa)}</TD>
                    <TD>
                      <span className="text-ink">
                        {s.assignments.completed}/{s.assignments.total}
                      </span>
                      <span className="ml-1 text-xs text-ink-muted">({assignPct}%)</span>
                    </TD>
                    <TD>
                      <div className="space-y-1">
                        <Badge tone={s.fees.status}>{s.fees.status}</Badge>
                        {s.fees.due > 0 && (
                          <p className="text-[11px] text-ink-muted">{formatCurrency(s.fees.due)} due</p>
                        )}
                      </div>
                    </TD>
                    <TD>
                      <Badge tone={s.status}>{s.status}</Badge>
                    </TD>
                    <TD>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/app/students/${s.id}`)
                        }}
                      >
                        <Eye className="h-4 w-4" /> View
                      </Button>
                    </TD>
                  </motion.tr>
                )
              })}
            </TBody>
          </Table>
        </motion.div>
      )}

      <Modal
        open={modalOpen}
        onClose={closeAdd}
        title="Add Student"
        subtitle={`Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`}
        size="lg"
      >
        <div className="mb-6 flex gap-1.5 overflow-x-auto pb-1">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`flex min-w-[96px] flex-1 flex-col gap-1.5 rounded-[14px] px-2 py-2 text-center ${
                i === step ? 'bg-violet/10' : i < step ? 'bg-cyan/10' : 'bg-ivory-soft'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider ${i <= step ? 'text-violet' : 'text-ink-muted'}`}>
                {i + 1}
              </span>
              <span className={`text-[11px] font-semibold ${i === step ? 'text-ink' : 'text-ink-muted'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="relative min-h-[280px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {step === 0 && (
                <>
                  <Input label="Full name" value={form.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="Aisha Rahman" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select label="Gender" value={form.gender} onChange={(e) => updateForm('gender', e.target.value)}>
                      <option value="F">Female</option>
                      <option value="M">Male</option>
                    </Select>
                    <Input label="Date of birth" type="date" value={form.dob} onChange={(e) => updateForm('dob', e.target.value)} />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <Input label="Email" type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="student@eduvista.edu" />
                  <Input label="Phone" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="+1 628 555 0100" />
                  <Input label="Address" value={form.address} onChange={(e) => updateForm('address', e.target.value)} placeholder="Campus Lane" />
                </>
              )}

              {step === 2 && (
                <>
                  <Input label="Guardian name" value={form.guardianName} onChange={(e) => updateForm('guardianName', e.target.value)} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select label="Relation" value={form.guardianRelation} onChange={(e) => updateForm('guardianRelation', e.target.value)}>
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Guardian</option>
                    </Select>
                    <Input label="Guardian phone" value={form.guardianPhone} onChange={(e) => updateForm('guardianPhone', e.target.value)} />
                  </div>
                  <Input label="Guardian email" type="email" value={form.guardianEmail} onChange={(e) => updateForm('guardianEmail', e.target.value)} />
                </>
              )}

              {step === 3 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="Class" value={form.className} onChange={(e) => updateForm('className', e.target.value)}>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Select>
                  <Select label="Department" value={form.department} onChange={(e) => updateForm('department', e.target.value)}>
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </Select>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ['idCard', 'ID Card'],
                    ['transcript', 'Transcript'],
                    ['photo', 'Photo'],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          documents: { ...prev.documents, [key]: !prev.documents[key] },
                        }))
                      }
                      className={`rounded-[18px] border p-4 text-left transition ${
                        form.documents[key]
                          ? 'border-violet bg-violet/10 shadow-[var(--shadow-glow)]'
                          : 'border-border-strong bg-ivory-soft hover:border-violet/40'
                      }`}
                    >
                      <FileUp className={`mb-3 h-5 w-5 ${form.documents[key] ? 'text-violet' : 'text-ink-muted'}`} />
                      <p className="font-semibold text-ink">{label}</p>
                      <p className="mt-1 text-xs text-ink-muted">
                        {form.documents[key] ? 'Attached' : 'Tap to mark uploaded'}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3 rounded-[18px] border border-border bg-ivory-soft/60 p-4">
                  {[
                    ['Name', form.name],
                    ['Gender', form.gender === 'F' ? 'Female' : 'Male'],
                    ['DOB', form.dob],
                    ['Email', form.email],
                    ['Phone', form.phone],
                    ['Guardian', `${form.guardianName} (${form.guardianRelation})`],
                    ['Class', form.className],
                    ['Department', form.department],
                    [
                      'Documents',
                      Object.entries(form.documents)
                        .filter(([, v]) => v)
                        .map(([k]) => k)
                        .join(', ') || 'None marked',
                    ],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-4 border-b border-border/70 pb-2 last:border-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">{label}</span>
                      <span className="text-right text-sm font-semibold text-ink">{value || '—'}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
          <Button variant="ghost" disabled={step === 0} onClick={goBack}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="violet" onClick={goNext}>
              Continue
            </Button>
          ) : (
            <Button variant="violet" onClick={submitStudent}>
              <UserPlus className="h-4 w-4" /> Enroll Student
            </Button>
          )}
        </div>
      </Modal>
    </motion.div>
  )
}
