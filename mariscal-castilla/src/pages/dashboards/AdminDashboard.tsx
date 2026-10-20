import { useState } from 'react'
import { PageHeader, Pill, StatCard } from '../../components/ui'
import { USUARIOS, type RolUsuario } from '../../data/mock'

const ROLES_FILTRO: ('Todos' | RolUsuario)[] = ['Todos', 'Administrador', 'Personal administrativo', 'Docente', 'Estudiante']

export default function AdminDashboard() {
  const [users, setUsers] = useState(USUARIOS)
  const [rol, setRol] = useState<(typeof ROLES_FILTRO)[number]>('Todos')
  const visibles = users.filter((u) => rol === 'Todos' || u.rol === rol)
  const toggle = (id: number) => setUsers((us) => us.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u)))

  return (
    <>
      <PageHeader title="Panel del administrador" subtitle="Configuración, usuarios y reportes del sistema" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Usuarios totales" value={users.length} />
        <StatCard label="Usuarios activos" value={users.filter((u) => u.activo).length} />
        <StatCard label="Docentes" value={users.filter((u) => u.rol === 'Docente').length} />
        <StatCard label="Estudiantes" value={users.filter((u) => u.rol === 'Estudiante').length} />
      </div>

      <section className="card mt-6 p-6">
        <h2 className="text-lg font-bold text-navy-900">Usuarios del sistema</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {ROLES_FILTRO.map((f) => (
            <button key={f} onClick={() => setRol(f)} aria-pressed={rol === f} className={`rounded-full px-3 py-1 text-xs font-semibold ${rol === f ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{f}</button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead><tr className="bg-slate-50 text-xs font-semibold text-slate-500">
              {['Nombre', 'Usuario', 'Rol', 'Estado', 'Acción'].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {visibles.map((u) => (
                <tr key={u.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-semibold text-navy-900">{u.nombre}</td>
                  <td className="px-4 py-3">{u.usuario}</td>
                  <td className="px-4 py-3">{u.rol}</td>
                  <td className="px-4 py-3"><Pill tone={u.activo ? 'green' : 'slate'}>{u.activo ? 'Activo' : 'Inactivo'}</Pill></td>
                  <td className="px-4 py-3"><button onClick={() => toggle(u.id)} className="text-xs font-semibold text-brand-600 hover:underline">{u.activo ? 'Desactivar' : 'Activar'}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
