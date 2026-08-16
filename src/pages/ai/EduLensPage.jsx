import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowUpRight,
  Brain,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  Progress,
  StatWidget,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { aiInsights, campusStats, students } from '../../data/demoData'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { cn } from '../../utils/cn'

/**
 * Future AI API stub — swap implementation for a real inference endpoint.
 * Example: POST /api/edulens/insights { scope, studentIds }
 */
export async function fetchEduLensInsights(_payload = {}) {
  // await fetch('/api/edulens/insights', { method: 'POST', body: JSON.stringify(_payload) })
  return Promise.resolve(aiInsights)
}

const severityTone = {
  high: 'rose',
  medium: 'amber',
  low: 'cyan',
}

const typeLabel = {
  risk: 'Risk',
  opportunity: 'Opportunity',
  trend: 'Trend',
  performance: 'Performance',
}

export default function EduLensPage() {
  const { toast } = useToast()
  const [insights] = useState(() => [...aiInsights])
  const [scanning, setScanning] = useState(false)

  const risks = useMemo(() => insights.filter((i) => i.type === 'risk'), [insights])
  const opportunities = useMemo(
    () => insights.filter((i) => i.type === 'opportunity'),
    [insights]
  )
  const performance = useMemo(
    () => insights.filter((i) => i.type === 'performance' || i.type === 'trend'),
    [insights]
  )

  const recommended = useMemo(() => {
    const actions = []
    insights.forEach((insight) => {
      insight.actions.forEach((action) => {
        actions.push({
          id: `${insight.id}-${action}`,
          action,
          student: insight.student,
          severity: insight.severity,
          insightId: insight.id,
        })
      })
    })
    return actions.slice(0, 8)
  }, [insights])

  const atRiskStudents = students.filter((s) => s.status === 'At Risk').length
  const avgGpa = campusStats.averageGPA
  const attendance = campusStats.attendanceToday

  const runAction = (label, student) => {
    toast(`${label} — ${student}`, 'success')
  }

  const refreshScan = async () => {
    setScanning(true)
    try {
      await fetchEduLensInsights({ scope: 'campus' })
      toast('EduLens scan complete', 'info')
    } finally {
      setScanning(false)
    }
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="relative space-y-8 pb-10"
    >
      {/* Ambient mesh — distinct from standard dashboards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-6 h-[420px] overflow-hidden rounded-[28px]"
      >
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-cyan/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-72 rounded-full bg-violet-soft/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,252,0.08),_transparent_55%)]" />
      </div>

      <motion.header
        variants={staggerItem}
        className="relative overflow-hidden rounded-[28px] border border-violet/20 bg-charcoal px-6 py-8 text-ivory md:px-10 md:py-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 20% 30%, rgba(124,92,252,0.45), transparent 45%), radial-gradient(ellipse at 80% 20%, rgba(45,212,191,0.28), transparent 40%)',
          }}
        />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-soft">
              <Sparkles className="h-3.5 w-3.5" />
              EduLens AI
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              See risk before it compounds.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ivory/70 md:text-base">
              Predictive insights across attendance, assignments, and performance —
              calibrated for campus action, not noise.
            </p>
          </div>
          <Button
            variant="secondary"
            className="border-white/20 bg-white/10 text-ivory hover:bg-white/15"
            loading={scanning}
            onClick={refreshScan}
          >
            <Brain className="h-4 w-4" />
            Run campus scan
          </Button>
        </div>
      </motion.header>

      {/* Performance summary strip */}
      <motion.section variants={staggerItem} className="relative space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-cyan" />
          <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-ink-muted">
            Performance Summary
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatWidget
            label="At-risk students"
            value={atRiskStudents}
            icon={AlertTriangle}
            accent="rose"
            trend={12}
            trendLabel="flagged"
          />
          <StatWidget
            label="Campus GPA"
            value={avgGpa}
            decimals={2}
            icon={Target}
            accent="violet"
            trend={3}
            trendLabel="vs last term"
          />
          <StatWidget
            label="Attendance today"
            value={attendance}
            decimals={1}
            suffix="%"
            icon={Users}
            accent="cyan"
            trend={-1}
            trendLabel="vs avg"
          />
          <StatWidget
            label="Active insights"
            value={insights.length}
            icon={Zap}
            accent="amber"
            trend={0}
            trendLabel="stable"
          />
        </div>
      </motion.section>

      <div className="relative grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* AI Insights */}
        <motion.section variants={staggerItem} className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet" />
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-ink-muted">
              AI Insights
            </h2>
          </div>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.05 }}
              >
                <Card
                  className={cn(
                    'relative overflow-hidden border-l-4',
                    insight.severity === 'high' && 'border-l-rose',
                    insight.severity === 'medium' && 'border-l-amber',
                    insight.severity === 'low' && 'border-l-cyan'
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={severityTone[insight.severity]}>
                          {insight.severity}
                        </Badge>
                        <Badge tone="violet">{typeLabel[insight.type] || insight.type}</Badge>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-ink">{insight.title}</h3>
                      <p className="mt-0.5 text-sm font-semibold text-violet">
                        {insight.student}
                        {insight.studentId ? ` · ${insight.studentId}` : ''}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    {insight.insight}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {insight.actions.map((action) => (
                      <Button
                        key={action}
                        size="sm"
                        variant="soft"
                        onClick={() => runAction(action, insight.student)}
                      >
                        {action}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="space-y-6">
          {/* Risk Detection */}
          <motion.section variants={staggerItem} className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose" />
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-ink-muted">
                Risk Detection
              </h2>
            </div>
            <Card className="space-y-4 bg-gradient-to-br from-rose/5 via-surface to-violet/5">
              {risks.length === 0 ? (
                <p className="text-sm text-ink-muted">No high-priority risks right now.</p>
              ) : (
                risks.map((r) => (
                  <div key={r.id} className="space-y-2 border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-ink">{r.student}</p>
                      <Badge tone="rose">{r.severity}</Badge>
                    </div>
                    <p className="text-xs leading-relaxed text-ink-secondary">{r.title}</p>
                    <Progress
                      value={r.severity === 'high' ? 88 : r.severity === 'medium' ? 62 : 35}
                      tone="rose"
                    />
                  </div>
                ))
              )}
              <div className="rounded-[16px] bg-ivory-soft/80 px-3 py-2.5 text-xs text-ink-muted">
                {opportunities.length} enrichment opportunities also detected this cycle.
              </div>
            </Card>
          </motion.section>

          {/* Recommended Actions */}
          <motion.section variants={staggerItem} className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber" />
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-ink-muted">
                Recommended Actions
              </h2>
            </div>
            <Card padding={false} className="overflow-hidden">
              <ul className="divide-y divide-border">
                {recommended.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 transition hover:bg-ivory-soft/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{item.action}</p>
                      <p className="truncate text-xs text-ink-muted">{item.student}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => runAction(item.action, item.student)}
                    >
                      Act
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.section>

          {/* Compact performance notes */}
          <motion.section variants={staggerItem}>
            <Card className="border-cyan/20 bg-gradient-to-br from-cyan/5 to-transparent">
              <CardHeaderish
                title="Signal highlights"
                items={performance.map((p) => p.title)}
              />
            </Card>
          </motion.section>
        </div>
      </div>
    </motion.div>
  )
}

function CardHeaderish({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink-secondary">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
