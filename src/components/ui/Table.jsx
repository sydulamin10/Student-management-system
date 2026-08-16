import { cn } from '../../utils/cn'

export function Table({ children, className }) {
  return (
    <div className={cn('overflow-x-auto rounded-[22px] border border-border bg-surface', className)}>
      <table className="min-w-full text-left text-sm">{children}</table>
    </div>
  )
}

export function THead({ children }) {
  return (
    <thead className="border-b border-border bg-ivory-soft/80 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
      {children}
    </thead>
  )
}

export function TBody({ children }) {
  return <tbody className="divide-y divide-border">{children}</tbody>
}

export function TR({ children, className, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        'transition-colors hover:bg-ivory-soft/70',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </tr>
  )
}

export function TH({ children, className }) {
  return <th className={cn('px-4 py-3 font-bold whitespace-nowrap', className)}>{children}</th>
}

export function TD({ children, className }) {
  return <td className={cn('px-4 py-3.5 text-ink-secondary whitespace-nowrap', className)}>{children}</td>
}
