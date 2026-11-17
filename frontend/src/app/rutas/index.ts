import type { ComponentType } from 'react'

export const navigation = [
  { label: 'Inicio', pages: [{ id: 'panel', title: 'Panel principal' }] },
  { label: 'Configuración general', pages: [
    { id: 'identidad', title: 'Identidad del sistema' },
    { id: 'modulos', title: 'Catálogo de módulos' },
    { id: 'menus', title: 'Menús y submenús' },
  ] },
  { label: 'Gestión de accesos', pages: [
    { id: 'usuarios', title: 'Gestión de usuarios' },
    { id: 'roles', title: 'Roles y permisos' },
    { id: 'cuentas', title: 'Cuentas de usuario' },
    { id: 'asignacion', title: 'Asignación de menús' },
  ] },
  { label: 'Seguridad', pages: [
    { id: 'recuperacion', title: 'Recuperación de cuentas' },
    { id: 'vigencia', title: 'Estados y vigencia' },
  ] },
  { label: 'Parámetros', pages: [{ id: 'periodos', title: 'Periodos académicos' }] },
  { label: 'Cuenta', pages: [
    { id: 'perfil', title: 'Mi perfil' },
    { id: 'acceso', title: 'Ingresar al sistema', menuTitle: 'Cerrar sesión' },
  ] },
] as const

export type PageId = (typeof navigation)[number]['pages'][number]['id']

// Las confirmaciones, los avisos y los demás estados se montan desde cada sección.
// Estas rutas reservan las vistas secundarias sin desarrollar las funcionalidades.
export const secondaryPages = [
  { id: 'acceso/perfiles', title: 'Elegir perfil', parent: 'acceso' },
  { id: 'acceso/cambiar-rol', title: 'Cambiar rol', parent: 'acceso' },
  { id: 'acceso/primer-ingreso', title: 'Cambiar contraseña en el primer ingreso', parent: 'acceso' },
  { id: 'acceso/recuperar', title: 'Recuperar contraseña', parent: 'acceso' },
  { id: 'acceso/restablecer', title: 'Restablecer contraseña', parent: 'acceso' },
  { id: 'perfil/editar', title: 'Editar perfil', parent: 'perfil' },
  { id: 'perfil/contrasena', title: 'Cambiar contraseña', parent: 'perfil' },
  { id: 'modulos/nuevo', title: 'Nuevo módulo', parent: 'modulos' },
  { id: 'modulos/editar', title: 'Editar módulo', parent: 'modulos' },
  { id: 'modulos/detalle', title: 'Ver módulo', parent: 'modulos' },
  { id: 'menus/nuevo', title: 'Nuevo menú o submenú', parent: 'menus' },
  { id: 'menus/editar', title: 'Editar opción de navegación', parent: 'menus' },
  { id: 'roles/nuevo', title: 'Nuevo rol', parent: 'roles' },
  { id: 'roles/editar', title: 'Editar rol', parent: 'roles' },
  { id: 'roles/permisos', title: 'Configurar permisos del rol', parent: 'roles' },
  { id: 'usuarios/nuevo', title: 'Nuevo usuario', parent: 'usuarios' },
  { id: 'usuarios/editar', title: 'Editar usuario', parent: 'usuarios' },
  { id: 'usuarios/detalle', title: 'Detalle del usuario', parent: 'usuarios' },
  { id: 'cuentas/nueva', title: 'Nueva cuenta', parent: 'cuentas' },
  { id: 'cuentas/detalle', title: 'Detalle de la cuenta', parent: 'cuentas' },
] as const satisfies readonly { id: string; title: string; parent: PageId }[]

export type RouteId = PageId | (typeof secondaryPages)[number]['id']

// Cada integrante importa su vista y la registra aquí, sin modificar el layout.
const views: Partial<Record<RouteId, ComponentType>> = {}

const menuPages = navigation.flatMap(group =>
  group.pages.map(page => ({ ...page, group: group.label })),
)

type RouteDefinition = { id: RouteId; title: string; group: string; navigationId: PageId; sectionTitle?: string }

const routeDefinitions: RouteDefinition[] = [
  ...menuPages.map(page => ({ ...page, navigationId: page.id })),
  ...secondaryPages.map(({ parent, ...page }) => {
    const section = menuPages.find(item => item.id === parent)!
    return { ...page, group: section.group, navigationId: parent, sectionTitle: section.title }
  }),
]

export const pages = routeDefinitions.map(page => ({ ...page, standalone: page.navigationId === 'acceso', View: views[page.id] }))

export const readRoute = () => location.hash.slice(1) || 'panel'
