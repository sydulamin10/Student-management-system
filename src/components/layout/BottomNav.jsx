import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { mobilePrimary } from './navConfig'

export function BottomNav({ role = 'admin' }) {
  const items = mobilePrimary[role] || mobilePrimary.admin

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-2 py-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex min-w-[64px] flex-col items-center gap-1 rounded-[14px] px-2 py-1.5 text-[10px] font-bold',
                isActive ? 'bg-violet/10 text-violet' : 'text-ink-muted'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
