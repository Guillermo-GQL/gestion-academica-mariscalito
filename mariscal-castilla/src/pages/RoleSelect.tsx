import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ROLES, ROLE_ORDER } from '../config/roles'
import { FachadaPanel, Logo } from '../components/ui'
import { useAuth } from '../context/AuthContext'

export default function RoleSelect() {
  const { session } = useAuth()
  return (
    <div className="flex min-h-screen">
      <FachadaPanel>
        <h1 className="text-4xl font-bold leading-tight">Sistema de Matrícula<br />y Asistencia</h1>
        <span className="mb-6 mt-5 h-1 w-14 rounded bg-gold-500" />
        <p className="text-xl font-semibold">I.E. Mariscal Castilla</p>
        <p className="mt-2 text-sm text-white/85">Secundaria · Daniel Hernández,<br />Tayacaja – Huancavelica</p>
      </FachadaPanel>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-[640px]">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-28" />
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">BIENVENIDO A TU PORTAL</h2>
            <p className="mt-2 text-sm font-semibold text-navy-800">Elige el rol con el que deseas ingresar</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ROLE_ORDER.map((id) => {
              const r = ROLES[id]
              const Icon = r.icon
              const active = session?.role === id
              return (
                <Link
                  key={id}
                  to={active ? `/app/${id}` : `/login/${id}`}
                  className="group relative flex min-h-[150px] flex-col rounded-2xl border-2 border-transparent bg-white p-5 shadow-sm transition hover:border-brand-500 hover:shadow-md focus-visible:border-brand-500"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-900"><Icon size={20} /></span>
                  <span className="mt-4 text-[17px] font-bold text-navy-900">{r.label}</span>
                  <span className="mt-1 max-w-[75%] text-sm text-slate-500">{r.description}</span>
                  <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              )
            })}
          </div>
          <p className="mt-10 text-center text-xs text-slate-500">© 2026 I.E. Mariscal Castilla</p>
        </div>
      </main>
    </div>
  )
}
