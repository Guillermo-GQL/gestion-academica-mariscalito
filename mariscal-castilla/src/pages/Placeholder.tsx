import { Hammer } from 'lucide-react'
import { useLocation, useParams } from 'react-router-dom'
import { ROLES, isRoleId } from '../config/roles'
import { PageHeader } from '../components/ui'

export default function Placeholder() {
  const { role } = useParams()
  const { pathname } = useLocation()
  if (!isRoleId(role)) return null
  const last = pathname.split('/').pop()
  const item = ROLES[role].nav.find((n) => n.path === last)
  return (
    <>
      <PageHeader title={item?.label ?? 'Sección'} />
      <div className="card flex flex-col items-center px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Hammer size={26} /></span>
        <p className="mt-4 text-lg font-bold text-navy-900">Sección en construcción</p>
        <p className="mt-1 max-w-sm text-sm text-slate-500">Esta pantalla se desarrollará en la siguiente fase. Por ahora el prototipo incluye el acceso y el panel principal de cada rol.</p>
      </div>
    </>
  )
}
