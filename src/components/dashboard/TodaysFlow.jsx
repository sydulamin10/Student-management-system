import { motion } from 'framer-motion'
import { Card, CardHeader } from '../ui/Card'
import { cn } from '../../utils/cn'

export function TodaysFlow({ items }) {
  return (
    <Card className="md:col-span-5" hover={false}>
      <CardHeader title="Today's Flow" subtitle="Campus rhythm for the day" />
      <div className="relative space-y-0">
        <div className="absolute bottom-3 left-[19px] top-3 w-px bg-border-strong" />
        {items.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative flex items-start gap-4 py-3"
          >
            <span
              className={cn(
                'relative z-10 mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-surface',
                item.status === 'done' && 'bg-ink-muted',
                item.status === 'current' && 'bg-violet shadow-[0_0_0_6px_rgba(124,92,252,0.18)]',
                item.status === 'upcoming' && 'bg-cyan'
              )}
            >
              {item.status === 'current' && (
                <span className="absolute inset-0 animate-ping rounded-full bg-violet opacity-60" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-ink-muted">{item.time}</p>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
            </div>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase',
                item.status === 'current' && 'bg-violet/15 text-violet',
                item.status === 'done' && 'bg-ivory-muted text-ink-muted',
                item.status === 'upcoming' && 'bg-cyan/15 text-cyan'
              )}
            >
              {item.status}
            </span>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
