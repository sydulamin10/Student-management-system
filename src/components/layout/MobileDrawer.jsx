import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { X, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import { getNavForRole } from './navConfig'

export function MobileDrawer({ open, onClose, role = 'admin' }) {
  const items = getNavForRole(role)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            className="absolute inset-0 bg-charcoal/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-surface shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center justify-between px-4 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-charcoal text-violet">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold">EDUVISTA</p>
                  <p className="text-[11px] text-ink-muted">Academic OS</p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="rounded-[12px] p-2 hover:bg-ivory-soft">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
              {items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-semibold',
                      isActive
                        ? 'bg-charcoal text-ivory dark:bg-violet'
                        : 'text-ink-secondary hover:bg-ivory-soft'
                    )
                  }
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
