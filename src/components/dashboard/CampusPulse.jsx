import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp'
import { Card } from '../ui/Card'

function Metric({ label, value, suffix = '', decimals = 0 }) {
  const n = useCountUp(value, { decimals })
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/55">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-white md:text-3xl">
        {decimals ? n.toFixed(decimals) : n}
        {suffix}
      </p>
    </div>
  )
}

export function CampusPulse({ stats }) {
  return (
    <Card
      hover={false}
      className="relative overflow-hidden border-0 bg-charcoal p-0 text-white shadow-[var(--shadow-lift)] md:col-span-7"
      padding={false}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,92,252,0.35),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.25),transparent_35%)]" />
      <div className="absolute inset-0 bg-noise opacity-40" />
      <div className="relative p-6 md:p-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Live campus health
            </div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Campus Pulse</h2>
            <p className="mt-1 max-w-md text-sm text-white/60">
              A live read on enrollment, presence, and academic momentum across EDUVISTA.
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/10"
          >
            <Activity className="h-5 w-5 text-violet-soft" />
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <Metric label="Total students" value={stats.totalStudents} />
          <Metric label="Active students" value={stats.activeStudents} />
          <Metric label="Attendance today" value={stats.attendanceToday} suffix="%" decimals={1} />
          <Metric label="Avg performance" value={stats.averageGPA} decimals={2} />
        </div>
      </div>
    </Card>
  )
}
