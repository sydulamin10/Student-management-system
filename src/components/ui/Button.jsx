import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-charcoal text-ivory hover:bg-charcoal-soft dark:bg-violet dark:hover:bg-violet-soft dark:text-white',
  violet: 'bg-violet text-white hover:bg-violet-deep',
  secondary:
    'bg-surface border border-border-strong text-ink hover:bg-ivory-soft hover:border-ink/20',
  ghost: 'bg-transparent text-ink-secondary hover:bg-ivory-soft hover:text-ink',
  danger: 'bg-rose/10 text-rose hover:bg-rose/20',
  soft: 'bg-violet/10 text-violet hover:bg-violet/15',
}

const sizes = {
  sm: 'h-9 px-3 text-xs rounded-[12px]',
  md: 'h-11 px-4 text-sm rounded-[14px]',
  lg: 'h-12 px-5 text-sm rounded-[16px]',
  icon: 'h-10 w-10 rounded-[14px] p-0',
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  as: Comp = 'button',
  ...props
}) {
  const isButton = Comp === 'button'
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isButton ? disabled || loading : undefined}
      type={isButton ? props.type || 'button' : undefined}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      )}
      {children}
    </motion.button>
  )
}
