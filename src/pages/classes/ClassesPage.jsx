import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, School, Search, Users } from 'lucide-react'
import {
  Badge,
  Card,
  EmptyState,
  Input,
  Progress,
  Select,
} from '../../components/ui'
import { classes } from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatGPA, formatPercent } from '../../utils/format'

export default function ClassesPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [grade, setGrade] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return classes.filter((c) => {
      if (grade && String(c.grade) !== grade) return false
      if (q && !`${c.name} ${c.teacher} ${c.room}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, grade])

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet">Campus</p>
        <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Classes</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Browse classrooms by section health — attendance, GPA, and subject load at a glance.
        </p>
      </div>

      <Card hover={false} className="grid gap-3 md:grid-cols-[1fr_180px]">
        <Input
          icon={Search}
          placeholder="Search class, teacher, or room…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value="">All grades</option>
          {[9, 10, 11, 12].map((g) => (
            <option key={g} value={String(g)}>Grade {g}</option>
          ))}
        </Select>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={School}
          title="No classes found"
          description="Try a different search or grade filter."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((c) => (
            <motion.div key={c.id} variants={staggerItem}>
              <Card
                className="group relative cursor-pointer overflow-hidden"
                onClick={() => navigate(`/app/classes/${c.id}`)}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet/10 transition group-hover:bg-violet/15" />
                <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-cyan/10" />
                <div className="relative">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                        Grade {c.grade} · Room {c.room}
                      </p>
                      <h3 className="mt-1 font-display text-3xl text-ink">Class {c.name}</h3>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-charcoal text-ivory transition group-hover:bg-violet">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="text-sm text-ink-muted">Homeroom · {c.teacher}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge tone="violet">
                      <Users className="mr-1 inline h-3 w-3" />
                      {c.students} students
                    </Badge>
                    <Badge tone="cyan">{c.subjects} subjects</Badge>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-semibold">
                        <span className="text-ink-muted">Attendance</span>
                        <span className="text-ink">{formatPercent(c.attendance)}</span>
                      </div>
                      <Progress
                        value={c.attendance}
                        tone={c.attendance >= 90 ? 'lime' : c.attendance >= 85 ? 'cyan' : 'amber'}
                      />
                    </div>
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-semibold">
                        <span className="text-ink-muted">GPA</span>
                        <span className="text-ink">{formatGPA(c.gpa)}</span>
                      </div>
                      <Progress value={c.gpa * 25} tone="violet" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
