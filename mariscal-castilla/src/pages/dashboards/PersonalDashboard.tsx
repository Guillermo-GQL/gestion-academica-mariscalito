import { useState } from 'react'
import { PageHeader, Pill, StatCard } from '../../components/ui'
import { MATRICULAS, VACANTES, type EstadoMatricula, type Matricula } from '../../data/mock'

const tone = { Confirmada: 'green', Pendiente: 'orange', Observada: 'red' } as const
const FILTROS: ('Todas' | EstadoMatricula)[] = ['Todas', 'Pendiente', 'Observada', 'Confirmada']

export default function PersonalDashboard() {
  const [rows, setRows] = useState<Matricula[]>(MATRICULAS)
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('Todas')
  const [q, setQ] = useState('')

  const set = (id: number, estado: EstadoMatricula) => setRows((r) => r.map((m) => (m.id === id ? { ...m, estado } : m)))
  const visibles = rows.filter((m) => (filtro === 'Todas' || m.estado === filtro) && m.estudiante.toLowerCase().includes(q.toLowerCase()))
  const libres = VACANTES.reduce((s, v) => s + v.total - v.ocupadas, 0)

  return (
    <>
      <PageHeader title="Panel de secretaría" subtitle="Gestiona matrículas, vacantes y estudiantes" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Matrículas registradas" value={rows.length} />
        <StatCard label="Pendientes" value={rows.filter((m) => m.estado === 'Pendiente').length} />
        <StatCard label="Observadas" value={rows.filter((m) => m.estado === 'Observada').length} />
        <StatCard label="Vacantes libres" value={libres} />
      </div>

      <section className="card mt-6 p-6">
        <h2 className="text-lg font-bold text-navy-900">Vacantes por grado</h2>
        <div className="mt-4 space-y-4">
          {VACANTES.map((v) => {
            const pct = Math.round((v.ocupadas / v.total) * 100)
            return (
              <div key={v.grado}>
                <div className="flex justify-between text-sm"><span className="font-medium text-navy-900">{v.grado}</span><span className="text-slate-500">{v.ocupadas} de {v.total} ocupadas</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                  <div className={`h-2 rounded-full ${pct > 90 ? 'bg-orange-500' : 'bg-brand-500'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="card mt-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-navy-900">Matrículas recientes</h2>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar estudiante" aria-label="Buscar estudiante" className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button key={f} onClick={() => setFiltro(f)} aria-pressed={filtro === f} className={`rounded-full px-3 py-1 text-xs font-semibold ${filtro === f ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{f}</button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead><tr className="bg-slate-50 text-xs font-semibold text-slate-500">
              {['Estudiante', 'DNI', 'Grado y sección', 'Estado', 'Acción'].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {visibles.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-semibold text-navy-900">{m.estudiante}</td>
                  <td className="px-4 py-3">{m.dni}</td>
                  <td className="px-4 py-3">{m.grado} {m.seccion}</td>
                  <td className="px-4 py-3"><Pill tone={tone[m.estado]}>{m.estado}</Pill></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3 text-xs font-semibold">
                      <button disabled={m.estado === 'Confirmada'} onClick={() => set(m.id, 'Confirmada')} className="text-green-600 hover:underline disabled:text-slate-300 disabled:no-underline">Confirmar</button>
                      <button disabled={m.estado === 'Observada'} onClick={() => set(m.id, 'Observada')} className="text-red-600 hover:underline disabled:text-slate-300 disabled:no-underline">Observar</button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibles.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No hay matrículas con ese filtro.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
