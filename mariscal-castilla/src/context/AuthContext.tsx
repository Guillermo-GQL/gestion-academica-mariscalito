import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { ROLES, type RoleId } from '../config/roles'

interface Session { role: RoleId; user: string }

interface AuthValue {
  session: Session | null
  login: (role: RoleId, user: string, password: string) => boolean
  logout: () => void
}

const KEY = 'mc-session'
const AuthContext = createContext<AuthValue | null>(null)

const read = (): Session | null => {
  try { return JSON.parse(sessionStorage.getItem(KEY) ?? 'null') } catch { return null }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(read)

  const value = useMemo<AuthValue>(() => ({
    session,
    // Prototipo: solo valida contra las credenciales de demostración del rol.
    login: (role, user, password) => {
      const cfg = ROLES[role]
      if (user.trim().toLowerCase() !== cfg.demoUser || password !== cfg.demoPassword) return false
      const s = { role, user: cfg.demoUser }
      sessionStorage.setItem(KEY, JSON.stringify(s))
      setSession(s)
      return true
    },
    logout: () => { sessionStorage.removeItem(KEY); setSession(null) },
  }), [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
