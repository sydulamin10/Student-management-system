import { cn } from '../../utils/cn'
import { initials } from '../../utils/format'

export function Avatar({ src, name, size = 'md', className, online }) {
  const sizes = {
    sm: 'h-8 w-8 text-[10px]',
    md: 'h-10 w-10 text-xs',
    lg: 'h-14 w-14 text-sm',
    xl: 'h-20 w-20 text-lg',
    '2xl': 'h-28 w-28 text-2xl',
  }

  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={cn(
            'rounded-full object-cover ring-2 ring-white dark:ring-charcoal-soft',
            sizes[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-violet/15 font-bold text-violet ring-2 ring-white dark:ring-charcoal-soft',
            sizes[size]
          )}
        >
          {initials(name)}
        </div>
      )}
      {online != null && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-surface',
            online ? 'bg-lime' : 'bg-ink-muted'
          )}
        />
      )}
    </div>
  )
}
