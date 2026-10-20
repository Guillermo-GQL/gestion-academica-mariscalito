import type { ReactNode } from 'react'
import { AlertTriangle, CalendarCheck, ClipboardCheck, type LucideIcon } from 'lucide-react'

export function Logo({ className = 'h-20' }: { className?: string }) {
  return <img src="/logo.png" alt="Escudo I.E. Mariscal Castilla" className={`${className} w-auto object-contain`} />
}

/** Panel izquierdo con la fachada del colegio (login y selección de rol). */
export function FachadaPanel({ children, align = 'top' }: { children: ReactNode; align?: 'top' | 'bottom' }) {
  return (
    <aside
      className="relative hidden min-h-screen bg-navy-900 bg-cover bg-center lg:block lg:w-[45%]"
      style={{ backgroundImage: "url('/fachada.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-900/10 to-navy-950/70" />
      <div className={`relative flex h-full flex-col p-12 text-white ${align === 'bottom' ? 'justify-end' : 'justify-start pt-24'}`}>
        {children}
      </div>
    </aside>
  )
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 sm:text-[1.7rem]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  )
}

export function IconBadge({ icon: Icon, tone }: { icon: LucideIcon; tone: 'blue' | 'teal' | 'violet' | 'amber' }) {
  const map = {
    blue: 'bg-blue-50 text-blue-600',
    teal: 'bg-brand-50 text-brand-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600',
  }
  return (
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${map[tone]}`}>
      <Icon size={22} />
    </span>
  )
}

const NOTICE = {
  info: { label: 'Informativo', box: 'bg-blue-50', text: 'text-blue-600', icon: CalendarCheck },
  pending: { label: 'Pendiente', box: 'bg-orange-50', text: 'text-orange-500', icon: AlertTriangle },
  important: { label: 'Importante', box: 'bg-red-50', text: 'text-red-500', icon: AlertTriangle },
  ok: { label: 'Confirmado', box: 'bg-green-50', text: 'text-green-600', icon: ClipboardCheck },
} as const

export type NoticeKind = keyof typeof NOTICE

export function Notice({ kind, children }: { kind: NoticeKind; children: ReactNode }) {
  const n = NOTICE[kind]
  const Icon = n.icon
  return (
    <div className={`flex items-center gap-4 rounded-lg px-4 py-3 text-sm ${n.box}`}>
      <span className={`flex w-32 shrink-0 items-center gap-2 font-semibold ${n.text}`}>
        <Icon size={18} /> {n.label}
      </span>
      <span className="text-slate-600">{children}</span>
    </div>
  )
}

export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-navy-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

export function Pill({ tone, children }: { tone: 'green' | 'orange' | 'red' | 'slate'; children: ReactNode }) {
  const map = {
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    slate: 'bg-slate-100 text-slate-500',
  }
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${map[tone]}`}>{children}</span>
}
