import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftRight, Eye, EyeOff, Lock, ShieldCheck, User } from 'lucide-react'
import { ROLES, isRoleId } from '../config/roles'
import { FachadaPanel, Logo } from '../components/ui'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { role } = useParams()
  const { session, login } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [forgot, setForgot] = useState(false)

  if (!isRoleId(role)) return <Navigate to="/" replace />
  if (session?.role === role) return <Navigate to={`/app/${role}`} replace />

  const cfg = ROLES[role]
  const RoleIcon = cfg.icon

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!user.trim() || !pass) return setError('Completa tu usuario y contraseña.')
    if (!login(role, user, pass)) return setError('Usuario o contraseña incorrectos.')
    navigate(`/app/${role}`)
  }

  return (
    <div className="flex min-h-screen">
      <FachadaPanel align="bottom">
        <p className="text-3xl font-bold">I.E. Mariscal Castilla</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-white/90">Competente, inclusiva e innovadora</p>
      </FachadaPanel>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="flex w-full max-w-[520px] flex-col items-center text-center">
          <Logo className="h-20" />
          <h1 className="mt-3 text-3xl font-bold text-navy-900">Sistema de Matrícula y Asistencia</h1>
          <p className="mt-1 text-lg font-semibold text-slate-500">I.E. Mariscal Castilla</p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-bold text-white">
              <RoleIcon size={17} /> Acceso: {cfg.label}
            </span>
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-400 bg-white px-4 py-2 text-sm font-bold text-navy-900 transition hover:bg-amber-50">
              <ArrowLeftRight size={16} /> Cambiar rol
            </Link>
          </div>

          <form onSubmit={onSubmit} className="card mt-8 w-full p-8 text-left" noValidate>
            <h2 className="text-2xl font-bold text-navy-900">Iniciar sesión</h2>

            <label htmlFor="user" className="mt-5 block text-sm font-bold text-navy-900">Usuario</label>
            <div className="relative mt-2">
              <User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input id="user" className="input" placeholder="Ingresa tu usuario" autoComplete="username" value={user} onChange={(e) => { setUser(e.target.value); setError('') }} />
            </div>

            <label htmlFor="pass" className="mt-5 block text-sm font-bold text-navy-900">Contraseña</label>
            <div className="relative mt-2">
              <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input id="pass" type={show ? 'text' : 'password'} className="input pr-12" placeholder="Ingresa tu contraseña" autoComplete="current-password" value={pass} onChange={(e) => { setPass(e.target.value); setError('') }} />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-navy-900">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{error}</p>}

            <button type="submit" className="btn-primary mt-6 w-full py-3">Ingresar</button>

            <div className="mt-5 text-center">
              <button type="button" onClick={() => setForgot((f) => !f)} className="text-sm font-medium text-brand-600 hover:underline">¿Olvidaste tu contraseña?</button>
              {forgot && <p className="mt-2 text-xs text-slate-500">Comunícate con secretaría o con el administrador para restablecerla.</p>}
            </div>

            <div className="mt-5 rounded-xl border border-dashed border-brand-500/50 bg-brand-50 p-4 text-sm">
              <p className="flex items-center gap-2 font-semibold text-brand-700"><ShieldCheck size={16} /> Credenciales de demostración</p>
              <p className="mt-1 text-slate-600">Usuario <b className="text-navy-900">{cfg.demoUser}</b> · Contraseña <b className="text-navy-900">{cfg.demoPassword}</b></p>
              <button type="button" onClick={() => { setUser(cfg.demoUser); setPass(cfg.demoPassword); setError('') }} className="mt-2 text-xs font-semibold text-brand-700 hover:underline">Rellenar automáticamente</button>
            </div>

            <hr className="mt-5 border-slate-200" />
            <p className="mt-4 text-center text-xs text-slate-500">© 2026 I.E. Mariscal Castilla</p>
          </form>
        </div>
      </main>
    </div>
  )
}
