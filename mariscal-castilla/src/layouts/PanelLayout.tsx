import { useState } from 'react'
import { Navigate, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { LogOut, Menu, UserCircle, X } from 'lucide-react'
import { ROLES, isRoleId } from '../config/roles'
import { useAuth } from '../context/AuthContext'
import { Logo } from '../components/ui'

export default function PanelLayout() {
  const { role } = useParams()
  const { session, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  if (!isRoleId(role)) return <Navigate to="/" replace />
  if (!session || session.role !== role) return <Navigate to={`/login/${role}`} replace />

  const cfg = ROLES[role]
  const base = `/app/${role}`
  const current = cfg.nav.find((n) => `${base}${n.path ? `/${n.path}` : ''}` === pathname) ?? cfg.nav[0]

  const onLogout = () => { logout(); navigate(`/login/${role}`) }

  return (
    <div className="min-h-screen lg:flex">
      {open && <button aria-label="Cerrar menú" className="fixed inset-0 z-30 bg-navy-950/50 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy-900 text-slate-300 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button className="absolute right-3 top-3 text-slate-400 lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú">
          <X size={20} />
        </button>
        <div className="flex flex-col items-center px-6 pb-6 pt-8">
          <Logo className="h-20" />
          <p className="mt-2 text-lg font-bold text-white">Mariscal Castilla</p>
          <span className="mt-1.5 h-0.5 w-12 rounded bg-gold-500" />
        </div>

        <nav className="flex-1 space-y-1 px-3 pt-4">
          {cfg.nav.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path ? `${base}/${path}` : base}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg border-l-4 px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'border-brand-500 bg-brand-700/40 text-white'
                    : 'border-transparent hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={19} /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-white/5 hover:text-white">
            <LogOut size={19} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-[68px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3 text-sm">
            <button className="rounded-lg p-2 text-navy-900 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
              <Menu size={22} />
            </button>
            <span className="text-slate-500">{cfg.label}</span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-navy-900">{current.label}</span>
          </div>
          <span title={cfg.displayName} className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <UserCircle size={22} />
          </span>
        </header>

        <main className="mx-auto max-w-6xl p-4 sm:p-8">
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  )
}
