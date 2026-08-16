import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Card({
  children,
  className,
  hover = true,
  padding = true,
  as: Comp = motion.div,
  ...props
}) {
  return (
    <Comp
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'rounded-[22px] border border-border bg-surface shadow-[var(--shadow-soft)] transition-shadow',
        hover && 'hover:shadow-[var(--shadow-lift)]',
        padding && 'p-5 md:p-6',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function CardHeader({ title, subtitle, action, className }) {
  return (
    <div className={cn('mb-4 flex items-start justify-between gap-3', className)}>
      <div>
        {title && <h3 className="text-base font-bold text-ink">{title}</h3>}
        {subtitle && <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
