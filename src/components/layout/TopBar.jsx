import { Menu, Moon, Search, Sun } from 'lucide-react'
import { formatDate, getGreeting } from '../../utils/format'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { NotificationPanel } from '../notifications/NotificationPanel'

export function TopBar({ onOpenSearch, onOpenNav, title, subtitle }) {
  const { user } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-ivory/80 px-4 py-3 backdrop-blur-xl md:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="rounded-[12px] p-2 text-ink-secondary hover:bg-surface lg:hidden"
            onClick={onOpenNav}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-extrabold text-ink md:text-xl">
              {title || `${getGreeting()}, ${user?.name?.split(' ')[0] || 'there'}.`}
            </h1>
            <p className="truncate text-xs text-ink-muted md:text-sm">
              {subtitle || "Here's what is happening across EDUVISTA today."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="hidden text-xs font-semibold text-ink-muted xl:block">
            {formatDate(new Date(), { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={onOpenSearch}
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search</span>
            <kbd className="ml-1 hidden rounded-md bg-ivory-muted px-1.5 py-0.5 text-[10px] font-bold text-ink-muted lg:inline">
              ⌘K
            </kbd>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <NotificationPanel />
          <div className="ml-1 hidden items-center gap-2 sm:flex">
            <Avatar src={user?.avatar} name={user?.name} />
            <div className="hidden md:block">
              <p className="text-sm font-bold text-ink">{user?.name}</p>
              <p className="text-[11px] capitalize text-ink-muted">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
