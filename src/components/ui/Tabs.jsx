import { motion } from 'framer-motion'
import { useId } from 'react'
import { cn } from '../../utils/cn'

export function Tabs({ tabs, active, onChange, className, layoutId }) {
  const reactId = useId()
  const pillId = layoutId || `tab-pill-${reactId}`

  return (
    <div
      className={cn(
        'flex gap-1 overflow-x-auto rounded-[16px] border border-border bg-ivory-soft/70 p-1 scrollbar-thin',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative z-0 shrink-0 rounded-[12px] px-3.5 py-2 text-sm font-semibold transition-colors',
              isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
            )}
          >
            {isActive && (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 -z-10 rounded-[12px] bg-surface shadow-[var(--shadow-soft)]"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
