import { Inbox } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../utils/cn'

export function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = 'Try adjusting filters or create a new item.',
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[22px] border border-dashed border-border-strong bg-surface px-6 py-16 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[18px] bg-violet/10 text-violet">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
