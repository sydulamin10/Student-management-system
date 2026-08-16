import { cn } from '../../utils/cn'

export function Progress({ value = 0, className, tone = 'violet' }) {
  const tones = {
    violet: 'bg-violet',
    cyan: 'bg-cyan',
    lime: 'bg-lime',
    rose: 'bg-rose',
    amber: 'bg-amber',
  }
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-ivory-muted', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-700', tones[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
