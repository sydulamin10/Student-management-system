import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp'
import { cn } from '../../utils/cn'
import { Card } from './Card'

export function StatWidget({
  label,
  value,
  suffix = '',
  prefix = '',
  trend,
  trendLabel,
  icon: Icon,
  spark = [],
  accent = 'violet',
  decimals = 0,
  className,
  compact,
}) {
  const animated = useCountUp(Number(value) || 0, { decimals })
  const TrendIcon = trend > 0 ? ArrowUpRight : trend < 0 ? ArrowDownRight : Minus
  const accents = {
    violet: 'from-violet/15 to-transparent text-violet',
    cyan: 'from-cyan/15 to-transparent text-cyan',
    lime: 'from-lime/20 to-transparent text-charcoal dark:text-lime',
    rose: 'from-rose/15 to-transparent text-rose',
    amber: 'from-amber/20 to-transparent text-amber',
  }

  return (
    <Card className={cn('relative overflow-hidden', className)} padding={!compact}>
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', accents[accent])} />
      <div className={cn('relative', compact && 'p-4')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
              {label}
            </p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
              {prefix}
              {decimals > 0 ? animated.toFixed(decimals) : animated}
              {suffix}
            </p>
          </div>
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-surface/80 text-current shadow-sm">
              <Icon className="h-4.5 w-4.5 h-5 w-5" />
            </div>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          {trend != null && (
            <div
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold',
                trend > 0 && 'bg-lime/25 text-charcoal dark:text-lime',
                trend < 0 && 'bg-rose/15 text-rose',
                trend === 0 && 'bg-ivory-muted text-ink-muted'
              )}
            >
              <TrendIcon className="h-3.5 w-3.5" />
              {Math.abs(trend)}%
              {trendLabel && <span className="font-medium text-ink-muted"> {trendLabel}</span>}
            </div>
          )}
          {spark.length > 0 && (
            <div className="flex h-8 items-end gap-0.5">
              {spark.map((v, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(12, v)}%` }}
                  transition={{ delay: i * 0.04 }}
                  className="w-1 rounded-full bg-current opacity-70"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
