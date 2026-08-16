import { cn } from '../../utils/cn'

const styles = {
  default: 'bg-ivory-soft text-ink-secondary',
  violet: 'bg-violet/10 text-violet',
  cyan: 'bg-cyan/15 text-cyan-soft dark:text-cyan',
  lime: 'bg-lime/20 text-charcoal dark:text-lime',
  rose: 'bg-rose/15 text-rose',
  amber: 'bg-amber/20 text-amber-700 dark:text-amber',
  success: 'bg-lime/20 text-charcoal dark:text-lime',
  warning: 'bg-amber/20 text-amber-800 dark:text-amber',
  danger: 'bg-rose/15 text-rose',
  excellent: 'bg-lime/25 text-charcoal dark:text-lime',
  good: 'bg-cyan/15 text-cyan-deep dark:text-cyan',
  'needs attention': 'bg-amber/20 text-amber-800 dark:text-amber',
  'at risk': 'bg-rose/15 text-rose',
  paid: 'bg-lime/20 text-charcoal dark:text-lime',
  partial: 'bg-cyan/15 text-cyan',
  pending: 'bg-amber/20 text-amber-800 dark:text-amber',
  overdue: 'bg-rose/15 text-rose',
  present: 'bg-lime/20 text-charcoal dark:text-lime',
  absent: 'bg-rose/15 text-rose',
  late: 'bg-amber/20 text-amber-800 dark:text-amber',
  excused: 'bg-violet/10 text-violet',
}

export function Badge({ children, tone = 'default', className }) {
  const key = String(tone).toLowerCase()
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em]',
        styles[key] || styles.default,
        className
      )}
    >
      {children}
    </span>
  )
}
