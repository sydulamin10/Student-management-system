import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronsLeft, ChevronsRight, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import { getNavForRole } from './navConfig'

export function Sidebar({ role = 'admin', collapsed, onToggle, onNavigate }) {
  const items = getNavForRole(role)

  return (
    <aside
      className={cn(
        'hidden h-screen flex-col border-r border-border bg-surface/90 backdrop-blur-xl transition-all duration-300 lg:flex',
        collapsed ? 'w-[88px]' : 'w-[260px]'
      )}
    >
      <div className={cn('flex items-center gap-3 px-4 py-5', collapsed && 'justify-center px-2')}>
        <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-charcoal text-violet">
          <Sparkles className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-extrabold tracking-wide text-ink">EDUVISTA</p>
            <p className="text-[11px] text-ink-muted">Academic OS</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4 scrollbar-thin">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-semibold transition-colors',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-charcoal text-ivory dark:bg-violet dark:text-white'
                  : 'text-ink-secondary hover:bg-ivory-soft hover:text-ink'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-[14px] bg-charcoal dark:bg-violet"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon className="relative z-10 h-4.5 w-4.5 h-[18px] w-[18px] shrink-0" />
                {!collapsed && <span className="relative z-10">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={onToggle}
        className="m-3 flex items-center justify-center gap-2 rounded-[14px] border border-border px-3 py-2.5 text-xs font-semibold text-ink-muted hover:bg-ivory-soft hover:text-ink"
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        {!collapsed && 'Collapse'}
      </button>
    </aside>
  )
}
