import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, ClipboardCheck, GraduationCap, CalendarX } from 'lucide-react'
import { IconBadge, Notice, PageHeader } from '../../components/ui'
import { HORARIO_DEMO } from '../../data/mock'

const saludo = () => { const h = new Date().getHours(); return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches' }

export default function EstudianteDashboard() {
  const [publicado, setPublicado] = useState(false)
  return (
    <>
      <PageHeader
        title={`${saludo()}, Luis Quispe`}
        subtitle="Consulta tu matrícula, horario y asistencia"
        actions={<>
          <Link to="/app/estudiante/horario" className="btn-primary">Ver mi horario</Link>
          <Link to="/app/estudiante/asistencia" className="btn-outline">Ver asistencia</Link>
        </>}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <section className="card p-6">
          <div className="flex items-center gap-3"><IconBadge icon={GraduationCap} tone="blue" /><h2 className="text-lg font-bold text-navy-900">Mi matrícula</h2></div>
          <p className="mt-4 text-sm text-slate-500">Grado: 3° · Sección: A</p>
          <span className="mt-3 inline-block rounded-full bg-green-50 px-4 py-1.5 text-xs font-bold text-green-600">Matrícula confirmada</span>
        </section>
        <section className="card p-6">
          <div className="flex items-center gap-3"><IconBadge icon={CalendarCheck} tone="teal" /><h2 className="text-lg font-bold text-navy-900">Mi horario</h2></div>
          <p className="mt-4 text-sm text-slate-500">Consulta tus clases programadas</p>
          <Link to="/app/estudiante/horario" className="mt-3 flex items-center justify-between text-sm font-semibold text-brand-600">Ver mi horario <ArrowRight size={16} /></Link>
        </section>
        <section className="card p-6">
          <div className="flex items-center gap-3"><IconBadge icon={ClipboardCheck} tone="violet" /><h2 className="text-lg font-bold text-navy-900">Mi asistencia</h2></div>
          <p className="mt-4 text-sm text-slate-500">Revisa tus registros de presente y ausente</p>
          <Link to="/app/estudiante/asistencia" className="mt-3 flex justify-end text-violet-600"><ArrowRight size={16} /></Link>
        </section>
      </div>

      <section className="card mt-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-navy-900">Mi horario de clases</h2>
          <button onClick={() => setPublicado((p) => !p)} className="text-xs font-semibold text-brand-600 hover:underline">
            {publicado ? 'Simular horario sin publicar' : 'Simular horario publicado'}
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead><tr className="bg-slate-50 text-xs font-semibold text-slate-500">
              {['Hora', 'Curso', 'Docente', 'Sección', 'Aula'].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
            </tr></thead>
            {publicado && (
              <tbody>{HORARIO_DEMO.map((r) => (
                <tr key={r.hora} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 text-slate-500">{r.hora}</td><td className="px-4 py-3 font-semibold text-navy-900">{r.curso}</td>
                  <td className="px-4 py-3">{r.docente}</td><td className="px-4 py-3">{r.seccion}</td><td className="px-4 py-3">{r.aula}</td>
                </tr>))}
              </tbody>
            )}
          </table>
          {!publicado && (
            <div className="flex flex-col items-center py-8 text-sm text-slate-500">
              <CalendarX size={26} className="mb-2 text-slate-400" /> Tu horario se mostrará cuando sea publicado por la institución
            </div>
          )}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Avisos importantes</h2>
          <span className="text-xs text-slate-400">Estados de referencia</span>
        </div>
        <div className="space-y-2.5">
          <Notice kind="info">Tu horario ha sido actualizado</Notice>
          <Notice kind="pending">Tienes información pendiente de revisión</Notice>
          <Notice kind="important">Tu matrícula presenta una observación. Comunícate con secretaría</Notice>
          <Notice kind="ok">Tu matrícula fue confirmada correctamente</Notice>
        </div>
      </section>
    </>
  )
}
