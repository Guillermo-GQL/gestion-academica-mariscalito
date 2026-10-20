import { useMemo, useState } from 'react'
import { PageHeader, StatCard } from '../../components/ui'
import { ALUMNOS_AULA, SECCIONES } from '../../data/mock'

type Estado = 'P' | 'T' | 'A'
const OPCIONES: { id: Estado; label: string; on: string }[] = [
  { id: 'P', label: 'Presente', on: 'bg-green-600 text-white' },
  { id: 'T', label: 'Tardanza', on: 'bg-amber-500 text-white' },
  { id: 'A', label: 'Ausente', on: 'bg-red-600 text-white' },
]
const inicial = () => Object.fromEntries(ALUMNOS_AULA.map((a) => [a, 'P'])) as Record<string, Estado>

export default function DocenteDashboard() {
  const [seccion, setSeccion] = useState(SECCIONES[0])
  const [asist, setAsist] = useState<Record<string, Estado>>(inicial)
  const [guardado, setGuardado] = useState(false)

  const cuenta = useMemo(() => {
    const c = { P: 0, T: 0, A: 0 }
    Object.values(asist).forEach((e) => c[e]++)
    return c
  }, [asist])

  const cambiar = (a: string, e: Estado) => { setAsist((p) => ({ ...p, [a]: e })); setGuardado(false) }

  return (
    <>
      <PageHeader title="Panel del docente" subtitle="Registra la asistencia y revisa tus aulas" />
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Clases de hoy" value={4} hint="Matemática · 1° A, 2° B, 3° A, 4° A" />
        <StatCard label="Secciones a cargo" value={SECCIONES.length} />
        <StatCard label="Asistencia de la sección" value={`${Math.round(((cuenta.P + cuenta.T) / ALUMNOS_AULA.length) * 100)}%`} hint="Calculada en esta pantalla" />
      </div>

      <section className="card mt-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-navy-900">Registrar asistencia</h2>
          <select value={seccion} onChange={(e) => { setSeccion(e.target.value); setAsist(inicial()); setGuardado(false) }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-navy-900" aria-label="Sección">
            {SECCIONES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <ul className="mt-4 divide-y divide-slate-100">
          {ALUMNOS_AULA.map((a) => (
            <li key={a} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <span className="text-sm font-medium text-navy-900">{a}</span>
              <div className="flex overflow-hidden rounded-lg border border-slate-200" role="group" aria-label={`Asistencia de ${a}`}>
                {OPCIONES.map((o) => (
                  <button key={o.id} onClick={() => cambiar(a, o.id)} aria-pressed={asist[a] === o.id}
                    className={`px-3 py-1.5 text-xs font-semibold transition ${asist[a] === o.id ? o.on : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">Sección {seccion}: <b className="text-green-600">{cuenta.P} presentes</b> · <b className="text-amber-600">{cuenta.T} tardanzas</b> · <b className="text-red-600">{cuenta.A} ausentes</b></p>
          <div className="flex items-center gap-3">
            {guardado && <span role="status" className="text-sm font-semibold text-green-600">Asistencia guardada</span>}
            <button className="btn-primary" onClick={() => setGuardado(true)}>Guardar asistencia</button>
          </div>
        </div>
      </section>
    </>
  )
}
