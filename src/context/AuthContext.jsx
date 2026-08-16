import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  loginWithEmail,
  loginWithGoogle,
  logout as logoutService,
  registerWithEmail,
  resetPassword,
  subscribeToAuth,
  setMockUser,
  getMockUser,
} from '../services/firebase/auth'
import { useMockData } from '../firebase/config'
import { demoUsers } from '../data/demoData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getMockUser())
  const [loading, setLoading] = useState(() => !useMockData && !getMockUser())

  useEffect(() => {
    let active = true

    if (useMockData) {
      setUser(getMockUser())
      setLoading(false)
      return undefined
    }

    const unsub = subscribeToAuth((profile) => {
      if (!active) return

      if (profile) {
        // Real Firebase session wins
        setMockUser(null)
        setUser(profile)
      } else {
        // Keep local/demo session if Firebase has no user yet
        const local = getMockUser()
        setUser(local)
      }
      setLoading(false)
    })

    // Safety: never leave the app stuck on the loading skeleton
    const timeout = window.setTimeout(() => {
      if (!active) return
      setUser((current) => current || getMockUser())
      setLoading(false)
    }, 2500)

    return () => {
      active = false
      window.clearTimeout(timeout)
      unsub?.()
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login: async (email, password) => {
        const profile = await loginWithEmail(email, password)
        setUser(profile)
        setLoading(false)
        return profile
      },
      loginGoogle: async () => {
        const profile = await loginWithGoogle()
        setUser(profile)
        setLoading(false)
        return profile
      },
      register: async (payload) => {
        const profile = await registerWithEmail(payload)
        setUser(profile)
        setLoading(false)
        return profile
      },
      logout: async () => {
        await logoutService()
        setUser(null)
        setLoading(false)
      },
      resetPassword,
      loginAsDemo: (role = 'admin') => {
        const profile = demoUsers[role] || demoUsers.admin
        setMockUser(profile)
        setUser(profile)
        setLoading(false)
        return profile
      },
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
