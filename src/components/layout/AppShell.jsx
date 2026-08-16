import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { pageTransition } from '../../animations/variants'
import { listenForForegroundMessages } from '../../services/firebase/messaging'
import { CommandPalette } from '../command/CommandPalette'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'
import { MobileDrawer } from './MobileDrawer'

export function AppShell() {
  const { user } = useAuth()
  const { toast } = useToast()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    let unsubscribe = () => {}
    let cancelled = false

    listenForForegroundMessages((msg) => {
      toast(`${msg.title}: ${msg.body}`, 'info')
    })
      .then((unsub) => {
        if (!cancelled) unsubscribe = unsub || (() => {})
      })
      .catch(() => {})

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [toast])

  // Force a resize after route changes so Recharts/layouts measure correctly
  useEffect(() => {
    const id = window.setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 60)
    return () => window.clearTimeout(id)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-ivory bg-grid">
      <Sidebar
        role={user?.role}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        role={user?.role}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNav={() => setDrawerOpen(true)}
        />
        <main className="flex-1 px-4 pb-24 pt-4 md:px-6 md:pt-6 lg:pb-8">
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            transition={pageTransition.transition}
            className="mx-auto max-w-[1400px]"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      <BottomNav role={user?.role} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
