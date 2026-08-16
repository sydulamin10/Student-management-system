import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock3, MapPin, UserRound } from 'lucide-react'
import {
  Badge,
  Card,
  EmptyState,
  Select,
} from '../../components/ui'
import { classes, schedule } from '../../data/demoData'
import { pageTransition } from '../../animations/variants'
import { cn } from '../../utils/cn'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const TIME_SLOTS = [
  '08:00–08:45',
  '09:00–09:45',
  '10:00–10:45',
  '11:00–11:45',
  '13:00–13:45',
  '14:00–14:45',
]

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function SchedulePage() {
  const [classFilter, setClassFilter] = useState('')

  const filteredSchedule = useMemo(() => {
    const result = {}
    DAYS.forEach((day) => {
      const slots = schedule[day] || []
      result[day] = classFilter
        ? slots.filter((s) => s.class === classFilter || s.class === 'Open')
        : slots
    })
    return result
  }, [classFilter])

  const totalSessions = useMemo(
    () => DAYS.reduce((sum, day) => sum + filteredSchedule[day].length, 0),
    [filteredSchedule]
  )

  const slotLookup = useMemo(() => {
    const map = {}
    DAYS.forEach((day) => {
      map[day] = {}
      filteredSchedule[day].forEach((slot) => {
        map[day][slot.time] = slot
      })
    })
    return map
  }, [filteredSchedule])

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet">Timetable</p>
          <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Schedule</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            A weekly view of campus sessions — color-coded by subject with teacher and room detail.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="violet">{totalSessions} sessions</Badge>
          <Select
            className="w-44"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="">All classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </Select>
        </div>
      </div>

      {totalSessions === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No sessions this week"
          description="Try clearing the class filter to see the full campus timetable."
        />
      ) : (
        <>
          {/* Desktop / tablet grid */}
          <Card hover={false} padding={false} className="hidden overflow-hidden lg:block">
            <div className="grid grid-cols-[100px_repeat(6,minmax(0,1fr))] border-b border-border bg-ivory-soft/80">
              <div className="px-3 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
                Time
              </div>
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="border-l border-border px-3 py-4 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted"
                >
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>

            {TIME_SLOTS.map((time) => (
              <div
                key={time}
                className="grid grid-cols-[100px_repeat(6,minmax(0,1fr))] border-b border-border last:border-b-0"
              >
                <div className="flex items-center px-3 py-3 text-xs font-semibold text-ink-muted">
                  {time.split('–')[0]}
                </div>
                {DAYS.map((day) => {
                  const slot = slotLookup[day]?.[time]
                  return (
                    <div key={`${day}-${time}`} className="border-l border-border p-2">
                      {slot ? (
                        <motion.div
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                          className="group h-full min-h-[96px] cursor-default rounded-[16px] border p-3 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
                          style={{
                            background: `linear-gradient(145deg, ${hexToRgba(slot.color, 0.18)} 0%, ${hexToRgba(slot.color, 0.06)} 100%)`,
                            borderColor: hexToRgba(slot.color, 0.35),
                          }}
                        >
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <span
                              className="inline-block h-2 w-2 rounded-full"
                              style={{ background: slot.color }}
                            />
                            <span className="rounded-full bg-surface/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] text-ink-muted">
                              {slot.class}
                            </span>
                          </div>
                          <p className="text-sm font-bold leading-snug text-ink">{slot.subject}</p>
                          <p className="mt-1.5 flex items-center gap-1 text-[11px] text-ink-secondary">
                            <UserRound className="h-3 w-3 shrink-0" />
                            <span className="truncate">{slot.teacher}</span>
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-muted">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {slot.room}
                          </p>
                        </motion.div>
                      ) : (
                        <div className="flex h-full min-h-[96px] items-center justify-center rounded-[16px] border border-dashed border-border/80 bg-ivory-soft/30">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-muted/50">
                            Free
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </Card>

          {/* Mobile stacked days */}
          <div className="space-y-4 lg:hidden">
            {DAYS.map((day, dayIndex) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.05 }}
              >
                <Card hover={false}>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-2xl text-ink">{day}</h3>
                    <Badge tone="violet">{filteredSchedule[day].length}</Badge>
                  </div>
                  {filteredSchedule[day].length === 0 ? (
                    <p className="text-sm text-ink-muted">No sessions scheduled.</p>
                  ) : (
                    <div className="space-y-3">
                      {filteredSchedule[day].map((slot) => (
                        <motion.div
                          key={`${day}-${slot.time}-${slot.subject}`}
                          whileHover={{ x: 4 }}
                          className={cn(
                            'rounded-[18px] border p-4 transition-shadow hover:shadow-[var(--shadow-lift)]'
                          )}
                          style={{
                            background: `linear-gradient(135deg, ${hexToRgba(slot.color, 0.16)} 0%, transparent 70%)`,
                            borderColor: hexToRgba(slot.color, 0.3),
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold text-ink">{slot.subject}</p>
                              <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                                <Clock3 className="h-3.5 w-3.5" />
                                {slot.time}
                              </p>
                            </div>
                            <Badge>{slot.class}</Badge>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-secondary">
                            <span className="inline-flex items-center gap-1">
                              <UserRound className="h-3.5 w-3.5" />
                              {slot.teacher}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {slot.room}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}
