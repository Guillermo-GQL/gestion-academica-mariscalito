import panel from './panel.svg'
import settings from './settings.svg'
import identidad from './identidad.svg'
import modulos from './modulos.svg'
import menus from './menus.svg'
import access from './access.svg'
import usuarios from './usuarios.svg'
import roles from './roles.svg'
import cuentas from './cuentas.svg'
import asignacion from './asignacion.svg'
import security from './security.svg'
import vigencia from './vigencia.svg'
import parametros from './parametros.svg'
import periodos from './periodos.svg'
import profile from './profile.svg'
import logout from './logout.svg'
import toggle from './toggle.svg'
import expand from './toggle-expand.svg'
import chevron from './chevron.svg'
import password from './password.svg'
import type { PageId } from '../../app/rutas'

// SVG originales: el contenedor centra cada imagen sin estirarla ni recolorearla.
export const navigationIcons = {
  panel, settings, identidad, modulos, menus, access, usuarios, roles, cuentas,
  asignacion, security, vigencia, parametros, periodos, profile, logout,
  toggle, expand, chevron,
  // Figma aún no incluye Recuperación de cuentas en su variante contraída.
  password,
}

export type NavigationIconName = keyof typeof navigationIcons

export const pageIcons = {
  panel: 'panel', identidad: 'identidad', modulos: 'modulos', menus: 'menus',
  usuarios: 'usuarios', roles: 'roles', cuentas: 'cuentas', asignacion: 'asignacion',
  recuperacion: 'password', vigencia: 'vigencia', periodos: 'periodos',
  perfil: 'profile', acceso: 'logout',
} satisfies Record<PageId, NavigationIconName>
