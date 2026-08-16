import { cn } from '../../utils/cn'

export function Input({
  label,
  error,
  hint,
  className,
  id,
  icon: Icon,
  ...props
}) {
  const inputId = id || props.name
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
          {label}
        </span>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        )}
        <input
          id={inputId}
          className={cn(
            'h-11 w-full rounded-[14px] border border-border-strong bg-surface px-3.5 text-sm text-ink placeholder:text-ink-muted transition-all focus:border-violet focus:shadow-[var(--shadow-glow)]',
            Icon && 'pl-10',
            error && 'border-rose focus:border-rose',
            className
          )}
          {...props}
        />
      </div>
      {hint && !error && <p className="text-xs text-ink-muted">{hint}</p>}
      {error && <p className="text-xs text-rose">{error}</p>}
    </label>
  )
}

export function Select({ label, error, className, children, ...props }) {
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
          {label}
        </span>
      )}
      <select
        className={cn(
          'h-11 w-full appearance-none rounded-[14px] border border-border-strong bg-surface px-3.5 text-sm text-ink transition-all focus:border-violet focus:shadow-[var(--shadow-glow)]',
          error && 'border-rose',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-rose">{error}</p>}
    </label>
  )
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
          {label}
        </span>
      )}
      <textarea
        className={cn(
          'min-h-28 w-full rounded-[14px] border border-border-strong bg-surface px-3.5 py-3 text-sm text-ink placeholder:text-ink-muted transition-all focus:border-violet focus:shadow-[var(--shadow-glow)]',
          error && 'border-rose',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-rose">{error}</p>}
    </label>
  )
}
