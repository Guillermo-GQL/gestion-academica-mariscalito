import {
  BarChart3, BookOpen, Briefcase, CalendarCheck, CalendarDays, ClipboardCheck, ClipboardList,
  GraduationCap, LayoutGrid, Settings, ShieldCheck, UserCircle, Users, School, UserPlus,
  type LucideIcon,
} from 'lucide-react'

export type RoleId = 'admin' | 'personal' | 'docente' | 'estudiante'

export interface NavItem { label: string; path: string; icon: LucideIcon }

export interface RoleConfig {
  id: RoleId
  label: string
  description: string
  icon: LucideIcon
  demoUser: string
  demoPassword: string
  displayName: string
  nav: NavItem[]
}

const perfil: NavItem = { label: 'Mi perfil', path: 'perfil', icon: UserCircle }

export const ROLES: Record<RoleId, RoleConfig> = {
  admin: {
    id: 'admin',
    label: 'Administrador',
    description: 'Configuración, usuarios y reportes',
    icon: ShieldCheck,
    demoUser: 'admin',
    demoPassword: 'admin123',
    displayName: 'Administrador del sistema',
    nav: [
      { label: 'Panel principal', path: '', icon: LayoutGrid },
      { label: 'Usuarios', path: 'usuarios', icon: Users },
      { label: 'Configuración', path: 'configuracion', icon: Settings },
      { label: 'Reportes', path: 'reportes', icon: BarChart3 },
      perfil,
    ],
  },
  personal: {
    id: 'personal',
    label: 'Personal administrativo',
    description: 'Matrículas, vacantes y estudiantes',
    icon: Briefcase,
    demoUser: 'secretaria',
    demoPassword: 'secre123',
    displayName: 'Personal de secretaría',
    nav: [
      { label: 'Panel principal', path: '', icon: LayoutGrid },
      { label: 'Matrículas', path: 'matriculas', icon: ClipboardList },
      { label: 'Vacantes', path: 'vacantes', icon: UserPlus },
      { label: 'Estudiantes', path: 'estudiantes', icon: GraduationCap },
      perfil,
    ],
  },
  docente: {
    id: 'docente',
    label: 'Docente',
    description: 'Asistencia y gestión de aula',
    icon: GraduationCap,
    demoUser: 'docente',
    demoPassword: 'docente123',
    displayName: 'Docente de aula',
    nav: [
      { label: 'Panel principal', path: '', icon: LayoutGrid },
      { label: 'Mis aulas', path: 'aulas', icon: School },
      { label: 'Asistencia', path: 'asistencia', icon: ClipboardCheck },
      { label: 'Mi horario', path: 'horario', icon: CalendarDays },
      perfil,
    ],
  },
  estudiante: {
    id: 'estudiante',
    label: 'Estudiante',
    description: 'Consulta de asistencia y horario',
    icon: BookOpen,
    demoUser: 'estudiante',
    demoPassword: 'estudiante123',
    displayName: 'Estudiante',
    nav: [
      { label: 'Panel principal', path: '', icon: LayoutGrid },
      { label: 'Mi matrícula', path: 'matricula', icon: GraduationCap },
      { label: 'Mi horario', path: 'horario', icon: CalendarDays },
      { label: 'Mi asistencia', path: 'asistencia', icon: CalendarCheck },
      perfil,
    ],
  },
}

export const ROLE_ORDER: RoleId[] = ['admin', 'personal', 'docente', 'estudiante']
export const isRoleId = (v: string | undefined): v is RoleId => !!v && v in ROLES
